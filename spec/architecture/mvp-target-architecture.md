# Caniello MVP Target Architecture

## Status

Accepted

## Date

2026-05-17

## Related decisions

- [0001 - Use TypeScript-first Next.js monorepo for Caniello MVP](../architecture-records/0001-use-typescript-nextjs-monorepo.md)
- [0002 - Use Caniello monorepo directory standard](../architecture-records/0002-use-caniello-monorepo-directory-standard.md)
- [0003 - Keep landing, web app, and API in one Next.js project](../architecture-records/0003-keep-landing-app-and-api-in-one-nextjs-project.md)
- [0004 - Use Supabase for MVP data, auth, storage, and RLS](../architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)
- [0005 - Deploy the web application on Vercel](../architecture-records/0005-deploy-web-on-vercel.md)
- [0006 - Use pnpm workspaces and Turborepo for the monorepo](../architecture-records/0006-use-pnpm-workspaces-and-turborepo.md)
- [0007 - Use React Native and Expo for mobile](../architecture-records/0007-use-react-native-expo-for-mobile.md)
- [0008 - Use MVP product tooling baseline](../architecture-records/0008-use-mvp-product-tooling-baseline.md)
- [0009 - Use one Vercel project for Caniello MVP](../architecture-records/0009-use-one-vercel-project-for-mvp.md)
- [0010 - Use Dev Containers for local development](../architecture-records/0010-use-dev-containers-for-local-development.md)
- [0011 - Use pragmatic engineering practices from MVP start](../architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md)
- [0012 - Polish-first MVP localization](../architecture-records/0012-polish-first-mvp-localization.md)
- [0013 - Use Vercel and Next.js as the MVP platform topology](../architecture-records/0013-use-vercel-nextjs-platform-topology.md)
- [0014 - Use Supabase Auth with minimal RBAC and audit controls](../architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md)
- [0015 - Use Supabase migrations, RLS, and lifecycle controls for MVP data](../architecture-records/0015-use-supabase-data-lifecycle-and-rls.md)
- [0016 - Use a staged AI document intake pipeline](../architecture-records/0016-use-staged-ai-document-intake-pipeline.md)
- [0017 - Use scoped share tokens and defer PDF export](../architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md)
- [0018 - Use MailerLite for marketing email and defer transactional email choice](../architecture-records/0018-use-mailerlite-for-marketing-and-defer-transactional-email.md)
- [0019 - Use Vercel and Supabase observability with MVP recovery playbooks](../architecture-records/0019-use-vercel-supabase-observability-and-mvp-recovery.md)
- [0020 - Defer Stripe payments until paid-plan stories are approved](../architecture-records/0020-defer-stripe-payments-until-paid-plan-stories.md)

## Summary

Caniello MVP is a TypeScript-first monorepo with one deployable web application on Vercel, one future mobile application under Expo / React Native, shared packages for domain logic and contracts, Supabase for data/auth/storage/RLS, MailerLite for marketing and early-access email, Stripe deferred for future paid plans, and Dev Containers for repeatable local development.

The MVP intentionally excludes a separate FastAPI backend, separate API repository, back-office application, marketplace, bookings, payments, clinic SaaS, AI diagnosis, and official pet passport replacement.

Implementation should follow pragmatic engineering practices from the start: KISS by default, strict TypeScript, framework-native React / React Native / Next.js patterns, and design patterns such as Retry and Factory only where they solve a real boundary or repetition problem.

## System Context

