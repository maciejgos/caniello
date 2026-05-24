# Specification Workspace

The `spec/` directory is the single Caniello product and delivery workspace. It supports the lightweight Forge flow for daily work and keeps durable records when product context, architecture decisions, validation evidence, or handoff state must survive beyond one task.

Default lightweight flow:

```text
roadmap filter -> task -> implementation -> verification -> handoff -> optional publish
```

Optional shaping and architecture paths:

```text
notes -> feature brief -> candidate tasks -> task
task or feature brief -> draft ADR -> human approval -> implementation
```

## Directories

- `product-context.md` is the durable Caniello product truth: purpose, MVP promise, audience, validation goals, non-goals, medical/legal boundary, and control-plane relationship.
- `roadmap.md` is the active Now/Next/Later/Not Now prioritization filter.
- `handoff.md` records current working state, validation status, known gaps, and next action.
- `tasks/` contains executable Forge task files for day-to-day work.
- `features/` contains optional lightweight feature briefs. Use `features/TEMPLATE.md` for new briefs.
- `design/` contains existing UX flows, technical design notes, diagrams, and data flows as reference material.
- `notes/` contains raw discovery notes and source material that may feed shaping work.
- `architecture/` contains exploratory architecture notes before an ADR is warranted.
- `architecture-records/` contains architecture decision records. Codex-created ADRs stay `Draft` until human approval.
- `plans/` contains `PLANS.md`, the plans README, and active ExecPlans only for substantial implementation or cleanup work.
- `validation/` defines acceptance checks and durable evidence for completed work.
- `archive/flow-forge-history/` contains old Flow Forge-era artifacts that remain readable but inactive.

Use `tasks/TEMPLATE.md` for normal task work, `features/TEMPLATE.md` for lightweight shaping, and `architecture/NOTE_TEMPLATE.md` for exploratory architecture notes. For ExecPlans, use `plans/PLANS.md` as the authoritative self-contained guide.
