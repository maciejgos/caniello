# Validation: MVP Next-Pass Validation Script

## Status

Ready for human review

## Scope

This script defines the next local MVP readiness pass after the 2026-06-13 readiness artifact was narrowed to seeded-owner internal validation only. It distinguishes seeded-owner checks from new-owner checks and keeps mockup fidelity, recovery tasks, and explicit non-goals visible before a broader MVP validation decision is made.

This script is a validation checklist, not a launch approval, release gate, deployment decision, or roadmap change.

## Source Artifacts

- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Recovery feature brief: `spec/features/mvp-validation-readiness-recovery.md`
- Historical readiness evidence: `spec/validation/mvp-validation-readiness-2026-06-13.md`
- Design source of truth for MVP visible surfaces: `spec/design/visual-artifacts/mvp/*.png`
- Recovery task set:
  - `spec/tasks/mvp-readiness-baseline-and-script.md`
  - `spec/tasks/new-owner-access-validation.md`
  - `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`
  - `spec/tasks/pet-profile-ia-and-controls.md`
  - `spec/tasks/document-upload-scope-decision.md`
  - `spec/tasks/timeline-upcoming-reminders-alignment.md`
  - `spec/tasks/account-deletion-persistence-verification.md`

## Preconditions

- Local dependencies are installed with `pnpm install`.
- Local Supabase is running and migrated.
- The web app can run at `http://localhost:3000`.
- The seeded validation owner exists: `akowalska@example.com`.
- Any task being used as readiness evidence has its own validation artifact or task verification notes.
- Intentional deviations from `spec/design/visual-artifacts/mvp/*.png` are recorded with human approval before they are counted as mockup-fidelity evidence.

## Seeded-Owner Baseline Checks

These checks prove the existing internal validation path still works for the seeded Anna/Bruno account. They do not prove new-owner activation readiness by themselves.

- Check: Login with seeded owner.
  Expected result: `akowalska@example.com` can sign in locally and reach `/app`.

- Check: Pet profile read/save.
  Expected result: Saved pet profile data loads, can be edited, persists after reload, and keeps allergies, medication, chip, and notes visible.

- Check: Reminder create/complete.
  Expected result: Owner can create at least one vaccination, medication, deworming, or visit reminder and complete it without console or API errors.

- Check: Document vault current MVP behavior.
  Expected result: Implemented document behavior matches the current approved scope. If upload remains out of scope, metadata-only copy must not imply real file storage.

- Check: Timeline history.
  Expected result: Historical or completed care events appear in the main timeline, can be created or edited where implemented, and do not imply automatic AI, OCR, document, or reminder ingestion unless separately approved.

- Check: Sharing.
  Expected result: Owner can create a controlled read-only share link, public recipient view exposes only intended care-card information, and revocation makes the link unavailable.

- Check: Account settings and privacy actions.
  Expected result: Profile/language settings save, data export request behavior matches current scope, and account deletion request persistence is verified against the intended table before being counted as ready.

- Check: Mobile and console smoke.
  Expected result: Core signed-in surfaces have no obvious overlap, horizontal overflow, or browser console errors at desktop and mobile widths.

## New-Owner Activation Checks

These checks must pass before the app is called broadly ready for new-owner MVP validation.

- Check: Local new-owner signup confirmation.
  Expected result: A brand-new local owner can complete signup and login through a documented local path, such as Inbucket/Mailpit confirmation or an explicit local validation bypass.

- Check: First-run state.
  Expected result: A new owner sees an understandable first-run path that guides them to create or complete the first pet profile without relying on Bruno-specific copy.

- Check: Unavailable OAuth actions.
  Expected result: Google and Apple sign-in controls are hidden, disabled, or clearly unavailable unless real local provider behavior is implemented and validated.

- Check: First pet versus multi-pet expectation.
  Expected result: The app clearly communicates whether the MVP validates one active pet or multiple pets, and no menu or selector advertises unavailable pet-switching behavior.

- Check: Required first-owner data path.
  Expected result: New owner can create or save the minimum pet/profile state needed for the other MVP surfaces to behave predictably.

## Mockup-Fidelity Checks

Use `spec/design/visual-artifacts/mvp/*.png` as the visible UI source of truth for MVP readiness tasks. Record the reviewed image names and any approved deviations in the task or validation artifact.

- Check: Auth screens.
  Expected result: Login/signup visible layout, labels, controls, and unavailable OAuth states match the supplied auth mockups where those states are defined.

