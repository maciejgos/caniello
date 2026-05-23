# Local Development Architecture

## Status

Draft

## Date

2026-05-21

## Related decisions

- [0001 - Use TypeScript-first Next.js monorepo for Caniello MVP](../architecture-records/0001-use-typescript-nextjs-monorepo.md)
- [0002 - Use Caniello monorepo directory standard](../architecture-records/0002-use-caniello-monorepo-directory-standard.md)
- [0004 - Use Supabase for MVP data, auth, storage, and RLS](../architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)
- [0005 - Deploy the web application on Vercel](../architecture-records/0005-deploy-web-on-vercel.md)
- [0022 - Use host-first local development setup](../architecture-records/0022-use-host-first-local-development-setup.md)

## Summary

Caniello MVP local development runs on the host by default:

- Node.js and pnpm run the monorepo.
- Supabase CLI runs local Supabase services.
- Docker Desktop is required only because Supabase CLI uses Docker for local database/auth/storage services.
- Vercel CLI runs from the host for login, preview deployment, and production deployment after human release approval.

The repository should not include project-owned containerized workspace configuration unless a future human-approved ADR reintroduces that path.

## Repository Structure

```text
caniello/
├─ .env.example
├─ apps/
│  ├─ web/
│  └─ mobile/
├─ packages/
├─ infra/supabase/
├─ scripts/
│  ├─ setup.sh
│  ├─ start.sh
│  ├─ stop.sh
│  └─ cleanup.sh
├─ spec/
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ README.md
```

## Responsibilities

### Host Toolchain

The host toolchain provides:

- Node.js 18+
- pnpm
- Turborepo through project dependencies
- Supabase CLI
- Vercel CLI
- Docker Desktop for Supabase local services

First-time setup should use:

```text
./scripts/setup.sh
```

Daily local services should use:

```text
./scripts/start.sh
./scripts/stop.sh
```

Local generated files and caches can be removed with:

```text
./scripts/cleanup.sh --yes
```

### Supabase CLI

Supabase CLI owns the local backend stack for MVP.

Use:

```text
supabase start --workdir infra
```

through `scripts/setup.sh` or `scripts/start.sh`.

Supabase CLI provides local services for database, Auth, Storage, Studio, and email testing surfaces that mirror Supabase behavior more closely than a hand-written Postgres-only service.

Supabase project files live under:

```text
infra/supabase/
├─ migrations/
├─ seed.sql
└─ config.toml
```

### pnpm and Turborepo

Applications and package tasks run through pnpm and Turborepo on the host.

Typical local commands:

```text
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm lint
```

## Local Ports

Recommended local port assignments:

- `3000` for Next.js web
- `55321` for local Supabase API
- `55322` for local Supabase DB
- `55323` for Supabase Studio
- `54324` for Supabase Inbucket / email
- `19000` for Expo, depending on mobile configuration

## Production Deployment Boundary

Vercel remains the production deployment path for the web application.

Vercel should deploy:

- Root Directory: `apps/web`

Local setup scripts are development concerns. They should not be required by Vercel production deployment.

## Non-goals

The MVP local development standard does not introduce:

- project-owned containerized workspace configuration;
- a production Dockerfile for the Next.js app;
- a separate production API container;
- a back-office container;
- a Vercel project for mobile;
- a replacement for Supabase-managed Auth, Storage, or RLS.

## Validation

When implemented, local development setup should be validated by checking that:

- `./scripts/setup.sh` installs/checks host dependencies and starts Supabase;
- `./scripts/start.sh` starts local Supabase services;
- `./scripts/stop.sh` stops local Supabase services;
- `./scripts/cleanup.sh --yes` removes generated local project files;
- `pnpm install` works on the host;
- `pnpm dev` starts the web app;
- Vercel build configuration still targets `apps/web`;
- local environment variables are documented in `.env.example`.
