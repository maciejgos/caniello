# Caniello Handoff

## Current State

- Active task: `spec/tasks/settings-consent-and-account-deletion-alignment.md`.
- Active branch: `codex/settings-consent-alignment`, created from `mvp-implementation`.
- Current workflow: draft PR review after publication.
- Execution mode: Standard; user-visible privacy UI on existing authenticated APIs/RLS, with no migration or lifecycle-policy change.
- Worktree: expected clean after this publication handoff update is committed and pushed.
- Publication: commit `f3c5381` was pushed to `origin/codex/settings-consent-alignment`; draft PR #43 is open at https://github.com/maciejgos/caniello/pull/43 against `mvp-implementation`.
- Pull requests: PR #42 merged into `mvp-implementation` on 2026-06-19 before this task branch was created.
- Human approval state: no release, deployment, production-readiness, public health-record upload, roadmap expansion, or deferred-capability rollout is approved by this handoff.

## Roadmap Review

- `spec/product-context.md`, `spec/roadmap.md`, root `ROADMAP.md`, and `README.md` remain aligned around `Now - MVP Foundation`.
- `Now` remains focused on owner-side pet profiles, health records, reminders, documents, trusted sharing, account/privacy foundations, and the reliability work needed to validate them.
- `Next`, `Later`, and `Not Now` capabilities have not leaked into the active task list. AI diagnosis or treatment guidance, marketplace/booking/payments, clinic workflow ownership, complex household roles, public document sharing, and official passport replacement claims remain blocked.
- Editorial drift corrected on 2026-06-18: new-owner access, dashboard/active-pet alignment, live dashboard data, authenticated-app annotation follow-ups, Timeline/upcoming-reminder alignment, and account-deletion persistence were implemented and merged but still appeared partly as remaining readiness work.
- Remaining readiness work is represented by the pending task files in `spec/roadmap.md`; the new Settings task makes the existing `Now` account/privacy/consent outcome executable without expanding or reprioritizing product scope.

## Latest Completed Work

- Aligned production Settings with the `/mvp-flow` panel hierarchy and responsive visual language while preserving real profile, consent, export-request, deletion-request, RLS, and audit behavior.
- Split Settings into focused feature-local panels for account profile, consent, data export, destructive account deletion, security context, and medical boundaries.
- Added action-specific success/error feedback that preserves edited values, explicit latest request dates/statuses, consent withdrawal coverage, and exact-confirmation deletion behavior.
- Added opt-in live Settings Playwright coverage for desktop reference capture and Pixel 7 responsive/no-overflow verification.
- Evaluator verdict: Pass. Validation artifact: `spec/validation/settings-consent-and-account-deletion-alignment-evaluation.md`.

- Renamed the 18 MVP visual artifacts from anonymous `image N.png` names to screen/flow names such as `home-dashboard.png`, `document-upload-scan.png`, `care-timeline.png`, `sign-in.png`, and `sign-up.png`.
- Added `spec/design/visual-artifacts/mvp/README.md` as the artifact map and recorded `/mvp-flow` Settings as the visual source because no standalone Settings screenshot was supplied.
- Updated active task, feature, validation, and design-index references to use the descriptive filenames.
- Planned `spec/tasks/settings-consent-and-account-deletion-alignment.md` to align production Settings with `/mvp-flow` while preserving real profile, consent, export-request, account-deletion-request, RLS, and audit behavior.
- Refined auth, pet-profile, document-upload, and completed account-settings tasks to point to the correct named visual sources and follow-up task.

- PR #38 merged new-owner email/password validation and honest unavailable OAuth states. Task and validation evidence were accepted by the human on 2026-06-18.
- PRs #39-#41 merged dashboard/active-pet alignment, live saved dashboard data, functional first-pet onboarding, and authenticated-app annotation corrections.
- PR #33 merged Timeline history and upcoming-reminder layout alignment. Evaluator verdict: Pass; validation artifact human decision remains pending.
- PR #32 merged account deletion persistence and audit-evidence verification. Evaluator verdict: Pass; validation artifact human decision remains pending.
- Recent validation artifacts:
  - `spec/validation/new-owner-access-validation-evaluation.md`
  - `spec/validation/dashboard-mockup-and-active-pet-alignment-evaluation.md`
  - `spec/validation/live-dashboard-data-evaluation.md`
  - `spec/validation/app-annotation-followups-evaluation.md`
  - `spec/validation/timeline-upcoming-reminders-alignment-evaluation.md`
  - `spec/validation/account-deletion-persistence-verification-evaluation.md`

## Validation Status

- Passed: focused Settings component/route/server tests (29), contracts tests (23), full web suite (115 passed, 5 skipped), web type/lint, production build, live local Supabase RLS/audit test, Pixel 7 Playwright check, formatting, and `git diff --check`.
- Browser: in-app desktop Settings and real consent/deletion interactions passed with no relevant console warnings/errors. The in-app viewport override did not apply for mobile, so the configured Playwright mobile project supplied responsive evidence.
- Required gate state: unit/integration Passed; lint/types Passed; build Passed; owner-isolation/audit Passed; design comparison Passed; evaluator Pass; coverage baseline preserved; architecture/product/privacy ratchets preserved.
- Validation artifact: `spec/validation/settings-consent-and-account-deletion-alignment-evaluation.md`.
- Current readiness baseline remains `spec/validation/mvp-validation-readiness-2026-06-13.md`, but its manual gap list is partly historical because several recovery tasks have since merged. Run a fresh readiness pass before making a broader MVP-readiness claim.

## Known Gaps

- Remaining roadmap-listed readiness tasks:
  - `spec/tasks/pet-profile-ia-and-controls.md`
  - `spec/tasks/document-upload-storage-implementation.md`
  - `spec/tasks/audit-product-event-foundation.md`
  - `spec/tasks/data-rights-manual-runbook.md`
  - `spec/tasks/share-link-lifecycle-hardening.md`
  - `spec/tasks/live-rls-fixture-isolation.md`
  - `spec/tasks/public-health-upload-release-readiness-playbook.md`
  - `spec/tasks/feature-boundary-dependency-guardrails.md`
- `spec/tasks/pet-profile-ia-and-controls.md` needs refinement before implementation because active-pet honesty and the species dropdown were already delivered by merged work; only unresolved IA/control behavior should remain.
- The merged Timeline and account-deletion validation artifacts still record human decisions as pending. Their merge state must not be rewritten as artifact acceptance.
- Public health-record upload remains blocked until its implementation and release-readiness gates are completed and a human explicitly approves release.
- Production deployment, PDF export, caregiver accounts/invitations, public document-file sharing, AI behavior, notification delivery/recurrence, calendar sync, clinic/provider workflows, marketplace, booking, and payments remain unapproved or out of scope.

## Next Recommended Action

- Review draft PR #43 and the Settings validation artifact. Evaluator Pass and publication do not imply human acceptance or merge approval.
- After review/merge, select exactly one remaining `Now` task. `spec/tasks/pet-profile-ia-and-controls.md` still needs scope refinement before implementation because active-pet honesty and the species dropdown were already delivered.
- Before any broader readiness claim, rerun the MVP validation script and replace the historical 2026-06-13 gap assessment with current evidence.
