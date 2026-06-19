# Validation: Care Reminder Foundation Evaluation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/care-reminder-foundation.md` after implementation on `codex/care-reminder-foundation`.

The evaluation checks whether a signed-in owner can create, view, edit, complete, and reload basic care reminders for the first pet while preserving MVP scope, privacy boundaries, and medical-safety language.

## Source Artifacts

- Task: `spec/tasks/care-reminder-foundation.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Visual reference: `spec/design/visual-artifacts/mvp/reminders.png`
- Migration reviewed: `infra/supabase/migrations/20260606110000_extend_care_reminder_fields.sql`
- Contracts reviewed: `packages/contracts/src/index.ts`
- API route reviewed: `apps/web/app/api/reminders/route.ts`
- Server helper reviewed: `apps/web/features/account/server/reminders.ts`
- UI reviewed: `apps/web/features/account/components/CareRemindersSection.tsx`
- Tests reviewed: `packages/contracts/src/index.test.ts`, `packages/db/src/index.test.ts`, `apps/web/features/account/server/reminders.test.ts`, `apps/web/features/account/AccountApp.test.tsx`
- Review follow-up reviewed: `apps/web/features/account/components/CareRemindersSection.tsx`, `apps/web/features/account/content.ts`, `apps/web/features/account/AccountApp.test.tsx`, `spec/tasks/care-reminder-foundation.md`, `spec/handoff.md`
- Handoff: `spec/handoff.md`

## Preconditions

- Human approved the migration/data scope on 2026-06-06.
- Local Supabase containers are running.
- Local Supabase migration `20260606110000_extend_care_reminder_fields.sql` has been pushed to the local database.
- Local web app can run on `http://127.0.0.1:3000`.
- Seeded local owner account exists: `akowalska@example.com`.

## Acceptance Criteria Mapping

- Criterion: A signed-in owner can open Reminders and see a real reminder list for their first pet.
  Evidence status: Supported
  Evidence: `CareRemindersSection` is rendered from `AuthenticatedAppShell` for `activeSection === "reminders"`; focused Playwright smoke opened Reminders after seeded login on desktop and mobile.

- Criterion: The owner can create a reminder with title, reminder type, due date, and optional notes.
  Evidence status: Supported
  Evidence: Contract tests validate reminder payloads; server tests assert insert payload shape; React test and focused Playwright smoke created reminders through `/api/reminders`.

- Criterion: The owner can edit a saved reminder and mark it completed.
  Evidence status: Supported
  Evidence: UI exposes edit and complete actions; focused Playwright smoke edited a created reminder, completed it, and verified the completed state on desktop and mobile.

- Criterion: Reminder data is persisted in Supabase and remains visible after reload or a fresh authenticated visit.
  Evidence status: Supported
  Evidence: Local Supabase migration was applied; focused Playwright smoke created/edited/completed a reminder, reloaded `/app`, navigated back to Reminders, and verified the completed reminder remained visible.

- Criterion: Reminder input is validated with shared contracts or an approved schema layer before database writes.
  Evidence status: Supported
  Evidence: `reminderPayloadSchema` is strict and used by `createOwnerReminder` and `updateOwnerReminder`; contract tests cover valid payloads, invalid dates, unsupported types, blank titles, and unexpected notification fields.

- Criterion: Unauthenticated visitors cannot read or write reminder data.
  Evidence status: Supported
  Evidence: Server helper calls `supabase.auth.getUser()` before reading the owner household or reminders; route handlers use the same Supabase cookie route-client pattern as pet profile. `apps/web/app/api/reminders/route.test.ts` verifies unauthenticated GET, POST, and PUT all return 401 before data access.

- Criterion: Supabase RLS prevents one owner from reading or mutating another owner's pet reminders.
  Evidence status: Supported
  Evidence: Baseline migration already has owner-household RLS for `public.reminders`; the new migration only adds columns/indexes and does not weaken policy. New opt-in live Supabase test `apps/web/features/account/server/reminders.rls.test.ts` passed outside the sandbox and proves owner B can manage their own reminder but cannot read, update, or insert reminders for owner A's pet.

- Criterion: Reminders copy remains clear in Polish and English and does not imply notifications, recurrence, calendar sync, AI suggestions, documents, sharing, or veterinary advice have shipped.
  Evidence status: Supported
  Evidence: Polish/English copy explicitly says notifications and recurrence are not active, notification preferences are deferred, reminders are private, and Caniello does not replace a veterinarian or official pet passport. Review follow-up replaced hardcoded Bruno reminder title and empty-state text with `{petName}` templates backed by the pet returned from `/api/reminders`, with localized neutral fallback copy. Scope scan found no live notification/AI/sharing behavior in the reminder implementation.

