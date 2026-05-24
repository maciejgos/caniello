import { readSupabaseServerClientConfig } from "@caniello/db";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export function createSupabaseRouteClient(request: NextRequest) {
  const config = readSupabaseServerClientConfig();
  if (!config) {
    return { supabase: null, response: NextResponse.next({ request }) };
  }

  const response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  return { supabase, response };
}

export function jsonWithSupabaseCookies<T>(supabaseResponse: NextResponse, body: T, init?: ResponseInit) {
  const response = NextResponse.json(body, init);

  for (const cookie of supabaseResponse.cookies.getAll()) {
    response.cookies.set(cookie);
  }

  return response;
}
