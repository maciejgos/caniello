---
name: feature-shaping
description: Turn approved or draft requirements into scoped, reviewable PDLC feature artifacts. Use when Codex is asked to move from spec/requirements to spec/features, define feature outcomes, clarify users and use cases, split or merge feature ideas, set scope boundaries, write feature-level acceptance criteria, or prepare a feature for human approval before story breakdown.
---

# Feature Shaping

## Overview

Turn requirement intent into a feature definition that is specific enough for story breakdown but not yet an implementation plan. Produce artifacts that clarify outcome, users, scope, behavior, acceptance criteria, source requirements, and unresolved product decisions.

## Operating Principles

- Start from requirement artifacts, not implementation guesses.
- Never self-approve a feature or checkpoint; only a human can approve, accept, reject, or mark it complete.
- Keep the feature focused on a coherent user or business outcome.
- Prefer one feature per durable capability; split unrelated outcomes into separate features.
- Preserve unresolved ambiguity as open questions or assumptions instead of inventing product facts.
- Keep implementation details out unless they define user-visible behavior or hard constraints.
- Do not create stories, designs, ExecPlans, or source code unless the user explicitly asks to continue.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, `spec/README.md`, and `spec/features/TEMPLATE.md` when they exist. Read the source requirement files under `spec/requirements/` that motivate the feature. If the user did not name a requirement, inspect available requirement files and choose the most relevant one, or ask one concise question if the choice is unclear.

2. Check readiness.
   Confirm that the requirement has enough information to shape a feature: problem, goals, non-goals, stakeholders, constraints, and acceptance criteria. If the requirement is too incomplete, explain the gap and recommend returning to requirements refinement.

3. Choose feature boundaries.
   Identify whether the requirement implies one feature or several. Split when outcomes serve different users, have different acceptance paths, or can be delivered independently. Merge when separate ideas only make sense as one user-facing capability.

4. Draft the feature.
   Use `spec/features/TEMPLATE.md` as the structure. Create or update one focused Markdown file in `spec/features/` using a kebab-case filename, such as `requirements-workbench.md` or `agent-checkpoint-review.md`.

5. Link source requirements.
   In `Source Requirements`, link the requirement files that justify the feature. Keep enough summary context that the feature is understandable, but do not duplicate the full requirement.

6. Define behavior and acceptance.
   Describe what users or agents can do after the feature exists. Write feature-level acceptance criteria in `Given <context>, when <action>, then <observable result>` form. Acceptance should prove the outcome, not internal implementation details.

7. Check story readiness.
   Before finishing, verify that the feature is scoped enough to break into stories. If not, record the missing decisions. Keep status as `Draft` unless the human explicitly approves the feature.

## Feature Quality Bar

A shaped feature should answer:

- What capability will exist?
- What user or agent outcome does it enable?
- Which requirement or requirements justify it?
- Who uses or benefits from it?
- What is included in scope?
- What is explicitly out of scope?
- What behavior must be observable?
- How will a human know the feature is ready for story breakdown?
- What decisions or unknowns remain?

## Human Checkpoint

End feature-shaping work by asking the human to approve or revise:

- Source requirement links
- Feature summary and outcome
- Users and use cases
- Scope and out-of-scope boundaries
- Behavior
- Acceptance criteria
- Whether the feature is ready for story breakdown

Do not move to `spec/stories/` until this checkpoint is approved or the user explicitly asks to continue.

Codex may recommend that the feature is ready for review, but must not change status to approved or treat the checkpoint as complete without explicit human approval.

## Output Pattern

When creating or updating a feature, provide:

- The feature file path.
- The source requirement file path or paths.
- A short summary of the shaped feature.
- Any assumptions made.
- The human approval checkpoint and recommended next action.
