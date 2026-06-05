# Validation: Pet Profile Foundation Evaluation

## Status

Ready for human review

Fresh implementer follow-up on 2026-06-05 added and passed the live two-owner/RLS integration test. Current verdict: `Pass`.

Fresh evaluator rerun after migration-history cleanup on 2026-06-05 confirmed the verdict is `Pass`.

Fresh final evaluator rerun after the recommended migration cleanup on 2026-06-05 confirmed the verdict remains `Pass`.

## Scope

Evaluate `spec/tasks/pet-profile-foundation.md`: a signed-in owner can create, view, and update the first durable pet profile while preserving owner-owned Supabase/RLS boundaries and avoiding out-of-scope documents, reminders, sharing, AI, provider workflows, mobile work, deployment, or release.

## Source Artifacts

- `spec/tasks/pet-profile-foundation.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/handoff.md`
- `infra/supabase/migrations/20260604090000_extend_pet_profile_fields.sql`
- `infra/supabase/migrations/20260605150000_enforce_unique_owner_households.sql`
- `infra/supabase/seed.sql`
- `packages/contracts/src/index.ts`
- `packages/contracts/src/index.test.ts`
- `packages/db/src/index.ts`
- `packages/db/src/index.test.ts`
- `apps/web/app/api/pets/profile/route.ts`
- `apps/web/features/account/server/pet-profile.ts`
- `apps/web/features/account/server/pet-profile.test.ts`
- `apps/web/features/account/components/PetProfileSection.tsx`
- `apps/web/features/account/components/AuthenticatedAppShell.tsx`
- `apps/web/features/account/AccountApp.test.tsx`
- `apps/web/features/account/content.ts`

## Preconditions

- Local dependencies are installed.
- Local Supabase is running through Docker Desktop.
- The new migration is applied locally from `infra/supabase`.
- The web app can run locally on `http://127.0.0.1:3000`.
- Seeded local account exists: `akowalska@example.com`.

## Acceptance Criteria Mapping

- Criterion: A signed-in owner can open the Pets section and see either an empty first-pet form or their saved pet profile.
  Evidence status: Supported
  Evidence: React tests cover the Pets navigation and form. Browser smoke logged in, opened `Pupile`, and saw the pet profile form populated from the saved Bruno record.

- Criterion: The owner can save a pet profile with at least pet name and optional species, breed, birth date, sex or gender, weight, microchip number, allergies, medication, and important notes.
  Evidence status: Supported
  Evidence: Browser smoke saved all requested fields through `/api/pets/profile`; the PUT response returned the updated pet with the unique name `Bruno Eval 1780573544612`.

- Criterion: Saved pet profile data is persisted in Supabase and is visible after page reload or a fresh authenticated visit.
  Evidence status: Supported
  Evidence: Browser smoke reloaded the app, reopened Pets, and confirmed the unique saved pet name and microchip number remained visible. Mobile smoke with a fresh browser context also saw the saved value.

- Criterion: Pet profile input is validated with shared contracts or an approved schema layer before database writes.
  Evidence status: Supported
  Evidence: `petProfilePayloadSchema` validates and normalizes writes. Contract tests cover valid payloads, invalid name, invalid date, invalid weight, and strict rejection of out-of-scope fields.

- Criterion: The implementation creates or reuses an owner household safely and does not expose another owner's household or pet data.
  Evidence status: Supported
  Evidence: Server helper reads the authenticated Supabase user, finds or creates only that user's household, recovers from `23505` unique-violation races by re-reading the winning household, then reads or updates the first pet for that household. Forward migration `20260605150000_enforce_unique_owner_households.sql` enforces one household per owner for already-applied databases, and the historical baseline migration no longer carries the duplicate uniqueness edit in the cleanup diff. Browser smoke confirmed unauthenticated API GET returns 401. Live two-owner/RLS integration test creates a temporary second owner, verifies that owner can manage their own household/pet, verifies they cannot read or update Anna/Bruno's pet, verifies they cannot insert into Anna's household, and verifies Anna/Bruno's pet remains unchanged.

