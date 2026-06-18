# Validation: Live Dashboard Data

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/live-dashboard-data.md` against the `Now - MVP Foundation` roadmap and verify that the signed-in dashboard presents owner-scoped saved data rather than fabricated reminder, document, timeline, sharing, tip, or Ask content.

## Source Artifacts

- `spec/tasks/live-dashboard-data.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `DESIGN.md`
- `spec/design/visual-artifacts/mvp/image 1.png`
- `apps/web/features/account/components/useDashboardData.ts`
- `apps/web/features/account/components/AppHomeDashboard.tsx`
- `apps/web/features/account/components/ReturningOwnerDashboard.tsx`
- `apps/web/features/account/content.ts`
- `apps/web/features/account/AccountApp.test.tsx`
- Existing reminder, document, timeline-event, and share-link API contracts and routes

## Execution Mode and Evaluator Layers

- Execution mode: normal task-sized UI/data integration using existing authenticated API boundaries.
- Evaluator layers: roadmap scope, owner-data boundaries, React structure, parallel API loading, populated/empty/error UI behavior, ordering, localization, navigation, full regression tests, production build, responsive browser rendering, console health, and mock-content scan.

## Required Gates

- Focused dashboard behavior: Passed, 20 account tests.
- Full web tests: Passed, 113 tests; 5 existing opt-in live tests skipped by environment gates.
- TypeScript/lint: Passed.
- Production build: Passed.
- Formatting: Passed.
- Spec alignment: Passed after task, evaluation, and handoff evidence were completed.
- Browser/rendered UI: Passed at 1440x900 and 390x900.
- Coverage baseline: Current baseline preserved; no task-specific threshold exists.
- Architecture alignment: Passed; all data uses existing authenticated typed API routes, with no direct Supabase access, migration, aggregate API, or new service layer.
- Design review: Passed; the existing dashboard region order remains intact and empty states fit the established card layout.

## Ratchet Baseline

- Product constraints preserved: first-pet MVP only; no multi-pet state, AI answer behavior, notification delivery, automatic records, or new sharing permissions.
- Architecture constraints preserved: existing contracts and API boundaries feed a feature-local client hook; independent requests run in parallel.
- Design constraints preserved: dashboard region order, localized content, desktop grid, single-column mobile layout, and honest unavailable states.
- Privacy and medical constraints preserved: owner-scoped APIs remain the only data source; Ask Caniello explicitly avoids invented answers, diagnosis, treatment, and emergency advice.

## Acceptance Criteria Mapping

- Criterion: No dashboard region presents a fabricated pet record.
  Evidence status: Supported.
  Evidence: Demonstration copy and hardcoded record arrays were removed. Browser DOM scan found none of the previous sample strings, and populated/empty tests assert API-backed content.

- Criterion: Upcoming reminders use saved active/suggested data in due-date order.
  Evidence status: Supported.
  Evidence: The hook reads `/api/reminders`; focused tests supply unsorted records and assert the earlier due date renders first. Seeded browser data showed OmegaVet before the later rabies reminder.

- Criterion: Documents and timeline use saved records in descending record-date order with empty states.
  Evidence status: Supported.
  Evidence: Focused tests assert ordering. Browser showed the seeded Rabies certificate and an honest empty timeline.

- Criterion: Health values use the active saved pet.
  Evidence status: Supported.
  Evidence: Existing profile fields render Bruno's saved age, weight, allergies value, and microchip.

- Criterion: Sharing reflects an active, unexpired link.
  Evidence status: Supported.
  Evidence: Focused populated test renders active-link copy; seeded browser state with no link renders the inactive state. Revoked and expired links are excluded by the client selector.

- Criterion: Ask Caniello is honest and navigates to its dedicated section.
  Evidence status: Supported.
  Evidence: Simulated prompt and suggestions were removed. Tests assert unavailable/medical-boundary copy and navigation to the Ask Caniello section.

- Criterion: Loading and failure states do not reveal sample content.
  Evidence status: Supported.
  Evidence: Focused retry test returns 503 from dashboard APIs, asserts the recoverable error and absence of former mock strings, then retries into real empty states.

- Criterion: Desktop/mobile behavior is clean.
  Evidence status: Supported.
  Evidence: In-app Browser metrics show client width equals scroll width at both viewports, with no console warnings/errors or visible framework overlay.

## Checks

- Check: `pnpm --filter web exec vitest run features/account/AccountApp.test.tsx`
  Type: Automated
  Status: Passed
  Actual result: 20 tests passed.

- Check: `pnpm --filter web test`
  Type: Automated
  Status: Passed
  Actual result: 113 tests passed; 5 existing opt-in live tests skipped.

- Check: `pnpm --filter web lint`
  Type: Automated
  Status: Passed
  Actual result: TypeScript validation passed.

- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Actual result: Seven build tasks succeeded.

- Check: `pnpm format:check`
  Type: Automated
  Status: Passed
  Actual result: All changed files use repository formatting.

- Check: `pnpm validation:spec-alignment`
  Type: Automated
  Status: Passed
  Actual result: Passed after durable task/evaluation/handoff evidence was completed.

- Check: In-app Browser populated/empty-region smoke
  Type: UI
  Status: Passed
  Actual result: Seeded Bruno dashboard showed two saved reminders ordered by date, the saved Rabies certificate, empty timeline, inactive sharing, unavailable Ask, and a data-derived tip.

- Check: Responsive, console, overlay, and mock scan
  Type: UI
  Status: Passed
  Actual result: At 1440x900 and 390x900, `scrollWidth === width`, no warning/error logs, no visible Next.js portal, and no previous demonstration strings.

- Check: `git diff --check`
  Type: Automated
  Status: Passed
  Actual result: No whitespace errors.

## Evidence

- In-app Browser URL: `http://127.0.0.1:3000/app`.
- Desktop metrics: 1440 client width and 1440 scroll width; no mock strings; no overlay; no warning/error logs.
- Mobile metrics: 390 client width and 390 scroll width; no mock strings; no overlay; no warning/error logs.
- Desktop visual: live reminder cards, saved document, empty timeline, unavailable Ask, inactive sharing.
- Mobile visual: the same regions in a readable single-column layout.

## Findings

- No material findings.
- Browser review follow-up resolved: the Ask Caniello card no longer routes unexpectedly to Documents; its action opens the dedicated Ask Caniello section.
- Low residual risk: dashboard data is loaded by four parallel requests, so one failed endpoint places all non-profile dashboard regions into the recoverable unavailable state. This is intentionally simpler and safer than displaying a partially stale mixture; a future task may introduce per-panel recovery if user evidence warrants it.

## Missing, Skipped, or Unavailable Checks

- Five opt-in live integration tests were skipped by their existing default environment gates.
  Risk: Acceptable because this task changes no schema, RLS policy, API authorization, or persistence behavior, and live owner-scoped browser requests passed.
- A separate fresh-owner browser run was not repeated in this task.
  Risk: Low; focused tests cover all-empty dashboard APIs, while the immediately preceding onboarding task verified fresh-owner profile creation and persistence on both viewports.

## Result

Ready for human review.

Evaluator verdict: **Pass**.

## Follow-Up

Publish this task as a stacked draft PR based on `codex/dashboard-mockup-active-pet` until PR #39 is merged, then retarget or rebase through normal maintainer review if needed.

## Human Decision

Pending. The evaluator verdict and publication do not approve merge, release, deployment, production readiness, roadmap movement, or deferred capabilities.
