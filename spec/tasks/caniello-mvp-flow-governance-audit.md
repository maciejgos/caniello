---
status: review
roadmap: now
risk: low
adrs: [0016, 0017, 0025, 0027, 0029, 0031, 0032, 0033]
---

# Caniello MVP flow governance audit

## User story

As the maintainer, I want an evidence-backed audit of the clickable MVP flow and the production owner app so that prototype fidelity, production readiness, and roadmap scope are not confused.

## Acceptance criteria

- `docs/caniello-mvp-flow-governance-audit.md` contains all requested audit sections, readiness scores, evidence, defects, and a final recommendation.
- The audit evaluates `/mvp-flow` and `/app` separately against `ROADMAP.md`, `BACKLOG.md`, `DESIGN.md`, the supplied mockups, and observed behavior.
- Prototype, production-ready, Later, and Not Now capabilities are labeled honestly.
- The recommended backlog is complete, prioritized, dependency-aware, and does not silently reorder the authoritative backlog.
- Every production-application item has a canonical task contract, including separate decision tasks for multi-pet, caregiver access, email sharing, emergency cards, and partner workflows.
- Task governance records `now`, `next`, `later`, and `not-now` horizons while mechanically preventing future-roadmap tasks from entering implementation.
- Temporary screenshots remain outside the repository and no product behavior changes.

## Constraints

- Documentation only; do not implement product fixes, migrations, deployments, releases, or roadmap expansion.
- Preserve the current backlog order and append this audit task only.
- Do not promote Later or Not Now behavior into Now.

## Verification

- Passed: `pnpm --filter web test -- MvpFlowPrototype.test.tsx AccountApp.test.tsx` with 23 tests across the prototype and production account surfaces.
- Passed: `pnpm validation:task-contract` with 25 task/status fixtures and the changed-task contract.
- Passed: `pnpm validation:repo-hygiene` with 5 architecture-boundary fixtures and the repository scan.
- Passed: `pnpm format:check` after applying Prettier to the new report.
- Passed: `git diff --check`.
- Passed: report structure check found all 14 requested sections and 31 ordered recommendations; referenced canonical files and this task exist.
- Passed: the complete application backlog contains 26 canonical task contracts: 7 existing contracts and 19 new contracts across Now, Next, Later, and Not Now.
- Passed: `BACKLOG.md` contains 32 unique rows with continuous priorities 1–32; existing priorities 1–13 retain their original order.
- Passed: the task-contract and status-helper suite now contains 37 passing tests, including every allowed roadmap value, backlog roadmap drift, and rejection of future tasks moving to `in-progress` or `review`.
- Passed: local Markdown link checks across `BACKLOG.md`, the audit report, and all task files.
- Passed: `pnpm verify:fast` across task contract, formatting, repository hygiene, lint, and workspace typecheck. ESLint retained five pre-existing warnings and reported no errors.
- Passed before implementation: Playwright evidence at desktop and mobile widths for `/mvp-flow`, `/signup`, `/login`, and authenticated `/app`; no relevant browser console warnings or errors.
- Passed before implementation: route probes confirmed `/`, `/login`, `/signup`, `/app`, and `/mvp-flow`; `/register`, `/dashboard`, `/pets`, `/reminders`, `/documents`, `/documents/upload`, `/timeline`, `/ask`, `/sharing`, and `/settings` returned 404.
- Passed before implementation: prototype reload reset to signup; sharing measured 1493 px at a 1280 px viewport; production Settings measured 416 px at a 390 px viewport.
- Temporary screenshots remain under `/tmp/caniello-mvp-flow-audit` and are not tracked.
- The documented `pnpm task:status -- <slug> <status>` form failed before mutation because the package wrapper forwarded a literal `--`; the working equivalent moved this task through `in-progress` to `review`.
- Residual risk: readiness percentages and visual-fidelity scores are audit judgments grounded in the recorded evidence, not automated release metrics or a WCAG compliance assessment. Future-roadmap contracts describe intended decisions and acceptance boundaries; they do not approve implementation.
- Next action: human review of the expanded task-governance model, priorities 14–32, and the 26 application task contracts.
