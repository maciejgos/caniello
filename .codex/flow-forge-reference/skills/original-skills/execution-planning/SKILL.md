---
name: execution-planning
description: Create or update self-contained Codex ExecPlans for approved designs, stories, or significant implementation work. Use when Codex is asked to move from solution design or story approval into spec/plans, plan complex features or refactors, define milestones, concrete steps, validation, risks, recovery, interfaces, or prepare work for implementation without starting code changes yet.
---

# Execution Planning

## Overview

Turn approved design or story artifacts into a self-contained ExecPlan that a fresh Codex agent or human novice can execute end to end. The plan must preserve intent, explain context, define milestones, specify exact steps, and prove the work through observable validation.

## Operating Principles

- Follow `spec/plans/PLANS.md` as the source of truth.
- Never self-approve an ExecPlan or checkpoint; only a human can approve, accept, reject, or authorize implementation.
- Treat the ExecPlan as the handoff from design to implementation.
- Make the plan self-contained; do not rely on chat history.
- Define every term of art in plain language.
- Prefer observable outcomes over internal completion claims.
- Resolve non-critical ambiguity in the plan and record the rationale.
- Preserve critical ambiguity as open questions or human checkpoints.
- Do not edit source code, tests, or CI/CD configuration unless the user explicitly asks to implement the plan.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, `spec/plans/PLANS.md`, and all source artifacts linked by the user. Usually this means reading the relevant requirement, feature, story, design, ADR, and validation notes.

2. Check planning readiness.
   Confirm that the source artifacts contain enough approved or review-ready context to plan implementation. If design decisions, acceptance criteria, or validation expectations are missing, recommend returning to the appropriate earlier skill before drafting a full ExecPlan.

3. Choose plan scope.
   Create one ExecPlan for one coherent implementation outcome. Split the plan if the work has independent deliverables, unrelated code areas, or separate validation paths.

4. Draft the ExecPlan.
   Create or update one Markdown file under `spec/plans/` using a kebab-case filename. The file content should be the ExecPlan itself, without wrapping it in an outer fenced code block. Include all required sections from `spec/plans/PLANS.md`.

5. Build milestones around proof.
   Each milestone should produce something observable. Explain what changes, what command or review step proves it, and what the user or agent should see.

6. Define concrete steps.
   Include exact commands, working directories, file paths, functions, modules, and expected outputs where possible. If no toolchain exists yet, say so and define manual validation steps that can run now.

7. Capture decisions and uncertainty.
   Keep `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` ready for ongoing maintenance. If the plan depends on an ADR, link it. If an ADR is missing, recommend returning to `solution-design`.

8. Define validation and recovery.
   Include test commands, manual checks, expected outputs, idempotence notes, and recovery steps. Distinguish checks that can run now from checks that require future tooling.

9. Recommend subagent review when risk warrants it.
   If the user explicitly asks for subagents, parallel review, or independent validation, use `execution_plan_reviewer` to review the ExecPlan for self-containment and executability. Use `architecture_decision_reviewer` for architecture risk and ADR coverage, and `validation_gate_reviewer` for validation and CI/CD gate readiness.

## ExecPlan Quality Bar

A strong ExecPlan should answer:

- What user-visible or agent-visible outcome will exist after implementation?
- Why does the work matter?
- Which requirements, features, stories, designs, ADRs, and validation artifacts does it depend on?
- What files and modules are likely to change?
- What milestones produce independently verifiable progress?
- What exact commands or manual checks prove success?
- What risks, assumptions, and open questions remain?
- How can another agent resume from the plan alone?
- How can failed or partial steps be retried safely?

## Required Living Sections

Every ExecPlan must contain and maintain:

- `Progress`
- `Surprises & Discoveries`
- `Decision Log`
- `Outcomes & Retrospective`

Initialize these sections even when the plan is brand new. Use `Draft` language until the human approves execution.

## Human Checkpoint

End execution-planning work by asking the human to approve or revise:

- Plan scope
- Milestones and sequence
- Concrete implementation steps
- Validation and acceptance approach
- Risks, assumptions, and recovery guidance
- Whether subagent review is needed before implementation
- Whether Codex may begin implementation

Do not move to `src/`, `tests/`, or CI/CD configuration until this checkpoint is approved or the user explicitly asks to continue.

Codex and subagents may recommend that the ExecPlan is ready for review, but must not begin implementation or treat the checkpoint as complete without explicit human approval.

## Output Pattern

When creating or updating an ExecPlan, provide:

- The ExecPlan file path.
- Source requirement, feature, story, design, ADR, and validation file paths used.
- A short summary of the implementation outcome.
- Key risks or assumptions.
- Validation commands or manual checks.
- The human approval checkpoint and recommended next action.
