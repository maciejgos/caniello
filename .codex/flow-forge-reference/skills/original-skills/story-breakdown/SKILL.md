---
name: story-breakdown
description: Break scoped PDLC feature artifacts into implementation-ready user stories. Use when Codex is asked to move from spec/features to spec/stories, slice a feature into deliverable increments, clarify story scope, define story-level acceptance criteria, add implementation notes, sequence stories, or prepare stories for human approval before design or execution planning.
---

# Story Breakdown

## Overview

Turn a shaped feature into small, reviewable stories that can be implemented and validated independently. Produce artifacts that preserve user value, link back to source features and requirements, define scope boundaries, and make acceptance criteria concrete enough for implementation planning.

## Operating Principles

- Start from feature artifacts and their linked requirements.
- Never self-approve a story or checkpoint; only a human can approve, accept, reject, or mark it complete.
- Slice stories by user-visible value or agent capability, not by internal technical layers alone.
- Keep each story small enough to implement, review, and validate in one focused pass.
- Preserve sequencing, dependencies, risks, and unknowns explicitly.
- Keep design and implementation choices lightweight unless they are needed to make the story actionable.
- Do not create design docs, ExecPlans, validation artifacts, tests, or source code unless the user explicitly asks to continue.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, `spec/README.md`, and `spec/stories/TEMPLATE.md` when they exist. Read the source feature file under `spec/features/` and any linked requirements. If the user did not name a feature, inspect available feature files and choose the most relevant one, or ask one concise question if the choice is unclear.

2. Check readiness.
   Confirm that the feature has enough information to break down: summary, source requirements, users and use cases, scope, out-of-scope boundaries, behavior, and acceptance criteria. If the feature is too incomplete, explain the gap and recommend returning to feature shaping.

3. Identify story slices.
   Break the feature into independently useful increments. Prefer vertical slices that include the minimum artifact, behavior, validation, or workflow needed to create observable value. Avoid stories that only say "build backend", "build UI", or "write tests" unless the feature is purely internal and the value is still observable.

4. Sequence the stories.
   Order stories by dependency and learning value. Put foundation stories before stories that depend on them. Put risky or uncertain work early enough to reveal blockers before large implementation effort.

5. Draft story artifacts.
   Use `spec/stories/TEMPLATE.md` as the structure. Create or update one Markdown file per story in `spec/stories/` using kebab-case filenames, such as `create-requirement-artifact.md` or `review-human-checkpoint.md`.

6. Link source artifacts.
   In `Background` or `Implementation Notes`, link the source feature and requirement files. Include enough context that the story is understandable without rereading the entire feature.

7. Define acceptance and validation.
   Write story-level acceptance criteria in `Given <context>, when <action>, then <observable result>` form. Add validation notes that describe how Codex or a human will prove the story is complete.

8. Check implementation readiness.
   Before finishing, verify each story has clear user or agent value, scope, out-of-scope boundaries, acceptance criteria, implementation notes, and validation. Keep status as `Draft` unless the human explicitly approves the story.

## Story Quality Bar

An implementation-ready story should answer:

- Who or what benefits from the story?
- What user-visible or agent-visible capability changes?
- Which feature and requirement justify the story?
- What exact work is included?
- What related work is out of scope?
- What must be true for the story to be accepted?
- How can completion be validated?
- What dependencies, risks, or sequencing notes matter?

## Slicing Heuristics

Prefer story slices that:

- Deliver a complete artifact or behavior, even if small.
- Can be validated without waiting for the entire feature.
- Reduce uncertainty early.
- Keep risky decisions visible for human review.
- Avoid coupling unrelated outcomes into one large story.

Split a story when it has multiple independent acceptance paths, requires unrelated files or systems, or cannot be reviewed coherently. Merge stories when they cannot produce meaningful value separately.

## Human Checkpoint

End story-breakdown work by asking the human to approve or revise:

- Story list and sequence
- Source feature and requirement links
- Story scopes and out-of-scope boundaries
- Acceptance criteria
- Implementation notes
- Validation approach
- Whether stories are ready for design, ExecPlans, or implementation

Do not move to `spec/design/`, `spec/plans/`, `spec/validation/`, `tests/`, or `src/` until this checkpoint is approved or the user explicitly asks to continue.

Codex may recommend that stories are ready for review, but must not change status to approved or treat the checkpoint as complete without explicit human approval.

## Output Pattern

When creating or updating stories, provide:

- The story file paths.
- The source feature file path and linked requirement file paths.
- A short summary of the story sequence.
- Any assumptions made.
- The human approval checkpoint and recommended next action.
