import { NextRequest, NextResponse } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const routeClientMock = vi.hoisted(() => ({
  supabase: {
    auth: {
      getUser: vi.fn()
    }
  }
}));

vi.mock("../../../lib/supabase/route-handler", () => ({
  createSupabaseRouteClient: vi.fn((request: NextRequest) => ({
    supabase: routeClientMock.supabase,
    response: NextResponse.next({ request })
  })),
  jsonWithSupabaseCookies: vi.fn((_response: NextResponse, body: unknown, init?: ResponseInit) =>
    NextResponse.json(body, init)
  )
}));

import { GET, POST, PUT } from "./route";

describe("/api/share-links unauthenticated access", () => {
  beforeEach(() => {
    routeClientMock.supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
  });

  it("rejects unauthenticated share-link reads", async () => {
    const response = await GET(new NextRequest("http://localhost/api/share-links"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated share-link creation before data access", async () => {
    const response = await POST(new NextRequest("http://localhost/api/share-links", { method: "POST" }));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated share-link revocation before data access", async () => {
    const response = await PUT(
      new NextRequest("http://localhost/api/share-links", {
        method: "PUT",
        body: JSON.stringify({
          id: "88888888-8888-4888-8888-888888888888",
          action: "revoke"
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });
});
