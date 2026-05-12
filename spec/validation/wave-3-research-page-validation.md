# Validation: Wave 3 Research Page

## Status

Draft

## Scope

Validate the new Wave 3 research subpage based on `spec/notes/landing/image 3.png`, its connection from the main landing page, and clinic/vet interest capture through the existing landing lead flow.

## Source Artifacts

- Reference mockup: `spec/notes/landing/image 3.png`
- Related story: `spec/stories/landing-page-provider-and-clinic-interest-capture.md`
- Related story: `spec/stories/landing-page-future-waves-research-framing.md`
- Implementation: `src/pages/Wave3Page.tsx`
- Routing: `src/App.tsx`
- Main landing connection: `src/pages/LandingPage.tsx`
- Automated tests: `src/App.test.tsx`, `tests/e2e/landing.spec.ts`

## Preconditions

- Docker development environment can build the React, TypeScript, Vite, and TailwindCSS app.
- Existing landing lead and validation event APIs remain compatible with Wave 3 lead submissions.

## Acceptance Criteria Mapping

- Criterion: `/wave-3-research` renders a Wave 3 page aligned to the provided visual reference.
  Evidence status: Partially Supported
  Evidence: `src/pages/Wave3Page.tsx` implements the reference structure: Wave 3 eyebrow, clinic-collaboration hero, dashboard concept, value cards, research-stage band, owner-controlled trust section, and clinic interest form. Browser screenshot evidence still requires a Playwright-compatible runtime.

- Criterion: Main landing page connects users to the Wave 3 subpage.
  Evidence status: Supported
  Evidence: `src/pages/LandingPage.tsx` links the Wave 3 card to `/wave-3-research`; `src/App.test.tsx` verifies the href.

- Criterion: Clinic/vet interest capture uses the existing consented lead pipeline with Wave 3 attribution.
  Evidence status: Supported
  Evidence: `src/App.test.tsx` verifies clinic email, `clinic_vet`, `wave_3`, `landing_page_wave3`, consent, and Polish language payload.

## Checks

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Vitest suite passes.
  Actual result: 8 tests passed.

- Check: `docker compose run --rm web npm run build`
  Type: Automated
  Status: Passed
  Expected result: TypeScript project build and Vite production build complete.
  Actual result: Build completed successfully.

- Check: `docker compose run --rm web npm run lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation gate passes.
  Actual result: `tsc -b --pretty false` completed successfully.

- Check: `docker compose exec web npm run test:e2e`
  Type: UI
  Status: Unavailable
  Expected result: Playwright verifies landing-to-Wave-3 navigation, captures screenshots, and submits Wave 3 clinic interest.
  Actual result: Existing Docker image is Alpine-based and cannot launch the downloaded Playwright Chromium binary.

## Evidence

- Unit coverage added for `/wave-3-research` route and Wave 3 clinic lead submission.
- E2E coverage drafted for landing page connection and Wave 3 clinic submission.

## Missing, Skipped, or Unavailable Checks

- Check: Playwright visual screenshot evidence for desktop and mobile.
  Reason: Current Docker image is Alpine-based; Playwright Chromium cannot execute there.
  Risk: Exact desktop/mobile visual match still needs screenshot confirmation in a compatible browser runtime.

## Future CI/CD or Lifecycle Gates

- Gate: Playwright browser checks for Wave 3 page.
  Trigger: Pull request and release-readiness validation.
  Blocks: Release when Wave 3 route, landing link, screenshots, or clinic submission fail.

- Gate: Visual regression screenshot comparison for `spec/notes/landing/image 3.png`-aligned layout.
  Trigger: Significant landing or Wave 3 UI changes.
  Blocks: Release when hero, dashboard concept, research band, trust section, or form layout diverge unexpectedly.

## Result

Ready for human review

## Follow-Up

- Run Playwright in a non-Alpine image or host environment to capture desktop and mobile screenshots.
- Consider moving the Docker image to a Playwright-compatible base if browser e2e is expected to run inside the project container.

## Human Decision

Pending
