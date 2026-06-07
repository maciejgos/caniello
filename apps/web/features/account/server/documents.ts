import {
  documentPayloadSchema,
  type DocumentPayload,
  type DocumentResponse,
  type PetProfileResponse
} from "@caniello/contracts";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
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

type DocumentRow = {
  id: string;
  pet_id: string;
  document_title: string | null;
  document_type: DocumentResponse["documentType"];
  document_date: string | null;
  provider_name: string | null;
  notes: string | null;
  original_filename: string | null;
  mime_type: string | null;
  status: DocumentResponse["status"];
  created_at: string;
  updated_at: string;
};

type DocumentListResult =
  | { ok: true; pet: PetProfileResponse | null; documents: DocumentResponse[] }
  | { ok: false; status: number; message: string; issues?: unknown };

type DocumentMutationResult =
  | { ok: true; pet: PetProfileResponse; document: DocumentResponse }
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

const DOCUMENT_COLUMNS = [
  "id",
  "pet_id",
  "document_title",
  "document_type",
  "document_date",
  "provider_name",
  "notes",
  "original_filename",
  "mime_type",
  "status",
  "created_at",
  "updated_at"
].join(", ");

export async function listOwnerDocuments(supabase: SupabaseClient): Promise<DocumentListResult> {
  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: true, pet: null, documents: [] };

  const { data, error } = await supabase
    .from("documents")
    .select(DOCUMENT_COLUMNS)
    .eq("pet_id", petResult.pet.id)
    .order("document_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return { ok: false, status: 500, message: "Could not read documents." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    documents: ((data ?? []) as unknown as DocumentRow[]).map(mapDocumentRow)
  };
}

export async function createOwnerDocument(input: unknown, supabase: SupabaseClient): Promise<DocumentMutationResult> {
  const payloadResult = documentPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return {
      ok: false,
      status: 400,
      message: "Invalid document payload.",
      issues: payloadResult.error.flatten()
    };
  }

  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: false, status: 409, message: "Create a pet profile before adding documents." };

  const { data, error } = await supabase
    .from("documents")
    .insert({
      pet_id: petResult.pet.id,
      storage_bucket: "metadata-only",
      storage_path: `metadata-only/${randomUUID()}`,
      ...createDocumentDatabasePayload(payloadResult.data),
      status: "metadata_only"
    })
    .select(DOCUMENT_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not save the document." };
  }

  return { ok: true, pet: mapPetProfileRow(petResult.pet), document: mapDocumentRow(data as unknown as DocumentRow) };
}

export async function updateOwnerDocument(
  documentId: string,
  input: unknown,
  supabase: SupabaseClient
): Promise<DocumentMutationResult> {
  const payloadResult = documentPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return {
      ok: false,
      status: 400,
      message: "Invalid document payload.",
      issues: payloadResult.error.flatten()
    };
  }

  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: false, status: 409, message: "Create a pet profile before editing documents." };

  const { data, error } = await supabase
    .from("documents")
    .update(createDocumentUpdatePayload(createDocumentDatabasePayload(payloadResult.data)))
    .eq("id", documentId)
    .eq("pet_id", petResult.pet.id)
    .select(DOCUMENT_COLUMNS)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not save the document." };
  }

  if (!data) {
    return { ok: false, status: 404, message: "Document not found." };
  }

  return { ok: true, pet: mapPetProfileRow(petResult.pet), document: mapDocumentRow(data as unknown as DocumentRow) };
}

export function mapDocumentRow(row: DocumentRow): DocumentResponse {
  return {
    id: row.id,
    petId: row.pet_id,
    title: row.document_title ?? row.original_filename ?? "Document",
    documentType: row.document_type,
    documentDate: row.document_date ?? row.created_at.slice(0, 10),
    providerName: row.provider_name,
    notes: row.notes,
    originalFilename: row.original_filename,
    mimeType: row.mime_type,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function createDocumentDatabasePayload(payload: DocumentPayload) {
  return {
    document_title: payload.title,
    document_type: payload.documentType,
    document_date: payload.documentDate,
    provider_name: payload.providerName,
    notes: payload.notes,
    original_filename: payload.originalFilename,
    mime_type: payload.mimeType
  };
}

type DocumentDatabasePayload = ReturnType<typeof createDocumentDatabasePayload>;

export function createDocumentUpdatePayload(payload: DocumentDatabasePayload, now: Date = new Date()) {
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
