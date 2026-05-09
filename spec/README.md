# Specification Workspace

The `spec/` directory is the primary workspace while this repository is a PDLC workflow template. It contains the artifacts that guide Codex from business intent to implementation-ready work, validation, release readiness, and lifecycle learning.

## Directories

- `requirements/` captures business needs, constraints, risks, and acceptance criteria.
- `features/` defines scoped product capabilities and expected outcomes.
- `stories/` breaks features into implementation-ready user stories and tasks.
- `design/` captures UX flows, technical design notes, diagrams, and data flows.
- `plans/` contains ExecPlans for substantial implementation work.
- `architecture-records/` contains architecture decision records.
- `validation/` defines acceptance checks and evidence for completed work.
- `release-readiness/` records advisory merge, release, or deployment readiness evidence for human decisions.
- `lifecycle/` captures post-release retrospectives, incidents, feedback, metrics, and continuous improvement notes.

Use the local `TEMPLATE.md` in each directory when creating a new artifact. For ExecPlans, use `plans/PLANS.md` as the authoritative self-contained guide.
