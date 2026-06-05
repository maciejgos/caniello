import { petProfilePayloadSchema, type PetProfilePayload, type PetProfileResponse } from "@caniello/contracts";
import type { SupabaseClient, User } from "@supabase/supabase-js";

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

type HouseholdRow = {
  id: string;
};

type PetProfileResult =
  | { ok: true; pet: PetProfileResponse | null }
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

export async function readOwnerPetProfile(supabase: SupabaseClient): Promise<PetProfileResult> {
  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const householdResult = await findOwnerHousehold(supabase, authResult.user.id);
  if (!householdResult.ok) return householdResult;
  if (!householdResult.household) return { ok: true, pet: null };

  const petResult = await findHouseholdPet(supabase, householdResult.household.id);
  if (!petResult.ok) return petResult;

  return { ok: true, pet: petResult.pet ? mapPetProfileRow(petResult.pet) : null };
}

export async function saveOwnerPetProfile(input: unknown, supabase: SupabaseClient): Promise<PetProfileResult> {
  const payloadResult = petProfilePayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return {
      ok: false,
      status: 400,
      message: "Invalid pet profile payload.",
      issues: payloadResult.error.flatten()
    };
  }

  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const householdResult = await findOrCreateOwnerHousehold(supabase, authResult.user.id);
  if (!householdResult.ok) return householdResult;

  const existingPetResult = await findHouseholdPet(supabase, householdResult.household.id);
  if (!existingPetResult.ok) return existingPetResult;

  const databasePayload = createPetProfileDatabasePayload(payloadResult.data);
  const query = existingPetResult.pet
    ? supabase
        .from("pets")
        .update(databasePayload)
        .eq("id", existingPetResult.pet.id)
        .select(PET_PROFILE_COLUMNS)
        .single()
    : supabase
        .from("pets")
        .insert({ household_id: householdResult.household.id, ...databasePayload })
        .select(PET_PROFILE_COLUMNS)
        .single();

  const { data, error } = await query;
  if (error || !data) {
    return {
      ok: false,
      status: 500,
      message: "Could not save the pet profile."
    };
  }

  return { ok: true, pet: mapPetProfileRow(data as unknown as PetProfileRow) };
}

export function mapPetProfileRow(row: PetProfileRow): PetProfileResponse {
  return {
    id: row.id,
    householdId: row.household_id,
    name: row.name,
    species: row.species,
    breed: row.breed,
    birthDate: row.birth_date,
    sexOrGender: row.sex_or_gender,
    weightKg: row.weight_kg === null ? null : Number(row.weight_kg),
    microchipNumber: row.microchip_number,
    allergies: row.allergies,
    medication: row.medication,
    importantNotes: row.important_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function createPetProfileDatabasePayload(payload: PetProfilePayload) {
  return {
    name: payload.name,
    species: payload.species,
    breed: payload.breed,
    birth_date: payload.birthDate,
    sex_or_gender: payload.sexOrGender,
    weight_kg: payload.weightKg,
    microchip_number: payload.microchipNumber,
    allergies: payload.allergies,
    medication: payload.medication,
    important_notes: payload.importantNotes
  };
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

async function findOrCreateOwnerHousehold(
  supabase: SupabaseClient,
  ownerUserId: string
): Promise<{ ok: true; household: HouseholdRow } | { ok: false; status: number; message: string }> {
  const existingHousehold = await findOwnerHousehold(supabase, ownerUserId);
  if (!existingHousehold.ok) return existingHousehold;
  if (existingHousehold.household) return { ok: true, household: existingHousehold.household };

  const { data, error } = await supabase
    .from("households")
    .insert({ owner_user_id: ownerUserId, name: "Owner household" })
    .select("id")
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not create the owner household." };
  }

  return { ok: true, household: data as HouseholdRow };
}

async function findHouseholdPet(
  supabase: SupabaseClient,
  householdId: string
): Promise<{ ok: true; pet: PetProfileRow | null } | { ok: false; status: number; message: string }> {
  const { data, error } = await supabase
    .from("pets")
    .select(PET_PROFILE_COLUMNS)
    .eq("household_id", householdId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not read the pet profile." };
  }

  return { ok: true, pet: data as PetProfileRow | null };
}
