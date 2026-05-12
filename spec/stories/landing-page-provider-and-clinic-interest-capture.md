# Story: Landing Page Provider and Clinic Interest Capture

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session after `product_coherence_reviewer` returned `valid to accept`.

## User Story

As a pet service provider, clinic, or veterinarian, I want to express research-stage interest, so that Caniello can contact me later without implying Wave 2 or Wave 3 is already available.

## Background

The landing page should segment future-wave research demand from Wave 1 owner waitlist demand. Provider and clinic/vet submissions must remain clearly tied to research-stage exploration.

## Source Artifacts

- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing Page MVP Value Experience](../features/landing-page-mvp-value-experience.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)

## Scope

- Wave 2 pet service provider CTA and interest capture path.
- Wave 3 clinic or vet CTA and interest capture path.
- Email validation and success/error feedback for future-wave submissions.
- `role=pet_service_provider`, `interest_wave=wave_2`, and `source=landing_page_wave2`.
- `role=clinic_vet`, `interest_wave=wave_3`, and `source=landing_page_wave3`.
- Optional provider fields such as business name, service category, location, or website where collected.
- Optional clinic/vet fields such as clinic name, role, country, or website where collected.
- Research-stage thank-you messaging.
- Required lead-capture consent state from [Landing Page Consent and Analytics Policy Baseline](landing-page-consent-and-analytics-policy-baseline.md).

## Out of Scope

- Provider onboarding, provider profiles, marketplace publishing, booking, payments, or transactions.
- Clinic onboarding, clinic dashboard, clinical collaboration workflows, or clinic integrations.
- Required long-form research surveys unless selected during later design.
- Owner waitlist forms.

## Acceptance Criteria

- Given a provider clicks the Wave 2 CTA, when the interest capture path opens or submits, then it is labeled as research-stage interest.
- Given a provider submits valid Wave 2 interest, when submission succeeds, then the lead has `role=pet_service_provider`, `interest_wave=wave_2`, and `source=landing_page_wave2`.
- Given a provider supplies optional business context, when the lead is stored, then supported fields such as business name, service category, location, or website are preserved where collected.
- Given a clinic or vet clicks the Wave 3 CTA, when the interest capture path opens or submits, then it is labeled as research-stage interest.
- Given a clinic or vet submits valid Wave 3 interest, when submission succeeds, then the lead has `role=clinic_vet`, `interest_wave=wave_3`, and `source=landing_page_wave3`.
- Given a clinic or vet supplies optional clinic context, when the lead is stored, then supported fields such as clinic name, role, country, or website are preserved where collected.
- Given a future-wave submission succeeds, when the user views the page response, then the message thanks them for research-stage interest and does not imply product access is available.
- Given a future-wave submission has an invalid email, when the user submits it, then the form shows an inline validation error and does not send the lead.
- Given the visitor has not selected the required lead-capture consent control, when they submit a Wave 2 or Wave 3 interest form, then the lead is not submitted.

## Implementation Notes

- Use [Landing Concept Image 2](../notes/landing/image%202.png) and [Landing Concept Image 3](../notes/landing/image%203.png) as inspiration for future-wave context, while preserving research-stage copy.
- Keep Wave 2 and Wave 3 lead capture distinct from owner waitlist conversion reporting.
- Depends on [Landing Page Consent and Analytics Policy Baseline](landing-page-consent-and-analytics-policy-baseline.md) for consent behavior.
- MailerLite group assignment is covered by [Landing Page MailerLite Subscriber Upsert](landing-page-mailerlite-subscriber-upsert.md).

## Validation

- Validate Wave 2 and Wave 3 source values, role/wave fields, optional fields, invalid email handling, success feedback, and research-stage language.

## Related Artifacts

- [Landing Concept Image 2](../notes/landing/image%202.png)
- [Landing Concept Image 3](../notes/landing/image%203.png)
