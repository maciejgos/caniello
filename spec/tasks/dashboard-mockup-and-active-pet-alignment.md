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

- Load the owner-scoped first saved pet through the existing `/api/pets/profile` boundary for the authenticated shell.
- Remove hardcoded Bruno dashboard and active-pet text where live pet data exists.
- Derive first-launch versus returning-owner dashboard state from whether a saved first pet exists; remove the demo-only state switch.
- Make the top-bar pet affordance a non-switching current-context indicator that does not imply multi-pet behavior.
- Align the returning-owner dashboard structure with `spec/design/visual-artifacts/mvp/image 1.png`: greeting and pet summary, `What's next`, health, documents, timeline, Ask Caniello, sharing, and tip regions.
- Preserve the onboarding structure from `spec/design/visual-artifacts/mvp/image 6.png` while using honest no-pet copy before a profile exists.
- Keep unavailable dashboard actions disabled or route only to already implemented app sections.
- Record intentional mockup deviations with reasons.
- Add focused UI tests and desktop/mobile browser smoke for saved-pet and no-pet states.

## Non-Goals

- Full multi-pet management, persisted pet selection, add-pet menus, pet deletion, or pet ordering.
- New database migrations, contracts, API routes, or direct Supabase access from UI components.
- Loading or aggregating live reminders, documents, timeline events, audit events, or product events into the dashboard.
- New AI behavior, notification delivery, document upload, PDF export, or sharing-permission behavior.
- Rebuilding the design system or unrelated authenticated sections.

## Acceptance Criteria

- The dashboard does not show Bruno-specific copy for a different saved pet.
- A saved first pet opens the returning-owner dashboard; an owner without a saved pet opens onboarding without a demo-state toggle.
- Saving a pet profile updates the shell/dashboard pet context without requiring a full page reload.
- The app shell active-pet affordance shows the saved pet name or an honest no-pet state and does not imply switching functionality.
- The returning dashboard preserves the major region order and panel structure of `image 1.png`; the no-pet state preserves the onboarding structure of `image 6.png`.
- Intentional deviations are limited to unavailable live data/actions, localization, and missing owner/pet photography, and are documented in verification evidence.
- Desktop and mobile checks show no overlap, horizontal overflow, or obvious mockup-fidelity regression.
- Focused tests cover saved-pet, no-pet, profile-save propagation, and pet-profile load failure behavior.

## Implementation Notes

- Likely files: `apps/web/features/account/content.ts`, authenticated shell/top-bar/dashboard components, a feature-local active-pet hook, pet-profile callback wiring, and `AccountApp.test.tsx`.
- Use `spec/design/visual-artifacts/mvp/image 1.png` and `image 6.png` as the primary visual references.
- Keep the `/api/pets/profile` request feature-local and typed with the existing `PetProfileApiResponse` contract.
- Do not introduce a global state library or speculative dashboard aggregation service.
- Keep unavailable capabilities disabled or clearly preview-only.
- Follow ADR 0027 by keeping the dashboard oriented around the first active pet for MVP validation instead of introducing broad multi-pet management.
- Follow ADR 0028 by keeping cross-cutting access behind explicit helpers/providers and avoiding new broad service layers for dashboard alignment.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0012-polish-first-mvp-localization.md`, `spec/architecture-records/0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md`, `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`.
- New ADR needed: No.
- ADR draft: None.
- Approval state: ADRs accepted; human approval is still required for intentional mockup deviations before readiness.

## Verification

- [x] Focused component tests for saved-pet, no-pet, save propagation, and load failure.
- [x] Full web test suite, TypeScript validation, and production build.
- [x] Browser checks at desktop and mobile widths with the seeded owner.
- [x] Manual mismatch ledger against `image 1.png` and `image 6.png`.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

Validation artifact: `spec/validation/dashboard-mockup-and-active-pet-alignment-evaluation.md`.

Checks passed:

- `pnpm --filter web exec vitest run features/account/AccountApp.test.tsx` - 19 tests passed.
- `pnpm --filter web test` - 112 tests passed and 5 opt-in live tests skipped.
- `pnpm --filter web lint`.
- `pnpm build`.
- `pnpm format:check`.
- `git diff --check`.
- In-app Browser validation: seeded-owner login, saved-pet dashboard render, dashboard-to-documents interaction, empty framework error portal, no console warnings/errors, and no horizontal overflow at 1280x720 and 390x900.
- Playwright screenshot fallback after in-app screenshot capture timed out: saved-pet dashboard at 1440x900 and 390x900, plus intercepted no-pet onboarding at 1440x900. All had no console/page errors, no visible framework overlay, and no horizontal overflow; the no-pet state contained no Bruno text or input value.

Mismatch ledger:

- The dashboard follows the `image 1.png` region order and panel structure, but uses Polish-first localized copy rather than the English reference.
- The saved first pet uses live profile identity and values. Pet photography falls back to the existing Bruno image only for Bruno in the top bar and a neutral paw avatar elsewhere because the current profile contract has no photo field.
- `What's next`, recent documents, and timeline preview content remain clearly disclosed demonstration data because live cross-feature dashboard aggregation is outside this task.
- Search, notifications, Ask Caniello answers, PDF export, and unavailable sharing behavior remain inert or explicitly limited; existing implemented section-navigation actions are enabled.
- The no-pet state preserves the `image 6.png` structure while using generic profile fields and sample-document content rather than pretending a Bruno record exists.

Evaluator verdict: Pass. No validation gaps remain for this task scope.

## Handoff Notes

Implemented and evaluated on branch `codex/dashboard-mockup-active-pet`. Validation passed with artifact `spec/validation/dashboard-mockup-and-active-pet-alignment-evaluation.md`.

The authenticated shell now loads the first saved pet once through the existing typed profile API boundary. A saved pet opens the returning-owner dashboard; no saved pet opens onboarding automatically. Profile saves update the shell and dashboard context without a page reload. The top-bar pet affordance is a static first-pet context indicator rather than a false multi-pet switcher.

The dashboard now follows the supplied MVP region structure and uses live saved-pet identity, age, weight, allergies, and microchip values while clearly labeling non-aggregated cards as demonstration content. No migrations, contracts, API routes, live dashboard aggregation, multi-pet behavior, AI, notification delivery, upload, PDF, or new sharing permissions were added.

Validation artifact: `spec/validation/dashboard-mockup-and-active-pet-alignment-evaluation.md`. Evaluator verdict: Pass.
