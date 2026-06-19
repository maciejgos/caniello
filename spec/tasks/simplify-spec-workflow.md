---
status: review
roadmap: now
risk: medium
adrs: [0011]
---

# Simplify spec workflow

## User story

As the repository maintainer, I want a small, machine-checkable specification workflow so that coding agents spend fewer tokens on ceremony and more on implementation.

## Acceptance criteria

- `AGENTS.md`, `SPEC.md`, `DESIGN.md`, `ROADMAP.md`, and `BACKLOG.md` are the only canonical workflow documents.
- `spec/` contains only active tasks and durable ADRs.
- Active tasks use validated frontmatter plus User story, Acceptance criteria, optional Constraints, and Verification.
- Completed tasks and obsolete feature, validation, handoff, plan, note, report, design, architecture-note, and archive artifacts are removed; Git history is the archive.
- CI uses `validation:task-contract` and no longer uses PDLC lifecycle or spec-alignment gates.
- Playwright writes generated evidence under ignored `test-results/`.
- Live references to removed paths and old workflow terminology are eliminated.
- Repository hygiene, task-contract fixtures, formatting, typecheck, tests, and build pass or any unavailable checks are recorded below.

## Constraints

- Preserve product scope, privacy, RLS, authentication, storage, sharing, data-rights, and medical boundaries.
- Retain accepted and unresolved draft ADRs.
- Do not alter product runtime behavior.

## Verification

- Passed: `pnpm validation:task-contract` with 11 positive and negative contract fixtures.
- Passed: `pnpm validation:repo-hygiene`.
- Passed: `pnpm format:check` and `git diff --check`.
- Passed: `pnpm typecheck`.
- Passed: `pnpm test` with 152 tests passed and 5 opt-in live RLS tests skipped.
- Passed: `pnpm build`, including the Next.js production build.
- Passed: active Markdown link, final directory structure, and stale-reference checks.
- Confirmed: Playwright output is configured under ignored `test-results/playwright`.
- Browser/E2E execution was not required because runtime product behavior did not change.
