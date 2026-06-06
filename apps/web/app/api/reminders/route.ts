import {
  completeOwnerReminder,
  createOwnerReminder,
  listOwnerReminders,
  updateOwnerReminder
} from "../../../features/account/server/reminders";
import { createSupabaseRouteClient, jsonWithSupabaseCookies } from "../../../lib/supabase/route-handler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  const result = await listOwnerReminders(supabase);
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

  const result = await createOwnerReminder(body, supabase);
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

  const reminderId = typeof body === "object" && body !== null && "id" in body ? String(body.id) : "";
  const action = typeof body === "object" && body !== null && "action" in body ? String(body.action) : "";
  if (!reminderId) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Reminder id is required." }, { status: 400 });
  }

  const payload = typeof body === "object" && body !== null
    ? Object.fromEntries(Object.entries(body).filter(([key]) => key !== "id" && key !== "action"))
    : body;
  const result = action === "complete" ? await completeOwnerReminder(reminderId, supabase) : await updateOwnerReminder(reminderId, payload, supabase);
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : result.status });
}
