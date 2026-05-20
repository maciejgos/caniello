# Validation: Caniello MVP Next.js Monorepo Migration

## Status

Accepted

## Scope

This validation reviews the migration from the root React/Vite/npm landing app and root `api/` endpoints into the ADR 0001-0011 TypeScript-first monorepo. The validated outcome is a pnpm/Turborepo workspace with `apps/web` as a Next.js App Router app, minimal `apps/mobile`, baseline `packages/*`, Supabase local placeholders, Dev Container support, Vercel alignment to one web project, and preserved landing/API behavior.

## Source Artifacts

- `spec/plans/completed-foundation-plans.md`
- `spec/plans/caniello-mvp-implementation-roadmap.md`
- `spec/architecture-records/0001-use-typescript-nextjs-monorepo.md`
- `spec/architecture-records/0002-use-caniello-monorepo-directory-standard.md`
- `spec/architecture-records/0003-keep-landing-app-and-api-in-one-nextjs-project.md`
- `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`
- `spec/architecture-records/0005-deploy-web-on-vercel.md`
- `spec/architecture-records/0006-use-pnpm-workspaces-and-turborepo.md`
- `spec/architecture-records/0007-use-react-native-expo-for-mobile.md`
- `spec/architecture-records/0008-use-mvp-product-tooling-baseline.md`
- `spec/architecture-records/0009-use-one-vercel-project-for-mvp.md`
- `spec/architecture-records/0010-use-dev-containers-for-local-development.md`
- `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- `apps/web/app/(marketing)/page.tsx`
- `apps/web/features/marketing/MarketingApp.tsx`
- `apps/web/app/api/landing-leads/route.ts`
- `apps/web/app/api/validation-events/route.ts`
- `packages/contracts/src/index.ts`
- `infra/supabase/config.toml`
- `.github/workflows/ci.yml`
- `scripts/pdlc-lifecycle-gate.mjs`

## Preconditions

The implementation branch is `codex/nextjs-monorepo-migration`. Dependencies were installed through the Dockerized workspace with `pnpm install`, producing `pnpm-lock.yaml`. The current workspace image is based on standard `node:24-bookworm` and installs Playwright Chromium plus browser system dependencies during image build.

## Acceptance Criteria Mapping

- Criterion: The repository has a pnpm/Turborepo monorepo skeleton with `apps/*`, `packages/*`, and `infra/supabase`.
  Evidence status: Supported
  Evidence: `pnpm-workspace.yaml`, `turbo.json`, `apps/web`, `apps/mobile`, `packages/contracts`, `packages/domain`, `packages/application`, `packages/db`, `packages/ui`, `packages/config`, and `infra/supabase` exist.

- Criterion: The landing page runs from Next.js under `apps/web` while preserving Polish-first copy, English switch, consent-gated lead capture, UTM handling, legal routes, marketplace route, and clinics route.
  Evidence status: Supported
  Evidence: `pnpm test` passed 10 migrated marketing component tests; `pnpm test:e2e` passed 12 Playwright tests across desktop and mobile Chromium.

- Criterion: MailerLite lead capture and validation events move to Next.js API routes with shared contracts.
  Evidence status: Supported
  Evidence: `apps/web/app/api/landing-leads/route.ts`, `apps/web/app/api/validation-events/route.ts`, and `packages/contracts/src/index.ts`; `pnpm test` passed server tests for consent blocking, segmentation rejection, MailerLite group upsert, missing group failure, and validation-event payload validation.

- Criterion: The MVP path no longer treats FastAPI, a separate API project, or Back Office as active MVP implementation scope.
  Evidence status: Supported
  Evidence: `spec/plans/caniello-mvp-implementation-roadmap.md` now states that the older FastAPI and Back Office path is superseded by ADR 0001-0011, and the new migration ExecPlan defines Next.js API routes and Supabase as the active foundation.

- Criterion: Local development and deployment docs identify pnpm, Dev Container, Supabase local foundation, Next.js port `3000`, and Vercel Root Directory `apps/web`.
  Evidence status: Supported
  Evidence: `README.md`, `AGENTS.md`, `.devcontainer/devcontainer.json`, `.devcontainer/Dockerfile`, `docker-compose.yml`, `.env.example`, `infra/supabase/config.toml`, and `vercel.json`.

## Checks

- Check: `docker compose build workspace`
  Type: Automated
  Status: Passed
  Expected result: The workspace image builds reproducibly.
  Actual result: Passed after switching to a standard Node LTS base image and installing Docker CLI, global `pnpm`, `turbo`, `vercel`, and Playwright Chromium dependencies.

- Check: `docker compose run --rm workspace pnpm install`
  Type: Automated
  Status: Passed
  Expected result: Workspace dependencies install and `pnpm-lock.yaml` is generated.
  Actual result: Passed. Supabase CLI installed as a workspace dev dependency and completed its postinstall download.

- Check: `docker compose run --rm workspace pnpm lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation passes across workspace packages and apps.
  Actual result: Passed after adding Node types to `packages/db` and setting `ignoreDeprecations` for TypeScript 6.

- Check: `docker compose run --rm workspace pnpm test`
  Type: Automated
  Status: Passed
  Expected result: Unit, contract, and server tests pass.
  Actual result: Passed. Web reported 4 test files and 19 tests passing; contracts reported 3 tests passing.

- Check: `docker compose run --rm workspace pnpm build`
  Type: Automated
  Status: Passed
  Expected result: Next.js and packages build/type-check successfully.
  Actual result: Passed. Next.js generated static pages for `/`, `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, `/clinics`, and dynamic API routes for `/api/landing-leads` and `/api/validation-events`.

- Check: `docker compose run --rm workspace pnpm test:e2e`
  Type: UI
  Status: Passed
  Expected result: Playwright validates direct routes, scroll reset, forms, consent, language switching, validation events, marketplace, and clinics flows on desktop and mobile.
  Actual result: Passed with 12 tests passing after passing `PLAYWRIGHT_BROWSERS_PATH` through Turborepo and disabling the Next dev indicator for E2E strict locators.

- Check: `docker compose run --rm workspace node scripts/pdlc-lifecycle-gate.mjs`
  Type: Automated
  Status: Passed
  Expected result: Changed validation, release-readiness, and lifecycle checkpoint artifacts cannot silently move to accepted or terminal status without a human decision or checkpoint section.
  Actual result: Passed locally in the Docker workspace after adding `.github/workflows/ci.yml`, `scripts/pdlc-lifecycle-gate.mjs`, and `pnpm pdlc:lifecycle-gate`.

## Evidence

Command evidence:

- `docker compose build workspace`: passed.
- `docker compose run --rm workspace pnpm install`: passed and generated `pnpm-lock.yaml`.
- `docker compose run --rm workspace pnpm lint`: passed with 7 successful tasks.
- `docker compose run --rm workspace pnpm test`: passed with 9 successful tasks; web had 19 passing tests.
- `docker compose run --rm workspace pnpm build`: passed with 7 successful tasks.
- `docker compose run --rm workspace pnpm test:e2e`: passed with 12 Playwright tests.
- `docker compose run --rm workspace node scripts/pdlc-lifecycle-gate.mjs`: passed and checked changed checkpoint artifacts.

UI screenshot evidence was refreshed under `spec/validation/screenshots/` for the landing success flows generated by the Playwright run.

## Missing, Skipped, or Unavailable Checks

- Check: `pnpm exec supabase start --workdir infra/supabase`
  Reason: The migration creates the Supabase CLI foundation and config placeholders, but no data model, migrations, or RLS policy work is in scope for this ExecPlan.
  Risk: Local Supabase service behavior is not yet validated; this should be covered by the first data/auth/storage ExecPlan.

- Check: Live MailerLite smoke test against the real group.
  Reason: Automated tests use mocked `fetch` and do not create real subscribers.
  Risk: Production credentials or MailerLite account configuration could still fail at deployment time.

## Future CI/CD or Lifecycle Gates

- Gate: GitHub Actions pnpm/Turborepo CI
  Trigger: Every pull request and before release readiness.
  Blocks: Merge or release readiness when TypeScript, unit tests, contract tests, or Next.js build fail.
  Implementation: `.github/workflows/ci.yml` runs `pnpm lint`, `pnpm test`, and `pnpm build` after `pnpm install --frozen-lockfile`.

- Gate: GitHub Actions Playwright E2E
  Trigger: Every pull request that changes `apps/web`, shared contracts, routing, landing forms, API routes, or UI assets.
  Blocks: Merge or release readiness when browser flows fail on desktop or mobile.
  Implementation: `.github/workflows/ci.yml` installs Chromium with Playwright and runs `pnpm test:e2e`.

- Gate: Supabase local start and migration validation
  Trigger: First data/auth/storage implementation.
  Blocks: Any release that depends on Supabase schema, auth, storage, or row-level security.

- Gate: No self-approval check for PDLC artifacts
  Trigger: Validation and release-readiness artifact updates.
  Blocks: Marking validation, release, or lifecycle checkpoints accepted without explicit human instruction.
  Implementation: `.github/workflows/ci.yml` runs `node scripts/pdlc-lifecycle-gate.mjs` against changed checkpoint artifacts; local equivalent is `pnpm pdlc:lifecycle-gate` inside the workspace.

## Result

Ready for human review

This validation is ready for human review, but it is not accepted or complete until a human explicitly approves it.

## Follow-Up

- Validate `pnpm exec supabase start --workdir infra/supabase` when the first Supabase schema/RLS ExecPlan is implemented.
- Run a live MailerLite smoke test only with explicit approval and appropriate test data.
- Monitor the first hosted GitHub Actions run and record its result in the next release-readiness artifact.

## Human Decision

Accepted
