# 0033 — Use a lean spec-driven workflow

## Status

Accepted by the human maintainer on 2026-06-19.

## Context

Parallel feature briefs, plans, validation reports, handoffs, weekly reports, architecture notes, design assets, archives, and repeated approval boilerplate consumed excessive agent context and maintenance.

## Decision

Use five canonical root documents: `AGENTS.md`, `SPEC.md`, `DESIGN.md`, `ROADMAP.md`, and `BACKLOG.md`.

Keep only:

- `spec/tasks/` for compact frontmatter-based implementation contracts that also record verification and continuation state;
- `spec/adrs/` for durable, expensive-to-reverse decisions.

Git history is the archive. Completed tasks and obsolete process artifacts leave the active tree. CI validates only the minimal changed-task contract for project-affecting work.

## Consequences

- Agents read fewer files and repeat less governance prose.
- Validation evidence stays in the task unless executable output or an external system is its natural source.
- Visual reference images are not retained in the active repository; `DESIGN.md` is authoritative.
- Product, privacy, RLS, medical, storage, sharing, and data-rights boundaries remain mandatory.

## Related

- `spec/tasks/simplify-spec-workflow.md`
- `SPEC.md`
- `ROADMAP.md`
- `AGENTS.md`
