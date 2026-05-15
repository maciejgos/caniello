# Validation: Landing SPA Direct URL Routing

## Status

Accepted

## Scope

Validation of the production routing fix and React routing refactor for direct entry to landing application routes. The scope covers React Router route ownership, client-side internal navigation, and Vercel SPA fallback behavior for legal pages and research pages that must not return 404 when opened directly, refreshed, or reached from campaigns.

## Source Artifacts

- `vercel.json`
- `api/vercel-config.test.ts`
- `package.json`
- `package-lock.json`
- `tests/e2e/landing.spec.ts`
- `src/App.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`
- `src/components/WaitlistForm.tsx`
- `src/components/WaveStorySection.tsx`
- `src/content.ts`
- `src/pages/MarketplacePage.tsx`
- `src/pages/ClinicPage.tsx`
- `src/pages/LegalPage.tsx`
- `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- `spec/stories/landing-page-future-waves-research-framing.md`
- `spec/validation/landing-legal-medical-minimum-data-validation.md`
- `spec/validation/whats-next-timeline-service-links-validation.md`
- `spec/release-readiness/landing-public-validation-readiness.md`

## Preconditions

- The landing page is a Vite/React SPA with route selection handled by React Router in `src/App.tsx`.
- Vercel serves the production domain and needs a rewrite fallback so non-root application paths return the SPA shell.
- Human reviewer identified direct production 404s for `/privacy`, `/terms`, `/medical-boundaries`, and the future-wave pages. Canonical future-wave routes are now `/marketplace` and `/clinics`, with legacy `/wave-2-exploration` and `/wave-3-research` routes redirected in React Router.

## Acceptance Criteria Mapping

- Criterion: Direct entry to `/privacy`, `/terms`, and `/medical-boundaries` must return the SPA instead of a 404.
  Evidence status: Supported
  Evidence: `vercel.json` rewrites all non-API paths to `/`. Playwright direct URL smoke test checks all three legal routes return a status below 400.

- Criterion: Direct entry to `/marketplace` and `/clinics` must return the SPA instead of a 404.
  Evidence status: Supported
  Evidence: `vercel.json` rewrite fallback covers both research routes. Playwright direct URL smoke test checks both routes return a status below 400.

- Criterion: Legacy `/wave-2-exploration` and `/wave-3-research` links should not break existing references.
  Evidence status: Supported
  Evidence: `src/App.tsx` redirects legacy routes to `/marketplace` and `/clinics`; `src/App.test.tsx` covers both redirects.

- Criterion: React routing should be declarative and avoid manual `window.location.pathname` branching in `App.tsx`.
  Evidence status: Supported
  Evidence: `src/App.tsx` now uses `BrowserRouter`, `Routes`, nested `Route`, `Outlet`, and a wildcard `Navigate` fallback. Manual path helper functions were removed.

- Criterion: Internal page-to-page navigation should use React Router links instead of full document reload anchors.
  Evidence status: Supported
  Evidence: Header home, footer legal links, privacy link in forms, legal back link, and Wave timeline route CTAs now use `Link`. Same-page hash anchors and mailto links remain regular anchors.

- Criterion: Wave 2 English copy should remain research-framed rather than promise an active marketplace product.
  Evidence status: Supported
  Evidence: English timeline title changed from `Marketplace` to `Trusted Services Research`; Wave 2 page copy now describes trusted service discovery research and removes active marketplace naming from the main English hero and closing title.

- Criterion: Existing waitlist forms for hero, footer, Wave 2, and Wave 3 must still submit successfully.
  Evidence status: Supported
  Evidence: Playwright e2e suite passed the hero/footer capture flow and both Wave 2 and Wave 3 research-page capture flows on desktop and mobile.

- Criterion: API routes must continue to resolve as Vercel Functions and must not be rewritten to the SPA shell.
  Evidence status: Supported
  Evidence: `vercel.json` now scopes the SPA fallback to paths that do not start with `/api/`; `api/vercel-config.test.ts` guards that rewrite pattern.

## Checks

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Unit, API, and Vercel config tests pass.
  Actual result: 3 test files passed, 14 tests passed.

- Check: `docker compose run --rm web npm run build`
  Type: Automated
  Status: Passed
  Expected result: TypeScript and Vite production build pass.
  Actual result: Build completed successfully and wrote static assets to `dist/`.

- Check: `docker compose run --rm web npm run test:e2e`
  Type: UI
  Status: Passed
  Expected result: Direct application URLs return successful responses, and landing waitlist flows remain functional across desktop and mobile.
  Actual result: 10 Playwright tests passed across desktop Chromium and mobile Chromium.

## Evidence

- `vercel.json` contains a non-API SPA fallback rewrite from `/:path((?!api/).*)` to `/`, preserving `/api/*` for Vercel Functions.
- `api/vercel-config.test.ts` protects the non-API rewrite contract so future routing edits do not reintroduce an API catch-all.
- `package.json` and `package-lock.json` add `react-router-dom`.
- `src/App.tsx` declares all application routes in one route tree and preserves a shared header/footer layout with one language state.
- `tests/e2e/landing.spec.ts` includes `direct application URLs return the SPA instead of 404`, covering `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, and `/clinics`.
- Existing Playwright form tests verify hero, footer, Wave 2, and Wave 3 lead capture routes still submit expected payloads.

## Missing, Skipped, or Unavailable Checks

- Check: Live caniello.com production verification after deployment
  Reason: The fix has not been deployed in this Codex session.
  Risk: Vercel configuration is present in the repository, but the public domain may continue returning 404 until the change is deployed and the new deployment is promoted.

- Check: Real MailerLite/API production submission
  Reason: E2E tests mock `/api/landing-leads` and `/api/validation-events`; production secrets and provider responses were not exercised.
  Risk: Landing UI can submit, but production provider configuration still needs a live smoke test before paid traffic.

## Future CI/CD or Lifecycle Gates

- Gate: Direct URL SPA route smoke test
  Trigger: Every PR and production deployment.
  Blocks: Release or paid traffic if `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, or `/clinics` returns 404 or another non-success response.

- Gate: Research-framing copy check
  Trigger: Any Wave 2 or Wave 3 copy change.
  Blocks: Release if future waves read like active product access, booking, payments, clinic SaaS, or a committed launch.

- Gate: Production lead capture smoke test
  Trigger: After deployment and before paid traffic.
  Blocks: Paid campaign launch if hero, footer, Wave 2, or Wave 3 form submission fails against the production API/provider path.

## Result

Ready for human review

## Follow-Up

- Deploy the rewrite fix to Vercel.
- Recheck the five direct production URLs on `https://caniello.com` and `https://www.caniello.com`: `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, and `/clinics`.
- Run a production smoke test for hero, footer, Wave 2, and Wave 3 lead capture with real provider configuration.

## Human Decision

Accepted
