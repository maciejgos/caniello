# Caniello Handoff

## Current State

- Active task: `spec/tasks/account-deletion-persistence-verification.md`.
- Active branch: `codex/account-deletion-persistence-verification`.
- Current workflow: publication complete; draft PR opened for human review. The implementation is evidence-only: no runtime account deletion behavior changed. The 2026-06-13 readiness artifact remains historical evidence for seeded-owner internal validation only: `spec/validation/mvp-validation-readiness-2026-06-13.md`. Broader new-owner and mockup-fidelity MVP validation still depends on the recovery task set or explicit human waivers. This does not approve release, deployment, merge, production use, or roadmap movement.

## Latest Notes

- Added root `DESIGN.md` on 2026-06-16 by adapting the Stitch-generated `DESIGN.md` draft into Caniello-specific visual guidance. The file defines Caniello's visual priority order, colors, typography, layout rules, component guidance, imagery guidance, accessibility expectations, and product-safety design boundaries.
- Updated `AGENTS.md` so future UI, design-system, prototype, screenshot-alignment, and visual QA work reads `DESIGN.md` alongside `spec/product-context.md`, `spec/roadmap.md`, relevant task files, and human-supplied MVP screenshots.
- Validation passed: `git diff --check`. No tests were run because this was a documentation/design-guidance update only. No product behavior, UI implementation, route behavior, database change, release, deployment, merge, roadmap movement, production-readiness state, or human approval checkpoint changed.
- Planned, implemented, and evaluated `spec/tasks/account-deletion-persistence-verification.md` on 2026-06-14.
- Added focused server-helper tests proving `requestOwnerAccountDeletion` rejects non-`DELETE` confirmation before auth/table access and inserts authenticated-owner rows into `account_deletion_requests`.
- Extended the opt-in live Supabase RLS test so account deletion request persistence also verifies `audit_logs` evidence for `account.deletion_requested` with entity type `account_deletion_request`, the deletion request id, and bounded status/language metadata.
- Evaluator verdict: Pass. Validation artifact: `spec/validation/account-deletion-persistence-verification-evaluation.md`.
- Validation passed: focused account settings Vitest outside sandbox; `pnpm --filter web test`; `pnpm --filter web lint` outside sandbox; `CANIELLO_RUN_SUPABASE_RLS_TESTS=1 pnpm --filter web exec vitest run features/account/server/account-settings.rls.test.ts` outside sandbox after `./scripts/start.sh`; `git diff --check`.
- Skipped browser UI smoke because no UI behavior, copy, CSS, route, or component logic changed. Existing `AccountApp.test.tsx` coverage still verifies the Settings deletion request sends the queued account-deletion API payload.
- Published draft PR https://github.com/maciejgos/caniello/pull/32 from `codex/account-deletion-persistence-verification` to `mvp-implementation` on 2026-06-14. The branch includes task commit `6e44c6a`; this publish-record handoff update follows as a separate metadata commit. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, production-ready, or roadmap scope moved.
- Approval state: no human acceptance, release, deployment, merge, production-readiness state, or roadmap phase movement. Recommended next action: human review of draft PR #32.
- Human accepted ADRs 0024 through 0032 on 2026-06-14 by saying "Accept all ADRs." ADR files and `spec/architecture-records/README.md` were updated from `Draft` to `Accepted`. Older draft ADRs 0022 and 0023 were not changed by this acceptance.
- Used `forge-shaper` on 2026-06-14 to create feature brief `spec/features/accepted-architecture-implementation-backlog.md`.
- Used `forge-planner` on 2026-06-14 to create implementation task files from the accepted architecture backlog:
  - `spec/tasks/document-upload-storage-implementation.md`
  - `spec/tasks/audit-product-event-foundation.md`
  - `spec/tasks/data-rights-manual-runbook.md`
  - `spec/tasks/share-link-lifecycle-hardening.md`
  - `spec/tasks/live-rls-fixture-isolation.md`
  - `spec/tasks/public-health-upload-release-readiness-playbook.md`
  - `spec/tasks/feature-boundary-dependency-guardrails.md`
- Existing implementation tasks also cover accepted architecture decisions: `spec/tasks/new-owner-access-validation.md`, `spec/tasks/pet-profile-ia-and-controls.md`, and `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`.
- Updated `spec/roadmap.md` with an `Accepted architecture implementation backlog` under `Now - MVP Foundation`.
- Updated `spec/tasks/document-upload-scope-decision.md` so ADR 0025 is recorded as accepted and links to the new implementation task.
- Updated `spec/architecture/architecture-review-bundle-2026-06-14.md` so it reflects accepted, not draft, ADRs.
- Validation passed: `git diff --check`. No tests were run because this shaping/planning update changed documentation only. No implementation code has been changed.
- Used `forge-architect` on 2026-06-14 to design the remaining MVP architecture documents for a single human review iteration.
- Added review index `spec/architecture/architecture-review-bundle-2026-06-14.md`.
- Added draft ADRs:
  - `spec/architecture-records/0026-use-manual-data-rights-runbook-before-automated-account-lifecycle.md`
  - `spec/architecture-records/0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md`
  - `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`
  - `spec/architecture-records/0029-strengthen-scoped-share-link-lifecycle-before-caregiver-accounts.md`
  - `spec/architecture-records/0030-use-disposable-validation-fixtures-for-live-rls-tests.md`
  - `spec/architecture-records/0031-require-release-readiness-playbook-before-public-health-record-upload.md`
  - `spec/architecture-records/0032-use-email-first-owner-auth-and-defer-oauth-rollout.md`