- Criterion: Supabase RLS remains enabled for owner-owned pet data, and any migration includes policies or policy compatibility checks needed for the new fields.
  Evidence status: Supported
  Evidence: Migration only adds columns, a weight check constraint, and an index to existing `public.pets`; it does not disable or replace the existing household-owned RLS policies from the MVP foundation migration.

- Criterion: Unauthenticated visitors cannot read or write pet profile data.
  Evidence status: Supported
  Evidence: Browser smoke confirmed unauthenticated `GET /api/pets/profile` returns 401. Route helper uses `supabase.auth.getUser()` before reads or writes.

- Criterion: Pets section copy remains clear in Polish and English and does not imply documents, reminders, AI, sharing, or veterinary advice have shipped.
  Evidence status: Supported
  Evidence: `content.ts` includes Polish and English labels, validation, success, error, privacy, and medical-boundary copy. Reviewed copy keeps documents, reminders, sharing, and medical advice out of shipped behavior.

- Criterion: Existing Home dashboard, first-run onboarding, section navigation, language switching, auth gating, and logout behavior do not regress.
  Evidence status: Supported
  Evidence: Full web Vitest suite passed, including account shell coverage. Production build passed.

- Criterion: Focused automated tests and browser validation cover the save/read flow, validation errors, reload persistence, disabled or absent out-of-scope actions, and responsive layout.
  Evidence status: Supported
  Evidence: Focused tests, full web tests, browser smoke, and live RLS integration test cover the core flow, pending-load disabled fields, reload persistence, fresh mobile visibility, no desktop/mobile overflow, unauthenticated denial, and cross-owner RLS isolation.

## Checks

- Check: Contract and db tests
  Type: Automated
  Status: Passed
  Expected result: Pet profile schemas and db config tests pass.
  Actual result: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts` passed; 2 files and 25 tests passed.

- Check: Focused web pet profile tests
  Type: Automated
  Status: Passed
  Expected result: Account/Pets UI and pet-profile server helper tests pass.
  Actual result: Fresh evaluator rerun later on 2026-06-05 passed `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts pet-profile.rls.test.ts` from `apps/web`; 2 files and 12 tests passed, 1 opt-in RLS test skipped by default.

- Check: Full web test suite
  Type: Automated
  Status: Passed
  Expected result: Existing authenticated app behavior does not regress.
  Actual result: Fresh final evaluator rerun after migration cleanup on 2026-06-05 passed `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 53 tests passed and 1 skipped, with existing localStorage experimental warnings.

- Check: Package web test command
  Type: Automated
  Status: Passed
  Expected result: `pnpm --filter web test` passes through the package script.
  Actual result: Passed; 9 files and 50 tests passed, with existing localStorage experimental warnings.

