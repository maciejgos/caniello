# Validation: MVP Validation Readiness

## Status

Accepted with post-acceptance manual findings

## Scope

Evaluate whether the current `mvp-implementation` branch is ready for MVP validation of the owner-side Caniello app. This validation checks the app end to end locally, verifies core owner flows together, checks GitHub PR and merge state, and records a yes/no readiness decision with evidence, gaps, skipped checks, and follow-up tasks.

Readiness decision: REVISED after manual validation - YES only for seeded-owner internal MVP validation; NO for broader new-owner or mockup-fidelity MVP validation until the post-acceptance P1/P2 gaps below are resolved or explicitly waived.

Evaluator verdict: Pass with gaps.

Human acceptance applies to the original readiness artifact and MVP validation readiness decision only. Later human manual findings on 2026-06-13 narrowed the readiness interpretation. This is not a release, deployment, production, merge, or roadmap approval.

## Source Artifacts

- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Handoff before this evaluation: `spec/handoff.md`
- Validation template: `spec/validation/TEMPLATE.md`
- Root instructions: `AGENTS.md`
- Web app instructions: `apps/web/AGENTS.md`
- Core task and validation history under `spec/tasks/` and `spec/validation/`
- Current web app under `apps/web`
- Supabase migrations and seed data under `infra/supabase`
- Current branch state: `mvp-implementation` at `539c483`, matching `origin/mvp-implementation`

## Preconditions

- Local dependencies are installed.
- Local Supabase is running on the Caniello local ports.
- `apps/web/.env.local` contains local Supabase URL, anon key, and service role key values.
- Seeded owner account exists for local validation: `akowalska@example.com`.
- Docker containers for local Supabase are running and healthy.

## Acceptance Criteria Mapping

- Criterion: Current branch and remote merge state are clean enough for readiness validation.
  Evidence status: Supported.
  Evidence: `git status --short --branch --untracked-files=all` reported clean `mvp-implementation...origin/mvp-implementation`; `git fetch --all --prune` refreshed refs; `git log --max-count=15` showed `539c483` as both `HEAD` and `origin/mvp-implementation`.

- Criterion: No open PRs remain against `mvp-implementation`.
  Evidence status: Supported.
  Evidence: `gh pr list --base mvp-implementation --state open --json ...` returned `[]`.

- Criterion: Recent MVP foundation PRs are merged into `mvp-implementation`.
  Evidence status: Supported.
  Evidence: `gh pr list --base mvp-implementation --state merged --limit 20 --json ...` showed PRs #21 through #29 merged into `mvp-implementation`, including profile, reminders, documents, care card preview/share link, settings, timeline, and non-goal alignment.

- Criterion: The app builds and automated validation gates pass.
  Evidence status: Supported.
  Evidence: Web Vitest, web TypeScript, full monorepo tests, production build, committed Playwright e2e, and opt-in live RLS tests passed. Sandbox-only failures are recorded below with approved reruns.

- Criterion: The current app runs locally against local Supabase.
  Evidence status: Supported.
  Evidence: `docker ps` showed Caniello Supabase containers up and healthy; `SUPABASE_TELEMETRY_DISABLED=1 supabase status --workdir infra` passed outside the sandbox; `SUPABASE_TELEMETRY_DISABLED=1 supabase db push --local --workdir infra` reported the local database is up to date; `pnpm --filter web dev` started `http://localhost:3000`.

- Criterion: Core signed-in owner flows work together end to end.
  Evidence status: Supported.
  Evidence: Live browser validation with the seeded owner confirmed login, app shell, saved Bruno profile read/save, reminder create/complete, document metadata create, timeline event create/edit, care card preview, share link create/public view/revoke, settings profile/data export request, mobile responsive smoke, no console errors, and no horizontal overflow.

- Criterion: Sharing/export and caregiver/family access are represented where implemented.
  Evidence status: Supported with scope caveat.
  Evidence: The implemented sharing path is a revocable read-only share link at `/share/[token]`; the public page showed Bruno, chip, active reminders, and recent document metadata, then stopped exposing pet data after revocation. PDF export, invitations, caregiver accounts, role changes, and household permission changes remain intentionally disabled or out of scope in current tasks.

