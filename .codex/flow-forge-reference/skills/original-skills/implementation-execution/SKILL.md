---
name: implementation-execution
description: Execute approved Codex ExecPlans by making scoped implementation changes, updating plan progress, running validation, recording discoveries, and stopping for human approval when scope, risk, or behavior changes. Use when Codex is asked to implement an approved plan, complete plan milestones, update source code, add tests, modify docs, or perform planned repository changes.
---

# Implementation Execution

## Overview

Execute an approved ExecPlan with discipline. This skill turns an implementation plan into repository changes while preserving traceability back to requirements, features, stories, designs, ADRs, and validation evidence.

## Operating Principles

- Start only from an approved ExecPlan or explicit human instruction to implement.
- Create or switch to a feature branch before implementation work unless the user explicitly says to stay on the current branch.
- Never self-approve implementation, validation, release, or checkpoint completion.
- Keep changes scoped to the plan and current milestone.
- Preserve user edits and unrelated work.
- Update the ExecPlan as work proceeds; the plan is a living artifact.
- Prefer small, verifiable increments over large unreviewed batches.
- Use TDD and BDD together: encode expected behavior first where practical, then implement the smallest change that satisfies it.
- Apply SOLID and KISS during implementation: keep responsibilities clear, dependencies explicit, interfaces focused, and solutions as simple as the behavior allows.
- Use established design patterns when they clarify object boundaries, lifecycle, orchestration, or extension points; avoid adding patterns that do not reduce real complexity.
- Run the validation named in the plan, and record what passed, failed, or could not run.
- Use Playwright for UI validation when the change affects a browser UI, and save or reference screenshots as validation evidence when useful.
- Review changes against design intent, security expectations, quality gates, and the no-self-approval policy before asking for human acceptance.
- Stop for human approval when scope, risk, user-visible behavior, architecture, data, security, CI/CD, or destructive action differs materially from the approved plan.

## Workflow

1. Inspect context.
   Read `AGENTS.md`, the closest nested `AGENTS.md`, the approved ExecPlan, and all source artifacts linked by the plan. Run `git status --short` before edits and preserve unrelated changes.

2. Confirm implementation authorization.
   Verify that the user explicitly approved implementation or directly asked to execute the plan. If the plan is still `Draft` or approval is unclear, ask for human approval before changing `src/`, `tests/`, CI/CD configuration, or other implementation files.

3. Create a feature branch.
   Check the current branch and worktree. Create a feature branch before edits, using a name derived from the ExecPlan or story, such as `feature/<short-plan-name>` or `codex/<short-plan-name>`. If the repository has no commits yet, no remote, or the branch cannot be created safely, record that constraint and continue only if the user explicitly authorizes work on the current branch.

4. Select the next milestone.
   Work on the next incomplete milestone in the ExecPlan. If the plan does not clearly identify the next milestone, update or ask to revise the plan before implementation.

5. Start with behavior.
   Translate the current milestone into BDD-style scenarios and TDD-style tests where tooling exists. For BDD, describe user or agent behavior in `Given / When / Then` language. For TDD, add or update a failing test first when practical, then implement the minimum code needed to pass.

6. Implement narrowly.
   Make the smallest coherent change that satisfies the current milestone. Follow existing project patterns and tooling. Use SOLID principles to keep modules maintainable, KISS to avoid unnecessary complexity, and design patterns only when they fit the local problem and make the code easier to reason about. Avoid unrelated refactors, formatting churn, or opportunistic cleanup.

7. Update the ExecPlan continuously.
   Mark completed progress, record discoveries, add decisions, and update concrete steps or validation notes when reality differs from the plan. Do not erase prior context; append or revise so a fresh agent can resume from the plan alone.

8. Validate.
   Run the exact validation commands or manual checks specified in the ExecPlan. Include available lint, typecheck, build, unit, integration, and end-to-end commands. If tooling does not exist yet, perform the documented manual checks and record that automated tooling is unavailable. If validation fails, fix within scope or record the failure and stop when the fix would exceed the approved plan.

9. Validate UI with Playwright when applicable.
   For browser UI changes, use Playwright to exercise the affected flow across relevant viewports. Capture screenshots for reference when they help prove layout, behavior, or regression status. If Playwright is not installed or no UI runtime exists yet, record the blocker and the future validation command or setup needed.

10. Review against gates.
   Before finalizing, check the implementation against the approved design, security expectations, code quality expectations, validation gates, and no-self-approval policy. Treat this as pre-human-review evidence, not approval.

11. Handle drift.
   If implementation reveals a missing requirement, feature scope change, story change, design decision, ADR need, or new validation gate, stop and recommend returning to the appropriate earlier PDLC skill. Do not silently widen scope.

12. Recommend subagent review when risk warrants it.
   If the user explicitly asks for subagents, parallel review, or independent validation, use `implementation_reviewer` to review the changes against the approved ExecPlan and acceptance criteria. Use `architecture_decision_reviewer` for design and architecture drift, `security_reviewer` for security-sensitive changes, `quality_gate_reviewer` for code quality and maintainability, `validation_gate_reviewer` for validation and CI/CD gate readiness, and `product_coherence_reviewer` for product intent drift.

## Implementation Quality Bar

An implementation pass should show:

- The work traces back to an approved ExecPlan or explicit human instruction.
- Work happens on a feature branch or the reason it did not is documented.
- Changed files match the milestone scope.
- Behavior expectations are captured with BDD-style scenarios and TDD-style tests where practical.
- The implementation applies SOLID, KISS, and appropriate design patterns without over-engineering the solution.
- The ExecPlan progress and evidence are current.
- Lint, typecheck, build, test, and manual checks were run when available, or the reason they could not run is recorded.
- UI changes were validated with Playwright and screenshots when a browser UI exists.
- Design, security, quality, and validation gates were reviewed before human acceptance.
- Any deviations from the plan are documented and approved by a human before proceeding.
- No unrelated user changes were reverted or overwritten.
- The final response clearly states what changed, how it was validated, and what remains.

## Stop Conditions

Stop and ask for human approval before proceeding when:

- The plan is not approved and the user has not explicitly asked for implementation.
- The implementation requires a scope change or new user-visible behavior.
- A new durable architecture decision or ADR is needed.
- A destructive operation, migration, credential change, external service change, or release action is required.
- Security review reveals a credible vulnerability that cannot be fixed within the approved scope.
- Validation cannot be completed and continuing would hide risk.
- Existing user changes conflict with the planned work.

## Human Checkpoint

End implementation work by asking the human to approve or revise:

- Completed milestone scope
- Code, docs, tests, or configuration changed
- Validation evidence
- Playwright screenshots or UI validation evidence when applicable
- Design, security, quality, and validation gate review results
- ExecPlan updates
- New risks, decisions, or follow-up work
- Whether the work may proceed to validation review, release readiness, or another milestone

Codex and subagents may recommend readiness, but must not mark implementation complete, accepted, released, or merged without explicit human approval.

## Output Pattern

When completing an implementation pass, provide:

- The ExecPlan file path.
- Source requirement, feature, story, design, ADR, and validation file paths used.
- Files changed.
- Milestone progress completed.
- Validation commands or manual checks and results.
- Playwright checks and screenshots when applicable.
- Design, security, quality, and validation gate review notes.
- Deviations, risks, or follow-up work.
- The human approval checkpoint and recommended next action.
