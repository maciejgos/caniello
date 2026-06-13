import {
  timelineEventPayloadSchema,
  type PetProfileResponse,
  type TimelineEventPayload,
  type TimelineEventResponse
} from "@caniello/contracts";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { mapPetProfileRow } from "./pet-profile";

type HouseholdRow = {
  id: string;
};

type PetProfileRow = {
  id: string;
  household_id: string;
  name: string;
  species: string | null;
  breed: string | null;
  birth_date: string | null;
  sex_or_gender: string | null;
  weight_kg: number | string | null;
  microchip_number: string | null;
  allergies: string | null;
  medication: string | null;
  important_notes: string | null;
  created_at: string;
  updated_at: string;
};

type TimelineEventRow = {
  id: string;
  pet_id: string;
  event_type: TimelineEventResponse["eventType"];
  event_date: string;
  title: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type TimelineEventListResult =
  | { ok: true; pet: PetProfileResponse | null; events: TimelineEventResponse[] }
  | { ok: false; status: number; message: string; issues?: unknown };

type TimelineEventMutationResult =
  | { ok: true; pet: PetProfileResponse; event: TimelineEventResponse }
  | { ok: false; status: number; message: string; issues?: unknown };

const PET_PROFILE_COLUMNS = [
  "id",
  "household_id",
  "name",
  "species",
  "breed",
  "birth_date",
  "sex_or_gender",
  "weight_kg",
  "microchip_number",
  "allergies",
  "medication",
  "important_notes",
  "created_at",
  "updated_at"
].join(", ");

const TIMELINE_EVENT_COLUMNS = [
  "id",
  "pet_id",
  "event_type",
  "event_date",
  "title",
  "notes",
  "created_at",
  "updated_at"
].join(", ");

export async function listOwnerTimelineEvents(supabase: SupabaseClient): Promise<TimelineEventListResult> {
  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: true, pet: null, events: [] };

  const { data, error } = await supabase
    .from("timeline_events")
    .select(TIMELINE_EVENT_COLUMNS)
    .eq("pet_id", petResult.pet.id)
    .order("event_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return { ok: false, status: 500, message: "Could not read timeline events." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    events: ((data ?? []) as unknown as TimelineEventRow[]).map(mapTimelineEventRow)
  };
}

export async function createOwnerTimelineEvent(input: unknown, supabase: SupabaseClient): Promise<TimelineEventMutationResult> {
  const payloadResult = timelineEventPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return {
      ok: false,
      status: 400,
      message: "Invalid timeline event payload.",
      issues: payloadResult.error.flatten()
    };
  }

  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: false, status: 409, message: "Create a pet profile before adding timeline events." };

  const { data, error } = await supabase
    .from("timeline_events")
    .insert({
      pet_id: petResult.pet.id,
      source_document_id: null,
      ...createTimelineEventDatabasePayload(payloadResult.data)
    })
    .select(TIMELINE_EVENT_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not save the timeline event." };
  }

  return { ok: true, pet: mapPetProfileRow(petResult.pet), event: mapTimelineEventRow(data as unknown as TimelineEventRow) };
}

export async function updateOwnerTimelineEvent(
  eventId: string,
  input: unknown,
  supabase: SupabaseClient
): Promise<TimelineEventMutationResult> {
  const payloadResult = timelineEventPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return {
      ok: false,
      status: 400,
      message: "Invalid timeline event payload.",
      issues: payloadResult.error.flatten()
    };
  }

  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: false, status: 409, message: "Create a pet profile before editing timeline events." };

  const { data, error } = await supabase
    .from("timeline_events")
    .update(createTimelineEventUpdatePayload(createTimelineEventDatabasePayload(payloadResult.data)))
    .eq("id", eventId)
    .eq("pet_id", petResult.pet.id)
    .select(TIMELINE_EVENT_COLUMNS)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not save the timeline event." };
  }

  if (!data) {
    return { ok: false, status: 404, message: "Timeline event not found." };
  }

  return { ok: true, pet: mapPetProfileRow(petResult.pet), event: mapTimelineEventRow(data as unknown as TimelineEventRow) };
}

export function mapTimelineEventRow(row: TimelineEventRow): TimelineEventResponse {
  return {
    id: row.id,
    petId: row.pet_id,
    eventType: row.event_type,
    eventDate: row.event_date,
    title: row.title,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function createTimelineEventDatabasePayload(payload: TimelineEventPayload) {
  return {
    title: payload.title,
    event_type: payload.eventType,
    event_date: payload.eventDate,
    notes: payload.notes
  };
}

type TimelineEventDatabasePayload = ReturnType<typeof createTimelineEventDatabasePayload>;

export function createTimelineEventUpdatePayload(payload: TimelineEventDatabasePayload, now: Date = new Date()) {
  return {
    ...payload,
    updated_at: now.toISOString()
  };
}

async function findOwnerFirstPet(
  supabase: SupabaseClient
): Promise<{ ok: true; pet: PetProfileRow | null } | { ok: false; status: number; message: string }> {
  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const householdResult = await findOwnerHousehold(supabase, authResult.user.id);
  if (!householdResult.ok) return householdResult;
  if (!householdResult.household) return { ok: true, pet: null };

  const { data, error } = await supabase
    .from("pets")
    .select(PET_PROFILE_COLUMNS)
    .eq("household_id", householdResult.household.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not read the pet profile." };
  }

  return { ok: true, pet: data as PetProfileRow | null };
}

async function getAuthenticatedUser(
  supabase: SupabaseClient
): Promise<{ ok: true; user: User } | { ok: false; status: number; message: string }> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { ok: false, status: 401, message: "Authentication is required." };
  }

  return { ok: true, user: data.user };
}

async function findOwnerHousehold(
  supabase: SupabaseClient,
  ownerUserId: string
): Promise<{ ok: true; household: HouseholdRow | null } | { ok: false; status: number; message: string }> {
  const { data, error } = await supabase
    .from("households")
    .select("id")
    .eq("owner_user_id", ownerUserId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not read the owner household." };
  }

  return { ok: true, household: data as HouseholdRow | null };
}
