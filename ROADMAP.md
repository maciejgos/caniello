# Caniello Roadmap Index

Root `ROADMAP.md` is the discoverable index for current Caniello direction. The active lightweight prioritization filter is:

- `spec/roadmap.md`

Use `spec/roadmap.md` to decide whether work belongs in `Now`, `Next`, `Later`, or `Not Now` before creating or implementing a task.

## Active Operating Artifacts

- `spec/roadmap.md` - active Now/Next/Later/Not Now roadmap filter.
- `spec/features/` - optional lightweight feature briefs shaped from broad notes.
- `spec/architecture/` - optional exploratory architecture notes before an ADR is warranted.
- `spec/tasks/` - executable Codex task files.
- `spec/tasks/TEMPLATE.md` - task template for scoped work.
- `spec/handoff.md` - current working state, validation status, gaps, and next action.

## Reference Artifact Set

The historical PDLC artifact set remains under `spec/` and should be treated as reference evidence unless Maciej explicitly asks to use the heavier Flow Forge workflow.

Important reference areas:

- `spec/requirements/` - prior requirements and validation intent.
- `spec/features/` - prior feature definitions.
- `spec/stories/` - prior implementation-ready stories.
- `spec/design/` - UX, technical design, flows, and visual artifacts.
- `spec/plans/` - ExecPlans and the earlier MVP implementation roadmap.
- `spec/architecture-records/` - ADRs, including accepted technical constraints.
- `spec/validation/` - validation records and evidence.
- `spec/release-readiness/` - release readiness records.
- `spec/lifecycle/` - lifecycle learning records.

## Open Decision References

- Local development standard update: `spec/architecture-records/0022-use-host-first-local-development-setup.md`
- Local Supabase Auth provider configuration: `spec/architecture-records/0023-use-config-toml-for-local-supabase-auth-providers.md`

Do not mark decisions accepted, rejected, released, merged, or complete without explicit human approval.
