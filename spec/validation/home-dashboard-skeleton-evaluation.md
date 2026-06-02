# Validation: Home Dashboard Skeleton Evaluation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/home-dashboard-skeleton.md` after implementation on branch `codex/home-dashboard-skeleton`.

## Source Artifacts

- Task: `spec/tasks/home-dashboard-skeleton.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Handoff: `spec/handoff.md`
- Changed files reviewed:
  - `apps/web/features/account/AccountApp.test.tsx`
  - `apps/web/features/account/components/AppHomeDashboard.tsx`
  - `apps/web/features/account/components/ReturningOwnerDashboard.tsx`
  - `apps/web/features/account/content.ts`

## Preconditions

- Local Supabase containers are available through Docker.
- Web app can run on `http://localhost:3000`.
- Seeded local account exists: `akowalska@example.com`.

## Acceptance Criteria Mapping

- Criterion: A signed-in owner can see a complete home dashboard skeleton with the major sections from the mockup.
  Evidence status: Supported
  Evidence: Focused tests cover dashboard headings and sections. Authenticated Playwright smoke confirmed `/app` renders the returning-owner dashboard after login on desktop and mobile.

- Criterion: Returning-owner demo data is visually distinguishable enough that it does not imply saved records, completed reminders, verified documents, AI analysis, or active sharing.
  Evidence status: Supported
  Evidence: UI includes `Podgląd demo` / `Demo preview`, `Tylko podgląd` / `Preview only`, and example-data copy. Reviewed `ReturningOwnerDashboard.tsx`; data is static component-local arrays.

- Criterion: All dashboard links either navigate to implemented skeleton sections or are visibly disabled with preview-only copy.
  Evidence status: Supported
  Evidence: Document, Ask Caniello, and sharing dashboard actions are disabled buttons. Playwright confirmed the preview action buttons are disabled.

- Criterion: Medical boundary language is available from the authenticated experience and does not claim Caniello replaces a veterinarian, emergency care, diagnosis, treatment advice, or an official pet passport.
  Evidence status: Supported
  Evidence: Focused tests and Playwright confirmed medical boundary and Ask Caniello safety copy. Copy review found no veterinarian replacement, diagnosis, treatment, emergency, or passport replacement claim.

- Criterion: Polish and English copy are present and remain coherent after switching languages.
  Evidence status: Supported
  Evidence: Focused tests and Playwright smoke switch from Polish to English and verify returning dashboard copy.

- Criterion: The authenticated shell navigation, search field, pet selector, notification affordance, account area, first-run onboarding route behavior, and logout behavior do not regress.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx` still covers shell navigation, search, pet selector, notifications, logout, and first-run onboarding preservation.

- Criterion: The dashboard passes responsive visual checks for desktop and mobile widths without horizontal document overflow or incoherent text overlap.
  Evidence status: Supported
  Evidence: Playwright smoke checked 1440x1000 and 390x900 viewports with `documentElement.scrollWidth - clientWidth === 0`. Screenshots captured for both viewports.

- Criterion: Focused tests cover the dashboard skeleton copy, demo/preview state, disabled or inert unavailable actions, language switching, and preserved authenticated shell behavior.
  Evidence status: Supported
  Evidence: `pnpm --filter web test -- AccountApp.test.tsx` passed with 8 tests.

## Checks

- Check: Focused account/dashboard tests
  Type: Automated
  Status: Passed
  Expected result: Account app tests pass and cover dashboard behavior.
  Actual result: `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed.

- Check: Full web test suite
  Type: Automated
  Status: Passed
  Expected result: Existing web behavior is not regressed.
  Actual result: `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.

- Check: TypeScript validation
  Type: Automated
  Status: Passed
  Expected result: `pnpm --filter web lint` passes.
  Actual result: Sandboxed run failed with `[ERROR] fetch failed`; escalated rerun passed.

- Check: Production build
  Type: Automated
  Status: Passed
  Expected result: `pnpm build` passes.
  Actual result: Sandboxed run failed with `[ERROR] fetch failed`; escalated rerun passed with 7 successful Turbo tasks.

- Check: Whitespace diff validation
  Type: Automated
  Status: Passed
  Expected result: `git diff --check` reports no whitespace errors.
  Actual result: Passed.

- Check: Authenticated desktop browser smoke
  Type: UI
  Status: Passed
  Expected result: Seeded user can log in, see the dashboard skeleton, switch language, switch to first-run onboarding, and return to the dashboard without console errors or horizontal overflow.
  Actual result: Passed at 1440x1000. Screenshot: `/private/tmp/caniello-home-dashboard-desktop.png`. Overflow: 0. Console errors: none.

- Check: Authenticated mobile browser smoke
  Type: UI
  Status: Passed
  Expected result: Seeded user can log in, see the dashboard skeleton, switch language, switch to first-run onboarding, and return to the dashboard without console errors or horizontal overflow.
  Actual result: Passed at 390x900. Screenshot: `/private/tmp/caniello-home-dashboard-mobile.png`. Overflow: 0. Console errors: none.

- Check: API and data behavior
  Type: Manual
  Status: Passed
  Expected result: Task does not add API routes, persistence, Supabase writes, migrations, uploads, AI, sharing links, or notification behavior.
  Actual result: Reviewed changed files; only account UI components, account UI tests, localized copy, task, handoff, and this validation artifact changed.

## Evidence

- Focused tests: `pnpm --filter web test -- AccountApp.test.tsx` passed.
- Full web tests: `pnpm --filter web test` passed.
- TypeScript validation: `pnpm --filter web lint` passed outside sandbox after sandbox fetch failure.
- Production build: `pnpm build` passed outside sandbox after sandbox fetch failure.
- Browser screenshots:
  - `/private/tmp/caniello-home-dashboard-desktop.png`
  - `/private/tmp/caniello-home-dashboard-mobile.png`
- Browser smoke confirmed:
  - unauthenticated `/app` redirects to `/login`;
  - seeded user login returns to `/app`;
  - Polish dashboard title `Co dziś u Bruno?` renders;
  - demo badge and preview-only content render;
  - disabled document, Ask Caniello, and sharing actions remain disabled;
  - English copy renders after switching language;
  - first-run onboarding remains reachable and returning dashboard can be restored;
  - no console errors;
  - no horizontal overflow at desktop or mobile widths.

## Missing, Skipped, or Unavailable Checks

- Check: Full Playwright E2E suite
  Reason: The task needed focused authenticated UI validation rather than the broader future E2E suite.
  Risk: Low for this skeleton task because focused Playwright smoke covered the changed authenticated route and core interaction states.

## Future CI/CD or Lifecycle Gates

- Gate: Authenticated app visual smoke
  Trigger: Pull requests that change authenticated app shell or dashboard UI.
  Blocks: Regressions in login redirect, `/app` rendering, disabled preview actions, localization switching, console errors, or horizontal overflow.

## Result

Ready for human review

Evaluator verdict: Pass.

## Follow-Up

- Next implementation task can be `spec/tasks/app-section-empty-states.md` after human review.
- Keep Ask Caniello and sharing surfaces inert until separately approved tasks implement live AI behavior, share links, caregiver access, or export behavior.

## Human Decision

Pending

The evaluator does not approve, merge, release, or mark human checkpoints complete.
