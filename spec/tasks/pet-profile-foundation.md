# Task: Pet Profile Foundation

## Goal

Let a signed-in owner create, view, and update the first real pet profile in Caniello so the MVP moves from dashboard skeletons to owner-owned pet data.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Pet profile creation and management is a core MVP Foundation outcome. This task enables the first durable owner-owned pet record while keeping documents, reminders, sharing, AI, and provider workflows out of scope.

Related roadmap item:

`spec/roadmap.md` - Now: owner can create and manage a pet profile and store key health information.

## Scope

- Add the smallest durable pet profile data model needed for MVP profile fields that are not already in `public.pets`: sex or gender, weight, microchip number, allergies, medication, and important notes.
- Preserve existing `households` and `pets` ownership/RLS model from the MVP foundation migration.
- Add shared Zod contracts in `packages/contracts` for pet profile read and write payloads.
- Add focused Supabase data-access helpers in `packages/db` or feature-local server helpers that keep owner authorization and RLS boundaries explicit.
- Add authenticated Next.js route handler behavior for reading and saving the current owner pet profile.
- Create a default owner household only when needed for the first pet profile save, using the existing `public.households` table.
- Replace the Pets empty state with a real first-pet profile surface inside the authenticated app.
- Reuse the existing first-run onboarding pet form fields where practical, but make the save behavior real and clearly state when data is saved.
- Show saved pet profile values in the Pets section after save and after reload.
- Preserve Polish-first and English language behavior for visible pet profile labels, validation, success, and error copy.
- Add focused tests for contract validation, data-access behavior or route handler behavior, authenticated UI behavior, language switching, and ownership boundaries where practical.

## Non-Goals

- No multi-pet switching UX beyond what is necessary to avoid blocking future multi-pet support.
- No pet deletion.
- No household management UI, family plans, caregiver access, invitations, or complex household permissions.
- No document upload, scan, OCR, extraction, review workflow, storage bucket work, or document metadata UI.
- No reminders, recurrence rules, notifications, email delivery, push delivery, or calendar sync.
- No timeline event creation.
- No Ask Caniello answers, AI provider calls, generated summaries, symptom checking, diagnosis, treatment recommendation, veterinary decision-making, or emergency advice.
- No sharing links, PDF export, caregiver permissions, revocation, or public share surfaces.
- No clinic, partner, marketplace, booking, payment, PIMS, EHR, or broad back-office workflows.
- No mobile app implementation.
- No production deployment or release approval.

## Acceptance Criteria

- A signed-in owner can open the Pets section and see either an empty first-pet form or their saved pet profile.
- The owner can save a pet profile with at least pet name and optional species, breed, birth date, sex or gender, weight, microchip number, allergies, medication, and important notes.
- Saved pet profile data is persisted in Supabase and is visible after page reload or a fresh authenticated visit.
- Pet profile input is validated with shared contracts or an approved schema layer before database writes.
- The implementation creates or reuses an owner household safely and does not expose another owner's household or pet data.
- Supabase RLS remains enabled for owner-owned pet data, and any migration includes policies or policy compatibility checks needed for the new fields.
- Unauthenticated visitors cannot read or write pet profile data.
- Pets section copy remains clear in Polish and English and does not imply documents, reminders, AI, sharing, or veterinary advice have shipped.
- Existing Home dashboard, first-run onboarding, section navigation, language switching, auth gating, and logout behavior do not regress.
- Focused automated tests and browser validation cover the save/read flow, validation errors, reload persistence, disabled or absent out-of-scope actions, and responsive layout.

## Implementation Notes

