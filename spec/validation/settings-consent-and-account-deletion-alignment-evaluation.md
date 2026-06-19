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

Second visual-fidelity pass after human review:

- Focused account tests: Passed, 25 tests.
- Shared contracts tests: Passed, 23 tests.
- Full web suite: Passed, 115 tests and 5 skipped.
- Web typecheck: Passed.
- Direct changed-file formatting and `git diff --check`: Passed.
- Live in-app browser structure and visual inspection: Passed.
- Local production build rerun: Environment-blocked because sandboxed Turbopack could not bind an internal local port. The approval service could not run the outside-sandbox retry because its temporary usage quota was exhausted. The prior production build on this branch passed; the PR build check is required as final evidence for the follow-up.

## Ratchet Baseline

- Coverage: focused behavior was added for consent withdrawal and retaining edited values after API rejection; existing passing suites remain green.
- Architecture: feature-local React components, shared contract boundaries, authenticated route/server separation, and owner-scoped persistence remain intact.
- Product/privacy: append-only consent, queued manual export/deletion semantics, exact deletion confirmation, owner isolation, audit evidence, medical boundaries, and official-document boundaries are preserved.
- Design: production Settings now directly matches the supplied MVP screenshot's 272px sidebar/top-bar composition, orange Settings heading, page-level save action, three-column/two-row desktop rhythm, circular icon badges, equal card rows, field treatment, serif/sans typography, and navy/cream/blue palette.

## Acceptance Criteria Mapping

- Settings follows `/mvp-flow` at desktop and mobile: Supported by the supplied screenshot/implementation comparison, measured live browser geometry, in-app browser desktop evidence, and Pixel 7 Playwright evidence.
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
  - Human-supplied MVP reference: `Screenshot 2026-06-19 at 09.21.25.png`
  - Final full-page implementation: `/tmp/caniello-settings-full.png`
  - Final viewport implementation: `/tmp/caniello-settings-fidelity.png`
  - Mobile implementation: `/tmp/caniello-settings-mobile.png`
- Measured desktop geometry at 1280px: first card x=349px, height=368px; this closely matches the reference's x≈349px and height≈363px. The asymmetric desktop padding preserves the same left edge and expands the cards naturally at the 2048px reference width.
- Intentional product-safe deviations: notification placeholders are represented by real append-only consent controls; unavailable reminder defaults are not invented; privacy actions create real queued requests; the authenticated shell retains language and logout controls.

## Findings

No material UI, behavior, privacy, contract, or scope findings remain. Final production-build evidence for the second visual-only pass is delegated to the PR build check because the local sandbox could not run Turbopack.

## Missing, Skipped, or Deferred Checks

- The second-pass local production build rerun is environment-blocked; the already-passing branch build is preserved and the PR build check must pass before the follow-up is treated as gap-free.
- Production deployment and public health-record upload readiness were not tested because they are outside this task and remain human approval gates.
- No migration validation was required because the task changed no schema or lifecycle policy.

## Verdict

Pass pending PR build confirmation

## Recommended Next Action

Publish the fidelity follow-up to the existing draft PR, confirm the PR build and lifecycle checks, then treat the evaluator result as gap-free.

## Approval Caveat

This evaluator verdict is readiness evidence only. It does not approve, accept, merge, release, deploy, change roadmap scope, or complete any human checkpoint.

## Human Decision

Pending

No validation acceptance, merge, release, deployment, roadmap change, or other human checkpoint has been approved.
