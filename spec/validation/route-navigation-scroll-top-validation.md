# Validation: Route Navigation Scroll Top

## Status

Accepted

## Scope

Validate that moving to a different application route resets the browser scroll position to the top of the newly rendered page.

## Source Artifacts

- Implementation: `src/App.tsx`
- Unit coverage: `src/App.test.tsx`
- End-to-end coverage: `tests/e2e/landing.spec.ts`

## Preconditions

- The React, TypeScript, Vite, and Playwright toolchain is available through the project Docker service.
- Route navigation is handled by `react-router-dom`.

## Acceptance Criteria Mapping

- Criterion: After navigating to a new page, the UI is scrolled to the top.
  Evidence status: Supported
  Evidence: `ScrollToTop` listens to `pathname` changes in `src/App.tsx` and calls `window.scrollTo({ top: 0, left: 0, behavior: "auto" })`.

- Criterion: The behavior is covered by automated checks.
  Evidence status: Supported
  Evidence: `src/App.test.tsx` verifies the scroll reset call after route navigation. `tests/e2e/landing.spec.ts` verifies browser scroll position returns to `0` after navigating from the landing page to `/marketplace`.

## Checks

- Check: Run unit and API tests.
  Type: Automated
  Status: Passed
  Expected result: The Vitest suite passes.
  Actual result: `docker compose run --rm web npm run test` passed with 16 tests across 3 files.

- Check: Run TypeScript validation.
  Type: Automated
  Status: Passed
  Expected result: TypeScript project references compile without errors.
  Actual result: `docker compose run --rm web npm run lint` passed.

- Check: Run Playwright browser checks.
  Type: UI
  Status: Passed
  Expected result: E2E tests pass across desktop and mobile Chromium, including scroll reset after route navigation.
  Actual result: `docker compose run --rm web npm run test:e2e` passed with 12 tests.

## Evidence

- `docker compose run --rm web npm run test`: passed, 16 tests.
- `docker compose run --rm web npm run lint`: passed.
- `docker compose run --rm web npm run test:e2e`: passed, 12 tests.

## Missing, Skipped, or Unavailable Checks

- Check: External CI result.
  Reason: No remote CI run was inspected in this local validation pass.
  Risk: Low; the same committed package scripts were executed locally through Docker.

## Future CI/CD or Lifecycle Gates

- Gate: Unit, lint, and Playwright route navigation checks.
  Trigger: Pull request and pre-release validation.
  Blocks: Merge or release readiness when route scroll behavior regresses.

## Result

Ready for human review

## Follow-Up

- None identified.

## Human Decision

Accepted
