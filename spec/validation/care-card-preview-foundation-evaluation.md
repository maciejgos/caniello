# Validation: Care Card Preview Foundation Evaluation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/care-card-preview-foundation.md`, which replaces the inert authenticated Sharing placeholder with an owner-only care card preview built from existing saved pet profile, reminder, and document metadata.

## Source Artifacts

- Task: `spec/tasks/care-card-preview-foundation.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- ADR: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- ADR: `spec/architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md`
- Changed files reviewed:
  - `apps/web/features/account/components/CareCardPreviewSection.tsx`
  - `apps/web/features/account/components/AuthenticatedAppShell.tsx`
  - `apps/web/features/account/content.ts`
  - `apps/web/features/account/AccountApp.test.tsx`
  - `spec/tasks/care-card-preview-foundation.md`

## Preconditions

- Local dependencies are installed from the committed lockfile.
- Local Supabase can run through Docker Desktop for authenticated browser validation.
- The Next.js dev server runs at `http://localhost:3000`.
- Seeded local owner credentials are available for browser smoke: `akowalska@example.com`.

## Acceptance Criteria Mapping

- Criterion: The authenticated Sharing navigation item opens an owner-only care card preview rather than the generic empty state.
  Evidence status: Supported
  Evidence: `AuthenticatedAppShell.tsx` routes `sharing` to `CareCardPreviewSection`. Focused account tests and browser smoke confirmed the Sharing navigation opens the care card preview.

- Criterion: The preview loads existing owner-owned pet profile, reminder, and document metadata through existing authenticated API endpoints.
  Evidence status: Supported
  Evidence: `CareCardPreviewSection.tsx` calls `/api/pets/profile`, `/api/reminders`, and `/api/documents`. `AccountApp.test.tsx` verifies saved profile, active reminder, and document metadata render from mocked API responses.

- Criterion: The no-pet state clearly asks the owner to create a pet profile first and can navigate to the Pets section.
  Evidence status: Supported
  Evidence: Focused test verifies the no-pet state and `Przejdź do Pupili` route-state transition to the pet profile section.

- Criterion: The care card displays saved profile fields when available and uses clear missing-value copy without implying records exist when they do not.
  Evidence status: Supported
  Evidence: Focused test verifies pet name, identity, microchip, allergies, medication, and important notes. Component renders localized missing-value copy when fields are empty.

- Criterion: The preview lists a bounded set of upcoming active reminders and recent documents when those records exist.
  Evidence status: Supported
  Evidence: Component filters active or suggested reminders, sorts by due date, and slices to three items. It sorts documents by date and slices to three items. Test verifies an active reminder appears while a completed reminder does not.

- Criterion: Sharing, link, invitation, PDF, export, and caregiver access controls remain disabled or unavailable and do not imply external access was created.
  Evidence status: Supported
  Evidence: Component renders disabled share-link and PDF buttons. Polish and English copy states no link, PDF, invitation, caregiver permission, or access revocation is created.

- Criterion: Polish and English copy include owner-control, privacy, medical-boundary, and official-passport boundary language.
  Evidence status: Supported
  Evidence: Focused test verifies Polish and English care card copy. Browser smoke confirmed language switching and official-passport boundary copy.

- Criterion: Loading and error states are visible and do not wipe existing UI unexpectedly.
  Evidence status: Supported
  Evidence: Component renders localized loading and error messages and only renders no-pet or preview content after loading succeeds.

- Criterion: Existing authenticated shell behavior, section navigation, language switching, auth gating, and logout behavior do not regress.
  Evidence status: Supported
  Evidence: Full web Vitest suite passed. Existing account tests continue to cover auth shell, section navigation, language switching, and logout.

- Criterion: Desktop and mobile layouts render without horizontal document overflow, clipped primary text, or incoherent overlap.
  Evidence status: Supported
  Evidence: Authenticated Playwright smoke passed at 1440x1000 and 390x900 with zero horizontal overflow, no console errors, and no page errors.

- Criterion: Focused tests cover the care card preview, no-pet state, disabled unavailable actions, language switching, API-backed data display, and preserved shell behavior.
  Evidence status: Supported
  Evidence: `pnpm --filter web test -- AccountApp.test.tsx` passed with 13 tests after adding focused care card coverage.

## Checks

