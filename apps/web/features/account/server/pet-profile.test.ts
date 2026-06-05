import { describe, expect, it } from "vitest";
import { createPetProfileDatabasePayload, mapPetProfileRow } from "./pet-profile";

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
});
