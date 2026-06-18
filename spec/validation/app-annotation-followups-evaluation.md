# Validation: Authenticated App Annotation Follow-Ups

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/app-annotation-followups.md` against the MVP Foundation roadmap and verify that authenticated pet, profile, header, and Timeline surfaces do not present demo photography, inert controls, free-text species entry, or false completion statuses.

## Source Artifacts

- `spec/tasks/app-annotation-followups.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `DESIGN.md`
- `apps/web/features/account/components/AppTopBar.tsx`
- `apps/web/features/account/components/PetProfileSection.tsx`
- `apps/web/features/account/components/CareTimelineSection.tsx`
- `apps/web/features/account/content.ts`
- `apps/web/features/account/AccountApp.test.tsx`

## Execution Mode and Evaluator Layers

- Execution mode: normal task-sized UI correction using existing client state and API contracts.
- Evaluator layers: roadmap scope, React structure, accessibility, localization, profile persistence compatibility, date-only status behavior, focused/full regression tests, production build, and desktop/mobile browser rendering.

## Required Gates

- Focused account behavior: Passed, 21 tests.
- Full web tests: Passed, 114 tests; 5 existing opt-in tests skipped.
- TypeScript/lint: Passed.
- Production build: Passed outside the sandbox after Turbopack was blocked from binding its required local port inside the sandbox.
- Formatting: Passed through direct local Prettier.
- Spec alignment: Passed after task, evaluation, and handoff evidence were completed.
- Browser/rendered UI: Passed at the default desktop viewport and 390x900.
- Coverage baseline: Preserved; no task-specific threshold exists.
- Architecture alignment: Passed; no contracts, migrations, persistence paths, or provider boundaries changed.
- Design review: Passed; controls now communicate only available behavior and active-pet contexts use the neutral icon when no photo field exists.

## Ratchet Baseline

- Product constraints preserved: no search, notification delivery, photo upload, new species taxonomy, Timeline completion workflow, or multi-pet behavior was added.
- Architecture constraints preserved: existing typed profile and Timeline boundaries remain unchanged.
- Design constraints preserved: localized controls, established card layout, responsive behavior, and honest unavailable-capability presentation.
- Privacy and medical constraints preserved: no data ownership, sharing, RLS, diagnosis, treatment, or emergency behavior changed.

## Acceptance Criteria Mapping

- Criterion: Active-pet contexts do not display demo pet photography without a real photo field.
  Evidence status: Supported.
  Evidence: Header and Timeline pet cards render the paw icon; focused tests and browser DOM checks found zero pet-card images.

- Criterion: Search and notification affordances are absent while unavailable.
  Evidence status: Supported.
  Evidence: Components and unused copy were removed. Focused tests and browser DOM checks found zero search inputs and notification buttons.

- Criterion: Species is a localized accessible dropdown that preserves unknown saved values.
  Evidence status: Supported.
  Evidence: The profile renders dog, cat, and other options from existing localized onboarding copy. Tests exercise standard selection and prove a saved `królik` value remains selected and is submitted unchanged.

- Criterion: Timeline statuses reflect record dates without falsely claiming completion.
  Evidence status: Supported.
  Evidence: Date-only comparison uses the local calendar date. A stable 2099 test event renders `Nadchodzące`; current/past manual events render `Zapisane`/`Recorded`; document events retain uploaded status.

- Criterion: Existing profile save/reload and Timeline create/edit behavior remain covered.
  Evidence status: Supported.
  Evidence: The focused account suite passes all 21 tests, including profile persistence and Timeline create/edit requests.

- Criterion: Desktop and mobile rendering remain clean.
  Evidence status: Supported.
  Evidence: Browser checks found no horizontal overflow, warning/error logs, or visible framework overlay at desktop and 390x900.

## Checks

- Check: `../../node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`
  Type: Automated
  Status: Passed
  Actual result: 21 tests passed.

- Check: `../../node_modules/.bin/vitest run` from `apps/web`
  Type: Automated
  Status: Passed
  Actual result: 114 tests passed; 5 existing opt-in tests skipped.

- Check: `../../node_modules/.bin/tsc --noEmit --pretty false` from `apps/web`
  Type: Automated
  Status: Passed
  Actual result: TypeScript validation passed.

- Check: `./node_modules/.bin/next build` from `apps/web`
  Type: Automated
  Status: Passed
  Actual result: Production build and static generation passed outside the sandbox.

- Check: direct local Prettier check for all changed files
  Type: Automated
  Status: Passed
  Actual result: All changed files use Prettier code style.

- Check: `node scripts/spec-alignment-gate.mjs`
  Type: Automated
  Status: Passed
  Actual result: Passed after durable evidence was completed.

- Check: `git diff --check`
  Type: Automated
  Status: Passed
  Actual result: No whitespace errors.

- Check: In-app Browser interaction and responsive smoke
  Type: UI
  Status: Passed
  Actual result: Header controls were absent, active-pet contexts used icons, Species changed from dog to cat and back without saving, the current Timeline event showed `Recorded`, and both desktop/mobile layouts had no overflow or console issues.

## Evidence

- URL: `http://127.0.0.1:3000/app`.
- Desktop: dashboard header contains no search or notification control; active-pet context contains no image.
- Profile: Species is a combobox with Choose species, Dog, Cat, and Other.
- Timeline: the June 18, 2026 event shows `Recorded`; active-pet card contains no image.
- Mobile 390x900: no horizontal overflow; header and dashboard remain readable; no console warning/error entries.

## Findings

- No material findings remain.
- During browser evaluation, the Timeline active-pet card was found to share the same demo-photo assumption as the annotated header. It was corrected within the same no-photo acceptance rule and covered by a focused assertion.

## Missing, Skipped, or Unavailable Checks

- Five existing opt-in live integration tests remained skipped by their environment gates.
  Risk: Low because this task changes no API, schema, RLS, authorization, or persistence behavior.
- `node scripts/format-check-changed.mjs` was unavailable because its pnpm release verification required registry access.
  Risk: Low because the wrapper's exact changed-file set passed the repository-local Prettier binary directly.

## Result

Ready for human review.

Evaluator verdict: **Pass**.

## Follow-Up

Publish a stacked draft PR against `codex/live-dashboard-data`, then await maintainer review.

## Human Decision

Pending. This evaluator verdict and publication do not approve merge, release, deployment, production readiness, roadmap movement, or deferred capabilities.
