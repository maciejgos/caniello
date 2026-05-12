# Feature: Landing Page Validation Instrumentation

## Status

Accepted

Human acceptance note: accepted by explicit human instruction in this Codex session to accept the landing page features using `product_coherence_reviewer`.

## Summary

Measure landing-page conversion and segment demand so Caniello can evaluate whether the owner-side MVP promise and future-wave research signals are producing useful validation evidence.

## Source Requirements

- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [First Landing Page Requirement](../requirements/first-landing-page.md)

## Users and Use Cases

- The founder measures whether relevant traffic converts above the landing-page validation target.
- The founder compares pet owner, pet service provider, and clinic/vet demand.
- The product team uses evidence from page behavior and lead segments to decide whether to continue owner-side MVP work or revisit positioning.
- Future validation reviewers map landing-page evidence back to requirements and features.

## Scope

- Trackable landing-page events for page view, waitlist submissions, successful submissions, submission errors, Wave 2 interest, and Wave 3 interest.
- UTM capture where available.
- Ability to calculate landing-page conversion as `waitlist_success / page_view`.
- Ability to count leads by role and interest wave using MailerLite groups, fields, exports, analytics, or an equivalent reporting path.
- Shared source values matching lead capture:
  - `landing_page_hero`
  - `landing_page_mid_cta`
  - `landing_page_footer`
  - `landing_page_wave2`
  - `landing_page_wave3`
- Privacy-aware analytics behavior that respects consent requirements.

## Out of Scope

- Full analytics dashboard implementation unless selected during later design or story breakdown.
- Product activation, retention, or in-app behavior tracking after a user joins the waitlist.
- A/B testing, experimentation frameworks, referral mechanics, or campaign attribution beyond basic UTM capture.
- Advanced cohort analysis or lifecycle email performance reporting.
- Legal approval of analytics and consent policy.

## Behavior

Caniello captures enough landing-page evidence to support the first validation cycle. The founder can distinguish traffic, successful owner waitlist conversion, errors, and future-wave research interest without expanding the landing page into broader product analytics.

## Acceptance Criteria

- Given the landing page receives a visit, when analytics are allowed, then a `page_view` event or equivalent count is available.
- Given a visitor submits the hero waitlist form, when analytics are allowed, then the submission can be attributed to `landing_page_hero`.
- Given a visitor submits a mid or lower page waitlist form, when analytics are allowed, then the submission can be attributed to `landing_page_mid_cta`.
- Given a visitor submits a footer or final CTA form, when analytics are allowed, then the submission can be attributed to `landing_page_footer`.
- Given a waitlist submission succeeds, when validation data is reviewed, then a `waitlist_success` event or equivalent successful lead count is available.
- Given a waitlist submission fails, when validation data is reviewed, then a `waitlist_error` event or equivalent error count is available.
- Given a visitor expresses Wave 2 provider interest, when validation data is reviewed, then the interest can be counted separately from owner waitlist submissions and attributed to `landing_page_wave2`.
- Given a visitor expresses Wave 3 clinic or vet interest, when validation data is reviewed, then the interest can be counted separately from owner waitlist submissions and attributed to `landing_page_wave3`.
- Given UTM parameters are present on the landing-page URL, when a lead is submitted or analytics are recorded, then those UTM values are preserved where consent and tooling allow.
- Given the founder calculates conversion, when page view and successful waitlist data are available, then conversion can be computed as `waitlist_success / page_view`.
- Given the founder evaluates segment demand, when MailerLite or analytics data is reviewed, then leads can be counted by `pet_owner`, `pet_service_provider`, and `clinic_vet`.
- Given a visitor has not granted required analytics consent, when non-essential analytics would otherwise run, then the page respects that consent state.

## Related Stories

None yet.

## Related Artifacts

- [Landing Backlog Notes](../notes/landing/backlog.md)
