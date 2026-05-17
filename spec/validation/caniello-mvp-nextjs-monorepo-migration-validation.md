# Validation: Caniello MVP Next.js Monorepo Migration

## Status

Draft

## Scope

This validation reviews the migration from the root React/Vite/npm landing app and root `api/` endpoints into the ADR 0001-0011 TypeScript-first monorepo. The validated outcome is a pnpm/Turborepo workspace with `apps/web` as a Next.js App Router app, minimal `apps/mobile`, baseline `packages/*`, Supabase local placeholders, Dev Container support, Vercel alignment to one web project, and preserved landing/API behavior.

## Source Artifacts

- `spec/plans/caniello-mvp-nextjs-monorepo-migration.md`
- `spec/plans/caniello-mvp-implementation-roadmap.md`
- `docs/decisions/0001-use-typescript-nextjs-monorepo.md`
- `docs/decisions/0002-use-caniello-monorepo-directory-standard.md`
- `docs/decisions/0003-keep-landing-app-and-api-in-one-nextjs-project.md`
- `docs/decisions/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`
- `docs/decisions/0005-deploy-web-on-vercel.md`
- `docs/decisions/0006-use-pnpm-workspaces-and-turborepo.md`
- `docs/decisions/0007-use-react-native-expo-for-mobile.md`
- `docs/decisions/0008-use-mvp-product-tooling-baseline.md`
- `docs/decisions/0009-use-one-vercel-project-for-mvp.md`
- `docs/decisions/0010-use-dev-containers-for-local-development.md`
- `docs/decisions/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- `apps/web/app/(marketing)/page.tsx`
- `apps/web/features/marketing/MarketingApp.tsx`
- `apps/web/app/api/landing-leads/route.ts`
- `apps/web/app/api/validation-events/route.ts`
- `packages/contracts/src/index.ts`
- `infra/supabase/config.toml`

## Preconditions

The implementation branch is `codex/nextjs-monorepo-migration`. Dependencies were installed through the Dockerized workspace with `pnpm install`, producing `pnpm-lock.yaml`. The workspace image is based on `mcr.microsoft.com/playwright:v1.60.0-noble` so Playwright browser dependencies are available.

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
  Evidence: `README.md`, `AGENTS.md`, `.devcontainer/devcontainer.json`, `Dockerfile`, `docker-compose.yml`, `.env.example`, `infra/supabase/config.toml`, and `vercel.json`.

## Checks

- Check: `docker compose build workspace`
  Type: Automated
  Status: Passed
  Expected result: The workspace image builds reproducibly.
  Actual result: Passed after switching to the Playwright Noble base image and installing global `pnpm`, `turbo`, and `vercel`.

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

## Evidence

Command evidence:

- `docker compose build workspace`: passed.
- `docker compose run --rm workspace pnpm install`: passed and generated `pnpm-lock.yaml`.
- `docker compose run --rm workspace pnpm lint`: passed with 7 successful tasks.
- `docker compose run --rm workspace pnpm test`: passed with 9 successful tasks; web had 19 passing tests.
- `docker compose run --rm workspace pnpm build`: passed with 7 successful tasks.
- `docker compose run --rm workspace pnpm test:e2e`: passed with 12 Playwright tests.

UI screenshot evidence was refreshed under `spec/validation/screenshots/` for the landing success flows generated by the Playwright run.

## Missing, Skipped, or Unavailable Checks

- Check: `pnpm exec supabase start --workdir infra/supabase`
  Reason: The migration creates the Supabase CLI foundation and config placeholders, but no data model, migrations, or RLS policy work is in scope for this ExecPlan.
  Risk: Local Supabase service behavior is not yet validated; this should be covered by the first data/auth/storage ExecPlan.

- Check: Live MailerLite smoke test against the real group.
  Reason: Automated tests use mocked `fetch` and do not create real subscribers.
  Risk: Production credentials or MailerLite account configuration could still fail at deployment time.

## Future CI/CD or Lifecycle Gates

- Gate: `pnpm lint`, `pnpm test`, and `pnpm build`
  Trigger: Every pull request and before release readiness.
  Blocks: Merge or release readiness when TypeScript, unit tests, contract tests, or Next.js build fail.

- Gate: `pnpm test:e2e`
  Trigger: Every pull request that changes `apps/web`, shared contracts, routing, landing forms, API routes, or UI assets.
  Blocks: Merge or release readiness when browser flows fail on desktop or mobile.

- Gate: Supabase local start and migration validation
  Trigger: First data/auth/storage implementation.
  Blocks: Any release that depends on Supabase schema, auth, storage, or row-level security.

- Gate: No self-approval check for PDLC artifacts
  Trigger: Validation and release-readiness artifact updates.
  Blocks: Marking validation, release, or lifecycle checkpoints accepted without explicit human instruction.

## Result

Ready for human review

This validation is ready for human review, but it is not accepted or complete until a human explicitly approves it.

## Follow-Up

- Validate `pnpm exec supabase start --workdir infra/supabase` when the first Supabase schema/RLS ExecPlan is implemented.
- Run a live MailerLite smoke test only with explicit approval and appropriate test data.
- Consider adding CI configuration for pnpm/Turborepo and Playwright once the repository’s hosting workflow is chosen.

## Human Decision

Pending

