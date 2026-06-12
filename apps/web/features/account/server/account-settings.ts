import {
  accountDeletionRequestPayloadSchema,
  accountProfileUpdatePayloadSchema,
  consentPreferencePayloadSchema,
  dataExportRequestPayloadSchema,
  type AccountDeletionRequestResponse,
  type AccountProfileResponse,
  type ConsentEventResponse,
  type DataExportRequestResponse
} from "@caniello/contracts";
import type { SupabaseClient, User } from "@supabase/supabase-js";

type AccountProfileRow = {
  id: string;
  display_name: string | null;
  language: AccountProfileResponse["language"];
  created_at: string;
  updated_at: string;
};

type ConsentEventRow = {
  id: string;
  analytics_consent: boolean;
  marketing_consent: boolean | null;
  language: ConsentEventResponse["language"];
  created_at: string;
};

type DataRightsRequestRow = {
  id: string;
  status: DataExportRequestResponse["status"];
  requested_at: string;
};

type AccountSettingsSnapshot = {
  profile: AccountProfileResponse | null;
  latestConsent: ConsentEventResponse | null;
  latestDataExportRequest: DataExportRequestResponse | null;
  latestDeletionRequest: AccountDeletionRequestResponse | null;
};

type AccountSettingsResult =
  | ({ ok: true } & AccountSettingsSnapshot)
  | { ok: false; status: number; message: string; issues?: unknown };

type AccountSettingsMutationResult =
  | ({ ok: true } & Partial<AccountSettingsSnapshot>)
  | { ok: false; status: number; message: string; issues?: unknown };

const ACCOUNT_PROFILE_COLUMNS = ["id", "display_name", "language", "created_at", "updated_at"].join(", ");
const CONSENT_EVENT_COLUMNS = ["id", "analytics_consent", "marketing_consent", "language", "created_at"].join(", ");
const DATA_RIGHTS_REQUEST_COLUMNS = ["id", "status", "requested_at"].join(", ");

export async function readOwnerAccountSettings(supabase: SupabaseClient): Promise<AccountSettingsResult> {
  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const [profileResult, consentResult, exportRequestResult, deletionRequestResult] = await Promise.all([
    readAccountProfile(supabase, authResult.user.id),
    readLatestConsent(supabase, authResult.user.id),
    readLatestDataRightsRequest(supabase, "data_export_requests", authResult.user.id),
    readLatestDataRightsRequest(supabase, "account_deletion_requests", authResult.user.id)
  ]);

  if (!profileResult.ok) return profileResult;
  if (!consentResult.ok) return consentResult;
  if (!exportRequestResult.ok) return exportRequestResult;
  if (!deletionRequestResult.ok) return deletionRequestResult;

  return {
    ok: true,
    profile: profileResult.profile,
    latestConsent: consentResult.latestConsent,
    latestDataExportRequest: exportRequestResult.request,
    latestDeletionRequest: deletionRequestResult.request
  };
}

export async function updateOwnerAccountProfile(input: unknown, supabase: SupabaseClient): Promise<AccountSettingsMutationResult> {
  const payloadResult = accountProfileUpdatePayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return { ok: false, status: 400, message: "Invalid account profile payload.", issues: payloadResult.error.flatten() };
  }

  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const { data, error } = await supabase
    .from("account_profiles")
    .upsert({
      owner_user_id: authResult.user.id,
      display_name: payloadResult.data.displayName ?? null,
      language: payloadResult.data.language,
      updated_at: new Date().toISOString()
    }, { onConflict: "owner_user_id" })
    .select(ACCOUNT_PROFILE_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not save account profile." };
  }

  return { ok: true, profile: mapAccountProfileRow(data as unknown as AccountProfileRow) };
}

export async function recordOwnerConsent(input: unknown, supabase: SupabaseClient): Promise<AccountSettingsMutationResult> {
  const payloadResult = consentPreferencePayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return { ok: false, status: 400, message: "Invalid consent payload.", issues: payloadResult.error.flatten() };
  }

  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const { data, error } = await supabase
    .from("consent_events")
    .insert({
      owner_user_id: authResult.user.id,
      analytics_consent: payloadResult.data.analyticsConsent,
      marketing_consent: payloadResult.data.marketingConsent ?? null,
      language: payloadResult.data.language
    })
    .select(CONSENT_EVENT_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not record consent preferences." };
  }

  return { ok: true, latestConsent: mapConsentEventRow(data as unknown as ConsentEventRow) };
}

