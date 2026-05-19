# Validation: Milestone 2 Platform Foundation

## Status

Accepted

## Scope

Validation of the Milestone 2 local platform foundation implementation: lightweight Next.js health/version API routes, shared health/version contracts, Supabase configuration helpers, environment placeholders, and the first Supabase migration skeleton with RLS enabled for private owner data tables.

## Source Artifacts

- `spec/plans/caniello-mvp-implementation-roadmap.md`
- `spec/requirements/owner-facing-mvp.md`
- `spec/features/owner-account-privacy-foundation.md`
- `spec/features/pet-onboarding-and-workspace.md`
- `spec/stories/account-signup-login-and-session.md`
- `spec/stories/create-first-pet-profile.md`
- `spec/architecture/local-development.md`
- `spec/architecture/mvp-target-architecture.md`
- `spec/architecture-records/0013-use-vercel-nextjs-platform-topology.md`
- `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`
- `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`
- `apps/web/app/api/health/route.ts`
- `apps/web/app/api/version/route.ts`
- `packages/contracts/src/index.ts`
- `packages/db/src/index.ts`
- `infra/supabase/migrations/20260519000100_mvp_foundation.sql`
- `.env.example`

## Preconditions

- The human explicitly asked Codex to implement the next MVP roadmap points.
- The accepted roadmap identifies Milestone 2 as the next product-app foundation slice after Milestone 1 ADR acceptance.
- The repository is on feature branch `codex/milestone-2-platform-foundation`.
- Existing landing behavior remains in the Next.js App Router app under `apps/web`.

## Acceptance Criteria Mapping

- Criterion: `GET /api/health` in the Next.js app returns HTTP 200.
  Evidence status: Supported
  Evidence: `apps/web/app/api/health/route.ts` returns a no-store JSON health payload. `apps/web/app/api/health/route.test.ts` verifies status 200, `Cache-Control: no-store`, service name, and ISO timestamp. `pnpm test` passed.

- Criterion: `GET /api/version` exposes lightweight public version metadata without secrets.
  Evidence status: Supported
  Evidence: `apps/web/app/api/version/route.ts` returns app, package version, optional Vercel commit, and optional environment. `apps/web/app/api/version/route.test.ts` verifies the response shape and no-store behavior. `pnpm build` lists `/api/version` as a dynamic route.

- Criterion: Shared payload schemas and API contracts live in `packages/contracts`.
  Evidence status: Supported
  Evidence: `packages/contracts/src/index.ts` exports `healthPayloadSchema`, `versionPayloadSchema`, `createHealthPayload`, and `createVersionPayload`. Contract tests pass in `packages/contracts/src/index.test.ts`.

- Criterion: Supabase helpers are centralized in `packages/db` instead of scattering raw configuration in UI components.
  Evidence status: Supported
  Evidence: `packages/db/src/index.ts` reads browser-safe public config separately from the server-only service-role key and builds stable REST/Storage URLs. `packages/db/src/index.test.ts` verifies complete, incomplete, and service-role config behavior.

- Criterion: Local environment examples document non-secret placeholders for platform services.
  Evidence status: Supported
  Evidence: `.env.example` now includes Supabase public URL, anon key, server-only service role key, public app URL, Vercel metadata, MailerLite settings, deferred Stripe placeholders, and analytics placeholder.

- Criterion: The first Supabase migration covers user/profile references, households, pets, documents, extracted fields, timeline events, reminders, share links, audit logs, and processing jobs at a minimal level.
  Evidence status: Partially Supported
  Evidence: `infra/supabase/migrations/20260519000100_mvp_foundation.sql` creates households with owner user references, pets, documents, document processing jobs, extracted fields, timeline events, reminders, share links, and audit logs. A separate profile table is not created in this slice; owner identity references use `auth.users(id)` directly per the minimal Supabase Auth baseline.

- Criterion: RLS policy skeletons exist before exposing private pet, document, reminder, account, or sharing data.
  Evidence status: Supported
  Evidence: The migration enables RLS on all foundation tables and adds owner-scoped policies for households, pets, documents, extracted fields, timeline events, reminders, share links, owner-readable processing jobs, and owner-readable audit logs. The db test verifies each foundation table has RLS enabled.

- Criterion: Existing landing behavior remains intact.
  Evidence status: Supported
  Evidence: `pnpm test:e2e` passed 12 Playwright checks across desktop and mobile for direct URLs, scroll reset, consent-gated waitlist forms, Polish-first language behavior, and research pages.

## Checks

- Check: `pnpm test`
  Type: Automated
  Status: Passed
  Expected result: Workspace Vitest suites pass, including new contracts, web API route, db helper, and migration presence tests.
  Actual result: 9 Turborepo tasks succeeded. Contracts tests: 6 passed. DB tests: 5 passed. Web tests: 6 files and 27 tests passed.

