# Release Readiness: Vercel Analytics and Speed Insights

## Status

Draft

## Release Scope

Release readiness review for adding Vercel Web Analytics and Vercel Speed Insights to the React/Vite landing page, gated by the existing analytics consent state.

## Source Artifacts

- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [Landing Page Validation Instrumentation](../features/landing-page-validation-instrumentation.md)
- [Landing Page Consent and Analytics Policy Baseline](../stories/landing-page-consent-and-analytics-policy-baseline.md)
- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [Vercel Analytics and Speed Insights Validation](../validation/vercel-analytics-speed-insights-validation.md)
- Implementation: [package.json](../../package.json)
- Implementation: [src/App.tsx](../../src/App.tsx)
- Implementation: [src/components/VercelTelemetry.tsx](../../src/components/VercelTelemetry.tsx)
- Implementation: [src/lib/validation-events.ts](../../src/lib/validation-events.ts)

## Human Checkpoint State

Source requirement, feature, and consent story are accepted. This implementation, validation record, and release decision remain pending human review. Codex has not approved release, merge, or deployment.

## Validation and CI/CD Evidence

- Check: Dependency installation
  Status: Passed
  Evidence: `package.json` and `package-lock.json` include `@vercel/analytics` and `@vercel/speed-insights`.

- Check: TypeScript validation
  Status: Passed
  Evidence: `docker compose run --rm web npm run lint` passed.

- Check: Unit and API tests
  Status: Passed
  Evidence: `docker compose run --rm web npm run test` passed with 13 tests.

- Check: Production build
  Status: Passed
  Evidence: `docker compose run --rm web npm run build` passed.

- Check: Playwright end-to-end landing flows
  Status: Passed
  Evidence: `docker compose run --rm web npm run test:e2e` passed with 10 tests and refreshed existing screenshot evidence.

- Check: Vercel analytics dashboard ingestion
  Status: Future Gate
  Evidence: Requires deployed Vercel project settings and consented traffic; not available from local validation.

## Review Notes

The implementation uses the React package entrypoints, not the Next.js entrypoints, because this repository is a Vite React app. The telemetry components are only rendered after analytics consent is granted and react to consent changes without page refresh. No subagent review was run because the user did not request subagents.

## Risks

- Risk: Vercel dashboard ingestion is not proven locally.
  Release impact: Requires human acceptance or a post-deploy smoke check before relying on dashboard data.

- Risk: Consent and legal sufficiency for production analytics remains a human/legal decision.
  Release impact: Requires human acceptance before sending public traffic.

- Risk: Vercel custom events are not yet mapped for every existing validation event.
  Release impact: Can become follow-up work if page and speed analytics are enough for this release.

## Rollback or Recovery

Rollback is straightforward: remove `VercelTelemetry` from `src/App.tsx`, remove the new component, and uninstall `@vercel/analytics` and `@vercel/speed-insights`. If deployed, Vercel Web Analytics and Speed Insights can also be disabled from the Vercel project settings.

## Advisory Readiness State

Ready with accepted risks

## Follow-Up

- Human must decide whether to accept the remaining operational and privacy risks for release.
- Enable or verify Web Analytics and Speed Insights in the Vercel project dashboard.
- After deployment, run a post-deploy observability smoke check with consented traffic.
- Decide whether existing domain validation events should also be sent as Vercel custom events.

## Human Decision

Pending
