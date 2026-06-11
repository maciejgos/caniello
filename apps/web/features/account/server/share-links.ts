import type {
  DocumentResponse,
  PetProfileResponse,
  ReminderResponse,
  ShareLinkResponse
} from "@caniello/contracts";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createHash, randomBytes } from "crypto";
import { mapDocumentRow } from "./documents";
import { mapPetProfileRow } from "./pet-profile";
import { mapReminderRow } from "./reminders";

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

type ShareLinkRow = {
  id: string;
  pet_id: string;
  token_hash: string;
  revoked_at: string | null;
  expires_at: string | null;
  created_at: string;
};

type ReminderRow = {
  id: string;
  pet_id: string;
  title: string;
  reminder_type: ReminderResponse["reminderType"];
  due_date: string;
  notes: string | null;
  status: ReminderResponse["status"];
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

type ShareLinkListResult =
  | { ok: true; pet: PetProfileResponse | null; shareLinks: ShareLinkResponse[] }
  | { ok: false; status: number; message: string };

type ShareLinkMutationResult =
  | { ok: true; pet: PetProfileResponse; shareLink: ShareLinkResponse }
  | { ok: false; status: number; message: string };

export type SharedCareCardResult =
  | {
      ok: true;
      pet: PetProfileResponse;
      reminders: ReminderResponse[];
      documents: DocumentResponse[];
      expiresAt: string | null;
    }
  | { ok: false; status: number; message: string };

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

const SHARE_LINK_COLUMNS = ["id", "pet_id", "token_hash", "revoked_at", "expires_at", "created_at"].join(", ");

const REMINDER_COLUMNS = [
  "id",
  "pet_id",
  "title",
  "reminder_type",
  "due_date",
  "notes",
  "status",
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

const defaultShareLinkTtlDays = 14;
const tokenByteLength = 32;

export async function listOwnerShareLinks(supabase: SupabaseClient, origin: string): Promise<ShareLinkListResult> {
  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: true, pet: null, shareLinks: [] };

  const { data, error } = await supabase
    .from("share_links")
    .select(SHARE_LINK_COLUMNS)
    .eq("pet_id", petResult.pet.id)
    .is("revoked_at", null)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    return { ok: false, status: 500, message: "Could not read share links." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    shareLinks: ((data ?? []) as unknown as ShareLinkRow[]).map((row) => mapShareLinkRow(row, origin))
  };
}

export async function createOwnerShareLink(supabase: SupabaseClient, origin: string): Promise<ShareLinkMutationResult> {
  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: false, status: 409, message: "Create a pet profile before sharing a care card." };

  const token = createShareToken();
  const expiresAt = new Date(Date.now() + defaultShareLinkTtlDays * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("share_links")
    .insert({
      pet_id: petResult.pet.id,
      token_hash: hashShareToken(token),
      expires_at: expiresAt
    })
    .select(SHARE_LINK_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not create the share link." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    shareLink: {
      ...mapShareLinkRow(data as unknown as ShareLinkRow, origin),
      url: buildShareUrl(origin, token)
    }
  };
}

export async function revokeOwnerShareLink(
  shareLinkId: string,
  supabase: SupabaseClient,
  origin: string,
  now: Date = new Date()
): Promise<ShareLinkMutationResult> {
  const petResult = await findOwnerFirstPet(supabase);
  if (!petResult.ok) return petResult;
  if (!petResult.pet) return { ok: false, status: 409, message: "Create a pet profile before editing share links." };

  const { data, error } = await supabase
    .from("share_links")
    .update({ revoked_at: now.toISOString() })
    .eq("id", shareLinkId)
    .eq("pet_id", petResult.pet.id)
    .select(SHARE_LINK_COLUMNS)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not revoke the share link." };
  }

  if (!data) {
    return { ok: false, status: 404, message: "Share link not found." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(petResult.pet),
    shareLink: mapShareLinkRow(data as unknown as ShareLinkRow, origin)
  };
}

export async function readSharedCareCard(token: string, supabase: SupabaseClient): Promise<SharedCareCardResult> {
  const tokenHash = hashShareToken(token);
  const now = new Date().toISOString();

  const { data: link, error: linkError } = await supabase
    .from("share_links")
    .select(SHARE_LINK_COLUMNS)
    .eq("token_hash", tokenHash)
    .is("revoked_at", null)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .maybeSingle();

  if (linkError) {
    return { ok: false, status: 500, message: "Could not load the shared care card." };
  }

  if (!link) {
    return { ok: false, status: 404, message: "This care card link is unavailable." };
  }

  const shareLink = link as unknown as ShareLinkRow;
  const { data: pet, error: petError } = await supabase
    .from("pets")
    .select(PET_PROFILE_COLUMNS)
    .eq("id", shareLink.pet_id)
    .maybeSingle();

  if (petError) {
    return { ok: false, status: 500, message: "Could not load the shared care card." };
  }

  if (!pet) {
    return { ok: false, status: 404, message: "This care card link is unavailable." };
  }

  const [remindersResult, documentsResult] = await Promise.all([
    supabase
      .from("reminders")
      .select(REMINDER_COLUMNS)
      .eq("pet_id", shareLink.pet_id)
      .in("status", ["active", "suggested"])
      .order("due_date", { ascending: true })
      .limit(3),
    supabase
      .from("documents")
      .select(DOCUMENT_COLUMNS)
      .eq("pet_id", shareLink.pet_id)
      .order("document_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3)
  ]);

  if (remindersResult.error || documentsResult.error) {
    return { ok: false, status: 500, message: "Could not load the shared care card." };
  }

  return {
    ok: true,
    pet: mapPetProfileRow(pet as unknown as PetProfileRow),
    reminders: ((remindersResult.data ?? []) as unknown as ReminderRow[]).map(mapReminderRow),
    documents: ((documentsResult.data ?? []) as unknown as DocumentRow[]).map(mapDocumentRow),
    expiresAt: shareLink.expires_at
  };
}

export function createShareToken(): string {
  return randomBytes(tokenByteLength).toString("base64url");
}

export function hashShareToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function mapShareLinkRow(row: ShareLinkRow, origin: string): ShareLinkResponse {
  void origin;

  return {
    id: row.id,
    petId: row.pet_id,
    expiresAt: row.expires_at,
    revokedAt: row.revoked_at,
    createdAt: row.created_at
  };
}

function buildShareUrl(origin: string, token: string): string {
  return `${origin.replace(/\/$/, "")}/share/${encodeURIComponent(token)}`;
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