```mermaid
flowchart LR
  owner["Pet owner"]
  trusted["Trusted recipient"]
  operator["Caniello team"]

  web["Caniello Web<br/>www.caniello.com<br/>Landing + App + API + Sharing"]
  mobile["Caniello Mobile<br/>apps/mobile<br/>Expo / React Native"]

  supabase["Supabase<br/>Auth + Postgres + Storage + RLS"]
  mailerlite["MailerLite<br/>Marketing + waitlist + surveys"]
  stripe["Stripe<br/>Deferred paid plans"]
  analytics["Observability<br/>Vercel Analytics now<br/>PostHog later"]
  vercel["Vercel<br/>caniello-web<br/>Deploy + runtime + rollback"]
  stores["Mobile distribution<br/>Expo / EAS<br/>App Store Connect<br/>Google Play Console"]

  owner -->|"Visits landing and uses app"| web
  owner -->|"Uses mobile app later"| mobile
  trusted -->|"Opens scoped share token"| web
  operator -.->|"Narrow audited support only if approved"| web

  web -->|"Owner auth, sessions, RLS data"| supabase
  web -->|"Documents, exports, audit events"| supabase
  web -->|"Waitlist and research follow-up"| mailerlite
  web -.->|"Billing only after paid-plan stories"| stripe
  web -->|"Logs, page analytics, product events"| analytics

  mobile -->|"Uses shared contracts and API routes"| web
  mobile -->|"Uses approved Supabase-backed flows"| supabase

  vercel -->|"Deploys and rolls back"| web
  stores -->|"Distributes later"| mobile
```

## Runtime Architecture

```mermaid
flowchart TB
  subgraph github["GitHub repository: caniello"]
    subgraph apps["apps"]
      subgraph web["apps/web - Next.js"]
        marketing["app/(marketing)<br/>Landing, privacy, terms"]
        app["app/(app)<br/>Authenticated MVP app"]
        api["app/api<br/>API routes, webhooks, integrations"]
        share["app/share/[token]<br/>Scoped trusted sharing"]
        features["features<br/>marketing, pets, reminders,<br/>documents, sharing"]
        webLib["lib<br/>supabase, mailerlite, analytics"]
      end

      mobile["apps/mobile<br/>Expo / React Native"]
    end

    subgraph packages["packages"]
      domain["domain<br/>Models and domain rules"]
      db["db<br/>Supabase client, queries, repositories"]
      contracts["contracts<br/>Types, schemas, API contracts"]
      ui["ui<br/>Reusable UI components"]
      config["config<br/>ESLint, tsconfig, Prettier"]
    end

    subgraph infra["infra"]
      supabaseInfra["supabase<br/>Migrations, RLS policies, seed data"]
    end

    spec["spec<br/>PDLC artifacts, architecture, and ADRs"]
  end

  subgraph platform["External platforms"]
    vercel["Vercel project: caniello-web<br/>Root Directory: apps/web"]
    supabase["Supabase<br/>Auth, Postgres, Storage, RLS"]
    mailerlite["MailerLite<br/>Marketing and waitlist only"]
    stripe["Stripe<br/>Deferred billing provider"]
    va["Vercel Analytics + Speed Insights"]
    posthog["PostHog<br/>Later, if deeper product analytics are needed"]
    expo["Expo / EAS<br/>Mobile builds"]
  end

  marketing --> features
  app --> features
  api --> webLib
  share --> webLib

  features --> domain
  features --> contracts
  features --> ui
  webLib --> db
  webLib --> contracts
  mobile --> domain
  mobile --> contracts
  mobile --> ui

  db --> supabase
  supabaseInfra --> supabase
  api --> mailerlite
  api -.->|"future paid-plan webhooks"| stripe
  marketing --> va
  app --> va
  app -.->|"later product analytics"| posthog

  vercel --> web
  expo --> mobile
```

## Deployment Topology

```mermaid
flowchart LR
  repo["GitHub repo\ncaniello"]
  vercelProject["Vercel project\ncaniello-web"]
  root["Root Directory\napps/web"]
  domain["Domain\nwww.caniello.com"]

  landing["/"]
  privacy["/privacy"]
  app["/app"]
  api["/api/*"]
  share["/share/*"]

  repo --> vercelProject
  vercelProject --> root
  root --> domain
  domain --> landing
  domain --> privacy
  domain --> app
  domain --> api
  domain --> share
```

The MVP does not create:

- `caniello-api`
- `caniello-backoffice`
- `caniello-mobile` on Vercel

Future deployable applications may introduce separate Vercel projects for `apps/backoffice` or `apps/api`, but they are outside MVP.

## Local Development Architecture

