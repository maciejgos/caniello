# Task: Pet profile IA and controls

## Goal

Clarify first-pet versus multi-pet expectations and improve pet profile controls so the MVP validation path feels intentional rather than half-multi-pet.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The MVP depends on a usable pet profile foundation. The task improves activation and data quality without committing to advanced household or care-team behavior.

Related roadmap item:

`spec/roadmap.md` - Now / owner can create and manage a pet profile.

## Scope

- Decide and express whether the current MVP validates one active pet or multiple pets.
- Update active-pet selector/menu copy and behavior so it does not imply add/edit functionality that is absent.
- Improve species and sex-or-gender inputs into clear choices when required for validation.
- Match the pet-profile states in `spec/design/visual-artifacts/mvp/web-assistant-sharing-flow.png` and `spec/design/visual-artifacts/mvp/mobile-assistant-sharing-flow.png` 1:1 for visible IA, controls, labels, and pet-menu behavior, unless a deviation is explicitly recorded and approved.
- Preserve existing first-pet data persistence and RLS boundaries.
- Add tests for the selected UX behavior and validation labels.

## Non-Goals

- Advanced multi-pet household management unless explicitly approved.
- Family/caregiver roles, complex permissions, or care-team workflows.
- Veterinary taxonomy, breed database, duplicate detection, or advanced analytics.

## Acceptance Criteria

- The UI clearly communicates the supported pet scope for MVP validation.
- Species and sex-or-gender controls match the chosen product language and validation expectation.
- Add/edit affordances do not advertise unavailable behavior.
- Pets/Profile UI matches the supplied MVP mockups 1:1 where those mockups define the state, or approved deviations are documented.
- Existing pet profile save/reload behavior remains covered by tests.

## Implementation Notes

- Relevant implementation likely touches `PetProfileSection`, account-shell active-pet UI, content strings, and account tests.
- Keep field naming compatible with existing contracts unless a schema change is explicitly approved.
- Any database migration or contract change needs focused verification and human awareness.
- Follow ADR 0027: the default MVP path is one active first pet, and true multi-pet management remains deferred unless explicitly approved.
- Follow ADR 0028 for feature-local implementation boundaries and explicit shared-package graduation if contracts or shared helpers change.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`, `spec/architecture-records/0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md`, `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`.
- New ADR needed: No unless this becomes true multi-pet management with durable selection state.
- ADR draft: None.
- Approval state: ADRs accepted; true multi-pet management still needs explicit approval.

## Verification

- [ ] Focused pet profile tests.
- [ ] Browser validation for first-pet profile flow.
- [ ] No owner-isolation regression.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
