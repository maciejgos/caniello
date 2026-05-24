# Caniello

Caniello is a pet health and care organization utility.

It helps pet owners keep a trusted, shareable record of a pet's health, reminders, documents, and care information in one place.

## Purpose

Caniello exists to reduce the everyday chaos around pet health and care information:

- vaccination, medication, deworming, and visit reminders
- health records, allergies, chip number, medication, and important notes
- medical documents and test results
- care information that can be shared with family, caregivers, petsitters, groomers, or veterinarians

The initial product should be useful before it becomes a platform. Caniello starts as a focused owner-side utility, not as a full pet-care marketplace, clinic SaaS product, AI diagnosis tool, or official passport replacement.

## Current Stage

Status: `validation`

This repository is validating and building the Caniello MVP through a lightweight, human-governed Forge workflow. The active operating loop and durable evidence both live under `spec/`, with task-sized files for daily work and heavier records only when they are useful.

The first goal is to validate whether pet owners repeatedly use and trust Caniello for pet health organization.

## Initial Audience

Primary early users:

- dog and cat owners in cities
- owners of pets with ongoing medication or chronic health history
- families or caregivers who share pet-care responsibilities

Later lightweight partners:

- petsitters
- groomers
- trainers
- small pet-care service providers
- clinics, only after owner-side usage and sharing behavior are validated

## MVP Scope

The first MVP should focus on one promise:

> One place for a pet's health records, reminders, documents, and shareable care information.

Initial product scope:

- pet profile with basic data, chip, allergies, medication, and important notes
- reminders for vaccination, medication, deworming, and visits
- document vault for medical records and test results
- shareable care card or PDF export
- family or caregiver access sharing

## Out of Scope for the Initial Product

Do not build these in the first product phase:

- full booking and payments
- clinic PIMS or EHR integrations
- AI symptom checking or diagnosis
- full marketplace mechanics
- claims that Caniello replaces an official EU pet passport

Official EU pet passports remain documents issued by authorized veterinarians. Caniello may support a digital health record or travel-ready care record, but it must not imply official passport replacement.

## Validation Goals

The first validation cycle should prioritize evidence of problem intensity, activation, and retention.

Target signals:

- 40 owner interviews
- 15 interviews with clinics or pet-service providers
- landing page and waitlist
- landing page conversion above 8% from relevant traffic
- thin MVP activation above 50%
- D30 retention above 25%
- weekly active owners above 20% among activated users

If retention is weak, do not expand into marketplace or clinic tooling.

## Repository Structure

```text
apps/web/          Next.js App Router web app and MVP Vercel root
apps/mobile/       Minimal mobile workspace scaffold for future Expo work
packages/          Shared contracts, domain, application, db, ui, and config packages
infra/supabase/    Supabase CLI configuration, migrations, and seed file
spec/              Product context, roadmap, feature briefs, tasks, handoff, ADRs, validation, and archived history
tests/             Cross-app executable tests, including Playwright E2E
```

## Development Commands

The MVP workspace is a pnpm and Turborepo monorepo. The web app is a Next.js App Router application under `apps/web`.

Local development runs on the host by default. Docker Desktop is still required because Supabase local development runs its database and support services in Docker.

First-time setup on macOS:

- `./scripts/setup.sh`: install/check Homebrew-managed tools, install project dependencies, install the Vercel CLI, create `.env.local` if missing, and start local Supabase.

Host tools managed by setup:

- Docker Desktop for Supabase local services.
- Node.js and pnpm for the monorepo.
- Supabase CLI for local database/auth/storage services.
- Vercel CLI, installed with `pnpm i -g vercel` following Vercel's current getting-started guidance.

- `pnpm install`: install workspace dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the Next.js development server for `apps/web` on `http://localhost:3000`.
- `pnpm build`: type-check and build all workspace packages and apps through Turborepo.
- `pnpm test`: run Vitest and React Testing Library tests.
- `pnpm test:e2e`: run Playwright browser checks against the landing page.
- `pnpm lint`: run the TypeScript validation gate across the workspace.
- `pnpm validation:mailerlite-integration`: run the focused MailerLite integration gate for landing lead contracts, consent/error handling, server payload mapping, and web type safety.
- `./scripts/start.sh`: start local Supabase services from the host.
- `./scripts/stop.sh`: stop local Supabase services without taking a backup.
- `./scripts/cleanup.sh --yes`: stop local Supabase and remove generated project files such as `node_modules`, build output, test output, local env files, and local caches. It does not uninstall shared host tools.
- `vercel login`: authenticate the Vercel CLI once.
- `vercel`: create a Vercel preview deployment.
- `vercel --prod`: deploy to production after human release approval.

