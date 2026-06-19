# 0027 - Use first-pet MVP scope and defer multi-pet management

## Status

Accepted

## Date

2026-06-14

## Context

The database supports multiple pets per household, but the current app implementation repeatedly uses the first saved pet as the owner-scoped working context. The UI still has active-pet affordances that can imply richer multi-pet selection than currently exists.

The roadmap requires that an owner can create and manage a pet profile. It does not require advanced multi-pet household management, family plans, complex roles, or care-team workflows in the first product phase.

## Decision

Caniello MVP validation will use a first-pet scope.

For current MVP tasks:

- server helpers may continue using the first saved pet ordered by `created_at`;
- UI must not imply full multi-pet management when only first-pet behavior exists;
- active-pet labels should read as current context, not as a functional multi-pet switcher unless switching is implemented;
- add-pet, switch-pet, pet deletion, and pet ordering are deferred;
- API contracts should not introduce persisted active-pet state until a task explicitly approves multi-pet management.

The schema may continue allowing multiple pets because future scope needs it, but product behavior for validation should be honest: one primary pet record is the supported path.

True multi-pet management requires a later task and likely a new ADR or revision to this ADR. That decision would need to define:

- persisted active-pet selection;
- add/edit/delete pet flows;
- per-pet document/reminder/timeline filtering;
- sharing behavior per pet;
- dashboard aggregation rules;
- mobile implications;
- RLS and live-test coverage.

## Consequences

This removes ambiguity from the current validation path and avoids building a half-finished multi-pet experience.

The tradeoff is that early validators with multiple pets may feel constrained. That is acceptable for MVP foundation if the UI presents the limitation clearly and validation notes capture demand for multi-pet workflows.

Implementation tasks touching dashboard, app shell, profile, reminders, documents, timeline, and sharing must preserve first-pet consistency or explicitly propose a multi-pet decision before changing behavior.

## Related Artifacts

- [0015 - Use Supabase migrations, RLS, and lifecycle controls for MVP data](./0015-use-supabase-data-lifecycle-and-rls.md)
- [Pet profile IA and controls](../tasks/pet-profile-ia-and-controls.md)
- [Dashboard mockup and active-pet alignment](../tasks/dashboard-mockup-and-active-pet-alignment.md)
- `apps/web/features/account/server/`
- `infra/supabase/migrations/20260519000100_mvp_foundation.sql`
