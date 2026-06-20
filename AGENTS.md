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

## Codex Handoff

The maintainer selects work by naming its task:

```text
Implement spec/tasks/<slug>.md and stop when ready for review.
```

To resume interrupted work:

```text
Continue spec/tasks/<slug>.md and stop when ready for review.
```

Codex must:

1. Confirm the named task is in `BACKLOG.md`, has `roadmap: now`, and is `planned` or `in-progress`; future-roadmap tasks are planning records and cannot be implemented until explicitly promoted to `Now`. Accept `review` only when the maintainer explicitly requests review changes.
2. Run `pnpm task:status -- <slug> in-progress` before implementation.
3. Reconstruct interrupted work from the task, `git status`, and the current diff.
4. Implement only that task and record checks, unavailable checks, residual risks, blockers, and the exact next action in `Verification`.
5. When verification is review-ready, remove pending markers and run `pnpm task:status -- <slug> review`.
6. Stop with a concise summary. Do not commit, push, merge, deploy, reorder the backlog, or change roadmap scope.

Status ownership:

- `planned`: maintainer-selected backlog work not started.
- `in-progress`: work currently owned by the task implementer; only one is allowed.
- `review`: implementation and concrete verification are ready for human review; multiple are allowed.

If blocked, leave the task `in-progress`. Review feedback returns it to `in-progress`; successful re-verification returns it to `review`. After merge, the maintainer or a later documentation-only cleanup deletes the task and backlog row. Git history is the archive; do not create separate handoff or session-report artifacts.

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
- `roadmap`: `now`, `next`, `later`, `not-now`
- `risk`: `low`, `medium`, `high`

Only `roadmap: now` tasks may move to `in-progress` or `review`. Tasks in
`next`, `later`, or `not-now` remain `planned` until the maintainer explicitly
updates `ROADMAP.md`, the task, and `BACKLOG.md`.

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
- `pnpm task:status -- <slug> <status>`: synchronize task and backlog status.
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

## Agent Work Review

When reviewing agent-generated PRs, verify:

1. **Task alignment**: Implementation matches acceptance criteria from the linked task
2. **Validation passed**: All gates passed (`verify:fast`, task-contract, repo-hygiene)
3. **Boundary compliance**: No product/medical/auth/privacy violations (see SPEC.md, ROADMAP.md)
4. **Repository hygiene**: No secrets, env files, generated artifacts, or cross-feature imports
5. **Handoff complete**: Task status is `review`, BACKLOG.md synced, Verification section complete
