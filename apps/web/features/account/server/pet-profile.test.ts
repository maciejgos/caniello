import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import {
  createPetProfileDatabasePayload,
  createPetProfileUpdatePayload,
  mapPetProfileRow,
  saveOwnerPetProfile
} from "./pet-profile";

describe("pet profile server helpers", () => {
  it("maps API payload fields to the pets table columns", () => {
    expect(
      createPetProfileDatabasePayload({
        name: "Bruno",
        species: "dog",
        breed: null,
        birthDate: "2021-05-01",
        sexOrGender: "male",
        weightKg: 26.4,
        microchipNumber: "616093900000000",
        allergies: null,
        medication: "OmegaVet supplement",
        importantNotes: "Needs quiet handling."
      })
    ).toEqual({
      name: "Bruno",
      species: "dog",
      breed: null,
      birth_date: "2021-05-01",
      sex_or_gender: "male",
      weight_kg: 26.4,
      microchip_number: "616093900000000",
      allergies: null,
      medication: "OmegaVet supplement",
      important_notes: "Needs quiet handling."
    });
  });

  it("adds a fresh updated_at value for profile updates", () => {
    const databasePayload = createPetProfileDatabasePayload({
      name: "Bruno",
      species: "dog",
      breed: null,
      birthDate: "2021-05-01",
      sexOrGender: "male",
      weightKg: 26.4,
      microchipNumber: "616093900000000",
      allergies: null,
      medication: "OmegaVet supplement",
      importantNotes: "Needs quiet handling."
    });

    expect(createPetProfileUpdatePayload(databasePayload, new Date("2026-06-04T10:15:00.000Z"))).toEqual({
      ...databasePayload,
      updated_at: "2026-06-04T10:15:00.000Z"
    });
  });

  it("maps Supabase pet rows to the API response shape", () => {
    expect(
      mapPetProfileRow({
        id: "44444444-4444-4444-8444-444444444444",
        household_id: "33333333-3333-4333-8333-333333333333",
        name: "Bruno",
        species: "dog",
        breed: "mixed breed",
        birth_date: "2021-05-01",
        sex_or_gender: "male",
        weight_kg: "26.40",
        microchip_number: null,
        allergies: null,
        medication: null,
        important_notes: "Prefers quiet handling.",
        created_at: "2026-06-04T09:00:00.000Z",
        updated_at: "2026-06-04T09:30:00.000Z"
      })
    ).toEqual({
      id: "44444444-4444-4444-8444-444444444444",
      householdId: "33333333-3333-4333-8333-333333333333",
      name: "Bruno",
      species: "dog",
      breed: "mixed breed",
      birthDate: "2021-05-01",
      sexOrGender: "male",
      weightKg: 26.4,
      microchipNumber: null,
      allergies: null,
      medication: null,
      importantNotes: "Prefers quiet handling.",
      createdAt: "2026-06-04T09:00:00.000Z",
      updatedAt: "2026-06-04T09:30:00.000Z"
    });
  });

  it("reuses the owner household when a concurrent first-save insert wins the race", async () => {
    const ownerUserId = "11111111-1111-4111-8111-111111111111";
    const householdId = "33333333-3333-4333-8333-333333333333";
    const operations: string[] = [];
    const householdReads = [
      { data: null, error: null },
      { data: { id: householdId }, error: null }
    ];
    const savedPetRow = {
      id: "44444444-4444-4444-8444-444444444444",
      household_id: householdId,
      name: "Bruno",
      species: null,
      breed: null,
      birth_date: null,
      sex_or_gender: null,
      weight_kg: null,
      microchip_number: null,
      allergies: null,
      medication: null,
      important_notes: null,
      created_at: "2026-06-04T09:00:00.000Z",
      updated_at: "2026-06-04T09:00:00.000Z"
    };
    const supabase = {
      auth: {
        getUser: async () => ({ data: { user: { id: ownerUserId } }, error: null })
      },
      from: (table: string) => {
        if (table === "households") {
          return {
            select: () => createMaybeSingleBuilder(() => {
              operations.push("households.select");
              return householdReads.shift() ?? { data: null, error: null };
            }),
            insert: (payload: unknown) => ({
              select: () => ({
                single: async () => {
                  operations.push(`households.insert:${JSON.stringify(payload)}`);
                  return { data: null, error: { code: "23505" } };
                }
              })
            })
          };
        }

        if (table === "pets") {
          return {
            select: () => createMaybeSingleBuilder(() => {
              operations.push("pets.select");
              return { data: null, error: null };
            }),
            insert: (payload: unknown) => ({
              select: () => ({
                single: async () => {
                  operations.push(`pets.insert:${JSON.stringify(payload)}`);
                  return { data: savedPetRow, error: null };
                }
              })
            })
          };
        }

        throw new Error(`Unexpected table: ${table}`);
      }
    } as unknown as SupabaseClient;
    const expectedPetInsertPayload = {
      household_id: householdId,
      ...createPetProfileDatabasePayload({
        name: "Bruno",
        species: null,
        breed: null,
        birthDate: null,
        sexOrGender: null,
        weightKg: null,
        microchipNumber: null,
        allergies: null,
        medication: null,
        importantNotes: null
      })
    };

    const result = await saveOwnerPetProfile({ name: "Bruno" }, supabase);

    expect(result).toMatchObject({ ok: true, pet: { householdId, name: "Bruno" } });
    expect(operations).toEqual([
      "households.select",
      `households.insert:${JSON.stringify({ owner_user_id: ownerUserId, name: "Owner household" })}`,
      "households.select",
      "pets.select",
      `pets.insert:${JSON.stringify(expectedPetInsertPayload)}`
    ]);
  });
});

function createMaybeSingleBuilder(read: () => { data: unknown; error: unknown }) {
  const builder = {
    eq: () => builder,
    limit: () => builder,
    maybeSingle: async () => read(),
    order: () => builder
  };

  return builder;
}
