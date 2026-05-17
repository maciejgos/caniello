# Migrate Caniello MVP to the Next.js monorepo architecture

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. Keep this file self-contained so a fresh Codex agent or a human novice can understand the intended implementation sequence without reading prior chat.

## Purpose / Big Picture

Caniello has a working React/Vite landing page and two serverless API endpoints, but the accepted MVP architecture now requires a TypeScript-first monorepo. After this migration, a contributor can run the landing page from `apps/web` as a Next.js App Router application, keep MailerLite and validation events inside Next.js API routes, share API contracts from `packages/contracts`, and use pnpm workspaces plus Turborepo as the project standard. The visible behavior should remain the same: Polish-first landing copy, English switching, consent-gated waitlist capture, UTM attribution, legal pages, future-wave research pages, and validation events after analytics consent.

## Progress

- [x] (2026-05-17T09:05Z) Created branch `codex/nextjs-monorepo-migration`.
- [x] (2026-05-17T09:20Z) Added monorepo workspace skeleton with `apps/web`, `apps/mobile`, `packages/*`, and `infra/supabase`.
- [x] (2026-05-17T09:35Z) Migrated the landing UI into `apps/web/features/marketing` and added App Router pages under `apps/web/app/(marketing)`.
- [x] (2026-05-17T09:45Z) Replaced React Router usage with Next.js links and route props while preserving scroll-to-top behavior.
- [x] (2026-05-17T10:00Z) Moved lead capture and validation-event contracts into `packages/contracts` and added Next.js API routes under `apps/web/app/api/*`.
- [x] (2026-05-17T10:15Z) Added Dev Container, Docker Compose workspace service, Supabase local placeholders, `.env.example`, and Vercel monorepo config.
- [x] (2026-05-17T10:25Z) Marked the old FastAPI roadmap path as superseded by ADR 0001-0011.
- [x] (2026-05-17T10:35Z) Discovered Supabase CLI cannot be installed globally through npm and moved it to root dev dependencies for `pnpm exec supabase`.
- [x] (2026-05-17T10:45Z) Switched the workspace image to the official Playwright Noble base so browser E2E dependencies are present in the reproducible container.
- [x] (2026-05-17T10:50Z) Generated `pnpm-lock.yaml`, installed dependencies, and removed root npm/Vite entrypoints, root `api/`, root `src/`, and `package-lock.json`.
- [x] (2026-05-17T11:05Z) Ran `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` through the Dockerized workspace.
- [x] (2026-05-17T11:10Z) Recorded validation evidence in `spec/validation/caniello-mvp-nextjs-monorepo-migration-validation.md`.

## Surprises & Discoveries

- Observation: The host environment initially did not provide `pnpm` or `corepack`.
  Evidence: `pnpm --version` and `corepack --version` both returned `command not found`.

- Observation: The existing `node_modules` did not include Next.js or Turbo.
  Evidence: checks for `node_modules/next` and `node_modules/turbo` returned missing directories.

- Observation: Supabase CLI cannot be installed globally as an npm package.
  Evidence: `docker compose build workspace` failed at `npm install -g ... supabase@latest ...` with `Installing Supabase CLI as a global module is not supported.`

- Observation: The generic Node Dev Container image does not include the browser system libraries Playwright needs.
  Evidence: after `pnpm exec playwright install chromium`, Playwright reported missing packages such as `libnspr4`, `libnss3`, `libatk1.0-0`, `libgbm1`, and `libxrandr2`.

- Observation: Turborepo strict environment handling did not pass `PLAYWRIGHT_BROWSERS_PATH` to the Playwright task by default.
  Evidence: `pnpm test:e2e` initially looked for Chromium under `/root/.cache/ms-playwright` even though the Playwright image exposed browsers under `/ms-playwright`; adding `globalPassThroughEnv` for `PLAYWRIGHT_BROWSERS_PATH` fixed the browser lookup.

- Observation: Next.js 16 dev mode injects a dev tools button whose accessible name contains `EN`, conflicting with the existing language-switch Playwright locator.
  Evidence: Playwright strict mode reported two matching buttons for `getByRole("button", { name: "EN" })`; setting `devIndicators: false` removed the dev-only control and preserved the production-visible UI.

## Decision Log

