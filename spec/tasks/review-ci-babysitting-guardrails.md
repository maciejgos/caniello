# Task: Review and CI babysitting guardrails

## Goal

Make Caniello's code review, Codex supervision, and CI gates explicit enough to protect MVP scope, owner trust, and repository hygiene during implementation work.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The roadmap allows local development, CI, validation, and platform reliability needed to build and verify the MVP. This task strengthens those guardrails without adding product behavior.

Related roadmap item:

`Now - MVP Foundation`: local development, CI, validation, and platform reliability.

## Scope

- Add review and Codex babysitting guidance to the root and web app `AGENTS.md` files.
- Add package scripts for format checking and repository hygiene validation.
- Add a repository hygiene validation script for generated files, local env files, sensitive provider boundaries, and cross-feature imports.
- Split GitHub Actions into clearer named gates while preserving the existing lifecycle, validation, build, and Playwright checks.

## Non-Goals

- Do not add product behavior or UI changes.
- Do not update `spec/roadmap.md`.
- Do not introduce a new architecture decision.
- Do not publish, deploy, merge, or mark any human checkpoint approved.

## Acceptance Criteria

- Reviewer guidance covers roadmap scope, sensitive data boundaries, contracts, RLS/migrations, medical/legal copy, testing, and generated-file hygiene.
- Codex babysitting guidance covers start-of-work, during-work, and before-stopping checks.
- CI exposes separate, readable gates for governance, hygiene/format, typecheck, tests, validation gates, build, and E2E.
- The new repository hygiene gate passes on the current branch.
- Relevant validation commands pass or are explicitly recorded.

## Implementation Notes

- Use existing Node scripts instead of adding new dependencies.
- Keep gates lightweight and deterministic in CI.
- Existing ADRs 0011 and 0028 cover pragmatic engineering and feature-local boundaries.

## Architecture Decisions

- Existing ADRs: `0011`, `0028`
- New ADR needed: No
- ADR draft: None
- Approval state: Not needed

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Implemented on branch `codex/review-ci-babysitting-guardrails`.

Changed root and web `AGENTS.md` to add review, babysitting, Playwright Interactive, and web-sensitive-boundary guidance. Added `scripts/format-check-changed.mjs` and `scripts/repo-hygiene-gate.mjs`, exposed them through `package.json`, and split GitHub Actions into separate lifecycle, repository hygiene, typecheck, unit/contract test, validation, build, and Playwright E2E jobs.

Validation passed:

- `node scripts/repo-hygiene-gate.mjs`
- `pnpm validation:repo-hygiene` outside sandbox after sandboxed pnpm commands failed with `fetch failed`
- `pnpm format:check` outside sandbox after sandboxed pnpm commands failed with `fetch failed`
- `pnpm typecheck` outside sandbox after sandboxed pnpm command failed with `fetch failed`
- `node scripts/pdlc-lifecycle-gate.mjs`
- `git diff --check`

Playwright/browser validation was not required because no UI behavior changed.
