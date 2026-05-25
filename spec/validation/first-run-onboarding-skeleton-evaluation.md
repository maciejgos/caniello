# Validation: First-Run Onboarding Skeleton Evaluation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/first-run-onboarding-skeleton.md` against its acceptance criteria, roadmap scope, tests, UI behavior, data behavior, and medical-safety boundaries after the mockup-fidelity and component-boundary follow-up work.

## Source Artifacts

- Task: `spec/tasks/first-run-onboarding-skeleton.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Design reference: `spec/design/visual-artifacts/mvp/image 6.png`
- ADR: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- Implementation: `apps/web/features/account/AccountApp.tsx`
- Components: `apps/web/features/account/components/`
- Copy: `apps/web/features/account/content.ts`
- Tests: `apps/web/features/account/AccountApp.test.tsx`
- Local seed reference: `infra/supabase/seed.sql`
- Handoff: `spec/handoff.md`

## Preconditions

- Branch: `codex/first-run-onboarding-skeleton`
- Local web dev server started on `http://localhost:3000` for browser validation, then stopped after the check.
- Local Supabase was started through `./scripts/start.sh` so the seeded demo owner could authenticate.
- Seeded local account used for browser validation: `akowalska@example.com`.
- In-app Browser plugin remained unavailable, so Playwright was used as the browser validation fallback.

## Acceptance Criteria Mapping

- Criterion: A signed-in owner visiting `/app` sees a polished first-run setup dashboard rather than the previous placeholder message.
  Evidence status: Supported
  Evidence: `AuthenticatedAppShell` composes `AppHomeDashboard`, which renders `FirstRunOnboarding`; Playwright confirmed `/app` title `Witaj w Caniello`.

- Criterion: The setup path clearly presents the three expected steps in order: pet profile, first document, then reminders or Ask Caniello after context exists.
  Evidence status: Supported
  Evidence: `SetupStepper` renders the ordered setup steps from localized copy; focused RTL coverage asserts the three Polish step labels.

- Criterion: The add-pet form skeleton is visible, accessible by label, and does not submit or persist data.
  Evidence status: Supported
  Evidence: `PetSetupPanel` renders labeled read-only fields and a disabled add action; focused RTL coverage asserts the MVP fields and disabled save action.

- Criterion: Upload, scan, reminder, and Ask Caniello affordances are visibly unavailable, preview-only, or disabled, without implying that data was saved or analyzed.
  Evidence status: Supported
  Evidence: Document, reminder, and Ask Caniello actions are disabled or preview-only; focused RTL coverage and Playwright confirm disabled document upload and add-pet actions.

- Criterion: Copy explains Caniello as an organizer of owner-provided care information and preserves the medical boundary that it does not replace a veterinarian, diagnosis, treatment advice, emergency care, or an official pet passport.
  Evidence status: Supported
  Evidence: `accountCopy` includes Polish and English organizer/boundary copy; focused RTL coverage asserts the medical boundary text.

- Criterion: Polish and English copy are present and remain coherent after switching languages.
  Evidence status: Supported
  Evidence: `accountCopy` includes matching Polish and English onboarding strings; focused RTL coverage switches to English and asserts headings, fields, disabled controls, nav labels, and boundary copy.

- Criterion: The authenticated shell navigation, search field, pet selector, notification affordance, account area, and logout behavior still render and behave as covered by existing tests.
  Evidence status: Supported
  Evidence: `AuthenticatedAppShell`, `AppSidebar`, and `AppTopBar` isolate these regions; focused RTL coverage asserts shell controls and logout behavior; Playwright confirmed visible search and active Home nav.

- Criterion: The layout works at desktop and small viewport widths without horizontal document overflow or text overlap.
  Evidence status: Supported
  Evidence: Playwright smoke confirmed no horizontal document overflow at 1440px desktop and 390px mobile widths, with no console errors.

- Criterion: Focused tests pass for the changed account/app-home behavior.
  Evidence status: Supported
  Evidence: `pnpm --filter web test -- AccountApp.test.tsx` passed with 1 file and 8 tests.

## Checks

- Check: Review task scope against product context and roadmap.
  Type: Artifact
  Status: Passed
  Expected result: Task remains inside Now MVP Foundation and avoids explicit non-goals.
  Actual result: The work stays within onboarding, pet/document/reminder entry-point skeletons, and safe Ask Caniello preview copy. It adds no persistence, uploads, AI behavior, sharing, migrations, external services, or new routes.

