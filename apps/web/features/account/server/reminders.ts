import {
  reminderPayloadSchema,
  type PetProfileResponse,
  type ReminderPayload,
  type ReminderResponse,
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

type ReminderRow = {
  id: string;
  pet_id: string;
  title: string;
  reminder_type: ReminderResponse["reminderType"];
  due_date: string;
  due_time: string | null;
  repeat_frequency: ReminderResponse["repeatFrequency"];
  advance_notice_days: ReminderResponse["advanceNoticeDays"];
  notes: string | null;
  status: ReminderResponse["status"];
  created_at: string;
  updated_at: string;
};

type ReminderListResult =
  | { ok: true; pet: PetProfileResponse | null; reminders: ReminderResponse[] }
  | { ok: false; status: number; message: string; issues?: unknown };

type ReminderMutationResult =
  | { ok: true; pet: PetProfileResponse; reminder: ReminderResponse }
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
  "updated_at",
].join(", ");

const REMINDER_COLUMNS = [
  "id",
  "pet_id",
  "title",
  "reminder_type",
  "due_date",
  "due_time",
  "repeat_frequency",
  "advance_notice_days",
  "notes",
  "status",
  "created_at",
  "updated_at",
].join(", ");

export async function listOwnerReminders(
  supabase: SupabaseClient,
): Promise<ReminderListResult> {
  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: true, pet: null, reminders: [] };

  const { data, error } = await supabase
    .from("reminders")
    .select(REMINDER_COLUMNS)
    .eq("pet_id", petResult.pet.id)
    .order("due_date", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return { ok: false, status: 500, message: "Could not read reminders." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    reminders: ((data ?? []) as unknown as ReminderRow[]).map(mapReminderRow),
  };
}

export async function createOwnerReminder(
  input: unknown,
  supabase: SupabaseClient,
): Promise<ReminderMutationResult> {
  const payloadResult = reminderPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return {
      ok: false,
      status: 400,
      message: "Invalid reminder payload.",
      issues: payloadResult.error.flatten(),
    };
  }

  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet)
    return {
      ok: false,
      status: 409,
      message: "Create a pet profile before adding reminders.",
    };

  const { data, error } = await supabase
    .from("reminders")
    .insert({
      pet_id: petResult.pet.id,
      ...createReminderDatabasePayload(payloadResult.data),
      status: payloadResult.data.status ?? "active",
    })
    .select(REMINDER_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not save the reminder." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    reminder: mapReminderRow(data as unknown as ReminderRow),
  };
}

export async function updateOwnerReminder(
  reminderId: string,
  input: unknown,
  supabase: SupabaseClient,
): Promise<ReminderMutationResult> {
  const payloadResult = reminderPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return {
      ok: false,
      status: 400,
      message: "Invalid reminder payload.",
      issues: payloadResult.error.flatten(),
    };
  }

  return saveReminderUpdate(
    reminderId,
    createReminderUpdatePayload(
      createReminderDatabasePayload(payloadResult.data),
      payloadResult.data.status,
    ),
    supabase,
  );
}

export async function completeOwnerReminder(
  reminderId: string,
  supabase: SupabaseClient,
): Promise<ReminderMutationResult> {
  return saveReminderUpdate(
    reminderId,
    createReminderUpdatePayload({ status: "completed" }),
    supabase,
  );
}

export function mapReminderRow(row: ReminderRow): ReminderResponse {
  return {
    id: row.id,
    petId: row.pet_id,
    title: row.title,
    reminderType: row.reminder_type,
    dueDate: row.due_date,
    dueTime: row.due_time ? row.due_time.slice(0, 5) : null,
    repeatFrequency: row.repeat_frequency,
    advanceNoticeDays: row.advance_notice_days,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createReminderDatabasePayload(payload: ReminderPayload) {
  return {
    title: payload.title,
    reminder_type: payload.reminderType,
    due_date: payload.dueDate,
    due_time: payload.dueTime,
    repeat_frequency: payload.repeatFrequency,
    advance_notice_days: payload.advanceNoticeDays,
    notes: payload.notes,
  };
}

type ReminderDatabasePayload = Partial<
  ReturnType<typeof createReminderDatabasePayload>
> & {
  status?: ReminderResponse["status"];
};

export function createReminderUpdatePayload(
  payload: ReminderDatabasePayload,
  status?: ReminderResponse["status"],
  now: Date = new Date(),
) {
  return {
    ...payload,
    status: status ?? payload.status,
    updated_at: now.toISOString(),
  };
}

async function saveReminderUpdate(
  reminderId: string,
  payload: ReminderDatabasePayload & { updated_at: string },
  supabase: SupabaseClient,
): Promise<ReminderMutationResult> {
  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet)
    return {
      ok: false,
      status: 409,
      message: "Create a pet profile before editing reminders.",
    };

  const { data, error } = await supabase
    .from("reminders")
    .update(payload)
    .eq("id", reminderId)
    .eq("pet_id", petResult.pet.id)
    .select(REMINDER_COLUMNS)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not save the reminder." };
  }

  if (!data) {
    return { ok: false, status: 404, message: "Reminder not found." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    reminder: mapReminderRow(data as unknown as ReminderRow),
  };
}

async function findOwnerFirstPet(
  supabase: SupabaseClient,
): Promise<
  | { ok: true; pet: PetProfileRow | null }
  | { ok: false; status: number; message: string }
> {
  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const householdResult = await findOwnerHousehold(
    supabase,
    authResult.user.id,
  );
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
    return {
      ok: false,
      status: 500,
      message: "Could not read the pet profile.",
    };
  }

  return { ok: true, pet: data as PetProfileRow | null };
}

async function getAuthenticatedUser(
  supabase: SupabaseClient,
): Promise<
  { ok: true; user: User } | { ok: false; status: number; message: string }
> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { ok: false, status: 401, message: "Authentication is required." };
  }

  return { ok: true, user: data.user };
}

async function findOwnerHousehold(
  supabase: SupabaseClient,
  ownerUserId: string,
): Promise<
  | { ok: true; household: HouseholdRow | null }
  | { ok: false; status: number; message: string }
> {
  const { data, error } = await supabase
    .from("households")
    .select("id")
    .eq("owner_user_id", ownerUserId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      status: 500,
      message: "Could not read the owner household.",
    };
  }

  return { ok: true, household: data as HouseholdRow | null };
}
