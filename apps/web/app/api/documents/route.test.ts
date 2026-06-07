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

describe("/api/documents unauthenticated access", () => {
  beforeEach(() => {
    routeClientMock.supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
  });

  it("rejects unauthenticated document reads", async () => {
    const response = await GET(new NextRequest("http://localhost/api/documents"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated document creation before data access", async () => {
    const response = await POST(
      new NextRequest("http://localhost/api/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "Rabies certificate",
          documentType: "vaccination",
          documentDate: "2026-05-20"
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated document updates before data access", async () => {
    const response = await PUT(
      new NextRequest("http://localhost/api/documents", {
        method: "PUT",
        body: JSON.stringify({
          id: "77777777-7777-4777-8777-777777777777",
          title: "Rabies certificate",
          documentType: "vaccination",
          documentDate: "2026-05-20"
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });
});
