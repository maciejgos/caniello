# 0026 - Use manual data-rights runbook before automated account lifecycle

## Status

Accepted

## Date

2026-06-14

## Context

Caniello already records owner account profile, consent, data export request, and account deletion request state. The account settings UI tells owners that export and deletion requests are queued for follow-up, not completed automatically.

Accepted ADR 0015 says export and deletion flows must be designed before collecting health-record uploads from public users. The product context also says EU-facing beta work must preserve privacy, consent, account deletion, data export, authorization, and medical disclaimer foundations before collecting sensitive beta data at scale.

The missing decision is whether the MVP should immediately automate export/deletion or begin with a manual, audited operations runbook.

## Decision

Caniello will use a manual data-rights operations runbook before implementing automated account export, account deletion, or cascade cleanup.

For MVP validation:

- `data_export_requests` and `account_deletion_requests` remain the durable request queues.
- Owners can submit requests through the app.
- The app must not claim that files are generated, users are deleted, or data is purged automatically.
- A human operator processes requests using a documented checklist.
- Any operator access to private data must remain narrow, server-side or database-admin controlled, and audited.

The manual runbook must define:

- request intake source;
- identity/account verification step;
- export contents;
- deletion scope;
- retained audit/legal/minimal abuse-prevention records;
- Supabase Auth user handling;
- Supabase Storage object handling;
- communication back to the owner;
- evidence to attach to validation or operations notes.

Initial export contents should include owner-owned Caniello data only:

- account profile;
- consent history;
- household and pet profiles;
- reminders;
- timeline events;
- document metadata;
- uploaded document files once ADR 0025 is implemented;
- share-link records excluding raw tokens.

Initial deletion processing should:

- revoke active share links;
- delete or anonymize owner-owned pet/profile/reminder/timeline/document rows according to schema cascade behavior;
- delete uploaded Storage objects owned by the account when upload exists;
- delete or disable the Supabase Auth user only after data cleanup succeeds;
- preserve minimal audit evidence where required for security, legal, or abuse-prevention reasons.

Automated export/deletion jobs are deferred until request volume, public beta scale, or operational risk justifies them.

## Consequences

This keeps the MVP honest and operable without adding a premature job system. It also makes privacy validation possible before fully automated data lifecycle tooling exists.

The tradeoff is manual operational burden. If external beta usage grows, manual processing becomes a risk and must be replaced with automated, tested lifecycle flows.

Implementation tasks must verify that request rows persist, copy accurately describes manual follow-up, and audit records are available for request creation and operator processing.

## Related Artifacts

- [0014 - Use Supabase Auth with minimal RBAC and audit controls](./0014-use-supabase-auth-minimal-rbac-and-audit.md)
- [0015 - Use Supabase migrations, RLS, and lifecycle controls for MVP data](./0015-use-supabase-data-lifecycle-and-rls.md)
- [0024 - Separate audit logs from product events](./0024-separate-audit-logs-from-product-events.md)
- [0025 - Use Supabase Storage for MVP document upload](./0025-use-supabase-storage-for-mvp-document-upload.md)
- [Account deletion persistence verification](../tasks/account-deletion-persistence-verification.md)
- `infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql`
- `apps/web/features/account/server/account-settings.ts`
