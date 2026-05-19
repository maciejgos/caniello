# Completed Foundation ExecPlan Summaries

This file consolidates completed foundational ExecPlans that are no longer the active implementation handoff. It preserves the plan outcomes, validation trail, and follow-up context without requiring future agents to read obsolete step-by-step execution instructions.

## Status

Draft consolidation

Source ExecPlans referenced here recorded completed work and human-approved follow-on artifacts, but this consolidation file itself has not been separately approved by a human.

## Progress

- [x] (2026-05-09 to 2026-05-11) First landing page plan executed through a Vite, React, TypeScript, TailwindCSS, Docker, Vitest, and Playwright implementation.
- [x] (2026-05-12 to 2026-05-15) Landing Milestone 0 expanded the landing page into the segmented validation slice described in `spec/plans/caniello-mvp-implementation-roadmap.md`.
- [x] (2026-05-17) Next.js monorepo migration executed and validated, moving the active MVP path to `apps/web`, pnpm workspaces, Turborepo, shared packages, Supabase local placeholders, Dev Container support, and Vercel alignment.
- [x] (2026-05-19) Historical completed plan detail consolidated into this summary to reduce duplicate planning surface area.

## Surprises & Discoveries

- The original host environment lacked local Node tooling, so early landing validation used Docker and the official Playwright container.
- Vite direct URL and `host.docker.internal` behavior required explicit handling before browser validation stabilized.
- Human visual feedback changed the landing direction several times: Polish-first behavior, English mockup alignment, then restored Polish-first MVP scope with English switching.
- Supabase CLI rejected global npm installation during the monorepo migration, so it moved into workspace dev dependencies.
- Playwright browser dependencies were more reproducible from a standard Node Bookworm workspace image than from the earlier Alpine app container.
- Turborepo needed `PLAYWRIGHT_BROWSERS_PATH` passed through so E2E checks could use the installed browser path.

## Decision Log

- Decision: The first landing page started as a minimal Vite React implementation.
  Rationale: It was the smallest toolchain that could validate copy, layout, waitlist interest, Docker reproducibility, and browser behavior before broader product architecture was approved.
  Date/Author: 2026-05-09 / Codex

- Decision: The first landing page avoided persistent storage and analytics until explicit privacy and vendor decisions existed.
  Rationale: The first validation pass needed observable behavior without collecting personal data prematurely.
  Date/Author: 2026-05-09 / Codex

- Decision: The active MVP architecture moved from the Vite root app to a TypeScript-first Next.js monorepo.
  Rationale: ADR 0001 through ADR 0011 established the project-standard app, package, local development, deployment, and engineering foundation.
  Date/Author: 2026-05-17 / Codex

- Decision: The migrated landing app keeps marketing behavior under `apps/web/features/marketing`, with API contracts in `packages/contracts` and Next.js API routes under `apps/web/app/api/*`.
  Rationale: This keeps the landing slice cohesive while aligning route ownership, server boundaries, and shared payload schemas with the accepted monorepo architecture.
  Date/Author: 2026-05-17 / Codex

## Outcomes & Retrospective

The first landing page produced the initial Caniello web validation experience and proved local Docker, unit, build, and Playwright validation paths. Its detailed implementation instructions are now historical because the active app no longer lives in the root Vite layout.

The Next.js monorepo migration established the current repository shape: `apps/web`, `apps/mobile`, `packages/contracts`, `packages/domain`, `packages/application`, `packages/db`, `packages/ui`, `packages/config`, and `infra/supabase`. Validation passed with `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` in the Dockerized workspace. The active continuation path is `spec/plans/caniello-mvp-implementation-roadmap.md`.

## Consolidated Plans

### First Landing Page

Former plan file: `first-landing-page.md`

Outcome:
- Built the first reproducible Caniello landing page.
- Implemented Polish-first behavior during the first pass, later revised toward the English visual mockup, then carried Polish-first scope forward into the segmented MVP landing requirement.
- Added local form validation, Docker workflows, Vitest coverage, and Playwright desktop/mobile evidence.
- Deferred persistent waitlist storage, analytics, and production deployment decisions until later requirements and release-readiness work.

Historical evidence now lives in:
- `spec/validation/landing-page-validation-history.md`
- `spec/release-readiness/landing-page-release-readiness-history.md`
- `spec/lifecycle/landing-page-lifecycle-history.md`

### Next.js Monorepo Migration

Former plan file: `caniello-mvp-nextjs-monorepo-migration.md`

Outcome:
- Migrated the landing app and API behavior into a Next.js App Router web app under `apps/web`.
- Added pnpm workspaces, Turborepo, shared packages, Dev Container support, Supabase placeholders, `.env.example`, and Vercel monorepo configuration.
- Removed the root Vite runtime as the active product path.
- Validated the migration with lint, tests, build, and Playwright checks.

Historical evidence remains in:
- `spec/validation/caniello-mvp-nextjs-monorepo-migration-validation.md`
- `spec/validation/dev-container-local-development-validation.md`
- `spec/validation/milestone-2-platform-foundation-validation.md`

## Validation and Acceptance

Use current validation artifacts for proof instead of re-running obsolete plan commands:

- Landing-page historical evidence: `spec/validation/landing-page-validation-history.md`
- Next.js migration evidence: `spec/validation/caniello-mvp-nextjs-monorepo-migration-validation.md`
- Current platform foundation evidence: `spec/validation/milestone-2-platform-foundation-validation.md`

## Idempotence and Recovery

Do not resume the old root Vite implementation instructions. If a future agent needs to restore historical detail, recover it from version control rather than rebuilding obsolete root-level source paths.

Continue new implementation from the active roadmap and current monorepo layout:

- Active roadmap: `spec/plans/caniello-mvp-implementation-roadmap.md`
- Active web app: `apps/web`
- Shared contracts: `packages/contracts`
- Local platform foundation: `infra/supabase`

## Interfaces and Dependencies

The active repository standard is pnpm, Turborepo, Next.js App Router, React, TypeScript, TailwindCSS, Vitest, Playwright, Vercel, and Supabase local tooling. Earlier references to root Vite, root `api/`, root `src/`, npm, or port `5173` are historical unless a file explicitly discusses the old landing-page implementation.
