# Local Development Architecture

## Status

Accepted

## Date

2026-05-17

## Related decisions

- [0001 — Use TypeScript-first Next.js monorepo for Caniello MVP](../architecture-records/0001-use-typescript-nextjs-monorepo.md)
- [0002 — Use Caniello monorepo directory standard](../architecture-records/0002-use-caniello-monorepo-directory-standard.md)
- [0004 — Use Supabase for MVP data, auth, storage, and RLS](../architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)
- [0005 — Deploy the web application on Vercel](../architecture-records/0005-deploy-web-on-vercel.md)
- [0010 — Use Dev Containers for local development](../architecture-records/0010-use-dev-containers-for-local-development.md)

## Summary

Caniello MVP local development should use Dev Containers for the developer toolchain, Supabase CLI for the local backend stack, Docker Compose for supporting services, and pnpm / Turborepo for running applications and package tasks.

This local development layer supports the accepted monorepo structure without changing it:

```text
caniello/
├─ .devcontainer/
├─ docker-compose.yml
├─ .dockerignore
├─ .env.example
├─ apps/
│  ├─ web/
│  └─ mobile/
├─ packages/
├─ infra/supabase/
├─ spec/
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ README.md
```

## Responsibilities

### Dev Container

The Dev Container is the main local development environment. It should provide:

- Node.js LTS
- pnpm
- Turborepo
- Git
- Supabase CLI
- Vercel CLI
- Expo CLI / EAS CLI when mobile work starts
- Playwright dependencies when browser checks become part of the active workflow

Developers should be able to open the repository in VS Code or Cursor and work from inside the container.

### Supabase CLI

Supabase CLI is the preferred local backend stack for MVP.

Use:

```text
supabase start
```

Supabase CLI should provide local services for the database, Auth, Storage, Studio, and email testing surfaces that mirror Supabase behavior more closely than a hand-written Postgres-only Compose service.

Supabase project files should live under:

```text
infra/supabase/
├─ migrations/
├─ seed.sql
└─ config.toml
```

### Docker Compose

Docker Compose should run supporting services that are not already covered by Supabase CLI.

Expected services:

- `devcontainer` for the Node / pnpm / Turborepo workspace
- `mailhog` optionally for local email testing if Supabase Inbucket is not enough
- `redis` later if queues or background jobs enter scope
- `postgres` only if the team deliberately chooses not to use Supabase CLI for a specific local workflow

Docker Compose should not become the production deployment model for `apps/web`.

### pnpm and Turborepo

Applications and package tasks should run through pnpm and Turborepo from inside the Dev Container.

Typical local commands after the monorepo migration:

```text
pnpm install
pnpm dev
pnpm turbo build --filter=web
```

## Local ports

Recommended local port assignments:

- `3000` for Next.js web
- `54321` for local Supabase API
- `54322` for local Supabase DB
- `54323` for Supabase Studio
- `54324` for Supabase Inbucket / email
- `8080` for Mailhog if used separately
- `19000` for Expo, depending on mobile configuration

## Production deployment boundary

Vercel remains the production deployment path for the web application.

Vercel should deploy:

- Root Directory: `apps/web`

Dev Containers and Docker Compose are local development concerns. They should not be required by Vercel production deployment.

## Non-goals

The MVP local development standard does not introduce:

- a production Dockerfile for the Next.js app;
- a separate production API container;
- a back-office container;
- a Vercel project for mobile;
- a replacement for Supabase-managed Auth, Storage, or RLS.

## Validation

When implemented, local development setup should be validated by checking that:

- the Dev Container builds successfully;
- `pnpm install` works inside the Dev Container;
- `pnpm dev` starts the web app;
- `supabase start` starts the local Supabase stack;
- Vercel build configuration still targets `apps/web`;
- local environment variables are documented in `.env.example`.
