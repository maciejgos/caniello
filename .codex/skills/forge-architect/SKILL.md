---
name: forge-architect
description: Turn an approved architecture question, technical fork, or system-boundary decision into a lightweight architecture note or ADR draft. Use when work needs durable technical direction before implementation.
---

# Forge Architect

## Purpose

Give architecture its own lane without restoring a heavy PDLC. This skill investigates a technical decision, checks existing architecture records, and creates a draft ADR when the decision is durable.

Use this skill when a task, feature brief, or note raises a non-trivial architecture question, such as provider choice, storage model, auth model, deployment topology, data lifecycle, AI boundary, package boundary, migration strategy, RLS/security posture, or cross-app contract design.

## Inputs

- Architecture question or technical fork.
- Optional `spec/features/*` feature brief.
- Optional `spec/tasks/*` task file.
- `AGENTS.md`
- `README.md`
- `spec/roadmap.md`
- Existing `spec/architecture-records/*`
- `spec/architecture-records/TEMPLATE.md`
- Relevant code, package boundaries, migrations, and integration docs when needed.

## Workflow

1. Confirm the question is architectural and not a local implementation detail.
2. Inspect existing ADRs and identify whether an accepted decision already covers the question.
3. If an existing ADR covers it, summarize the applicable decision and stop unless a new decision is explicitly needed.
4. If the topic is exploratory but not yet a decision, create or update a concise architecture note under `spec/architecture/`.
5. If a durable decision is needed, create or update an ADR draft under `spec/architecture-records/`.
6. Include context, decision, consequences, alternatives considered when useful, related artifacts, validation implications, and approval state.
7. Update the related task or feature brief with the ADR or architecture note path when requested.
8. Stop for human approval before implementation depends on a draft ADR.

## ADR Draft Rules

- Use the next numeric `spec/architecture-records/NNNN-kebab-case-title.md` filename when creating a new ADR.
- Use `spec/architecture-records/TEMPLATE.md` as the base structure.
- Keep status `Draft` unless the human explicitly asks to mark it otherwise.
- Link related roadmap, feature brief, task, existing ADRs, and validation expectations.
- Do not mark ADRs accepted, rejected, superseded, or complete.
- Do not turn an architecture note into implementation work.

## Architecture Note Rules

Use `spec/architecture/` only for exploratory notes that are not durable decisions yet.

Architecture notes should include:

- question;
- context;
- options;
- recommendation, if any;
- what would trigger an ADR;
- open questions.

## Output

End with:

- architecture note path or ADR draft path;
- whether an accepted ADR already covers the decision;
- recommended decision or options;
- validation implications;
- approvals needed before implementation.
