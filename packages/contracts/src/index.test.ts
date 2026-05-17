import { describe, expect, it } from "vitest";
import { landingLeadPayloadSchema, validationEventPayloadSchema } from ".";

describe("Caniello API contracts", () => {
  it("accepts consented landing leads with UTM context", () => {
    expect(
      landingLeadPayloadSchema.parse({
        email: "owner@example.com",
        source: "landing_page_hero",
        leadConsent: true,
        language: "pl",
        utm: { utm_source: "newsletter" }
      })
    ).toMatchObject({ email: "owner@example.com" });
  });

  it("rejects lead segmentation fields handled by MailerLite survey", () => {
    expect(() =>
      landingLeadPayloadSchema.parse({
        email: "owner@example.com",
        source: "landing_page_hero",
        leadConsent: true,
        role: "pet_service_provider"
      })
    ).toThrow();
  });

  it("accepts consent and page-view validation events", () => {
    expect(validationEventPayloadSchema.parse({ name: "analytics_consent", analyticsConsent: true })).toMatchObject({
      name: "analytics_consent"
    });
  });
});

