# Task: Dashboard Skeleton Validation

## Goal

Verify the authenticated app foundation is usable, safe, and aligned with MVP scope after the dashboard, section empty states, and first real pet profile work have landed.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Validation protects the MVP foundation by checking that the authenticated workspace supports onboarding, navigation, and the first durable pet profile without leaking into out-of-scope claims or unimplemented product behavior.

Related roadmap item:

`spec/roadmap.md` - Now: owner can create and manage a pet profile, store key health information, and rely on owner-facing account, privacy, consent, and language behavior for MVP validation.

## Scope

- Run focused automated checks for the authenticated app shell, home dashboard, section empty states, first-run onboarding preservation, and pet profile read/save behavior.
- Run browser checks for authenticated `/app` on desktop and mobile layouts using the local seeded demo account when local Supabase is available.
- Verify auth gating, logout, language switching, navigation states, disabled or preview-only actions, and saved pet profile reload behavior.
- Check that medical boundary, assistant, sharing, document, reminder, and settings copy avoid diagnosis, treatment advice, emergency advice, veterinary decision-making, real sharing/export claims, official passport replacement claims, and other out-of-scope behavior.
- Record validation evidence in this task and create or update `spec/validation/dashboard-skeleton-validation-evaluation.md` when using the evaluator flow.
- Update `spec/handoff.md` with validation status, remaining gaps, and the recommended next implementation task.

## Non-Goals

- No implementation changes beyond small test, copy, or documentation fixes discovered during validation.
- No performance/load testing.
- No new product behavior, database migrations, route handlers, shared contracts, packages, or durable architecture changes.
- No real document upload, OCR, extraction, reminder scheduling, notification delivery, AI answers, generated medical guidance, sharing links, PDF export, caregiver permissions, account data-rights workflows, clinic/provider workflows, marketplace, booking, payment, calendar sync, or official passport replacement behavior.
- No release approval, merge approval, deployment approval, or roadmap scope movement.

## Acceptance Criteria

- Focused account/app tests pass or any failure is recorded with cause.
- `pnpm --filter web test`, `pnpm --filter web lint`, and `pnpm build` pass or any unavailable/failing check is recorded with cause.
- Authenticated browser checks cover `/app` after successful seeded login on desktop and mobile widths.
- Browser checks cover Home dashboard, first-run onboarding mode, section navigation, Pets profile read/save/reload, language switching, logout or auth gating, and disabled/preview-only unavailable actions.
- Desktop and mobile checks show no horizontal document overflow, incoherent overlaps, or clipped primary text.
- Scope-safety copy is reviewed against `spec/product-context.md` and `spec/roadmap.md`.
- Validation does not mark any feature accepted, released, merged, deployed, or complete without human approval.
- `spec/handoff.md` records validation status, remaining gaps, and the recommended next implementation task.

## Implementation Notes

- Use the smallest meaningful validation first, then broaden if dashboard implementation touched shared components.
- Prefer existing demo account and local Supabase seed behavior for authenticated browser checks.
- Reuse existing validation evidence from:
  - `spec/validation/first-run-onboarding-skeleton-evaluation.md`
  - `spec/validation/home-dashboard-skeleton-evaluation.md`
  - `spec/validation/app-section-empty-states-evaluation.md`
  - `spec/validation/pet-profile-foundation-evaluation.md`
- If local Supabase, browser automation, or network-dependent build tooling is unavailable in the sandbox, record the failure and rerun outside the sandbox only through the normal approval path.
- Treat `pnpm test:e2e` as optional unless the existing E2E setup can run without broad repair work; this task is satisfied by focused authenticated Playwright/browser checks when they cover the acceptance criteria.
- Do not mark the feature accepted or released without human approval.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Validation notes:

- Forge validation artifact: `spec/validation/dashboard-skeleton-validation-evaluation.md`
- Fresh validation verdict: Pass.
- Implemented on 2026-06-06 on branch `codex/dashboard-skeleton-validation`.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts` from repository root; 2 files and 26 tests passed.
- Initial focused root Vitest command failed for `AccountApp.test.tsx` because the root invocation did not use the web app JSX/Vite config; rerunning from `apps/web` was the correct path.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web`; 2 files and 14 tests passed.
- Passed: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 53 tests passed and 1 skipped.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved rerun outside the sandbox passed.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved rerun outside the sandbox passed.
- Passed: `git diff --check`.
- Sandboxed `supabase status --workdir infra` failed because the Supabase CLI attempted to write telemetry under `/Users/macg/.supabase`, which the sandbox blocks. Approved `./scripts/start.sh` outside the sandbox passed, applied local migrations through `20260605150000_enforce_unique_owner_households.sql`, seeded data, and synced env values.
- Started the local web app with `pnpm --filter web dev` at `http://localhost:3000`.
- Sandboxed Playwright smoke failed because Chromium could not launch under the macOS sandbox. Approved Playwright smoke outside the sandbox passed after temporary-script selector hardening.
- Authenticated desktop/mobile Playwright smoke confirmed seeded login, Home dashboard, first-run onboarding preservation, disabled preview actions, section safety copy, Pets profile save/reload persistence for `Bruno Validation 1780732729692`, Polish/English switching, no console/page errors, and zero horizontal document overflow.
- Screenshots captured outside the repo:
  - `/private/tmp/caniello-dashboard-validation-desktop.png`
  - `/private/tmp/caniello-dashboard-validation-mobile.png`
- `pnpm test:e2e` was not run; focused authenticated Playwright browser validation covered the task acceptance criteria.
- Forge evaluator rerun on 2026-06-06 passed `git diff --check`, focused account/pet tests from `apps/web`, and focused contracts/db tests from the repository root. The evaluator did not rerun browser automation because no product code changed after the implementation browser pass.

## Handoff Notes

Implemented as a validation-only checkpoint. No product behavior, migrations, route handlers, shared contracts, packages, release approval, merge approval, deployment approval, or roadmap scope movement were added.

Human accepted this documentation on 2026-06-06. This acceptance does not create a release, deployment, or roadmap scope change.

Recommended next task: plan exactly one MVP Foundation slice, with reminders foundation or document vault foundation as the strongest candidates.
