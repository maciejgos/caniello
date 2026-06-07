# Validation: Document Vault Foundation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/document-vault-foundation.md`: signed-in owners can create, view, edit, and reload metadata-only document-vault records for their first pet without enabling upload, OCR, AI extraction, sharing, or veterinary advice behavior.

## Source Artifacts

- Task: `spec/tasks/document-vault-foundation.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Migration: `infra/supabase/migrations/20260607100000_extend_document_metadata_fields.sql`
- Contracts: `packages/contracts/src/index.ts`, `packages/contracts/src/index.test.ts`
- API route: `apps/web/app/api/documents/route.ts`, `apps/web/app/api/documents/route.test.ts`
- Server helpers: `apps/web/features/account/server/documents.ts`, `apps/web/features/account/server/documents.test.ts`, `apps/web/features/account/server/documents.rls.test.ts`
- UI: `apps/web/features/account/components/DocumentVaultSection.tsx`, `apps/web/features/account/components/AuthenticatedAppShell.tsx`, `apps/web/features/account/content.ts`, `apps/web/features/account/AccountApp.test.tsx`
- Seed data: `infra/supabase/seed.sql`

## Preconditions

- Local Supabase stack is running.
- Local migration `20260607100000_extend_document_metadata_fields.sql` is applied.
- Web dev server is running on `http://localhost:3000`.
- Seeded local owner account `akowalska@example.com` exists.

## Acceptance Criteria Mapping

- Criterion: A signed-in owner can open Documents and see a real document list for their first pet.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx`; browser smoke opened Documents for the seeded owner and showed the metadata list.

- Criterion: Owner can create document metadata with required and optional fields.
  Evidence status: Supported
  Evidence: `DocumentVaultSection.tsx`, `/api/documents`, `documents.test.ts`, `AccountApp.test.tsx`, and browser smoke created `Karta szczepień Browser 1780821205434`.

- Criterion: Owner can edit saved document metadata.
  Evidence status: Supported
  Evidence: `updateOwnerDocument` tests and browser smoke edited the record to `Karta szczepień Browser 1780821205434 aktualizacja`.

- Criterion: Metadata persists after reload or a fresh authenticated visit.
  Evidence status: Supported
  Evidence: Browser smoke reloaded `/app`, reopened Documents, and found the edited title.

- Criterion: Input is validated with shared contracts before database writes.
  Evidence status: Supported
  Evidence: `documentPayloadSchema` and contract tests reject invalid dates, invalid types, empty titles, and unsupported upload/storage fields.

- Criterion: No-pet state blocks unattached documents.
  Evidence status: Supported
  Evidence: `DocumentVaultSection.tsx` uses first-pet API response state and shows a Pets navigation action when no pet exists.

- Criterion: Unauthenticated visitors cannot read or write document metadata.
  Evidence status: Supported
  Evidence: `apps/web/app/api/documents/route.test.ts` covers GET, POST, and PUT 401 responses.

- Criterion: RLS prevents cross-owner document access.
  Evidence status: Supported
  Evidence: Opt-in live Supabase RLS test passed outside sandbox.

- Criterion: Copy remains Polish/English and avoids upload, OCR, AI, sharing, passport replacement, and veterinary advice claims.
  Evidence status: Supported
  Evidence: `content.ts`, `AccountApp.test.tsx`, and browser smoke confirmed disabled upload copy, metadata-only copy, and medical boundary copy.

- Criterion: Existing authenticated app behavior does not regress.
  Evidence status: Supported
  Evidence: Full web Vitest suite passed.

- Criterion: Desktop and small viewport layouts have no horizontal overflow or console errors.
  Evidence status: Supported
  Evidence: Browser smoke measured `overflowX: 0` at 1440x1000 and 390x900 with no console error logs.

## Checks

- Check: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/documents.test.ts apps/web/app/api/documents/route.test.ts`
  Type: Automated
  Status: Passed
  Expected result: Contract, server helper, and API unauthenticated behavior pass.
  Actual result: 3 files and 27 tests passed.