- Criterion: Medical, legal, privacy, and non-goal boundaries are preserved.
  Evidence status: Supported with a polish gap.
  Evidence: Authenticated profile/reminder/document/timeline/sharing/settings screens kept medical/passport boundary copy and disabled out-of-scope controls. Public share page also keeps the medical/passport boundary, but several Polish words are missing diacritics; see Findings.

## Checks

- Check: Git branch/worktree state.
  Type: Operational.
  Status: Passed.
  Expected result: Working tree is clean and on the target integration branch.
  Actual result: Clean `mvp-implementation...origin/mvp-implementation` at `539c483`.

- Check: GitHub open PR state.
  Type: Operational.
  Status: Passed.
  Expected result: No open PRs targeting `mvp-implementation`.
  Actual result: `gh pr list --base mvp-implementation --state open` returned `[]`.

- Check: GitHub merged PR state.
  Type: Operational.
  Status: Passed.
  Expected result: Recent MVP foundation PRs are merged into `mvp-implementation`.
  Actual result: PRs #21, #22, #23, #24, #25, #26, #27, #28, and #29 are merged into `mvp-implementation`.

- Check: `pnpm --filter web test`.
  Type: Automated.
  Status: Passed.
  Expected result: Web Vitest suite passes.
  Actual result: 19 files passed, 5 opt-in files skipped, 105 tests passed, 5 skipped.

- Check: `pnpm --filter web lint`.
  Type: Automated.
  Status: Passed after sandbox rerun.
  Expected result: TypeScript validation passes.
  Actual result: Sandboxed command failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed with `tsc --noEmit --pretty false`.

- Check: `pnpm test`.
  Type: Automated.
  Status: Passed after sandbox rerun.
  Expected result: Full monorepo test suite passes.
  Actual result: Sandboxed command failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed with 10 successful Turbo tasks.

- Check: `pnpm build`.
  Type: Automated.
  Status: Passed after sandbox rerun.
  Expected result: Production build succeeds.
  Actual result: Sandboxed command failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed with 7 successful Turbo build tasks. Next.js built `/app`, all MVP API routes, and `/share/[token]`.

- Check: `pnpm test:e2e`.
  Type: Automated.
  Status: Passed after sandbox rerun.
  Expected result: Committed Playwright e2e suite passes.
  Actual result: Sandboxed command failed with `[ERROR] fetch failed`; approved outside-sandbox rerun passed 18/18 tests across desktop and mobile Chromium. Generated screenshots were removed from the worktree after the run.

- Check: Supabase migration readiness.
  Type: Operational.
  Status: Passed after sandbox rerun.
  Expected result: Local database is running and current.
  Actual result: `supabase status` required telemetry disabled and outside-sandbox Docker access; outside-sandbox status passed. `supabase db push --local --workdir infra` reported local database is up to date.

- Check: Opt-in live Supabase RLS tests.
  Type: Security.
  Status: Passed after sandbox rerun.
  Expected result: Owner-isolation tests pass for profile, reminders, documents, timeline events, and account settings.
  Actual result: Sandboxed run failed on localhost `EPERM`; approved outside-sandbox rerun passed 5/5 tests.

- Check: Live browser owner flow on desktop.
  Type: UI/Behavior.
  Status: Passed.
  Expected result: Seeded owner can use the core MVP owner flows together without console or API errors.
  Actual result: Login succeeded; profile read/save worked; reminder create/complete worked; document metadata create worked; timeline event create/edit worked; sharing preview loaded saved profile/reminders/documents; share link create/public view/revoke worked; settings profile save and data export request worked; dev server showed 200/201 responses for the flow.

- Check: Live public share link.
  Type: UI/Behavior/Security.
  Status: Passed with copy polish gap.
  Expected result: Public link exposes only the read-only care card while active and no pet data after revocation.
  Actual result: Active link showed Bruno, chip, reminders, and documents; after revocation the same URL showed an unavailable state and did not show Bruno.

