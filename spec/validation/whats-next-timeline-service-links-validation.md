# Validation: What's Next Timeline Service Links

## Status

Accepted

## Scope

Validate the landing-page "Co dalej" timeline update that makes each timeline step a richer navigational entry to the relevant product or research view while preserving research-stage framing for Wave 2 and Wave 3.

## Source Artifacts

- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing Page Future Waves Research Framing](../stories/landing-page-future-waves-research-framing.md)
- [WaveStorySection implementation](../../src/components/WaveStorySection.tsx)
- [Landing copy](../../src/content.ts)
- [Unit tests](../../src/App.test.tsx)
- [E2E tests](../../tests/e2e/landing.spec.ts)

## Preconditions

- Landing page source exists under `src/`.
- Docker development environment can run Vite, TypeScript, Vitest, and production build commands.
- Browser UI validation requires a Playwright-compatible browser environment.

## Acceptance Criteria Mapping

- Criterion: Wave 2 and Wave 3 remain labeled as research, exploration, or future waves dependent on validated demand.
  Evidence status: Supported
  Evidence: `src/content.ts` keeps `Badanie potrzeb usługodawców`, `Eksploracja współpracy z klinikami`, and the shared research note that future stages depend on confirmed demand.

- Criterion: The "Co dalej" section links visitors to dedicated product or research views.
  Evidence status: Supported
  Evidence: `src/components/WaveStorySection.tsx` maps Wave 2 to `/marketplace` and Wave 3 to `/clinics`; `src/App.test.tsx` asserts the CTA labels keep those hrefs.

- Criterion: Wave 2 and Wave 3 are not presented as active marketplace or clinic products.
  Evidence status: Supported
  Evidence: Copy remains research-oriented, and the detailed unavailable-scope notes remain on the destination pages and shared `FutureWave` content.

- Criterion: Mobile and desktop UI should remain readable and usable without overlap.
  Evidence status: Partially Supported
  Evidence: Typecheck, build, and unit tests passed. Browser screenshot verification could not run because the Docker image is Alpine-based while Playwright downloaded an Ubuntu fallback browser that failed to launch.

## Checks

- Check: `docker compose run --rm web npm run lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation succeeds.
  Actual result: Passed with exit code 0.

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Vitest suite passes, including link assertions for timeline CTAs.
  Actual result: Passed, 8 tests.

- Check: `docker compose run --rm web npm run build`
  Type: Automated
  Status: Passed
  Expected result: Production build succeeds.
  Actual result: Passed with Vite build output generated in `dist/`.

- Check: `docker compose run --rm web npm run test:e2e`
  Type: UI
  Status: Unavailable
  Expected result: Playwright validates landing, Wave 2, and Wave 3 flows on desktop and mobile.
  Actual result: Unavailable. Playwright browser launch failed in the Alpine container with a missing executable/runtime compatibility error after installing Chromium.

- Check: `curl -L http://localhost:5173`
  Type: Behavior
  Status: Passed
  Expected result: Local Vite server responds.
  Actual result: Passed. Vite served the app shell at `http://localhost:5173`.

## Evidence

- The timeline now uses the existing `WaveStorySection` cards as the primary navigation surface.
- The Wave 1 CTA is `Otwórz moduł opieki` and links to `/`.
- The Wave 2 CTA links to `/marketplace`.
- The Wave 3 CTA links to `/clinics`.
- The shared intro copy now explains that each area has its own view with assumptions, status, and planned scope.
- Automated checks passed: lint, unit tests, build.

## Missing, Skipped, or Unavailable Checks

- Check: Playwright desktop/mobile screenshots and click-through e2e evidence.
  Reason: The Dockerfile uses `node:22-alpine`; Playwright downloaded an Ubuntu fallback Chromium build that could not launch in the Alpine runtime.
  Risk: Responsive layout and visual overlap remain unverified by browser screenshot evidence in this validation run.

- Check: In-app browser visual verification.
  Reason: The Browser plugin requires the Node REPL `js` tool, which was not available in this session after tool discovery.
  Risk: Visual polish was reviewed through code and automated non-browser checks only.

## Future CI/CD or Lifecycle Gates

- Gate: Playwright-compatible e2e environment.
  Trigger: Pull requests that change landing-page UI or routing.
  Blocks: Merge when desktop or mobile timeline navigation, screenshots, or click-through flows fail.

- Gate: Link contract test for service CTAs.
  Trigger: Pull requests that change `WaveStorySection` or landing copy.
  Blocks: Merge when Wave 2 and Wave 3 CTA hrefs stop pointing to their dedicated research pages.

## Result

Ready for human review

## Follow-Up

- Consider switching the e2e test container to a Playwright-supported base image or installing a browser compatible with Alpine.
- Run screenshot-based validation for desktop and mobile once the Playwright environment is fixed.

## Human Decision

Accepted on 2026-05-14 by explicit human instruction to approve the remaining documents.
