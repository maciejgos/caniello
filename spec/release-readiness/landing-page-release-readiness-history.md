# Release Readiness: Landing Page History

## Status

Accepted consolidation

This file consolidates older landing-page release-readiness records. It does not approve release, deployment, public traffic, merge, tag, announcement, or incident closure.

## Release Scope

Historical release-readiness trail for the landing-page stream:

- first landing page local release candidate;
- segmented Milestone 0 landing candidate;
- limited public-validation readiness;
- layout unification;
- Vercel Analytics and Speed Insights;
- SPA direct URL routing.

## Source Artifacts

- `spec/validation/landing-page-validation-history.md`
- `spec/plans/completed-foundation-plans.md`
- `spec/plans/caniello-mvp-implementation-roadmap.md`
- `spec/requirements/first-landing-page.md`
- `spec/requirements/landing-page-segmented-validation.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/features/landing-page-validation-instrumentation.md`
- `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`

## Human Checkpoint State

- Several source release-readiness records were accepted by explicit human instruction on 2026-05-14 or later.
- Those acceptances applied to the original advisory artifacts and documented risks; they did not automatically merge, deploy, launch traffic, tag, announce, or mark production release complete.
- This consolidation was accepted by explicit human instruction on 2026-05-19.

## Validation and CI/CD Evidence

Historical evidence included:

- Passing unit, lint, build, and Playwright checks for landing-page candidates.
- Read-only MailerLite group lookup for `Caniello Waitlist`.
- Human-reported Vercel environment setup, deployed MailerLite smoke testing, and rollback/recovery setup for limited public validation.
- Direct URL Playwright coverage for legal and research routes after the SPA routing fix.
- No durable remote CI/CD evidence in the early landing records.

## Review Notes

- Product: Landing readiness consistently treated Wave 1 owner value as the active validation offer and Wave 2/Wave 3 as research, not active marketplace or clinic products.
- Security and privacy: MailerLite API access stayed server-side, lead capture required consent, and analytics events were consent-gated.
- Legal and medical safety: Minimum privacy, terms, and medical-boundary content supported limited validation, but formal legal review remained a human risk decision.
- Operations: Vercel was the intended landing host; rollback guidance relied on redeploying a previous known-good deployment, disabling or rotating MailerLite credentials if needed, and pausing public traffic if legal/privacy copy required correction.

## Risks

- No formal legal review was available for early public validation readiness.
- Remote CI/CD evidence was missing from several release candidates.
- Some production setup and provider smoke-test evidence was human-reported rather than inspected by Codex.
- Durable analytics/storage remained undecided in some records.
- Current readiness must be reassessed against the monorepo app, not the old root Vite app.

## Rollback or Recovery

For a Vercel-hosted landing page:

- redeploy the previous known-good Vercel deployment if the new page breaks;
- remove or rotate `MAILERLITE_API_KEY` to disable live lead capture if the integration misbehaves;
- preserve collected MailerLite leads for audit and recovery;
- pause paid or public traffic if legal, privacy, routing, or copy problems appear;
- keep source-controlled release scope traceable to the deployed version.

## Advisory Readiness State

Ready for human review as historical consolidation.

Do not use this file as current release approval. Prepare a new release-readiness record for the current monorepo release candidate when validation evidence is ready.

## Follow-Up

- Use current validation records before any future public release decision.
- Add remote CI/CD evidence once available.
- Reconfirm legal/privacy/vendor risk before broader launch, account creation, paid features, health-record upload, or document processing.
- Keep direct URL, consent, lead capture, and rollback checks in future release-readiness records.

## Human Decision

Accepted by explicit human instruction on 2026-05-19 as a historical consolidation. This acceptance does not approve release, deployment, public traffic, merge, tag, announcement, or incident closure.