- Check: Mobile responsive smoke.
  Type: UI.
  Status: Passed.
  Expected result: Signed-in app works at a mobile viewport with no horizontal overflow or console errors.
  Actual result: 390x900 viewport showed Home and Sharing with `scrollWidth` equal to viewport width and zero browser console errors.

## Evidence

- Current branch: `mvp-implementation`
- Current merge commit: `539c483`
- Open PR result: `[]`
- Recently merged PRs into `mvp-implementation`: #21 through #29
- Local Supabase: running; local database up to date
- Local web server: `http://localhost:3000`
- Live browser validation records created during this run:
  - Completed reminder: `Readiness reminder 202606131029`
  - Document metadata: `Readiness document 202606131029`
  - Edited timeline event: `Readiness event updated 202606131029`
  - Share link: created, verified publicly, then revoked
- Browser console errors during final mobile smoke: none
- Dev server API evidence: 200/201 for login, profile, reminders, documents, timeline events, share links, public share page, and account settings requests

## Findings

- P0: None.

- P1: New-owner local signup/login is blocked by missing confirmation email delivery.
  Evidence: Human manual finding on 2026-06-13: local env does not send confirmation emails, so a newly created account cannot be used for login.
  Impact: Broader MVP validation with fresh owner accounts is blocked unless testers use seeded/preconfirmed accounts, local email confirmation is configured, or the local validation flow explicitly bypasses confirmation.

- P1: Visible Google and Apple sign-in buttons do not work.
  Evidence: Human manual finding on 2026-06-13; code inspection shows `apps/web/features/account/AccountApp.tsx` renders `SocialButton` entries for Google and Apple but there is no implemented OAuth submit path in the account form.
  Impact: The auth UI promises unsupported login methods. This should be disabled, hidden, or implemented before external owner validation.

- P1: Dashboard and app shell still behave as a Bruno-specific skeleton rather than changing with the active pet.
  Evidence: Human manual finding on 2026-06-13; code/content inspection shows hardcoded Bruno dashboard and selector copy in `apps/web/features/account/content.ts`.
  Impact: Multi-pet or active-pet validation is not ready. The current flow supports first-pet MVP validation only and should not be presented as pet-switching behavior.

- P1: The panel implementation does not comply with the MVP mockup image set.
  Evidence: Human manual finding on 2026-06-13 referencing `spec/design/visual-artifacts/mvp/*.png`; this readiness run did not perform a design-fidelity review against the full image set.
  Impact: Visual/product validation against the provided mockups remains incomplete and may fail human design expectations even though functional flows work.

- P2: Public share page Polish copy is missing diacritics.
  Evidence: `apps/web/app/share/[token]/page.tsx` contains public user-facing strings such as `Udostepniona`, `niedostepny`, `mogla zostac odwolana`, `porzadkuje`, `Najblizsze`, `Wazne`, `wlasciciela`, and `Podroz`.
  Impact: This does not break the share-link flow, but it weakens Polish-first trust on the recipient-facing page.

- P2: Dashboard mode controls are confusing and inconsistent.
  Evidence: Human manual finding on 2026-06-13: the flow/buttons between `Panel Bruno` and `Pierwsze uruchomienie` are unclear and should be consistent.
  Impact: Activation/onboarding validation can be confusing; the product needs a clearer first-run versus returning-owner state model.

- P2: Active-pet selector appears selected but is not a real pet-selection menu.
  Evidence: Human manual finding on 2026-06-13: the pet menu has constantly selected Bruno and no dropdown; code/content inspection shows static `appPetSelectorValue: "Bruno"`.
  Impact: UI suggests selection without providing selection behavior. This should be made real, disabled, or relabeled.

- P2: Pet profile surface suggests only one pet can be added/edited.
  Evidence: Human manual finding on 2026-06-13. Current implementation is scoped to the first saved pet.
  Impact: This is acceptable only if MVP validation scripts explicitly test first-pet behavior; multi-pet creation/editing requires a separate approved task.

