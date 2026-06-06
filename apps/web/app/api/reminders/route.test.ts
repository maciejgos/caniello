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

describe("/api/reminders unauthenticated access", () => {
  beforeEach(() => {
    routeClientMock.supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
  });

  it("rejects unauthenticated reminder reads", async () => {
    const response = await GET(new NextRequest("http://localhost/api/reminders"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated reminder creation before data access", async () => {
    const response = await POST(
      new NextRequest("http://localhost/api/reminders", {
        method: "POST",
        body: JSON.stringify({
          title: "Rabies vaccine",
          reminderType: "vaccination",
          dueDate: "2026-07-12",
          notes: null
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });

  it("rejects unauthenticated reminder updates before data access", async () => {
    const response = await PUT(
      new NextRequest("http://localhost/api/reminders", {
        method: "PUT",
        body: JSON.stringify({
          id: "55555555-5555-4555-8555-555555555555",
          action: "complete"
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toMatchObject({ ok: false, message: "Authentication is required." });
  });
});
