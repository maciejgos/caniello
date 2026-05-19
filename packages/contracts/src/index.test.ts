import { describe, expect, it } from "vitest";
import {
  createHealthPayload,
  createVersionPayload,
  healthPayloadSchema,
  landingLeadPayloadSchema,
  validationEventPayloadSchema,
  versionPayloadSchema
} from ".";

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

  it("rejects unsupported landing lead language values", () => {
    expect(() =>
      landingLeadPayloadSchema.parse({
        email: "owner@example.com",
        source: "landing_page_hero",
        leadConsent: true,
        language: "de"
      })
    ).toThrow();
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

  it("creates a health payload for the web service", () => {
    const payload = createHealthPayload(new Date("2026-05-19T12:00:00.000Z"));

    expect(healthPayloadSchema.parse(payload)).toEqual({
      ok: true,
      service: "caniello-web",
      checkedAt: "2026-05-19T12:00:00.000Z"
    });
  });

  it("creates a version payload without leaking deployment-only values", () => {
    const payload = createVersionPayload({
      version: "0.1.0",
      commit: "",
      environment: "preview"
    });

    expect(versionPayloadSchema.parse(payload)).toEqual({
      app: "web",
      version: "0.1.0",
      environment: "preview"
    });
  });
});

