import { readOwnerPetProfile, saveOwnerPetProfile } from "../../../../features/account/server/pet-profile";
import { createSupabaseRouteClient, jsonWithSupabaseCookies } from "../../../../lib/supabase/route-handler";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  if (!supabase) {
    return jsonWithSupabaseCookies(response, { ok: false, message: "Supabase is not configured." }, { status: 503 });
  }

  const result = await readOwnerPetProfile(supabase);
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

  const result = await saveOwnerPetProfile(body, supabase);
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : result.status });
}