- Check: TypeScript checks
  Type: Automated
  Status: Passed
  Expected result: Contracts, db, and web TypeScript compile without emit.
  Actual result: Fresh evaluator rerun after conflict resolution on 2026-06-05 passed `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`, `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`, and `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.

- Check: Web lint gate
  Type: Automated
  Status: Passed
  Expected result: `pnpm --filter web lint` passes.
  Actual result: Fresh final evaluator rerun after migration cleanup on 2026-06-05: sandboxed command failed with `[ERROR] fetch failed`; escalated rerun passed.

- Check: Production build
  Type: Automated
  Status: Passed
  Expected result: `pnpm build` passes.
  Actual result: Fresh final evaluator rerun after migration cleanup on 2026-06-05: sandboxed command failed with `[ERROR] fetch failed`; escalated rerun passed. Next build included dynamic route `/api/pets/profile`.

- Check: Diff whitespace
  Type: Automated
  Status: Passed
  Expected result: No trailing whitespace or patch formatting errors.
  Actual result: Fresh evaluator rerun after conflict resolution on 2026-06-05 passed `git diff --check`.

- Check: Merge-conflict marker scan
  Type: Automated
  Status: Passed
  Expected result: No unresolved merge-conflict markers remain.
  Actual result: Fresh evaluator rerun after conflict resolution on 2026-06-05 passed `rg -n "<<<<<<<|=======|>>>>>>>"`; no markers were found.

- Check: Focused contract/db/server tests after conflict resolution
  Type: Automated
  Status: Passed
  Expected result: Pet profile schemas, migration assertions, updated-at helper, and concurrent owner-household fallback tests pass.
  Actual result: Fresh evaluator rerun after conflict resolution on 2026-06-05 passed `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts packages/contracts/src/index.test.ts`; 3 files and 30 tests passed.

- Check: Migration readiness
  Type: Data
  Status: Passed
  Expected result: Durable schema changes are represented by tracked forward migrations without conflicting historical-migration edits.
  Actual result: `git ls-files infra/supabase/migrations/20260605150000_enforce_unique_owner_households.sql` confirms the forward migration is tracked. The cleanup diff removes the duplicate `unique` edit from `infra/supabase/migrations/20260519000100_mvp_foundation.sql` and removes the baseline uniqueness assertion from `packages/db/src/index.test.ts`, leaving the forward migration as the durable path for already-applied databases.

- Check: Apply local Supabase migration
  Type: Data
  Status: Passed
  Expected result: New pet profile fields apply to local Supabase.
  Actual result: Initial root-directory `supabase db push --local` failed because it targeted default port `54322`; rerun from `infra/supabase` passed and applied `20260604090000_extend_pet_profile_fields.sql`.

- Check: Authenticated browser save/reload smoke
  Type: UI
  Status: Passed
  Expected result: Login, open Pets, confirm fields are disabled while the first pet-profile load is pending, save pet profile, reload, confirm persisted data, confirm no console/page errors and no desktop/mobile horizontal overflow.
  Actual result: Fresh escalated Playwright smoke passed against `http://127.0.0.1:3000`. It confirmed unauthenticated API GET returned 401, delayed the initial authenticated GET, confirmed name/species fields were disabled while loading, saved all profile fields, confirmed reload persistence, confirmed fresh mobile visibility, detected no console/page errors, and found zero desktop/mobile horizontal overflow.

- Check: Two-owner Supabase RLS isolation test
  Type: Security
  Status: Passed
  Expected result: A second authenticated owner can manage their own household/pet but cannot read, update, or insert into the first owner's household/pet data.
  Actual result: Fresh final evaluator rerun after migration cleanup on 2026-06-05 passed `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.rls.test.ts` outside the sandbox after sandbox localhost access failed. The test created a temporary second owner, signed in with the anon client, created that owner's own household and pet, confirmed Anna/Bruno's pet was invisible to the second owner, confirmed an attempted update returned no rows, confirmed an attempted insert into Anna's household failed under RLS, verified Anna/Bruno's pet remained unchanged, and deleted the temporary owner.

## Evidence

