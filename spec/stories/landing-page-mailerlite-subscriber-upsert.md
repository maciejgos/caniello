# Story: Landing Page MailerLite Subscriber Upsert

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session after `product_coherence_reviewer` returned `valid to accept`.

## User Story

As the Caniello founder, I want landing-page leads to be created or updated in MailerLite without duplicates or lost segments, so that waitlist and research-interest data stays usable.

## Background

MailerLite is the target system for waitlist, segmentation, and follow-up workflows. The landing page must preserve role, source, interest wave, consent, UTM values where available, and relevant optional fields.

## Source Artifacts

- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing Page Validation Instrumentation](../features/landing-page-validation-instrumentation.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)

## Scope

- Backend or server-side lead submission path for landing-page forms.
- Subscriber create-or-update behavior in MailerLite.
- Grouping or equivalent segmentation for general waitlist, pet owners, service providers, clinics/vets, Wave 2 interest, and Wave 3 interest.
- Custom field mapping for role, source, interest wave, consent, UTM fields, and optional provider or clinic fields where collected.
- Non-destructive handling of existing subscriber groups.
- Error handling that returns useful form feedback without exposing secrets.

## Out of Scope

- Creating MailerLite account infrastructure manually inside the story.
- Full email automation content or campaign management.
- Full CRM, sales, or research operations workflow.
- Analytics dashboard implementation.
- Legal approval of data processing terms.

## Acceptance Criteria

- Given a new owner waitlist lead is submitted, when MailerLite accepts the request, then a subscriber exists with pet owner and general waitlist grouping or equivalent segmentation.
- Given a new provider lead is submitted, when MailerLite accepts the request, then a subscriber exists with service-provider and Wave 2 interest grouping or equivalent segmentation.
- Given a new clinic or vet lead is submitted, when MailerLite accepts the request, then a subscriber exists with clinic/vet and Wave 3 interest grouping or equivalent segmentation.
- Given a submitted email already exists in MailerLite, when a new valid submission is processed, then the existing subscriber is updated rather than duplicated.
- Given an existing subscriber already belongs to one or more MailerLite groups, when a new valid submission is processed, then existing groups are not removed.
- Given a submission includes supported custom fields, when the lead is stored, then role, source, interest wave, consent, UTM fields, and relevant optional fields are preserved where available.
- Given MailerLite returns an error, when the form receives the response, then the user sees a clear failure state and no secret configuration is exposed.
- Given the required lead-capture consent flag is absent or false, when the submission reaches the server-side path, then the lead is not sent to MailerLite.

## Implementation Notes

- The exact MailerLite group IDs and custom field setup remain an implementation input from environment or configuration.
- Use the shared source values from the accepted feature: `landing_page_hero`, `landing_page_mid_cta`, `landing_page_footer`, `landing_page_wave2`, and `landing_page_wave3`.
- Depends on [Landing Page Consent and Analytics Policy Baseline](landing-page-consent-and-analytics-policy-baseline.md) for the required lead-capture consent flag.
- Do not expose MailerLite API secrets to client-side code.

## Validation

- Validate new subscriber creation, existing subscriber update, non-destructive group addition, custom field mapping, missing-consent rejection, and MailerLite error handling.

## Related Artifacts

- [Landing Backlog Notes](../notes/landing/backlog.md)