- P2: Species and sex/gender controls are free-text fields rather than clear dropdown choices.
  Evidence: Human manual finding on 2026-06-13; `PetProfileSection` renders text-style profile fields for `species` and `sexOrGender`.
  Impact: Data quality and UX are weaker than expected for validation; this should be shaped as a profile-form polish task if dropdowns are required.

- P2: Document safe lacks a real upload option.
  Evidence: Human manual finding on 2026-06-13; document vault copy and implementation explicitly keep file upload disabled and metadata-only.
  Impact: If MVP validation requires actual medical-file upload, current document-vault readiness is insufficient. If metadata-only is the intended validation scope, the UI must set expectations more clearly.

- P2: Timeline and reminder relationship is unclear.
  Evidence: Human manual finding on 2026-06-13. The MVP mockup at `spec/design/visual-artifacts/mvp/image 10.png` shows the Timeline page as a historical care timeline with a right-side `Next Upcoming` panel for upcoming reminder/action context. Current implementation treats reminders and timeline events as separate manual records and intentionally excludes automatic timeline entries from reminders/documents.
  Impact: Users may not understand whether completed reminders should appear in timeline history. The implementation should align the Timeline surface to the mockup: historical/completed events in the main timeline, upcoming reminder/action context in the right rail, and clear navigation from that upcoming block to the reminder flow.

- P2: Account deletion request persistence needs verification against the intended table.
  Evidence: Human manual finding on 2026-06-13: account deletion request is not saved in the proper table. Code inspection shows intended writes to `account_deletion_requests`, and automated tests cover the route/helper path, but this specific manual failure was not reproduced in this update.
  Impact: Privacy/data-rights validation should not proceed until the live UI action is rechecked against the database table and audit row behavior.

- P3: Current committed e2e suite does not cover the full signed-in owner MVP flow.
  Evidence: `pnpm test:e2e` passed 18 tests, but the suite covers landing/auth shell/redirect behavior, not the live signed-in profile-reminder-document-timeline-sharing-settings flow validated manually through the browser in this run.
  Impact: Future regressions in the combined owner flow could be missed unless this is automated.

- P3: Opt-in RLS tests mutate seeded local demo rows.
  Evidence: After the live RLS run, the seeded reminder/document/timeline records showed test-oriented text such as `Owner A reminder used by RLS tests`, `Owner A rabies certificate`, and `Owner A annual visit`.
  Impact: Core app behavior still worked, but local validation evidence can look noisy and less product-realistic after security tests.

- P3: `./scripts/start.sh` reported Docker unreachable in the sandbox while Docker containers were actually running.
  Evidence: `./scripts/start.sh` failed at `docker info`; `docker ps` showed the Caniello Supabase containers running and healthy; outside-sandbox Supabase status passed.
  Impact: This is a validation-environment friction point, not an app readiness blocker.

## Post-Acceptance Manual Findings

Human reported the following manual findings on 2026-06-13 after accepting the readiness artifact:

- Dashboard always shows Bruno's view and does not change with the selected pet.
- The `Panel Bruno` versus `First launch` flow/buttons are confusing and inconsistent.
- The pet menu has a constantly selected Bruno and no real dropdown.
- The pet menu/profile flow suggests adding and editing only one pet.
- Species and gender/sex selection is not presented as expected dropdown choices.
- The document safe is missing real upload.
- The relationship between timeline and reminders is unclear; `spec/design/visual-artifacts/mvp/image 10.png` indicates upcoming reminders/actions should appear on the right side of the Timeline page while historical events remain in the main timeline.
- The panel implementation does not comply with `spec/design/visual-artifacts/mvp/*.png`.
- Apple and Google sign-in buttons do not work.
- Account deletion request is not saved in the proper table.
- Local environment does not send confirmation emails, so new account login cannot be completed.

