---
name: requirements-refinement
description: Refine raw product ideas, stakeholder notes, ambiguous requests, discovery findings, or early feature concepts into reviewable PDLC requirement artifacts. Use when Codex is asked to start the PDLC process, clarify business/user needs, draft or improve files under spec/requirements, identify gaps and risks, produce acceptance criteria, or prepare requirements for human approval before feature shaping.
---

# Requirements Refinement

## Overview

Turn uncertain product intent into a clear requirement that a human can review and approve. Produce artifacts that explain the problem, goals, non-goals, stakeholders, constraints, acceptance criteria, and open questions without jumping into implementation.

## Operating Principles

- Keep humans in control of intent, priority, and approval.
- Never self-approve a requirement or checkpoint; only a human can approve, accept, reject, or mark it complete.
- Preserve ambiguity as open questions instead of inventing business facts.
- Ask only blocking questions before drafting; otherwise make reasonable assumptions and label them.
- Use plain language before process language.
- Tie every acceptance criterion to observable behavior or evidence.
- Do not create feature, story, design, plan, or source-code artifacts unless the user asks to continue beyond requirements.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, `spec/README.md`, and `spec/requirements/TEMPLATE.md` when they exist. If editing an existing requirement, read that file and any linked artifacts.

2. Classify the input.
   Identify the raw need, user or stakeholder, desired outcome, constraints, urgency, known risks, and any unstated assumptions. If the request is too vague to create a useful requirement, ask one concise clarification question focused on the missing decision.

3. Draft the requirement.
   Use `spec/requirements/TEMPLATE.md` as the structure. Prefer creating or updating one focused Markdown file in `spec/requirements/` using a kebab-case filename, such as `requirements-refinement.md` or `customer-onboarding.md`.

4. Separate certainty from uncertainty.
   Put known decisions in the main sections. Put unresolved facts, missing data, and product decisions in `Open Questions`. If an assumption is needed to make progress, state it explicitly in the relevant section.

5. Write acceptance criteria.
   Use behavior-focused criteria in the form `Given <context>, when <action>, then <observable result>`. Include acceptance criteria for quality, safety, or operational constraints when those are part of the need.

6. Check readiness.
   Before finishing, verify that the requirement has enough information to shape features. If not, summarize what is missing and mark the requirement as `Draft`. If it is ready for human review, keep the status as `Draft` unless the user explicitly approves it.

## Requirement Quality Bar

A refined requirement should answer:

- What problem are we solving?
- Who is affected?
- Why does this matter now?
- What outcomes are wanted?
- What is intentionally out of scope?
- What constraints or risks shape the solution?
- How will a human know the requirement has been satisfied?
- What questions must be answered before feature shaping or implementation?

## Human Checkpoint

End requirements-refinement work by asking the human to approve or revise:

- Problem statement
- Goals and non-goals
- Stakeholders
- Constraints and risks
- Acceptance criteria
- Open questions

Do not move to `spec/features/` until this checkpoint is approved or the user explicitly asks to continue.

Codex may recommend that the requirement is ready for review, but must not change status to approved or treat the checkpoint as complete without explicit human approval.

## Output Pattern

When creating or updating a requirement, provide:

- The requirement file path.
- A short summary of the refined requirement.
- Any assumptions made.
- The human approval checkpoint and recommended next action.