- Existing accepted ADRs already cover the durable backend direction:
  - `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`
  - `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`
  - `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`
  - `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- Existing schema starts in `infra/supabase/migrations/20260519000100_mvp_foundation.sql` with `public.households` and `public.pets`.
- Prefer a forward migration that extends `public.pets` rather than rewriting historical migrations.
- Keep shared browser/API schemas in `packages/contracts`.
- Keep Supabase configuration/client helpers in `packages/db` and avoid scattering raw queries across UI components.
- Route handlers should use the existing Supabase session/cookie pattern under `apps/web/lib/supabase/route-handler.ts`.
- Keep React route/shell components thin. Add feature-local account/app components for the pet profile form and display state.
- Use static dashboard demo data until a later task explicitly connects the Home dashboard to saved pet records.
- Update local seed data for Bruno only if needed to keep authenticated browser validation useful.

## Architecture Decisions

- Existing ADRs: `0004`, `0011`, `0014`, `0015`
- New ADR needed: No
- ADR draft: None
- Approval state: Human approval required before implementation because this task includes a Supabase migration and durable owner-owned data behavior.

## Approval Notes

Implementation must not start until a human explicitly approves this task's migration/data scope. Approval to implement this task does not approve release, production deployment, merge, or any expansion into documents, reminders, AI, sharing, or caregiver permissions.

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Expected validation:

- Contract/schema tests for valid and invalid pet profile payloads.
- Focused route/data-access tests where practical.
- Focused React tests for Pets section form/display behavior and language switching.
- `pnpm --filter web lint`
- `pnpm --filter web test`
- `pnpm build`
- Authenticated Playwright smoke with local Supabase: login, open Pets, save profile, reload, confirm data remains visible, confirm no console errors and no mobile/desktop overflow.

Actual validation on 2026-06-04:

- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts` from repository root; 2 files and 25 tests passed.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web`; 2 files and 11 tests passed.
- Passed: `./node_modules/.bin/vitest run` from `apps/web`; 9 files and 50 tests passed, with existing Vitest localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed outside sandbox after sandbox port-binding failure: `./node_modules/.bin/next build` from `apps/web`.
- Failed before running tests due package-manager/tooling fetch issue: `pnpm --filter @caniello/contracts test`, `pnpm --filter @caniello/db test`, `pnpm test -- packages/contracts/src/index.test.ts packages/db/src/index.test.ts`, `./node_modules/.bin/turbo test`, and `./node_modules/.bin/turbo lint`.
- Passed outside sandbox: `supabase status`; local Supabase is running.
- Passed after explicit approval path: `./scripts/start.sh` started local Supabase after Docker Desktop was launched.
- Passed after explicit approval path: `supabase db push --local` from `infra/supabase`; migration `20260604090000_extend_pet_profile_fields.sql` applied to the local database.
- Passed outside sandbox after Chromium sandbox launch failure: focused authenticated Playwright smoke against `http://127.0.0.1:3000`; confirmed unauthenticated `GET /api/pets/profile` returns 401, seeded login opens Pets, saving all profile fields persists to Supabase, reload shows the saved value, a fresh mobile context sees the saved value, no console/page errors occurred, and desktop/mobile horizontal overflow was zero.
- Evaluated with `forge-evaluator`: `spec/validation/pet-profile-foundation-evaluation.md` records verdict `Pass with gaps`.
- Follow-up fix passed: added a regression test proving pet profile fields are disabled while the initial profile load is pending; `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web` passed with 2 files and 12 tests.
- Follow-up fix passed: `pnpm --filter web test`; 9 files and 51 tests passed, with existing Vitest localStorage experimental warnings.
- Follow-up fix passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Follow-up fix passed outside sandbox after sandbox fetch failures: `pnpm --filter web lint` and `pnpm build`.
- Follow-up fix passed outside sandbox: focused Playwright load-lock smoke delayed the initial `GET /api/pets/profile`, confirmed pet profile fields were disabled during the pending load, then confirmed save/reload persistence, fresh mobile visibility, no console/page errors, and zero desktop/mobile horizontal overflow.
- RLS gap fix passed: added opt-in live Supabase integration test `apps/web/features/account/server/pet-profile.rls.test.ts`.
- RLS gap fix passed outside sandbox after sandbox localhost access failure: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/pet-profile.rls.test.ts` from `apps/web`; 1 file and 1 test passed. The test creates a temporary second owner, proves that owner can create their own household and pet, proves they cannot read or update Anna/Bruno's pet, proves they cannot insert into Anna's household, verifies Anna/Bruno's pet remains unchanged, and deletes the temporary owner.
- Default test path remains stable: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts pet-profile.rls.test.ts` from `apps/web`; 2 files and 12 tests passed, 1 opt-in RLS test skipped.
- Default web test suite remains stable: `pnpm --filter web test`; 9 files and 51 tests passed, 1 opt-in RLS test skipped, with existing Vitest localStorage experimental warnings.
- Review fix passed on 2026-06-05: added forward migration `20260605150000_enforce_unique_owner_households.sql` with `households_owner_user_id_unique` to make one owner household enforceable at the database boundary, and changed first-save household creation to recover from concurrent unique violations by re-reading the winning row.
- Review fix passed: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts`; 2 files and 16 tests passed.
- Review fix passed: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 52 tests passed and 1 skipped, with existing Vitest localStorage experimental warnings.
- Review fix passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Review fix passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- Review fix passed: `git diff --check`.
- Conflict-resolution evaluator rerun on 2026-06-05: `spec/validation/pet-profile-foundation-evaluation.md` now records verdict `Pass with gaps`.
- Conflict-resolution evaluator rerun passed: no merge-conflict markers found, `git diff --check`, focused contract/db/server tests, full web tests, contracts/db TypeScript, web lint outside sandbox after sandbox fetch failure, production build outside sandbox after sandbox fetch failure, and opt-in live Supabase RLS test outside sandbox after sandbox localhost denial.
- Conflict-resolution evaluator gap: owner-household uniqueness migration readiness needs cleanup before publish because `infra/supabase/migrations/20260605150000_enforce_unique_owner_households.sql` is untracked and the historical baseline migration is also modified for the same uniqueness constraint.

Residual validation gaps:

- None for this task. `pnpm test:e2e` was not run; task-specific browser/API/data validation was run instead.

## Handoff Notes

Implemented on branch `codex/pet-profile-foundation`.

Implementation summary:

- Added a forward Supabase migration extending `public.pets` with sex or gender, weight, microchip number, allergies, medication, and important notes while preserving existing household-owned RLS policies.
- Added a unique owner-household constraint and concurrent first-save retry path so duplicate owner households cannot make a newly saved pet disappear after reload.
- Updated local seed data for Bruno with the new profile fields.
- Added shared pet profile Zod contracts and response shapes in `packages/contracts`.
- Added a feature-local server helper and `/api/pets/profile` GET/PUT route using the existing Supabase route-client cookie pattern.
- Added an authenticated Pets section form that reads, saves, and displays the first owner pet profile.
- Preserved Home dashboard, first-run onboarding, section navigation, language switching, auth gating, logout behavior, and inert empty states for other sections.

Known gap:

- Browser persistence validation is complete after local migration approval.
- Follow-up load/edit race is fixed: pet profile fields are disabled during initial load and save, and the focused browser smoke passed.
- Two-owner/RLS isolation has a live opt-in Supabase integration test and passed locally.
- Migration readiness gap remains after review follow-up: stage the forward owner-household uniqueness migration and remove or justify the historical baseline migration edit before publishing.
