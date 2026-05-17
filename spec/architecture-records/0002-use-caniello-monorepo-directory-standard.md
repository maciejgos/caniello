# 0002 — Use Caniello monorepo directory standard

## Status

Accepted

## Date

2026-05-17

## Decision

Caniello implementation work will use a consistent monorepo directory standard aligned with [0001 — Use TypeScript-first Next.js monorepo for Caniello MVP](./0001-use-typescript-nextjs-monorepo.md).

The repository should be organized around deployable applications in `apps/`, shared TypeScript packages in `packages/`, Supabase infrastructure in `infra/supabase/`, and durable product-development artifacts in `spec/`.

The target structure is:

```text
caniello/
├─ apps/
│  ├─ web/                    # landing + aplikacja web + API routes
│  │  ├─ app/
│  │  │  ├─ (marketing)/       # landing, privacy, terms
│  │  │  ├─ (app)/             # zalogowana aplikacja MVP
│  │  │  ├─ api/               # API routes, webhooks, MailerLite
│  │  │  └─ share/[token]/     # trusted sharing / care card
│  │  ├─ features/
│  │  │  ├─ marketing/
│  │  │  ├─ pets/
│  │  │  ├─ reminders/
│  │  │  ├─ documents/
│  │  │  └─ sharing/
│  │  └─ lib/
│  │     ├─ supabase/
│  │     ├─ mailerlite/
│  │     └─ analytics/
│  │
│  └─ mobile/                 # React Native / Expo
│
├─ packages/
│  ├─ domain/                 # modele i reguły domenowe
│  ├─ db/                     # Supabase client, queries, repositories
│  ├─ contracts/              # shared types, schemas, API contracts
│  ├─ ui/                     # wspólne komponenty dla web/backoffice
│  └─ config/                 # eslint, tsconfig, prettier
│
├─ infra/
│  └─ supabase/               # migrations, RLS policies, seed data
│
├─ spec/
│  ├─ architecture/
│  └─ architecture-records/
│
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ README.md
```

## Directory Responsibilities

### `apps/web`

`apps/web` is the deployable Next.js application for the MVP. It owns the public landing experience, authenticated web application, API routes, webhooks, MailerLite integration endpoints, and trusted sharing views.

The Next.js App Router should separate public marketing routes from authenticated product routes:

- `app/(marketing)/` for landing, privacy, terms, and other public pages.
- `app/(app)/` for the logged-in MVP application.
- `app/api/` for API routes, webhooks, and server-side integration endpoints.
- `app/share/[token]/` for trusted sharing and care card routes.

Feature-specific UI and application logic should live under `apps/web/features/` so product areas remain easy to locate and evolve:

- `features/marketing/`
- `features/pets/`
- `features/reminders/`
- `features/documents/`
- `features/sharing/`

Web-only service helpers should live under `apps/web/lib/`, grouped by integration or concern:

- `lib/supabase/`
- `lib/mailerlite/`
- `lib/analytics/`

### `apps/mobile`

`apps/mobile` is reserved for the React Native / Expo application. It should consume shared domain logic, contracts, and configuration from `packages/*` rather than duplicating MVP rules from the web application.

### `packages/domain`

`packages/domain` contains shared domain models, domain rules, and product concepts that should not depend on a specific runtime, framework, or UI. It is the home for cross-platform Caniello business behavior.

### `packages/db`

`packages/db` contains Supabase client setup, typed queries, repository-style data access helpers, and database-facing utilities shared by applications. It should preserve a clear boundary between product code and Supabase-specific access patterns.

### `packages/contracts`

`packages/contracts` contains shared TypeScript types, validation schemas, API contracts, event payload shapes, and integration contracts used across web, mobile, and server-side routes.

### `packages/ui`

`packages/ui` contains reusable UI components shared by web-facing surfaces and future operational interfaces when practical. Components in this package should avoid product-specific data fetching and keep runtime assumptions explicit.

### `packages/config`

`packages/config` contains shared development configuration such as ESLint, TypeScript, and Prettier settings. Application-specific overrides should stay close to the app that needs them.

### `infra/supabase`

`infra/supabase` contains Supabase migrations, row-level security policies, seed data, and infrastructure artifacts needed to reproduce and validate the database setup.

### `spec/architecture`

`spec/architecture/` contains long-form architecture notes, diagrams, and system descriptions.

### `spec/architecture-records`

`spec/architecture-records/` contains architecture decision records. New durable architecture decisions should be added here with sequential numeric prefixes.

## Context

Caniello MVP is moving from a landing-page-oriented repository toward a TypeScript-first monorepo. The project needs a stable structure before implementation work begins so contributors and Codex agents place code, infrastructure, and documentation consistently.

This standard keeps the MVP aligned with the accepted stack decision while leaving room for the existing product surface to move into `apps/web`, the future mobile application to live under `apps/mobile`, and shared logic to evolve under `packages/*`.

## Consequences

### Positive

- Future implementation work has a clear destination for web, mobile, shared logic, infrastructure, and documentation.
- Next.js application routes, feature modules, and integration helpers have predictable boundaries.
- Shared domain behavior and contracts can be reused by web, mobile, API routes, and future tooling.
- Supabase migrations, RLS policies, and seed data have a durable home outside application code.
- Vercel deployment can target `apps/web` as the web root directory.

### Tradeoffs

- Existing Vite landing-page files will need to be migrated or replaced when the Next.js monorepo structure is implemented.
- The repository will need workspace tooling such as `pnpm-workspace.yaml` and `turbo.json`.
- Contributors must avoid placing shared logic directly inside `apps/web` when it belongs in `packages/*`.
- The `packages/ui` package should remain lightweight until there is enough reuse to justify shared component extraction.

## Implementation Standard

New Caniello MVP implementation work should follow this directory structure unless a later ADR changes it.

Code placement should use these rules:

- Put deployable web behavior in `apps/web`.
- Put future mobile behavior in `apps/mobile`.
- Put shared business rules in `packages/domain`.
- Put shared database access in `packages/db`.
- Put shared types, schemas, and API contracts in `packages/contracts`.
- Put genuinely reusable components in `packages/ui`.
- Put shared linting, formatting, and TypeScript configuration in `packages/config`.
- Put Supabase migrations, RLS policies, and seed data in `infra/supabase`.
- Put architecture explanations in `spec/architecture`.
- Put durable ADRs in `spec/architecture-records`.

## Review triggers

Revisit this decision if:

- Caniello introduces a separate backend service or worker outside Next.js API routes;
- mobile development requires a significantly different package boundary;
- shared UI extraction creates more coupling than reuse;
- Supabase infrastructure needs a dedicated deployment or migration workflow;
- back-office returns to MVP scope and needs its own deployable application;
- workspace tooling changes from pnpm/Turborepo to another monorepo system.
