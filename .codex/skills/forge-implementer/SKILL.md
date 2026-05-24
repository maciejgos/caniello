---
name: forge-implementer
description: Implement exactly one scoped project task using pragmatic MVP engineering practices. Use after a task file exists and implementation is requested.
---

# Forge Implementer

## Purpose

Implement one approved `spec/tasks/*` task narrowly, verify it, and update task and handoff notes. The implementer follows ADR 0011 and avoids scope expansion.

## Inputs

- One `spec/tasks/*` task file.
- `AGENTS.md`
- The closest nested `AGENTS.md`.
- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/handoff.md`
- Relevant code, tests, contracts, ADRs, and existing patterns.

## Workflow

1. Run `git status --short` and preserve user edits.
2. Read `spec/product-context.md` and confirm the task does not violate MVP non-goals.
3. Confirm the task belongs to `Now` or has explicit human approval.
4. Create or switch to a feature branch before edits unless the human explicitly says to stay on the current branch.
5. Identify the smallest implementation slice that satisfies the acceptance criteria.
6. Add or update focused behavior tests where practical before or alongside implementation.
7. Before coding, check whether the task depends on a new or changed architecture decision. If yes, route non-trivial decisions to `forge-architect`; draft only small obvious ADRs yourself, and stop for human approval before implementing dependent code.
8. Implement the smallest direct change.
9. Keep shared browser/API contracts in `packages/contracts` and durable SQL vocabularies in database enum/domain types when relevant.
10. Run relevant validation: lint, typecheck, build, unit, integration, E2E, and manual checks as appropriate to the risk.
11. Use Playwright/browser validation for UI work.
12. Update the task verification and handoff sections.
13. Update `spec/handoff.md` before stopping.

## Engineering Standards

Follow `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`:

- prefer KISS and the simplest direct behavior;
- use SOLID only where it protects clear responsibilities and narrow interfaces;
- keep TypeScript strict and boundary types explicit;
- validate untrusted input;
- use framework-native React, Next.js, React Native, and Expo patterns;
- add Retry only for transient repeat-safe boundaries;
- add Factory only when construction is repeated, conditional, environment-specific, or test-heavy;
- avoid speculative abstractions, unrelated refactors, and broad formatting churn.

## Architecture Decision Handling

During implementation, stop and route to `forge-architect` when the work reveals a non-trivial durable decision that affects future tasks, such as:

- changing framework, provider, storage, deployment, auth, data ownership, or integration boundaries;
- introducing migrations, queues, workers, AI provider routing, payment boundaries, security posture, or cross-package contracts;
- adding a pattern that future implementation must follow beyond the current local task;
- contradicting, replacing, or extending an accepted ADR.

The implementer may create or update a small ADR draft only when the decision is obvious, local to the task boundary, and already supported by existing guidance.

ADR draft rules:

- use `spec/architecture-records/TEMPLATE.md`;
- create the next numeric `spec/architecture-records/NNNN-kebab-case-title.md` file when no ADR exists;
- set status to `Draft`;
- link the task, feature brief, roadmap item, and related ADRs;
- update `spec/handoff.md` and the task notes with the ADR path and the blocked/approval state.

Do not continue implementing code that depends on the new decision until the human explicitly approves the ADR or instructs you to proceed with the draft assumption. Do not mark ADRs accepted, rejected, superseded, or complete yourself.

## Stop Conditions

Stop and ask the human before proceeding when work requires:

- roadmap scope expansion;
- durable architecture decision or ADR;
- migration or data-loss risk;
- security-sensitive behavior;
- external service configuration;
- destructive action;
- release, deployment, merge, or approval action;
- acceptance criteria that cannot be validated.

## Output

End with:

- task path;
- files changed;
- ADR draft path and approval state, if an architecture decision was introduced;
- validation commands and results;
- UI/browser evidence when relevant;
- known gaps;
- handoff update summary;
- approvals needed.
