import { z } from "zod";

export const leadSources = [
  "landing_page_hero",
  "landing_page_mid_cta",
  "landing_page_footer",
  "landing_page_wave2",
  "landing_page_wave3"
] as const;

export const landingLeadLanguages = ["pl", "en"] as const;

export const utmSchema = z.record(z.string(), z.string());

export const landingLeadPayloadSchema = z
  .object({
    email: z.string().email(),
    source: z.enum(leadSources).optional(),
    leadConsent: z.literal(true),
    language: z.enum(landingLeadLanguages),
    utm: utmSchema.optional()
  })
  .strict();

export type LandingLeadLanguage = (typeof landingLeadLanguages)[number];
export type LandingLeadPayload = z.infer<typeof landingLeadPayloadSchema>;

export const validationEventNames = [
  "analytics_consent",
  "page_view",
  "waitlist_submit",
  "waitlist_success",
  "waitlist_error"
] as const;

export const validationEventPayloadSchema = z
  .object({
    name: z.enum(validationEventNames),
    source: z.enum(leadSources).optional(),
    analyticsConsent: z.boolean().optional(),
    utm: utmSchema.optional(),
    createdAt: z.string().datetime().optional()
  })
  .strict();

export type ValidationEventPayload = z.infer<typeof validationEventPayloadSchema>;

export const healthPayloadSchema = z
  .object({
    ok: z.literal(true),
    service: z.literal("caniello-web"),
    checkedAt: z.string().datetime()
  })
  .strict();

export type HealthPayload = z.infer<typeof healthPayloadSchema>;

export function createHealthPayload(now: Date = new Date()): HealthPayload {
  return {
    ok: true,
    service: "caniello-web",
    checkedAt: now.toISOString()
  };
}

export const versionPayloadSchema = z
  .object({
    app: z.literal("web"),
    version: z.string().min(1),
    commit: z.string().min(1).optional(),
    environment: z.string().min(1).optional()
  })
  .strict();

export type VersionPayload = z.infer<typeof versionPayloadSchema>;

export type VersionPayloadInput = {
  version: string;
  commit?: string | null;
  environment?: string | null;
};

export function createVersionPayload(input: VersionPayloadInput): VersionPayload {
  return versionPayloadSchema.parse({
    app: "web",
    version: input.version,
    commit: input.commit || undefined,
    environment: input.environment || undefined
  });
}

export const accountLanguages = ["pl", "en"] as const;
export const accountLanguageSchema = z.enum(accountLanguages);
export type AccountLanguage = z.infer<typeof accountLanguageSchema>;

const ownerEmailSchema = z.string().trim().toLowerCase().email();
const ownerPasswordSchema = z.string().min(12);

export const accountSignupPayloadSchema = z
  .object({
    fullName: z.string().trim().min(1).max(120),
    email: ownerEmailSchema,
    password: ownerPasswordSchema,
    language: accountLanguageSchema,
    acceptedTerms: z.literal(true)
  })
  .strict();

export type AccountSignupPayload = z.infer<typeof accountSignupPayloadSchema>;

export const accountLoginPayloadSchema = z
  .object({
    email: ownerEmailSchema,
    password: ownerPasswordSchema
  })
  .strict();

export type AccountLoginPayload = z.infer<typeof accountLoginPayloadSchema>;

export const passwordResetRequestPayloadSchema = z
  .object({
    email: ownerEmailSchema,
    language: accountLanguageSchema
  })
  .strict();

export type PasswordResetRequestPayload = z.infer<typeof passwordResetRequestPayloadSchema>;

export const accountProfileUpdatePayloadSchema = z
  .object({
    displayName: z.string().trim().min(1).max(120).optional(),
    language: accountLanguageSchema
  })
  .strict();

export type AccountProfileUpdatePayload = z.infer<typeof accountProfileUpdatePayloadSchema>;

export const consentPreferencePayloadSchema = z
  .object({
    analyticsConsent: z.boolean(),
    marketingConsent: z.boolean().optional(),
    language: accountLanguageSchema
  })
  .strict();