export async function requestOwnerDataExport(input: unknown, supabase: SupabaseClient): Promise<AccountSettingsMutationResult> {
  const payloadResult = dataExportRequestPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return { ok: false, status: 400, message: "Invalid data export request payload.", issues: payloadResult.error.flatten() };
  }

  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const { data, error } = await supabase
    .from("data_export_requests")
    .insert({ owner_user_id: authResult.user.id, language: payloadResult.data.language })
    .select(DATA_RIGHTS_REQUEST_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not request data export." };
  }

  return { ok: true, latestDataExportRequest: mapDataExportRequestRow(data as unknown as DataRightsRequestRow) };
}

export async function requestOwnerAccountDeletion(input: unknown, supabase: SupabaseClient): Promise<AccountSettingsMutationResult> {
  const payloadResult = accountDeletionRequestPayloadSchema.safeParse(input);
  if (!payloadResult.success) {
    return { ok: false, status: 400, message: "Invalid account deletion request payload.", issues: payloadResult.error.flatten() };
  }

  const authResult = await getAuthenticatedUser(supabase);
  if (!authResult.ok) return authResult;

  const { data, error } = await supabase
    .from("account_deletion_requests")
    .insert({ owner_user_id: authResult.user.id, language: payloadResult.data.language })
    .select(DATA_RIGHTS_REQUEST_COLUMNS)
    .single();

  if (error || !data) {
    return { ok: false, status: 500, message: "Could not request account deletion." };
  }

  return { ok: true, latestDeletionRequest: mapAccountDeletionRequestRow(data as unknown as DataRightsRequestRow) };
}

export function mapAccountProfileRow(row: AccountProfileRow): AccountProfileResponse {
  return {
    id: row.id,
    displayName: row.display_name,
    language: row.language,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function mapConsentEventRow(row: ConsentEventRow): ConsentEventResponse {
  return {
    id: row.id,
    analyticsConsent: row.analytics_consent,
    marketingConsent: row.marketing_consent,
    language: row.language,
    createdAt: row.created_at
  };
}

export function mapDataExportRequestRow(row: DataRightsRequestRow): DataExportRequestResponse {
  return {
    id: row.id,
    status: row.status,
    requestedAt: row.requested_at
  };
}

export function mapAccountDeletionRequestRow(row: DataRightsRequestRow): AccountDeletionRequestResponse {
  return {
    id: row.id,
    status: row.status,
    requestedAt: row.requested_at
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

async function readAccountProfile(
  supabase: SupabaseClient,
  ownerUserId: string
): Promise<{ ok: true; profile: AccountProfileResponse | null } | { ok: false; status: number; message: string }> {
  const { data, error } = await supabase
    .from("account_profiles")
    .select(ACCOUNT_PROFILE_COLUMNS)
    .eq("owner_user_id", ownerUserId)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not read account profile." };
  }

  return { ok: true, profile: data ? mapAccountProfileRow(data as unknown as AccountProfileRow) : null };
}

async function readLatestConsent(
  supabase: SupabaseClient,
  ownerUserId: string
): Promise<{ ok: true; latestConsent: ConsentEventResponse | null } | { ok: false; status: number; message: string }> {
  const { data, error } = await supabase
    .from("consent_events")
    .select(CONSENT_EVENT_COLUMNS)
    .eq("owner_user_id", ownerUserId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not read consent preferences." };
  }

  return { ok: true, latestConsent: data ? mapConsentEventRow(data as unknown as ConsentEventRow) : null };
}

async function readLatestDataRightsRequest(
  supabase: SupabaseClient,
  table: "data_export_requests" | "account_deletion_requests",
  ownerUserId: string
): Promise<{ ok: true; request: DataExportRequestResponse | AccountDeletionRequestResponse | null } | { ok: false; status: number; message: string }> {
  const { data, error } = await supabase
    .from(table)
    .select(DATA_RIGHTS_REQUEST_COLUMNS)
    .eq("owner_user_id", ownerUserId)
    .order("requested_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { ok: false, status: 500, message: "Could not read data-rights requests." };
  }

  if (!data) return { ok: true, request: null };

  return {
    ok: true,
    request: table === "data_export_requests"
      ? mapDataExportRequestRow(data as unknown as DataRightsRequestRow)
      : mapAccountDeletionRequestRow(data as unknown as DataRightsRequestRow)
  };
}
