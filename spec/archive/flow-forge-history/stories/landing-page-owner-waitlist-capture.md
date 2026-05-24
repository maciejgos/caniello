# Story: Landing Page Owner Waitlist Capture

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session after `product_coherence_reviewer` returned `valid to accept`.

## User Story

As a pet owner, I want to join the Caniello waitlist with my email, so that I can receive early access or product updates without creating an account.

## Background

Owner waitlist capture is the primary conversion action for Wave 1 validation. It must work from the hero, mid-page CTA, and footer or final CTA using shared source values.

## Source Artifacts

- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing Page Validation Instrumentation](../features/landing-page-validation-instrumentation.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Scope

- Owner waitlist email forms for hero, mid-page or lower-page CTA, and footer or final CTA.
- Email format validation.
- Success and error feedback.
- Default or selected `pet_owner` role.
- `interest_wave=wave_1`.
- Shared source values `landing_page_hero`, `landing_page_mid_cta`, and `landing_page_footer`.
- Required lead-capture consent state from [Landing Page Consent and Analytics Policy Baseline](landing-page-consent-and-analytics-policy-baseline.md).

## Out of Scope

- Account creation, authentication, or onboarding.
- Provider and clinic interest forms.
- MailerLite API implementation details beyond submitting the required owner lead payload.
- Final campaign email copy.
- Product activation or retention tracking after signup.

## Acceptance Criteria

- Given a visitor enters an invalid email in an owner waitlist form, when they submit it, then the form shows an inline validation error and does not send the lead.
- Given a visitor submits a valid email from the hero form, when submission succeeds, then the lead has `role=pet_owner`, `interest_wave=wave_1`, and `source=landing_page_hero`.
- Given a visitor submits a valid email from the mid-page or lower-page CTA, when submission succeeds, then the lead has `role=pet_owner`, `interest_wave=wave_1`, and `source=landing_page_mid_cta`.
- Given a visitor submits a valid email from the footer or final CTA, when submission succeeds, then the lead has `role=pet_owner`, `interest_wave=wave_1`, and `source=landing_page_footer`.
- Given an owner waitlist submission succeeds, when the user views the page response, then a clear success message is shown without requiring account creation.
- Given an owner waitlist submission fails, when the user views the page response, then a clear error message is shown and the entered email can be corrected or retried.
- Given the visitor has not selected the required lead-capture consent control, when they submit an owner waitlist form, then the lead is not submitted.

## Implementation Notes

- Keep form behavior reusable across hero, mid-page, and footer contexts while preserving distinct source values.
- Depends on [Landing Page Consent and Analytics Policy Baseline](landing-page-consent-and-analytics-policy-baseline.md) for consent behavior.
- Lead persistence and MailerLite subscriber behavior are covered by [Landing Page MailerLite Subscriber Upsert](landing-page-mailerlite-subscriber-upsert.md).
- Analytics behavior is covered by [Landing Page Validation Events and UTM Capture](landing-page-validation-events-and-utm-capture.md).

## Validation

- Validate successful owner submissions for all three source contexts, invalid email handling, error handling, success messaging, and consent gating where applicable.

## Related Artifacts

- [Landing Backlog Notes](../notes/landing/backlog.md)
