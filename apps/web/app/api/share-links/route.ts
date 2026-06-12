import {
  createOwnerShareLink,
  listOwnerShareLinks,
  revokeOwnerShareLink
} from "../../../features/account/server/share-links";
import { createSupabaseRouteClient, jsonWithSupabaseCookies } from "../../../lib/supabase/route-handler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  const result = await listOwnerShareLinks(supabase, getRequestOrigin(request));
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : result.status });
}

export async function POST(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  const result = await createOwnerShareLink(supabase, getRequestOrigin(request));
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 201 : result.status });
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

  const shareLinkId = typeof body === "object" && body !== null && "id" in body ? String(body.id) : "";
  const action = typeof body === "object" && body !== null && "action" in body ? String(body.action) : "";
  if (!shareLinkId || action !== "revoke") {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Share link id and revoke action are required." }, { status: 400 });
  }

  const result = await revokeOwnerShareLink(shareLinkId, supabase, getRequestOrigin(request));
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : result.status });
}

function getRequestOrigin(request: NextRequest): string {
  return request.headers.get("origin") ?? request.nextUrl.origin;
}
