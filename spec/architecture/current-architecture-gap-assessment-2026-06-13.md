# Architecture Note: Current architecture gap assessment

## Question

What is missing from the current Caniello repository architecture before the MVP can move from seeded-owner internal validation toward broader owner validation?

## Context

Caniello is in MVP validation. The accepted target architecture already covers the main platform choices: a TypeScript-first monorepo, one Next.js web app on Vercel, Supabase for Auth/Postgres/Storage/RLS, shared contracts, future Expo mobile, MailerLite for marketing email, deferred payments, scoped sharing, staged document intake, and pragmatic engineering practices.

The current repository implements meaningful owner-side vertical slices under `apps/web/features/account`: pet profile, reminders, document metadata, timeline events, care-card preview/share links, and account settings. Shared Zod contracts live in `packages/contracts`, Supabase environment helpers live in `packages/db`, and migrations/RLS policies live under `infra/supabase`.

The main architecture question is no longer "what stack should Caniello use?" It is which missing boundaries, runbooks, and lifecycle decisions now block reliable validation with real or near-real owner data.

## Assessment

### Covered Well

- Platform topology is covered by accepted ADRs and the target architecture: Next.js App Router in `apps/web`, Vercel, Supabase, pnpm/Turborepo, and one MVP web project.
- Roadmap and product boundaries are explicit: owner-side utility first, no marketplace, no clinic SaaS, no payments-first flows, no AI diagnosis, no official EU pet passport replacement claims.
- API payload contracts exist for the active MVP flows in `packages/contracts` and are used by route/server helpers.
- Supabase migrations and RLS policies exist for owner households, pets, reminders, documents, timeline events, share links, account privacy records, and audit logs.
- The repo has a validation culture: focused Vitest coverage, opt-in live RLS tests, Playwright checks, validation artifacts, and handoff notes.

### Missing Or Under-Specified Architecture

1. Document file upload and storage authorization are not decided at implementation detail level.

   ADRs say Supabase Storage will hold uploads and that clients must not receive broad storage privileges, but the current product only stores document metadata. Before real uploads, Caniello needs a concrete storage architecture: bucket names, object path convention, file size/type limits, upload mechanism, malware/safety posture if any, RLS/storage policies, signed URL rules, retention/deletion behavior, and how document rows relate to storage objects. This is already flagged by `spec/tasks/document-upload-scope-decision.md`.

2. Account lifecycle is only a request record, not an operational architecture.

   The schema supports data export and account deletion request rows, but the durable export/deletion process is not specified: who processes requests, how identity is verified, what is included in export, what is deleted versus retained/anonymized, how Supabase Auth users and Storage objects are handled, how audit logs are preserved, and what SLA or internal checklist applies. ADR 0015 requires export/deletion flows before public health-record upload, but the runbook and implementation boundary are still missing.

3. Current-pet and multi-pet semantics are unclear.

   The database supports multiple pets per household, while current server helpers repeatedly choose the first pet by `created_at`. The UI has active-pet affordances, but validation notes say those affordances are static or Bruno-specific. The architecture should decide the MVP rule: strictly one active pet, first-pet-only with honest UI, or persisted active-pet selection. True multi-pet management should trigger a durable decision or task because it affects routes, API contracts, state, RLS tests, share links, dashboard summaries, and future mobile behavior.

4. Feature-local data access is pragmatic but lacks graduation rules.

   Server logic currently lives in feature-local helpers under `apps/web/features/account/server`, while `packages/db`, `packages/domain`, and `packages/application` are intentionally thin. This is acceptable for MVP vertical slices, but the architecture note should state when code moves into shared packages: cross-app reuse, duplicated owner/pet lookup logic, mobile consumption, background jobs, or security-sensitive policies. Without this, the monorepo package boundaries can become ceremonial while real domain behavior remains scattered.

5. Audit requirements are broader than implementation.

   ADR 0014 requires audit entries for document upload, extraction confirmation, reminder changes, share-link creation/revocation, export generation, account deletion request, and operator actions. The database has `audit_logs` and account privacy triggers, but active flows such as reminder changes and share-link creation/revocation do not appear to be consistently audited. Before broader validation, audit coverage should be reconciled against ADR 0014 and either implemented or explicitly deferred with risk acceptance.

6. Share-link lifecycle is useful but operationally thin.

   Scoped, hashed, revocable share tokens are implemented and fit ADR 0017. Missing pieces include access logging, rate-limit/abuse posture, operational revoke-all or incident response procedure, and a decision about whether public share pages should expose only metadata or later include signed document file access. Access logging is specifically mentioned by ADR 0017 when technically available.

7. Observability and product-event architecture is not yet connected to real MVP flows.

   ADR 0019 names product events such as signup, first pet, first document, reminder created, share created/revoked, export generated, and account deletion requested. Current implementation has landing validation events, but the authenticated MVP flows do not yet appear to emit a coherent product-event stream. Broader validation will need event definitions, consent boundaries, sink choice, and a low-friction way to measure activation without adding advanced analytics scope.

