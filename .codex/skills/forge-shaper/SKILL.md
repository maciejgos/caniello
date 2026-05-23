---
name: forge-shaper
description: Turn messy notes, discovery findings, or broad feature ideas into a lightweight feature brief and candidate task list. Use when notes are too broad or ambiguous for direct task planning.
---

# Forge Shaper

## Purpose

Convert raw notes into a concise feature brief under `spec/features/`. The shaper preserves product reasoning and splits broad ideas into candidate tasks, but it does not implement code and does not make feature work mandatory.

Use this skill when notes contain more than one task, conflicting ideas, uncertain scope, or product tradeoffs that need to be clarified before `forge-planner` creates an executable task.

## Inputs

- Raw notes, discovery findings, stakeholder comments, or a broad feature idea.
- `AGENTS.md`
- `README.md`
- `spec/roadmap.md`
- `spec/features/LIGHTWEIGHT_TEMPLATE.md`
- `spec/handoff.md`
- Relevant `spec/decisions.md`, `spec/tasks/*`, or `spec/` reference artifacts when needed.

## Workflow

1. Read the roadmap before shaping.
2. Classify the idea as `Now`, `Next`, `Later`, or `Not Now`.
3. Extract the user problem, desired outcome, constraints, and non-goals.
4. Preserve source-note context as a summary, not a transcript dump.
5. Draft a lightweight feature brief under `spec/features/`.
6. Propose candidate tasks that are small enough for `forge-planner`.
7. Call out open questions and approval needs.
8. Stop before implementation.

## Rules

- Do not implement code.
- Do not create a full PDLC requirements/features/stories chain.
- Do not move roadmap items into `Now`.
- Do not remove product non-goals.
- Keep the feature brief concise and task-oriented.
- Treat candidate tasks as suggestions until the human chooses one or asks `forge-planner` to create a task file.

## Output

Create or update one feature brief under `spec/features/` using `spec/features/LIGHTWEIGHT_TEMPLATE.md`.

End with:

- feature brief path;
- roadmap phase;
- candidate tasks;
- open questions;
- approvals needed, if any.
