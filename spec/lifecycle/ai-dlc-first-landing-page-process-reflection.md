# Lifecycle Retrospective: AI-DLC First Landing Page Process Reflection

## Status

Accepted

## Scope

This reflection reviews the AI-DLC / AI-native PDLC process used for the first Caniello landing page cycle through release-readiness review. It covers the requirement, ExecPlan, implementation evidence, validation artifact, and release-readiness artifact.

This is not a production-release retrospective. No deployment, public validation traffic, merge, tag, announcement, or post-release user behavior is being reviewed.

## Source Artifacts

- [First Landing Page Requirement](../requirements/first-landing-page.md)
- [Build the First Caniello Landing Page ExecPlan](../plans/first-landing-page.md)
- [First Landing Page Validation](../validation/first-landing-page-validation.md)
- [First Landing Page Release Readiness](../release-readiness/first-landing-page-release-readiness.md)
- Implementation files referenced by the process review:
  - `src/components/WaitlistForm.tsx`
  - `src/App.test.tsx`
  - `tests/e2e/landing.spec.ts`
  - `src/content.ts`

## Expected Outcomes

The AI-DLC process was expected to produce a traceable landing-page delivery path from human-approved product intent through implementation, validation, release-readiness review, and a human decision checkpoint.

The process was also expected to keep the first landing page narrow, evidence-driven, and human-governed: no overbuilt product surface, no unsupported medical or official-passport claims, no self-approved lifecycle gates, and no production launch without explicit human approval.

## Observed Outcomes

The process created useful traceability. The requirement, ExecPlan, validation artifact, and release-readiness artifact form a readable chain from intent to implementation evidence. Automated checks and Playwright screenshots gave stronger evidence than manual review alone, and human feedback corrected meaningful drift in visual direction and logo usage.

The process also exposed coordination gaps. Validation remained in `Draft` while release readiness was later marked `Accepted`, creating ambiguity about which lifecycle gate was actually approved. Release-readiness review happened while source edits and screenshot updates were still in the working tree. Conversion measurement, deployment target, rollback path, and CI/CD stayed unresolved until late release-readiness discussion, even though they affect whether a landing page can serve its validation purpose.

## Evidence

- Evidence: Requirement status is `Accepted` and defines the landing page goals, constraints, and acceptance criteria.
  Source: `spec/requirements/first-landing-page.md`

- Evidence: ExecPlan records implementation progress, human design feedback, visual realignment, logo correction, validation commands, and remaining gaps.
  Source: `spec/plans/first-landing-page.md`

- Evidence: Validation records passed Docker, build, lint, unit, Playwright, manual copy, and design-reference checks, but still has `Status` set to `Draft`.
  Source: `spec/validation/first-landing-page-validation.md`

- Evidence: Release readiness records local gates as passed, CI/CD as unavailable, conversion measurement as unavailable, deployment target as pending, and source edits as a candidate-scope risk.
  Source: `spec/release-readiness/first-landing-page-release-readiness.md`

- Evidence: Playwright screenshots are tracked validation evidence and were refreshed during release-readiness checks, causing binary file churn.
  Source: `spec/validation/screenshots/`

- Evidence: Email validation behavior and its tests were present as candidate source changes during readiness review.
  Source: `src/components/WaitlistForm.tsx`, `src/App.test.tsx`

- Evidence: The lifecycle flow used specialized Codex skills for validation review, release readiness, and lifecycle reflection, while subagents were intentionally not used because the human did not explicitly request delegated or independent review.
  Source: Current AI-DLC operating instructions and the generated validation, release-readiness, and lifecycle artifacts.

## Confirmed Assumptions

- A lightweight AI-DLC artifact chain can make small product slices easier to govern without relying on chat history alone.
- Human visual feedback is essential for brand-sensitive UI work; automated tests cannot judge whether the result feels aligned with an intended brand direction.
- Dockerized validation is useful when host tooling is incomplete or inconsistent.
- Keeping waitlist submission non-persistent avoided premature personal-data handling before analytics, storage, and consent decisions were made.
- The no-self-approval rule helped preserve a human decision boundary around validation, release, deployment, and public launch traffic.
- Codex skills are useful when they mark real PDLC stage changes. In this cycle, validation review, release readiness, and lifecycle retrospective skills helped create consistent evidence and decision checkpoints.
- Review subagents are likely useful for independent risk review, but only when the risk justifies parallel review or the human explicitly asks for subagents.

## Disproven or Risky Assumptions