8. Local auth and OAuth affordance strategy remains a validation blocker.

   Local email confirmation and visible Google/Apple affordances are known gaps. ADR 0023 is still Draft and task `spec/tasks/new-owner-access-validation.md` captures the immediate fix. Architecturally, Caniello still needs a clear distinction between local validation auth, production email auth, and future OAuth provider rollout so UI does not advertise unavailable capabilities.

9. Test data isolation and live RLS validation need a firmer pattern.

   The repo has valuable opt-in live RLS tests, but handoff notes report that some live tests mutate seeded demo rows. Before repeated validation, Caniello needs a standard for disposable test owners, fixture setup/teardown, seeded demo protection, and when to run local Supabase checks outside the sandbox. This is a test architecture gap more than a product feature gap.

10. Mobile API boundary is deferred but not yet shaped.

   The accepted architecture includes future Expo mobile and shared contracts, but current API routes and browser-oriented session handling are built for the web app. That is fine for MVP, but before mobile work starts the repo needs a mobile API/auth boundary decision: whether mobile talks to Next.js routes, Supabase directly with shared policies, or a hybrid. This should stay deferred until mobile enters roadmap scope.

11. Background job architecture is intentionally absent.

   The schema includes document processing jobs and ADR 0016 describes staged intake, but no job runner or queue boundary exists. That is acceptable while documents are metadata-only. The first real OCR/extraction, generated export, notification, or asynchronous deletion/export task should trigger a job-processing ADR or implementation note.

12. Release readiness and incident response are still mostly artifact-level.

   ADR 0019 requires recovery playbooks before public health-record upload. The repo has validation artifacts, but still needs production-facing readiness material for secrets rotation, disabling providers, revoking share links, rollback, Supabase backup/recovery expectations, support access, and privacy incident evidence preservation.

## Options

- Keep the current architecture as-is for seeded-owner internal validation, and address gaps only through the active recovery tasks.
- Add exploratory architecture notes for the highest-risk gaps before implementation: document upload/storage, account export/deletion lifecycle, current-pet semantics, and audit/observability coverage.
- Draft ADRs now for durable decisions that will shape multiple tasks, especially real document upload/storage and account data lifecycle before public health-record collection.

## Recommendation

Use the current stack and accepted target architecture. No replacement platform decision is needed.

Prioritize architecture follow-up in this order:

1. Decide document upload scope. If real upload is required, draft an ADR or detailed architecture note for Supabase Storage bucket policy, pathing, file limits, signed URLs, deletion, and tests before implementation.
2. Define account export/deletion lifecycle before broader health-record validation. This can begin as an architecture note/runbook and become an ADR if it changes retention or deletion policy.
3. Decide one-pet versus active-pet semantics for the MVP. Keep it task-level if the answer is first-pet-only UI cleanup; draft an ADR if persisted active-pet or multi-pet management enters scope.
4. Reconcile audit and product-event coverage against ADRs 0014 and 0019. Implement small event/audit additions only where they support current MVP validation and privacy trust.
5. Record shared-package graduation rules so feature-local helpers remain a deliberate MVP choice, not accidental drift.

## ADR Trigger

Create or update an ADR when any of the following becomes true:

- Real document file upload or generated export storage is approved for implementation.
- Export/deletion behavior changes from request-recording to actual account, database, or storage lifecycle operations.
- MVP scope changes from first-pet-only to persisted active-pet selection or multi-pet management.
- A background worker, queue, cron, OCR/AI provider, notification delivery, or asynchronous processing runtime enters scope.
- Operator/admin support access is approved, because MFA, RBAC, and audit requirements become durable security decisions.
- Mobile implementation starts and needs a durable API/auth/data access boundary.

## Open Questions

- Is metadata-only document vault acceptable for the next broader MVP validation pass, or does 1:1 mockup fidelity require real upload now?
- Should the MVP explicitly validate one pet per owner, or should active-pet state become a real persisted product concept?
- Which sensitive actions must be audited before external beta users enter real pet-health data?
- What minimum product events are needed to measure activation without introducing advanced analytics scope?
- Who processes account export/deletion requests during validation, and what evidence must be preserved?
- Should public share links remain metadata-only if file upload enters scope, or should document file access require separate scoped tokens?

## Related Artifacts

- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/architecture/mvp-target-architecture.md`
- `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`
- `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`
- `spec/architecture-records/0016-use-staged-ai-document-intake-pipeline.md`
- `spec/architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md`
- `spec/architecture-records/0019-use-vercel-supabase-observability-and-mvp-recovery.md`
- `spec/architecture-records/0023-use-config-toml-for-local-supabase-auth-providers.md`
- `spec/features/mvp-validation-readiness-recovery.md`
- `spec/tasks/document-upload-scope-decision.md`
- `spec/tasks/new-owner-access-validation.md`
- `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`
- `spec/tasks/pet-profile-ia-and-controls.md`
- `spec/tasks/account-deletion-persistence-verification.md`
- `spec/tasks/timeline-upcoming-reminders-alignment.md`
- `apps/web/features/account/server/`
- `packages/contracts/src/index.ts`
- `packages/db/src/index.ts`
- `infra/supabase/migrations/`
