# Caniello Architecture

## System Overview

Caniello is a TypeScript monorepo. The web product is a Next.js App Router application deployed as one Vercel project. Supabase provides authentication, PostgreSQL, Storage, and row-level security.

```text
Browser
  → Next.js page or client component
  → validated Next.js route handler
  → feature-owned server helper
  → Supabase Auth / Postgres / Storage
```

Marketing lead capture also calls MailerLite through a server-only boundary. Public care-card links enter through `share/[token]` and expose only the accepted read-only summary.

## Code Map

- `apps/web/app`: route composition, API handlers, public pages, protected app entry, and share-link entry.
- `apps/web/features/account`: authenticated owner UI plus server helpers for auth, pets, reminders, documents, timeline, sharing, and account settings.
- `apps/web/features/marketing`: landing pages, localization, consent, waitlist forms, MailerLite, and validation events.
- `apps/web/features/mvp-flow`: isolated prototype/reference flow; production features must not depend on its local-state behavior.
- `apps/web/lib`: web-wide runtime adapters that do not belong to one feature.
- `packages/contracts`: Zod schemas and shared browser/API/data payload types.
- `packages/domain`: reusable product rules with no framework or provider dependency.
- `packages/db`: shared Supabase configuration and database-facing helpers.
- `packages/ui`: genuinely reusable presentation primitives only.
- `infra/supabase`: reproducible configuration, forward migrations, functions, and local seed data.
- `tests/e2e`: browser journeys; feature and route tests stay beside their implementation.
- `scripts`: setup, diagnostics, verification orchestration, and enforceable repository invariants.

## Feature Flow

Authenticated product requests should follow:

```text
feature component
  → /api route
  → contract validation
  → feature/server helper
  → owner-scoped Supabase operation
```

Route handlers translate HTTP concerns. Server helpers own provider calls and bounded error behavior. UI components render state and call routes; they do not construct privileged clients or persist audit/product events.

## Cross-Cutting Concerns

- Authentication: Supabase Auth, with protected `/app` routes enforced by `proxy.ts`.
- Authorization: owner-scoped RLS is the final data boundary.
- Contracts: untrusted browser, route, and provider payloads are parsed at boundaries.
- Localization: owner-facing product behavior is Polish-first with English switching.
- Privacy: consent, export, deletion, sharing, and audit behavior remain owner-controlled.
- Medical safety: Caniello organizes records and never provides diagnosis or treatment decisions.
- Verification: Vitest covers components, routes, contracts, and server helpers; Playwright covers journeys; live RLS suites are opt-in.

## Architectural Invariants

- Client UI never reads service-role credentials or constructs privileged provider clients.
- UI does not write audit logs or product events directly.
- Feature server logic stays under its owning feature until real reuse justifies a shared package.
- Cross-feature imports are forbidden; shared contracts or packages carry deliberate reuse.
- Migrations are forward-only, and owner data tables require explicit RLS review.
- Raw share tokens, medical contents, signed URLs, and secrets do not enter logs.
- Generated output, local env files, caches, and dependencies are never committed.

## Finding Common Changes

| Change                           | Start here                        |
| -------------------------------- | --------------------------------- |
| Page or API route                | `apps/web/app`                    |
| Authenticated owner behavior     | `apps/web/features/account`       |
| Landing, waitlist, or language   | `apps/web/features/marketing`     |
| Shared request/response shape    | `packages/contracts`              |
| Supabase configuration/helper    | `packages/db`                     |
| Table, policy, trigger, or seed  | `infra/supabase`                  |
| Browser journey                  | `tests/e2e`                       |
| Build, setup, or repository rule | `scripts` and `.github/workflows` |

ADRs explain why durable choices were made. Active tasks define what may change now.