- Check: Scope and roadmap drift review
  Type: Manual
  Status: Passed
  Expected result: Work stays within Now MVP Foundation and does not add public sharing, PDF export, caregiver permissions, migrations, AI, provider workflows, booking, payments, marketplace, or mobile work.
  Actual result: Only account UI/content/tests and spec/validation/task docs changed. No API route, migration, storage, public share route, token, PDF, AI, notification, clinic/provider, booking, payment, marketplace, or mobile behavior was added.

- Check: `pnpm --filter web test -- AccountApp.test.tsx`
  Type: Automated
  Status: Passed
  Expected result: Focused account and care card behavior tests pass.
  Actual result: Passed. 1 test file and 13 tests passed, with the existing localStorage experimental warning.

- Check: `pnpm --filter web test`
  Type: Automated
  Status: Passed
  Expected result: Full web Vitest suite passes.
  Actual result: Passed. 13 files passed, 3 opt-in files skipped, 78 tests passed, 3 skipped, with existing localStorage experimental warnings.

- Check: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`
  Type: Automated
  Status: Passed
  Expected result: Web TypeScript check passes.
  Actual result: Passed.

- Check: `pnpm --filter web lint`
  Type: Automated
  Status: Passed
  Expected result: Web lint/type validation passes.
  Actual result: Sandboxed run failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.

- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Expected result: Production build passes.
  Actual result: Sandboxed run failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed. Turbo reported 7 successful tasks and Next.js listed `/app` plus existing API routes.

- Check: `git diff --check`
  Type: Automated
  Status: Passed
  Expected result: No whitespace errors.
  Actual result: Passed.

- Check: Local Supabase startup for browser smoke
  Type: Operational
  Status: Passed
  Expected result: Local Supabase starts and seed/auth are available.
  Actual result: Sandboxed start could not access Docker. Approved outside-sandbox `./scripts/start.sh` passed, applied migrations, seeded data, and synced root plus web env files.

- Check: Authenticated Playwright smoke on desktop and mobile Chromium
  Type: UI
  Status: Passed
  Expected result: Seeded owner can log in, open Sharing, see care card preview, disabled share/PDF actions, Polish and English safety copy, no console/page errors, and no horizontal overflow.
  Actual result: Passed outside sandbox after the in-process browser hit macOS Mach-port sandbox denial. Desktop 1440x1000 and mobile 390x900 both reached `/app`, rendered the care card preview, kept share/PDF controls disabled, had zero horizontal overflow, and reported no console or page errors.

## Evidence

- Focused account tests passed after implementation and after semantic cleanup: 1 file, 13 tests.
- Full web Vitest suite passed: 13 files passed, 3 opt-in files skipped, 78 tests passed, 3 skipped.
- Web TypeScript check passed.
- Web lint passed outside sandbox after sandbox fetch failure.
- Production build passed outside sandbox after sandbox fetch failure.
- `git diff --check` passed.
- Authenticated Playwright smoke passed on desktop and mobile with seeded local owner `akowalska@example.com`; share-link and PDF actions remained disabled; no console/page errors; overflow was `0`.

## Missing, Skipped, or Unavailable Checks

- Check: Full `pnpm test:e2e`
  Reason: A focused authenticated Playwright smoke covered the task-specific user path instead of the entire E2E suite.
  Risk: Low to moderate. The care card path was validated directly, while unrelated end-to-end journeys were not rerun.

- Check: Browser validation inside the sandbox
  Reason: Chromium launch failed with macOS Mach-port permission denial.
  Risk: Low. The same smoke passed outside the sandbox on desktop and mobile Chromium.

## Future CI/CD or Lifecycle Gates

- Gate: Add committed E2E coverage for care card sharing/export once public share links or PDF export become real behavior.
  Trigger: When a future task introduces `/share/[token]`, share revocation, access logging, caregiver permissions, or PDF export.
  Blocks: Regressions that expose owner data externally without the intended authorization, revocation, expiry, logging, or consent boundaries.

## Result

Ready for human review

Final evaluator verdict: Pass.

## Follow-Up

- Recommended next action: publish this validated branch as a draft PR.
- Keep share tokens, public routes, PDF export, invitations, caregiver permissions, and access logging in separate approved tasks aligned with ADR 0017.

## Human Decision

Pending.

The evaluator does not approve, merge, release, deploy, or mark human checkpoints complete.
