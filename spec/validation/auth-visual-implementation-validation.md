# Validation: Auth Visual Implementation

## Status

Draft

## Scope

Validate the implemented `/login` and `/signup` account screens against the MVP visual artifacts supplied for the login mockup (`spec/design/visual-artifacts/mvp/image 11.png`) and create-account mockup (`spec/design/visual-artifacts/mvp/image 18.png`), while preserving the existing account API contract, Polish-first language behavior, and responsive browser coverage.

## Source Artifacts

- `spec/design/visual-artifacts/mvp/image 11.png`
- `spec/design/visual-artifacts/mvp/image 18.png`
- `spec/features/owner-account-privacy-foundation.md`
- `spec/stories/account-signup-login-and-session.md`
- `spec/stories/polish-first-language-switching.md`
- `spec/plans/owner-account-privacy-foundation.md`
- `apps/web/features/account/AccountApp.tsx`
- `apps/web/features/account/assets/auth-hero-pets.png`
- `apps/web/features/account/content.ts`
- `apps/web/features/account/AccountApp.test.tsx`
- `tests/e2e/account.spec.ts`

## Preconditions

- The Next.js web app account routes exist under `apps/web/app/(account)/`.
- Account API routes for signup, login, password reset, logout, and protected app routing exist.
- Playwright Chromium is installed locally for browser validation.

## Acceptance Criteria Mapping

- Criterion: Login and signup screens use the supplied split auth visual direction with Caniello branding, pet-health hero positioning, feature tiles, and a centered form surface.
  Evidence status: Supported
  Evidence: `AccountApp.tsx` implements the split hero/auth shell, login and signup form variants, social auth placeholders, trust copy, top auth switch links, and localized copy matching the mockup structure. `auth-hero-pets.png` provides a warm outdoor dog-and-cat hero image to replace the earlier cutout-style pet asset.

- Criterion: Signup, login, password reset, logout, protected route access, and email verification guidance remain covered.
  Evidence status: Supported
  Evidence: `pnpm --filter web test -- AccountApp.test.tsx` passed 6 tests; `pnpm --filter web test:e2e -- account.spec.ts` passed 6 browser tests across desktop and mobile Chromium.

- Criterion: Polish remains the default with English switching available for owner-facing account flows.
  Evidence status: Supported
  Evidence: Unit and Playwright checks assert Polish default, persisted English switching, and localized hero/form text. A browser check caught and fixed an implementation issue where the form switched languages but the hero copy did not.

- Criterion: Account API contract remains strict and unchanged for signup/login payloads.
  Evidence status: Supported
  Evidence: Signup UI adds full-name and confirm-password controls for the mockup, but the submitted payload remains `{ email, password, language, acceptedTerms }`; tests assert the submitted payload shape.

- Criterion: Responsive behavior does not require the desktop hero image on mobile.
  Evidence status: Supported
  Evidence: Playwright account spec passed on desktop Chromium and Pixel 7 mobile Chromium. Mobile assertions verify the usable form/auth shell while allowing the decorative hero panel to be hidden.

## Checks

- Check: Focused account component tests.
  Type: Automated
  Status: Passed
  Expected result: Account routes render localized forms, validate fields locally, call the expected APIs, and show success/error states.
  Actual result: `pnpm --filter web test -- AccountApp.test.tsx` passed 6 tests.

- Check: TypeScript validation gate.
  Type: Automated
  Status: Passed
  Expected result: Account visual implementation compiles under the web app TypeScript configuration.
  Actual result: `pnpm --filter web lint` passed.

- Check: Browser account flow validation.
  Type: UI
  Status: Passed
  Expected result: Signup/login shell, language switching, signup validation/API success, and protected-route redirect work on desktop and mobile Chromium.
  Actual result: `pnpm --filter web test:e2e -- account.spec.ts` passed 6 tests.

- Check: Playwright browser availability.
  Type: UI
  Status: Passed after setup
  Expected result: Playwright can launch Chromium for account-route validation.
  Actual result: Initial Playwright run failed because the Chromium binary was missing. `pnpm --filter web exec playwright install chromium` installed Chromium, and the subsequent account browser run passed.

## Evidence

- `pnpm --filter web test -- AccountApp.test.tsx`: passed 6 account component tests.
- `pnpm --filter web lint`: passed TypeScript validation.
- `pnpm --filter web test:e2e -- account.spec.ts`: passed 6 account browser tests across desktop and mobile Chromium.
- Earlier failed Playwright run produced useful implementation evidence by exposing a language-state drift between the form and hero copy; the fix passes subsequent tests.

## Missing, Skipped, or Unavailable Checks

- Check: Dedicated final screenshot capture for visual archive.
  Reason: The passing account Playwright spec verifies responsive behavior but does not currently save golden/reference screenshots on success.
  Risk: Human visual review still needs to inspect the running page or request captured screenshots before accepting the visual match.

- Check: Real social login behavior.
  Reason: Google and Apple buttons are visual placeholders only; social login is out of scope for the current account story.
  Risk: Users may expect social login later if the buttons remain visible without provider wiring.

## Future CI/CD or Lifecycle Gates

- Gate: Account route visual smoke test.
  Trigger: Every pull request touching `apps/web/features/account/`, account routes, or global styling.
  Blocks: Merge when login/signup route rendering, language switching, or responsive layout checks fail.

- Gate: Account payload contract test.
  Trigger: Every pull request touching account forms, account API routes, or `packages/contracts`.
  Blocks: Merge when browser payloads drift from strict shared contract schemas.

- Gate: Reference screenshot capture for auth surfaces.
  Trigger: Before human acceptance of the visual implementation and before public beta release.
  Blocks: Release readiness when desktop and mobile auth screenshots have not been reviewed against the supplied mockups.

## Result

Ready for human review

## Follow-Up

- Human visual review should compare the implemented `/login` and `/signup` pages against `image 11.png` and `image 18.png`.
- Decide whether the visible Google and Apple buttons should remain placeholders, be disabled/hidden until provider setup, or become real social login stories.
- Add passing-state screenshot capture if the team wants durable visual evidence under `spec/validation/screenshots/`.

## Human Decision

Pending

Record the explicit human decision when provided. Do not mark validation accepted, complete, released, or merged without explicit human approval.