Local ports:

- `3000`: Next.js web app.
- `55321`: Supabase API.
- `55322`: Supabase local database.
- `55323`: Supabase Studio.
- `54324`: Supabase Inbucket/email testing.

Local demo account:

- Name: `Anna Kowalska`
- Email: `akowalska@example.com`
- Password: `CanielloDemo123!`

The demo account is defined in `infra/supabase/seed.sql` for local development only. After changing seed data, recreate the local database with `supabase db reset --workdir infra`, then restart `pnpm dev` if the web app is already running.

Vercel should use `apps/web` as the Root Directory. The MVP uses one Vercel project for the web app and its `/api/*` routes; do not create a separate API project for the MVP.

## Landing Lead Capture Configuration

Landing-page forms submit to the Next.js server-side `/api/landing-leads` boundary so MailerLite secrets are not exposed in browser code. Configure these environment variables in `.env.local` and in the deployment environment before live lead capture:

- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_NAME` (defaults to `Caniello Waitlist`)

The API looks up the configured MailerLite group by name and upserts the subscriber into that group using the submitted email address. Landing-page role and wave segmentation are intentionally deferred to a later MailerLite survey; the landing API rejects role or wave fields and only uses form source, language, consent, and UTM context for technical validation and attribution. Without `MAILERLITE_API_KEY`, the API returns a sanitized configuration error and does not send lead data.

Landing-page analytics consent and validation events are posted to `/api/validation-events`. The endpoint is a deployment-safe boundary for a future analytics sink; browser storage only remembers whether the visitor has already granted or declined analytics consent.

## Development Model

Caniello follows a lightweight AI-assisted, human-governed Forge model:

```text
roadmap filter -> task -> implementation -> verification -> handoff
```

Use `spec/product-context.md` for durable product truth and `spec/roadmap.md` to decide whether work belongs in `Now`, `Next`, `Later`, or `Not Now`. Use `spec/tasks/` for executable work, and update `spec/handoff.md` so the next session can continue without chat history.

Optional steps:

- Use `spec/features/` with `spec/features/LIGHTWEIGHT_TEMPLATE.md` when broad notes need to become a lightweight feature brief and candidate tasks before planning.
- Use `spec/architecture-records/` when a durable architecture decision is needed. ADRs drafted by Codex stay `Draft` until explicitly approved by a human maintainer.
- Use `spec/architecture/` for exploratory architecture notes before an ADR is warranted.
- Use `spec/validation/` for durable validation evidence when task notes are not enough.

Older Flow Forge-era artifacts are archived under `spec/archive/flow-forge-history/` as reference material. Do not use them as default workflow paths unless a human maintainer explicitly asks to revive a heavier process for a specific reason.

The active Forge skills under `.codex/skills/` support this flow:

- `forge-shaper`: notes to feature brief and candidate tasks.
- `forge-planner`: intent or candidate task to one executable task.
- `forge-architect`: architecture question to note or draft ADR.
- `forge-implementer`: one task to implementation and validation notes.
- `forge-evaluator`: implementation review against acceptance criteria and scope.
- `forge-handoff`: continuation state for the next session.
- `forge-roadmap-review`: priority and scope drift review.

Implementation should stay task-sized, roadmap-aligned, and focused on the smallest validated product slice. Do not expand into marketplace, clinic SaaS, booking, payments-first flows, AI diagnosis, or official passport replacement claims without explicit human approval.

## Relationship to The Future Thinker World

Caniello is an execution repository governed by The Future Thinker World control plane.

The control plane holds the organizational context, strategic decisions, portfolio logic, and cross-repository learning. This repository should hold Caniello-specific product discovery, implementation, validation, and delivery artifacts.

Relevant control-plane records:

- `ventures/caniello/README.md`
- `ventures/caniello/context.md`
- `ventures/caniello/strategy.md`
- `ventures/caniello/decisions.md`
- `artifacts/the-future-thinker-caniello-pdf-analysis.md`

## Domain

Primary domain:

- <https://caniello.com>

## Name History

Caniello was previously explored under the name `Pawnora`.

Control-plane and source-analysis documents may still mention `Pawnora` as the historical name. New product work should use `Caniello`.