- Decision: Keep the landing page as a marketing feature under `apps/web/features/marketing` instead of scattering components directly in `app/`.
  Rationale: The existing landing slice is a coherent behavior cluster with copy, hooks, assets, components, tests, and client-side form behavior. Keeping it together preserves testability while still letting App Router own URLs and API routes.
  Date/Author: 2026-05-17 / Codex

- Decision: Use Next.js API routes in `apps/web/app/api/*` and shared Zod schemas from `packages/contracts`.
  Rationale: ADR 0003 keeps landing and API in one Next.js project. Zod schemas provide a shared contract for consent, source, UTM, and validation-event payloads without exposing MailerLite secrets to browser code.
  Date/Author: 2026-05-17 / Codex

- Decision: Keep `apps/mobile` minimal for this migration.
  Rationale: ADR 0007 chooses Expo for mobile, but the current execution stream is repository architecture and web/API migration. A minimal workspace package proves monorepo shape without starting mobile product work prematurely.
  Date/Author: 2026-05-17 / Codex

- Decision: Install Supabase CLI as a workspace dev dependency and run it with `pnpm exec supabase`.
  Rationale: The CLI rejects global npm installs. Keeping it in the committed workspace dependency graph makes the Dev Container reproducible after `pnpm install`.
  Date/Author: 2026-05-17 / Codex

- Decision: Base the workspace container on `mcr.microsoft.com/playwright:v1.60.0-noble`.
  Rationale: Browser validation is an explicit quality gate for this UI. The Playwright image already carries the needed Chromium runtime dependencies, reducing setup drift compared with installing browser libraries in an ephemeral run container.
  Date/Author: 2026-05-17 / Codex

- Decision: Pass `PLAYWRIGHT_BROWSERS_PATH` through Turborepo and disable Next dev indicators during local development.
  Rationale: The Playwright image stores browsers in `/ms-playwright`, and Turborepo otherwise hides that environment variable from tasks. The Next dev indicator is not part of the product UI and interfered with strict accessibility locators in E2E.
  Date/Author: 2026-05-17 / Codex

## Outcomes & Retrospective

Completed implementation validation on 2026-05-17. The repository now has a runnable Next.js web app under `apps/web`, a pnpm/Turborepo workspace, baseline shared packages, Supabase local placeholders, Dev Container support, and Vercel configuration for one web project. The migrated landing and API behavior passed lint, unit/contract/server tests, build, and Playwright E2E. Remaining follow-up work is outside this migration: validating real Supabase local services when schema/RLS work begins, and performing a live MailerLite smoke test only with explicit human approval.

## Context and Orientation

The repository previously had a root Vite app in `src/`, root serverless endpoint files in `api/`, root Vite/Tailwind/PostCSS configs, `package-lock.json`, and npm scripts. The accepted architecture decisions in `spec/architecture-records/0001-use-typescript-nextjs-monorepo.md` through `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md` now govern implementation. In plain terms, a monorepo means one repository containing multiple applications and shared packages. App Router means Next.js uses folders under `app/` to define pages and API routes. Turborepo runs package scripts across the workspace. Supabase CLI is the local development foundation for the future database, authentication, storage, and row-level security work.

The important new paths are:

