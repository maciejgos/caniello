# Story: Landing Page Validation Events and UTM Capture

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session after `product_coherence_reviewer` returned `valid to accept`.

## User Story

As the Caniello founder, I want landing-page events and UTM context captured, so that I can measure conversion and segment demand from the validation page.

## Background

The first landing page is a validation instrument. The team needs enough evidence to calculate waitlist conversion, compare role demand, and inspect source performance while respecting privacy and consent constraints.

## Source Artifacts

- [Landing Page Validation Instrumentation](../features/landing-page-validation-instrumentation.md)
- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Scope

- Track or otherwise count page views after analytics consent is granted.
- Track or otherwise count waitlist submissions, successful submissions, and submission errors.
- Track or otherwise count Wave 2 provider interest and Wave 3 clinic/vet interest separately from owner waitlist submissions.
- Preserve UTM parameters where available and allowed.
- Attribute submissions to shared source values.
- Provide enough reporting path to calculate `waitlist_success / page_view`.
- Respect the analytics consent state from [Landing Page Consent and Analytics Policy Baseline](landing-page-consent-and-analytics-policy-baseline.md).

## Out of Scope

- Full analytics dashboard unless chosen later.
- A/B testing or experimentation framework.
- Product activation, retention, or authenticated in-app analytics.
- Advanced campaign attribution beyond basic UTM preservation.
- Legal approval of analytics policy.

## Acceptance Criteria

- Given a visitor has granted analytics consent and the landing page receives a visit, when validation data is reviewed, then a `page_view` event or equivalent count is available.
- Given a visitor has granted analytics consent and submits the hero waitlist form, when validation data is reviewed, then the submission is attributable to `landing_page_hero`.
- Given a visitor has granted analytics consent and submits the mid-page waitlist form, when validation data is reviewed, then the submission is attributable to `landing_page_mid_cta`.
- Given a visitor has granted analytics consent and submits the footer waitlist form, when validation data is reviewed, then the submission is attributable to `landing_page_footer`.
- Given a waitlist submission succeeds, when validation data is reviewed, then a `waitlist_success` event or equivalent successful lead count is available.
- Given a waitlist submission fails, when validation data is reviewed, then a `waitlist_error` event or equivalent error count is available.
- Given a visitor expresses Wave 2 provider interest, when validation data is reviewed, then the interest is counted separately from owner waitlist submissions and attributed to `landing_page_wave2`.
- Given a visitor expresses Wave 3 clinic or vet interest, when validation data is reviewed, then the interest is counted separately from owner waitlist submissions and attributed to `landing_page_wave3`.
- Given UTM parameters are present on the URL and a lead is submitted with required lead-capture consent, when the lead is recorded, then those UTM values are preserved in the lead metadata.
- Given UTM parameters are present on the URL and analytics consent has been granted, when validation events are recorded, then those UTM values are preserved in the event metadata.
- Given page view and successful waitlist data are available, when the founder calculates validation conversion, then it can be computed as `waitlist_success / page_view`.
- Given a visitor has not granted analytics consent, when non-essential analytics would otherwise run, then those analytics events are not sent.

## Implementation Notes

- The analytics provider or event sink remains an implementation decision unless selected during design.
- Reporting may use analytics, MailerLite exports, backend logs, or an equivalent approved path as long as acceptance criteria can be validated.
- Depends on [Landing Page Consent and Analytics Policy Baseline](landing-page-consent-and-analytics-policy-baseline.md) for analytics consent behavior.
- Keep source values aligned with [Landing Page MailerLite Subscriber Upsert](landing-page-mailerlite-subscriber-upsert.md).

## Validation

- Validate event or count availability, source attribution, UTM preservation, conversion calculation, segment separation, and consent-aware analytics behavior.

## Related Artifacts

- [Landing Backlog Notes](../notes/landing/backlog.md)
