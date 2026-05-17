# 0006 — Use pnpm workspaces and Turborepo for the monorepo

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP will use pnpm workspaces and Turborepo to manage the TypeScript-first monorepo.

The repository should include:

- `pnpm-workspace.yaml`
- `turbo.json`
- root `package.json`
- shared packages under `packages/*`
- deployable applications under `apps/*`

GitHub remains the repository host and collaboration surface.

## Context

Caniello needs one repository for web, mobile, shared domain logic, shared contracts, database access, shared configuration, and future reusable UI. pnpm workspaces provide package linking and dependency management. Turborepo provides task orchestration and caching for builds, linting, tests, and future CI workflows.

## Consequences

### Positive

- One repo can coordinate web, mobile, domain, contracts, database access, and configuration.
- Shared packages can be consumed consistently by `apps/web` and `apps/mobile`.
- Turborepo can run and cache common tasks across packages.
- pnpm keeps dependency installation predictable and workspace-aware.

### Tradeoffs

- The repository must migrate away from the current npm/Vite layout when implementation begins.
- Developers need pnpm installed for local development.
- Workspace boundaries require discipline so shared code does not become a dumping ground.
- Turborepo configuration adds a small amount of monorepo setup overhead.

## Implementation Standard

Implementation should:

- use pnpm as the package manager after the monorepo migration begins;
- avoid mixing npm lockfiles with pnpm workspace management after migration;
- define common tasks through `turbo.json`;
- keep shared configuration in `packages/config`;
- keep app-specific configuration inside the owning app when it is not reusable.

## Review triggers

Revisit this decision if:

- workspace tooling becomes a larger burden than the repo shape justifies;
- mobile tooling has incompatible workspace requirements;
- CI/CD needs are better served by another task runner;
- the repository splits into multiple independently versioned repos.
