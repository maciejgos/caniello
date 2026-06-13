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

describe("/api/timeline-events unauthenticated access", () => {
  beforeEach(() => {
    routeClientMock.supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
  });

  it("rejects unauthenticated timeline reads", async () => {
    const response = await GET(new NextRequest("http://localhost/api/timeline-events"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated timeline event creation before data access", async () => {
    const response = await POST(
      new NextRequest("http://localhost/api/timeline-events", {
        method: "POST",
        body: JSON.stringify({
          title: "Annual visit",
          eventType: "visit",
          eventDate: "2026-06-12",
          notes: null
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated timeline event updates before data access", async () => {
    const response = await PUT(
      new NextRequest("http://localhost/api/timeline-events", {
        method: "PUT",
        body: JSON.stringify({
          id: "66666666-6666-4666-8666-666666666666",
          title: "Updated visit",
          eventType: "visit",
          eventDate: "2026-06-13",
          notes: null
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });
});
