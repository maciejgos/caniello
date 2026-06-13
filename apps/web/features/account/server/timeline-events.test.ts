import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import {
  createOwnerTimelineEvent,
  createTimelineEventDatabasePayload,
  createTimelineEventUpdatePayload,
  mapTimelineEventRow,
  updateOwnerTimelineEvent
} from "./timeline-events";

const ownerUserId = "11111111-1111-4111-8111-111111111111";
const householdId = "33333333-3333-4333-8333-333333333333";
const petId = "44444444-4444-4444-8444-444444444444";
const eventId = "66666666-6666-4666-8666-666666666666";

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
  updated_at: "2026-06-04T09:30:00.000Z"
};

describe("timeline event server helpers", () => {
  it("maps API payload fields to timeline event table columns", () => {
    expect(
      createTimelineEventDatabasePayload({
        title: "Annual visit",
        eventType: "visit",
        eventDate: "2026-06-12",
        notes: "Weight check."
      })
    ).toEqual({
      title: "Annual visit",
      event_type: "visit",
      event_date: "2026-06-12",
      notes: "Weight check."
    });
  });

  it("adds a fresh updated_at value for timeline event updates", () => {
    expect(
      createTimelineEventUpdatePayload(
        {
          title: "Rabies vaccine",
          event_type: "vaccination",
          event_date: "2026-05-20",
          notes: null
        },
        new Date("2026-06-12T11:00:00.000Z")
      )
    ).toEqual({
      title: "Rabies vaccine",
      event_type: "vaccination",
      event_date: "2026-05-20",
      notes: null,
      updated_at: "2026-06-12T11:00:00.000Z"
    });
  });

  it("maps Supabase timeline rows to the API response shape", () => {
    expect(
      mapTimelineEventRow({
        id: eventId,
        pet_id: petId,
        title: "Annual visit",
        event_type: "visit",
        event_date: "2026-06-12",
        notes: null,
        created_at: "2026-06-12T09:00:00.000Z",
        updated_at: "2026-06-12T09:00:00.000Z"
      })
    ).toEqual({
      id: eventId,
      petId,
      title: "Annual visit",
      eventType: "visit",
      eventDate: "2026-06-12",
      notes: null,
      createdAt: "2026-06-12T09:00:00.000Z",
      updatedAt: "2026-06-12T09:00:00.000Z"
    });
  });

  it("creates a manual timeline event for the signed-in owner's first pet", async () => {
    const operations: string[] = [];
    const eventRow = {
      id: eventId,
      pet_id: petId,
      title: "Annual visit",
      event_type: "visit" as const,
      event_date: "2026-06-12",
      notes: "Weight check.",
      created_at: "2026-06-12T09:00:00.000Z",
      updated_at: "2026-06-12T09:00:00.000Z"
    };
    const supabase = createTimelineSupabaseMock(operations, {
      eventInsert: { data: eventRow, error: null }
    });

    const result = await createOwnerTimelineEvent(
      {
        title: "Annual visit",
        eventType: "visit",
        eventDate: "2026-06-12",
        notes: "Weight check."
      },
      supabase
    );

    expect(result).toMatchObject({ ok: true, event: { title: "Annual visit", eventType: "visit" } });
    expect(operations).toContain("households.select");
    expect(operations).toContain("pets.select");
    expect(operations).toContain(
      `timeline_events.insert:${JSON.stringify({
        pet_id: petId,
        source_document_id: null,
        title: "Annual visit",
        event_type: "visit",
        event_date: "2026-06-12",
        notes: "Weight check."
      })}`
    );
    expect(operations.join(" ")).not.toContain("generated");
  });

  it("updates only a timeline event scoped to the signed-in owner's first pet", async () => {
    const operations: string[] = [];
    const supabase = createTimelineSupabaseMock(operations, {
      eventUpdate: {
        data: {
          id: eventId,
          pet_id: petId,
          title: "Updated visit",
          event_type: "visit",
          event_date: "2026-06-13",
          notes: null,
          created_at: "2026-06-12T09:00:00.000Z",
          updated_at: "2026-06-12T10:00:00.000Z"
        },
        error: null
      }
    });

    const result = await updateOwnerTimelineEvent(
      eventId,
      {
        title: "Updated visit",
        eventType: "visit",
        eventDate: "2026-06-13",
        notes: null
      },
      supabase
    );

    expect(result).toMatchObject({ ok: true, event: { id: eventId, title: "Updated visit" } });
    expect(operations).toContain("timeline_events.update");
    expect(operations.join(" ")).toContain(`eq:pet_id:${petId}`);
  });
});

function createTimelineSupabaseMock(
  operations: string[],
  overrides: {
    householdRead?: { data: unknown; error: unknown };
    petRead?: { data: unknown; error: unknown };
    eventInsert?: { data: unknown; error: unknown };
    eventUpdate?: { data: unknown; error: unknown };
  } = {}
) {
  return {
    auth: {
      getUser: async () => ({ data: { user: { id: ownerUserId } }, error: null })
    },
    from: (table: string) => {
      if (table === "households") {
        return {
          select: () => createMaybeSingleBuilder(operations, () => {
            operations.push("households.select");
            return overrides.householdRead ?? { data: { id: householdId }, error: null };
          })
        };
      }

      if (table === "pets") {
        return {
          select: () => createMaybeSingleBuilder(operations, () => {
            operations.push("pets.select");
            return overrides.petRead ?? { data: petRow, error: null };
          })
        };
      }

      if (table === "timeline_events") {
        return {
          insert: (payload: unknown) => ({
            select: () => ({
              single: async () => {
                operations.push(`timeline_events.insert:${JSON.stringify(payload)}`);
                return overrides.eventInsert ?? { data: null, error: null };
              }
            })
          }),
          update: (payload: unknown) => {
            operations.push("timeline_events.update");
            operations.push(`timeline_events.updatePayload:${JSON.stringify(payload)}`);
            return createMaybeSingleBuilder(operations, () => overrides.eventUpdate ?? { data: null, error: null });
          }
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    }
  } as unknown as SupabaseClient;
}

function createMaybeSingleBuilder(operations: string[], read: () => { data: unknown; error: unknown }) {
  const builder = {
    eq: (column: string, value: string) => {
      operations.push(`eq:${column}:${value}`);
      return builder;
    },
    limit: () => builder,
    maybeSingle: async () => read(),
    order: () => builder,
    select: () => builder
  };

  return builder;
}
