import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import {
  completeOwnerReminder,
  createOwnerReminder,
  createReminderDatabasePayload,
  createReminderUpdatePayload,
  mapReminderRow,
} from "./reminders";

const ownerUserId = "11111111-1111-4111-8111-111111111111";
const householdId = "33333333-3333-4333-8333-333333333333";
const petId = "44444444-4444-4444-8444-444444444444";
const reminderId = "55555555-5555-4555-8555-555555555555";

const petRow = {
  id: petId,
  household_id: householdId,
  name: "Bruno",
  species: "dog",
  breed: "mixed breed",
  birth_date: "2021-05-01",
  sex_or_gender: "male",
  weight_kg: "26.40",
  microchip_number: null,
  allergies: null,
  medication: null,
  important_notes: null,
  created_at: "2026-06-04T09:00:00.000Z",
  updated_at: "2026-06-04T09:30:00.000Z",
};

describe("reminder server helpers", () => {
  it("maps API payload fields to the reminders table columns", () => {
    expect(
      createReminderDatabasePayload({
        title: "Rabies vaccine",
        reminderType: "vaccination",
        dueDate: "2026-07-12",
        dueTime: "09:00",
        repeatFrequency: "monthly",
        advanceNoticeDays: 1,
        notes: "Bring previous record.",
      }),
    ).toEqual({
      title: "Rabies vaccine",
      reminder_type: "vaccination",
      due_date: "2026-07-12",
      due_time: "09:00",
      repeat_frequency: "monthly",
      advance_notice_days: 1,
      notes: "Bring previous record.",
    });
  });

  it("adds a fresh updated_at value for reminder updates", () => {
    expect(
      createReminderUpdatePayload(
        {
          title: "Annual visit",
          reminder_type: "visit",
          due_date: "2026-08-01",
          due_time: null,
          repeat_frequency: "none",
          advance_notice_days: 0,
          notes: null,
        },
        "active",
        new Date("2026-06-06T11:00:00.000Z"),
      ),
    ).toEqual({
      title: "Annual visit",
      reminder_type: "visit",
      due_date: "2026-08-01",
      due_time: null,
      repeat_frequency: "none",
      advance_notice_days: 0,
      notes: null,
      status: "active",
      updated_at: "2026-06-06T11:00:00.000Z",
    });
  });

  it("maps Supabase reminder rows to the API response shape", () => {
    expect(
      mapReminderRow({
        id: reminderId,
        pet_id: petId,
        title: "Rabies vaccine",
        reminder_type: "vaccination",
        due_date: "2026-07-12",
        due_time: "09:00:00",
        repeat_frequency: "monthly",
        advance_notice_days: 1,
        notes: null,
        status: "active",
        created_at: "2026-06-06T09:00:00.000Z",
        updated_at: "2026-06-06T09:00:00.000Z",
      }),
    ).toEqual({
      id: reminderId,
      petId,
      title: "Rabies vaccine",
      reminderType: "vaccination",
      dueDate: "2026-07-12",
      dueTime: "09:00",
      repeatFrequency: "monthly",
      advanceNoticeDays: 1,
      notes: null,
      status: "active",
      createdAt: "2026-06-06T09:00:00.000Z",
      updatedAt: "2026-06-06T09:00:00.000Z",
    });
  });

  it("creates an active reminder for the signed-in owner's first pet", async () => {
    const operations: string[] = [];
    const reminderRow = {
      id: reminderId,
      pet_id: petId,
      title: "Rabies vaccine",
      reminder_type: "vaccination" as const,
      due_date: "2026-07-12",
      due_time: null,
      repeat_frequency: "none" as const,
      advance_notice_days: 0 as const,
      notes: "Bring previous record.",
      status: "active" as const,
      created_at: "2026-06-06T09:00:00.000Z",
      updated_at: "2026-06-06T09:00:00.000Z",
    };
    const supabase = createReminderSupabaseMock(operations, {
      reminderInsert: { data: reminderRow, error: null },
    });

    const result = await createOwnerReminder(
      {
        title: "Rabies vaccine",
        reminderType: "vaccination",
        dueDate: "2026-07-12",
        dueTime: null,
        repeatFrequency: "none",
        advanceNoticeDays: 0,
        notes: "Bring previous record.",
      },
      supabase,
    );

    expect(result).toMatchObject({
      ok: true,
      reminder: { title: "Rabies vaccine", status: "active" },
    });
    expect(operations).toEqual([
      "households.select",
      "pets.select",
      `reminders.insert:${JSON.stringify({
        pet_id: petId,
        title: "Rabies vaccine",
        reminder_type: "vaccination",
        due_date: "2026-07-12",
        due_time: null,
        repeat_frequency: "none",
        advance_notice_days: 0,
        notes: "Bring previous record.",
        status: "active",
      })}`,
    ]);
  });

  it("marks an owner reminder completed without creating notification behavior", async () => {
    const operations: string[] = [];
    const supabase = createReminderSupabaseMock(operations, {
      reminderUpdate: {
        data: {
          id: reminderId,
          pet_id: petId,
          title: "Rabies vaccine",
          reminder_type: "vaccination",
          due_date: "2026-07-12",
          due_time: null,
          repeat_frequency: "none",
          advance_notice_days: 0,
          notes: null,
          status: "completed",
          created_at: "2026-06-06T09:00:00.000Z",
          updated_at: "2026-06-06T10:00:00.000Z",
        },
        error: null,
      },
    });

    const result = await completeOwnerReminder(reminderId, supabase);

    expect(result).toMatchObject({
      ok: true,
      reminder: { id: reminderId, status: "completed" },
    });
    expect(operations).toContain("reminders.update");
    expect(operations.join(" ")).not.toContain("notification");
  });
});

function createReminderSupabaseMock(
  operations: string[],
  overrides: {
    householdRead?: { data: unknown; error: unknown };
    petRead?: { data: unknown; error: unknown };
    reminderInsert?: { data: unknown; error: unknown };
    reminderUpdate?: { data: unknown; error: unknown };
  } = {},
) {
  return {
    auth: {
      getUser: async () => ({
        data: { user: { id: ownerUserId } },
        error: null,
      }),
    },
    from: (table: string) => {
      if (table === "households") {
        return {
          select: () =>
            createMaybeSingleBuilder(() => {
              operations.push("households.select");
              return (
                overrides.householdRead ?? {
                  data: { id: householdId },
                  error: null,
                }
              );
            }),
        };
      }

      if (table === "pets") {
        return {
          select: () =>
            createMaybeSingleBuilder(() => {
              operations.push("pets.select");
              return overrides.petRead ?? { data: petRow, error: null };
            }),
        };
      }

      if (table === "reminders") {
        return {
          insert: (payload: unknown) => ({
            select: () => ({
              single: async () => {
                operations.push(`reminders.insert:${JSON.stringify(payload)}`);
                return overrides.reminderInsert ?? { data: null, error: null };
              },
            }),
          }),
          update: (payload: unknown) => {
            operations.push("reminders.update");
            operations.push(
              `reminders.updatePayload:${JSON.stringify(payload)}`,
            );
            return createMaybeSingleBuilder(
              () => overrides.reminderUpdate ?? { data: null, error: null },
            );
          },
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    },
  } as unknown as SupabaseClient;
}

function createMaybeSingleBuilder(
  read: () => { data: unknown; error: unknown },
) {
  const builder = {
    eq: () => builder,
    limit: () => builder,
    maybeSingle: async () => read(),
    order: () => builder,
    select: () => builder,
  };

  return builder;
}
