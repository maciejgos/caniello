import { z } from "zod";

export const leadSources = [
  "landing_page_hero",
  "landing_page_mid_cta",
  "landing_page_footer",
  "landing_page_wave2",
  "landing_page_wave3"
] as const;

export const utmSchema = z.record(z.string(), z.string());

export const landingLeadPayloadSchema = z
  .object({
    email: z.string().email(),
    source: z.enum(leadSources).optional(),
    leadConsent: z.literal(true),
    language: z.string().optional(),
    utm: utmSchema.optional()
  })
  .strict();

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

