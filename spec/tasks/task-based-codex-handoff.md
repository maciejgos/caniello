---
status: review
roadmap: now
risk: low
adrs: [0033]
---

# Task-based Codex handoff

## User story

As a maintainer, I want to hand a named task to Codex and have its state remain synchronized so that work can continue across sessions without a separate handoff document.

## Acceptance criteria

- `AGENTS.md` defines how Codex claims, resumes, verifies, and returns a named task for review.
- Task statuses have explicit ownership and lifecycle meanings.
- A command updates task frontmatter and the matching backlog status together without changing priority.
- Invalid task names, statuses, missing backlog rows, or existing status drift fail before either tracked file changes.
- The task-contract gate permits multiple review tasks but rejects more than one in-progress task.
- Review tasks require concrete verification without pending markers.
- Git state and the task file remain the only cross-session implementation handoff.

## Constraints

- Do not add a handoff file, session report, execution plan, or completed status.
- Do not let Codex select tasks, reorder the backlog, change roadmap placement, commit, publish, or deploy.

## Verification

- Passed: 25 task-contract and status-helper fixtures, including synchronized updates, invalid slug/status/task, missing backlog row, status drift, competing in-progress work, multiple review tasks, and unchanged files on failure.
- Passed: task-contract validation across all active tasks and backlog rows.
- Passed: repository-hygiene fixtures and repository scan.
- Passed: Prettier checks and `git diff --check`.
- Passed: ESLint with the existing baseline of five warnings and no errors.
- Passed: workspace typecheck across seven packages.
- Passed: the status helper itself moved this task and its backlog row from `in-progress` to `review`.
- Unavailable through the package wrapper: `pnpm` hung under this host's unsupported Node 26 runtime, so equivalent committed Node scripts and local binaries were run directly. Node 24 remains the repository requirement.
- Residual risk: two-file updates use prepared temporary files with rollback; an operating-system failure during rollback could still require Git recovery.
