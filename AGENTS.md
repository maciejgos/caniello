# Caniello Repository Guide

## Required Context

Before product work, read:

1. `SPEC.md` for product scope, privacy, and medical boundaries.
2. `ROADMAP.md` to confirm the work belongs in `Now`.
3. `ARCHITECTURE.md` to locate behavior and understand dependency boundaries.
4. `DESIGN.md` for visible UI work.
5. The relevant file in `spec/tasks/`.
6. Relevant accepted decisions in `spec/adrs/`.

`BACKLOG.md` orders planned and active tasks. Work on one task at a time.

## Product Boundaries

Caniello is an owner-controlled pet health and care organization utility.

Never introduce without explicit human approval and a roadmap update:

- marketplace, booking, or payments-first behavior;
- clinic SaaS, PIMS, EHR, or broad partner workflows;
- AI diagnosis, symptom checking, treatment recommendations, or emergency advice;
- claims that Caniello replaces a veterinarian or official EU pet passport;
- complex household roles, advanced analytics, referral systems, calendar sync, or partner uploads.

Protect owner consent, authorization, RLS, account deletion, export, sharing, audit evidence, and medical disclaimers whenever affected.

## Repository Structure

- `apps/web/`: Next.js App Router web application.
- `apps/mobile/`: future Expo scaffold.
- `packages/`: shared contracts, domain, database, UI, and configuration.
- `infra/supabase/`: Supabase configuration, migrations, functions, and seed data.
- `spec/tasks/`: planned, active, and review-ready implementation contracts.
- `spec/adrs/`: durable architecture decisions.
- `tests/`: cross-application tests, including Playwright.

Do not add new MVP source code under root `src/`.

## Task Workflow

Every project-affecting change requires one changed `spec/tasks/*.md` file.

Task frontmatter:

```yaml
---
status: planned
roadmap: now
risk: medium
adrs: [0014, 0015]
---
```

Allowed values:

- `status`: `planned`, `in-progress`, `review`
- `roadmap`: `now`
- `risk`: `low`, `medium`, `high`

Task body:

- `User story`
- `Acceptance criteria`
- optional `Constraints`
- `Verification`

Use the task as the implementation contract, validation record, and cross-session continuation note. Record commands run, unavailable checks, and residual risk in `Verification`. Delete completed task files after merge; Git history is the archive.

Create an ADR only for a durable, expensive-to-reverse decision. New ADRs remain `Draft` until explicitly approved. Stop before implementing behavior that depends on an unapproved decision.

## Engineering Standards

- Prefer the smallest direct implementation that satisfies the active task.
- Keep TypeScript strict and use shared contracts at browser/API/data boundaries.
- Validate untrusted input with Zod or an approved schema layer.
- Keep shared schemas in `packages/contracts`, reusable domain rules in `packages/domain`, and Supabase helpers in `packages/db`.
- Keep provider, service-role, storage, audit, and external-integration logic out of UI components.
- Prefer feature-local helpers and components before shared abstractions.
- Use retries only for transient, repeat-safe operations with bounded attempts.
- Do not introduce queues, broad service layers, generic frameworks, or speculative abstractions without demonstrated need.
- Use 2-space indentation and kebab-case filenames unless a framework requires otherwise.

## Validation

Run the smallest meaningful check first, then broaden according to risk:

- focused Vitest/React Testing Library tests;
- TypeScript and lint checks;
- production build;
- Playwright for user-visible behavior;
- live Supabase/RLS checks for authorization or persistence changes.

Never imply that skipped or unavailable checks passed. High-risk auth, RLS, storage, sharing, data-rights, or migration changes require focused boundary evidence in the task.

## Commands

- `./scripts/setup.sh`: install/check tools, dependencies, Vercel CLI, env file, and local Supabase.
- `pnpm dev`: start the web app at `http://localhost:3000`.
- `pnpm build`: build the monorepo.
- `pnpm test`: run unit and contract tests.
- `pnpm test:e2e`: run Playwright.
- `pnpm lint`: run lint/type validation.
- `pnpm validation:task-contract`: validate changed task contracts.
- `pnpm validation:repo-hygiene`: check secrets, generated files, and sensitive boundaries.
- `pnpm run doctor`: diagnose the local toolchain and services without changing them.
- `pnpm verify:fast`: run the normal pre-implementation feedback loop.
- `pnpm verify`: run the complete local CI-equivalent harness.
- `pnpm smoke`: start or reuse the web app and check essential routes.
- `./scripts/start.sh`: start local Supabase.
- `./scripts/stop.sh`: stop local Supabase.

## Git and Safety

- Inspect `git status --short` before editing and preserve unrelated user changes.
- Create or switch to a `codex/` feature branch before implementation.
- Never force-push protected branches or rewrite shared history.
- Never commit secrets, local environment files, caches, dependencies, generated output, or tool artifacts.
- Stop for explicit approval before destructive actions, migrations, security-sensitive policy changes, external-service changes, deployment, release, or product-scope expansion.
- Stage and commit only intentional files.

Nested `AGENTS.md` files may add subtree-specific guidance.

Validation tiers:

- Focused: affected tests or package checks while implementing.
- Standard: `pnpm verify:fast` before review.
- Full: `pnpm verify` for shared, risky, or release-adjacent changes.
- Live: opt-in Supabase auth/RLS/Storage tests only when local services and disposable fixtures are available.