- Updated `spec/architecture-records/README.md` so ADRs 0023 through 0032 are discoverable from the ADR index.
- Full architecture review bundle includes ADRs 0024 through 0032. They were accepted by the human on 2026-06-14.
- Validation passed: `git diff --check`. No tests were run because this was documentation/architecture work only.
- Approval state: implementation tasks may now depend on accepted ADRs 0024 through 0032. No product behavior, database migration, route behavior, UI behavior, release, deployment, merge, production-readiness state, or roadmap phase changed.
- Used `forge-architect` on 2026-06-13 to define the real document upload architecture for Supabase Storage with free-tier-friendly MVP limits.
- Added draft ADR `spec/architecture-records/0025-use-supabase-storage-for-mvp-document-upload.md`.
- Draft decision: implement real document upload with a private `pet-documents` Supabase Storage bucket, server-mediated upload, short-lived owner-only signed read URLs, 5 MB max file size, PDF/JPEG/PNG/WebP allowlist, one file per document, 20 files per owner, 100 MB stored bytes per owner, and no OCR/AI/public file sharing in the upload slice.
- Updated `spec/tasks/document-upload-scope-decision.md` to record that real upload is required for the next MVP validation pass, but implementation must wait for human approval of ADR 0025.
- External reference checked from official Supabase docs on 2026-06-13: Free plan storage size is 1 GB, egress quota is 5 GB, Free project max file size is 50 MB, bucket-level MIME and file-size restrictions are supported, Storage uses RLS policies on `storage.objects`, and standard uploads are recommended for small files below 6 MB.
- Validation passed: `git diff --check`. No tests were run because this was documentation/ADR/task planning work only.
- Approval state: ADR 0025 was accepted by the human on 2026-06-14. No database migration, bucket creation, route behavior, UI behavior, release, deployment, merge, production-readiness state, or roadmap phase changed.
- Used `forge-architect` on 2026-06-13 to define the audit-log versus product-event boundary for the current MVP.
- Added draft ADR `spec/architecture-records/0024-separate-audit-logs-from-product-events.md`.
- Draft decision: keep `public.audit_logs` as the source of truth for sensitive-action evidence and do not overload it as an analytics stream; keep product events as a separate server-side instrumentation concept and add a future `product_events` table or external analytics sink only when validation traffic requires durable product analytics.
- The draft ADR names initial audit actions and product-event names, records consent boundaries, forbids raw medical notes/document contents/tokens/secrets in event metadata, and requires focused validation for audit writes, authorization, payload safety, consent gating, and RLS preservation.
- Validation passed: `git diff --check`. No tests were run because this was a documentation/ADR draft only.
- Approval state: ADR 0024 was accepted by the human on 2026-06-14. No product scope, roadmap phase, database schema, route behavior, release, deployment, merge, or production-readiness state changed.
- Used `forge-architect` on 2026-06-13 to review the current repo architecture against `spec/product-context.md`, `spec/roadmap.md`, existing ADRs, `spec/architecture/mvp-target-architecture.md`, current tasks, package boundaries, web feature server helpers, and Supabase migrations.
- Added exploratory architecture note `spec/architecture/current-architecture-gap-assessment-2026-06-13.md`.
- Assessment finding: the accepted stack/platform ADRs remain sufficient; missing architecture is mainly operational and lifecycle detail around document upload/storage authorization, account export/deletion lifecycle, current-pet versus multi-pet semantics, feature-local helper graduation rules, audit coverage, share-link access logging/abuse posture, authenticated product-event instrumentation, local auth/OAuth validation strategy, live RLS fixture isolation, future mobile API boundary, background job triggers, and production readiness playbooks.
- Recommended next architecture actions: decide document upload scope first; define account export/deletion lifecycle before broader health-record validation; clarify one-pet versus active-pet semantics; reconcile audit/product-event coverage against ADRs 0014 and 0019; record shared-package graduation rules before feature-local server logic drifts.
- Validation passed: `git diff --check`. No tests were run because this was documentation/architecture assessment only.
- Approval state: no ADR was created or accepted; no product scope, roadmap phase, implementation behavior, release, deployment, merge, or production-readiness state changed.
- Planned and implemented `spec/tasks/mvp-readiness-baseline-and-script.md` on branch `codex/mvp-readiness-baseline-script`.
- Added reusable next-pass validation checklist `spec/validation/mvp-next-pass-validation-script.md`.
- The script separates seeded-owner baseline checks from new-owner activation checks, references `spec/design/visual-artifacts/mvp/*.png` for mockup-fidelity review, and lists the seven recovery task gates that must be resolved or waived before broader MVP readiness can be claimed.
- Linked the validation script from `spec/features/mvp-validation-readiness-recovery.md` and updated the task verification notes.
- Evaluated `spec/tasks/mvp-readiness-baseline-and-script.md` with `forge-evaluator` on 2026-06-13. Verdict: Pass. Artifact: `spec/validation/mvp-readiness-baseline-and-script-evaluation.md`.
- Validation passed: `git diff --check`; manual review confirmed the script references the historical readiness artifact, recovery feature brief, seven recovery tasks, and MVP mockups without adding product behavior, release approval, deployment approval, merge approval, or roadmap movement.
- Published draft PR https://github.com/maciejgos/caniello/pull/30 from `codex/mvp-readiness-baseline-script` to `mvp-implementation` on 2026-06-13. The branch includes task commit `9f59760` plus this publish-record handoff update. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or roadmap scope moved.
- Human accepted all artifacts for `spec/tasks/mvp-readiness-baseline-and-script.md` on 2026-06-13 by replying "Accept all artifacts." This acceptance applies to the task artifacts and does not approve release, deployment, merge, production use, roadmap movement, recovery-task completion, or the future broader MVP readiness decision.
- Evaluated Caniello MVP validation readiness on 2026-06-13 from clean `mvp-implementation` at `539c483`, matching `origin/mvp-implementation`.
- GitHub state checked outside the sandbox after sandbox network failure: no open PRs target `mvp-implementation`; PRs #21 through #29 are merged into `mvp-implementation`; `git fetch --all --prune` refreshed refs and pruned the merged feature branches from `origin`.
- Automated validation passed: `pnpm --filter web test`; approved outside-sandbox reruns of `pnpm --filter web lint`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` after sandbox `fetch failed`; `pnpm test:e2e` passed 18/18 across desktop and mobile Chromium.
- Local Supabase validation passed: `docker ps` showed the Caniello Supabase stack healthy; approved outside-sandbox `SUPABASE_TELEMETRY_DISABLED=1 supabase status --workdir infra` passed; approved outside-sandbox `SUPABASE_TELEMETRY_DISABLED=1 supabase db push --local --workdir infra` reported the local database is up to date; approved outside-sandbox opt-in live RLS tests passed 5/5 for profile, reminders, documents, timeline events, and account settings.
- Live in-app Browser validation used seeded owner `akowalska@example.com` and confirmed login, app shell, saved Bruno profile read/save, reminder create/complete, document metadata create, timeline event create/edit, care card preview, share link create/public view/revoke, account settings profile save and data export request, mobile 390x900 no-overflow smoke, zero browser console errors, and dev-server 200/201 responses through the flow.
- Readiness artifact findings: no P0/P1 blockers; P2 public share page Polish copy lacks diacritics in `apps/web/app/share/[token]/page.tsx`; P3 committed e2e lacks a full signed-in owner-flow test; P3 live RLS tests mutate seeded Anna/Bruno demo rows; P3 `./scripts/start.sh` can report Docker unreachable inside the sandbox even when containers are healthy.
- Recommended follow-up tasks: fix public share page Polish diacritics and add coverage; add committed signed-in Playwright e2e for the core owner path; harden RLS tests to avoid or clean seeded demo-row mutations; document or adjust local-dev startup checks for Codex sandbox runs.
- Human accepted `spec/validation/mvp-validation-readiness-2026-06-13.md` on 2026-06-13 by replying "Accepted". This acceptance applies to the MVP validation readiness artifact and yes/no decision only; it does not approve release, deployment, merge, production launch, roadmap movement, or implementation of follow-up tasks.
- Human then reported manual validation findings on 2026-06-13: dashboard remains Bruno-specific and does not change with pet; `Panel Bruno` versus first-launch flow is confusing; active-pet menu is static; profile flow suggests one-pet only; species/gender choices are not clear dropdowns; document safe lacks upload; timeline/reminder relationship is unclear; panel does not match `spec/design/visual-artifacts/mvp/*.png`; Apple/Google sign-in buttons do not work; account deletion request may not persist to the intended table; local confirmation email is not sent so new-account login cannot be completed.
- Timeline implementation note from human on 2026-06-13: align to `spec/design/visual-artifacts/mvp/image 10.png` by keeping the main Timeline page as chronological historical/completed care events and showing upcoming reminders/actions on the right side in a `Next Upcoming` panel that links into the Reminders flow.
- The readiness artifact was amended with these manual findings. Current interpretation: seeded-owner internal validation is supported, but broader new-owner/OAuth/upload/multi-pet/mockup-fidelity validation is not ready without follow-up work or explicit scope waivers.
- Used `forge-shaper` and `forge-planner` on 2026-06-13 to prepare the MVP validation recovery work. Added feature brief `spec/features/mvp-validation-readiness-recovery.md`, seven task files under `spec/tasks/`, and roadmap evidence under `Now - MVP Foundation`. This planning update does not approve implementation, release, deployment, merge, roadmap movement, auth provider changes, file upload/storage, database changes, or account lifecycle changes.
- Human clarified on 2026-06-13 that implementation should follow the supplied MVP mockups 1:1. The feature brief, roadmap evidence, and UI-touching task files were updated to treat `spec/design/visual-artifacts/mvp/*.png` as the visible UI source of truth, with explicit human approval required for intentional deviations.
- Planned and implemented `spec/tasks/align-mvp-non-goals.md` on branch `codex/align-mvp-non-goals`.
- Updated `README.md` so the initial-product non-goals and workflow guardrails mirror the fuller exclusions in `spec/product-context.md`, including payments-first monetization, broad clinic or partner workflow ownership, treatment recommendations, veterinary decision-making, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload boundaries.
- Updated `spec/roadmap.md` `Not Now` scope with the same fuller exclusions while preserving existing Now/Next/Later headings, outcomes, success signals, and allowed scope.
- Evaluated `spec/tasks/align-mvp-non-goals.md` with `forge-evaluator` on 2026-06-13. Verdict: Pass. Artifact: `spec/validation/align-mvp-non-goals-evaluation.md`.
- Published draft PR https://github.com/maciejgos/caniello/pull/29 from `codex/align-mvp-non-goals` to `mvp-implementation` on 2026-06-13. The branch includes task commit `99bf632` plus this publish-record handoff update as a separate metadata commit. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or roadmap scope moved.
- Validation passed: `git diff --check`; targeted non-goal vocabulary review across `README.md`, `spec/roadmap.md`, and `spec/product-context.md`; manual diff review confirmed no product behavior, phase movement, ADR, release, deployment, merge, or human approval state changes.
- The implementation intentionally added no product feature behavior, migrations, route handlers, shared contracts, UI changes, database changes, external service changes, ADR, release, deployment, merge, human acceptance, or roadmap movement.
- Planned and implemented `spec/tasks/care-timeline-foundation.md` on branch `codex/care-timeline-foundation`.
- Added shared timeline event contracts in `packages/contracts` for manual owner-provided timeline payloads and API responses.
- Added authenticated `/api/timeline-events` plus feature-local server helpers under `apps/web/features/account/server/timeline-events.ts` for reading, creating, and updating timeline events for the current owner's first saved pet.
- Replaced the inert Timeline placeholder with `CareTimelineSection`, a localized owner-only Timeline surface for manual event list/create/edit behavior, no-pet state, empty state, validation errors, disabled automation controls, and medical/privacy boundary copy.
- Added focused contract/server/route/UI tests and an opt-in live RLS test proving a second owner can manage their own timeline event but cannot read, update, or insert timeline events for Anna/Bruno.
- Evaluated `spec/tasks/care-timeline-foundation.md` with `forge-evaluator` on 2026-06-12. Verdict: Pass. Artifact: `spec/validation/care-timeline-foundation-evaluation.md`.
- Published draft PR https://github.com/maciejgos/caniello/pull/28 from `codex/care-timeline-foundation` to `mvp-implementation` on 2026-06-12. The branch includes task commit `be67361`; this publish-record handoff update follows as a separate metadata commit. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or roadmap scope moved.
- Validation passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/timeline-events.test.ts apps/web/app/api/timeline-events/route.test.ts`; `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`; `pnpm --filter web test`; web/contracts TypeScript checks; `git diff --check`; approved outside-sandbox `pnpm test`; approved outside-sandbox `pnpm --filter web lint`; approved outside-sandbox `pnpm build`; approved outside-sandbox opt-in live timeline RLS test; and in-app Browser desktop/mobile smoke.
- Sandbox notes: sandboxed `pnpm test`, `pnpm --filter web lint`, and `pnpm build` failed with `fetch failed`; approved outside-sandbox reruns passed. Sandboxed live RLS failed on localhost `EPERM`; approved outside-sandbox rerun passed.
- Browser smoke used seeded local owner `akowalska@example.com` and confirmed login, Timeline navigation, manual event create, manual event edit, disabled automation control, zero console errors, and zero horizontal overflow at default desktop width and 390x900 mobile.
- The implementation intentionally added no migrations, automatic document/reminder/AI timeline events, deletion, attachment picker, document linking UI, reminder generation, notification delivery, calendar sync, sharing changes, PDF export, clinic/provider workflow, marketplace, booking, payments, mobile app work, release, deployment, merge, acceptance, or roadmap movement.
- Planned and implemented `spec/tasks/account-privacy-settings-foundation.md` on branch `codex/account-privacy-settings-foundation`.
- Added shared account settings API response contracts in `packages/contracts` for account profile, latest consent event, latest data export request, and latest account deletion request snapshots.
- Added authenticated `/api/account/settings` plus feature-local server helpers under `apps/web/features/account/server/account-settings.ts` for reading owner settings, updating account profile language/display name, recording consent events, and creating queued data export/account deletion request records.
- Replaced the inert Settings placeholder with `AccountSettingsSection`, a localized owner-only Settings surface for profile, language, consent, data export request, and account deletion request foundations.
- Account deletion request UI requires `DELETE` before enabling the request action. Export and deletion copy explicitly says requests are recorded for follow-up and do not generate files, download links, emails, automatic account deletion, or cascade cleanup.
- Added focused contract/server/route/UI tests and an opt-in live RLS test proving a second owner can manage their own account privacy records but cannot read, update, or insert records for Anna's owner account.
- Evaluated `spec/tasks/account-privacy-settings-foundation.md` with `forge-evaluator` on 2026-06-12. Verdict: Pass. Artifact: `spec/validation/account-privacy-settings-foundation-evaluation.md`.
- Published draft PR https://github.com/maciejgos/caniello/pull/27 from `codex/account-privacy-settings-foundation` to `mvp-implementation` on 2026-06-12. The branch includes task commit `0c73267`; this publish-record handoff update follows as a separate metadata commit. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or roadmap scope moved.
- Validation passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/account-settings.test.ts apps/web/app/api/account/settings/route.test.ts`; `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`; `pnpm --filter web test`; `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`; `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`; `git diff --check`; approved outside-sandbox `pnpm test`; approved outside-sandbox `pnpm --filter web lint`; approved outside-sandbox `pnpm build`; approved outside-sandbox opt-in live account settings RLS test; and in-app Browser desktop/mobile smoke.
- Sandbox notes: sandboxed `pnpm test`, `pnpm --filter web lint`, and `pnpm build` failed with `fetch failed`; approved outside-sandbox reruns passed. Sandboxed live RLS failed on localhost `EPERM`; approved outside-sandbox rerun passed.
- Browser smoke used seeded local owner `akowalska@example.com` and confirmed login, Settings navigation, visible `Konto, zgody i dane` heading, disabled account deletion request button before `DELETE`, zero console errors, and zero horizontal overflow at default desktop width and 390x900 mobile.
- The implementation intentionally added no actual account deletion, user deletion, cascade cleanup, data export file generation, download links, email delivery, background jobs, notification preferences, billing, family roles, caregiver permissions, advanced household permissions, external privacy tooling, clinic/provider workflow, marketplace, booking, payments, AI diagnosis, treatment advice, emergency advice, official EU pet passport replacement claims, release, deployment, merge, acceptance, or roadmap movement.
- Planned and implemented `spec/tasks/care-card-share-link-foundation.md` on branch `codex/care-card-share-link-foundation`.
- Added shared share-link API response contracts in `packages/contracts`.
- Added server-only share-link helpers under `apps/web/features/account/server/share-links.ts` using opaque random tokens, SHA-256 token hashes, owner-scoped create/list/revoke behavior through existing RLS, and service-role public token resolution for read-only shared care cards.
- Added `/api/share-links` for authenticated owner create/list/revoke, and public `/share/[token]` for bounded read-only pet profile, active upcoming reminders, and recent document metadata.
- Updated the authenticated Sharing care-card preview to create an expiring share link, show the raw URL only immediately after creation, show active-link status on reload without recovering the token, revoke the active link, and keep PDF export disabled.
- Added focused server, route, and AccountApp coverage for token hashing, public resolution, unauthenticated API rejection, UI create/revoke states, and preserved shell behavior.
- Evaluated `spec/tasks/care-card-share-link-foundation.md` with `forge-evaluator` on 2026-06-11. Verdict: Pass. Artifact: `spec/validation/care-card-share-link-foundation-evaluation.md`.
- Published draft PR https://github.com/maciejgos/caniello/pull/26 from `codex/care-card-share-link-foundation` to `mvp-implementation` on 2026-06-11. The branch includes task commit `02b07c9`; this handoff publish-record update follows as a separate metadata commit. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or roadmap scope moved.
- Validation passed: `./node_modules/.bin/vitest run apps/web/features/account/server/share-links.test.ts apps/web/app/api/share-links/route.test.ts`; `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`; `pnpm --filter web test`; `pnpm test` outside sandbox after sandbox fetch failure; web/contracts/db TypeScript checks; `pnpm --filter web lint` outside sandbox after sandbox fetch failure; `pnpm build` outside sandbox after sandbox fetch failure; `git diff --check`; outside-sandbox Playwright desktop/mobile smoke for `/share/not-a-real-token` and protected `/app` redirect; and 2026-06-12 outside-sandbox authenticated local Supabase smoke using seeded owner `akowalska@example.com`.
- Local Supabase retest on 2026-06-12 found and fixed two live-only issues: public `/share/[token]` now awaits Next.js 16 route params before reading `token`, and `/api/share-links` now uses the request `Origin` header when building owner-visible share URLs so local creation returns `http://localhost:3000/share/...` instead of `http://0.0.0.0:3000/share/...`.
- Seeded local Supabase authenticated browser smoke now passes: login, Sharing navigation, create localhost share URL, public page renders Bruno with Rabies vaccine and Rabies certificate, revoke link, same public URL becomes unavailable, no console/page errors, and zero app/public horizontal overflow.
- The implementation intentionally added no PDF generation, file downloads, Supabase Storage writes, caregiver accounts, invitations, household permission changes, role management, document file sharing, OCR, AI, provider workflows, booking, payments, marketplace, mobile app work, release, deployment, merge, or roadmap movement.
- Planned and implemented `spec/tasks/care-card-preview-foundation.md` on branch `codex/care-card-preview-foundation`.
- Replaced the inert Sharing placeholder with `CareCardPreviewSection`, an authenticated owner-only care card preview that reads existing `/api/pets/profile`, `/api/reminders`, and `/api/documents` data and shows pet identity, microchip, allergies, medication, important notes, active upcoming reminders, and recent document metadata.
- Added Polish and English care card copy for owner-only/private preview, missing values, no-pet state, disabled share-link/PDF actions, and medical/official-passport boundaries.
- Added focused `AccountApp` coverage for API-backed care card display, no-pet routing back to Pets, disabled unavailable actions, language switching, and preserved shell behavior.
- The implementation intentionally added no public share route, share token, revocation, expiry, access logging, invitation, caregiver permission, PDF export, storage write, migration, new API route, AI, notification delivery, clinic/provider workflow, booking, payment, marketplace, mobile work, release, deployment, or roadmap movement.
- Evaluated `spec/tasks/care-card-preview-foundation.md` with `forge-evaluator` on 2026-06-11. Verdict: Pass. Artifact: `spec/validation/care-card-preview-foundation-evaluation.md`.
- Authenticated Playwright smoke used seeded local owner `akowalska@example.com` and confirmed login, Sharing navigation, care card preview, disabled share-link and PDF actions, Polish/English safety and official-passport boundary copy, no console/page errors, and zero horizontal overflow at 1440x1000 desktop and 390x900 mobile.
- Published draft PR https://github.com/maciejgos/caniello/pull/25 from `codex/care-card-preview-foundation` to `mvp-implementation` on 2026-06-11. The branch includes task commit `407727e` plus this publish-record handoff update. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or roadmap scope moved.
- Planned and implemented `spec/tasks/document-vault-foundation.md` on branch `codex/document-vault-foundation`.
- Added forward migration `infra/supabase/migrations/20260607100000_extend_document_metadata_fields.sql` extending `public.documents` with metadata columns, `metadata_only` status, document type constraint, and pet/date index while preserving existing owner-owned RLS policy behavior.
- Added shared document metadata contracts in `packages/contracts`, feature-local document server helpers under `apps/web/features/account/server/documents.ts`, `/api/documents`, and a real authenticated Documents section with localized list/form behavior, edit flow, no-pet state, disabled upload/OCR placeholder, metadata-only copy, and medical-boundary copy.
- Added focused contract, API unauthenticated, server helper, UI, and opt-in live RLS tests for document metadata.
- Added local seed document metadata for Bruno in `infra/supabase/seed.sql`.
- Document implementation intentionally added no file upload, scan, camera capture, storage bucket writes, signed URLs, file preview, file download, file deletion, OCR, extraction, classification, AI processing, generated summaries, document-processing jobs, extracted-field review, automatic timeline events, automatic reminders, sharing links, PDF export, caregiver permissions, clinic/provider workflow, booking, payments, marketplace, mobile app work, release, deployment, or roadmap movement.
- Evaluated `spec/tasks/document-vault-foundation.md` with `forge-evaluator` on 2026-06-07. Verdict: Pass. Artifact: `spec/validation/document-vault-foundation-evaluation.md`.
- Browser smoke used seeded local owner `akowalska@example.com` and confirmed login, Documents navigation, metadata create, metadata edit, reload persistence, disabled upload placeholder, metadata-only and medical-boundary copy, no console errors, and zero horizontal overflow at 1440x1000 desktop and 390x900 mobile.
- Published draft PR https://github.com/maciejgos/caniello/pull/24 from `codex/document-vault-foundation` to `mvp-implementation` on 2026-06-07. The branch includes commit `af6ed29` plus this publish-record handoff update. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or roadmap scope moved.
- Human accepted the evaluated document vault foundation work on 2026-06-07. This acceptance does not merge, release, deploy, or move roadmap scope.
- The active harness is being simplified around `spec/roadmap.md`, `spec/features/`, `spec/tasks/`, and the Forge skills.
- Planned `spec/tasks/care-reminder-foundation.md` with `forge-planner` on 2026-06-06 using `spec/design/visual-artifacts/mvp/image 9.png` as the reminder-screen visual reference. The task is scoped to real owner-owned reminder list/create/edit/complete behavior for the first pet, with notification delivery, recurrence, snooze, preferences, document automation, AI, sharing, and calendar sync explicitly out of scope.
- Implemented `spec/tasks/care-reminder-foundation.md` on branch `codex/care-reminder-foundation` after human approval on 2026-06-06.
- Added forward migration `infra/supabase/migrations/20260606110000_extend_care_reminder_fields.sql` to extend `public.reminders` with `reminder_type`, `notes`, and a pet/due-date index without changing existing household-owned RLS policies.
- Added shared reminder contracts in `packages/contracts`, feature-local reminder server helpers under `apps/web/features/account/server/reminders.ts`, `/api/reminders`, and a real authenticated Reminders section with localized list filters, create/edit form, completion flow, first-pet-required state, and disabled/deferred notification preferences.
- Added local seed reminders for Bruno in `infra/supabase/seed.sql`.
- Reminder implementation intentionally added no email, push, SMS, in-app notification delivery, digest, test notification, recurrence engine, snooze behavior, calendar sync, automatic document/AI/timeline reminder creation, document upload/OCR, AI answers, sharing, clinic/provider workflow, booking, payment, marketplace, mobile app work, release, deployment, or roadmap movement.
- Evaluated `spec/tasks/care-reminder-foundation.md` with `forge-evaluator` on 2026-06-06. Initial verdict: Pass with gaps. Artifact: `spec/validation/care-reminder-foundation-evaluation.md`.
- Evaluator reran focused contract/db/server tests, focused account UI tests, full web tests, contracts/db/web TypeScript checks, web lint outside sandbox after sandbox fetch failure, production build outside sandbox after sandbox fetch failure, local Supabase migration push/status outside sandbox after Docker socket sandbox denial, and focused authenticated desktop/mobile Playwright smoke.
- Focused Playwright smoke used seeded local owner `akowalska@example.com` and confirmed login, Reminders navigation, disabled notification controls, create reminder, edit reminder, mark complete, reload persistence after navigating back to Reminders, no console/page errors, and zero horizontal overflow.
- Implemented evaluator gap follow-up: added unauthenticated `/api/reminders` route tests for GET, POST, and PUT 401 responses before data access, and added opt-in live reminder RLS test proving a second owner can manage their own reminder but cannot read, update, or insert reminders for Anna/Bruno.
- Gap follow-up validation passed: default focused route/server/RLS test path, web TypeScript check, full web test suite, focused contracts/db/server tests, `git diff --check`, and opt-in live reminder RLS test outside sandbox after sandbox localhost denial.
- Updated evaluator artifact verdict to Pass after the gap follow-up.
- Fresh final evaluator rerun on 2026-06-06 confirmed verdict remains Pass: focused route/server/RLS default tests, full web test suite, web TypeScript check, focused contracts/db/server tests, `git diff --check`, and opt-in live reminder RLS test outside sandbox all passed.
- Human accepted the evaluated care reminder foundation work on 2026-06-06 and requested `forge-handoff` followed by `forge-publisher`. This acceptance does not merge, release, deploy, or move roadmap scope.
- Published draft PR https://github.com/maciejgos/caniello/pull/23 from `codex/care-reminder-foundation` to `mvp-implementation` on 2026-06-06. The branch includes task commit `29f53cf` plus this publish-record handoff update. The PR is draft only and does not mark the task merged, released, deployed, or roadmap scope moved.
- Review follow-up on 2026-06-06 fixed the Reminders screen to use the actual returned first-pet name in the page title and empty-state copy instead of hardcoded Bruno text. `forge-evaluator` rerun verdict: Pass. Validation passed: focused `AccountApp.test.tsx`, web TypeScript check, full web test suite, web lint outside sandbox after sandbox fetch failure, `git diff --check`, and approved outside-sandbox Playwright smoke for Reminders rendering with no console/page errors or horizontal overflow.
- Historical Flow Forge material is archived under `.codex/flow-forge-reference/` and remains available as reference.
- Durable product context now lives in `spec/product-context.md`.
- Old Flow Forge-era spec artifacts were archived under `spec/archive/flow-forge-history/` instead of deleted.
- Active guidance now points normal work to `spec/product-context.md`, `spec/roadmap.md`, lightweight feature briefs, task files, architecture notes or ADRs, validation, and handoff.
- Created feature brief `spec/features/authenticated-app-dashboard-skeleton.md` for the post-auth app dashboard and onboarding skeleton.
- Created task candidates:
  - `spec/tasks/authenticated-app-shell-navigation.md`
  - `spec/tasks/first-run-onboarding-skeleton.md`
  - `spec/tasks/home-dashboard-skeleton.md`
  - `spec/tasks/app-section-empty-states.md`
  - `spec/tasks/dashboard-skeleton-validation.md`
- Refined `spec/tasks/authenticated-app-shell-navigation.md` for implementation as a narrow authenticated shell/navigation task only: no dashboard cards, persistence, real search, real notifications, live assistant behavior, or sharing behavior.
- Created `forge-publisher` as the optional post-validation publishing skill for commit, push, and draft PR creation.
- Updated `AGENTS.md`, `README.md`, and `spec/README.md` so the lightweight Forge flow ends with optional publishing after handoff.
- Added matching `agents/openai.yaml` UI metadata for all active Forge skills so `forge-publisher` is consistent with the rest of the skill set.
- Implemented `spec/tasks/authenticated-app-shell-navigation.md` in `apps/web/features/account/AccountApp.tsx` and `apps/web/features/account/content.ts`: signed-in `/app` now renders a localized shell with desktop side navigation, mobile horizontal fallback navigation, active Home state, inert search/pet/notification/account affordances, existing logout behavior, and a minimal non-card main content region. No dashboard cards, onboarding, persistence, live search, notifications, AI, sharing, or section routes were added.
- Added focused `AccountApp` coverage for authenticated shell labels, active Home navigation, protected-route behavior, and logout/session behavior.
- Published draft PR https://github.com/maciejgos/caniello/pull/13 from `codex/authenticated-app-shell-navigation` to `codex/shape-app-dashboard-skeleton`. The branch includes commit `e32f571` for the app-shell task and intentionally excludes the unrelated local weekly-reporter commit that remained on `codex/shape-app-dashboard-skeleton`.
- Roadmap review on 2026-05-24 found the active roadmap and candidate dashboard tasks broadly aligned with MVP Foundation. The main stale item was the handoff labeling the completed app-shell task as active. Recommended but unapproved editorial follow-up: tighten `spec/roadmap.md` and `README.md` non-goal wording so it mirrors `spec/product-context.md` more completely for treatment recommendations, veterinary decision-making, broad clinic or partner workflow ownership, advanced household permissions, and advanced analytics/referral/calendar/partner-upload work.
- Updated `.codex/skills/forge-evaluator/SKILL.md` so evaluations must create or update a focused `spec/validation/<task-slug>-evaluation.md` artifact, link it from task verification notes when applicable, and include the artifact path in the final response. This is a workflow-harness change, not product-scope work.
- Refined and implemented `spec/tasks/first-run-onboarding-skeleton.md`.
- Signed-in `/app` now replaces the protected placeholder body with a localized first-run onboarding skeleton inside the existing authenticated shell.
- The onboarding surface includes a three-step setup path, a non-persistent add-pet form skeleton, disabled first-document upload/scan affordances, and disabled reminder/Ask Caniello preview actions.
- The implementation intentionally added no pet persistence, Supabase writes, migrations, upload/storage behavior, OCR/extraction, live reminders, AI answers, share links, new section routes, or mobile app work.
- Evaluated `spec/tasks/first-run-onboarding-skeleton.md` with `forge-evaluator`. Fresh verdict: Pass. Artifact: `spec/validation/first-run-onboarding-skeleton-evaluation.md`.
- Browser validation used a Playwright fallback because the in-app browser reported `Browser is not available: iab`.
- Review feedback on the first-run onboarding implementation found that the UI work over-concentrated responsibilities in `apps/web/features/account/AccountApp.tsx`.
- Follow-up implementation reshaped the first-run onboarding surface to more closely match `spec/design/visual-artifacts/mvp/image 6.png`: welcome header, horizontal three-step strip, add-pet panel, document extraction/review preview panel, pet imagery, and bottom Caniello tip band.
- Extracted the first-run onboarding UI to `apps/web/features/account/components/FirstRunOnboarding.tsx`, leaving `AccountApp.tsx` to compose the authenticated shell and feature-local onboarding component.
- Forge refactor pass extracted onboarding SVG rendering to `apps/web/features/account/components/OnboardingIcon.tsx`, keeping `FirstRunOnboarding.tsx` focused on screen structure and panel composition.
- Follow-up Forge refactor split authenticated Home/Dashboard UI into feature-local components: `AuthenticatedAppShell`, `AppTopBar`, `AppSidebar`, `AppHomeDashboard`, `SetupStepper`, `PetSetupPanel`, `DocumentSetupPanel`, `CanielloTip`, `OnboardingField`, `AppIcon`, and `OnboardingIcon`.
- Updated `.codex/skills/forge-implementer/SKILL.md` so future React/Next.js implementation must choose feature-local component boundaries before coding and review touched TSX files for component structure before validation.
- Updated accepted ADR `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md` to clarify that KISS does not mean large monolithic TSX files; route/page components should stay thin and distinct UI regions should be extracted into feature-local components.
- Created `.codex/skills/forge-refactor/` as a new active Forge skill for ADR 0011 codebase review and narrowly scoped behavior-preserving refactors.
- Handoff refreshed on 2026-05-25 with current branch, dirty worktree, validation status, known gaps, and next recommended actions. No human acceptance, release, merge, or roadmap scope move has been recorded.
- Published draft PR https://github.com/maciejgos/caniello/pull/18 from `codex/first-run-onboarding-skeleton` to `mvp-implementation`. The branch includes onboarding commit `fd89a9e` plus earlier Forge refactor/component-boundary guidance commits `9577868` and `764b7e5`. The PR is draft only and does not mark the task accepted, approved, merged, released, or complete.
- Roadmap review on 2026-06-01 found `spec/product-context.md`, `spec/roadmap.md`, and root `ROADMAP.md` still broadly aligned around MVP Foundation. The active and candidate dashboard tasks remain acceptable as `Now` work only while they stay skeleton-only and avoid persistence, live uploads, live AI, real sharing, clinic/provider workflow ownership, booking, payments, marketplace mechanics, and official passport replacement claims.
- Roadmap review drift findings on 2026-06-01:
  - `README.md` still has a shorter out-of-scope list than `spec/product-context.md`; it omits some stronger boundaries around treatment recommendations, veterinary decision-making, broad clinic or partner workflow ownership, advanced household permissions, advanced analytics/referrals/calendar sync, and partner document-upload flows.
  - `spec/roadmap.md` also summarizes `Not Now` more narrowly than `spec/product-context.md`, especially for treatment recommendations, veterinary decision-making, broad partner workflow ownership, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload flows.
  - `spec/handoff.md` had stale branch and dirty-worktree notes from the first-run onboarding publish record; this review refreshed the current branch and dirty-worktree note.
  - `spec/tasks/home-dashboard-skeleton.md` includes Ask Caniello preview and sharing prompt in `Now`; this is acceptable only as inert, safety-worded skeleton/demo UI. Any live AI answer, share-link generation, caregiver access model, export behavior, or record-grounded assistant behavior requires a dedicated approved task and likely roadmap/human approval depending on scope.
  - `spec/tasks/app-section-empty-states.md` includes Ask Caniello and Sharing sections in `Now`; this remains acceptable only for placeholder navigation and empty-state copy with no real AI, sharing permissions, PDF export, caregiver access, or provider workflow.
- Recommended roadmap/doc updates from the 2026-06-01 review, not approved as product-direction changes: tighten `README.md` and `spec/roadmap.md` non-goal wording so they mirror `spec/product-context.md`; add a short warning to future dashboard tasks that demo data must not imply saved records or backend capability; keep the next implementation task to exactly one pending task file.
- Refined `spec/tasks/home-dashboard-skeleton.md` before implementation to clarify skeleton-only boundaries, static demo data, disabled unavailable actions, assistant/sharing safety wording, and Polish/English coverage.
- Implemented `spec/tasks/home-dashboard-skeleton.md` in the authenticated `/app` home. The page now defaults to a returning-owner dashboard skeleton for Bruno with static preview cards, health summary, recent documents, care timeline, Ask Caniello preview, sharing preview, and Caniello tip.
- Preserved the first-run onboarding surface through a local, non-persistent mode switch in `AppHomeDashboard`. This switch is demo-only and does not read or write Supabase or local storage.
- Added `ReturningOwnerDashboard` as a feature-local component under `apps/web/features/account/components/` and kept dashboard copy in `apps/web/features/account/content.ts`.
- Updated `AccountApp` tests to cover returning-owner dashboard copy, demo/preview state, disabled unavailable dashboard actions, Polish/English switching, first-run onboarding preservation, and existing authenticated shell/logout behavior.
- The implementation intentionally added no pet persistence, demo-state persistence, Supabase writes, migrations, API routes, upload/storage/OCR, live reminders, AI calls, real sharing, PDF export, notification delivery, calendar sync, clinic/provider workflow, marketplace, booking, payment, or official passport replacement behavior.
- Evaluated `spec/tasks/home-dashboard-skeleton.md` with `forge-evaluator`. Fresh verdict: Pass. Artifact: `spec/validation/home-dashboard-skeleton-evaluation.md`.
- Authenticated Playwright smoke passed outside the sandbox using seeded local account `akowalska@example.com`; confirmed login flow, returning-owner dashboard content, disabled preview actions, Polish/English switching, first-run onboarding preservation, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- Refreshed this handoff on 2026-06-02 after evaluation. Product/roadmap review still classifies the skeleton-only dashboard work as `Now - MVP Foundation`; live AI, real sharing, persistence, uploads, clinic/provider workflow, booking, payments, marketplace, and official passport replacement behavior remain out of scope without explicit human approval.
- Published draft PR https://github.com/maciejgos/caniello/pull/19 from `codex/home-dashboard-skeleton` to `mvp-implementation`. The branch includes task commit `2707216` plus publish-record handoff update after the PR was opened. The PR is draft only and does not mark the task accepted, approved, merged, released, or complete.
- Roadmap review on 2026-06-04 found `spec/product-context.md`, `spec/roadmap.md`, root `ROADMAP.md`, and the current dashboard skeleton task set still aligned around `Now - MVP Foundation`.
- Roadmap review drift findings on 2026-06-04:
  - `README.md` and `spec/roadmap.md` still summarize non-goals more narrowly than `spec/product-context.md`, especially treatment recommendations, veterinary decision-making, broad clinic or partner workflow ownership, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload flows.
  - `spec/tasks/app-section-empty-states.md` remains acceptable as `Now` work only if implemented as inert section placeholders. Its non-goals should be tightened before implementation to explicitly exclude live AI, generated medical guidance, official passport replacement claims, real sharing/export/caregiver permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload flows.
  - `spec/tasks/dashboard-skeleton-validation.md` is aligned with `Now`; it should remain validation-only and must not become an implementation or release-approval task.
  - `spec/handoff.md` had stale current branch and dirty-worktree notes from the home-dashboard publish record; this review refreshed them.
- Recommended roadmap/doc updates from the 2026-06-04 review, not approved as product-direction changes: mirror the fuller `spec/product-context.md` non-goal wording in `README.md`, `spec/roadmap.md`, and the pending `app-section-empty-states` task before implementation; keep the next implementation to exactly one pending task file.
- Refined and implemented `spec/tasks/app-section-empty-states.md`.
- Signed-in `/app` navigation now selects local, inert section states for Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings while preserving Home dashboard and first-run onboarding behavior.
- Added `AppSectionEmptyState` as a feature-local component and kept empty-state copy in `apps/web/features/account/content.ts`.
- Empty-state actions are disabled or preview-only and safety copy explicitly avoids saved-record, upload, OCR, reminder, notification, AI, diagnosis, treatment, emergency, sharing-link, PDF, caregiver-permission, account data-rights, clinic, partner, marketplace, booking, payment, and official passport replacement claims.
- Implemented `spec/tasks/pet-profile-foundation.md` on branch `codex/pet-profile-foundation`.
- Added forward migration `infra/supabase/migrations/20260604090000_extend_pet_profile_fields.sql` extending `public.pets` with sex or gender, weight, microchip number, allergies, medication, and important notes while preserving existing household-owned RLS policies.
- Added shared pet profile Zod contracts and response shapes in `packages/contracts`.
- Added `/api/pets/profile` GET/PUT route and feature-local server helper using the existing Supabase route-client cookie pattern.
- Replaced the inert Pets section with an authenticated first-pet profile form and summary surface that reads, saves, and reloads saved pet profile values.
- Evaluated pet profile foundation with `forge-evaluator`. Fresh verdict: Pass with gaps. Artifact: `spec/validation/pet-profile-foundation-evaluation.md`.
- Implemented the evaluator-recommended follow-up: pet profile inputs and textareas are now disabled while the initial profile GET is loading or a save is in flight, preventing quick user input from being overwritten by the load response.
- Added a focused regression test that holds `/api/pets/profile` open and verifies pet profile fields plus the save button stay disabled until the load completes.
- Reran focused Playwright load-lock smoke outside the sandbox; it delayed the initial profile GET, confirmed fields were disabled during the pending load, then confirmed save/reload persistence, fresh mobile visibility, no console/page errors, and zero desktop/mobile horizontal overflow.
- Implemented the remaining two-owner/RLS gap as opt-in live Supabase test `apps/web/features/account/server/pet-profile.rls.test.ts`.
- The live RLS test creates a temporary second owner, proves that owner can manage their own household and pet, proves they cannot read or update Anna/Bruno's pet, proves they cannot insert into Anna's household, verifies Anna/Bruno's pet remains unchanged, and deletes the temporary owner.
- Fresh evaluator verdict after the RLS follow-up: Pass.
- Published draft PR https://github.com/maciejgos/caniello/pull/21 from `codex/pet-profile-foundation` to `mvp-implementation`. The branch includes task commit `663e8ea` plus this publish-record handoff update. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or complete.
- Addressed PR review feedback on `codex/pet-profile-foundation`: first-save owner household creation is now atomic at the database boundary. Forward migration `20260605150000_enforce_unique_owner_households.sql` adds `households_owner_user_id_unique` on `public.households(owner_user_id)`, and `findOrCreateOwnerHousehold` recovers from concurrent `23505` unique violations by re-reading the household created by the winning request.
- Added focused regression coverage for the migration constraint and the concurrent first-save fallback path.
- Resolved merge-conflict markers in the pet-profile server helper, pet-profile server tests, and handoff notes.
- Re-evaluated pet profile foundation after conflict cleanup. Initial verdict: `Pass with gaps` because migration readiness needed cleanup.
- Migration-history cleanup resolved the evaluator gap: the forward owner-household uniqueness migration is tracked, the duplicate historical baseline uniqueness edit was removed, and the baseline uniqueness assertion was removed from `packages/db/src/index.test.ts`. Focused contract/db/server tests and `git diff --check` passed after cleanup. Current evaluator verdict: `Pass`.
- Human approved the evaluated pet-profile foundation work on 2026-06-05. This approval does not merge, release, deploy, or move roadmap scope.
- Published PR #21 follow-up commit `676420d` (`Clean up pet profile migration follow-up`) to `origin/codex/pet-profile-foundation` and refreshed the PR body with the latest evaluator verdict, validation evidence, and scope notes. Human reported on 2026-06-06 that PR #21 has been merged.
- Roadmap review on 2026-06-05 found `spec/product-context.md`, `spec/roadmap.md`, root `ROADMAP.md`, and active task files still aligned around `Now - MVP Foundation`. Implemented skeleton tasks remain in scope because their AI, sharing, document, reminder, and settings surfaces are inert or preview-only. `spec/tasks/pet-profile-foundation.md` remains aligned with `Now` because it implements the durable first pet profile while explicitly excluding documents, reminders, AI, sharing, caregiver permissions, provider workflows, booking, payments, marketplace mechanics, and official passport replacement claims.
- Roadmap review drift findings on 2026-06-05:
  - `README.md` and `spec/roadmap.md` still summarize non-goals more narrowly than `spec/product-context.md`, especially treatment recommendations, veterinary decision-making, broad clinic or partner workflow ownership, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload flows.
  - `spec/tasks/dashboard-skeleton-validation.md` remains aligned with `Now` as validation-only work; it should not become implementation, release approval, or roadmap acceptance.
  - `spec/handoff.md` had stale current task and branch notes from the pet-profile publish record; this review refreshed them.
- Recommended roadmap/doc updates from the 2026-06-05 review, not approved as product-direction changes: mirror the fuller `spec/product-context.md` non-goal wording in `README.md` and `spec/roadmap.md`; keep the next implementation to exactly one pending task file unless a human maintainer explicitly requests broader planning.
- Implemented `spec/tasks/dashboard-skeleton-validation.md` on branch `codex/dashboard-skeleton-validation`.
- Created validation artifact `spec/validation/dashboard-skeleton-validation-evaluation.md` with verdict `Pass`.
- Validation confirmed focused account/pet tests, contracts/db tests, full web Vitest, web lint, production build, authenticated desktop/mobile browser smoke, pet profile save/reload persistence, Polish/English switching, disabled preview actions, safety copy, no console/page errors, and no horizontal overflow.
- Forge evaluator rerun on 2026-06-06 confirmed verdict `Pass` after reviewing source artifacts, changed files, roadmap scope, and focused reruns. It added source-artifact, changed-file, findings, and approval-caveat sections to the validation artifact.
- The validation intentionally added no product behavior, migrations, route handlers, shared contracts, packages, release approval, merge approval, deployment approval, or roadmap scope movement.
- Human accepted the dashboard skeleton validation documentation on 2026-06-06. This acceptance does not create a release, deployment, or roadmap scope change.
- Human reported on 2026-06-06 that all previously pending PRs are merged.
- Published draft PR https://github.com/maciejgos/caniello/pull/22 from `codex/dashboard-skeleton-validation` to `mvp-implementation` on 2026-06-06. The branch includes documentation commit `57f79fb` plus this publish-record handoff update. The PR is draft only and does not mark release, deployment, or roadmap scope movement.

## Current Dirty Worktree

- Clean after publish-record commit is pushed.
- No unrelated dirty files are currently known.

Previous publish note:

- `git status --short --untracked-files=all` was clean on `codex/authenticated-app-shell-navigation` after the draft PR was opened.

## Validation Status

Current MVP validation readiness evaluation:

- Fresh readiness artifact on 2026-06-13: `spec/validation/mvp-validation-readiness-2026-06-13.md`.
- Readiness decision: revised after manual validation. YES only for seeded-owner internal MVP validation; NO for broader new-owner or mockup-fidelity MVP validation until the P1/P2 manual gaps are resolved or explicitly waived.
- Evaluator verdict: Pass with gaps.
- Human decision: Accepted on 2026-06-13.
- Passed: clean branch/worktree check before artifact edits; `mvp-implementation` matched `origin/mvp-implementation` at `539c483`.
- Passed outside sandbox after network restriction: GitHub open PR check returned `[]`; merged PR check showed PRs #21 through #29 merged into `mvp-implementation`.
- Passed: `pnpm --filter web test`; 19 files passed, 5 opt-in files skipped, 105 tests passed, 5 skipped.
- Passed outside sandbox after sandbox `fetch failed`: `pnpm --filter web lint`, `pnpm test`, `pnpm build`, and `pnpm test:e2e`; e2e passed 18/18 desktop/mobile Chromium tests.
- Passed outside sandbox after sandbox Docker/localhost restrictions: Supabase status, local migration push, and opt-in live RLS suite; 5/5 RLS tests passed.
- Passed live in-app Browser smoke: seeded login, profile read/save, reminder create/complete, document metadata create, timeline create/edit, share link create/public view/revoke, settings profile save and data export request, mobile 390x900 no overflow, zero browser console errors, and dev-server 200/201 responses.
- Known gaps: local confirmation email missing blocks new-account login; Google/Apple sign-in buttons do not work; dashboard/app shell is Bruno-specific and unclear around first-run versus returning-owner flow; active-pet selector is static; first-pet versus multi-pet behavior is unclear; species/sex-or-gender controls are not expected dropdowns; document upload is missing; Timeline page should match `spec/design/visual-artifacts/mvp/image 10.png` by keeping history in the main timeline and upcoming reminders/actions in the right-side `Next Upcoming` panel; app panel does not match MVP mockup images; account deletion persistence needs live table verification; public share page Polish copy missing diacritics; committed e2e lacks full signed-in owner-flow automation; live RLS tests mutate seeded demo rows; `./scripts/start.sh` can falsely report Docker unreachable in the sandbox.
- Not validated: production deployment, PDF export, caregiver accounts/invitations/role changes, file upload/OCR, AI, notifications/recurrence, calendar sync, marketplace, booking, payments, clinic/provider workflows. These are out of scope unless a human-approved task changes scope.

Previous MVP non-goal alignment task:

- Fresh validation on 2026-06-13: `spec/validation/align-mvp-non-goals-evaluation.md` records evaluator verdict Pass.
- Passed: `git diff --check`.
- Passed: targeted `rg` review across `README.md`, `spec/roadmap.md`, and `spec/product-context.md` confirmed the aligned non-goal vocabulary.
- Passed: manual diff review confirmed no product behavior, roadmap phase movement, ADR status change, release state, deployment state, merge state, or human approval state changed.
- UI/browser validation was not applicable because this task changes only Markdown documentation.
- Full application tests were not run because no executable code, schemas, routes, UI, migrations, or package configuration changed.

Previous care timeline foundation task:

- Fresh validation on 2026-06-12: `spec/validation/care-timeline-foundation-evaluation.md` records evaluator verdict Pass.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/timeline-events.test.ts apps/web/app/api/timeline-events/route.test.ts`; 3 files and 31 tests passed.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`; 1 file and 16 tests passed, with the existing localStorage experimental warning.
- Passed: `pnpm --filter web test`; 19 files passed, 5 opt-in files skipped, 105 tests passed, 5 skipped, with existing localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `git diff --check`.
- Passed outside sandbox after sandbox fetch failure: `pnpm test`; 10 turbo tasks successful.
- Passed outside sandbox after sandbox fetch failure: `pnpm --filter web lint`.
- Passed outside sandbox after sandbox fetch failure: `pnpm build`; production build listed `/api/timeline-events`.
- Passed outside sandbox after sandbox localhost `EPERM`: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/timeline-events.rls.test.ts` from `apps/web`; 1 file and 1 test passed.
- In-app Browser smoke passed using seeded local owner `akowalska@example.com`: login, Timeline navigation, manual event create, manual event edit, disabled automation control, no console errors, and zero horizontal overflow at default desktop width and 390x900 mobile.
- `pnpm test:e2e` was not run; focused component/API/security tests and authenticated browser smoke covered the task acceptance criteria.

Previous account privacy settings foundation task:

- Fresh validation on 2026-06-12: `spec/validation/account-privacy-settings-foundation-evaluation.md` records evaluator verdict Pass.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/account-settings.test.ts apps/web/app/api/account/settings/route.test.ts`; 3 files and 25 tests passed.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`; 1 file and 15 tests passed, with the existing localStorage experimental warning.
- Passed: `pnpm --filter web test`; 17 files passed, 4 opt-in files skipped, 93 tests passed, 4 skipped, with existing localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `git diff --check`.
- Passed outside sandbox after sandbox fetch failure: `pnpm test`; 10 turbo tasks successful.
- Passed outside sandbox after sandbox fetch failure: `pnpm --filter web lint`.
- Passed outside sandbox after sandbox fetch failure: `pnpm build`; production build listed `/api/account/settings`.
- Passed outside sandbox after sandbox localhost `EPERM`: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/account-settings.rls.test.ts` from `apps/web`; 1 file and 1 test passed.
- In-app Browser smoke passed using seeded local owner `akowalska@example.com`: login, Settings navigation, visible account/consent/data-rights settings surface, deletion request button disabled without `DELETE`, no console errors, and zero horizontal overflow at default desktop width and 390x900 mobile.
- `pnpm test:e2e` was not run; focused component/API/security tests and authenticated browser smoke covered the task acceptance criteria.

Previous care card share link foundation task:

- Fresh validation on 2026-06-11: `spec/validation/care-card-share-link-foundation-evaluation.md` records evaluator verdict Pass.
- Passed: `./node_modules/.bin/vitest run apps/web/features/account/server/share-links.test.ts apps/web/app/api/share-links/route.test.ts`; 2 files and 7 tests passed.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`; 1 file and 14 tests passed, with the existing localStorage experimental warning.
- Passed: `pnpm --filter web test`; 15 files passed, 3 opt-in files skipped, 86 tests passed, 3 skipped, with existing localStorage experimental warnings.
- Passed outside sandbox after sandbox fetch failure: `pnpm test`; 10 turbo tasks successful.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- Passed outside sandbox after sandbox fetch failure: `pnpm --filter web lint`.
- Passed outside sandbox after sandbox fetch failure: `pnpm build`; production build listed `/api/share-links` and `/share/[token]`.
- Passed: `git diff --check`.
- Playwright browser smoke failed in the sandbox due to macOS Mach-port permissions; outside-sandbox desktop smoke passed for `/share/not-a-real-token` and protected `/app` redirect at 1440x1000 with no console/page errors and zero horizontal overflow.
- Outside-sandbox mobile Playwright smoke passed for `/share/not-a-real-token` at 390x900 with no console/page errors and zero horizontal overflow.
- Passed on 2026-06-12: seeded local Supabase authenticated browser smoke using `akowalska@example.com` created a localhost share URL, confirmed public Bruno care card content, revoked the link, confirmed the same URL became unavailable, found no console/page errors, and measured zero app/public horizontal overflow.

Current care card preview foundation task:

- Fresh validation on 2026-06-11: `spec/validation/care-card-preview-foundation-evaluation.md` records evaluator verdict Pass.
- Passed: `pnpm --filter web test -- AccountApp.test.tsx`; 1 file and 13 tests passed, with the existing localStorage experimental warning.
- Passed: `pnpm --filter web test`; 13 files passed, 3 opt-in files skipped, 78 tests passed, 3 skipped, with existing localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `git diff --check`.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.
- Sandboxed `./scripts/start.sh` could not access Docker; approved outside-sandbox rerun passed, applied migrations, seeded data, and synced env files.
- In-process Playwright browser smoke failed under the macOS sandbox with Mach-port permission denial; approved outside-sandbox Playwright smoke passed on desktop 1440x1000 and mobile 390x900 using seeded owner `akowalska@example.com`.
- Browser smoke confirmed login, Sharing navigation, care card preview, disabled share-link and PDF actions, Polish/English safety and official-passport boundary copy, no console/page errors, and zero horizontal overflow.
- `pnpm test:e2e` was not run; focused authenticated Playwright validation covered the task acceptance criteria.

Current document vault foundation task:

- Fresh validation on 2026-06-07: `spec/validation/document-vault-foundation-evaluation.md` records evaluator verdict Pass.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/documents.test.ts apps/web/app/api/documents/route.test.ts`; 3 files and 27 tests passed.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx documents.test.ts app/api/documents/route.test.ts` from `apps/web`; 3 files and 19 tests passed, with existing localStorage experimental warnings.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts apps/web/features/account/server/documents.test.ts apps/web/app/api/documents/route.test.ts`; 4 files and 41 tests passed.
- Passed: `pnpm --filter web test`; 13 files passed, 3 opt-in files skipped, 76 tests passed, 3 skipped, with existing localStorage experimental warnings.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- Passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Passed: `git diff --check`.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed and listed `/api/documents`.
- Sandboxed `supabase db push --local --workdir infra` and `supabase status --workdir infra` failed on Supabase CLI telemetry writes under `/Users/macg/.supabase`; approved outside-sandbox reruns applied `20260607100000_extend_document_metadata_fields.sql` and confirmed local Supabase is running.
- Sandboxed opt-in live document RLS test failed on localhost `EPERM`; approved outside-sandbox rerun passed: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/documents.rls.test.ts`.
- Started local web app with `pnpm --filter web dev` on `http://localhost:3000`.
- In-app Browser smoke passed using seeded local owner `akowalska@example.com`: login, Documents navigation, metadata create, metadata edit, reload persistence, disabled upload placeholder, metadata-only and medical-boundary copy, no console errors, and zero horizontal overflow at 1440x1000 desktop and 390x900 mobile.
- `pnpm test:e2e` was not run; focused authenticated Browser validation covered the task acceptance criteria.

Current dashboard skeleton validation task:

- Fresh validation on 2026-06-06: `spec/validation/dashboard-skeleton-validation-evaluation.md` records verdict Pass.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts` from repository root; 2 files and 26 tests passed.
- Initial focused root Vitest command failed for `AccountApp.test.tsx` because the root invocation did not use the web app JSX/Vite config; rerunning from `apps/web` was the correct path.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web`; 2 files and 14 tests passed.
- Passed: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 53 tests passed and 1 skipped.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved rerun outside the sandbox passed.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved rerun outside the sandbox passed.
- Passed: `git diff --check`.
- Sandboxed `supabase status --workdir infra` failed because the Supabase CLI attempted to write telemetry under `/Users/macg/.supabase`, which the sandbox blocks. Approved `./scripts/start.sh` outside the sandbox passed and synced local env values.
- Started local web app with `pnpm --filter web dev` on `http://localhost:3000`.
- Sandboxed Playwright smoke failed because Chromium could not launch under the macOS sandbox. Approved Playwright smoke outside the sandbox passed after temporary-script selector hardening.
- Authenticated desktop/mobile Playwright smoke confirmed seeded login, Home dashboard, first-run onboarding preservation, disabled preview actions, section safety copy, Pets profile save/reload persistence for `Bruno Validation 1780732729692`, Polish/English switching, no console/page errors, and zero horizontal document overflow.
- Screenshots captured outside the repo at `/private/tmp/caniello-dashboard-validation-desktop.png` and `/private/tmp/caniello-dashboard-validation-mobile.png`.
- `pnpm test:e2e` was not run; focused authenticated Playwright browser validation covered the task acceptance criteria.
- Forge evaluator rerun on 2026-06-06 passed `git diff --check`, focused account/pet tests from `apps/web`, and focused contracts/db tests from the repository root. The evaluator did not rerun browser automation because no product code changed after the implementation browser pass.

Current pet profile foundation task:

- PR #21 review follow-up implemented on 2026-06-05: `public.households.owner_user_id` is unique, first household creation refetches after unique-conflict races, pet edits explicitly set `updated_at`, and `birthDate` now rejects impossible calendar dates before Postgres.
- Focused validation passed before local dependency links were disturbed: `pnpm --filter @caniello/contracts test` and `pnpm --filter web test -- pet-profile.test.ts`.
- `pnpm install` and `pnpm install --offline` could not restore the full local dependency tree because the registry returned 403 for `@types/react` and the package was missing from the offline store; later package-manager reruns were therefore blocked by incomplete ignored `node_modules` links.
- `git diff --check` passed after the review follow-up edits.
- Implemented on 2026-06-04 on branch `codex/pet-profile-foundation`.
- Published draft PR https://github.com/maciejgos/caniello/pull/21 to `mvp-implementation` on 2026-06-05.
- Evaluator artifact: `spec/validation/pet-profile-foundation-evaluation.md`.
- Fresh evaluator rerun after the 2026-06-05 two-owner/RLS follow-up: Pass. No remaining task-specific validation gap is recorded.
- Fresh evaluator rerun later on 2026-06-05 confirmed the verdict remains Pass.
- Follow-up validation passed: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web`; 2 files and 12 tests passed.
- Follow-up validation passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Follow-up validation passed: `pnpm --filter web test`; 9 files and 51 tests passed, with existing localStorage experimental warnings.
- Follow-up validation passed outside sandbox after sandbox fetch failures: `pnpm --filter web lint` and `pnpm build`.
- Local Supabase was started with `./scripts/start.sh`; startup applied `20260604090000_extend_pet_profile_fields.sql` to the local database.
- Fresh focused Playwright load-lock smoke passed outside the sandbox; it delayed the initial profile GET, confirmed fields were disabled while loading, saved pet profile `Bruno Eval Fresh 1780593954304`, verified reload persistence, verified fresh mobile visibility, checked no console/page errors, and confirmed zero desktop/mobile horizontal overflow.
- Live two-owner/RLS integration test passed outside the sandbox after sandbox localhost access failure: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/pet-profile.rls.test.ts` from `apps/web`; 1 file and 1 test passed.
- Default focused test path passed with the opt-in RLS test skipped: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts pet-profile.rls.test.ts` from `apps/web`; 2 files and 12 tests passed, 1 opt-in RLS test skipped.
- Default web test suite passed with the opt-in RLS test skipped: `pnpm --filter web test`; 9 files and 51 tests passed, 1 opt-in RLS test skipped.
- Fresh later 2026-06-05 evaluator rerun passed focused pet profile tests, contract/db tests, web TypeScript check, full web test suite, opt-in live RLS test outside the sandbox, web lint outside the sandbox after sandbox fetch failure, production build outside the sandbox after sandbox fetch failure, and `git diff --check`.
- PR review fix validation on 2026-06-05 passed: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts`; 2 files and 16 tests passed.
- PR review fix validation on 2026-06-05 passed: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 52 tests passed and 1 skipped, with existing Vitest localStorage experimental warnings.
- PR review fix validation on 2026-06-05 passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- PR review fix validation on 2026-06-05 passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- PR review fix validation on 2026-06-05 passed: `git diff --check`.
- Conflict-resolution evaluator rerun on 2026-06-05 passed: no merge-conflict markers found; `git diff --check`; focused contract/db/server tests with 3 files and 30 tests passed; `pnpm --filter web test` with 9 files passed, 1 opt-in RLS file skipped, 53 tests passed, and 1 skipped; contracts/db TypeScript checks; `pnpm --filter web lint` outside sandbox after sandbox fetch failure; `pnpm build` outside sandbox after sandbox fetch failure; opt-in live Supabase RLS test outside sandbox after sandbox localhost denial.
- Migration-history cleanup validation on 2026-06-05 passed: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts packages/contracts/src/index.test.ts`; 3 files and 30 tests passed.
- Migration-history cleanup validation on 2026-06-05 passed: `git diff --check`.
- Fresh final evaluator rerun after migration cleanup on 2026-06-05 confirms verdict `Pass`: no conflict markers, `git diff --check`, focused contract/db/server tests, full web tests, contracts/db TypeScript checks, web lint outside sandbox after sandbox fetch failure, production build outside sandbox after sandbox fetch failure, and opt-in live Supabase RLS test outside sandbox after sandbox localhost denial all passed.
- Human approval recorded on 2026-06-05 after the final evaluator verdict `Pass`.
- Publish validation passed: staged diff was inspected before commit, commit `676420d` was pushed to `origin/codex/pet-profile-foundation`, and PR https://github.com/maciejgos/caniello/pull/21 was refreshed with the latest summary and validation body.

Current home dashboard skeleton task:

- Fresh evaluation on 2026-06-02: `spec/validation/home-dashboard-skeleton-evaluation.md` records evaluator verdict Pass.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; escalated rerun passed.
- `git diff --check` passed.
- Attempted local Supabase startup with `./scripts/start.sh`; it failed because Docker Desktop was not reachable. Requested and ran `open -a Docker`, waited, and retried `./scripts/start.sh`; Docker remained unreachable.
- Evaluator-run `docker ps` showed local Supabase containers were already running.
- Evaluator-run authenticated Playwright smoke initially failed in the sandbox because Chromium could not launch due to macOS permission errors; escalated rerun with stricter selectors passed.
- Evaluator-run authenticated Playwright smoke confirmed unauthenticated `/app` redirects to `/login`, seeded local login returns to `/app`, Polish returning-owner dashboard title `Co dziś u Bruno?` renders, demo/preview state renders, document/Ask/sharing preview actions are disabled, English dashboard copy renders after switching language, first-run onboarding remains reachable, returning dashboard can be restored, no console errors occurred, and horizontal overflow was 0 at 1440x1000 and 390x900.
- Evaluator screenshots were captured outside the repo at `/private/tmp/caniello-home-dashboard-desktop.png` and `/private/tmp/caniello-home-dashboard-mobile.png`.

Current app section empty states task:

- Implemented on 2026-06-04 on branch `codex/app-section-empty-states`.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 9 tests passed, with the existing localStorage experimental warning.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- `pnpm --filter web test` passed; 8 test files and 45 tests passed, with existing localStorage experimental warnings.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; escalated rerun passed.
- Browser validation through the Node browser tool failed because Chromium could not launch under macOS sandbox permissions.
- Focused authenticated Playwright smoke initially failed because local Supabase was unreachable. Docker Desktop was launched, `./scripts/start.sh` passed, and the smoke was rerun outside the sandbox.
- Focused authenticated Playwright smoke passed on desktop Chromium and mobile Chromium using seeded local account `akowalska@example.com`; confirmed login, section selection, disabled unavailable actions, Polish/English safety copy, Home navigation, no console errors, and no horizontal overflow.
- The temporary Playwright smoke spec used for manual validation was removed after the run.
- Evaluated `spec/tasks/app-section-empty-states.md` with `forge-evaluator`. Fresh verdict: Pass. Artifact: `spec/validation/app-section-empty-states-evaluation.md`.
- Evaluator reran focused account tests, TypeScript lint, full web tests, production build, and focused authenticated Playwright smokes on desktop and mobile Chromium.
- Published draft PR https://github.com/maciejgos/caniello/pull/20 from `codex/app-section-empty-states` to `mvp-implementation`. The branch includes task commit `09e357b`. The PR is draft only and does not mark the task accepted, approved, merged, released, or complete.
- Human approved `spec/tasks/app-section-empty-states.md` on 2026-06-04. This approval does not merge, release, deploy, or move roadmap scope.

Current first-run onboarding task:

- Fresh evaluation on 2026-05-24: `spec/validation/first-run-onboarding-skeleton-evaluation.md` records evaluator verdict Pass.
- Evaluator-run `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Evaluator-run `pnpm --filter web lint` first failed in the sandbox with `[ERROR] fetch failed`; escalated rerun passed.
- Evaluator-run `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Evaluator-run `git diff --check` passed.
- Evaluator-run Playwright smoke passed outside the sandbox after local Supabase was started with `./scripts/start.sh`; confirmed `/app`, title `Witaj w Caniello`, visible searchbox, active Home nav, disabled `Dodaj Bruno`, disabled first-document upload, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- The local Next.js dev server started for validation was stopped after the Playwright check.
- Mockup-fidelity follow-up `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Mockup-fidelity follow-up `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- Mockup-fidelity follow-up `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Mockup-fidelity follow-up `pnpm build` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`; Turbo emitted existing no-output-files warnings for TypeScript-only package build tasks.
- Mockup-fidelity follow-up Playwright smoke passed outside the sandbox using seeded local account `akowalska@example.com` and password `CanielloDemo123!`; confirmed `/app`, title `Witaj w Caniello`, disabled `Dodaj Bruno` and document upload actions, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- Mockup-fidelity screenshots were captured outside the repo at `/private/tmp/caniello-first-run-mockup-desktop.png` and `/private/tmp/caniello-first-run-mockup-mobile.png`.
- Forge refactor pass selected one safe ADR 0011 gap: `FirstRunOnboarding.tsx` mixed onboarding screen structure with a large SVG icon renderer. Extracted icons to `OnboardingIcon.tsx`; behavior and UI output are intended to be unchanged.
- Refactor validation: `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Refactor validation: sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- Refactor validation: `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Component-boundary refactor pass split the authenticated shell, topbar/search/account controls, sidebar/menu, dashboard header, onboarding stepper, pet panel, document panel, tip, fields, and app/onboarding icons into separate feature-local components under `apps/web/features/account/components/`.
- Component-boundary validation: `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Component-boundary validation: sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- Component-boundary validation: `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Component-boundary validation: `git diff --check` passed.
- Component-boundary Playwright smoke passed outside the sandbox using seeded local account `akowalska@example.com` and password `CanielloDemo123!`; confirmed `/app`, title `Witaj w Caniello`, visible searchbox, active Home nav, disabled `Dodaj Bruno`, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- Forge refactor skill creation: Ruby YAML frontmatter sanity check passed for `.codex/skills/forge-refactor/SKILL.md`; `quick_validate.py .codex/skills/forge-refactor` could not run because the host Python lacks the `yaml` module.
- Post-implementation workflow correction: no product tests were run for the implementer-skill and ADR text changes; `git diff --check` passed after the documentation updates.
- `pnpm install` passed outside the sandbox after the first focused test failed because dependencies were missing and the sandboxed install failed with `[ERROR] fetch failed`.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; Vitest emitted the existing localStorage experimental warning.
- `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- `git diff --check` passed.
- Local Supabase was started with `./scripts/start.sh` outside the sandbox so the seeded demo account could authenticate for browser validation.
- Started web app on `http://localhost:3000` after syncing local Supabase env values.
- Playwright fallback validation passed outside the sandbox and confirmed login with seeded local account `akowalska@example.com`, `/app` onboarding title, accessible add-pet field, disabled upload action, safe medical-boundary copy, and no horizontal document overflow at 1440px desktop and 390px mobile widths.
- Temporary UI screenshots were captured outside the repo at `/private/tmp/caniello-first-run-desktop.png` and `/private/tmp/caniello-first-run-mobile.png`.

Previous task validation for `spec/tasks/authenticated-app-shell-navigation.md`:

- `pnpm --filter web test -- AccountApp.test.tsx` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web test` passed outside the sandbox; Vitest emitted existing localStorage experimental warnings.
- Browser validation used Playwright fallback because the in-app browser reported `Browser is not available: iab`.
- Started web app on `http://localhost:3001` because port 3000 was already in use.
- Playwright validation with seeded local account `akowalska@example.com` confirmed unauthenticated `/app` redirects to `/login?next=%2Fapp`, login returns to `/app`, Home has `aria-current="page"`, shell labels and top-bar affordances render, and desktop/mobile viewports have no horizontal document overflow.
- Temporary UI screenshots were captured outside the repo at `/private/tmp/caniello-app-shell-desktop.png` and `/private/tmp/caniello-app-shell-mobile.png`.

Previous repository validation notes still relevant to the dirty worktree:

- `find spec -maxdepth 3 -type f | sort` completed and showed the flattened active workspace plus archived history.
- Confirmed no top-level `docs/` directory exists.
- `find spec/archive/flow-forge-history -maxdepth 3 -type f | sort` completed and showed archived requirements, stories, detailed features, old plans, release-readiness records, and lifecycle records.
- `rg "spec/(requirements|stories|release-readiness|lifecycle)" README.md AGENTS.md ROADMAP.md spec/README.md .codex/skills` returned no matches.
- `git diff --check` passed.
- `pnpm install` was run outside the sandbox because dependencies were missing and validation needed `turbo`.
- `pnpm lint` passed outside the sandbox after sandboxed attempts failed with `[ERROR] fetch failed`.
- `pnpm test` passed outside the sandbox after sandboxed attempts failed with `[ERROR] fetch failed`.
- `git diff --check` passed after adding `forge-publisher`.
- Ruby `Psych.safe_load` frontmatter sanity check passed for `.codex/skills/forge-publisher/SKILL.md`.
- Ruby `Psych.safe_load` metadata sanity check passed for every `.codex/skills/forge-*/agents/openai.yaml` file, including `$skill-name` default prompt references.
- `quick_validate.py .codex/skills/forge-publisher` could not run because the host Python lacks the `yaml` module.

## Known Gaps

- Current MVP non-goal alignment task has no evaluator gaps. Full application tests and UI/browser validation were not run because the task changes only Markdown documentation; `git diff --check`, targeted vocabulary review, and manual diff/scope review covered the changed surface.
- Previous care timeline foundation task has no evaluator gaps. Full `pnpm test:e2e` was not run; focused component/API/security tests, opt-in live RLS, production build, and authenticated browser smoke covered the task-specific user path.
- Timeline automation from documents, OCR, AI, reminders, uploads, sharing, or account activity remains intentionally deferred. Timeline deletion, attachment picker, document linking UI, reminder generation, notification delivery, calendar sync, and provider workflows are also deferred.
- Actual account deletion execution, user deletion, cascade cleanup, export file generation, download links, email delivery, background jobs, notification preferences, billing, family roles, caregiver permissions, advanced household permissions, and external privacy tooling remain intentionally deferred from the previous settings task.
- Previous care card preview foundation task has no evaluator gaps. Full `pnpm test:e2e` was not run; focused authenticated Playwright smoke covered the task-specific user path.
- Public share links, scoped share tokens, revocation, expiry, access logging, invitations, caregiver permissions, and PDF export remain intentionally deferred to separate approved tasks aligned with ADR 0017.
- Home dashboard mode switching is intentionally local React state only. It is demo-only and not persisted.
- Dashboard and section CTA buttons for unimplemented document, Ask Caniello, sharing, reminders, pets, timeline, and settings behavior are intentionally disabled or preview-only until real feature tasks are approved and implemented.
- The app shell task intentionally does not add dashboard cards, onboarding, persistence, live search, notifications, AI, sharing behavior, section routes, or mobile app work.
- Roadmap-sensitive future dashboard tasks expose Ask Caniello and sharing only as skeleton/navigation surfaces. Keep them inert and safety-worded until a human-approved task explicitly includes AI behavior, share links, caregiver access, or export behavior.
- `pnpm test` emitted existing Vitest localStorage experimental warnings and Turbo output warnings; tests still passed.
- `node_modules/` was installed locally for validation and should remain ignored.
- Official skill quick validation is pending until `PyYAML` is available.
- No `pnpm build` or full `pnpm test:e2e` run was recorded for the app-shell task.
- No full `pnpm test:e2e` run was recorded for the first-run onboarding task; validation used focused account tests, full web Vitest, TypeScript lint, a prior production build, and targeted authenticated Playwright smoke checks. The earlier evaluator browser gap was resolved by starting local Supabase and using the seed password from `infra/supabase/seed.sql`.
- No full `pnpm test:e2e` run was recorded for the dashboard skeleton validation task; focused authenticated Playwright browser validation covered the task acceptance criteria.

## Next Recommended Action

- Review the cleaned MVP readiness implementation list in `spec/roadmap.md`, then start one remaining task at a time. The roadmap now separates resolved checkpoints from remaining implementation tasks and includes ADR references inline.
- Human review of draft PR https://github.com/maciejgos/caniello/pull/31.
- Human review of draft PR https://github.com/maciejgos/caniello/pull/29.
- Human review of existing draft PR https://github.com/maciejgos/caniello/pull/28 remains pending separately.

Latest roadmap/ADR traceability update:

- Cleaned the MVP readiness task list in `spec/roadmap.md` so resolved checkpoints are separate from remaining implementation work.
- Marked the document upload scope decision as resolved by accepted ADR 0025 and pointed remaining work to `spec/tasks/document-upload-storage-implementation.md`.
- Added ADR references to the remaining recovery tasks for new-owner auth, dashboard/active-pet alignment, pet profile IA, timeline/reminders alignment, and account deletion persistence.
- Added an accepted MVP implementation traceability table to `spec/architecture-records/README.md` mapping ADRs 0024-0032 to task files.
- Updated `spec/features/accepted-architecture-implementation-backlog.md` so candidate tasks name the ADRs they implement or are constrained by.
- Validation: all referenced task paths exist; `git diff --check` passed. No product tests were run because this was documentation/roadmap hygiene only.

Latest publish record:

- Branch `codex/audit-product-events-architecture` was pushed to `origin`.
- Draft PR opened: https://github.com/maciejgos/caniello/pull/31.
- Published commit `3061ddd` (`Plan accepted MVP architecture backlog`) accepts ADRs 0024-0032, adds the accepted architecture implementation feature brief and task backlog, and updates the MVP roadmap.
- Publish validation before commit: `git diff --check` passed; `git diff --cached --check` passed. No automated product tests were run because this was documentation and planning work only.
- Scope caveat: this PR does not implement migrations, storage upload, UI/API behavior, release, deploy, public health-record upload, or approval of older draft ADRs 0022 and 0023.
