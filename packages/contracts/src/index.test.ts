import { describe, expect, it } from "vitest";
import {
  accountDeletionRequestPayloadSchema,
  accountLoginPayloadSchema,
  accountSignupPayloadSchema,
  consentPreferencePayloadSchema,
  createHealthPayload,
  createVersionPayload,
  dataExportRequestPayloadSchema,
  healthPayloadSchema,
  landingLeadPayloadSchema,
  passwordResetRequestPayloadSchema,
  petProfilePayloadSchema,
  petProfileResponseSchema,
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

  it("accepts owner account signup details with explicit terms acceptance", () => {
    expect(
      accountSignupPayloadSchema.parse({
        fullName: "Test Owner",
        email: "owner@example.com",
        password: "correct horse battery staple",
        language: "pl",
        acceptedTerms: true
      })
    ).toMatchObject({ fullName: "Test Owner", email: "owner@example.com", language: "pl" });
  });

  it("rejects invalid owner account credentials and unsupported languages", () => {
    expect(() =>
      accountSignupPayloadSchema.parse({
        fullName: "Test Owner",
        email: "not-an-email",
        password: "short",
        language: "de",
        acceptedTerms: true
      })
    ).toThrow();

    expect(() =>
      accountLoginPayloadSchema.parse({
        email: "owner@example.com",
        password: "short"
      })
    ).toThrow();
  });

  it("keeps owner account and privacy payloads strict", () => {
    expect(() =>
      passwordResetRequestPayloadSchema.parse({
        email: "owner@example.com",
        language: "en",
        redirectTo: "https://example.com/reset"
      })
    ).toThrow();

    expect(() =>
      consentPreferencePayloadSchema.parse({
        analyticsConsent: true,
        marketingConsent: false,
        language: "pl",
        trackingVendor: "unexpected"
      })
    ).toThrow();
  });

  it("accepts data-rights request payloads with clear confirmation", () => {
    expect(dataExportRequestPayloadSchema.parse({ language: "en" })).toEqual({ language: "en" });
    expect(
      accountDeletionRequestPayloadSchema.parse({
        confirmation: "DELETE",
        language: "pl"
      })
    ).toEqual({ confirmation: "DELETE", language: "pl" });
  });

  it("validates owner pet profile payloads and normalizes optional blanks", () => {
    expect(
      petProfilePayloadSchema.parse({
        name: " Bruno ",
        species: "dog",
        breed: "",
        birthDate: "2021-05-01",
        sexOrGender: "male",
        weightKg: 26.4,
        microchipNumber: " 616093900000000 ",
        allergies: "",
        medication: null,
        importantNotes: "Needs quiet handling at the clinic."
      })
    ).toEqual({
      name: "Bruno",
      species: "dog",
      breed: null,
      birthDate: "2021-05-01",
      sexOrGender: "male",
      weightKg: 26.4,
      microchipNumber: "616093900000000",
      allergies: null,
      medication: null,
      importantNotes: "Needs quiet handling at the clinic."
    });
  });

  it("rejects invalid pet profile payloads", () => {
    expect(() => petProfilePayloadSchema.parse({ name: "", weightKg: 12 })).toThrow();
    expect(() => petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "01-05-2021" })).toThrow();
    expect(() => petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2021-02-29" })).toThrow();
    expect(() => petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2021-02-30" })).toThrow();
    expect(() => petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2021-99-99" })).toThrow();
    expect(petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2024-02-29" }).birthDate).toBe("2024-02-29");
    expect(() => petProfilePayloadSchema.parse({ name: "Bruno", weightKg: 500 })).toThrow();
    expect(() => petProfilePayloadSchema.parse({ name: "Bruno", documentUpload: true })).toThrow();
  });

  it("accepts pet profile API responses without out-of-scope data", () => {
    expect(
      petProfileResponseSchema.parse({
        id: "44444444-4444-4444-8444-444444444444",
        householdId: "33333333-3333-4333-8333-333333333333",
        name: "Bruno",
        species: "dog",
        breed: "mixed breed",
        birthDate: "2021-05-01",
        sexOrGender: "male",
        weightKg: 26.4,
        microchipNumber: null,
        allergies: null,
        medication: null,
        importantNotes: null,
        createdAt: "2026-06-04T09:00:00.000Z",
        updatedAt: "2026-06-04T09:00:00.000Z"
      })
    ).toMatchObject({ name: "Bruno", weightKg: 26.4 });
  });
});