- Check: App shell and dashboard.
  Expected result: Dashboard, active-pet affordance, first-run/returning-owner entry points, navigation, labels, spacing, and panel structure match the supplied app mockups where defined.

- Check: Pets/Profile.
  Expected result: Pet profile information architecture, species and sex-or-gender controls, labels, and supported pet-scope language match the supplied Pets/Profile mockups where defined.

- Check: Timeline.
  Expected result: `spec/design/visual-artifacts/mvp/care-timeline.png` is reflected with historical events in the main timeline and upcoming reminders/actions in the `Next Upcoming` side panel.

- Check: Documents.
  Expected result: Document safe behavior and copy match the approved upload/metadata scope. If real upload is not approved, the UI must not imply actual file upload.

## Recovery Task Gates

- Gate: `spec/tasks/mvp-readiness-baseline-and-script.md`
  Status for next pass: Must be complete before running this script as readiness evidence.

- Gate: `spec/tasks/new-owner-access-validation.md`
  Status for next pass: Required for broader new-owner validation.

- Gate: `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`
  Status for next pass: Required for mockup-fidelity and non-Bruno dashboard validation.

- Gate: `spec/tasks/pet-profile-ia-and-controls.md`
  Status for next pass: Required for first-pet versus multi-pet clarity and profile control validation.

- Gate: `spec/tasks/document-upload-scope-decision.md`
  Status for next pass: Required before validating document upload or deciding metadata-only is acceptable.

- Gate: `spec/tasks/timeline-upcoming-reminders-alignment.md`
  Status for next pass: Required before validating Timeline/Reminder relationship against `care-timeline.png`.

- Gate: `spec/tasks/account-deletion-persistence-verification.md`
  Status for next pass: Required before treating account deletion request behavior as ready.

## Suggested Automated Commands

- `git status --short --branch --untracked-files=all`
- `pnpm --filter web test`
- `pnpm --filter web lint`
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`
- Opt-in live RLS tests when Supabase and localhost access are available.

Record sandbox-only failures separately from approved outside-sandbox reruns. Do not count a check as passed unless the successful run is explicit.

## Acceptance Criteria Mapping

- Criterion: The script distinguishes seeded-owner checks from new-owner checks.
  Evidence status: Supported.
  Evidence: Separate `Seeded-Owner Baseline Checks` and `New-Owner Activation Checks` sections.

- Criterion: The script references the relevant recovery task files and design artifacts.
  Evidence status: Supported.
  Evidence: `Source Artifacts`, `Mockup-Fidelity Checks`, and `Recovery Task Gates` sections.

- Criterion: The script states that seeded-owner validation is not broader new-owner readiness.
  Evidence status: Supported.
  Evidence: Scope and seeded-owner baseline language.

## Missing, Skipped, or Unavailable Checks

- Check: Live readiness rerun.
  Reason: This task is documentation-only and prepares the next pass; the task explicitly does not retest every product flow.
  Risk: The script itself is ready for review, but app readiness still depends on the recovery tasks and future validation evidence.

## Future CI/CD or Lifecycle Gates

- Gate: Signed-in owner Playwright flow.
  Trigger: Before future MVP readiness decisions and PRs touching authenticated owner flows.
  Blocks: Readiness if profile, reminders, documents, timeline, sharing, or settings basics regress.

- Gate: New-owner activation smoke.
  Trigger: Before broader MVP validation with fresh accounts.
  Blocks: Readiness if signup confirmation, login, first-run pet creation, or unavailable OAuth states fail.

- Gate: Mockup-fidelity review.
  Trigger: Before any task touching visible MVP layout counts as readiness evidence.
  Blocks: Mockup-fidelity readiness when unapproved deviations remain.

## Result

Ready for human review.

This result does not approve launch, release, deployment, merge, production use, roadmap movement, or human acceptance of the next MVP readiness decision.

## Follow-Up

- Run this script after the recovery task set is implemented, evaluated, and handed off.
- Keep any scope waivers explicit if the next readiness decision excludes upload, OAuth, multi-pet, or mockup-fidelity behavior.

## Human Decision

Accepted by human on 2026-06-13 with the instruction "Accept all artifacts."

This acceptance applies to this validation-script artifact only. It does not approve launch, release, deployment, merge, production use, roadmap movement, or the future broader MVP readiness decision.
