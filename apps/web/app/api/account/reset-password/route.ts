import { requestPasswordReset } from "../../../../features/account/server/auth";
import { createSupabaseAccountAuthGateway } from "../../../../features/account/server/supabase-auth-gateway";
import { createSupabaseRouteClient, jsonWithSupabaseCookies } from "../../../../lib/supabase/route-handler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { supabase, response } = createSupabaseRouteClient(request);
  const result = await requestPasswordReset(await request.json(), supabase ? createSupabaseAccountAuthGateway(supabase) : null);
  return jsonWithSupabaseCookies(response, result, { status: result.ok ? 200 : 400 });
}
