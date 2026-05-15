# Validation: Wave 2 Exploration Page

## Status

Accepted

## Scope

Validate the new Wave 2 exploration subpage based on `spec/notes/landing/image 2.png`, its connection from the main landing page, and provider-interest capture through the existing landing lead flow.

## Source Artifacts

- Reference note: `spec/notes/landing/image 2.png`
- Related story: `spec/stories/landing-page-provider-and-clinic-interest-capture.md`
- Related story: `spec/stories/landing-page-future-waves-research-framing.md`
- Implementation: `src/pages/Wave2Page.tsx`
- Routing: `src/App.tsx`
- Main landing connection: `src/pages/LandingPage.tsx`
- Automated tests: `src/App.test.tsx`, `tests/e2e/landing.spec.ts`

## Preconditions

- Docker development environment can build the React, TypeScript, Vite, and TailwindCSS app.
- Existing landing lead and validation event API mocks remain compatible with Wave 2 lead submissions.

## Acceptance Criteria Mapping

- Criterion: `/wave-2-exploration` renders a Wave 2 page aligned to the provided visual reference.
  Evidence status: Partially Supported
  Evidence: `src/pages/Wave2Page.tsx` implements the reference structure: Wave 2 eyebrow, hero, marketplace preview, benefit cards, research-in-progress band, provider CTA, and waitlist form. Automated browser screenshot evidence is unavailable in the current Alpine container.

- Criterion: Main landing page connects users to the Wave 2 subpage.
  Evidence status: Supported
  Evidence: `src/pages/LandingPage.tsx` adds a Wave 2 page link from the future-wave card; `tests/e2e/landing.spec.ts` includes a browser check for that navigation.

- Criterion: Provider-interest capture uses the existing consented lead pipeline with Wave 2 attribution.
  Evidence status: Supported
  Evidence: `src/App.test.tsx` verifies provider email, `pet_service_provider`, `wave_2`, `landing_page_wave2`, consent, and Polish language payload.

- Criterion: Implementation follows React best practices.
  Evidence status: Supported
  Evidence: React checklist reviewed for local state, named exports, semantic links/buttons, stable list keys, typed props, existing shared form reuse, and no unnecessary memoization or effects.

## Checks

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Vitest suite passes.
  Actual result: 7 tests passed.

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

- Check: `curl -L http://localhost:5173/wave-2-exploration`
  Type: Behavior
  Status: Passed
  Expected result: Vite serves the application entry for the Wave 2 route.
  Actual result: HTML app shell returned from the running Docker Vite server.

- Check: `docker compose exec web npm run test:e2e`
  Type: UI
  Status: Unavailable
  Expected result: Playwright opens Chromium, verifies landing-to-Wave-2 navigation, captures screenshots, and submits Wave 2 provider interest.
  Actual result: Playwright Chromium could not launch in the current `node:22-alpine` container because the downloaded browser binary is not compatible with Alpine.

## Evidence

- Unit coverage added for `/wave-2-exploration` route and Wave 2 provider lead submission.
- E2E coverage drafted for landing page connection and Wave 2 provider submission.
- Docker Vite server confirmed running at `http://localhost:5173/`.

## Missing, Skipped, or Unavailable Checks

- Check: Playwright visual screenshot evidence for desktop and mobile.
  Reason: Current Docker image is Alpine-based; Playwright downloaded a Linux browser build that cannot execute there.
  Risk: The exact desktop/mobile visual match still needs browser screenshot confirmation in a Playwright-compatible image or local environment.

## Future CI/CD or Lifecycle Gates

- Gate: Playwright browser checks for Wave 2 page.
  Trigger: Pull request and release-readiness validation.
  Blocks: Release when Wave 2 route, landing link, screenshots, or provider submission fail.

- Gate: Visual regression screenshot comparison for `spec/notes/landing/image 2.png`-aligned layout.
  Trigger: Significant landing or Wave 2 UI changes.
  Blocks: Release when hero, marketplace preview, research band, or form layout diverge unexpectedly.

## Result

Ready for human review

## Follow-Up

- Run Playwright in a non-Alpine image or host environment to capture desktop and mobile screenshots.
- Consider moving the Docker image to a Playwright-compatible base if browser e2e is expected to run inside the project container.

## Human Decision

Accepted on 2026-05-14 by explicit human instruction to approve the remaining documents.
