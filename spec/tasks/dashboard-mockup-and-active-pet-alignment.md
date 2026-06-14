# Task: Dashboard mockup and active-pet alignment

## Goal

Align the authenticated dashboard and app shell with live pet state and the supplied MVP mockups so the app no longer feels hardcoded to Bruno during validation.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The dashboard is the first signed-in owner surface. It must support MVP activation and confidence in saved pet data without relying on demo-only copy.

Related roadmap item:

`spec/roadmap.md` - Now / user can onboard without help and create at least one pet profile, reminder, or document.

## Scope

- Remove hardcoded Bruno dashboard text where live pet data exists.
- Make the active-pet display reflect the current saved pet state for the MVP validation path.
- Make first-launch versus returning-owner dashboard controls consistent and understandable.
- Implement the dashboard and app shell against `spec/design/visual-artifacts/mvp/*.png` 1:1 for visible layout, navigation, controls, labels, spacing, and panel structure wherever those artifacts define the state.
- Record any intentional deviation from the mockups with a reason and human approval requirement.
- Add focused UI tests and desktop/mobile browser smoke for the dashboard/app shell.

## Non-Goals

- Full multi-pet management unless explicitly planned in the pet/profile IA task.
- New AI behavior, notification delivery, document upload, or sharing-permission behavior.
- Rebuilding the whole design system.

## Acceptance Criteria

- The dashboard does not show Bruno-specific copy for a different saved pet.
- The first-launch and returning-owner entry points use consistent labels and actions.
- The app shell active-pet affordance does not imply functionality that is unavailable.
- The relevant dashboard/app-shell mockups are matched 1:1, or each deviation is explicitly documented and approved before readiness.
- Desktop and mobile checks show no overlap, horizontal overflow, or obvious mockup-fidelity regression.

## Implementation Notes

- Likely files: `apps/web/features/account/content.ts`, `apps/web/features/account/AccountApp.tsx`, dashboard components, and tests.
- Use the mockups in `spec/design/visual-artifacts/mvp/` as visual references, especially app-shell and dashboard images.
- Keep unavailable capabilities disabled or clearly preview-only.
- Follow ADR 0027 by keeping the dashboard oriented around the first active pet for MVP validation instead of introducing broad multi-pet management.
- Follow ADR 0028 by keeping cross-cutting access behind explicit helpers/providers and avoiding new broad service layers for dashboard alignment.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0012-polish-first-mvp-localization.md`, `spec/architecture-records/0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md`, `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`.
- New ADR needed: No.
- ADR draft: None.
- Approval state: ADRs accepted; human approval is still required for intentional mockup deviations before readiness.

## Verification

- [ ] Focused component tests.
- [ ] Browser checks at desktop and mobile widths.
- [ ] Manual mockup review recorded.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