These findings revise the readiness interpretation: current implementation is suitable for seeded-owner internal validation of implemented flows, but not ready for broader new-owner validation, OAuth validation, upload validation, multi-pet validation, or mockup-fidelity validation without follow-up work or explicit scope waivers.

## Missing, Skipped, or Unavailable Checks

- Check: Production deployment.
  Reason: Out of scope for MVP validation readiness and requires explicit human release approval.
  Risk: This artifact does not prove Vercel production readiness.

- Check: Real PDF export.
  Reason: PDF export is intentionally disabled and out of scope for the current implementation.
  Risk: None for the current share-link validation path; PDF should not be promised in validation scripts.

- Check: Caregiver accounts, invitations, household role changes, or family permission management.
  Reason: Not implemented; current sharing is via controlled read-only share link.
  Risk: Validation should frame caregiver/family sharing as controlled link sharing only, not account-based access.

- Check: File upload, OCR, AI answers, notifications, recurrence, calendar sync, booking, payments, marketplace, clinic/provider workflows.
  Reason: Explicitly out of scope for current MVP foundation tasks and roadmap non-goals.
  Risk: Validation should not imply these capabilities exist.

## Future CI/CD or Lifecycle Gates

- Gate: Signed-in owner MVP Playwright flow.
  Trigger: Before future MVP validation checkpoints and PRs touching app-owner flows.
  Blocks: Readiness if login, profile, reminder, document, timeline, share link, public revoke, or settings basics regress.

- Gate: Public share page localization and boundary-copy smoke.
  Trigger: Before user-facing share-link validation.
  Blocks: Readiness if Polish-first copy, read-only status, revocation behavior, or medical/passport boundary copy regresses.

- Gate: RLS test fixture hygiene.
  Trigger: Before security checks are included in a broader validation script.
  Blocks: Validation-environment readiness if seeded product-demo rows are mutated without cleanup.

## Planned Recovery Tasks

Feature brief: `spec/features/mvp-validation-readiness-recovery.md`.

1. Preserve the current readiness baseline and prepare the next validation script: `spec/tasks/mvp-readiness-baseline-and-script.md`.

2. Fix local new-owner validation and broken OAuth expectations: `spec/tasks/new-owner-access-validation.md`.

3. Align dashboard/app-shell behavior with live pet state and MVP mockups: `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`.

4. Clarify pet/profile IA, first-pet versus multi-pet expectations, and species/sex-or-gender controls: `spec/tasks/pet-profile-ia-and-controls.md`.

5. Decide document upload scope before promising or implementing real file upload: `spec/tasks/document-upload-scope-decision.md`.

6. Implement the Timeline page relationship shown in `spec/design/visual-artifacts/mvp/image 10.png`: history in the main timeline, upcoming reminders/actions in the right-side panel, and navigation into Reminders: `spec/tasks/timeline-upcoming-reminders-alignment.md`.

7. Re-verify account deletion requests live against `account_deletion_requests` and related audit behavior: `spec/tasks/account-deletion-persistence-verification.md`.

Additional validation hygiene remains recorded above: public share Polish diacritics, committed signed-in Playwright coverage, RLS fixture cleanup, and local-dev startup messaging.

## Result

Accepted by human.

Readiness decision: REVISED after manual validation - YES only for seeded-owner internal MVP validation; NO for broader new-owner or mockup-fidelity MVP validation until the post-acceptance P1/P2 gaps are resolved or explicitly waived.

The core owner MVP flows are ready to validate locally with the current implementation, provided validation messaging stays scoped to implemented capabilities: owner profile, reminders, document metadata, manual timeline, revocable read-only share link, account/privacy settings, and disabled placeholders for unavailable features.

## Human Decision

Accepted on 2026-06-13 by explicit human reply: "Accepted".

This acceptance does not approve release, deployment, merge, production launch, roadmap movement, or implementation of the listed follow-up tasks.

## Approval Caveat

This readiness artifact reports evidence and a yes/no readiness decision only. It does not approve, merge, release, deploy, mark a human checkpoint complete, or move roadmap scope.
