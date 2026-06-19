---
status: review
roadmap: now
risk: medium
adrs: [0011, 0028, 0033]
---

# Codex harness readiness

## User story

As a maintainer, I want Codex to have a reliable project map and executable feedback loop so that future runs can navigate, implement, and verify changes with less rediscovery.

## Acceptance criteria

- A concise root `ARCHITECTURE.md` maps system flow, code ownership, cross-cutting concerns, invariants, and common change locations.
- Node 24, pnpm, and dependency declarations are reproducible and aligned with CI.
- `doctor`, `verify:fast`, `verify`, and `smoke` commands provide clear staged diagnostics.
- Task contracts validate status-specific verification, ADR references, and backlog status/risk synchronization.
- Real ESLint checks run separately from TypeScript.
- Repository-boundary checks have positive and negative fixtures.
- Pull requests have a concise review checklist.
- Focused, standard, and opt-in live validation tiers are documented without adding a new artifact workflow.

## Constraints

- Preserve the lean root-document plus tasks/ADRs model.
- Do not add a full observability stack, execution-plan archive, validation reports, or automated documentation gardening.
- Do not change product runtime behavior or enable live Supabase tests by default.

## Verification

- Passed: task-contract gate with 15 fixtures, including review-state, ADR-reference, and backlog-drift checks.
- Passed: repository-hygiene gate with 5 positive/negative architecture-boundary fixtures.
- Passed: `pnpm verify:fast` across task, format, hygiene, ESLint, and typecheck stages.
- Passed: `pnpm verify` across 11 local CI-equivalent stages in 54 seconds.
- Passed: 152 unit/contract tests; 5 opt-in live RLS tests remained skipped.
- Passed: production build and frozen-lockfile install.
- Passed: setup/start/stop/cleanup shell syntax; setup now installs the Playwright Chromium runtime.
- Passed: runtime smoke for health, version, landing, privacy, and protected-app redirect.
- Passed: Playwright with 18 journeys; 6 opt-in live auth/settings journeys remained skipped.
- Passed: active Markdown links, no floating `latest` declarations, `git diff --check`, and 79-line architecture-map limit.
- ESLint passed with 5 pre-existing warnings and no errors; existing anchor and unused-test-variable debt was not refactored in this harness task.
- Unavailable on this host: a clean `pnpm run doctor` result because the host runs Node 26.3.0. The doctor correctly reported Node 24 as required; pnpm, Docker, Supabase, env files, and local services passed.
