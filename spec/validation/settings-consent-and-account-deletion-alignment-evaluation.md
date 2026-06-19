# Validation: Settings Consent and Account Deletion Alignment

## Status

Ready for human review

## Task

`spec/tasks/settings-consent-and-account-deletion-alignment.md`

## Scope

Evaluate the production authenticated Settings alignment against the `/mvp-flow` visual source while verifying that profile, consent, export-request, deletion-request, owner isolation, and audit behavior remain real and bounded.

## Source Artifacts and Changes Reviewed

- `spec/product-context.md`
- `spec/roadmap.md`
- `DESIGN.md`
- `spec/design/visual-artifacts/mvp/README.md`
- `apps/web/features/mvp-flow/MvpFlowPrototype.tsx`
- `apps/web/features/mvp-flow/MvpFlowPrototype.module.css`
- `apps/web/features/account/components/AccountSettingsSection.tsx`
- `apps/web/features/account/components/AccountSettingsPanels.tsx`
- `apps/web/features/account/components/AppIcon.tsx`
- `apps/web/features/account/content.ts`
- `apps/web/features/account/AccountApp.test.tsx`
- `tests/e2e/settings-live.spec.ts`
- Existing account Settings API, server helper, contracts, migrations, RLS, and audit tests.

## Execution Mode and Evaluator Layers

- Execution mode: Standard.
- Layers: product/roadmap scope, responsive UI, interaction states, shared contracts, authenticated API behavior, persistence, owner isolation, audit evidence, and approval boundaries.

## Required Gates

- Focused component/route/server tests: Passed, 3 files and 29 tests.
- Shared contracts tests: Passed, 23 tests.
- Full web unit suite: Passed, 20 files passed and 5 skipped; 115 tests passed and 5 skipped.
- Type/lint gate: Passed.
- Production build: Passed.
- Live local Supabase RLS/audit test: Passed, 1 test.
- Desktop browser behavior and visual check: Passed; no relevant console warnings or errors.
- Mobile responsive/no-overflow Playwright check: Passed on the Pixel 7 project.
- Changed-file formatting: Passed.
- `git diff --check`: Passed.

## Ratchet Baseline

- Coverage: focused behavior was added for consent withdrawal and retaining edited values after API rejection; existing passing suites remain green.
- Architecture: feature-local React components, shared contract boundaries, authenticated route/server separation, and owner-scoped persistence remain intact.
- Product/privacy: append-only consent, queued manual export/deletion semantics, exact deletion confirmation, owner isolation, audit evidence, medical boundaries, and official-document boundaries are preserved.
- Design: production Settings keeps the accepted prototype's heading hierarchy, compact panel treatment, three-column/two-row desktop rhythm, single-column mobile flow, serif/sans typography, navy/cream/blue palette, and production shell conventions.

## Acceptance Criteria Mapping

- Settings follows `/mvp-flow` at desktop and mobile: Supported by reference/implementation image inspection, in-app browser desktop evidence, and Pixel 7 Playwright evidence.
- Loading, success, validation/server error, and existing-request states remain visible: Supported by component tests, API-message feedback, live loading/success state, and persisted request status/date rendering.
- Profile save survives reload: Supported by existing authenticated server behavior, live owner profile loading, and passing account server/RLS coverage.
- Consent is appended and latest state reloads: Supported by server/RLS tests plus live grant then withdrawal interaction showing the latest recorded date.
- Consent withdrawal is explicit: Supported by focused test asserting `analyticsConsent: false` and live browser interaction.
- Unauthenticated and cross-owner access is blocked: Supported by route tests and the live RLS test.
- Exact `DELETE` gates a queued deletion request and audit evidence: Supported by focused tests, live browser interaction, live RLS/audit test, and visible `requested` status/date.
- Repeated deletion behavior is explicit: Supported; the existing accepted behavior intentionally permits another exact-confirmation queued request and corresponding bounded audit evidence.
- Copy does not claim immediate export/deletion: Supported by Polish/English UI review.
- Required validation passes: Supported by the gate results above.

## Browser and Visual Evidence

- In-app Browser, desktop: authenticated owner login, Settings navigation, meaningful DOM, six production panels, no framework overlay, no relevant console warnings/errors.
- Interaction: granted analytics consent, saved, withdrew consent, saved again, entered exact `DELETE`, and created a queued deletion request. The confirmation cleared after success and the request displayed `requested · 2026-06-19`.
- Responsive fallback: the in-app browser viewport override remained at 1440px after requesting 390px. The repository Playwright Pixel 7 project was used for mobile validation and proved no document-level horizontal overflow.
- Visual comparison inspected directly:
  - Prototype reference: `/tmp/caniello-settings-reference.png`
  - Desktop implementation: `/tmp/caniello-settings-desktop.png`
  - Mobile implementation: `/tmp/caniello-settings-mobile.png`
- Intentional deviations: prototype-only pet-care defaults and notification controls were not copied. Production uses real consent and data-rights controls and keeps the existing authenticated shell.

## Findings

No material findings remain.

## Missing, Skipped, or Deferred Checks

- No missing required validation.
- Production deployment and public health-record upload readiness were not tested because they are outside this task and remain human approval gates.
- No migration validation was required because the task changed no schema or lifecycle policy.

## Verdict

Pass

## Recommended Next Action

Publish this single validated task as a draft PR for human review.

## Approval Caveat

This evaluator verdict is readiness evidence only. It does not approve, accept, merge, release, deploy, change roadmap scope, or complete any human checkpoint.
