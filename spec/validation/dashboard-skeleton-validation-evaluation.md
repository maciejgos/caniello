# Dashboard Skeleton Validation Evaluation

## Summary

Task: `spec/tasks/dashboard-skeleton-validation.md`

Date: 2026-06-06

Verdict: Pass

The authenticated app foundation remains usable, safe, and aligned with `Now - MVP Foundation` after the dashboard skeleton, first-run onboarding, section empty states, and pet profile foundation work. Validation covered automated account/app behavior, web test suite, TypeScript lint, production build, authenticated desktop/mobile browser flows, pet profile save/reload persistence, language switching, disabled preview actions, and medical/scope boundary copy.

No product behavior, migrations, shared contracts, route handlers, packages, release approval, merge approval, deployment approval, or roadmap scope movement were added by this validation task.

## Scope Review

- Home dashboard remains a demo/skeleton surface with disabled Ask Caniello and sharing actions.
- First-run onboarding remains reachable and keeps upload/scan/document actions disabled.
- Section empty states remain inert or preview-only for Documents, Ask Caniello, Sharing, Settings, and other unimplemented sections.
- Pets now uses the approved pet profile foundation path; browser validation confirmed authenticated save and reload persistence through `/api/pets/profile`.
- Medical and legal copy continues to avoid diagnosis, treatment advice, emergency advice, veterinary decision-making, real sharing/export claims, and official EU pet passport replacement claims.
- The validation did not expand `Now` scope into live AI, uploads, OCR, reminders, notifications, sharing links, PDFs, caregiver permissions, account data-rights workflows, clinic/provider workflows, marketplace, booking, payments, or calendar sync.

## Source Artifacts Reviewed

- Task: `spec/tasks/dashboard-skeleton-validation.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Handoff: `spec/handoff.md`
- Prior validation artifacts:
  - `spec/validation/first-run-onboarding-skeleton-evaluation.md`
  - `spec/validation/home-dashboard-skeleton-evaluation.md`
  - `spec/validation/app-section-empty-states-evaluation.md`
  - `spec/validation/pet-profile-foundation-evaluation.md`

## Changed Files Reviewed

- `spec/tasks/dashboard-skeleton-validation.md`
- `spec/validation/dashboard-skeleton-validation-evaluation.md`
- `spec/handoff.md`

## Automated Checks

- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts` from repository root; 2 files and 26 tests passed.
- Initial focused account/server command from repository root failed for `AccountApp.test.tsx` because the root Vitest invocation did not use the web app JSX/Vite config; `pet-profile.test.ts` still passed in that run with 4 tests.
- Passed after using the correct web-app working directory: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web`; 2 files and 14 tests passed, with the existing localStorage experimental warning.
- Passed: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 53 tests passed and 1 skipped, with existing localStorage experimental warnings.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; approved rerun outside the sandbox passed.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; approved rerun outside the sandbox passed. Turbo reported 7 successful build tasks using cache replay, including the web Next.js production build.
- Passed: `git diff --check`.

## Browser Validation

Local service setup:

- Sandboxed `supabase status --workdir infra` failed because the Supabase CLI attempted to write telemetry under `/Users/macg/.supabase`, which the sandbox blocks.
- Approved `./scripts/start.sh` outside the sandbox passed. Local Supabase started, applied migrations through `20260605150000_enforce_unique_owner_households.sql`, seeded data, and synced local env values.
- `pnpm --filter web dev` started the web app at `http://localhost:3000`.

Browser checks:

- Initial sandboxed Playwright smoke failed because Chromium could not launch under the macOS sandbox due Mach port permission denial.
- Approved Playwright smoke outside the sandbox passed after selector hardening in the temporary smoke script.
- Desktop Chromium at 1440x1000 confirmed unauthenticated `/app` redirects to `/login`, seeded login succeeds, Home dashboard renders, disabled dashboard Ask/sharing actions stay disabled, first-run onboarding is reachable with disabled document actions, Pets profile saves through `PUT /api/pets/profile`, saved pet profile remains visible after reload, Documents/Ask/Sharing/Settings safety copy renders, English switching works, no console/page errors occur, and horizontal overflow is zero.
- Mobile Chromium at 390x900 confirmed seeded login succeeds, the saved pet profile remains visible from Pets, Ask Caniello safety copy renders, no console/page errors occur, and horizontal overflow is zero.

Screenshots:

- Desktop: `/private/tmp/caniello-dashboard-validation-desktop.png`
- Mobile: `/private/tmp/caniello-dashboard-validation-mobile.png`

Validated pet name:

- `Bruno Validation 1780732729692`

## Acceptance Criteria

- Focused account/app tests pass: Pass.
- `pnpm --filter web test`, `pnpm --filter web lint`, and `pnpm build` pass or failures are recorded: Pass, with sandbox failures and approved reruns recorded.
- Authenticated browser checks cover `/app` after seeded login on desktop and mobile widths: Pass.
- Browser checks cover Home dashboard, first-run onboarding mode, section navigation, Pets profile save/reload, language switching, auth gating, and disabled/preview-only actions: Pass.
- Desktop and mobile checks show no horizontal document overflow, incoherent overlaps, or clipped primary text: Pass by automated overflow checks and screenshot spot-check.
- Scope-safety copy is reviewed against `spec/product-context.md` and `spec/roadmap.md`: Pass.
- Validation does not mark any feature accepted, released, merged, deployed, or complete without human approval: Pass.
- `spec/handoff.md` records validation status, remaining gaps, and the recommended next implementation task: Pass after handoff update.

## Evaluator Rerun

The evaluator reran a focused practical subset on 2026-06-06 after reviewing the implementation artifact:

- Passed: `git diff --check`.
- Passed: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web`; 2 files and 14 tests passed, with the existing localStorage experimental warning.
- Passed: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts packages/db/src/index.test.ts` from repository root; 2 files and 26 tests passed.

The evaluator did not rerun browser automation because the implementation artifact already records an approved desktop/mobile Playwright pass after sandbox Chromium failure, the task changed only validation documentation after that pass, and no product code changed between implementation and evaluation.

## Findings

- P0: None.
- P1: None.
- P2: None.
- P3: The durable validation artifact originally had the core evidence but did not explicitly list source artifacts, changed files reviewed, or evaluator findings. This evaluator pass added those sections; no product behavior was affected.

## Known Gaps

- `pnpm test:e2e` was not run. The task treats it as optional unless the existing E2E setup can run without broad repair work, and the focused authenticated Playwright smoke covered the task acceptance criteria.
- The opt-in live Supabase RLS test was not rerun for this validation checkpoint because this task did not change pet profile authorization code. The latest pet-profile evaluator artifact already records that RLS test coverage.
- Browser validation required approved execution outside the sandbox because local Supabase and Chromium are blocked or partially blocked by sandbox permissions.

## Recommended Next Task

The next implementation task should be planned as exactly one MVP Foundation slice. The strongest candidates are either a reminders foundation task or a document vault foundation task; both should be scoped through `forge-planner` before implementation and must preserve the existing non-goals around live AI, provider workflows, marketplace, booking, payments, complex sharing, and official passport replacement claims.

## Human Decision

Accepted as documentation on 2026-06-06 by explicit human update. This acceptance does not create a release, deployment, or roadmap scope change.

## Approval Caveat

This evaluator verdict did not approve, merge, release, deploy, or move roadmap scope. Human acceptance applies to this documentation state only.
