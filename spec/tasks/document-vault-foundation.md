# Task: Document Vault Foundation

## Goal

Let a signed-in owner record, view, and update basic document-vault metadata for their first pet so Caniello can support the MVP activation path where an owner creates at least one reminder or document.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Document vault behavior is a core MVP Foundation outcome. This task turns the inert Documents section into owner-owned document metadata while keeping file upload, storage, OCR, AI extraction, sharing, and timeline automation out of scope.

Related roadmap item:

`spec/roadmap.md` - Now: owner can upload or store important documents; user creates at least one reminder or document.

## Scope

- Use the existing authenticated owner, household, and first-pet model as the document ownership boundary.
- Use the existing `public.documents` table for the smallest durable document metadata fields needed for MVP: pet, document title, document type, document date, optional provider or clinic, optional notes, original filename, MIME type, and status.
- Preserve existing document RLS so owners can only read and mutate documents for pets in their own household.
- Add a forward migration only for missing document metadata fields and indexes needed by this slice.
- Add shared Zod contracts in `packages/contracts` for document read and write payloads.
- Add focused server/data-access behavior for listing, creating, and updating document metadata for the signed-in owner's first pet.
- Replace the Documents empty state with a real authenticated document-vault surface.
- Include Polish-first and English copy for the document list, metadata form, validation, success, error, no-pet state, and safety boundaries.
- Show saved document metadata after save and after reload or a fresh authenticated visit.
- Keep upload, scan, OCR, extraction, review, storage, AI, sharing, and PDF controls disabled or clearly deferred if visible.
- Add focused tests for contracts, server/data access or route behavior, authenticated UI behavior, validation errors, language switching, unauthenticated rejection, and ownership boundaries where practical.

## Non-Goals

- No file upload, scan, camera capture, storage bucket writes, signed URLs, file preview, file download, or file deletion.
- No OCR, extraction, classification, AI processing, generated summaries, document-processing jobs, extracted-field review, or automatic confirmation workflow.
- No automatic timeline event creation, reminder creation, medication extraction, duplicate detection, or calendar sync.
- No Ask Caniello answers, AI provider calls, generated medical guidance, symptom checking, diagnosis, treatment recommendation, veterinary decision-making, or emergency advice.
- No sharing links, PDF export, caregiver permissions, family plans, invitations, revocation, or public share surfaces.
- No clinic, partner, marketplace, booking, payment, PIMS, EHR, or broad back-office workflows.
- No multi-pet document switching UX beyond avoiding blockers for future multi-pet support.
- No mobile app implementation.
- No production deployment, release approval, or roadmap scope movement.

## Acceptance Criteria

- A signed-in owner can open Documents and see a real document list for their first pet.
- The owner can create document metadata with title, document type, document date, optional provider or clinic, optional notes, optional original filename, and optional MIME type.
- The owner can edit saved document metadata.
- Document metadata is persisted in Supabase and remains visible after reload or a fresh authenticated visit.
- Document input is validated with shared contracts or an approved schema layer before database writes.
- If no pet profile exists, Documents shows a clear first-pet-required state that navigates to Pets instead of creating unattached documents.
- Unauthenticated visitors cannot read or write document metadata.
- Supabase RLS prevents one owner from reading or mutating another owner's pet documents.
- Documents copy remains clear in Polish and English and does not imply upload, scan, OCR, AI extraction, sharing, official passport replacement, or veterinary advice have shipped.
- Existing Home dashboard, first-run onboarding, Pets profile, Reminders, section navigation, language switching, auth gating, and logout behavior do not regress.
- Desktop and small viewport layouts render without horizontal document overflow, clipped primary text, or incoherent overlap.
- Focused automated tests and browser validation cover create/read/update behavior, validation errors, reload persistence, unavailable upload/OCR controls, and responsive layout.

## Implementation Notes

- Existing baseline schema already includes `public.documents` with `pet_id`, storage fields, optional filename and MIME type, status, timestamps, and household-owned RLS.
- Prefer a forward migration for missing MVP metadata columns such as `document_title`, `document_type`, `document_date`, `provider_name`, `notes`, and a pet/date index.
- Keep shared browser/API schemas in `packages/contracts`.
- Keep Supabase route-client usage aligned with `apps/web/lib/supabase/route-handler.ts`.
- Reuse the first-pet lookup and owner/RLS patterns from pet profile and reminders server helpers.
- Keep UI components feature-local under `apps/web/features/account/components/` and keep route/shell components thin.
- Treat upload, scan, extraction, review, storage, and OCR controls from existing previews as non-functional placeholders unless a later approved task implements them.

