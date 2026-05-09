---
name: lifecycle-retrospective
description: Close the AI-native PDLC loop after release, merge, deployment, incident, or sustained usage by turning feedback, metrics, operational evidence, missed assumptions, and lessons learned into durable lifecycle artifacts routed to the right follow-up stage. Use when Codex is asked to run a retrospective, analyze post-release outcomes, review incidents, capture product learnings, update validation gates, recommend ADR changes, or decide whether discoveries should go to requirements, features, stories, design, planning, implementation, validation, or release readiness.
---

# Lifecycle Retrospective

## Overview

Close the PDLC loop after release by turning real-world evidence into learning. This skill captures what happened, what was learned, what risks remain, and which PDLC stage should receive each follow-up item.

## Operating Principles

- Start from released or observed reality, not from the original plan alone.
- Never self-approve lifecycle outcomes, follow-up priority, incident closure, or process changes.
- Treat feedback, incidents, telemetry, support notes, and validation misses as first-class product inputs.
- Preserve traceability back to released scope, requirements, features, stories, designs, ADRs, ExecPlans, validation artifacts, and release-readiness evidence.
- Separate facts, interpretations, assumptions, and recommendations.
- Route actionable learnings to the earliest PDLC stage that actually needs to change.
- Do not restart at requirements unless the learning changes the problem, goal, constraint, stakeholder need, or acceptance criteria.
- Update validation, design, ADR, plan, implementation, feature, story, or requirement recommendations when reality contradicts previous assumptions.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, relevant release-readiness output, validation artifacts under `spec/validation/`, linked ExecPlans, requirements, features, stories, designs, ADRs, and any provided post-release evidence.

2. Define retrospective scope.
   Clarify whether the retrospective covers a release, deployment, merged branch, incident, user feedback set, metric trend, operational review, or process failure.

3. Collect lifecycle evidence.
   Gather available evidence such as user feedback, support notes, incidents, bug reports, telemetry summaries, monitoring alerts, adoption metrics, performance observations, CI/CD failures, rollback events, or manual review notes. If evidence is missing, record it as a gap.

4. Compare expected and actual outcomes.
   Map real-world evidence back to original goals, acceptance criteria, validation results, release-readiness assumptions, and known risks. Identify where expectations were met, missed, or not measurable.

5. Identify learning.
   Separate product learnings, technical learnings, process learnings, validation gaps, architecture implications, security concerns, quality issues, and operational improvements.

6. Draft or update lifecycle artifact.
   Use `spec/lifecycle/TEMPLATE.md` as the structure. Create or update one focused Markdown file under `spec/lifecycle/` using a kebab-case filename, such as `release-2026-04-retrospective.md` or `artifact-flow-feedback-review.md`.

7. Route follow-up artifacts.
   Recommend the earliest PDLC stage that should receive each follow-up item. Do not create or approve downstream artifacts unless the user explicitly asks to continue.

8. Close the loop.
   If the human approves a learning as actionable work, continue with the appropriate skill: `requirements-refinement`, `feature-shaping`, `story-breakdown`, `solution-design`, `execution-planning`, `implementation-execution`, `validation-review`, or `release-readiness`.

9. Recommend subagent review when risk warrants it.
   If the user explicitly asks for subagents, parallel review, or independent validation, use `lifecycle_learning_reviewer` for post-release learning quality, `product_coherence_reviewer` for product follow-up, `architecture_decision_reviewer` for architecture implications, `security_reviewer` for security incidents or privacy issues, and `validation_gate_reviewer` for missed or weak validation gates.

## Lifecycle Quality Bar

A lifecycle retrospective should answer:

- What release, incident, feedback set, or operating period is being reviewed?
- What outcomes were expected?
- What actually happened?
- What evidence supports the observations?
- Which assumptions were confirmed or disproven?
- Which validation gates worked, failed, or were missing?
- Which product, architecture, security, quality, or process learnings matter?
- Which follow-up items should route to requirements, features, stories, design, planning, implementation, validation, release readiness, or process changes?
- What needs human approval before the next PDLC loop starts?

## Follow-Up Routing

Route each learning to the earliest stage that needs to change:

- `requirements-refinement`: new need, changed business intent, changed stakeholder, changed constraint, or changed acceptance criteria.
- `feature-shaping`: existing requirement remains valid, but capability scope, user outcome, or feature boundary should change.
- `story-breakdown`: feature remains valid, but implementation slices, priority, dependencies, or sequencing should change.
- `solution-design`: story remains valid, but UX, architecture, data flow, interface, security model, or ADR coverage should change.
- `execution-planning`: design remains valid, but milestones, concrete steps, validation commands, or recovery strategy should change.
- `implementation-execution`: plan remains valid, but implementation is incomplete, defective, or needs another scoped milestone.
- `validation-review`: implementation is valid, but evidence, tests, Playwright coverage, or lifecycle gates are weak or missing.
- `release-readiness`: validation is valid, but approval state, rollback, deployment, CI/CD status, or release risk is blocked.

## Evidence Categories

Use these categories when relevant:

- Product evidence: user feedback, stakeholder feedback, adoption, retention, conversion, support tickets, and usability observations.
- Technical evidence: defects, performance, reliability, logs, traces, CI/CD failures, dependency issues, and integration failures.
- Operational evidence: incidents, alerts, rollback events, deployment notes, support burden, runbook gaps, and observability gaps.
- Validation evidence: missed acceptance criteria, weak tests, skipped checks, flaky checks, manual-only gates, and CI/CD improvements.
- Governance evidence: approval gaps, no-self-approval violations, undocumented decisions, ADR drift, and incomplete artifacts.

## Human Checkpoint

End lifecycle-retrospective work by asking the human to approve or revise:

- Retrospective scope
- Evidence summary
- Confirmed and disproven assumptions
- Lessons learned
- Follow-up recommendations
- Follow-up routing by PDLC stage
- New or updated requirements, features, stories, designs, ADRs, plans, validation gates, release checks, or process updates to pursue
- Whether to start the next PDLC loop and at which stage

Codex and subagents may recommend follow-up work and routing, but must not approve priority, close incidents, mark outcomes accepted, or start a new lifecycle loop without explicit human approval.

## Output Pattern

When completing a lifecycle retrospective, provide:

- The lifecycle artifact file path.
- Source release-readiness, validation, ExecPlan, requirement, feature, story, design, ADR, and implementation paths used.
- Evidence reviewed.
- Lessons learned.
- Follow-up recommendations grouped by PDLC stage.
- The human approval checkpoint and recommended next action.