- `apps/web`: the Next.js web application and the only Vercel project root for the MVP.
- `apps/web/app/(marketing)`: route files for `/`, `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, and `/clinics`.
- `apps/web/app/api/landing-leads/route.ts`: the server boundary for consented MailerLite waitlist submissions.
- `apps/web/app/api/validation-events/route.ts`: the server boundary for analytics consent and validation events.
- `apps/web/features/marketing`: the migrated landing page components, copy, hooks, assets, client libraries, server helpers, and tests.
- `packages/contracts`: shared Zod schemas and TypeScript types for API payloads.
- `packages/domain`, `packages/application`, `packages/db`, `packages/ui`, `packages/config`: baseline shared packages for later MVP work.
- `infra/supabase`: local Supabase CLI configuration, migrations folder, and seed file.

## Plan of Work

First, create the feature branch and update the planning artifacts so the active implementation path is unambiguous. The old roadmap should state that FastAPI, a separate API project, and Back Office are superseded for MVP by ADR 0001-0011.

Second, establish the workspace skeleton. Add `pnpm-workspace.yaml`, `turbo.json`, root package scripts, package manifests, TypeScript base config, the web app package, minimal mobile package, shared package placeholders, and Supabase directories.

Third, migrate the landing UI to Next.js. Copy the existing landing components, pages, hooks, content, and assets into `apps/web/features/marketing`; replace React Router with Next.js links and route props; create App Router pages for each public route; and preserve redirects for legacy Wave URLs.

Fourth, migrate API routes. Move validation and MailerLite behavior into server helper modules under `apps/web/features/marketing/server`, expose them through `apps/web/app/api/*/route.ts`, and put payload schemas in `packages/contracts`.

Fifth, add local development and deployment alignment. Add Dev Container files, Docker Compose workspace service, `.env.example`, Supabase CLI placeholders, and Vercel config pointing at `apps/web`.

Finally, install dependencies through pnpm and run validation. If dependency installation is blocked by network restrictions, request approval to run the install with network access and record the blocked command.

## Concrete Steps

Run commands from `/Users/macg/Code/caniello` unless a command states another directory.

1. Confirm branch and worktree:

       git branch --show-current
       git status --short

   Expect the branch to be `codex/nextjs-monorepo-migration`.

2. Install workspace dependencies:

       pnpm install

   Expect a `pnpm-lock.yaml` file and workspace linking for `web`, `mobile`, and `@caniello/*` packages. If `pnpm` is unavailable, install it with the project-approved version `9.15.4`.

3. Verify workspace visibility:

       pnpm list --depth -1
       pnpm turbo --version

4. Run validation:

       pnpm lint
       pnpm test
       pnpm build
       pnpm test:e2e

   `pnpm test:e2e` starts the Next.js dev server on `http://127.0.0.1:3000` and runs Playwright against the landing routes.

5. Start the app manually when needed:

       pnpm dev

   Open `http://localhost:3000`. The first viewport should show the Caniello landing page in Polish. The language switch should persist English in local storage. `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, and `/clinics` should load directly.

6. Start Supabase locally when data/auth/storage work begins:

       pnpm exec supabase start --workdir infra/supabase

## Validation and Acceptance

Validation passes when:

- `pnpm install` creates a reproducible `pnpm-lock.yaml`.
- `pnpm lint` and `pnpm build` type-check the root workspace, packages, and `apps/web`.
- `pnpm test` passes the migrated React Testing Library tests, server boundary tests, and contract tests.
- `pnpm test:e2e` passes Playwright checks for direct URLs, route scroll reset, Polish-first landing, language switching, consent-gated lead forms, legal links, marketplace research page, clinic research page, and validation events after analytics consent.
- Manual browsing to `http://localhost:3000` shows the existing landing behavior under Next.js.
- The root no longer contains the old Vite entrypoint, root `api/` endpoints, or `package-lock.json`.

## Idempotence and Recovery

Most steps are safe to repeat. Running `pnpm install` again should refresh workspace links without changing source files except `pnpm-lock.yaml` when dependency versions legitimately change. Running validation commands repeatedly should not mutate tracked files except Playwright screenshot output when failures or configured screenshots occur.

If dependency installation fails because the sandbox cannot reach the registry, rerun the same install command with approved network escalation rather than editing lockfiles by hand. If a Next.js build fails because a migrated component still assumes Vite asset semantics, update that component to read `StaticImageData.src` or use `next/image`. If Playwright cannot launch browsers locally, run the check from the project container or install Playwright browsers through the documented Playwright command.

## Artifacts and Notes

Important implementation artifacts:

    pnpm-workspace.yaml
    turbo.json
    apps/web/package.json
    apps/web/app/(marketing)/page.tsx
    apps/web/features/marketing/MarketingApp.tsx
    apps/web/app/api/landing-leads/route.ts
    apps/web/app/api/validation-events/route.ts
    packages/contracts/src/index.ts
    .devcontainer/devcontainer.json
    infra/supabase/config.toml
    vercel.json

## Interfaces and Dependencies

The root package uses `pnpm@9.15.4` and Turborepo. The web app uses Next.js, React, TailwindCSS, Vitest, React Testing Library, Playwright, Vercel Analytics, Vercel Speed Insights, and Zod. `packages/contracts` exports `landingLeadPayloadSchema`, `validationEventPayloadSchema`, their TypeScript types, and the allowed source/event values. The MailerLite boundary accepts only consented lead payloads and upserts the submitted email into the configured MailerLite group. The validation-event boundary accepts only known event names and returns HTTP 202 for accepted events.

Change note: Created on 2026-05-17 to execute the user-requested migration from the current Vite/npm landing repo to the ADR 0001-0011 Next.js, pnpm, Turborepo, Supabase-ready monorepo architecture.
