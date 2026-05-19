# Validation: Landing Page History

## Status

Draft consolidation

This file consolidates accepted and review-ready landing-page validation records into one historical index. It does not create a new human acceptance decision.

## Scope

Historical validation evidence for the landing-page stream, from the first Vite landing page through segmented lead capture, legal and medical boundary pages, routing fixes, analytics instrumentation, layout refinements, and research-page naming updates.

Current platform and monorepo validation remains separate in:

- `spec/validation/caniello-mvp-nextjs-monorepo-migration-validation.md`
- `spec/validation/dev-container-local-development-validation.md`
- `spec/validation/milestone-2-platform-foundation-validation.md`

## Source Artifacts

- `spec/requirements/first-landing-page.md`
- `spec/requirements/landing-page-segmented-validation.md`
- `spec/features/landing-page-mvp-value-experience.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/features/landing-page-validation-instrumentation.md`
- `spec/stories/polish-first-language-switching.md`
- `spec/stories/landing-page-consent-and-analytics-policy-baseline.md`
- `spec/stories/landing-page-hero-and-mvp-value.md`
- `spec/stories/landing-page-future-waves-research-framing.md`
- `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- `spec/stories/landing-page-owner-waitlist-capture.md`
- `spec/stories/landing-page-provider-and-clinic-interest-capture.md`
- `spec/stories/landing-page-mailerlite-subscriber-upsert.md`
- `spec/stories/landing-page-validation-events-and-utm-capture.md`
- `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`
- `spec/design/caniello-visual-direction.md`
- `spec/plans/completed-foundation-plans.md`
- `spec/plans/caniello-mvp-implementation-roadmap.md`

## Preconditions

- The original detailed validation records were created during implementation and several were later accepted by explicit human instruction.
- Some early evidence refers to historical root Vite paths, Docker commands, npm commands, and port `5173`; the current app path is the Next.js monorepo under `apps/web`.
- Screenshot evidence remains under `spec/validation/screenshots/` where available.

## Acceptance Criteria Mapping

- Criterion: The first landing page communicated Caniello's owner value, stayed scope-safe, and presented a clear interest action.
  Evidence status: Supported historically.
  Evidence: First landing validation recorded passing build, unit, lint, Docker, and Playwright checks, plus manual copy review against medical, marketplace, clinic, payment, and official passport boundaries.

- Criterion: Milestone 0 made the landing page Polish-first with English switching, segmented owner/provider/clinic interest capture, consent gating, MailerLite server-side boundary, validation events, UTM preservation, footer/legal placeholders, and responsive UI evidence.
  Evidence status: Supported with known follow-ups.
  Evidence: Milestone 0 validation recorded passing unit, lint, build, Playwright, local API, and read-only MailerLite group lookup checks. Follow-ups remained for live MailerLite mutation, legal finalization, Dockerized Playwright parity, and broader owner-source payload coverage.

- Criterion: Legal, privacy, terms, and medical-boundary pages supplied minimum information for limited public validation.
  Evidence status: Supported with legal-review risk.
  Evidence: Legal validation recorded Privacy Policy, Terms, and Medical Boundaries coverage in Polish and English, plus route tests. Formal legal review remained unavailable and must stay a human risk decision.

- Criterion: Direct URL routing and React routing avoided 404s for legal and research pages.
  Evidence status: Supported historically.
  Evidence: Direct URL validation recorded Vercel non-API SPA fallback configuration, React Router route ownership in the old Vite app, direct URL Playwright coverage for `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, and `/clinics`, and preservation of API routing.

- Criterion: Future-wave pages and timeline links remained research-framed, not active marketplace or clinic promises.
  Evidence status: Supported historically.
  Evidence: Wave 2, Wave 3, naming, timeline, and copy validations recorded research-stage language, route/link coverage, and checks against active marketplace, booking, payment, clinic SaaS, or committed-launch implications.

- Criterion: Analytics, Speed Insights, validation events, UTM handling, and consent behavior were added without bypassing consent or exposing secrets.
  Evidence status: Supported historically with durable-analytics follow-up.
  Evidence: Validation records covered consent-gated `/api/validation-events`, UTM/source attribution, Vercel Analytics and Speed Insights integration, and non-essential event blocking before analytics consent. Durable analytics/storage decisions remained follow-up work.

## Checks

- `docker compose run --rm web npm run test`: passed in the historical Vite landing validations where recorded.
- `docker compose run --rm web npm run lint`: passed in the historical Vite landing validations where recorded.
- `docker compose run --rm web npm run build`: passed in the historical Vite landing validations where recorded.
- Official Playwright container E2E checks: passed for the first landing page and Milestone 0 when the app Alpine container could not run browsers.
- `docker compose run --rm web npm run test:e2e`: later passed after Playwright environment fixes and route coverage additions.
- MailerLite group lookup: read-only lookup confirmed `Caniello Waitlist` existed; live subscriber mutation was intentionally skipped without explicit human approval.
- Legal route unit tests: passed for `/privacy`, `/terms`, and `/medical-boundaries`.
- Vercel SPA route tests: passed for direct application URLs and non-API rewrite protection.

## Evidence

Historical records consolidated into this file:

- `first-landing-page-validation.md`
- `landing-page-milestone-0-validation.md`
- `landing-legal-medical-minimum-data-validation.md`
- `mailerlite-integration-validation.md`
- `vercel-analytics-speed-insights-validation.md`
- `wave-2-exploration-page-validation.md`
- `wave-3-research-page-validation.md`
- `wave-2-3-page-naming-validation.md`
- `whats-next-timeline-service-links-validation.md`
- `route-navigation-scroll-top-validation.md`
- `landing-page-layout-unification-validation.md`
- `landing-spa-direct-url-validation.md`

Screenshots and run metadata remain under `spec/validation/screenshots/`.

## Missing, Skipped, or Unavailable Checks

- Live MailerLite subscriber create/update was skipped in several validations unless explicitly approved, because it mutates an external account.
- Formal legal review was unavailable and remains outside Codex authority.
- Some early Playwright runs could not execute inside the Alpine app container; official Playwright container evidence was used instead.
- Remote CI/CD evidence was unavailable for early landing release candidates.
- Production URL and provider smoke tests were sometimes human-reported rather than independently inspected by Codex.

## Future CI/CD or Lifecycle Gates

- Run lint, unit, build, and Playwright checks for every landing, routing, consent, or API change.
- Smoke-test MailerLite and route behavior after deployment and before public traffic.
- Block public launch if legal/privacy/medical-boundary content is missing or visibly draft.
- Block marketing copy that implies diagnosis, treatment advice, official pet passport replacement, active marketplace booking/payments, or clinic SaaS before those scopes are approved.
- Keep direct URL coverage for legal and research pages.
- Keep consent-gating and UTM/source attribution tests around validation events and lead capture.

## Result

Ready for human review as a consolidation.

The source validation records were historical evidence records with their own statuses. This file is a cleanup rollup and should not be treated as a new acceptance decision.

## Follow-Up

- Use `spec/validation/milestone-2-platform-foundation-validation.md` for current platform validation.
- Use this file only for landing-page history and traceability.
- Add future landing validation as a focused new record only when it covers materially new behavior.

## Human Decision

Pending. A human may accept or revise this consolidation, but Codex has not accepted it on their behalf.