- Assuming release readiness can be cleanly assessed while validation remains `Draft` is risky. It weakens the meaning of both gates.
- Assuming local reruns are enough for release confidence is risky without CI/CD or a repeatable hosted deployment check.
- Assuming screenshot evidence can be refreshed freely is risky because tracked binary files create review noise and make it harder to see meaningful changes.
- Assuming conversion measurement can be deferred until after implementation is risky for a landing page whose purpose is demand validation.
- Assuming visual direction is clear from references alone is risky; the first implementation drifted until human feedback tightened the expected match.
- Assuming an uncommitted working tree is acceptable during release-readiness review is risky unless the candidate scope is explicitly documented.
- Assuming every skill or subagent should run on every change is risky. It can create ceremony, duplicate review text, and a false sense of safety while core product, validation, or deployment decisions remain unresolved.
- Assuming subagent review equals human approval is risky. Subagents can recommend, challenge, and find gaps, but they cannot approve checkpoints, release, merge, deploy, or accept risks.

## Lessons Learned

The process worked best when it treated artifacts as a living control plane rather than paperwork. The requirement constrained product claims, the ExecPlan captured implementation decisions, validation mapped checks back to acceptance criteria, and release readiness surfaced unresolved launch risks.

The weakest point was lifecycle state coordination. An `Accepted` release-readiness artifact sitting on top of `Draft` validation evidence creates a confusing signal. Future readiness reviews should include a preflight check for artifact status consistency and should state whether release readiness is evaluating accepted validation, draft validation, or a limited local candidate.

The second weak point was candidate cleanliness. Release-readiness review should ideally happen against a clearly bounded candidate: either a clean working tree, a named branch, a pull request, or an explicitly listed dirty-tree scope. When source edits, screenshots, and readiness artifacts change together, the human reviewer has to separate implementation behavior from evidence churn.

The third weak point was late validation-instrumentation planning. A landing page exists to measure interest, but analytics, persistent waitlist capture, survey routing, deployment target, privacy expectations, and rollback path were still open at release readiness. That is acceptable for a local candidate, but not for public validation traffic.

Skills and subagents should stay purposeful. Skills are most valuable when they enforce the shape of a stage transition: raw intent to requirements, requirements to design, design to plan, plan to implementation, implementation to validation, validation to release readiness, and release evidence to lifecycle learning. Subagents are most valuable when independent review would catch a real risk, such as validation evidence gaps, release blockers, security and privacy exposure, product incoherence, or implementation quality issues. They should not be used to make the process look complete when unresolved decisions still need human judgment.

## Follow-Up Recommendations

- Requirements: No requirement change is needed unless the human wants conversion measurement, analytics, storage, or deployment target to become explicit acceptance criteria for the first public launch.
- Features: No new feature artifact is needed yet; public validation instrumentation could become a follow-up feature if it expands beyond the landing page requirement.
- Stories: If public launch is next, create a focused story for conversion measurement and deployment readiness rather than mixing it into visual landing-page polish.
- Design / ADRs: Add a short design acceptance note for brand-sensitive pages that distinguishes "inspired by reference" from "1:1 mockup match."
- Plans: Update future ExecPlans to include a release-readiness preflight: validation status, dirty-tree state, screenshot policy, deployment target, rollback path, and CI/CD availability.
- Implementation: Review the current email validation source edits intentionally before merge or deployment; keep them if they are part of the candidate scope, revise them if not.
- Validation: Define a screenshot refresh policy and canonical E2E command. Record when screenshots are expected to change, when they should be reviewed, and whether binary evidence should be regenerated during release-readiness review.
- Release Readiness: Require either a clean working tree or an explicit dirty-tree candidate inventory before advisory readiness state is assigned.
- Process / Operations: Add an artifact-status consistency checklist before moving from validation to release readiness. At minimum, check requirement, validation, release-readiness, and human-decision states.
- Process / Operations: Use skills at PDLC stage boundaries, and use subagents only for explicit independent review or material risk. Recommended reviewers for future public launch work are `validation_gate_reviewer`, `security_reviewer`, `quality_gate_reviewer`, and `release_readiness_reviewer`.

## Human Checkpoint

Human approval is needed before any follow-up work is treated as accepted priority or before a new PDLC loop starts.

Recommended human decisions:

- Decide whether the `Draft` validation artifact should be reviewed, revised, or accepted before relying on the accepted release-readiness note.
- Decide whether the current uncommitted source edits in `src/components/WaitlistForm.tsx` and `src/App.test.tsx` belong in the release candidate.
- Decide whether the next loop should start at validation, release readiness, planning, or implementation for public validation traffic.
- Decide whether analytics, persistent waitlist capture, survey routing, or another conversion signal is required before sending real traffic to the landing page.
- Decide whether future public launch readiness should use independent subagent reviews for validation, security, quality, and release readiness before the final human decision.