export type ConsentPreferencePayload = z.infer<typeof consentPreferencePayloadSchema>;

export const dataExportRequestPayloadSchema = z
  .object({
    language: accountLanguageSchema
  })
  .strict();

export type DataExportRequestPayload = z.infer<typeof dataExportRequestPayloadSchema>;

export const accountDeletionRequestPayloadSchema = z
  .object({
    confirmation: z.literal("DELETE"),
    language: accountLanguageSchema
  })
  .strict();

export type AccountDeletionRequestPayload = z.infer<typeof accountDeletionRequestPayloadSchema>;

export const dataRightsRequestStatuses = ["requested", "processing", "completed", "failed", "cancelled"] as const;
export const dataRightsRequestStatusSchema = z.enum(dataRightsRequestStatuses);

export const dataExportRequestResponseSchema = z
  .object({
    id: z.string().uuid(),
    status: dataRightsRequestStatusSchema,
    requestedAt: z.string().datetime()
  })
  .strict();

export type DataExportRequestResponse = z.infer<typeof dataExportRequestResponseSchema>;

export const accountDeletionRequestResponseSchema = z
  .object({
    id: z.string().uuid(),
    status: dataRightsRequestStatusSchema,
    requestedAt: z.string().datetime()
  })
  .strict();

export type AccountDeletionRequestResponse = z.infer<typeof accountDeletionRequestResponseSchema>;

export const accountPrivacyAuditActions = {
  profileUpdated: "account.profile_updated",
  consentUpdated: "account.consent_updated",
  dataExportRequested: "account.data_export_requested",
  accountDeletionRequested: "account.deletion_requested"
} as const;

export const accountPrivacyAuditActionNames = [
  accountPrivacyAuditActions.profileUpdated,
  accountPrivacyAuditActions.consentUpdated,
  accountPrivacyAuditActions.dataExportRequested,
  accountPrivacyAuditActions.accountDeletionRequested
] as const;

export const accountPrivacyAuditActionSchema = z.enum(accountPrivacyAuditActionNames);
export type AccountPrivacyAuditAction = z.infer<typeof accountPrivacyAuditActionSchema>;

const optionalProfileTextSchema = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .nullable()
    .transform((value) => {
      if (!value) return null;
      return value.length > 0 ? value : null;
    });

function isRealCalendarDate(value: string): boolean {
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1000 || month < 1 || month > 12 || day < 1 || day > 31) return false;

  const date = new Date(Date.UTC(year, month - 1, day));

  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

const optionalCalendarDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(isRealCalendarDate)
  .optional()
  .nullable()
  .transform((value) => value || null);

export const petProfilePayloadSchema = z
  .object({
    name: z.string().trim().min(1).max(80),
    species: optionalProfileTextSchema(60),
    breed: optionalProfileTextSchema(120),
    birthDate: optionalCalendarDateSchema,
    sexOrGender: optionalProfileTextSchema(60),
    weightKg: z.number().min(0).max(250).optional().nullable().transform((value) => value ?? null),
    microchipNumber: optionalProfileTextSchema(64),
    allergies: optionalProfileTextSchema(2000),
    medication: optionalProfileTextSchema(2000),
    importantNotes: optionalProfileTextSchema(4000)
  })
  .strict();

export type PetProfilePayload = z.infer<typeof petProfilePayloadSchema>;

export const petProfileResponseSchema = z
  .object({
    id: z.string().uuid(),
    householdId: z.string().uuid(),
    name: z.string(),
    species: z.string().nullable(),
    breed: z.string().nullable(),
    birthDate: z.string().nullable(),
    sexOrGender: z.string().nullable(),
    weightKg: z.number().nullable(),
    microchipNumber: z.string().nullable(),
    allergies: z.string().nullable(),
    medication: z.string().nullable(),
    importantNotes: z.string().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  })
  .strict();

export type PetProfileResponse = z.infer<typeof petProfileResponseSchema>;

export const petProfileApiResponseSchema = z
  .object({
    ok: z.boolean(),
    pet: petProfileResponseSchema.nullable().optional(),
    message: z.string().optional(),
    issues: z.unknown().optional()
  })
  .strict();

