import { NextRequest, NextResponse } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const routeClientMock = vi.hoisted(() => ({
  supabase: {
    auth: {
      getUser: vi.fn()
    }
  }
}));

vi.mock("../../../../lib/supabase/route-handler", () => ({
  createSupabaseRouteClient: vi.fn((request: NextRequest) => ({
    supabase: routeClientMock.supabase,
    response: NextResponse.next({ request })
  })),
  jsonWithSupabaseCookies: vi.fn((_response: NextResponse, body: unknown, init?: ResponseInit) =>
    NextResponse.json(body, init)
  )
}));

import { GET, POST, PUT } from "./route";

describe("/api/account/settings unauthenticated access", () => {
  beforeEach(() => {
    routeClientMock.supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
  });

  it("rejects unauthenticated settings reads", async () => {
    const response = await GET(new NextRequest("http://localhost/api/account/settings"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated profile updates before table writes", async () => {
    const response = await PUT(
      new NextRequest("http://localhost/api/account/settings", {
        method: "PUT",
        body: JSON.stringify({ displayName: "Anna", language: "pl" })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated consent and data-rights actions before table writes", async () => {
    const consentResponse = await POST(
      new NextRequest("http://localhost/api/account/settings", {
        method: "POST",
        body: JSON.stringify({ action: "consent", payload: { analyticsConsent: true, marketingConsent: false, language: "pl" } })
      })
    );
    const exportResponse = await POST(
      new NextRequest("http://localhost/api/account/settings", {
        method: "POST",
        body: JSON.stringify({ action: "data_export", payload: { language: "pl" } })
      })
    );
    const deletionResponse = await POST(
      new NextRequest("http://localhost/api/account/settings", {
        method: "POST",
        body: JSON.stringify({ action: "account_deletion", payload: { confirmation: "DELETE", language: "pl" } })
      })
    );

    expect(consentResponse.status).toBe(401);
    expect(exportResponse.status).toBe(401);
    expect(deletionResponse.status).toBe(401);
  });
});
