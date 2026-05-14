# Validation: Landing Page Layout Unification

## Status

Draft

## Scope

Validate the implementation that unifies the content layout across the main landing page, Wave 2 Marketplace exploration page, and Wave 3 Clinic research page.

## Source Artifacts

- Related requirement: `spec/requirements/landing-page-segmented-validation.md`
- Related feature: `spec/features/landing-page-segmented-lead-capture.md`
- Related story: `spec/stories/landing-page-provider-and-clinic-interest-capture.md`
- Related story: `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- Implementation: `src/components/CareStorySections.tsx`
- Implementation: `src/components/ResearchWavePage.tsx`
- Implementation: `src/pages/LandingPage.tsx`
- Implementation: `src/pages/MarketplacePage.tsx`
- Implementation: `src/pages/ClinicPage.tsx`
- Automated tests: `src/App.test.tsx`
- Browser tests: `tests/e2e/landing.spec.ts`

## Preconditions

- Docker can run the committed React, TypeScript, Vite, TailwindCSS, Vitest, and Playwright tooling.
- Existing landing lead and validation event API mocks remain compatible with all page-level waitlist forms.

## Acceptance Criteria Mapping

- Criterion: Main, Marketplace, and Clinic pages use a shared page structure instead of separate page-specific content layouts.
  Evidence status: Supported
  Evidence: `MarketingHeroSection`, `FooterSignupSection`, and `TrustSection` were added to `src/components/CareStorySections.tsx`; `src/components/ResearchWavePage.tsx` centralizes the repeated Marketplace and Clinic page layout, analytics consent handling, waitlist forms, future-wave section, footer signup, and trust section.

- Criterion: Marketplace and Clinic pages retain their research-specific copy, attribution, and waitlist capture.
  Evidence status: Supported
  Evidence: `src/pages/MarketplacePage.tsx` and `src/pages/ClinicPage.tsx` keep `landing_page_wave2` and `landing_page_wave3` sources; Vitest and Playwright submit generic waitlist leads for both routes.

- Criterion: Marketplace and Clinic pages no longer render the redundant "Wróć do etapu Dzisiaj" hero link.
  Evidence status: Supported
  Evidence: `MarketingHeroSection` no longer accepts or renders back-link props; `src/pages/MarketplacePage.tsx` and `src/pages/ClinicPage.tsx` no longer define back-link copy. Vitest and Playwright assert that the Polish back-link text is absent on both research pages.

- Criterion: Responsive browser behavior remains valid after layout unification.
  Evidence status: Supported
  Evidence: Playwright passed on desktop Chromium and mobile Chromium for the main landing page, Wave 2 page, and Wave 3 page.

- Criterion: Research pages avoid large unused whitespace between hero content and the following feature section.
  Evidence status: Supported
  Evidence: `MarketingHeroSection` now supports a compact layout variant, and `FeatureOverviewSection` supports compact top spacing. `ResearchWavePage` applies both compact variants to Wave 2 and Wave 3 while keeping the main landing hero spacious.

## Checks

- Check: `docker compose run --rm web npm run lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation gate passes.
  Actual result: `tsc -b --pretty false` completed successfully.

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Vitest suite passes.
  Actual result: 12 tests passed, including absence checks for the removed back link.

- Check: `docker compose run --rm web npm run build`
  Type: Automated
  Status: Passed
  Expected result: TypeScript project build and Vite production build complete.
  Actual result: Build completed successfully.

- Check: `docker compose run --rm web npm run test:e2e`
  Type: UI
  Status: Passed
  Expected result: Playwright verifies landing page forms, language switching, page navigation, Wave 2 submission, and Wave 3 submission on desktop and mobile Chromium.
  Actual result: 8 tests passed, including absence checks for the removed back link on Wave 2 and Wave 3 pages.

## Evidence

- Desktop screenshots:
  - `spec/validation/screenshots/landing-landing-page-is-Po-f5f5f-waitlist-leads-with-consent-desktop-chromium/landing-polish-desktop-chromium.png`
  - `spec/validation/screenshots/landing-Next-exploration-p-0f3fd-res-a-generic-waitlist-lead-desktop-chromium/wave2-exploration-desktop-chromium.png`
  - `spec/validation/screenshots/landing-Future-research-pa-f7904-res-a-generic-waitlist-lead-desktop-chromium/wave3-research-desktop-chromium.png`
- Mobile screenshots:
  - `spec/validation/screenshots/landing-landing-page-is-Po-f5f5f-waitlist-leads-with-consent-mobile-chromium/landing-polish-mobile-chromium.png`
  - `spec/validation/screenshots/landing-Next-exploration-p-0f3fd-res-a-generic-waitlist-lead-mobile-chromium/wave2-exploration-mobile-chromium.png`
  - `spec/validation/screenshots/landing-Future-research-pa-f7904-res-a-generic-waitlist-lead-mobile-chromium/wave3-research-mobile-chromium.png`

## Missing, Skipped, or Unavailable Checks

- Check: Human visual acceptance against the attached screenshots from the request.
  Reason: Codex can prepare and validate implementation evidence, but only the human can accept the final visual direction.
  Risk: The shared layout may still need subjective spacing or copy-order refinements.

## Future CI/CD or Lifecycle Gates

- Gate: Typecheck, unit tests, production build, and Playwright desktop/mobile checks.
  Trigger: Pull requests that touch landing pages, shared story sections, waitlist forms, routing, or content.
  Blocks: Release when layout, navigation, or lead-capture behavior regresses.

- Gate: Screenshot review for main, Wave 2, and Wave 3 page parity.
  Trigger: Significant UI changes to landing page sections.
  Blocks: Human release readiness when the three page layouts diverge unintentionally.

## Result

Ready for human review

## Follow-Up

- Human review should confirm whether the unified page sequence and shared hero treatment match the intended visual direction.
- Existing older screenshot paths were replaced by the current Playwright run output under `spec/validation/screenshots/`.

## Human Decision

Pending
