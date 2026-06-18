# Validation: Dashboard Mockup and Active-Pet Alignment

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/dashboard-mockup-and-active-pet-alignment.md` against the `Now - MVP Foundation` roadmap, accepted first-pet architecture, saved-pet/no-pet behavior, supplied dashboard/onboarding mockups, focused tests, and rendered desktop/mobile behavior.

## Source Artifacts

- `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `DESIGN.md`
- `spec/design/visual-artifacts/mvp/image 1.png`
- `spec/design/visual-artifacts/mvp/image 6.png`
- ADRs 0011, 0012, 0027, and 0028
- Changed authenticated shell, top-bar, dashboard, pet-profile callback, content, hook, and account test files

## Execution Mode and Evaluator Layers

- Execution mode: normal task-sized UI implementation; no repository-specific execution-mode file exists.
- Evaluator layers: roadmap/product scope, React/component structure, typed API-boundary use, focused behavior tests, full web regression tests, TypeScript/build/format gates, saved-pet browser behavior, no-pet browser behavior, responsive layout, console health, and mockup mismatch review.

## Required Gates

- Focused component behavior: Passed, 19 account tests.
- Full web tests: Passed, 112 tests; 5 opt-in live integration tests skipped by their existing environment gates.
- TypeScript/lint: Passed.
- Production build: Passed.
- Formatting: Passed.
- Browser/rendered UI: Passed at desktop and mobile widths.
- Coverage baseline: Not required; this repository has no task-specific coverage threshold and existing focused/full suites remain green.
- Architecture alignment: Passed; UI uses the existing typed `/api/pets/profile` boundary and feature-local hook, with no direct Supabase access or new shared service layer.
- Design review: Passed with the documented mismatch ledger below.

## Ratchet Baseline

- Product constraints preserved: first-pet MVP only; no multi-pet selection or persisted active-pet state.
- Architecture constraints preserved: contracts -> API/runtime -> feature-local UI dependency direction; no migration, contract, or provider change.
- Design constraints preserved: major `image 1.png` and `image 6.png` regions, Polish-first localization, responsive single-column mobile behavior, and honest disabled/preview states.
- Privacy and medical constraints preserved: no new data exposure, diagnosis, treatment, emergency advice, upload, notification, or sharing-permission behavior.

## Acceptance Criteria Mapping

- Criterion: Dashboard does not show Bruno-specific copy for a different saved pet.
  Evidence status: Supported.
  Evidence: Tests save Luna, return Home, and verify Luna in the dashboard and active-pet context. Dashboard strings interpolate the saved pet name.

- Criterion: Saved first pet opens returning dashboard; no saved pet opens onboarding without a demo switch.
  Evidence status: Supported.
  Evidence: Focused tests cover both API states. Playwright captured seeded saved-pet and intercepted no-pet states.

- Criterion: Onboarding pet fields accept owner input and save the first profile.
  Evidence status: Supported.
  Evidence: Focused tests enter Luna's values and assert the typed profile PUT. Fresh-owner Playwright runs entered complete first-pet data on desktop and mobile, saved successfully, and retained the profile after reload.

- Criterion: Saving a profile updates shell/dashboard context without full reload.
  Evidence status: Supported.
  Evidence: Both pet-profile surfaces call the shell-owned update callback after a successful PUT; focused and live browser checks verify the new pet appears immediately on Home.

- Criterion: Top-bar pet affordance is honest and non-switching.
  Evidence status: Supported.
  Evidence: It is rendered as a status, not a button; it shows the saved pet or `Brak zapisanego pupila` and only shows `Pierwszy profil` when a pet exists.

- Criterion: Major mockup region order and structure are preserved.
  Evidence status: Supported.
  Evidence: Desktop screenshot shows greeting/pet card, `Co dalej`, four main panels, sharing/tip banners, sidebar, and top bar. No-pet screenshot shows welcome header, three-step strip, pet/document panels, and tip.

- Criterion: Intentional deviations are limited and documented.
  Evidence status: Supported.
  Evidence: Mismatch ledger records localization, missing pet photo contract, explicit demo dashboard content, and inert unavailable capabilities.

- Criterion: Desktop/mobile have no overlap, overflow, or obvious fidelity regression.
  Evidence status: Supported.
  Evidence: 1440x900 and 390x900 Playwright metrics show `scrollWidth === width`; screenshots show readable wrapping and single-column mobile layout.

- Criterion: Tests cover saved-pet, no-pet, save propagation, and load failure.
  Evidence status: Supported.
  Evidence: Focused account suite passes 19 tests including all four states.

## Checks

- Check: `pnpm --filter web exec vitest run features/account/AccountApp.test.tsx`
  Type: Automated
  Status: Passed
  Expected result: Focused account/dashboard behavior is covered.
  Actual result: 19 tests passed.

- Check: `pnpm --filter web test`
  Type: Automated
  Status: Passed
  Expected result: No web regression.
  Actual result: 112 tests passed; 5 existing opt-in live tests skipped.

