import { describe, expect, it } from "vitest";
import { validateValidationEventPayload } from "./validation-events";

describe("validation event boundary", () => {
  it("accepts analytics consent events", () => {
    expect(validateValidationEventPayload({ name: "analytics_consent", analyticsConsent: true })).toMatchObject({
      ok: true,
      payload: { name: "analytics_consent" }
    });
  });

  it("rejects unsupported event names", () => {
    expect(validateValidationEventPayload({ name: "unexpected_event" })).toEqual({
      ok: false,
      status: 400,
      message: "Valid event name is required."
    });
  });
});

