# Task: Care Timeline Foundation

## Goal

Let an authenticated owner record and review dated care events for a saved pet, so vaccination, visit, medication, and document-related history can be organized in one owner-controlled timeline.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The `Now - MVP Foundation` roadmap includes owner-managed pet profiles, health records, reminders, documents, and trusted care information. A simple care timeline turns saved health history into a scannable owner utility without adding automation, AI, provider workflows, or partner access.

Related roadmap item:

`spec/roadmap.md` - Now: owner can store key health information; pet profile, health records, reminders, and document vault.

## Scope

- Add shared timeline event request/response contracts in `packages/contracts`.
- Add authenticated owner-only timeline server helpers and `/api/timeline-events` for listing, creating, and updating care timeline events for the current owner's first saved pet.
- Replace the inert Timeline section in the authenticated app with a real list and form for manual event entry.
- Support a small MVP event type set: vaccination, medication, deworming, visit, document, note, and other.
- Keep events manual and owner-provided, with optional notes and no generated medical guidance.
- Preserve Polish-first and English switching for timeline copy.
- Add focused contract, server, route, and UI tests.

## Non-Goals

- No database migration, new table, schema ownership change, storage behavior, or new architecture decision.
- No automatic events from documents, reminders, uploads, OCR, extraction, AI, or account activity.
- No timeline event deletion, attachment picker, document linking UI, source document editing, reminders generation, recurrence, notification delivery, calendar sync, or partner document-upload flow.
- No AI diagnosis, treatment recommendation, emergency guidance, generated medical summary, veterinarian replacement claim, or official EU pet passport replacement claim.
- No caregiver permissions, public sharing, share-link changes, PDF export, clinic/provider workflow, marketplace, booking, payments, mobile app work, release, deployment, merge, or roadmap movement.

## Acceptance Criteria

- A signed-in owner with a saved pet can open Timeline, see existing events for that pet, and add a new manual care event with title, event type, date, and optional notes.
- The owner can edit an existing timeline event belonging to their first saved pet.
- The API rejects unauthenticated list/create/update requests before data access.
- The API validates event title, event type, event date, and note length before writing data.
- Events are scoped to the current owner's first saved pet and returned newest first by event date and creation time.
- The Timeline UI handles loading, no-pet, empty, validation, save-error, create, edit, cancel, and saved-list states without implying automated document extraction, AI analysis, reminders, sharing, or provider workflows.
- Polish and English copy preserve owner-control and medical-safety boundaries.
- Desktop and mobile layouts render without horizontal document overflow, clipped primary text, or incoherent overlap.
- Focused tests and practical validation pass, with no roadmap scope expansion.

## Implementation Notes

- Start from `apps/web/features/account/components/AuthenticatedAppShell.tsx`, `apps/web/features/account/content.ts`, and the existing server-helper patterns in `apps/web/features/account/server/reminders.ts` and `documents.ts`.
- Reuse the existing `public.timeline_events` table and RLS policies from `infra/supabase/migrations/20260519000100_mvp_foundation.sql`.
- Keep route and helper naming feature-local, for example `/api/timeline-events` and `apps/web/features/account/server/timeline-events.ts`.
- Do not expose `source_document_id` in the UI for this task. Store it as null for manual events.
- Use accepted ADR `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md` for pragmatic scope and component boundaries.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Validation notes:

- Forge evaluator artifact: `spec/validation/care-timeline-foundation-evaluation.md`
- Fresh evaluator verdict: Pass. Acceptance criteria are supported by focused contract/server/route/UI tests, full web tests, TypeScript validation, lint, production build, full monorepo tests, opt-in live RLS validation, and in-app Browser desktop/mobile smoke.
- Focused validation passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/timeline-events.test.ts apps/web/app/api/timeline-events/route.test.ts`.
- Focused AccountApp validation passed: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`.
- Full web validation passed: `pnpm --filter web test`; 19 files passed, 5 opt-in files skipped, 105 tests passed, 5 skipped.
- TypeScript validation passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json` and `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- `git diff --check` passed.
- Sandbox `pnpm --filter web lint`, `pnpm build`, and `pnpm test` failed with `[ERROR] fetch failed`; approved outside-sandbox reruns passed.
- Opt-in live RLS validation passed outside the sandbox after sandbox localhost `EPERM`: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/timeline-events.rls.test.ts` from `apps/web`.
- In-app Browser smoke passed using seeded local owner `akowalska@example.com`: login, Timeline navigation, manual event create, manual event edit, disabled automation control, zero console errors, and zero horizontal overflow at default desktop width and 390x900 mobile.

## Handoff Notes

Planned with `forge-planner`, implemented with `forge-implementer`, and evaluated with `forge-evaluator` on 2026-06-12 on branch `codex/care-timeline-foundation`.

Implemented a real authenticated Timeline section backed by the existing `public.timeline_events` table and RLS policies. The task adds shared timeline contracts, `/api/timeline-events`, feature-local server helpers, localized manual event list/create/edit UI, focused tests, and an opt-in live RLS test. It intentionally adds no migrations, automatic document/reminder/AI timeline events, deletion, attachment picker, document linking UI, reminders generation, notification delivery, sharing, PDF export, provider workflow, release, deployment, or roadmap movement.
