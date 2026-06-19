# Task: Care Reminder Foundation

## Goal

Let a signed-in owner create, view, update, and complete basic care reminders for their first pet so Caniello can support the MVP activation path beyond pet profile storage.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Care reminders are a core MVP Foundation outcome and one of the activation signals for the thin MVP. This task turns the existing inert Reminders section into owner-owned reminder data while keeping notification delivery, recurrence automation, AI suggestions, documents, and sharing out of scope.

Related roadmap item:

`spec/roadmap.md` - Now: owner can add care reminders; user creates at least one reminder or document.

## Scope

- Use the existing authenticated owner, household, and first-pet model as the reminder ownership boundary.
- Extend or use the existing `public.reminders` table for the smallest durable reminder fields needed for MVP: pet, title, reminder type, due date, optional notes, and status.
- Preserve existing reminder RLS so owners can only read and mutate reminders for pets in their own household.
- Add shared Zod contracts in `packages/contracts` for reminder read and write payloads.
- Add focused server/data-access behavior for listing, creating, updating, and marking reminders completed for the signed-in owner's first pet.
- Replace the Reminders empty state with a real authenticated reminder surface inspired by `spec/design/visual-artifacts/mvp/reminders.png`.
- Include a Polish-first and English reminder list with basic tabs or filters for upcoming, completed, medication, vaccination, and visit reminders when practical within the small slice.
- Include a create/edit reminder form or panel with title, type, due date, and optional notes.
- Keep reminder preferences, notification settings, snooze, and test notification controls visible only as disabled or deferred UI if they appear.
- Show saved reminders after save and after reload or a fresh authenticated visit.
- Add focused tests for contracts, server/data access or route behavior, authenticated UI behavior, validation errors, language switching, status changes, and ownership boundaries where practical.

## Non-Goals

- No email, push, SMS, in-app notification delivery, digest delivery, or test notifications.
- No recurrence engine, advanced schedules, medication dose schedule, timezone preferences, calendar sync, or snooze behavior.
- No automatic reminder creation from documents, OCR, AI extraction, timeline events, or confirmed records.
- No document upload, scan, storage, OCR, extraction, review workflow, or document metadata UI.
- No timeline event creation or automatic history updates when a reminder changes.
- No Ask Caniello answers, AI provider calls, generated summaries, symptom checking, diagnosis, treatment recommendation, veterinary decision-making, or emergency advice.
- No sharing links, PDF export, caregiver permissions, family plans, invitations, revocation, or public share surfaces.
- No clinic, partner, marketplace, booking, payment, PIMS, EHR, or broad back-office workflows.
- No multi-pet reminder switching UX beyond avoiding blockers for future multi-pet support.
- No mobile app implementation.
- No production deployment, release approval, or roadmap scope movement.

## Acceptance Criteria

- A signed-in owner can open Reminders and see a real reminder list for their first pet.
- The owner can create a reminder with title, reminder type, due date, and optional notes.
- The owner can edit a saved reminder and mark it completed.
- Reminder data is persisted in Supabase and remains visible after reload or a fresh authenticated visit.
- Reminder input is validated with shared contracts or an approved schema layer before database writes.
- Unauthenticated visitors cannot read or write reminder data.
- Supabase RLS prevents one owner from reading or mutating another owner's pet reminders.
- Reminders copy remains clear in Polish and English and does not imply notifications, recurrence, calendar sync, AI suggestions, documents, sharing, or veterinary advice have shipped.
- Existing Home dashboard, first-run onboarding, Pets profile, section navigation, language switching, auth gating, and logout behavior do not regress.
- Desktop and small viewport layouts render without horizontal document overflow, clipped primary text, or incoherent overlap.
- Focused automated tests and browser validation cover create/read/update/complete behavior, validation errors, reload persistence, unavailable notification controls, and responsive layout.

## Implementation Notes