```mermaid
flowchart TB
  dev["Developer\nVS Code / Cursor"]
  container["Dev Container\nNode LTS, pnpm, Turbo,\nGit, Supabase CLI, Vercel CLI"]
  commands["pnpm / turbo\ninstall, dev, build, test"]
  compose["Docker Compose\nSupporting services only"]
  supabaseCli["Supabase CLI\nsupabase start"]
  localSupabase["Local Supabase stack\nAPI, DB, Studio, Inbucket"]
  mailhog["Mailhog\nOptional"]
  redis["Redis\nLater, if queues appear"]

  dev --> container
  container --> commands
  container --> supabaseCli
  container --> compose
  supabaseCli --> localSupabase
  compose -.->|"optional email testing"| mailhog
  compose -.->|"future background jobs"| redis
```

Local development uses Dev Containers for the working environment, Supabase CLI for local Supabase services, Docker Compose for auxiliary dependencies, and pnpm / Turborepo to run applications.

## Data and Trust Boundaries

```mermaid
flowchart LR
  browser["Browser / mobile client"]
  nextClient["Next.js client UI"]
  nextServer["Next.js server boundary<br/>API routes, server actions,<br/>webhooks, scoped sharing"]
  validation["Contracts and validation<br/>Zod schemas, shared types"]
  auth["Supabase Auth<br/>Owner sessions"]
  rbac["Minimal RBAC<br/>owner, share recipient, approved operator"]
  audit["Audit log<br/>Sensitive actions"]
  dbAccess["packages/db<br/>Data access helpers"]
  rls["Supabase RLS<br/>Owner and share-token policies"]
  storage["Supabase Storage<br/>Uploads and generated exports"]
  postgres["Supabase Postgres<br/>Pets, records, reminders, jobs, shares"]
  ai["Staged AI intake<br/>Deterministic first, provider later"]

  browser --> nextClient
  nextClient --> nextServer
  nextServer --> validation
  nextServer --> auth
  auth --> rbac
  validation --> dbAccess
  rbac --> dbAccess
  dbAccess --> rls
  rls --> postgres
  rls --> storage
  nextServer --> audit
  audit --> postgres
  nextServer --> ai
  ai --> postgres
  ai --> storage
```

Private pet, document, reminder, and sharing data must cross server-side validation and Supabase RLS boundaries. Shared contracts should define data shapes, while `packages/db` should centralize database access patterns.

## Implementation Notes

- `apps/web` is the only Vercel-deployed application for MVP.
- `apps/mobile` is part of the monorepo but deploys through Expo / EAS and app-store workflows, not Vercel.
- `packages/domain` owns shared domain rules.
- `packages/contracts` owns shared TypeScript types, schemas, and API contracts.
- `packages/db` owns Supabase access helpers.
- `infra/supabase` owns migrations, RLS policies, and seed data.
- `.devcontainer` and Docker Compose support local development only.
- Vercel production deployment should not depend on Dev Containers or Docker Compose.
- KISS is the default implementation posture; abstractions should earn their place through repeated behavior, integration boundaries, or clear lifecycle complexity.
- Retry belongs at transient, repeat-safe boundaries such as integrations, network calls, and future background jobs.
- Factory helpers belong at repeated or environment-specific construction points such as Supabase clients, integration clients, repositories, and test fixtures.
- React, React Native, Expo, and Next.js implementation should use framework-native conventions and keep server/client, web/mobile, and shared-package boundaries explicit.

## Validation

Before implementation planning, this target architecture should be checked against:

- accepted ADR coverage for stack, deployment, monorepo tooling, local development, Supabase, and draft ADR coverage for Milestone 1 decisions 0013-0020;
- route ownership in `apps/web`;
- package ownership under `packages/*`;
- Supabase RLS and migration placement under `infra/supabase`;
- Vercel Root Directory set to `apps/web`;
- engineering practice coverage from ADR 0011, including KISS, Retry, Factory, and React / React Native / Next.js boundaries;
- absence of MVP scope creep into back-office, separate API service, marketplace, bookings, premature Stripe implementation, clinic SaaS, AI diagnosis, or official pet passport replacement.