## Architecture Decisions

- Existing ADRs: `0004`, `0011`, `0014`, `0015`, `0016`
- New ADR needed: No
- ADR draft: None
- Approval state: Human approval required before implementation because this task includes a Supabase migration and durable owner-owned document metadata behavior.

## Approval Notes

Implementation may proceed under the user's request for the full planner-to-publisher chain. This does not approve release, production deployment, merge, or any expansion into real uploads, OCR, AI extraction, sharing, caregiver permissions, or official passport replacement behavior.

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Expected validation:

- Contract/schema tests for valid and invalid document payloads.
- Focused route/data-access tests for authenticated owner access, create/update behavior, and unauthenticated rejection.
- Ownership/RLS coverage where practical, preferably with an opt-in live Supabase test if local Supabase is available.
- Focused React tests for Documents section list, form behavior, validation copy, unavailable upload/OCR controls, and language switching.
- `pnpm --filter web lint`
- `pnpm --filter web test`
- `pnpm build`
- Authenticated Playwright smoke with local Supabase: login, open Documents, create document metadata, edit it, reload, confirm data remains visible, confirm disabled/deferred upload/OCR controls, confirm no console errors and no desktop/mobile overflow.

Actual validation on 2026-06-07:

- Forge evaluator artifact: `spec/validation/document-vault-foundation-evaluation.md`
- Fresh evaluator verdict: Pass.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/documents.test.ts apps/web/app/api/documents/route.test.ts`; 3 files and 27 tests passed.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx documents.test.ts app/api/documents/route.test.ts` from `apps/web`; 3 files and 19 tests passed, with existing Vitest localStorage experimental warnings.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts apps/web/features/account/server/documents.test.ts apps/web/app/api/documents/route.test.ts`; 4 files and 41 tests passed.
- Passed: `pnpm --filter web test`; 13 files passed, 3 opt-in files skipped, 76 tests passed, 3 skipped, with existing Vitest localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `git diff --check`.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed and listed `/api/documents` in the production route output.
- Sandboxed `supabase db push --local --workdir infra` and `supabase status --workdir infra` failed because the Supabase CLI attempted to write telemetry under `/Users/macg/.supabase`; approved outside-sandbox reruns applied `20260607100000_extend_document_metadata_fields.sql` and confirmed local Supabase is running.
- Sandboxed opt-in live document RLS test failed on localhost `EPERM`; approved outside-sandbox rerun passed: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/documents.rls.test.ts`.
- Browser validation through the in-app Browser passed at 1440x1000 and 390x900 using seeded local account `akowalska@example.com`; confirmed login, Documents navigation, metadata create, metadata edit, reload persistence, disabled upload placeholder, metadata-only and medical-boundary copy, no console errors, and zero horizontal overflow.
- `pnpm test:e2e` was not run; focused authenticated Browser validation covered this task's acceptance criteria.

## Handoff Notes

Implemented and evaluated on branch `codex/document-vault-foundation`.

Implementation summary:

- Added forward migration `20260607100000_extend_document_metadata_fields.sql` extending `public.documents` with metadata columns, a `metadata_only` status, document-type constraint, and pet/date index while preserving existing owner-owned document RLS policies.
- Added shared document metadata contracts in `packages/contracts`.
- Added feature-local document server helpers and `/api/documents` route for listing, creating, and updating metadata for the signed-in owner's first pet.
- Added a real Documents section in the authenticated app with localized list/form behavior, no-pet state, edit flow, disabled upload/OCR placeholder, metadata-only copy, and medical-boundary copy.
- Added local seed document metadata for Bruno to support browser validation.
- Added focused contract, server helper, API unauthenticated, UI, and opt-in live RLS tests.
- Preserved Home dashboard, first-run onboarding, Pets profile, Reminders, section navigation, language switching, auth gating, logout behavior, and out-of-scope upload/OCR/AI/sharing behavior.

Known gaps:

- None for this task. Full `pnpm test:e2e` was not run; task-specific Browser validation passed.
