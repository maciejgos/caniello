# Task: Interactive MVP Flow Prototype

## Goal

Create a frontend-only interactive Caniello MVP flow that lets a reviewer click through the supplied visual sequence from account creation to settings.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The roadmap explicitly requires visible MVP surfaces to follow the MVP mockups 1:1 where possible. This task creates a reviewable prototype for the owner onboarding, document, reminder, timeline, Ask Caniello, and settings journey without adding backend capability.

Related roadmap item:

`Now - MVP Foundation`: owner account, pet profile, reminders, document vault, timeline, Ask-style owner organization assistance, and shareable care information surfaces.

## Scope

- Add a frontend-only `/mvp-flow` prototype route that follows the requested sequence: sign up, sign in, home first run, add pet, documents library, document upload, document processing, document review, reminders, add reminder, timeline, Ask Caniello, Sharing, and settings.
- Match the supplied MVP visual artifacts under `spec/design/visual-artifacts/mvp/` as closely as practical in layout, palette, typography, density, imagery, and shell structure.
- Implement local-state interactions for form submission, navigation, upload/progress simulation, document confirmation, reminder creation, chat prompt entry, and settings toggles.
- Validate the prototype with focused React coverage, TypeScript, and browser/Playwright visual checks.

## Non-Goals

- No real authentication, Supabase writes, storage upload, OCR, AI extraction, AI answer generation, reminders delivery, email, push notifications, share-link creation, PDF export, migrations, or external service calls.
- No release, deployment, production-readiness, roadmap movement, or human approval checkpoint changes.
- No clinic, marketplace, booking, payment, diagnosis, treatment recommendation, emergency advice, or official passport replacement behavior.

## Acceptance Criteria

- `/mvp-flow` renders a code-native interactive prototype rather than a static screenshot.
- The primary buttons click through the requested flow in order.
- App shell screens visually follow the Caniello MVP screenshots: left sidebar, top search, pet selector, notification/account affordances, cream/navy/gold palette, dense cards, and Bruno-focused sample data.
- Auth screens visually follow the supplied split image/form screenshots and keep OAuth buttons inert.
- Document upload/processing/review screens clearly preserve the user-confirm-before-save boundary.
- Ask Caniello answer copy cites user-owned records and avoids diagnosis, treatment, and emergency advice.
- Focused tests cover the core prototype progression.
- TypeScript and browser visual checks are run or explicitly recorded as unavailable.

## Implementation Notes

- Source visual truth: the named screen and flow references listed in `spec/design/visual-artifacts/mvp/README.md`, plus the screenshots supplied in the user request.
- Use feature-local code under `apps/web/features/mvp-flow/` and a route under `apps/web/app/(landing)/mvp-flow/`.
- Keep the prototype local-state only so it cannot imply real upload, storage, AI, reminder delivery, or sharing capability.

## Architecture Decisions

- Existing ADRs: ADR 0011 pragmatic engineering, ADR 0027 first-pet MVP scope, ADR 0028 feature-local vertical slices, ADR 0032 email-first owner auth.
- New ADR needed: No.
- ADR draft: None.
- Approval state: Not needed.

## Verification

- [x] Tests run or explicitly recorded as unavailable.
- [x] Manual validation completed when relevant.
- [x] UI validated with Playwright/browser checks when relevant.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Implemented on branch `codex/interactive-mvp-flow`.

Validation artifact: `spec/validation/interactive-mvp-flow-prototype-evaluation.md`.

Design QA artifact: `design-qa.md`.

Validation passed: focused React test for the full prototype progression, direct TypeScript compiler check, and `git diff --check`.

Follow-up browser-comment fix on 2026-06-15 added the missing Sharing screen and widened the header search bar.

Validation limitation: `pnpm --filter web lint` rerun failed in the sandbox with `[ERROR] fetch failed`, so the equivalent direct compiler command was run from `apps/web` instead. Escalation/browser screenshot reruns were blocked by the automatic reviewer usage-limit path.
