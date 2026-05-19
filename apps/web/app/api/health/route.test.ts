import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns a no-store 200 health response", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(body).toMatchObject({
      ok: true,
      service: "caniello-web"
    });
    expect(new Date(body.checkedAt).toISOString()).toBe(body.checkedAt);
  });
});
