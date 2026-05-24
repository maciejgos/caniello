---
name: forge-refactor
description: Review Caniello code for gaps against ADR 0011 pragmatic engineering practices and implement narrowly scoped safe refactors. Use when asked to audit, clean up, simplify, split responsibilities, improve TypeScript/contracts/validation/tests, or align existing code with `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md` without adding product scope.
---

# Forge Refactor

## Purpose

Review existing Caniello code against ADR 0011, identify concrete engineering-practice gaps, implement the smallest safe refactor slice, validate it, and update handoff notes. This skill is for code health and maintainability work, not new product behavior.

## Inputs

- `AGENTS.md` and the closest nested `AGENTS.md`.
- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/handoff.md`
- `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`
- Relevant code, tests, package boundaries, task files, validation notes, and current git diff.

## Workflow

1. Run `git status --short` and preserve user edits.
2. Read product context, roadmap, handoff, and ADR 0011 before judging code.
3. Determine the requested refactor scope. If the user asks for a whole-codebase review, do a fast audit and choose one coherent slice with the highest value and lowest product risk.
4. Inspect nearby tests, package boundaries, and current patterns before editing.
5. Report or note candidate gaps with evidence, grouped by ADR 0011 theme.
6. Select only gaps that can be fixed without changing product behavior, roadmap scope, durable architecture, data shape, external services, security posture, or release state.
7. If the gap is too broad, create or suggest a `spec/tasks/*` refactor task instead of editing many unrelated areas.
8. Create or switch to a feature branch before edits unless the human explicitly says to stay on the current branch.
9. Implement the smallest safe refactor. Prefer moving, splitting, typing, validating, or testing existing behavior over redesigning it.
10. Run the smallest meaningful validation first, then broaden when shared contracts, app routes, or UI behavior were touched.
11. For UI changes, use browser or Playwright validation when a route is available.
12. Update `spec/handoff.md` before stopping with what changed, validation results, skipped checks, and follow-up candidates.

## ADR 0011 Review Checklist

Use this checklist as an audit guide, not as permission to refactor everything found.

- KISS and scope: remove needless indirection, speculative abstractions, broad service layers, or generic frameworks only when doing so is local and behavior-preserving.
- SOLID: split files or functions when responsibilities are mixed enough to block readability, testing, or clear dependencies.
- TypeScript and contracts: tighten `any`, unclear boundary types, duplicated DTOs, or missing schemas at browser/API/data boundaries.
- Runtime validation: add Zod or an approved schema where untrusted params, request bodies, webhook payloads, forms, or integration responses cross a trust boundary.
- Tests: add focused behavior tests for shared domain rules, data access, critical UI behavior, retry behavior, factories, and regressions exposed by the refactor.
- React: keep route and page components thin; extract route shells, forms, repeated cards, previews, empty states, and action panels into feature-local components when they are distinct responsibilities.
- Next.js: prefer App Router conventions, Server Components by default, intentional `"use client"`, server-only secrets, and validated route/search/body inputs.
- Package boundaries: keep shared schemas in `packages/contracts`, shared domain rules in `packages/domain`, and Supabase helpers in `packages/db`.
- Retry: add or repair retry only for transient, repeat-safe operations with bounded attempts, backoff or jitter where useful, timeout handling, clear final errors, and idempotency protection for repeatable writes.
- Factory: add or repair factories only when construction is repeated, conditional, environment-specific, or test-heavy; keep them typed, small, and close to the boundary.

## Refactor Rules

- Preserve product behavior unless the user explicitly asked for a behavior change and the roadmap supports it.
- Do not turn a refactor pass into feature delivery.
- Do not create new shared abstractions just because two call sites look similar; wait for meaningful repetition or clearer pressure.
- Prefer feature-local React components before shared UI abstractions.
- Keep copy/content modules separate when the feature already uses them.
- Avoid broad formatting churn, dependency upgrades, package manager changes, generated-file churn, or unrelated cleanup.
- Keep migrations, data model changes, auth/permission changes, and external service configuration out of this skill unless a human explicitly approves the separate work.
- When implementation reveals a durable architecture decision, stop and route to `forge-architect`.

## Stop Conditions

Stop and ask the human before proceeding when the refactor requires:

- roadmap or MVP scope expansion;
- a new or changed ADR;
- migration, schema, RLS, data-loss, or compatibility risk;
- security-sensitive behavior;
- external service configuration;
- dependency or framework changes;
- destructive action;
- release, deployment, merge, or approval action;
- many unrelated files or multiple independent refactor themes.

## Output

End with:

- review scope and selected gap;
- files changed;
- behavior-preservation notes;
- validation commands and results;
- browser/UI evidence when relevant;
- skipped checks or residual risks;
- follow-up refactor candidates, if any;
- handoff update summary;
- approvals needed.