- Automated validation passed:
  - Fresh final migration-cleanup rerun: `rg -n "^(<<<<<<<|=======|>>>>>>>)"`; no markers found.
  - Fresh final migration-cleanup rerun: `git diff --check`.
  - Fresh final migration-cleanup rerun: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts packages/contracts/src/index.test.ts`; 3 files and 30 tests passed.
  - Fresh final migration-cleanup rerun: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 53 tests passed and 1 skipped.
  - Fresh final migration-cleanup rerun: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
  - Fresh final migration-cleanup rerun: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
  - Fresh final migration-cleanup rerun: `pnpm --filter web lint`; sandbox failed with `[ERROR] fetch failed`, escalated rerun passed.
  - Fresh final migration-cleanup rerun: `pnpm build`; sandbox failed with `[ERROR] fetch failed`, escalated rerun passed.
  - Fresh final migration-cleanup rerun: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.rls.test.ts`; sandbox failed with localhost `EPERM`, escalated rerun passed.
  - Migration-history cleanup rerun: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts packages/contracts/src/index.test.ts`; 3 files and 30 tests passed.
  - Migration-history cleanup rerun: `git diff --check`.
  - Migration-history cleanup inspection: `git ls-files infra/supabase/migrations/20260605150000_enforce_unique_owner_households.sql` confirmed the forward migration is tracked.
  - Fresh conflict-resolution rerun: `rg -n "<<<<<<<|=======|>>>>>>>"`
  - Fresh conflict-resolution rerun: `git diff --check`
  - Fresh conflict-resolution rerun: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts packages/contracts/src/index.test.ts`; 3 files and 30 tests passed.
  - Fresh conflict-resolution rerun: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 53 tests passed and 1 skipped.
  - Fresh conflict-resolution rerun: `pnpm --filter web lint`; sandbox failed with `[ERROR] fetch failed`, escalated rerun passed.
  - Fresh conflict-resolution rerun: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
  - Fresh conflict-resolution rerun: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
  - Fresh conflict-resolution rerun: `pnpm build`; sandbox failed with `[ERROR] fetch failed`, escalated rerun passed.
  - Fresh conflict-resolution rerun: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.rls.test.ts`; sandbox failed with localhost `EPERM`, escalated rerun passed.
  - Fresh rerun: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts`
  - Fresh rerun: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts`
  - Fresh rerun: `pnpm --filter web test`
  - Fresh rerun: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`
  - Fresh rerun: `pnpm --filter web lint` after sandbox fetch failure and escalated rerun
  - Fresh rerun: `pnpm build` after sandbox fetch failure and escalated rerun
  - Fresh rerun: `git diff --check`
  - RLS gap fix: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/pet-profile.rls.test.ts` after sandbox localhost access failure and escalated rerun
  - RLS gap fix: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts pet-profile.rls.test.ts`
  - Fresh later 2026-06-05 evaluator rerun: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts pet-profile.rls.test.ts`
  - Fresh later 2026-06-05 evaluator rerun: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts`
  - Fresh later 2026-06-05 evaluator rerun: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/pet-profile.rls.test.ts` after sandbox localhost access failure and escalated rerun
  - Fresh later 2026-06-05 evaluator rerun: `pnpm --filter web test`
  - Fresh later 2026-06-05 evaluator rerun: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`
  - Fresh later 2026-06-05 evaluator rerun: `pnpm --filter web lint` after sandbox fetch failure and escalated rerun
  - Fresh later 2026-06-05 evaluator rerun: `pnpm build` after sandbox fetch failure and escalated rerun
  - Fresh later 2026-06-05 evaluator rerun: `git diff --check`
  - `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts`
  - `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts`
  - `./node_modules/.bin/vitest run` from `apps/web`
  - `pnpm --filter web test`
  - `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`
  - `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`
  - `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`
  - `pnpm --filter web lint` after escalated rerun
  - `pnpm build` after escalated rerun
  - `git diff --check`
- Local Supabase migration applied from `infra/supabase` with `supabase db push --local`.
- Browser validation used a temporary Playwright script under `/private/tmp`, removed after the run.
- Browser validation saved unique pet name `Bruno Eval 1780573544612`.
- Fresh browser validation saved unique pet name `Bruno Eval Fresh 1780593954304` and removed the temporary Playwright script after the run.
- Live RLS validation uses `CANIELLO_RUN_SUPABASE_RLS_TESTS=1` so the default unit suite stays local and stable; the opt-in test was run and passed against local Supabase on 2026-06-05.

## Findings

- Severity: Medium
  Status: Resolved by migration-history cleanup on 2026-06-05.
  Finding: Migration readiness was not clean after the owner-household concurrency follow-up because the forward migration was previously untracked and the historical baseline migration was also modified for the same uniqueness constraint.
  Evidence: `git ls-files infra/supabase/migrations/20260605150000_enforce_unique_owner_households.sql` now confirms the forward migration is tracked. The cleanup diff removes the duplicate historical baseline uniqueness edit and removes the baseline uniqueness assertion from `packages/db/src/index.test.ts`.
  Resolution evidence: Focused contract/db/server tests and `git diff --check` passed after the cleanup.