export type PetProfileApiResponse = z.infer<typeof petProfileApiResponseSchema>;

export const reminderTypes = ["vaccination", "medication", "deworming", "visit", "other"] as const;
export const reminderTypeSchema = z.enum(reminderTypes);
export type ReminderType = z.infer<typeof reminderTypeSchema>;

export const reminderStatuses = ["suggested", "active", "completed", "dismissed"] as const;
export const reminderStatusSchema = z.enum(reminderStatuses);
export type ReminderStatus = z.infer<typeof reminderStatusSchema>;

const optionalReminderTextSchema = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .nullable()
    .transform((value) => {
      if (!value) return null;
      return value.length > 0 ? value : null;
    });

const requiredCalendarDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(isRealCalendarDate);

export const reminderPayloadSchema = z
  .object({
    title: z.string().trim().min(1).max(120),
    reminderType: reminderTypeSchema,
    dueDate: requiredCalendarDateSchema,
    notes: optionalReminderTextSchema(1000),
    status: reminderStatusSchema.optional()
  })
  .strict();

export type ReminderPayload = z.infer<typeof reminderPayloadSchema>;

export const reminderResponseSchema = z
  .object({
    id: z.string().uuid(),
    petId: z.string().uuid(),
    title: z.string(),
    reminderType: reminderTypeSchema,
    dueDate: z.string(),
    notes: z.string().nullable(),
    status: reminderStatusSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  })
  .strict();

export type ReminderResponse = z.infer<typeof reminderResponseSchema>;

export const remindersApiResponseSchema = z
  .object({
    ok: z.boolean(),
    pet: petProfileResponseSchema.nullable().optional(),
    reminders: z.array(reminderResponseSchema).optional(),
    reminder: reminderResponseSchema.optional(),
    message: z.string().optional(),
    issues: z.unknown().optional()
  })
  .strict();

export type RemindersApiResponse = z.infer<typeof remindersApiResponseSchema>;

export const documentTypes = ["vaccination", "lab_result", "visit_summary", "prescription", "insurance", "travel", "other"] as const;
export const documentTypeSchema = z.enum(documentTypes);
export type DocumentType = z.infer<typeof documentTypeSchema>;

export const documentStatuses = ["metadata_only", "uploaded", "processing", "extracted", "needs_review", "confirmed", "failed", "archived"] as const;
export const documentStatusSchema = z.enum(documentStatuses);
export type DocumentStatus = z.infer<typeof documentStatusSchema>;

const optionalDocumentTextSchema = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .nullable()
    .transform((value) => {
      if (!value) return null;
      return value.length > 0 ? value : null;
    });

export const documentPayloadSchema = z
  .object({
    title: z.string().trim().min(1).max(160),
    documentType: documentTypeSchema,
    documentDate: requiredCalendarDateSchema,
    providerName: optionalDocumentTextSchema(160),
    notes: optionalDocumentTextSchema(2000),
    originalFilename: optionalDocumentTextSchema(240),
    mimeType: optionalDocumentTextSchema(120)
  })
  .strict();

export type DocumentPayload = z.infer<typeof documentPayloadSchema>;

export const documentResponseSchema = z
  .object({
    id: z.string().uuid(),
    petId: z.string().uuid(),
    title: z.string(),
    documentType: documentTypeSchema,
    documentDate: z.string(),
    providerName: z.string().nullable(),
    notes: z.string().nullable(),
    originalFilename: z.string().nullable(),
    mimeType: z.string().nullable(),
    status: documentStatusSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  })
  .strict();

export type DocumentResponse = z.infer<typeof documentResponseSchema>;

export const documentsApiResponseSchema = z
  .object({
    ok: z.boolean(),
    pet: petProfileResponseSchema.nullable().optional(),
    documents: z.array(documentResponseSchema).optional(),
    document: documentResponseSchema.optional(),
    message: z.string().optional(),
    issues: z.unknown().optional()
  })
  .strict();

export type DocumentsApiResponse = z.infer<typeof documentsApiResponseSchema>;
