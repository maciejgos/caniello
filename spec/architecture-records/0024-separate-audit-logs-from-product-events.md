# 0024 - Separate audit logs from product events

## Status

Accepted

## Date

2026-06-13

## Context

Caniello already has `public.audit_logs` in the MVP Supabase schema. It records security, privacy, and trust-relevant evidence with:

- `actor_user_id`
- `action`
- `entity_type`
- `entity_id`
- `metadata`
- `created_at`

The owner account privacy foundation also writes account profile, consent, data export request, and account deletion request actions into `audit_logs` through database triggers.

Accepted ADR 0014 requires audit entries for sensitive actions: document upload, extraction confirmation, reminder changes, share-link creation/revocation, export generation, account deletion request, and any operator action.

Accepted ADR 0019 separately says important product behavior should be recorded once flows exist: signup, first pet, first document, processing failure, extraction confirmed, reminder created, share created, share revoked, export generated, and account deletion requested.

Those two needs overlap, but they are not the same:

- audit logs prove who did what to sensitive owner data, support privacy/security review, and preserve incident evidence;
- product events measure activation and retention without becoming a compliance evidence store;
- analytics and marketing signals must respect consent boundaries and avoid storing unnecessary pet-health detail.

The current implementation has the audit table and some account/privacy audit triggers. Landing validation events exist as a server boundary, but durable product-event storage is not wired yet.

## Decision

Caniello will keep audit logs and product events as separate architectural concepts.

### Audit Logs

`public.audit_logs` remains the source of truth for sensitive-action evidence during the MVP.

Audit logs are for security, privacy, authorization, support accountability, and incident evidence. They should answer:

- which authenticated user, trusted recipient, or approved operator performed the action;
- which entity was affected;
- when the action happened;
- which bounded metadata is needed to investigate or prove the action later.

Audit logs must not become a broad analytics stream. They should avoid raw medical notes, full document contents, tokens, secrets, large payloads, or unnecessary personal data in `metadata`.

Audit actions should use stable names in the form:

```text
<domain>.<past_tense_action>
```

Examples:

- `account.profile_updated`
- `account.consent_updated`
- `account.data_export_requested`
- `account.deletion_requested`
- `pet.profile_created`
- `pet.profile_updated`
- `document.metadata_created`
- `document.uploaded`
- `document.extraction_confirmed`
- `reminder.created`
- `reminder.updated`
- `reminder.completed`
- `share_link.created`
- `share_link.revoked`
- `share_link.opened`
- `export.generated`
- `operator.user_viewed`
- `operator.action_performed`

For MVP owner flows, audit insertion may happen in either:

- database triggers, when the event must be coupled tightly to a table mutation; or
- server-side helpers/API routes, when the action spans multiple tables, requires request context, or should include route-derived metadata.

Client components must not write audit logs directly.

### Product Events

Product events are separate from `audit_logs`.

For the current MVP, product events should remain a minimal server-side instrumentation boundary until Caniello has enough validation traffic to justify a durable analytics sink. They should measure activation and trust-building behavior, not sensitive pet-health content.

Initial MVP product-event names should focus on funnel and activation:

- `signup_completed`
- `first_pet_created`
- `first_reminder_created`
- `first_document_recorded`
- `share_link_created`
- `share_link_opened`
- `account_export_requested`
- `account_deletion_requested`

Product-event payloads should be intentionally small:

- event name;
- timestamp;
- anonymous visitor id or authenticated owner id only when appropriate;
- language;
- consent state when relevant;
- coarse source or route;
- non-sensitive entity ids only when needed for debugging or deduplication.

Product events must not store raw pet medical notes, diagnosis-like content, document text, upload contents, share tokens, or provider secrets.

### Storage And Sink Strategy

For now:

- audit evidence uses `public.audit_logs`;
- landing validation events may continue through `/api/validation-events` without durable storage until a sink is selected;
- authenticated product events can be added through server-side helpers when a validation task needs them.

When durable product-event storage is needed, prefer adding a separate table such as `public.product_events` or a consent-aware external analytics sink. Do not overload `public.audit_logs` for general analytics.

If using a Supabase `product_events` table, it should be append-only from server-side code, not owner-editable. Owner read access is not required for product analytics. Operator access requires a later support/admin decision.

If using an external analytics provider, the implementation must respect analytics consent, avoid pet-health content, and keep provider credentials server-side.

### Consent Boundary

Audit logs for required security, privacy, data-rights, and account integrity actions do not depend on marketing or analytics consent.

Product analytics beyond strictly necessary operational validation must respect consent. For EU-facing users, analytics events that identify or track a user across sessions should only be sent when the applicable consent gate allows it.

### Validation Boundary

Implementation tasks that add audit or product events should include focused tests proving:

- the sensitive action writes the expected audit record when required;
- unauthenticated or unauthorized users cannot create misleading audit records;
- product-event emission does not include disallowed sensitive payload fields;
- consent-gated events are not emitted when consent is absent or declined;
- existing RLS boundaries still protect private owner data.

## Consequences

This decision keeps Caniello's trust evidence clean. `audit_logs` remains useful for privacy, security, support, and incident review instead of becoming a noisy analytics table.

It also avoids prematurely adopting PostHog or another analytics provider before Caniello has enough product traffic to justify the operational surface.

The tradeoff is that some actions may produce two records later: one audit log for evidence and one product event for activation measurement. This duplication is intentional when an action is both sensitive and important to measure.

Implementation work must reconcile existing flows against ADR 0014 and ADR 0019. Current gaps likely include reminder changes, share-link creation/revocation/open events, document metadata or upload events, first-pet activation events, and account data-rights events as product events.

Before public health-record upload, audit coverage for document upload, extraction confirmation, share access, export generation, and account deletion request must be verified or explicitly risk-accepted.

## Related Artifacts

- [0014 - Use Supabase Auth with minimal RBAC and audit controls](./0014-use-supabase-auth-minimal-rbac-and-audit.md)
- [0015 - Use Supabase migrations, RLS, and lifecycle controls for MVP data](./0015-use-supabase-data-lifecycle-and-rls.md)
- [0019 - Use Vercel and Supabase observability with MVP recovery playbooks](./0019-use-vercel-supabase-observability-and-mvp-recovery.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
- [Caniello Roadmap](../roadmap.md)
- [Caniello Product Context](../product-context.md)
- `infra/supabase/migrations/20260519000100_mvp_foundation.sql`
- `infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql`
- `apps/web/app/api/validation-events/route.ts`
- `apps/web/features/account/server/`
