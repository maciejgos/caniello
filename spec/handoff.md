# Caniello Handoff

## Current State

- Active task: `spec/tasks/settings-consent-and-account-deletion-alignment.md` is planned; implementation has not started.
- Active branch: `codex/name-mvp-artifacts-and-plan-settings`, created from `mvp-implementation`.
- Current workflow: design-artifact naming cleanup and task planning.
- Worktree: contains intentional MVP image renames, reference updates, the new Settings task, roadmap update, and this handoff update.
- Pull requests: no open PRs as of 2026-06-18. PRs #39, #40, and #41 were merged into `mvp-implementation` on 2026-06-18.
- Human approval state: no release, deployment, production-readiness, public health-record upload, roadmap expansion, or deferred-capability rollout is approved by this handoff.

## Roadmap Review

- `spec/product-context.md`, `spec/roadmap.md`, root `ROADMAP.md`, and `README.md` remain aligned around `Now - MVP Foundation`.
- `Now` remains focused on owner-side pet profiles, health records, reminders, documents, trusted sharing, account/privacy foundations, and the reliability work needed to validate them.
- `Next`, `Later`, and `Not Now` capabilities have not leaked into the active task list. AI diagnosis or treatment guidance, marketplace/booking/payments, clinic workflow ownership, complex household roles, public document sharing, and official passport replacement claims remain blocked.
- Editorial drift corrected on 2026-06-18: new-owner access, dashboard/active-pet alignment, live dashboard data, authenticated-app annotation follow-ups, Timeline/upcoming-reminder alignment, and account-deletion persistence were implemented and merged but still appeared partly as remaining readiness work.
- Remaining readiness work is represented by the pending task files in `spec/roadmap.md`; the new Settings task makes the existing `Now` account/privacy/consent outcome executable without expanding or reprioritizing product scope.

## Latest Completed Work

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

- This planning pass changed documentation and renamed binary visual-reference files only; no runtime code changed.
- Passed: all 18 renamed files exist, no current `spec/design/visual-artifacts/mvp/image N.png` references remain, named references were reviewed, and `git diff --check` passed.
- Unavailable: `pnpm validation:spec-alignment` could not verify the pinned pnpm release in the sandbox because registry fetches failed. The required escalation rerun was rejected when the approval service reported its usage limit.
- Product tests, builds, and browser checks: not required because runtime behavior did not change.
- Current readiness baseline remains `spec/validation/mvp-validation-readiness-2026-06-13.md`, but its manual gap list is partly historical because several recovery tasks have since merged. Run a fresh readiness pass before making a broader MVP-readiness claim.

## Known Gaps

- Remaining roadmap-listed readiness tasks:
  - `spec/tasks/pet-profile-ia-and-controls.md`
  - `spec/tasks/settings-consent-and-account-deletion-alignment.md`
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

- Implement exactly one remaining `Now` task. The newly planned Settings alignment task is ready for human scope review; implementation that introduces a migration or changes account lifecycle policy still requires explicit human approval.
- Before any broader readiness claim, rerun the MVP validation script and replace the historical 2026-06-13 gap assessment with current evidence.