- Severity: Medium
  Status: Resolved by follow-up implementation on 2026-06-04.
  Finding: The pet profile form fields are editable while the initial profile load is still in flight. In the first browser smoke, filling immediately after the Pets heading appeared allowed the pending GET response to reset the form back to the existing Bruno values before save, and the PUT returned the unchanged pet. This can discard quick user input.
  Evidence: First escalated Playwright run saw `PUT /api/pets/profile 200` but the response body still contained `name: "Bruno"` instead of the unique entered value. Waiting for the initial field value before editing made the same save/reload flow pass.
  Resolution evidence: `PetProfileSection` now disables all profile inputs and textareas while `isLoading` or `isSaving` is true. `AccountApp.test.tsx` includes a regression test that holds the initial profile GET open and verifies fields and save button remain disabled until the load completes. Focused Playwright load-lock smoke delayed the initial GET, confirmed disabled fields, then confirmed save/reload persistence on desktop and fresh mobile context.

- Severity: Low
  Status: Resolved by follow-up implementation on 2026-06-05.
  Finding: Owner-boundary behavior originally lacked an automated two-owner/RLS integration test proving one owner cannot access another owner's pet.
  Evidence: Browser smoke covers unauthenticated 401; helper inspection covers owner-scoped queries.
  Resolution evidence: Added `apps/web/features/account/server/pet-profile.rls.test.ts` and ran it with `CANIELLO_RUN_SUPABASE_RLS_TESTS=1` against local Supabase. It proved second-owner own-data access succeeds while cross-owner read, update, and insert attempts fail or return no rows.

## Missing, Skipped, or Unavailable Checks

- Check: Full `pnpm test:e2e`
  Reason: The evaluator ran a focused authenticated Playwright smoke for this task instead of the full e2e suite.
  Risk: Low to medium; task-specific behavior is covered, but unrelated browser journeys were not exhaustively retested.

- Check: Fresh browser smoke after the merge-conflict cleanup
  Reason: The conflict cleanup and review follow-up touched server/data/test files, not the Pet profile UI component. Prior task-specific browser smoke evidence remains in this artifact, and fresh automated tests/build/RLS checks passed.
  Risk: Low; a fresh browser run would still be useful before final publish if the UI or local Supabase state changed.

- Check: Automated cross-owner RLS integration test
  Reason: Previously missing; now implemented as an opt-in live Supabase test so the default unit suite remains stable when local Supabase is not running.
  Risk: Low; the opt-in command must be run when validating pet profile authorization changes.

## Future CI/CD or Lifecycle Gates

- Gate: Pet profile browser smoke
  Trigger: Pull request touching pet profile UI, `/api/pets/profile`, Supabase pet schema, or account shell navigation.
  Blocks: Merge when save/reload persistence, unauthenticated denial, and responsive overflow checks fail.

- Gate: Supabase RLS ownership test
  Trigger: Pull request touching owner-owned data helpers, RLS policies, household access, or pet profile persistence.
  Blocks: Merge when cross-owner reads or writes are possible.

## Result

Pass

Core acceptance behavior is implemented and freshly revalidated: request validation exists, unauthenticated API access is denied, fields are locked while the initial profile load is pending, automated tests/build pass, conflict markers are gone, live two-owner RLS isolation is proven, and migration history now uses the tracked forward owner-household uniqueness migration without the duplicate baseline edit.

## Follow-Up

- Initial-load race fix implemented: pet profile inputs are disabled until profile loading completes.
- Two-owner/RLS integration test implemented and passed as an opt-in live Supabase validation.
- Commit only intentional implementation, task, validation, and handoff files after review.

## Human Decision

Pending

Evaluator verdict does not approve, merge, release, deploy, or mark any human checkpoint complete.
