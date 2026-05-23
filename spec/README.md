# Specification Workspace

The `spec/` directory is the single Caniello product and delivery workspace. It supports the lightweight Forge flow for daily work and keeps durable records when architecture, validation, release, or lifecycle evidence must survive beyond one task.

Default lightweight flow:

```text
roadmap filter -> task -> implementation -> verification -> handoff
```

Optional shaping and architecture paths:

```text
notes -> feature brief -> candidate tasks -> task
task or feature brief -> draft ADR -> human approval -> implementation
```

## Directories

- `roadmap.md` is the active Now/Next/Later/Not Now prioritization filter.
- `handoff.md` records current working state, validation status, known gaps, and next action.
- `tasks/` contains executable Forge task files for day-to-day work.
- `features/` contains optional lightweight feature briefs plus historical feature definitions.
- `requirements/` captures durable business needs, constraints, risks, and acceptance criteria when needed.
- `stories/` keeps historical or heavier implementation-ready user stories when a task file is not enough.
- `design/` captures UX flows, technical design notes, diagrams, and data flows.
- `architecture/` contains exploratory architecture notes before an ADR is warranted.
- `architecture-records/` contains architecture decision records. Codex-created ADRs stay `Draft` until human approval.
- `plans/` contains ExecPlans only for substantial implementation work.
- `validation/` defines acceptance checks and durable evidence for completed work.
- `release-readiness/` records advisory merge, release, or deployment readiness evidence for human decisions.
- `lifecycle/` captures post-release retrospectives, incidents, feedback, metrics, and continuous improvement notes.

Use `tasks/TEMPLATE.md` for normal task work, `features/LIGHTWEIGHT_TEMPLATE.md` for lightweight shaping, and `architecture/NOTE_TEMPLATE.md` for exploratory architecture notes. Use local `TEMPLATE.md` files for heavier artifacts. For ExecPlans, use `plans/PLANS.md` as the authoritative self-contained guide.
