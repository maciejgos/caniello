# Validation: Timeline Upcoming Reminders Alignment

## Status

Ready for human review

## Scope

Evaluates `spec/tasks/timeline-upcoming-reminders-alignment.md`, which aligns the Timeline screen with the MVP mockup relationship between historical care events and upcoming care actions.

## Source Artifacts

- Task: `spec/tasks/timeline-upcoming-reminders-alignment.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Mockup: `spec/design/visual-artifacts/mvp/image 10.png`
- Changed files:
  - `apps/web/features/account/components/CareTimelineSection.tsx`
  - `apps/web/features/account/components/AppTopBar.tsx`
  - `apps/web/features/account/components/AuthenticatedAppShell.tsx`
  - `apps/web/features/account/content.ts`
  - `apps/web/features/account/AccountApp.test.tsx`
  - `apps/web/features/marketing/hooks/useLanguage.ts`
  - `spec/tasks/timeline-upcoming-reminders-alignment.md`

## Preconditions

- Local web app can run on `http://localhost:3000`.
- Seeded local owner `akowalska@example.com` can sign in for browser validation.
- Existing timeline and reminder APIs remain available.

## Execution Mode And Evaluator Layers

- Execution mode: Lightweight task harness; no separate `spec/execution-modes.md` or `spec/quality-gates.md` exists in this repo.
- Evaluator layers used: roadmap scope review, changed-file review, focused unit/UI tests, full web Vitest, TypeScript/lint, production build, browser UI smoke at desktop and mobile widths, medical/privacy/product non-goal review.

## Required Gates And Ratchets

- Unit/UI behavior: Passed after the final visual-fidelity edits.
- Lint/types: Passed after the final visual-fidelity edits.
- Production build: Passed.
- Browser UI: Passed at desktop and 390x900 mobile.
- Coverage baseline: Not required; no coverage ratchet file exists for this task.
- Architecture alignment: Passed; kept reminder/timeline coordination feature-local and added no durable architecture decision.
- Product/design constraints: Passed with documented current-MVP deviation: the manual timeline event form remains below the primary mockup-style history/right-rail surface, because the existing MVP timeline foundation requires manual event creation/editing. No export or automation behavior was added.

## Acceptance Criteria Mapping

- Criterion: Timeline layout and copy reflect the mockup relationship between history and upcoming care.
  Evidence status: Supported
  Evidence: `CareTimelineSection` now renders the mockup-style `Care Timeline` header, active-pet card, history filters, disabled export control, vertical timeline rows, compact timeline summary, `Next Upcoming` right-rail panel, and automation boundary copy.

- Criterion: Implemented Timeline screen matches `image 10.png` where the mockup defines visible UI, or deviations are documented.
  Evidence status: Supported
  Evidence: Browser metrics confirmed the mockup-derived title, active-pet card, filter/export toolbar, summary, `Next Upcoming`, row list, and no-overflow behavior at 1440x900 desktop and 390x900 mobile widths. The retained manual event form is documented as a current-MVP deviation below the primary timeline surface.

- Criterion: Upcoming reminder/action content comes from existing reminder data where available.
  Evidence status: Supported
  Evidence: `CareTimelineSection` fetches `/api/reminders`, filters active/suggested reminders, sorts by due date, and renders the nearest reminder in `Next Upcoming`. `AccountApp.test.tsx` covers this with an existing reminder fixture.

- Criterion: Empty states clearly explain when no upcoming reminder exists.
  Evidence status: Supported
  Evidence: Added Polish and English empty copy for `timelineNextUpcomingEmpty`.

- Criterion: Tests and browser checks cover desktop and mobile behavior.
  Evidence status: Supported
  Evidence: Focused AccountApp Vitest passed; in-app Browser smoke passed at default desktop and 390x900 mobile.

- Criterion: Manual timeline event create/edit remains available and covered.
  Evidence status: Supported
  Evidence: Existing create/edit flow remains in `CareTimelineSection`; focused AccountApp test still creates and edits a timeline event.

- Criterion: Reminder completion does not create timeline events and deferred automation is explicit.
  Evidence status: Supported
  Evidence: No reminder completion code or API behavior changed; automation copy states automatic entries from reminders remain outside the task.

## Checks

- Check: `pnpm --filter web exec vitest run features/account/AccountApp.test.tsx`
  Type: Automated
  Status: Passed
  Expected result: Focused account UI tests pass.
  Actual result: Passed outside sandbox after sandbox command failed with `fetch failed`; 1 test file, 16 tests passed after the final visual-fidelity edits.

- Check: `pnpm --filter web test`
  Type: Automated
  Status: Passed
  Expected result: Full web Vitest suite passes.
  Actual result: 19 files passed, 5 skipped; 107 tests passed, 5 skipped.

- Check: `pnpm --filter web lint`
  Type: Automated
  Status: Passed
  Expected result: Web TypeScript validation passes.
  Actual result: Passed outside sandbox after sandbox command failed with `fetch failed`.

- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Expected result: Monorepo production build passes.
  Actual result: Passed outside sandbox after sandbox command failed with `fetch failed`; Turbo reported 7 successful tasks.

- Check: `git diff --check`
  Type: Automated
  Status: Passed
  Expected result: No whitespace errors.
  Actual result: Passed after the final visual-fidelity edits.

- Check: In-app Browser desktop smoke
  Type: UI
  Status: Passed
  Expected result: Timeline shows mockup-style title, active-pet card, history filters, export control, vertical timeline rows, compact summary, `Next Upcoming`, no visible dev issue overlay, and no horizontal overflow.
  Actual result: Passed with seeded owner `akowalska@example.com` at 1440x900. Metrics: title, pet card, filters, export, summary, `Next Upcoming`, and two timeline rows present; issue overlay absent; overflow was `0`; `Next Upcoming` heading top was 742px, inside the first viewport.

- Check: In-app Browser mobile smoke at 390x900
  Type: UI
  Status: Passed
  Expected result: Same Timeline landmarks render on mobile with no horizontal overflow.
  Actual result: Passed. Metrics: title, pet card, filters, export, summary, `Next Upcoming`, and two timeline rows present; issue overlay absent; overflow was `0`.

## Evidence

- Browser desktop evidence: `hasCareTimeline`, `hasPetCard`, `hasFilters`, `hasExport`, `hasSummary`, `hasNextUpcoming` were all true; `hasIssueOverlay` was false; `overflowX` was `0`.
- Browser mobile evidence: `hasCareTimeline`, `hasPetCard`, `hasFilters`, `hasExport`, `hasSummary`, `hasNextUpcoming` were all true; `hasIssueOverlay` was false; `overflowX` was `0`.
- Tests prove the `Next Upcoming` panel uses `/api/reminders` and links to the Reminders flow.

## Findings

- None.

## Missing, Skipped, Or Unavailable Checks

- Check: Live RLS tests
  Reason: Not required for this UI composition task; no API, RLS policy, migration, or server helper behavior changed.
  Risk: Low.

- Check: Full e2e suite
  Reason: Not required for the scoped display/UI change after focused browser smoke, full web tests, lint, and build passed.
  Risk: Low.

## Future CI/CD Or Lifecycle Gates

- Gate: Signed-in owner flow E2E
  Trigger: Before broader MVP readiness claims.
  Blocks: Public readiness if Timeline/Reminder flows regress.

## Result

Pass

## Follow-Up

Recommended next action: human review of the visible Timeline deviation that keeps the manual event form available below the mockup-style history/right-rail panels.

## Human Decision

Pending. This evaluator verdict does not approve, accept, merge, release, deploy, or mark human checkpoints complete.