- Criterion: Existing Home dashboard, first-run onboarding, Pets profile, section navigation, language switching, auth gating, and logout behavior do not regress.
  Evidence status: Supported
  Evidence: `pnpm --filter web test` passed 62 tests with 1 skipped opt-in RLS test, including existing account/app coverage.

- Criterion: Desktop and small viewport layouts render without horizontal document overflow, clipped primary text, or incoherent overlap.
  Evidence status: Supported
  Evidence: Focused Playwright smoke passed desktop and mobile Chromium and asserted `documentElement.scrollWidth - clientWidth` was `0`.

- Criterion: Focused automated tests and browser validation cover create/read/update/complete behavior, validation errors, reload persistence, unavailable notification controls, and responsive layout.
  Evidence status: Supported
  Evidence: Automated tests and Playwright cover create, complete, edit through browser smoke, reload persistence, deferred notification controls, and responsive overflow. Contract/server tests cover validation rejection paths, and route tests cover unauthenticated API rejection.

## Checks

- Check: Contract/db/server reminder tests
  Type: Automated
  Status: Passed
  Expected result: Reminder payloads, migration shape, and server helper mapping/mutations pass.
  Actual result: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts apps/web/features/account/server/reminders.test.ts` passed 3 files and 35 tests.

- Check: Focused account UI tests
  Type: Automated
  Status: Passed
  Expected result: Reminders section renders, create/complete UI flow works with mocked API, existing account behavior does not regress.
  Actual result: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts reminders.test.ts` from `apps/web` passed 3 files and 20 tests.

- Check: Full web Vitest suite
  Type: Automated
  Status: Passed
  Expected result: Existing web behavior remains stable.
  Actual result: After the gap follow-up, `pnpm --filter web test` passed 11 files, skipped 2 opt-in RLS files, and passed 65 tests with 2 skipped tests. Existing localStorage experimental warnings were emitted.

- Check: TypeScript checks
  Type: Automated
  Status: Passed
  Expected result: Contracts, db, and web TypeScript compile.
  Actual result: Contracts, db, and web `tsc --noEmit --pretty false` commands passed.

- Check: Web lint
  Type: Automated
  Status: Passed
  Expected result: Web lint/type validation passes.
  Actual result: Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.

- Check: Production build
  Type: Automated
  Status: Passed
  Expected result: Monorepo production build succeeds and `/api/reminders` is included as a dynamic route.
  Actual result: Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed. Build output lists `/api/reminders`.

- Check: Diff whitespace
  Type: Automated
  Status: Passed
  Expected result: No whitespace or conflict-marker issues.
  Actual result: `git diff --check` passed.

- Check: Local Supabase migration application
  Type: Data
  Status: Passed
  Expected result: Reminder migration applies to local Supabase.
  Actual result: `SUPABASE_TELEMETRY_DISABLED=1 supabase db push --local --workdir infra` outside the sandbox applied `20260606110000_extend_care_reminder_fields.sql`.

- Check: Local Supabase status
  Type: Operational
  Status: Passed
  Expected result: Local Supabase stack is running.
  Actual result: Sandboxed status could not access Docker; approved outside-sandbox `SUPABASE_TELEMETRY_DISABLED=1 supabase status --workdir infra` showed local development setup running.

- Check: Focused authenticated browser smoke
  Type: UI
  Status: Passed
  Expected result: Seeded owner logs in, opens Reminders, creates, edits, completes, reloads, verifies persistence, disabled notification controls, no console/page errors, and no desktop/mobile overflow.
  Actual result: Temporary Playwright spec passed on `desktop-chromium` and `mobile-chromium`. The temporary spec was removed after the run.

- Check: Unauthenticated `/api/reminders` route coverage
  Type: API
  Status: Passed
  Expected result: GET, POST, and PUT reject unauthenticated access with 401 before reminder data access.
  Actual result: `apps/web/app/api/reminders/route.test.ts` passed in the default web test suite.

- Check: Live two-owner reminder RLS isolation
  Type: Security
  Status: Passed
  Expected result: A second signed-in owner can manage their own reminder but cannot read, update, or insert reminders for owner A's pet.
  Actual result: Sandboxed run failed with `connect EPERM 127.0.0.1:55321`; approved outside-sandbox run passed: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/reminders.rls.test.ts`.

- Check: Review follow-up pet-name copy regression
  Type: Automated
  Status: Passed
  Expected result: Reminder title and empty-state copy use the pet returned by `/api/reminders`, not hardcoded Bruno text.
  Actual result: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web` passed 1 file and 11 tests. The reminder test uses returned pet `Luna` and asserts the rendered heading and empty-state copy include Luna.

