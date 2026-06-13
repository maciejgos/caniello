# Feature: MVP validation readiness recovery

## Source Notes

The 2026-06-13 MVP validation readiness artifact was initially accepted, then narrowed after manual validation found gaps in new-owner access, social auth expectations, Bruno-specific app surfaces, mockup fidelity, pet/profile IA, document upload expectations, Timeline/Reminder relationship, account deletion persistence, and local confirmation email behavior.

## User Problem

A human validator cannot confidently treat the current app as broadly MVP-ready because the seeded-owner happy path works, but several first-time-owner and mockup-fidelity paths either fail, advertise unavailable behavior, or do not match the supplied MVP visual artifacts.

## Outcome

Caniello has a clear, evidence-backed recovery path from "seeded-owner internal validation only" to a broader MVP validation pass. Each gap is represented by a small task with scope, non-goals, acceptance criteria, verification expectations, and approval notes.

MVP UI implementation should follow the supplied mockups in `spec/design/visual-artifacts/mvp/*.png` 1:1 wherever the task touches visible layout, navigation, controls, labels, or panel structure. Any deviation must be explicitly recorded with a reason before the task can be considered ready.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The work protects the existing `Now - MVP Foundation` promise: a pet owner can onboard, manage one pet's health records, reminders, documents, shareable care information, and account/privacy settings without help. It does not add marketplace, clinic, AI diagnosis, payments, broad partner, or advanced household scope.

## Scope

- Preserve the existing readiness artifact as scoped evidence for seeded-owner internal validation.
- Make new-owner signup/login validation possible in local development.
- Remove or implement misleading OAuth affordances.
- Align the dashboard/app shell with live pet state and MVP mockups.
- Clarify first-pet versus multi-pet UX and expected species/sex-or-gender controls.
- Decide whether document upload is required for MVP validation before implementation expands storage behavior.
- Align Timeline with `spec/design/visual-artifacts/mvp/image 10.png`: historical events in the main timeline and upcoming reminders/actions in the right rail.
- Re-verify account deletion persistence against the intended database table.

## Non-Goals

- Production release, deployment, merge approval, or roadmap phase movement.
- Marketplace mechanics, booking, payments, clinic SaaS, PIMS/EHR integrations, or partner workflow ownership.
- AI symptom checking, diagnosis, treatment advice, emergency advice, or official EU pet passport replacement claims.
- Advanced household roles, family plans, calendar sync, advanced analytics, referral mechanics, duplicate detection, or broad partner document-upload flows.

## Candidate Tasks

- `spec/tasks/mvp-readiness-baseline-and-script.md`
- `spec/tasks/new-owner-access-validation.md`
- `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`
- `spec/tasks/pet-profile-ia-and-controls.md`
- `spec/tasks/document-upload-scope-decision.md`
- `spec/tasks/timeline-upcoming-reminders-alignment.md`
- `spec/tasks/account-deletion-persistence-verification.md`

## Open Questions

- Should real document file upload be required for the next MVP validation pass, or is metadata-only acceptable with clearer copy?
- Should Google and Apple sign-in be implemented now, or hidden/disabled until provider configuration is intentionally scheduled?
- Should completing a reminder automatically create or link to a timeline event, or should that remain a later automation task?
- Is one-pet MVP validation acceptable if the app shell visually suggests multi-pet selection?

## Approval Notes

Human approval is required before implementation begins on any task that changes auth provider behavior, introduces file upload/storage, changes database schema, changes account deletion behavior beyond verification, or expands MVP scope beyond the current `Now` roadmap.

Human approval is also required for intentional deviations from the MVP mockups when a 1:1 implementation is not feasible or would conflict with current approved scope.