- Check: `pnpm lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation passes across workspace packages and apps.
  Actual result: 7 Turborepo tasks succeeded.

- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Expected result: Workspace package builds and Next.js production build pass.
  Actual result: 7 Turborepo tasks succeeded. Next.js compiled successfully and listed `/api/health` and `/api/version` as dynamic routes.

- Check: `pnpm test:e2e`
  Type: UI
  Status: Passed
  Expected result: Existing landing E2E checks remain green after platform foundation changes.
  Actual result: 12 Playwright tests passed across desktop and mobile Chromium.

- Check: Supabase local stack start and migration apply
  Type: Operational
  Status: Skipped
  Expected result: `pnpm exec supabase start --workdir infra/supabase` starts local services and the migration applies cleanly.
  Actual result: Not run in this implementation pass because starting local Docker-backed Supabase services is operationally heavier than the requested code slice and may require host Docker availability. Migration structure and RLS presence were validated by automated file-level tests.

- Check: `pnpm validation:platform-foundation`
  Type: Automated
  Status: Passed
  Expected result: Focused lifecycle gate runs health/version contract tests, health/version API route tests, Supabase helper and migration baseline tests, static migration/RLS coverage, and environment hygiene checks.
  Actual result: Gate passed. Contracts: 1 file and 6 tests passed. Web API routes: 2 files and 2 tests passed. DB package: 1 file and 5 tests passed. Static migration/RLS and environment hygiene checks passed.

## Evidence

- Branch: `codex/milestone-2-platform-foundation`
- `apps/web/app/api/health/route.ts` implements `GET /api/health`.
- `apps/web/app/api/version/route.ts` implements `GET /api/version`.
- `packages/contracts/src/index.ts` exports health and version schemas/helpers.
- `packages/db/src/index.ts` centralizes Supabase config reading and endpoint URL construction.
- `infra/supabase/migrations/20260519000100_mvp_foundation.sql` creates foundation tables and RLS policy skeletons.
- `.env.example` documents platform environment placeholders.
- Automated validation commands passed: `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm test:e2e`.
- Lifecycle gate command passed: `pnpm validation:platform-foundation`.
- `.github/workflows/ci.yml` runs `pnpm validation:platform-foundation` in CI after `pnpm validation:mailerlite-integration`.
- `scripts/platform-foundation-gate.mjs` implements focused API route, contract, DB helper, migration/RLS, and environment hygiene checks.

## Missing, Skipped, or Unavailable Checks

- Check: Apply migration to a clean Supabase local database.
  Reason: Supabase local services were not started during this pass.
  Risk: SQL syntax or Supabase CLI compatibility issues could remain despite file-level tests and TypeScript validation.

- Check: Live `/api/health` and `/api/version` HTTP smoke through a running dev server.
  Reason: Route handlers were covered by Vitest and Next.js production build, but no manual server smoke was run.
  Risk: Low; Next.js build recognized both dynamic routes, and route tests executed the handlers directly.

## Future CI/CD or Lifecycle Gates

- Gate: API health/version route test
  Trigger: Every web test run and `pnpm validation:platform-foundation`.
  Blocks: Merge if route response shape, status, or no-store behavior regresses.
  Implementation: `scripts/platform-foundation-gate.mjs` runs focused web route tests for `/api/health` and `/api/version`.

- Gate: Migration apply check
  Trigger: Every Supabase schema change and before collecting health-record uploads from beta users.
  Blocks: Release if migrations cannot apply to a clean local database.
  Implementation: Static migration/RLS coverage now runs in `pnpm validation:platform-foundation`; live Supabase apply remains a future operational gate.

- Gate: RLS coverage check
  Trigger: Every private-data table addition or policy change.
  Blocks: Release if private tables lack RLS or owner-scoped policies.
  Implementation: `scripts/platform-foundation-gate.mjs` checks foundation table creation, RLS enablement, `auth.users` references, and `auth.uid()` owner scoping.

- Gate: Environment hygiene check
  Trigger: Every platform configuration change.
  Blocks: Release if server-only keys are exposed through public `NEXT_PUBLIC_*` variables or browser code.
  Implementation: `scripts/platform-foundation-gate.mjs` verifies service-role placeholder hygiene and rejects `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` references in app/package code.

## Result

Ready for human review

## Follow-Up

- Run `pnpm exec supabase start --workdir infra/supabase` and apply migrations when the next slice begins using local Supabase services directly.
- Add the Supabase client dependency and authenticated server/client helpers in the auth or first-pet story slice, rather than in this foundation-only pass.
- Decide whether a separate owner profile table is needed before account settings and data export/deletion work begins.

## Human Decision

Accepted
