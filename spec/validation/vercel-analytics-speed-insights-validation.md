# Validation: Vercel Analytics and Speed Insights

## Status

Draft

## Scope

Validate the landing-page implementation change that adds Vercel Web Analytics and Vercel Speed Insights while preserving the existing analytics consent baseline.

## Source Artifacts

- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [Landing Page Validation Instrumentation](../features/landing-page-validation-instrumentation.md)
- [Landing Page Consent and Analytics Policy Baseline](../stories/landing-page-consent-and-analytics-policy-baseline.md)
- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- Implementation: [package.json](../../package.json)
- Implementation: [src/App.tsx](../../src/App.tsx)
- Implementation: [src/components/VercelTelemetry.tsx](../../src/components/VercelTelemetry.tsx)
- Implementation: [src/lib/validation-events.ts](../../src/lib/validation-events.ts)

## Preconditions

- The React/Vite landing page exists and runs through the Dockerized npm workflow.
- Analytics consent storage uses `caniello.analyticsConsent`.
- Vercel Web Analytics and Speed Insights must also be enabled for the deployed Vercel project before production data appears in the Vercel dashboard.

## Acceptance Criteria Mapping

- Criterion: Given a visitor has not granted required analytics consent, when non-essential analytics would otherwise run, then the page respects that consent state.
  Evidence status: Supported
  Evidence: `VercelTelemetry` returns `null` unless `readAnalyticsConsent()` is true, so Vercel analytics scripts are not mounted before consent.

- Criterion: Given a visitor grants analytics consent, when analytics are configured, then validation events may be sent according to that saved consent state.
  Evidence status: Supported
  Evidence: `saveAnalyticsConsent` now dispatches `caniello:analytics-consent-changed`, and `VercelTelemetry` reacts by rendering `<Analytics />` and `<SpeedInsights />` without requiring a page refresh.

- Criterion: Given the landing page receives a visit, when analytics are allowed, then a `page_view` event or equivalent count is available.
  Evidence status: Partially Supported
  Evidence: Vercel Web Analytics is installed and mounted after consent. Production dashboard availability still depends on enabling Web Analytics in Vercel and receiving real deployment traffic.

- Criterion: Given the founder reviews validation data, when analytics or exports are inspected, then page views, waitlist submissions, waitlist successes, waitlist errors, Wave 2 interest, Wave 3 interest, and UTM parameters are available where consent allows.
  Evidence status: Partially Supported
  Evidence: Existing consent-gated validation events remain covered by tests; Vercel Web Analytics adds page and route analytics after consent. Vercel custom-event mapping for all domain events remains future work unless explicitly added.

## Checks

- Check: Install Vercel analytics dependencies.
  Type: Automated
  Status: Passed
  Expected result: `package.json` and `package-lock.json` include `@vercel/analytics` and `@vercel/speed-insights`.
  Actual result: Both packages were installed through the Dockerized npm workflow.

- Check: TypeScript validation.
  Type: Automated
  Status: Passed
  Expected result: TypeScript compiles without errors.
  Actual result: `docker compose run --rm web npm run lint` passed.

- Check: Unit and API tests.
  Type: Automated
  Status: Passed
  Expected result: Existing consent and lead-capture tests pass.
  Actual result: `docker compose run --rm web npm run test` passed with 13 tests across 2 files.

- Check: Production build.
  Type: Automated
  Status: Passed
  Expected result: Vite production build succeeds with Vercel packages bundled.
  Actual result: `docker compose run --rm web npm run build` passed.

- Check: Browser end-to-end landing flows.
  Type: UI
  Status: Passed
  Expected result: Existing desktop and mobile landing flows continue to pass.
  Actual result: `docker compose run --rm web npm run test:e2e` passed with 10 Playwright tests.

- Check: Vercel production dashboard data.
  Type: Operational
  Status: Future Gate
  Expected result: Vercel Web Analytics and Speed Insights dashboards receive production data after deployment and consented visits.
  Actual result: Not available locally; requires Vercel project settings and deployed traffic.

## Evidence

- `docker compose build web` rebuilt the project image with the new package lock.
- `docker compose run --rm web npm run lint`: passed.
- `docker compose run --rm web npm run test`: passed, 13 tests.
- `docker compose run --rm web npm run build`: passed.
- `docker compose run --rm web npm run test:e2e`: passed, 10 tests.
- Playwright refreshed existing screenshot evidence under `spec/validation/screenshots/landing-landing-page-is-Po-f5f5f-waitlist-leads-with-consent-*`.

## Missing, Skipped, or Unavailable Checks

- Check: Verify Vercel dashboards receive analytics and speed data.
  Reason: This requires a deployed Vercel environment with Web Analytics and Speed Insights enabled and real or synthetic consented traffic.
  Risk: Local validation proves integration and app behavior, but not final dashboard ingestion.

- Check: Legal/privacy review of Vercel analytics consent model.
  Reason: Codex cannot approve legal policy or consent sufficiency.
  Risk: Production use may need human or legal confirmation before launch traffic.

## Future CI/CD or Lifecycle Gates

- Gate: Dependency and TypeScript build check.
  Trigger: Every pull request.
  Blocks: Merge when dependency installation, lint, tests, or build fail.

- Gate: Playwright landing-flow regression.
  Trigger: Every pull request touching landing UI, consent, analytics, or routing.
  Blocks: Merge when desktop or mobile landing flows fail.

- Gate: Post-deploy observability smoke check.
  Trigger: Production deployment with Vercel analytics enabled.
  Blocks: Release readiness if Web Analytics or Speed Insights ingestion cannot be observed after consented traffic.

## Result

Ready for human review

## Follow-Up

- Enable Web Analytics and Speed Insights in the Vercel project dashboard if not already enabled.
- Decide whether Vercel custom events should mirror the existing domain validation events in addition to page and speed analytics.
- Confirm the production consent and privacy posture before sending public traffic.

## Human Decision

Pending
