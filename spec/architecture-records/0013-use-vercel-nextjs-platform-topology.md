# 0013 - Use Vercel and Next.js as the MVP platform topology

## Status

Draft

## Date

2026-05-17

## Context

Milestone 1 requires a clear platform topology before product implementation continues. ADRs 0001, 0003, 0005, 0009, and 0010 already choose a TypeScript-first monorepo, one Next.js app under `apps/web`, one Vercel project, and Dev Containers for local development. The old FastAPI and separate API-service path is superseded.

## Decision

Caniello MVP will use `apps/web` as the only web deployment target. Vercel deploys `apps/web` as project `caniello-web` and owns production web runtime, preview deployments, environment variables, serverless API routes, and rollback through previous deployments.

Next.js API routes under `apps/web/app/api/*` are the MVP backend-for-frontend boundary for web product flows, webhooks, lead capture, validation events, trusted sharing, and integration glue. Supabase owns managed Postgres, Auth, Storage, RLS, migrations, seed data, and local service parity through `infra/supabase`.

The MVP does not introduce FastAPI, a separate `apps/api`, a separate back-office app, or production Docker containers unless a later human-approved ADR reopens that scope.

## Consequences

This keeps hosting, routing, preview deployments, and API boundaries simple for MVP. It also means long-running work may later need a queue, worker, or dedicated service if Next.js/Vercel serverless limits become a poor fit.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [Migrate Caniello MVP to the Next.js monorepo architecture](../plans/caniello-mvp-nextjs-monorepo-migration.md)
- [0001 - Use TypeScript-first Next.js monorepo for Caniello MVP](./0001-use-typescript-nextjs-monorepo.md)
- [0003 - Keep landing, web app, and API in one Next.js project](./0003-keep-landing-app-and-api-in-one-nextjs-project.md)
- [0005 - Deploy the web application on Vercel](./0005-deploy-web-on-vercel.md)
- [0009 - Use one Vercel project for Caniello MVP](./0009-use-one-vercel-project-for-mvp.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
