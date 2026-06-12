import {
  readOwnerAccountSettings,
  recordOwnerConsent,
  requestOwnerAccountDeletion,
  requestOwnerDataExport,
  updateOwnerAccountProfile
} from "../../../../features/account/server/account-settings";
import { createSupabaseRouteClient, jsonWithSupabaseCookies } from "../../../../lib/supabase/route-handler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  const result = await readOwnerAccountSettings(supabase);
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : result.status });
}

export async function PUT(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const result = await updateOwnerAccountProfile(body, supabase);
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : result.status });
}

export async function POST(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  if (!isActionBody(body)) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Invalid account settings action." }, { status: 400 });
  }

  const result = body.action === "consent"
    ? await recordOwnerConsent(body.payload, supabase)
    : body.action === "data_export"
      ? await requestOwnerDataExport(body.payload, supabase)
      : await requestOwnerAccountDeletion(body.payload, supabase);

  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 201 : result.status });
}

function isActionBody(body: unknown): body is { action: "consent" | "data_export" | "account_deletion"; payload: unknown } {
  if (typeof body !== "object" || body === null) return false;
  const action = (body as { action?: unknown }).action;
  return action === "consent" || action === "data_export" || action === "account_deletion";
}