- Check: `pnpm --filter web lint`
  Type: Automated
  Status: Passed
  Expected result: Strict TypeScript validation passes.
  Actual result: Passed.

- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Expected result: Monorepo production build succeeds.
  Actual result: Seven build tasks succeeded.

- Check: `pnpm format:check`
  Type: Automated
  Status: Passed
  Expected result: Changed files match repository formatting.
  Actual result: Passed after applying Prettier.

- Check: In-app Browser saved-pet flow
  Type: UI
  Status: Passed
  Expected result: Login reaches the live dashboard; pet context renders; dashboard action opens Documents; no console errors or overflow.
  Actual result: Passed at 1280x720 and 390x900. In-app screenshot capture timed out, so screenshots used the allowed Playwright fallback.

- Check: Playwright screenshot and responsive fallback
  Type: UI
  Status: Passed
  Expected result: Saved-pet desktop/mobile and no-pet desktop render without overlay, console errors, or horizontal overflow.
  Actual result: Passed at 1440x900, 390x900, and intercepted no-pet 1440x900. No-pet scan confirmed no Bruno body text or input value.

- Check: Fresh-owner onboarding save and persistence
  Type: UI
  Status: Passed
  Expected result: Editable onboarding fields save a first pet, update the dashboard immediately, and persist after reload.
  Actual result: Passed at 1440x900 and 390x900 with unique local owners. Both remained on `/app`, showed the saved pet immediately and after reload, produced no console/page errors or visible framework overlay, and had no horizontal overflow.

- Check: `git diff --check`
  Type: Automated
  Status: Passed
  Expected result: No whitespace errors.
  Actual result: Passed.

## Evidence

- Saved-pet desktop screenshot: `/private/tmp/caniello-dashboard-desktop.png`
- Saved-pet mobile screenshot: `/private/tmp/caniello-dashboard-mobile.png`
- No-pet desktop screenshot: `/private/tmp/caniello-dashboard-no-pet.png`
- Fresh-owner saved desktop screenshot: `/private/tmp/caniello-onboarding-save-desktop.png`
- Fresh-owner saved mobile screenshot: `/private/tmp/caniello-onboarding-save-mobile.png`
- In-app Browser page identity: `http://127.0.0.1:3000/app`, title `Caniello`.
- Browser console logs: no warnings or errors.
- Desktop Playwright metrics: 1440 client width and 1440 scroll width.
- Mobile Playwright metrics: 390 client width and 390 scroll width.
- No-pet Playwright metrics: 1440 client width and 1440 scroll width; no visible framework overlay; `containsBruno: false`.
- Fresh-owner desktop metrics: 1440 client width and 1440 scroll width; no visible framework overlay; zero console/page errors.
- Fresh-owner mobile metrics: 390 client width and 390 scroll width; no visible framework overlay; zero console/page errors.

## Findings

- No material findings.
- Review comment resolved: the onboarding pet card previously rendered read-only placeholder controls. It now uses controlled text/date/number/select fields and saves through the existing typed API boundary.
- Low-risk intentional deviation: the pet-profile contract has no photo field, so the dashboard uses a neutral paw avatar instead of pretending another saved pet is Bruno.
- Low-risk intentional limitation: dashboard reminder/document/timeline cards are disclosed demonstration content until a separate live aggregation task exists.

## Missing, Skipped, or Unavailable Checks

- Check: In-app Browser screenshot capture.
  Reason: Both viewport and full-page capture timed out through the in-app browser after DOM, interaction, console, and overflow checks succeeded.
  Risk: None material because regular Playwright captured the same live localhost states at desktop/mobile widths.

- Check: Five opt-in live integration tests.
  Reason: Existing environment gates skip them in the default web suite; this task changes no RLS, schema, API authorization, or persistence behavior.
  Risk: Acceptable for this UI-only task.

## Mismatch Ledger

- The implementation is Polish-first rather than English like the supplied screenshots.
- Owner display name remains the existing generic `Opiekun`; no new account-profile aggregation was introduced.
- The pet-photo field does not exist, so the dashboard uses a neutral pet avatar and only retains the existing Bruno thumbnail in the top bar when the saved pet is Bruno.
- Dashboard previews do not claim live reminder/document/timeline aggregation; the disclosure identifies them as demonstration data.
- Search, notifications, Ask answers, PDF, and unavailable sharing actions remain inert or limited according to existing task boundaries.
- Mobile uses the repository's horizontal section navigation and single-column cards rather than reproducing a desktop screenshot at a narrow width.

## Result

Ready for human review.

Evaluator verdict: **Pass**.

## Follow-Up

Publish this one-task branch as a draft PR for maintainer review. Multi-pet management, live dashboard aggregation, account-name loading, and pet photography remain separate future tasks.

## Human Decision

The human explicitly requested this run to accept the artifacts and publish after the evaluator was satisfied without gaps. This records artifact acceptance for this task only; it does not approve merge, release, deployment, production readiness, roadmap movement, or any deferred capability.

The evaluator does not approve, merge, release, deploy, or mark unrelated human checkpoints complete.
