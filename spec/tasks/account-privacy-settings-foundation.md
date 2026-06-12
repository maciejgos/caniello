# Task: Account privacy settings foundation

## Goal

Give an authenticated owner a real Settings surface for account profile, consent, and data-rights request foundations, so MVP validation has visible privacy controls without implying completed export or deletion automation.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The `Now - MVP Foundation` roadmap includes reliable owner-facing account, privacy, consent, and language behavior. The database and shared contracts already include account privacy foundations; this task wires the smallest useful owner-facing API and UI around them.

Related roadmap item:

`spec/roadmap.md` - Now: owner-facing account, privacy, consent, and language behavior are reliable enough for MVP validation.

## Scope

- Add an authenticated owner-only settings API for reading/updating account profile language/display name, recording consent preferences, and creating queued data export or account deletion requests.
- Replace the inert Settings placeholder in the authenticated app shell with a real settings section that uses the API.
- Show clear request status for export and deletion requests while keeping the actual export generation and deletion execution deferred.
- Add focused server, route, contract/UI tests for validation, authentication, and visible owner outcomes.

## Non-Goals

- No actual account deletion, user deletion, cascade cleanup, data export file generation, email delivery, download links, or background jobs.
- No notification preferences, billing, family roles, caregiver permissions, advanced household permissions, or external privacy tooling.
- No clinic/provider workflow, marketplace mechanics, booking, payments, AI diagnosis, treatment advice, emergency advice, or official EU pet passport replacement claims.
- No roadmap movement, release, deployment, merge, or human approval state changes.

## Acceptance Criteria

- Authenticated owners can load their settings profile and see display name, language, most recent consent choices, and latest data-rights request statuses when present.
- Authenticated owners can save display name/language updates, record analytics/marketing consent choices, request data export, and request account deletion confirmation through the Settings UI.
- Unauthenticated API access is rejected before account privacy tables are read or written.
- Request copy makes clear that export and deletion requests are recorded for follow-up and do not immediately create files or delete the account.
- Polish and English copy preserve privacy, consent, data-rights, medical-safety, and official-passport boundaries.
- Focused tests and relevant type/lint/build or browser checks pass, or any unavailable checks are recorded with risk.

## Implementation Notes

- Reuse existing account privacy contracts in `packages/contracts` where possible.
- Reuse the existing Supabase route-client cookie pattern used by pet profile, reminder, document, and share-link APIs.
- Keep Settings UI in a feature-local component under `apps/web/features/account/components/`.
- Existing database foundation: `infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql`.
- Relevant accepted ADRs: `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`, `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`.

## Architecture Decisions

- Existing ADRs: `0004`, `0011`, `0015`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Planned with `forge-planner` on 2026-06-12 and implemented on branch `codex/account-privacy-settings-foundation`.

Implemented a real authenticated Settings section backed by existing account privacy schema and shared contracts. The task adds `/api/account/settings`, server helpers for account profile, consent, data export request, and account deletion request records, localized UI copy, focused tests, and an opt-in live RLS test.

Validation artifact: `spec/validation/account-privacy-settings-foundation-evaluation.md`. Evaluator verdict: Pass.

Validation passed: focused contract/server/route tests, `AccountApp.test.tsx`, full web Vitest, web/contracts TypeScript checks, `git diff --check`, approved outside-sandbox monorepo tests, approved outside-sandbox web lint, approved outside-sandbox production build, approved outside-sandbox live account settings RLS test, and in-app Browser desktop/mobile smoke.

Sandbox notes: sandboxed `pnpm test`, `pnpm --filter web lint`, and `pnpm build` failed with `fetch failed`; approved outside-sandbox reruns passed. Sandboxed live RLS failed on localhost `EPERM`; approved outside-sandbox rerun passed.

Out of scope remains: actual data export file generation, download links, email delivery, account deletion execution, cascade cleanup, background jobs, notification preferences, role/caregiver permission changes, clinic/provider workflows, marketplace, booking, payments, AI diagnosis, treatment advice, emergency advice, official EU pet passport replacement claims, release, deployment, merge, acceptance, or roadmap movement.