- Visual reference: `spec/design/visual-artifacts/mvp/reminders.png`. Match the broad Reminders screen intent, but keep implementation smaller than the full mockup.
- Existing baseline schema already includes `public.reminders` with `pet_id`, optional `source_document_id`, `title`, `due_date`, `status`, timestamps, and household-owned RLS. Prefer a forward migration only for missing MVP fields such as `reminder_type`, optional `notes`, or indexes.
- Existing accepted ADRs cover the durable backend direction:
  - `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`
  - `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
  - `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`
  - `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`
- Keep shared browser/API schemas in `packages/contracts`.
- Keep Supabase route-client usage aligned with the existing pattern in `apps/web/lib/supabase/route-handler.ts` and the pet profile server helper under `apps/web/features/account/server/`.
- Keep UI components feature-local under `apps/web/features/account/components/` and keep route/shell components thin.
- If no pet profile exists yet, show a clear first-pet-required state that links or navigates to Pets rather than creating reminders unattached to a pet.
- Treat preference and notification panels from the visual reference as non-functional placeholders unless a later approved task implements delivery and settings.

## Architecture Decisions

- Existing ADRs: `0004`, `0011`, `0014`, `0015`
- New ADR needed: No
- ADR draft: None
- Approval state: Human approval required before implementation because this task may include a Supabase migration and durable owner-owned reminder data behavior.

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Expected validation:

- Contract/schema tests for valid and invalid reminder payloads.
- Focused route/data-access tests for authenticated owner access, create/update/complete behavior, and unauthenticated rejection.
- Ownership/RLS coverage where practical, preferably with an opt-in live Supabase test if local Supabase is available.
- Focused React tests for Reminders section list, form behavior, completion flow, validation copy, unavailable notification controls, and language switching.
- `pnpm --filter web lint`
- `pnpm --filter web test`
- `pnpm build`
- Authenticated Playwright smoke with local Supabase: login, open Reminders, create reminder, edit reminder, mark complete, reload, confirm data remains visible, confirm disabled/deferred notification controls, confirm no console errors and no desktop/mobile overflow.

Actual validation on 2026-06-06:

- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts apps/web/features/account/server/reminders.test.ts` from repository root; 3 files and 35 tests passed.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts reminders.test.ts` from `apps/web`; 3 files and 20 tests passed, with existing Vitest localStorage experimental warnings.
- Passed: `pnpm --filter web test`; 10 files passed and 1 opt-in RLS file skipped, 62 tests passed and 1 skipped, with existing Vitest localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `git diff --check`.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`. The required outside-sandbox rerun was rejected by the automatic escalation reviewer because the account had hit the current usage limit, so lint remains unavailable in this turn.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`. The required outside-sandbox rerun was rejected by the automatic escalation reviewer because the account had hit the current usage limit, so production build remains unavailable in this turn.
- `docker ps` confirmed the local Supabase containers are running.
- Sandboxed `supabase status --workdir infra` failed when the CLI attempted to write telemetry under `/Users/macg/.supabase`.
- Sandboxed `SUPABASE_TELEMETRY_DISABLED=1 supabase status --workdir infra` then failed because the Supabase CLI could not access the Docker socket from the sandbox.
- Authenticated Playwright/browser validation was not run because applying/checking the local Supabase migration and running browser automation require outside-sandbox access, and escalation is currently blocked by the account usage limit.

Evaluator validation update on 2026-06-06:

- Passed outside sandbox: `pnpm --filter web lint`.
- Passed outside sandbox: `pnpm build`; build output includes `/api/reminders`.
- Passed outside sandbox: `SUPABASE_TELEMETRY_DISABLED=1 supabase db push --local --workdir infra`; migration `20260606110000_extend_care_reminder_fields.sql` applied to the local database.
- Passed outside sandbox: `SUPABASE_TELEMETRY_DISABLED=1 supabase status --workdir infra`; local Supabase setup is running.
- Passed: focused authenticated Playwright smoke on desktop and mobile Chromium using seeded local account `akowalska@example.com`; confirmed login, Reminders navigation, disabled notification controls, create reminder, edit reminder, mark complete, reload persistence after navigating back to Reminders, no console/page errors, and zero horizontal overflow.
- Created evaluator artifact: `spec/validation/care-reminder-foundation-evaluation.md`.
- Gap follow-up passed: added `apps/web/app/api/reminders/route.test.ts` covering unauthenticated GET, POST, and PUT rejection with 401 before reminder data access.
- Gap follow-up passed: added opt-in live Supabase integration test `apps/web/features/account/server/reminders.rls.test.ts`; approved outside-sandbox run passed after sandbox localhost denial: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/reminders.rls.test.ts`.
- Gap follow-up passed: `./node_modules/.bin/vitest run app/api/reminders/route.test.ts features/account/server/reminders.test.ts features/account/server/reminders.rls.test.ts` from `apps/web`; 2 files passed and 1 opt-in RLS file skipped, 8 tests passed and 1 skipped.
- Gap follow-up passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Gap follow-up passed: `pnpm --filter web test`; 11 files passed and 2 opt-in RLS files skipped, 65 tests passed and 2 skipped.
- Gap follow-up passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts apps/web/features/account/server/reminders.test.ts`; 3 files and 35 tests passed.
- Gap follow-up passed: `git diff --check`.

Review follow-up on 2026-06-06:

- Fixed review issue: the Reminders screen now uses the pet name returned by `/api/reminders` for the page title and empty-state copy instead of hardcoded Bruno copy, with localized neutral fallback copy while pet data is unavailable.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`; 1 file and 11 tests passed.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `pnpm --filter web test`; 11 files passed, 2 opt-in RLS files skipped, 65 tests passed, 2 skipped.
- Passed: `git diff --check`.
- Browser smoke: sandboxed Chromium launch failed with a macOS `MachPortRendezvousServer` permission denial; approved outside-sandbox Playwright smoke passed against `http://127.0.0.1:3000`, confirming the Reminders page rendered, had no console/page errors, and had zero horizontal overflow.

Residual validation gaps:

- None for this task. Full `pnpm test:e2e` was not run; task-specific authenticated Playwright smoke covered the acceptance criteria.

## Handoff Notes

Implemented on branch `codex/care-reminder-foundation` after human approval confirmed the migration/data scope.

Implementation summary:

- Added forward migration `20260606110000_extend_care_reminder_fields.sql` for `public.reminders.reminder_type`, `notes`, and a pet/due-date index while preserving existing household-owned RLS policy behavior.
- Added shared reminder contracts in `packages/contracts` for reminder type, status, payloads, responses, and API response shape.
- Added feature-local reminder server helper and `/api/reminders` route for listing, creating, updating, and marking reminders completed for the signed-in owner's first pet.
- Added a real Reminders section in the authenticated app with localized list filters, create/edit form, completion flow, first-pet-required state, and disabled/deferred notification preferences.
- Review follow-up changed Reminders copy to interpolate the actual returned first-pet name instead of hardcoded Bruno text.
- Added local seed reminders for Bruno to support future browser validation after local migrations are applied.
- Preserved Home dashboard, first-run onboarding, Pets profile, section navigation, language switching, auth gating, logout behavior, medical boundaries, and out-of-scope notification/AI/sharing/document behavior.

Known gaps:

- None for this task. Direct unauthenticated API coverage and live two-owner reminder RLS coverage were added after evaluator follow-up.