- Check: Review follow-up web TypeScript
  Type: Automated
  Status: Passed
  Expected result: Web TypeScript still compiles after reminder copy interpolation changes.
  Actual result: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json` passed.

- Check: Review follow-up web suite
  Type: Automated
  Status: Passed
  Expected result: Existing web behavior remains stable after the review follow-up.
  Actual result: `pnpm --filter web test` passed 11 files, skipped 2 opt-in RLS files, and passed 65 tests with 2 skipped tests. Existing localStorage experimental warnings were emitted.

- Check: Review follow-up lint
  Type: Automated
  Status: Passed
  Expected result: Web lint/type validation passes after the review follow-up.
  Actual result: Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.

- Check: Review follow-up browser smoke
  Type: UI
  Status: Passed
  Expected result: Reminders page renders after the copy interpolation change with no console/page errors and no mobile overflow.
  Actual result: Sandboxed Chromium launch failed with a macOS `MachPortRendezvousServer` permission denial; approved outside-sandbox Playwright smoke passed against `http://127.0.0.1:3000`, confirming Reminders rendered, no console/page errors occurred, and horizontal overflow was `0`.

## Evidence

- `pnpm --filter web lint`: passed outside sandbox.
- `pnpm build`: passed outside sandbox; Turbo reported existing no-output-files warnings for TypeScript-only build tasks.
- Local Supabase migration push: passed outside sandbox.
- Focused Playwright smoke: passed 2 tests across desktop and mobile Chromium.
- `git status --short --untracked-files=all` after removing the temporary Playwright spec showed no untracked Playwright spec or screenshot artifacts.
- Fresh final evaluator rerun on 2026-06-06:
  - `./node_modules/.bin/vitest run app/api/reminders/route.test.ts features/account/server/reminders.test.ts features/account/server/reminders.rls.test.ts` from `apps/web`: 2 files passed, 1 opt-in RLS file skipped; 8 tests passed, 1 skipped.
  - `pnpm --filter web test`: 11 files passed, 2 opt-in RLS files skipped; 65 tests passed, 2 skipped.
  - `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`: passed.
  - `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts apps/web/features/account/server/reminders.test.ts`: 3 files and 35 tests passed.
  - `git diff --check`: passed.
  - `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/reminders.rls.test.ts` from `apps/web` outside sandbox: 1 file and 1 test passed.
- Review follow-up evaluator rerun on 2026-06-06:
  - `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`: 1 file and 11 tests passed.
  - `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`: passed.
  - `pnpm --filter web test`: 11 files passed, 2 opt-in RLS files skipped; 65 tests passed, 2 skipped.
  - `pnpm --filter web lint`: sandboxed run failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.
  - `git diff --check`: passed.
  - Approved outside-sandbox Playwright smoke against `http://127.0.0.1:3000`: Reminders rendered, no console/page errors, horizontal overflow `0`.

## Missing, Skipped, or Unavailable Checks

- Check: Full `pnpm test:e2e`
  Reason: The task-specific authenticated Playwright smoke covered the acceptance criteria more directly than the existing broad suite.
  Risk: Low. Broader route E2E coverage can still run before publish if desired.

## Future CI/CD or Lifecycle Gates

- Gate: Opt-in live reminder RLS integration test
  Trigger: Before publishing or evaluating future reminder data changes.
  Blocks: Reminder persistence changes when cross-owner isolation fails.

- Gate: Authenticated Reminders browser smoke
  Trigger: Before publishing reminder UI/API changes.
  Blocks: Reminder UI/API changes when create/edit/complete/reload or responsive layout fails.

## Result

Ready for human review.

Final evaluator verdict after gap follow-up: `Pass`.

The core user outcome works, roadmap scope is preserved, and validation is adequate for human review. This does not approve, merge, release, deploy, or mark a human checkpoint complete.

Fresh final evaluator rerun on 2026-06-06 confirms the verdict remains `Pass`.

Review follow-up evaluator rerun on 2026-06-06 confirms the verdict remains `Pass`. The hardcoded Bruno copy issue is fixed and covered by a focused regression test using returned pet `Luna`.

## Follow-Up

- Optional: run the full `pnpm test:e2e` suite before publish if broader browser route coverage is desired.
- Next workflow step can be `forge-handoff` and `forge-publisher` for the review follow-up because the evaluator verdict remains Pass.

## Human Decision

Pending. This evaluation does not approve, merge, release, deploy, or mark a human checkpoint complete.
