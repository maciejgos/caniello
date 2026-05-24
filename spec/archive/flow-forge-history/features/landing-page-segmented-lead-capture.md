# Feature: Landing Page Segmented Lead Capture

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session to accept the landing page features using `product_coherence_reviewer`.

## Summary

Capture and segment landing-page interest from pet owners, pet service providers, and clinics or veterinarians so Caniello can validate Wave 1 demand and future-wave research interest through MailerLite without requiring account creation.

## Source Requirements

- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Users and Use Cases

- Pet owners join the Wave 1 MVP waitlist.
- Pet service providers express research-stage interest in future trusted pet services.
- Clinics and veterinarians express research-stage interest in future owner-approved clinic collaboration.
- The founder reviews MailerLite segments to understand demand by role and wave.

## Scope

- Email capture from the hero, mid or lower page CTA, and footer or final CTA.
- Owner waitlist submission with default or selected `pet_owner` role.
- Wave 2 provider interest capture with `pet_service_provider` role and optional business context.
- Wave 3 clinic or vet interest capture with `clinic_vet` role and optional clinic context.
- Email format validation and visible success or error feedback.
- MailerLite subscriber create-or-update behavior.
- MailerLite grouping or equivalent segmentation for general waitlist, pet owners, service providers, clinics/vets, Wave 2 interest, and Wave 3 interest.
- Custom field capture for role, source, interest wave, consent, and UTM fields where available.
- Privacy and consent cues before personal data is submitted.
- Shared source values for lead capture and validation instrumentation:
  - `landing_page_hero`
  - `landing_page_mid_cta`
  - `landing_page_footer`
  - `landing_page_wave2`
  - `landing_page_wave3`

## Out of Scope

- User accounts or authenticated onboarding.
- MailerLite campaign copy beyond welcome or thank-you routing requirements.
- Full CRM workflows, sales pipeline management, provider onboarding, or clinic onboarding.
- Booking, payment, marketplace transactions, clinic integrations, or partner portals.
- Replacing legal review of consent, privacy, terms, or email compliance.

## Behavior

Visitors can submit a valid email from the appropriate page context and receive immediate feedback. Caniello preserves the visitor's role and interest wave in MailerLite, updates existing subscribers without destructive segment removal, and keeps provider and clinic interest clearly tied to research-stage future waves.

## Acceptance Criteria

- Given a visitor submits an invalid email in any landing-page form, when they attempt submission, then the form shows an inline validation error and does not send the lead.
- Given a pet owner submits a valid waitlist email, when submission succeeds, then the lead is recorded with `role=pet_owner`, `interest_wave=wave_1`, and the applicable source value: `landing_page_hero`, `landing_page_mid_cta`, or `landing_page_footer`.
- Given a pet owner lead is recorded, when MailerLite is inspected, then the lead appears in the general waitlist and pet owner segments or equivalent grouping.
- Given a successful owner waitlist submission, when the user views the page response, then they see clear success feedback without creating an account.
- Given a pet service provider submits Wave 2 interest, when submission succeeds, then the lead is recorded with `role=pet_service_provider` and `interest_wave=wave_2`.
- Given a pet service provider submits Wave 2 interest, when submission succeeds, then the lead source is recorded as `landing_page_wave2`.
- Given a Wave 2 provider lead includes optional business details, when the lead is stored, then supported fields such as business name, service category, location, or website are preserved where collected.
- Given a clinic or veterinarian submits Wave 3 interest, when submission succeeds, then the lead is recorded with `role=clinic_vet` and `interest_wave=wave_3`.
- Given a clinic or veterinarian submits Wave 3 interest, when submission succeeds, then the lead source is recorded as `landing_page_wave3`.
- Given a Wave 3 clinic or vet lead includes optional clinic details, when the lead is stored, then supported fields such as clinic name, role, country, or website are preserved where collected.
- Given an email already exists in MailerLite, when that email submits another valid form, then the existing subscriber is updated and added to relevant new groups without creating a duplicate contact.
- Given an existing subscriber belongs to previous MailerLite groups, when a new landing-page submission is processed, then existing groups are not removed as part of the update.
- Given a form collects personal data, when the visitor is asked to submit, then privacy copy and a Privacy Policy link are visible before or near the submission action.
- Given consent is required for the visitor context, when consent has not been provided, then the lead is not sent to MailerLite.

## Related Stories

None yet.

## Related Artifacts

- [Landing Backlog Notes](../notes/landing/backlog.md)
- [Landing Concept Image 1](../notes/landing/image%201.png)
- [Landing Concept Image 2](../notes/landing/image%202.png)
- [Landing Concept Image 3](../notes/landing/image%203.png)
