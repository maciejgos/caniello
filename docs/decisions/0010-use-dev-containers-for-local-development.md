# 0010 — Use Dev Containers for local development

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP will use Dev Containers as the primary repeatable local development environment.

Docker Compose will be used for local supporting services when needed, not as the production deployment mechanism for the Next.js web application.

The local development layer should add:

- `.devcontainer/devcontainer.json`
- `.devcontainer/Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `.env.example`
- `docs/architecture/local-development.md`

This decision does not change the main application structure:

```text
caniello/
├─ apps/web
├─ apps/mobile
├─ packages/*
├─ infra/supabase
└─ docs/*
```

It adds a local development environment layer around the accepted TypeScript-first monorepo.

## Context

Caniello MVP uses a TypeScript-first monorepo, Next.js in `apps/web`, Expo / React Native in `apps/mobile`, shared packages in `packages/*`, Supabase infrastructure in `infra/supabase`, and Vercel deployment for the web app.

Developers need a repeatable environment with the same core tools available without manually configuring every workstation. Dev Containers can provide the working shell and toolchain. Docker Compose can run supporting local services where appropriate.

## Local development structure

The recommended repository structure with local development support is:

```text
caniello/
├─ .devcontainer/
│  ├─ devcontainer.json
│  └─ Dockerfile
│
├─ docker-compose.yml
├─ .dockerignore
├─ .env.example
│
├─ apps/
│  ├─ web/                    # Next.js: landing + app + API routes
│  └─ mobile/                 # Expo / React Native
│
├─ packages/
│  ├─ domain/
│  ├─ application/
│  ├─ db/
│  ├─ contracts/
│  ├─ ui/
│  └─ config/
│
├─ infra/
│  └─ supabase/
│
├─ docs/
│  ├─ architecture/
│  └─ decisions/
│
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ README.md
```

## Dev Container responsibilities

The Dev Container should provide the complete developer toolchain:

- Node.js LTS
- pnpm
- Turborepo
- Git
- Supabase CLI
- Vercel CLI
- Expo CLI / EAS CLI when mobile work starts
- Playwright dependencies when browser E2E testing becomes active

Developers should be able to open the repository in VS Code or Cursor and get a ready-to-use environment.

## Docker Compose responsibilities

Docker Compose should primarily run local dependent services.

Recommended scope:

- `devcontainer` for the Node / pnpm / Turborepo development environment
- `postgres` only if the project is not using the local Supabase CLI stack
- `mailhog` optionally for local email testing
- `redis` later if queues or background jobs enter scope

For Caniello MVP, Supabase CLI is the preferred local backend option:

```text
supabase start
```

Supabase CLI should own the local Supabase stack for Postgres, Auth, Storage, and related services. In that setup, `docker-compose.yml` does not need to manually define Postgres for core app development.

The Supabase project structure should live under:

```text
infra/supabase/
├─ migrations/
├─ seed.sql
└─ config.toml
```

## Application runtime standard

The web application should be run from inside the Dev Container using pnpm and Turborepo, for example:

```text
pnpm install
pnpm dev
```

Docker Compose should not be the primary way to run the production web app image during MVP development.

There should be no production Dockerfile for the Next.js app in MVP unless a later deployment decision requires it. Vercel remains responsible for production deployment of `apps/web`.

## Local port standard

Recommended local ports:

- `3000` for Next.js web
- `54321` for local Supabase API
- `54322` for local Supabase DB
- `54323` for Supabase Studio
- `54324` for Supabase Inbucket / email
- `8080` for Mailhog if used separately
- `19000` for Expo, depending on mobile configuration

## Vercel impact

Dev Containers and Docker Compose have minimal impact on production deployment.

Vercel should still deploy the web app with:

- Root Directory: `apps/web`

The Vercel build must work from the monorepo, using the package manager and build commands selected for the monorepo, such as:

```text
pnpm install
pnpm turbo build --filter=web
```

or an equivalent Vercel configuration inside `apps/web`.

## Consequences

### Positive

- Developers get a repeatable local environment.
- Toolchain setup becomes explicit and versioned.
- Supabase CLI can provide a local stack close to the production Supabase model.
- Docker Compose remains focused on dependencies instead of becoming a competing deployment model.
- Vercel deployment remains simple and aligned with `apps/web`.

### Tradeoffs

- Dev Container setup adds files and maintenance overhead.
- Docker Desktop or an equivalent container runtime becomes part of the recommended developer setup.
- Supabase CLI local services add their own Docker-managed containers.
- The team must keep local environment configuration from drifting away from Vercel build behavior.

## Implementation Standard

Implementation should:

- use Dev Containers as the main local developer environment;
- use Supabase CLI as the preferred local backend stack;
- use Docker Compose only for supporting services not covered by Supabase CLI;
- run apps through pnpm and Turborepo commands from the Dev Container;
- keep production web deployment on Vercel;
- avoid introducing a production Next.js Docker deployment for MVP;
- document local setup in `docs/architecture/local-development.md` and the project README.

## Review triggers

Revisit this decision if:

- local Supabase CLI is not sufficient for Auth, Storage, RLS, or database workflows;
- the team needs production-like Docker images for deployment or CI;
- background jobs require Redis, workers, or additional local services;
- mobile development requires a materially different local environment;
- Vercel build behavior diverges from Dev Container development behavior.
