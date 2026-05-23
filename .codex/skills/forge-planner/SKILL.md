---
name: forge-planner
description: Create or refine one lightweight project task from a short intent or existing task file, using the roadmap as a scope filter. Use for normal Flow Forge planning before implementation.
---

# Forge Planner

## Purpose

Turn a short intent into one scoped task file under `spec/tasks/`. The planner protects roadmap focus; it does not create broad product specs or implement code.

## Inputs

- User intent, usually one to four sentences.
- Optional `spec/features/*` feature brief or candidate task.
- Optional existing `spec/tasks/*` task file.
- `AGENTS.md`
- `README.md`
- `spec/roadmap.md`
- `spec/handoff.md`
- `spec/features/LIGHTWEIGHT_TEMPLATE.md` and relevant `spec/features/*` files when planning from a shaped feature.
- `spec/tasks/TEMPLATE.md`
- Relevant `spec/decisions.md` or `spec/architecture-records/*` when the intent touches durable decisions.

## Workflow

1. Inspect the roadmap before drafting.
2. Classify the intent as `Now`, `Next`, `Later`, or `Not Now`.
3. If the work is `Next`, `Later`, or `Not Now`, produce a planning recommendation and stop unless the human explicitly approves planning it as a task.
4. If the input is broad notes with multiple possible tasks, recommend `forge-shaper` first instead of forcing a task.
5. Draft the smallest useful task that supports the `Now` roadmap.
6. Write explicit scope, non-goals, acceptance criteria, implementation notes, and verification expectations.
7. Identify whether the task requires a durable architecture decision.
8. If the architecture decision is non-trivial, route to `forge-architect` and stop before implementation planning depends on it.
9. If the ADR need is small and obvious, draft it under `spec/architecture-records/` using `spec/architecture-records/TEMPLATE.md`, keep status `Draft`, link it from the task, and record that human approval is required before implementation depends on the decision.
10. Call out product, privacy, security, data, architecture, or release questions that require Maciej approval.

## Rules

- Do not implement code.
- Do not move roadmap items into `Now`.
- Do not remove MVP non-goals.
- Do not add AI, marketplace, booking, payment, clinic SaaS, diagnosis, or other out-of-scope work unless the roadmap and human explicitly approve it.
- Prefer one task over a bundle of tasks.
- Treat shaped feature briefs as optional context, not mandatory gates.
- Do not mark ADRs accepted, rejected, superseded, or complete.
- Do not use a draft ADR to authorize implementation; draft ADRs require explicit human approval before dependent code proceeds.
- Keep the task file concise enough for a fresh implementer to execute without reading chat history.

## Architecture Decision Handling

Prefer `forge-architect` when planning reveals a non-trivial durable decision that will shape future work, such as:

- choosing or replacing a framework, provider, storage pattern, deployment topology, auth model, integration boundary, or data ownership rule;
- introducing migrations, queues, background jobs, AI provider routing, payment boundaries, security posture, or cross-package contracts;
- changing an accepted ADR or making a decision that future tasks must follow.

The planner may draft a small ADR only when the decision is already clear and the task needs a simple record. Do not create an ADR for local implementation details, one-off component choices, small refactors, or decisions already covered by accepted ADRs.

ADR draft rules:

- use the next numeric filename in `spec/architecture-records/` with a kebab-case title;
- use `spec/architecture-records/TEMPLATE.md`;
- set status to `Draft`;
- include context, decision, consequences, and related task/feature/roadmap links;
- update the task `Implementation Notes` or `Approval Notes` with the ADR path and approval requirement.

## Output

Create or update one task file under `spec/tasks/` using `spec/tasks/TEMPLATE.md`.

End with:

- task path;
- ADR draft path, if created;
- roadmap phase;
- in-scope summary;
- out-of-scope summary;
- approvals needed, if any.