- Check: `./node_modules/.bin/vitest run AccountApp.test.tsx documents.test.ts app/api/documents/route.test.ts` from `apps/web`
  Type: Automated
  Status: Passed
  Expected result: UI and focused document tests pass.
  Actual result: 3 files and 19 tests passed.

- Check: `pnpm --filter web test`
  Type: Automated
  Status: Passed
  Expected result: Full web test suite remains stable.
  Actual result: 13 files passed, 3 opt-in files skipped, 76 tests passed, 3 skipped.

- Check: TypeScript checks for contracts, db, and web
  Type: Automated
  Status: Passed
  Expected result: Strict TypeScript passes.
  Actual result: `tsc --noEmit --pretty false` passed for `packages/contracts`, `packages/db`, and `apps/web`.

- Check: `pnpm --filter web lint`
  Type: Automated
  Status: Passed
  Expected result: Web lint gate passes.
  Actual result: Sandboxed run failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.

- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Expected result: Production build includes `/api/documents`.
  Actual result: Sandboxed run failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed and listed `/api/documents`.

- Check: `git diff --check`
  Type: Automated
  Status: Passed
  Expected result: No whitespace errors.
  Actual result: Passed.

- Check: `supabase db push --local --workdir infra` and `supabase status --workdir infra`
  Type: Operational
  Status: Passed
  Expected result: Local migration applies and Supabase is running.
  Actual result: Sandboxed CLI failed on telemetry file permissions; approved outside-sandbox rerun applied the migration and status confirmed the local stack is running.

- Check: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/documents.rls.test.ts` from `apps/web`
  Type: Security
  Status: Passed
  Expected result: Second owner can manage their own document and cannot read, update, or insert documents for Anna/Bruno.
  Actual result: Sandboxed run failed on localhost `EPERM`; approved outside-sandbox rerun passed.

- Check: Browser smoke with in-app Browser at 1440x1000 and 390x900
  Type: UI
  Status: Passed
  Expected result: Seeded login, Documents navigation, metadata create/edit/reload, disabled upload placeholder, no console errors, no horizontal overflow.
  Actual result: Passed. Created and edited `Karta szczepień Browser 1780821205434`; desktop and mobile `overflowX` were 0; no console error logs.

## Evidence

- Implemented metadata-only storage status `metadata_only`, document metadata columns, and document type checks in a forward migration.
- API and server helpers create placeholder `storage_bucket` and `storage_path` values only to satisfy the existing table shape; UI copy explicitly states no file upload is attached.
- Browser validation confirmed disabled upload/OCR affordance and medical boundary copy on desktop and mobile.

## Missing, Skipped, or Unavailable Checks

- Check: `pnpm test:e2e`
  Reason: Not run; focused authenticated Browser smoke covered the task-specific acceptance criteria.
  Risk: Low for this task because route/server/UI/RLS/browser checks covered the changed behavior directly.

- Check: Default RLS suite without opt-in flag
  Reason: RLS test is intentionally skipped unless `CANIELLO_RUN_SUPABASE_RLS_TESTS=1`.
  Risk: Low after the opt-in live run passed locally.

## Future CI/CD or Lifecycle Gates

- Gate: Live Supabase RLS tests
  Trigger: Pre-merge CI once a local or ephemeral Supabase test stack is available.
  Blocks: Data-model changes that weaken owner isolation.

- Gate: Authenticated browser smoke
  Trigger: Pre-merge or nightly UI validation for MVP owner workflows.
  Blocks: Regressions in login, pet profile, documents, reminders, and responsive layout.

## Findings

- None.

## Result

Ready for human review

Evaluator verdict: Pass

## Follow-Up

Recommended next action: publish the validated document-vault foundation work as a draft PR. Do not merge, release, deploy, or mark human checkpoints complete from this evaluation.

## Human Decision

Pending

This evaluator does not approve, merge, release, deploy, or mark human checkpoints complete.
