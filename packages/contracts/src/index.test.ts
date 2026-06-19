import { describe, expect, it } from "vitest";
import {
  accountDeletionRequestPayloadSchema,
  accountLoginPayloadSchema,
  accountSettingsApiResponseSchema,
  accountSignupPayloadSchema,
  consentPreferencePayloadSchema,
  createHealthPayload,
  createVersionPayload,
  dataExportRequestPayloadSchema,
  documentPayloadSchema,
  documentResponseSchema,
  healthPayloadSchema,
  landingLeadPayloadSchema,
  passwordResetRequestPayloadSchema,
  petProfilePayloadSchema,
  petProfileResponseSchema,
  reminderPayloadSchema,
  reminderResponseSchema,
  timelineEventPayloadSchema,
  timelineEventResponseSchema,
  validationEventPayloadSchema,
  versionPayloadSchema,
} from ".";

describe("Caniello API contracts", () => {
  it("accepts consented landing leads with UTM context", () => {
    expect(
      landingLeadPayloadSchema.parse({
        email: "owner@example.com",
        source: "landing_page_hero",
        leadConsent: true,
        language: "pl",
        utm: { utm_source: "newsletter" },
      }),
    ).toMatchObject({ email: "owner@example.com" });
  });

  it("rejects unsupported landing lead language values", () => {
    expect(() =>
      landingLeadPayloadSchema.parse({
        email: "owner@example.com",
        source: "landing_page_hero",
        leadConsent: true,
        language: "de",
      }),
    ).toThrow();
  });

  it("rejects lead segmentation fields handled by MailerLite survey", () => {
    expect(() =>
      landingLeadPayloadSchema.parse({
        email: "owner@example.com",
        source: "landing_page_hero",
        leadConsent: true,
        role: "pet_service_provider",
      }),
    ).toThrow();
  });

  it("accepts consent and page-view validation events", () => {
    expect(
      validationEventPayloadSchema.parse({
        name: "analytics_consent",
        analyticsConsent: true,
      }),
    ).toMatchObject({
      name: "analytics_consent",
    });
  });

  it("creates a health payload for the web service", () => {
    const payload = createHealthPayload(new Date("2026-05-19T12:00:00.000Z"));

    expect(healthPayloadSchema.parse(payload)).toEqual({
      ok: true,
      service: "caniello-web",
      checkedAt: "2026-05-19T12:00:00.000Z",
    });
  });

  it("creates a version payload without leaking deployment-only values", () => {
    const payload = createVersionPayload({
      version: "0.1.0",
      commit: "",
      environment: "preview",
    });

    expect(versionPayloadSchema.parse(payload)).toEqual({
      app: "web",
      version: "0.1.0",
      environment: "preview",
    });
  });

  it("accepts owner account signup details with explicit terms acceptance", () => {
    expect(
      accountSignupPayloadSchema.parse({
        fullName: "Test Owner",
        email: "owner@example.com",
        password: "correct horse battery staple",
        language: "pl",
        acceptedTerms: true,
      }),
    ).toMatchObject({
      fullName: "Test Owner",
      email: "owner@example.com",
      language: "pl",
    });
  });

  it("rejects invalid owner account credentials and unsupported languages", () => {
    expect(() =>
      accountSignupPayloadSchema.parse({
        fullName: "Test Owner",
        email: "not-an-email",
        password: "short",
        language: "de",
        acceptedTerms: true,
      }),
    ).toThrow();

    expect(() =>
      accountLoginPayloadSchema.parse({
        email: "owner@example.com",
        password: "short",
      }),
    ).toThrow();
  });

  it("keeps owner account and privacy payloads strict", () => {
    expect(() =>
      passwordResetRequestPayloadSchema.parse({
        email: "owner@example.com",
        language: "en",
        redirectTo: "https://example.com/reset",
      }),
    ).toThrow();

    expect(() =>
      consentPreferencePayloadSchema.parse({
        analyticsConsent: true,
        marketingConsent: false,
        language: "pl",
        trackingVendor: "unexpected",
      }),
    ).toThrow();
  });

  it("accepts data-rights request payloads with clear confirmation", () => {
    expect(dataExportRequestPayloadSchema.parse({ language: "en" })).toEqual({
      language: "en",
    });
    expect(
      accountDeletionRequestPayloadSchema.parse({
        confirmation: "DELETE",
        language: "pl",
      }),
    ).toEqual({ confirmation: "DELETE", language: "pl" });
  });

  it("validates account settings API responses without completed export or deletion files", () => {
    expect(
      accountSettingsApiResponseSchema.parse({
        ok: true,
        ownerEmail: "anna@example.com",
        profile: {
          id: "11111111-1111-4111-8111-111111111111",
          displayName: "Anna Kowalska",
          language: "pl",
          createdAt: "2026-06-12T08:00:00.000Z",
          updatedAt: "2026-06-12T08:00:00.000Z",
        },
        latestConsent: {
          id: "22222222-2222-4222-8222-222222222222",
          analyticsConsent: true,
          marketingConsent: false,
          language: "pl",
          createdAt: "2026-06-12T08:05:00.000Z",
        },
        latestDataExportRequest: {
          id: "33333333-3333-4333-8333-333333333333",
          status: "requested",
          requestedAt: "2026-06-12T08:10:00.000Z",
        },
        latestDeletionRequest: null,
      }),
    ).toMatchObject({
      ok: true,
      ownerEmail: "anna@example.com",
      profile: { displayName: "Anna Kowalska" },
      latestDataExportRequest: { status: "requested" },
    });

    expect(() =>
      accountSettingsApiResponseSchema.parse({
        ok: true,
        exportDownloadUrl: "https://example.com/private.zip",
      }),
    ).toThrow();
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
        importantNotes: "Needs quiet handling at the clinic.",
      }),
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
      importantNotes: "Needs quiet handling at the clinic.",
    });
  });

  it("rejects invalid pet profile payloads", () => {
    expect(() =>
      petProfilePayloadSchema.parse({ name: "", weightKg: 12 }),
    ).toThrow();
    expect(() =>
      petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "01-05-2021" }),
    ).toThrow();
    expect(() =>
      petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2021-02-29" }),
    ).toThrow();
    expect(() =>
      petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2021-02-30" }),
    ).toThrow();
    expect(() =>
      petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2021-99-99" }),
    ).toThrow();
    expect(
      petProfilePayloadSchema.parse({ name: "Bruno", birthDate: "2024-02-29" })
        .birthDate,
    ).toBe("2024-02-29");
    expect(() =>
      petProfilePayloadSchema.parse({ name: "Bruno", weightKg: 500 }),
    ).toThrow();
    expect(() =>
      petProfilePayloadSchema.parse({ name: "Bruno", documentUpload: true }),
    ).toThrow();
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
        updatedAt: "2026-06-04T09:00:00.000Z",
      }),
    ).toMatchObject({ name: "Bruno", weightKg: 26.4 });
  });

  it("validates owner care reminder payloads and normalizes optional blanks", () => {
    expect(
      reminderPayloadSchema.parse({
        title: " Rabies vaccine ",
        reminderType: "vaccination",
        dueDate: "2026-07-12",
        notes: "  Bring previous record. ",
      }),
    ).toEqual({
      title: "Rabies vaccine",
      reminderType: "vaccination",
      dueDate: "2026-07-12",
      notes: "Bring previous record.",
    });

    expect(
      reminderPayloadSchema.parse({
        title: "Vet visit",
        reminderType: "visit",
        dueDate: "2026-08-01",
        notes: "",
      }).notes,
    ).toBeNull();
  });

  it("rejects invalid care reminder payloads", () => {
    expect(() =>
      reminderPayloadSchema.parse({
        title: "",
        reminderType: "visit",
        dueDate: "2026-08-01",
      }),
    ).toThrow();
    expect(() =>
      reminderPayloadSchema.parse({
        title: "Dose",
        reminderType: "medication",
        dueDate: "2026-02-30",
      }),
    ).toThrow();
    expect(() =>
      reminderPayloadSchema.parse({
        title: "Dose",
        reminderType: "calendar",
        dueDate: "2026-08-01",
      }),
    ).toThrow();
    expect(() =>
      reminderPayloadSchema.parse({
        title: "Dose",
        reminderType: "medication",
        dueDate: "2026-08-01",
        notifyByEmail: true,
      }),
    ).toThrow();
  });

  it("accepts reminder API responses without notification or AI fields", () => {
    expect(
      reminderResponseSchema.parse({
        id: "55555555-5555-4555-8555-555555555555",
        petId: "44444444-4444-4444-8444-444444444444",
        title: "Rabies vaccine",
        reminderType: "vaccination",
        dueDate: "2026-07-12",
        notes: null,
        status: "active",
        createdAt: "2026-06-06T09:00:00.000Z",
        updatedAt: "2026-06-06T09:00:00.000Z",
      }),
    ).toMatchObject({
      title: "Rabies vaccine",
      reminderType: "vaccination",
      status: "active",
    });
  });

  it("validates owner timeline event payloads and normalizes optional blanks", () => {
    expect(
      timelineEventPayloadSchema.parse({
        title: " Annual visit ",
        eventType: "visit",
        eventDate: "2026-06-12",
        notes: "  Weight check and vaccine plan. ",
      }),
    ).toEqual({
      title: "Annual visit",
      eventType: "visit",
      eventDate: "2026-06-12",
      notes: "Weight check and vaccine plan.",
    });

    expect(
      timelineEventPayloadSchema.parse({
        title: "Rabies vaccine",
        eventType: "vaccination",
        eventDate: "2026-05-20",
        notes: "",
      }).notes,
    ).toBeNull();
  });

  it("rejects timeline event payloads that imply automation or unsupported links", () => {
    expect(() =>
      timelineEventPayloadSchema.parse({
        title: "",
        eventType: "visit",
        eventDate: "2026-06-12",
      }),
    ).toThrow();
    expect(() =>
      timelineEventPayloadSchema.parse({
        title: "Visit",
        eventType: "clinic_upload",
        eventDate: "2026-06-12",
      }),
    ).toThrow();
    expect(() =>
      timelineEventPayloadSchema.parse({
        title: "Visit",
        eventType: "visit",
        eventDate: "2026-02-30",
      }),
    ).toThrow();
    expect(() =>
      timelineEventPayloadSchema.parse({
        title: "Generated note",
        eventType: "document",
        eventDate: "2026-06-12",
        sourceDocumentId: "77777777-7777-4777-8777-777777777777",
      }),
    ).toThrow();
  });

  it("accepts timeline API responses without generated medical guidance", () => {
    expect(
      timelineEventResponseSchema.parse({
        id: "66666666-6666-4666-8666-666666666666",
        petId: "44444444-4444-4444-8444-444444444444",
        title: "Annual visit",
        eventType: "visit",
        eventDate: "2026-06-12",
        notes: null,
        createdAt: "2026-06-12T09:00:00.000Z",
        updatedAt: "2026-06-12T09:00:00.000Z",
      }),
    ).toMatchObject({ title: "Annual visit", eventType: "visit" });

    expect(() =>
      timelineEventResponseSchema.parse({
        id: "66666666-6666-4666-8666-666666666666",
        petId: "44444444-4444-4444-8444-444444444444",
        title: "Annual visit",
        eventType: "visit",
        eventDate: "2026-06-12",
        diagnosis: "AI-generated diagnosis",
        createdAt: "2026-06-12T09:00:00.000Z",
        updatedAt: "2026-06-12T09:00:00.000Z",
      }),
    ).toThrow();
  });

  it("validates owner document metadata payloads and normalizes optional blanks", () => {
    expect(
      documentPayloadSchema.parse({
        title: " Rabies certificate ",
        documentType: "vaccination",
        documentDate: "2026-05-20",
        providerName: "  Riverside Animal Hospital ",
        notes: "",
        originalFilename: " rabies.pdf ",
        mimeType: " application/pdf ",
      }),
    ).toEqual({
      title: "Rabies certificate",
      documentType: "vaccination",
      documentDate: "2026-05-20",
      providerName: "Riverside Animal Hospital",
      notes: null,
      originalFilename: "rabies.pdf",
      mimeType: "application/pdf",
    });
  });

  it("rejects document metadata payloads that imply unsupported behavior", () => {
    expect(() =>
      documentPayloadSchema.parse({
        title: "",
        documentType: "vaccination",
        documentDate: "2026-05-20",
      }),
    ).toThrow();
    expect(() =>
      documentPayloadSchema.parse({
        title: "Lab",
        documentType: "lab",
        documentDate: "2026-05-20",
      }),
    ).toThrow();
    expect(() =>
      documentPayloadSchema.parse({
        title: "Lab",
        documentType: "lab_result",
        documentDate: "2026-02-30",
      }),
    ).toThrow();
    expect(() =>
      documentPayloadSchema.parse({
        title: "Lab",
        documentType: "lab_result",
        documentDate: "2026-05-20",
        storagePath: "owner/upload.pdf",
      }),
    ).toThrow();
  });

  it("accepts document metadata API responses without upload or AI fields", () => {
    expect(
      documentResponseSchema.parse({
        id: "77777777-7777-4777-8777-777777777777",
        petId: "44444444-4444-4444-8444-444444444444",
        title: "Rabies certificate",
        documentType: "vaccination",
        documentDate: "2026-05-20",
        providerName: "Riverside Animal Hospital",
        notes: null,
        originalFilename: "rabies.pdf",
        mimeType: "application/pdf",
        status: "metadata_only",
        createdAt: "2026-06-07T10:00:00.000Z",
        updatedAt: "2026-06-07T10:00:00.000Z",
      }),
    ).toMatchObject({
      title: "Rabies certificate",
      documentType: "vaccination",
      status: "metadata_only",
    });
  });
});
