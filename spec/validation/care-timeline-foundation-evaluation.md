# Validation: Care Timeline Foundation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/care-timeline-foundation.md`, which adds a manual owner-owned care timeline for the authenticated app without migrations, automation, AI, sharing, or provider workflows.

## Source Artifacts

- Task: `spec/tasks/care-timeline-foundation.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Changed implementation files:
  - `packages/contracts/src/index.ts`
  - `packages/contracts/src/index.test.ts`
  - `apps/web/app/api/timeline-events/route.ts`
  - `apps/web/app/api/timeline-events/route.test.ts`
  - `apps/web/features/account/server/timeline-events.ts`
  - `apps/web/features/account/server/timeline-events.test.ts`
  - `apps/web/features/account/server/timeline-events.rls.test.ts`
  - `apps/web/features/account/components/CareTimelineSection.tsx`
  - `apps/web/features/account/components/AuthenticatedAppShell.tsx`
  - `apps/web/features/account/content.ts`
  - `apps/web/features/account/AccountApp.test.tsx`

## Preconditions

- Existing MVP baseline schema includes `public.timeline_events` and owner RLS policies.
- Local Supabase and the seeded demo owner are available for live browser/RLS validation.
- Web dev server runs at `http://localhost:3000`.

## Acceptance Criteria Mapping

- Criterion: A signed-in owner with a saved pet can open Timeline, see events, and add a manual care event.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx`, in-app Browser smoke, and `/api/timeline-events` server/route tests cover Timeline navigation and manual create behavior.
- Criterion: The owner can edit an existing timeline event belonging to their first saved pet.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx`, browser smoke, and `timeline-events.test.ts` cover update behavior scoped by event id and pet id.
- Criterion: API rejects unauthenticated list/create/update requests before data access.
  Evidence status: Supported
  Evidence: `apps/web/app/api/timeline-events/route.test.ts` passed.
- Criterion: API validates title, type, date, and note length before writes.
  Evidence status: Supported
  Evidence: `packages/contracts/src/index.test.ts` covers strict timeline payload parsing and invalid fields/dates/types.
- Criterion: Events are scoped to the current owner's first saved pet and returned newest first.
  Evidence status: Supported
  Evidence: `timeline-events.ts` filters by first pet and orders `event_date`/`created_at` descending; server tests and live RLS test passed.
- Criterion: UI handles loading, no-pet, empty, validation, save-error, create, edit, cancel, and saved-list states without implying automation.
  Evidence status: Supported
  Evidence: component implementation review plus focused `AccountApp.test.tsx` coverage for create/edit, empty state, disabled automation, and manual-entry badges.
- Criterion: Polish and English copy preserve owner-control and medical-safety boundaries.
  Evidence status: Supported
  Evidence: `content.ts` includes localized copy; `AccountApp.test.tsx` verifies Polish and English timeline safety text.
- Criterion: Desktop and mobile layouts render without horizontal overflow or obvious overlap.
  Evidence status: Supported
  Evidence: in-app Browser smoke found zero horizontal overflow at default desktop and 390x900 mobile.

## Checks

- Check: Focused contract/server/route tests.
  Type: Automated
  Status: Passed
  Expected result: Timeline contracts, helpers, and route behavior pass.
  Actual result: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/timeline-events.test.ts apps/web/app/api/timeline-events/route.test.ts` passed; 3 files, 31 tests.
- Check: Focused AccountApp UI tests.
  Type: Automated
  Status: Passed
  Expected result: Timeline UI create/edit and language behavior pass without regressing app shell.
  Actual result: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web` passed; 1 file, 16 tests.
- Check: Full web test suite.
  Type: Automated
  Status: Passed
  Expected result: Existing web behavior and new timeline tests pass.
  Actual result: `pnpm --filter web test` passed; 19 files passed, 5 opt-in RLS files skipped, 105 tests passed, 5 skipped.
- Check: TypeScript checks.
  Type: Automated
  Status: Passed
  Expected result: Contracts and web app compile under strict TypeScript.
  Actual result: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json` and `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json` passed.
- Check: Lint/build/full monorepo tests.
  Type: Automated
  Status: Passed
  Expected result: Broad validation gates pass.
  Actual result: Approved outside-sandbox `pnpm --filter web lint`, `pnpm build`, and `pnpm test` passed after sandboxed pnpm commands failed with `[ERROR] fetch failed`.
- Check: Live owner isolation.
  Type: Security
  Status: Passed
  Expected result: A second owner cannot read, update, or insert timeline events for Anna/Bruno.
  Actual result: Approved outside-sandbox `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/timeline-events.rls.test.ts` passed after sandbox localhost `EPERM`.
- Check: Browser UI smoke.
  Type: UI
  Status: Passed
  Expected result: Authenticated Timeline create/edit works with no console errors or horizontal overflow on desktop/mobile.
  Actual result: In-app Browser login with `akowalska@example.com`, Timeline navigation, manual event create/edit, disabled automation control, zero console errors, and zero overflow at desktop and 390x900 mobile.
- Check: Whitespace.
  Type: Automated
  Status: Passed
  Expected result: No whitespace errors in the diff.
  Actual result: `git diff --check` passed.

## Evidence

- Browser smoke created and edited a local manual event titled `Kontrola po szczepieniu - aktualizacja` for the seeded owner.
- Production build listed new route `/api/timeline-events`.
- No migrations, storage changes, AI/provider calls, sharing changes, notification delivery, or roadmap movement were added.

## Findings

- None.

## Missing, Skipped, or Unavailable Checks

- Check: `pnpm test:e2e`
  Reason: Not run; focused authenticated browser validation covered the changed Timeline flow directly.
  Risk: Low for this task because server/API/UI tests, live RLS, build, and desktop/mobile browser smoke covered the acceptance criteria.

## Future CI/CD or Lifecycle Gates

- Gate: Run opt-in RLS tests in CI when local Supabase service orchestration is available.
  Trigger: Changes to owner-owned data helpers, route handlers, or RLS policies.
  Blocks: PR merge/release readiness if owner isolation fails.

## Result

Pass

## Follow-Up

Recommended next action: publish the task as a draft PR for human review. Later document file upload remains a candidate Now-scope task, but it requires explicit approval for a storage bucket/policy migration before implementation.

## Human Decision

Pending. This evaluator verdict does not approve, merge, release, deploy, or mark a human checkpoint complete.
