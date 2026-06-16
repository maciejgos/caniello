# Repository Guidelines

## Product Context

This repository is Caniello, a pet health and care organization utility. Caniello helps pet owners keep trusted, shareable records for pet profiles, reminders, documents, and care information in one place.

Durable product truth lives in `spec/product-context.md`. Read it with `spec/roadmap.md` before shaping, planning, implementing, or evaluating Caniello product work.

The MVP promise is:

> One place for a pet's health records, reminders, documents, and shareable care information.

Initial MVP scope:

- pet profile with basic data, chip, allergies, medication, and important notes;
- reminders for vaccination, medication, deworming, and visits;
- document vault for medical records and test results;
- shareable care card or PDF export;
- family or caregiver access sharing.

Explicitly out of scope for the first product phase:

- marketplace mechanics;
- clinic SaaS, PIMS, or EHR integrations;
- booking and payments-first monetization;
- AI symptom checking, AI diagnosis, or veterinary replacement claims;
- claims that Caniello replaces an official EU pet passport.

## Lightweight Codex Workflow

The default process is:

```text
roadmap filter -> task -> implementation -> verification -> handoff -> optional publish
```

When notes are too broad or ambiguous to become one task directly, use the optional shaping bridge:

```text
notes -> feature brief -> candidate tasks -> task -> implementation -> verification -> handoff -> optional publish
```

When work needs a durable architecture decision, use the optional ADR branch:

```text
task or feature brief -> draft ADR -> human approval -> implementation
```

Use `spec/roadmap.md` to decide whether a task belongs in `Now`, `Next`, `Later`, or `Not Now`. Use `spec/tasks/` for executable task files and `spec/handoff.md` for current working state.

For normal Caniello MVP work, prefer the active Forge skills:

- `forge-shaper` to turn messy notes into a lightweight feature brief and candidate tasks;
- `forge-planner` to turn intent into one scoped task file;
- `forge-architect` to turn architecture questions into notes or draft ADRs;
- `forge-implementer` to implement one task narrowly;
- `forge-evaluator` to verify task behavior, tests, UI, API, data, and scope;
- `forge-handoff` to update continuation notes;
- `forge-publisher` to commit, push, and open a draft PR after successful validation or explicit human instruction;
- `forge-roadmap-review` to check roadmap drift and stale priorities;
- `forge-weekly-reporter` to create evidence-based weekly reports and ask the human for feedback before finalizing.

Archived Flow Forge skills and agents live under `.codex/flow-forge-reference/`. Older Flow Forge-era spec artifacts live under `spec/archive/flow-forge-history/`. Treat archived material as reference only unless a human maintainer explicitly asks to use a heavier process for a specific architecture, security, release, lifecycle, or large planning need.

Use `forge-architect` for non-trivial architecture questions. Planner and implementer skills may draft small obvious ADRs under `spec/architecture-records/` when they discover durable architecture decisions, but ADR drafts must remain `Draft` until human explicitly approves them, and implementation that depends on a new decision must stop before relying on the draft.

## Project Structure

- `apps/web/` for the Next.js App Router web app and MVP Vercel root.
- `apps/mobile/` for the future React Native / Expo mobile app scaffold.
- `packages/` for shared contracts, domain, application, db, ui, and config packages.
- `infra/supabase/` for Supabase CLI configuration, migrations, local functions, and seed data.
- `spec/` for the flattened Caniello workspace: product context, roadmap, feature briefs, tasks, handoff notes, architecture notes, ADRs, validation evidence, and archived historical/reference artifacts.
- `.codex/` for Codex runtime configuration, active Forge skills, rules, and archived Flow Forge reference material.
- `tests/` for executable product tests once implementation tooling exists.

Do not add new MVP source code under `src/`; the monorepo layout supersedes it.

Keep generated output, caches, dependency folders, local env files, and tool output out of version control.

## Build, Test, and Development Commands

This repository uses a TypeScript-first pnpm and Turborepo monorepo. The web app is a Next.js App Router application under `apps/web`.

Local development runs on the host by default. Docker Desktop is still required because Supabase local development runs its database and support services in Docker. Do not add a containerized workspace setup unless a future human-approved ADR reintroduces it.

- `./scripts/setup.sh`: install/check Homebrew-managed host tools, install dependencies, install Vercel CLI, create `.env.local` if missing, and start local Supabase.
- `pnpm install`: install dependencies from committed package files.
- `pnpm dev`: start the Next.js development server on `http://localhost:3000`.
- `pnpm build`: type-check and build production outputs through Turborepo.
- `pnpm test`: run the Vitest and React Testing Library test suite.
- `pnpm test:e2e`: run Playwright browser checks.
- `pnpm lint`: run the TypeScript validation gate.
- `./scripts/start.sh`: start local Supabase services from the host.
- `./scripts/stop.sh`: stop local Supabase services without taking a backup.
- `./scripts/cleanup.sh --yes`: stop local Supabase and remove generated local project files.
- `vercel`: create a Vercel preview deployment.
- `vercel --prod`: deploy to production after human release approval.

Do not add setup steps that cannot be reproduced from committed files.

## Coding Style and Engineering Standards

Follow ADR `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`.

Implementation defaults:

- KISS: prefer the simplest direct implementation that correctly supports current behavior.
- Use SOLID where it protects clear responsibilities, explicit dependencies, and narrow interfaces.
- Use TypeScript strictness and shared contracts at browser/API/data boundaries.
- Validate untrusted input with Zod or an approved schema layer.
- Keep shared schemas and types in `packages/contracts`.
- Keep shared domain rules in `packages/domain` when reused across web and mobile.
- Keep Supabase access helpers in `packages/db`.
- Use Retry only for transient, repeat-safe boundaries with bounded attempts and clear final errors.
- Use Factory only when construction is repeated, conditional, environment-specific, or test-heavy.
- Prefer framework-native React, Next.js, React Native, and Expo patterns.
- Avoid broad service layers, queues, generic frameworks, or speculative abstractions before the product needs them.

Style defaults:

- Use 2-space indentation for JavaScript, TypeScript, JSON, and Markdown.
- Prefer `camelCase` for variables and functions, `PascalCase` for classes and components, and `kebab-case` for filenames unless a framework requires otherwise.
- Keep modules focused. Prefer feature-local helpers under `apps/web/features/<feature>/lib/` and cross-app helpers under the appropriate `packages/*` package.

## Testing and Verification

Each behavior change should include focused tests where practical. Run the smallest meaningful validation first, then broaden when risk or shared behavior warrants it.

Use:

- TypeScript, lint, build, unit, integration, and E2E checks when relevant;
- React Testing Library and Vitest for component and behavior tests;
- Playwright for browser UI validation when a UI exists or changes;
- manual validation notes when automation is unavailable or insufficient.

Record skipped, failed, unavailable, or deferred checks in the task file or handoff. Do not imply validation is accepted or complete without explicit human approval.

## Review Checklist

For every PR, reviewers should check:

- roadmap or task alignment and MVP scope;
- privacy, consent, medical/legal boundary, and owner-control behavior;
- browser/API/data contracts and Zod validation at trust boundaries;
- server/client separation, with no Supabase service-role, provider, audit, storage, or external-integration logic in UI components;
- RLS, migration, storage, share-link, audit-log, product-event, and data-rights implications;
- tests or validation evidence proportionate to the risk of the change;
- no generated output, local env files, caches, dependency folders, or tool artifacts committed.

Block changes that expand `Now` scope, weaken RLS/privacy/medical boundaries, expose secrets, bypass shared contracts, or mark human approval, release, deployment, merge, or roadmap checkpoints complete without explicit maintainer approval.

## Codex Babysitting Checklist

Before starting work, Codex should check:

- `spec/product-context.md`;
- `spec/roadmap.md`;
- the relevant `spec/tasks/` file when one exists;
- `git status --short`.

During work, Codex should watch for:

- MVP scope drift;
- medical/legal boundary violations;
- privacy, consent, RLS, auth, share-link, document-upload, audit-log, product-event, and data-rights risk;
- direct provider or persistence logic in UI components;
- missing contracts or validation at API boundaries;
- generated files, local env files, caches, or tool output entering git.

Before stopping, Codex should:

- run the smallest meaningful validation first, then broaden when risk warrants it;
- record skipped, failed, unavailable, or deferred checks;
- update the task file and `spec/handoff.md`;
- leave the repository state clear for the next session.

Use Playwright Interactive for exploratory UI validation, mockup comparison, responsive checks, and debugging. Treat it as supporting evidence, not a replacement for automated tests or required security/data validation gates.

## Branches, Commits, and Pull Requests

Before broad changes, inspect the tree with `git status --short` and preserve user edits. Do not rewrite history on `main` unless explicitly requested.

During implementation, create or switch to a feature branch before edits unless a human maintainer explicitly says to stay on the current branch.

Before committing, run `git status --short` and verify only intentional files are staged. Use clear, imperative commit messages such as `Add Caniello task harness`. Pull requests should include a short summary, testing notes, linked issues when applicable, and screenshots or terminal evidence for user-visible changes.

## Roadmap Governance

The roadmap is a planning and prioritization artifact. It answers whether a task should exist now.

Codex may:

- suggest roadmap updates;
- identify task and roadmap misalignment;
- propose new roadmap items in `spec/handoff.md`;
- update roadmap links or task references when a human maintainer requests it.

Codex must not:

- silently add features to active `Now` scope;
- move `Next`, `Later`, or `Not Now` work into `Now`;
- remove strategic constraints;
- expand MVP scope without explicit human approval;
- approve, accept, reject, release, merge, or mark human checkpoints complete.

Keep root `ROADMAP.md` as the discoverable index and `spec/roadmap.md` as the active lightweight prioritization filter.

## Agent-Specific Instructions

Nested `AGENTS.md` files may add more specific instructions for their subtree. Follow the closest applicable `AGENTS.md` when editing files.

Work on one task at a time. Do not expand scope while implementing. Stop and ask for approval when a task requires a durable architecture decision, migration, security-sensitive change, external service change, destructive action, release action, or product scope expansion.

Use subagents only when a human maintainer explicitly asks for subagents, delegation, or parallel agent work. Otherwise use the active Forge skills and update `spec/handoff.md` before stopping.