- Check: Inspect changed implementation and component boundaries.
  Type: Manual
  Status: Passed
  Expected result: Route-level account code stays thin and distinct UI regions are feature-local components.
  Actual result: Home/dashboard UI is split across `AuthenticatedAppShell`, `AppTopBar`, `AppSidebar`, `AppHomeDashboard`, `SetupStepper`, `PetSetupPanel`, `DocumentSetupPanel`, `CanielloTip`, `OnboardingField`, `AppIcon`, and `OnboardingIcon`.

- Check: Focused account test.
  Type: Automated
  Status: Passed
  Expected result: Account app onboarding and preserved shell behavior tests pass.
  Actual result: `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed. Vitest emitted the existing localStorage experimental warning.

- Check: Web TypeScript validation.
  Type: Automated
  Status: Passed
  Expected result: `tsc --noEmit` passes for the web app.
  Actual result: Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.

- Check: Full web Vitest suite.
  Type: Automated
  Status: Passed
  Expected result: Web test suite passes.
  Actual result: `pnpm --filter web test` passed; 8 test files and 44 tests passed. Vitest emitted existing localStorage experimental warnings.

- Check: Whitespace/conflict check.
  Type: Automated
  Status: Passed
  Expected result: No whitespace errors.
  Actual result: `git diff --check` passed.

- Check: Browser validation for `/app`.
  Type: UI
  Status: Passed
  Expected result: Authenticated `/app` renders the onboarding dashboard at desktop and mobile widths without horizontal overflow.
  Actual result: Playwright fallback passed after starting local Supabase and the web dev server. It confirmed `/app`, title `Witaj w Caniello`, visible searchbox, active Home nav, disabled `Dodaj Bruno`, disabled first-document upload, no console errors, and no horizontal overflow at 1440px and 390px widths.

## Evidence

- `apps/web/features/account/AccountApp.tsx` now delegates authenticated app UI to feature-local components.
- `apps/web/features/account/components/` contains separate components for shell, top bar/search/account controls, left menu, dashboard body, setup stepper, pet setup, document setup, tip, fields, and icons.
- `apps/web/features/account/content.ts` contains Polish and English onboarding copy plus shared `AccountCopy` typing for component contracts.
- `apps/web/features/account/AccountApp.test.tsx` covers onboarding labels, disabled actions, language switching, shell controls, protected-route behavior, and logout behavior.
- Playwright smoke result: `{ appUrl: "http://localhost:3000/app", title: "Witaj w Caniello", searchVisible: true, homeActive: "page", addDisabled: true, uploadDisabled: true, desktopOverflow: false, mobileOverflow: false, consoleErrors: [] }`.

## Findings

None.

## Missing, Skipped, or Unavailable Checks

- Check: In-app Browser plugin validation.
  Reason: Browser plugin reported unavailable earlier in this workflow; Playwright fallback was used instead.
  Risk: Low. Playwright exercised the same local route and viewport concerns needed for this task.

- Check: Full Playwright E2E suite.
  Reason: Not run; this evaluator used a targeted authenticated smoke check for the changed `/app` surface.
  Risk: Low to medium. Broader E2E could catch unrelated auth/navigation regressions outside this task.

- Check: Fresh production build in this evaluator pass.
  Reason: Not rerun during this final evaluator pass; a prior follow-up `pnpm build` for this task passed after the mockup-fidelity update.
  Risk: Low. Focused tests, full web Vitest, TypeScript validation, and targeted Playwright passed on the current tree.

## Future CI/CD or Lifecycle Gates

- Gate: Authenticated app visual smoke test.
  Trigger: Changes to `apps/web/features/account/` or authenticated app routes.
  Blocks: Publishing when `/app` cannot be authenticated and checked at desktop and mobile widths.

- Gate: React structure review.
  Trigger: Large TSX changes in route-level authenticated surfaces.
  Blocks: Publishing when distinct route, shell, form, panel, navigation, or preview responsibilities remain concentrated in one broad file.

## Result

Ready for human review

Evaluator verdict: Pass.

## Follow-Up

- Optional: run full `pnpm test:e2e` before publishing if broader route coverage is desired.
- Optional: proceed to `forge-publisher` after human review if the current task scope is accepted.

## Human Decision

Pending

This evaluator does not approve, merge, release, or mark the task accepted.
