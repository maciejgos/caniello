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
