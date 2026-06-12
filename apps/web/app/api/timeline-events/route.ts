import {
  createOwnerTimelineEvent,
  listOwnerTimelineEvents,
  updateOwnerTimelineEvent
} from "../../../features/account/server/timeline-events";
import { createSupabaseRouteClient, jsonWithSupabaseCookies } from "../../../lib/supabase/route-handler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  const result = await listOwnerTimelineEvents(supabase);
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

  const result = await createOwnerTimelineEvent(body, supabase);
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

  const eventId = typeof body === "object" && body !== null && "id" in body ? String(body.id) : "";
  if (!eventId) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Timeline event id is required." }, { status: 400 });
  }

  const payload = typeof body === "object" && body !== null
    ? Object.fromEntries(Object.entries(body).filter(([key]) => key !== "id"))
    : body;
  const result = await updateOwnerTimelineEvent(eventId, payload, supabase);
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : result.status });
}
