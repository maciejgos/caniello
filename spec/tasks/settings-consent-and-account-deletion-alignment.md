# Task: Settings consent and account deletion alignment

## Goal

Align the authenticated Settings experience with the `/mvp-flow` look and feel while keeping consent and account deletion as real, owner-controlled API and database-backed actions.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The MVP requires reliable owner-facing account, privacy, consent, language, and data-rights behavior. The current Settings foundation works, but its visual structure does not yet follow the accepted MVP flow and its end-to-end API/database behavior should remain explicit during the redesign.

Related roadmap item:

`spec/roadmap.md` - Now: owner-facing account, privacy, consent, and localization foundations.

## Scope

- Restyle the production Settings section using the `/mvp-flow` Settings screen as the visual source for page hierarchy, card grid, headings, spacing, controls, status feedback, and responsive behavior.
- Keep production Settings feature-local; do not import the prototype component or its local-state implementation.
- Present account profile, consent, privacy/data rights, security context, and medical-boundary information in coherent Settings panels.
- Preserve account display-name and language updates through authenticated `GET`/`PUT /api/account/settings`.
- Persist every analytics or marketing consent change through authenticated `POST /api/account/settings` action `consent`, validate it with shared contracts, append it to `public.consent_events`, and return the latest recorded state and timestamp.
- Add a clearly destructive Account deletion panel that requires exact `DELETE` confirmation and posts action `account_deletion`.
- Persist account deletion requests to `public.account_deletion_requests`, return the latest request status, and preserve the `account.deletion_requested` audit record.
- Preserve the queued/manual meaning of deletion and export requests; the UI must not claim that account data has already been deleted or an export has already been generated.
- Update shared contracts, route/server helpers, forward-only migrations, RLS policies, indexes, or audit triggers only where required to support the accepted visible behavior and reliable persistence.
- Add focused UI, contract, route, server, database/RLS, and desktop/mobile browser coverage.

## Execution Contract

- Execution mode: Standard. This is a user-visible privacy surface backed by existing authenticated APIs and RLS, but it does not change schema or lifecycle policy.
- Sprint boundary: one production Settings alignment slice only; no adjacent reminder, sharing, auth-provider, or account-lifecycle implementation.
- Required gates: focused component behavior, account route/server tests, contracts tests, web typecheck, production build, live Supabase RLS, desktop/mobile browser interaction, and `git diff --check`.
- Evaluator layers: product scope, UI behavior, API/contract behavior, owner isolation, persistence/audit evidence, responsive visual alignment, and approval-boundary review.
- Ratchet baseline: preserve the existing account privacy schema, append-only consent history, owner-scoped RLS, queued manual data-rights semantics, audit evidence, Polish/English copy, and the authenticated shell structure.
- Self-healing limit: fix task-local findings and rerun affected gates; stop before any migration, lifecycle-policy change, or unrelated refactor.
- Learned-rule capture: not expected unless evaluation exposes a repeatable repository-wide rule.

## Non-Goals

- No automatic Supabase Auth user deletion, cascade cleanup, Storage deletion, background processing, or email confirmation.
- No generated export file, download link, or automated data-rights fulfillment.
- No notification preferences, reminder delivery, billing, caregiver roles, or advanced household permissions.
- No editing of historical migrations; any schema change must use a new forward migration.
- No release, deployment, public health-record upload approval, or roadmap expansion.

## Acceptance Criteria

- Settings follows the `/mvp-flow` visual language at desktop and mobile widths while remaining consistent with the production authenticated shell.
- Loading, success, validation-error, server-error, and existing-request states are visible without losing entered values unexpectedly.
- Saving account profile data updates the authenticated owner record and survives reload.
- Saving consent creates a new owner-scoped `consent_events` row; reloading Settings returns the latest values and recorded timestamp.
- Declining or withdrawing optional analytics/marketing consent is persisted as explicitly as granting it.
- Unauthenticated or cross-owner requests cannot read or mutate account profiles, consent events, export requests, or deletion requests.
- Entering exact `DELETE` enables the deletion request action; a successful request creates an owner-scoped `account_deletion_requests` row and corresponding bounded audit evidence.
- Repeated deletion requests have an explicit safe behavior: either a new queued request is accepted intentionally or duplicate pending requests are rejected consistently by contract and database behavior.
- Copy clearly states that deletion is requested for manual processing and is not immediate.
- Focused tests, TypeScript, build, database/RLS checks, and Playwright Interactive visual checks pass or are recorded as unavailable with residual risk.

## Implementation Notes

- Visual source: `/mvp-flow` Settings. No standalone Settings PNG currently exists; this is recorded in `spec/design/visual-artifacts/mvp/README.md`.
- Existing UI: `apps/web/features/account/components/AccountSettingsSection.tsx`.
- Existing API: `apps/web/app/api/account/settings/route.ts`.
- Existing server boundary: `apps/web/features/account/server/account-settings.ts`.
- Existing contracts: account profile, consent, export-request, deletion-request, API response, and audit action schemas in `packages/contracts`.
- Existing database foundation: `infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql` and `20260523093000_create_account_profile_on_auth_signup.sql`.
- Existing tables: `account_profiles`, `consent_events`, `data_export_requests`, and `account_deletion_requests`, all protected by owner-scoped RLS.
- Preserve append-only consent history and database-backed audit evidence. Do not replace them with browser-only state.
- Preserve the existing intentional repeated-request behavior: each exact-confirmation deletion submission creates a new queued manual-processing request and bounded audit row.
- No migration or lifecycle policy change is planned for this implementation slice.
- Any migration or change to deletion lifecycle semantics requires explicit human approval before implementation.

## Architecture Decisions

- Existing ADRs: `0004`, `0011`, `0014`, `0015`, `0024`, `0026`, `0031`
- New ADR needed: No for visual alignment, contract/API refinement, or forward-compatible persistence hardening within the existing manual-request lifecycle.
- ADR draft: None.
- Approval state: Accepted ADRs govern the work; human approval is required before any migration or account lifecycle policy change is implemented.

## Verification

- [x] Focused account Settings component tests.
- [x] Contract, route, and server-helper tests for profile, consent, export request, and deletion request actions.
- [x] Opt-in live Supabase RLS test for owner isolation, consent persistence, deletion request persistence, and audit evidence.
- [x] Browser comparison at desktop plus focused Playwright mobile validation, including consent withdrawal and deletion-request interaction.
- [x] TypeScript, production build, formatting, and `git diff --check`.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Planned with `forge-planner` on 2026-06-18 and refined on 2026-06-19 for implementation. Implemented and evaluated on `codex/settings-consent-alignment`.

Production Settings now uses the `/mvp-flow` three-column/two-row panel rhythm with real owner-account profile, append-only consent, queued export, queued deletion, security, and medical-boundary panels. The destructive deletion action remains a separate panel, requires exact `DELETE`, clears confirmation only after success, and shows the latest queued request date/status. API failures keep edited values visible.

Evaluator verdict: Pass. Validation artifact: `spec/validation/settings-consent-and-account-deletion-alignment-evaluation.md`.

Passed: 29 focused account tests, 23 contracts tests, full web suite (115 passed, 5 skipped), web type/lint, production build, live local Supabase RLS/audit test, mobile Playwright check, changed-file formatting, and `git diff --check`. In-app browser desktop checks had no console warnings/errors and verified consent grant/withdrawal plus a queued deletion request. The in-app viewport override did not apply for the requested mobile size, so the repository Playwright mobile project supplied the responsive/no-overflow evidence.

No migration, account lifecycle policy change, new ADR, release, deployment, or roadmap expansion was introduced.
