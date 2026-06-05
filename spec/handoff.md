# Caniello Handoff

## Current State

- Active task: `spec/tasks/pet-profile-foundation.md`.
- Active branch: `codex/pet-profile-foundation`.
- Current workflow: pet profile foundation is implemented, evaluated, human-approved, and already published as draft PR https://github.com/maciejgos/caniello/pull/21. PR review follow-up fixes for atomic first household creation, real calendar-date validation, and fresh pet `updated_at` updates were implemented on 2026-06-05. Fresh evaluator rerun after migration-history cleanup records verdict `Pass` in `spec/validation/pet-profile-foundation-evaluation.md`. Human approved the evaluated pet-profile foundation work on 2026-06-05. The work is not merged, released, or deployed.

## Latest Notes

- The active harness is being simplified around `spec/roadmap.md`, `spec/features/`, `spec/tasks/`, and the Forge skills.
- Historical Flow Forge material is archived under `.codex/flow-forge-reference/` and remains available as reference.
- Durable product context now lives in `spec/product-context.md`.
- Old Flow Forge-era spec artifacts were archived under `spec/archive/flow-forge-history/` instead of deleted.
- Active guidance now points normal work to `spec/product-context.md`, `spec/roadmap.md`, lightweight feature briefs, task files, architecture notes or ADRs, validation, and handoff.
- Created feature brief `spec/features/authenticated-app-dashboard-skeleton.md` for the post-auth app dashboard and onboarding skeleton.
- Created task candidates:
  - `spec/tasks/authenticated-app-shell-navigation.md`
  - `spec/tasks/first-run-onboarding-skeleton.md`
  - `spec/tasks/home-dashboard-skeleton.md`
  - `spec/tasks/app-section-empty-states.md`
  - `spec/tasks/dashboard-skeleton-validation.md`
- Refined `spec/tasks/authenticated-app-shell-navigation.md` for implementation as a narrow authenticated shell/navigation task only: no dashboard cards, persistence, real search, real notifications, live assistant behavior, or sharing behavior.
- Created `forge-publisher` as the optional post-validation publishing skill for commit, push, and draft PR creation.
- Updated `AGENTS.md`, `README.md`, and `spec/README.md` so the lightweight Forge flow ends with optional publishing after handoff.
- Added matching `agents/openai.yaml` UI metadata for all active Forge skills so `forge-publisher` is consistent with the rest of the skill set.
- Implemented `spec/tasks/authenticated-app-shell-navigation.md` in `apps/web/features/account/AccountApp.tsx` and `apps/web/features/account/content.ts`: signed-in `/app` now renders a localized shell with desktop side navigation, mobile horizontal fallback navigation, active Home state, inert search/pet/notification/account affordances, existing logout behavior, and a minimal non-card main content region. No dashboard cards, onboarding, persistence, live search, notifications, AI, sharing, or section routes were added.
- Added focused `AccountApp` coverage for authenticated shell labels, active Home navigation, protected-route behavior, and logout/session behavior.
- Published draft PR https://github.com/maciejgos/caniello/pull/13 from `codex/authenticated-app-shell-navigation` to `codex/shape-app-dashboard-skeleton`. The branch includes commit `e32f571` for the app-shell task and intentionally excludes the unrelated local weekly-reporter commit that remained on `codex/shape-app-dashboard-skeleton`.
- Roadmap review on 2026-05-24 found the active roadmap and candidate dashboard tasks broadly aligned with MVP Foundation. The main stale item was the handoff labeling the completed app-shell task as active. Recommended but unapproved editorial follow-up: tighten `spec/roadmap.md` and `README.md` non-goal wording so it mirrors `spec/product-context.md` more completely for treatment recommendations, veterinary decision-making, broad clinic or partner workflow ownership, advanced household permissions, and advanced analytics/referral/calendar/partner-upload work.
- Updated `.codex/skills/forge-evaluator/SKILL.md` so evaluations must create or update a focused `spec/validation/<task-slug>-evaluation.md` artifact, link it from task verification notes when applicable, and include the artifact path in the final response. This is a workflow-harness change, not product-scope work.
- Refined and implemented `spec/tasks/first-run-onboarding-skeleton.md`.
- Signed-in `/app` now replaces the protected placeholder body with a localized first-run onboarding skeleton inside the existing authenticated shell.
- The onboarding surface includes a three-step setup path, a non-persistent add-pet form skeleton, disabled first-document upload/scan affordances, and disabled reminder/Ask Caniello preview actions.
- The implementation intentionally added no pet persistence, Supabase writes, migrations, upload/storage behavior, OCR/extraction, live reminders, AI answers, share links, new section routes, or mobile app work.
- Evaluated `spec/tasks/first-run-onboarding-skeleton.md` with `forge-evaluator`. Fresh verdict: Pass. Artifact: `spec/validation/first-run-onboarding-skeleton-evaluation.md`.
- Browser validation used a Playwright fallback because the in-app browser reported `Browser is not available: iab`.
- Review feedback on the first-run onboarding implementation found that the UI work over-concentrated responsibilities in `apps/web/features/account/AccountApp.tsx`.
- Follow-up implementation reshaped the first-run onboarding surface to more closely match `spec/design/visual-artifacts/mvp/image 6.png`: welcome header, horizontal three-step strip, add-pet panel, document extraction/review preview panel, pet imagery, and bottom Caniello tip band.
- Extracted the first-run onboarding UI to `apps/web/features/account/components/FirstRunOnboarding.tsx`, leaving `AccountApp.tsx` to compose the authenticated shell and feature-local onboarding component.
- Forge refactor pass extracted onboarding SVG rendering to `apps/web/features/account/components/OnboardingIcon.tsx`, keeping `FirstRunOnboarding.tsx` focused on screen structure and panel composition.
- Follow-up Forge refactor split authenticated Home/Dashboard UI into feature-local components: `AuthenticatedAppShell`, `AppTopBar`, `AppSidebar`, `AppHomeDashboard`, `SetupStepper`, `PetSetupPanel`, `DocumentSetupPanel`, `CanielloTip`, `OnboardingField`, `AppIcon`, and `OnboardingIcon`.
- Updated `.codex/skills/forge-implementer/SKILL.md` so future React/Next.js implementation must choose feature-local component boundaries before coding and review touched TSX files for component structure before validation.
- Updated accepted ADR `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md` to clarify that KISS does not mean large monolithic TSX files; route/page components should stay thin and distinct UI regions should be extracted into feature-local components.
- Created `.codex/skills/forge-refactor/` as a new active Forge skill for ADR 0011 codebase review and narrowly scoped behavior-preserving refactors.
- Handoff refreshed on 2026-05-25 with current branch, dirty worktree, validation status, known gaps, and next recommended actions. No human acceptance, release, merge, or roadmap scope move has been recorded.
- Published draft PR https://github.com/maciejgos/caniello/pull/18 from `codex/first-run-onboarding-skeleton` to `mvp-implementation`. The branch includes onboarding commit `fd89a9e` plus earlier Forge refactor/component-boundary guidance commits `9577868` and `764b7e5`. The PR is draft only and does not mark the task accepted, approved, merged, released, or complete.
- Roadmap review on 2026-06-01 found `spec/product-context.md`, `spec/roadmap.md`, and root `ROADMAP.md` still broadly aligned around MVP Foundation. The active and candidate dashboard tasks remain acceptable as `Now` work only while they stay skeleton-only and avoid persistence, live uploads, live AI, real sharing, clinic/provider workflow ownership, booking, payments, marketplace mechanics, and official passport replacement claims.
- Roadmap review drift findings on 2026-06-01:
  - `README.md` still has a shorter out-of-scope list than `spec/product-context.md`; it omits some stronger boundaries around treatment recommendations, veterinary decision-making, broad clinic or partner workflow ownership, advanced household permissions, advanced analytics/referrals/calendar sync, and partner document-upload flows.
  - `spec/roadmap.md` also summarizes `Not Now` more narrowly than `spec/product-context.md`, especially for treatment recommendations, veterinary decision-making, broad partner workflow ownership, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload flows.
  - `spec/handoff.md` had stale branch and dirty-worktree notes from the first-run onboarding publish record; this review refreshed the current branch and dirty-worktree note.
  - `spec/tasks/home-dashboard-skeleton.md` includes Ask Caniello preview and sharing prompt in `Now`; this is acceptable only as inert, safety-worded skeleton/demo UI. Any live AI answer, share-link generation, caregiver access model, export behavior, or record-grounded assistant behavior requires a dedicated approved task and likely roadmap/human approval depending on scope.
  - `spec/tasks/app-section-empty-states.md` includes Ask Caniello and Sharing sections in `Now`; this remains acceptable only for placeholder navigation and empty-state copy with no real AI, sharing permissions, PDF export, caregiver access, or provider workflow.
- Recommended roadmap/doc updates from the 2026-06-01 review, not approved as product-direction changes: tighten `README.md` and `spec/roadmap.md` non-goal wording so they mirror `spec/product-context.md`; add a short warning to future dashboard tasks that demo data must not imply saved records or backend capability; keep the next implementation task to exactly one pending task file.
- Refined `spec/tasks/home-dashboard-skeleton.md` before implementation to clarify skeleton-only boundaries, static demo data, disabled unavailable actions, assistant/sharing safety wording, and Polish/English coverage.
- Implemented `spec/tasks/home-dashboard-skeleton.md` in the authenticated `/app` home. The page now defaults to a returning-owner dashboard skeleton for Bruno with static preview cards, health summary, recent documents, care timeline, Ask Caniello preview, sharing preview, and Caniello tip.
- Preserved the first-run onboarding surface through a local, non-persistent mode switch in `AppHomeDashboard`. This switch is demo-only and does not read or write Supabase or local storage.
- Added `ReturningOwnerDashboard` as a feature-local component under `apps/web/features/account/components/` and kept dashboard copy in `apps/web/features/account/content.ts`.
- Updated `AccountApp` tests to cover returning-owner dashboard copy, demo/preview state, disabled unavailable dashboard actions, Polish/English switching, first-run onboarding preservation, and existing authenticated shell/logout behavior.
- The implementation intentionally added no pet persistence, demo-state persistence, Supabase writes, migrations, API routes, upload/storage/OCR, live reminders, AI calls, real sharing, PDF export, notification delivery, calendar sync, clinic/provider workflow, marketplace, booking, payment, or official passport replacement behavior.
- Evaluated `spec/tasks/home-dashboard-skeleton.md` with `forge-evaluator`. Fresh verdict: Pass. Artifact: `spec/validation/home-dashboard-skeleton-evaluation.md`.
- Authenticated Playwright smoke passed outside the sandbox using seeded local account `akowalska@example.com`; confirmed login flow, returning-owner dashboard content, disabled preview actions, Polish/English switching, first-run onboarding preservation, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- Refreshed this handoff on 2026-06-02 after evaluation. Product/roadmap review still classifies the skeleton-only dashboard work as `Now - MVP Foundation`; live AI, real sharing, persistence, uploads, clinic/provider workflow, booking, payments, marketplace, and official passport replacement behavior remain out of scope without explicit human approval.
- Published draft PR https://github.com/maciejgos/caniello/pull/19 from `codex/home-dashboard-skeleton` to `mvp-implementation`. The branch includes task commit `2707216` plus publish-record handoff update after the PR was opened. The PR is draft only and does not mark the task accepted, approved, merged, released, or complete.
- Roadmap review on 2026-06-04 found `spec/product-context.md`, `spec/roadmap.md`, root `ROADMAP.md`, and the current dashboard skeleton task set still aligned around `Now - MVP Foundation`.
- Roadmap review drift findings on 2026-06-04:
  - `README.md` and `spec/roadmap.md` still summarize non-goals more narrowly than `spec/product-context.md`, especially treatment recommendations, veterinary decision-making, broad clinic or partner workflow ownership, advanced household permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload flows.
  - `spec/tasks/app-section-empty-states.md` remains acceptable as `Now` work only if implemented as inert section placeholders. Its non-goals should be tightened before implementation to explicitly exclude live AI, generated medical guidance, official passport replacement claims, real sharing/export/caregiver permissions, advanced analytics, referral mechanics, duplicate detection, calendar sync, and partner document-upload flows.
  - `spec/tasks/dashboard-skeleton-validation.md` is aligned with `Now`; it should remain validation-only and must not become an implementation or release-approval task.
  - `spec/handoff.md` had stale current branch and dirty-worktree notes from the home-dashboard publish record; this review refreshed them.
- Recommended roadmap/doc updates from the 2026-06-04 review, not approved as product-direction changes: mirror the fuller `spec/product-context.md` non-goal wording in `README.md`, `spec/roadmap.md`, and the pending `app-section-empty-states` task before implementation; keep the next implementation to exactly one pending task file.
- Refined and implemented `spec/tasks/app-section-empty-states.md`.
- Signed-in `/app` navigation now selects local, inert section states for Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings while preserving Home dashboard and first-run onboarding behavior.
- Added `AppSectionEmptyState` as a feature-local component and kept empty-state copy in `apps/web/features/account/content.ts`.
- Empty-state actions are disabled or preview-only and safety copy explicitly avoids saved-record, upload, OCR, reminder, notification, AI, diagnosis, treatment, emergency, sharing-link, PDF, caregiver-permission, account data-rights, clinic, partner, marketplace, booking, payment, and official passport replacement claims.
- Implemented `spec/tasks/pet-profile-foundation.md` on branch `codex/pet-profile-foundation`.
- Added forward migration `infra/supabase/migrations/20260604090000_extend_pet_profile_fields.sql` extending `public.pets` with sex or gender, weight, microchip number, allergies, medication, and important notes while preserving existing household-owned RLS policies.
- Added shared pet profile Zod contracts and response shapes in `packages/contracts`.
- Added `/api/pets/profile` GET/PUT route and feature-local server helper using the existing Supabase route-client cookie pattern.
- Replaced the inert Pets section with an authenticated first-pet profile form and summary surface that reads, saves, and reloads saved pet profile values.
- Evaluated pet profile foundation with `forge-evaluator`. Fresh verdict: Pass with gaps. Artifact: `spec/validation/pet-profile-foundation-evaluation.md`.
- Implemented the evaluator-recommended follow-up: pet profile inputs and textareas are now disabled while the initial profile GET is loading or a save is in flight, preventing quick user input from being overwritten by the load response.
- Added a focused regression test that holds `/api/pets/profile` open and verifies pet profile fields plus the save button stay disabled until the load completes.
- Reran focused Playwright load-lock smoke outside the sandbox; it delayed the initial profile GET, confirmed fields were disabled during the pending load, then confirmed save/reload persistence, fresh mobile visibility, no console/page errors, and zero desktop/mobile horizontal overflow.
- Implemented the remaining two-owner/RLS gap as opt-in live Supabase test `apps/web/features/account/server/pet-profile.rls.test.ts`.
- The live RLS test creates a temporary second owner, proves that owner can manage their own household and pet, proves they cannot read or update Anna/Bruno's pet, proves they cannot insert into Anna's household, verifies Anna/Bruno's pet remains unchanged, and deletes the temporary owner.
- Fresh evaluator verdict after the RLS follow-up: Pass.
- Published draft PR https://github.com/maciejgos/caniello/pull/21 from `codex/pet-profile-foundation` to `mvp-implementation`. The branch includes task commit `663e8ea` plus this publish-record handoff update. The PR is draft only and does not mark the task accepted, approved, merged, released, deployed, or complete.
- Addressed PR review feedback on `codex/pet-profile-foundation`: first-save owner household creation is now atomic at the database boundary. Forward migration `20260605150000_enforce_unique_owner_households.sql` adds `households_owner_user_id_unique` on `public.households(owner_user_id)`, and `findOrCreateOwnerHousehold` recovers from concurrent `23505` unique violations by re-reading the household created by the winning request.
- Added focused regression coverage for the migration constraint and the concurrent first-save fallback path.
- Resolved merge-conflict markers in the pet-profile server helper, pet-profile server tests, and handoff notes.
- Re-evaluated pet profile foundation after conflict cleanup. Initial verdict: `Pass with gaps` because migration readiness needed cleanup.
- Migration-history cleanup resolved the evaluator gap: the forward owner-household uniqueness migration is tracked, the duplicate historical baseline uniqueness edit was removed, and the baseline uniqueness assertion was removed from `packages/db/src/index.test.ts`. Focused contract/db/server tests and `git diff --check` passed after cleanup. Current evaluator verdict: `Pass`.
- Human approved the evaluated pet-profile foundation work on 2026-06-05. This approval does not merge, release, deploy, or move roadmap scope.

## Current Dirty Worktree

- Dirty with uncommitted PR #21 review follow-up work on `codex/pet-profile-foundation`, including migration-history cleanup, updated validation artifact, task notes, and handoff notes. Current dirty files: `infra/supabase/migrations/20260519000100_mvp_foundation.sql`, `packages/db/src/index.test.ts`, `spec/handoff.md`, `spec/tasks/pet-profile-foundation.md`, and `spec/validation/pet-profile-foundation-evaluation.md`.

Previous publish note:

- `git status --short --untracked-files=all` was clean on `codex/authenticated-app-shell-navigation` after the draft PR was opened.

## Validation Status

Current pet profile foundation task:

- PR #21 review follow-up implemented on 2026-06-05: `public.households.owner_user_id` is unique, first household creation refetches after unique-conflict races, pet edits explicitly set `updated_at`, and `birthDate` now rejects impossible calendar dates before Postgres.
- Focused validation passed before local dependency links were disturbed: `pnpm --filter @caniello/contracts test` and `pnpm --filter web test -- pet-profile.test.ts`.
- `pnpm install` and `pnpm install --offline` could not restore the full local dependency tree because the registry returned 403 for `@types/react` and the package was missing from the offline store; later package-manager reruns were therefore blocked by incomplete ignored `node_modules` links.
- `git diff --check` passed after the review follow-up edits.
- Implemented on 2026-06-04 on branch `codex/pet-profile-foundation`.
- Published draft PR https://github.com/maciejgos/caniello/pull/21 to `mvp-implementation` on 2026-06-05.
- Evaluator artifact: `spec/validation/pet-profile-foundation-evaluation.md`.
- Fresh evaluator rerun after the 2026-06-05 two-owner/RLS follow-up: Pass. No remaining task-specific validation gap is recorded.
- Fresh evaluator rerun later on 2026-06-05 confirmed the verdict remains Pass.
- Follow-up validation passed: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts` from `apps/web`; 2 files and 12 tests passed.
- Follow-up validation passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- Follow-up validation passed: `pnpm --filter web test`; 9 files and 51 tests passed, with existing localStorage experimental warnings.
- Follow-up validation passed outside sandbox after sandbox fetch failures: `pnpm --filter web lint` and `pnpm build`.
- Local Supabase was started with `./scripts/start.sh`; startup applied `20260604090000_extend_pet_profile_fields.sql` to the local database.
- Fresh focused Playwright load-lock smoke passed outside the sandbox; it delayed the initial profile GET, confirmed fields were disabled while loading, saved pet profile `Bruno Eval Fresh 1780593954304`, verified reload persistence, verified fresh mobile visibility, checked no console/page errors, and confirmed zero desktop/mobile horizontal overflow.
- Live two-owner/RLS integration test passed outside the sandbox after sandbox localhost access failure: `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/pet-profile.rls.test.ts` from `apps/web`; 1 file and 1 test passed.
- Default focused test path passed with the opt-in RLS test skipped: `./node_modules/.bin/vitest run AccountApp.test.tsx pet-profile.test.ts pet-profile.rls.test.ts` from `apps/web`; 2 files and 12 tests passed, 1 opt-in RLS test skipped.
- Default web test suite passed with the opt-in RLS test skipped: `pnpm --filter web test`; 9 files and 51 tests passed, 1 opt-in RLS test skipped.
- Fresh later 2026-06-05 evaluator rerun passed focused pet profile tests, contract/db tests, web TypeScript check, full web test suite, opt-in live RLS test outside the sandbox, web lint outside the sandbox after sandbox fetch failure, production build outside the sandbox after sandbox fetch failure, and `git diff --check`.
- PR review fix validation on 2026-06-05 passed: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts`; 2 files and 16 tests passed.
- PR review fix validation on 2026-06-05 passed: `pnpm --filter web test`; 9 files passed and 1 opt-in RLS file skipped, 52 tests passed and 1 skipped, with existing Vitest localStorage experimental warnings.
- PR review fix validation on 2026-06-05 passed: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`.
- PR review fix validation on 2026-06-05 passed: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`.
- PR review fix validation on 2026-06-05 passed: `git diff --check`.
- Conflict-resolution evaluator rerun on 2026-06-05 passed: no merge-conflict markers found; `git diff --check`; focused contract/db/server tests with 3 files and 30 tests passed; `pnpm --filter web test` with 9 files passed, 1 opt-in RLS file skipped, 53 tests passed, and 1 skipped; contracts/db TypeScript checks; `pnpm --filter web lint` outside sandbox after sandbox fetch failure; `pnpm build` outside sandbox after sandbox fetch failure; opt-in live Supabase RLS test outside sandbox after sandbox localhost denial.
- Migration-history cleanup validation on 2026-06-05 passed: `./node_modules/.bin/vitest run apps/web/features/account/server/pet-profile.test.ts packages/db/src/index.test.ts packages/contracts/src/index.test.ts`; 3 files and 30 tests passed.
- Migration-history cleanup validation on 2026-06-05 passed: `git diff --check`.
- Fresh final evaluator rerun after migration cleanup on 2026-06-05 confirms verdict `Pass`: no conflict markers, `git diff --check`, focused contract/db/server tests, full web tests, contracts/db TypeScript checks, web lint outside sandbox after sandbox fetch failure, production build outside sandbox after sandbox fetch failure, and opt-in live Supabase RLS test outside sandbox after sandbox localhost denial all passed.
- Human approval recorded on 2026-06-05 after the final evaluator verdict `Pass`.

Current home dashboard skeleton task:

- Fresh evaluation on 2026-06-02: `spec/validation/home-dashboard-skeleton-evaluation.md` records evaluator verdict Pass.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; escalated rerun passed.
- `git diff --check` passed.
- Attempted local Supabase startup with `./scripts/start.sh`; it failed because Docker Desktop was not reachable. Requested and ran `open -a Docker`, waited, and retried `./scripts/start.sh`; Docker remained unreachable.
- Evaluator-run `docker ps` showed local Supabase containers were already running.
- Evaluator-run authenticated Playwright smoke initially failed in the sandbox because Chromium could not launch due to macOS permission errors; escalated rerun with stricter selectors passed.
- Evaluator-run authenticated Playwright smoke confirmed unauthenticated `/app` redirects to `/login`, seeded local login returns to `/app`, Polish returning-owner dashboard title `Co dziś u Bruno?` renders, demo/preview state renders, document/Ask/sharing preview actions are disabled, English dashboard copy renders after switching language, first-run onboarding remains reachable, returning dashboard can be restored, no console errors occurred, and horizontal overflow was 0 at 1440x1000 and 390x900.
- Evaluator screenshots were captured outside the repo at `/private/tmp/caniello-home-dashboard-desktop.png` and `/private/tmp/caniello-home-dashboard-mobile.png`.

Current app section empty states task:

- Implemented on 2026-06-04 on branch `codex/app-section-empty-states`.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 9 tests passed, with the existing localStorage experimental warning.
- Sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- `pnpm --filter web test` passed; 8 test files and 45 tests passed, with existing localStorage experimental warnings.
- Sandboxed `pnpm build` failed with `[ERROR] fetch failed`; escalated rerun passed.
- Browser validation through the Node browser tool failed because Chromium could not launch under macOS sandbox permissions.
- Focused authenticated Playwright smoke initially failed because local Supabase was unreachable. Docker Desktop was launched, `./scripts/start.sh` passed, and the smoke was rerun outside the sandbox.
- Focused authenticated Playwright smoke passed on desktop Chromium and mobile Chromium using seeded local account `akowalska@example.com`; confirmed login, section selection, disabled unavailable actions, Polish/English safety copy, Home navigation, no console errors, and no horizontal overflow.
- The temporary Playwright smoke spec used for manual validation was removed after the run.
- Evaluated `spec/tasks/app-section-empty-states.md` with `forge-evaluator`. Fresh verdict: Pass. Artifact: `spec/validation/app-section-empty-states-evaluation.md`.
- Evaluator reran focused account tests, TypeScript lint, full web tests, production build, and focused authenticated Playwright smokes on desktop and mobile Chromium.
- Published draft PR https://github.com/maciejgos/caniello/pull/20 from `codex/app-section-empty-states` to `mvp-implementation`. The branch includes task commit `09e357b`. The PR is draft only and does not mark the task accepted, approved, merged, released, or complete.
- Human approved `spec/tasks/app-section-empty-states.md` on 2026-06-04. This approval does not merge, release, deploy, or move roadmap scope.

Current first-run onboarding task:

- Fresh evaluation on 2026-05-24: `spec/validation/first-run-onboarding-skeleton-evaluation.md` records evaluator verdict Pass.
- Evaluator-run `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Evaluator-run `pnpm --filter web lint` first failed in the sandbox with `[ERROR] fetch failed`; escalated rerun passed.
- Evaluator-run `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Evaluator-run `git diff --check` passed.
- Evaluator-run Playwright smoke passed outside the sandbox after local Supabase was started with `./scripts/start.sh`; confirmed `/app`, title `Witaj w Caniello`, visible searchbox, active Home nav, disabled `Dodaj Bruno`, disabled first-document upload, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- The local Next.js dev server started for validation was stopped after the Playwright check.
- Mockup-fidelity follow-up `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Mockup-fidelity follow-up `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- Mockup-fidelity follow-up `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Mockup-fidelity follow-up `pnpm build` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`; Turbo emitted existing no-output-files warnings for TypeScript-only package build tasks.
- Mockup-fidelity follow-up Playwright smoke passed outside the sandbox using seeded local account `akowalska@example.com` and password `CanielloDemo123!`; confirmed `/app`, title `Witaj w Caniello`, disabled `Dodaj Bruno` and document upload actions, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- Mockup-fidelity screenshots were captured outside the repo at `/private/tmp/caniello-first-run-mockup-desktop.png` and `/private/tmp/caniello-first-run-mockup-mobile.png`.
- Forge refactor pass selected one safe ADR 0011 gap: `FirstRunOnboarding.tsx` mixed onboarding screen structure with a large SVG icon renderer. Extracted icons to `OnboardingIcon.tsx`; behavior and UI output are intended to be unchanged.
- Refactor validation: `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Refactor validation: sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- Refactor validation: `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Component-boundary refactor pass split the authenticated shell, topbar/search/account controls, sidebar/menu, dashboard header, onboarding stepper, pet panel, document panel, tip, fields, and app/onboarding icons into separate feature-local components under `apps/web/features/account/components/`.
- Component-boundary validation: `pnpm --filter web test -- AccountApp.test.tsx` passed; 1 test file and 8 tests passed, with the existing localStorage experimental warning.
- Component-boundary validation: sandboxed `pnpm --filter web lint` failed with `[ERROR] fetch failed`; escalated rerun passed.
- Component-boundary validation: `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- Component-boundary validation: `git diff --check` passed.
- Component-boundary Playwright smoke passed outside the sandbox using seeded local account `akowalska@example.com` and password `CanielloDemo123!`; confirmed `/app`, title `Witaj w Caniello`, visible searchbox, active Home nav, disabled `Dodaj Bruno`, no console errors, and no horizontal overflow at 1440px desktop and 390px mobile widths.
- Forge refactor skill creation: Ruby YAML frontmatter sanity check passed for `.codex/skills/forge-refactor/SKILL.md`; `quick_validate.py .codex/skills/forge-refactor` could not run because the host Python lacks the `yaml` module.
- Post-implementation workflow correction: no product tests were run for the implementer-skill and ADR text changes; `git diff --check` passed after the documentation updates.
- `pnpm install` passed outside the sandbox after the first focused test failed because dependencies were missing and the sandboxed install failed with `[ERROR] fetch failed`.
- `pnpm --filter web test -- AccountApp.test.tsx` passed; Vitest emitted the existing localStorage experimental warning.
- `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web test` passed; 8 test files and 44 tests passed, with existing localStorage experimental warnings.
- `git diff --check` passed.
- Local Supabase was started with `./scripts/start.sh` outside the sandbox so the seeded demo account could authenticate for browser validation.
- Started web app on `http://localhost:3000` after syncing local Supabase env values.
- Playwright fallback validation passed outside the sandbox and confirmed login with seeded local account `akowalska@example.com`, `/app` onboarding title, accessible add-pet field, disabled upload action, safe medical-boundary copy, and no horizontal document overflow at 1440px desktop and 390px mobile widths.
- Temporary UI screenshots were captured outside the repo at `/private/tmp/caniello-first-run-desktop.png` and `/private/tmp/caniello-first-run-mobile.png`.

Previous task validation for `spec/tasks/authenticated-app-shell-navigation.md`:

- `pnpm --filter web test -- AccountApp.test.tsx` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web lint` passed outside the sandbox after the sandboxed command failed with `[ERROR] fetch failed`.
- `pnpm --filter web test` passed outside the sandbox; Vitest emitted existing localStorage experimental warnings.
- Browser validation used Playwright fallback because the in-app browser reported `Browser is not available: iab`.
- Started web app on `http://localhost:3001` because port 3000 was already in use.
- Playwright validation with seeded local account `akowalska@example.com` confirmed unauthenticated `/app` redirects to `/login?next=%2Fapp`, login returns to `/app`, Home has `aria-current="page"`, shell labels and top-bar affordances render, and desktop/mobile viewports have no horizontal document overflow.
- Temporary UI screenshots were captured outside the repo at `/private/tmp/caniello-app-shell-desktop.png` and `/private/tmp/caniello-app-shell-mobile.png`.

Previous repository validation notes still relevant to the dirty worktree:

- `find spec -maxdepth 3 -type f | sort` completed and showed the flattened active workspace plus archived history.
- Confirmed no top-level `docs/` directory exists.
- `find spec/archive/flow-forge-history -maxdepth 3 -type f | sort` completed and showed archived requirements, stories, detailed features, old plans, release-readiness records, and lifecycle records.
- `rg "spec/(requirements|stories|release-readiness|lifecycle)" README.md AGENTS.md ROADMAP.md spec/README.md .codex/skills` returned no matches.
- `git diff --check` passed.
- `pnpm install` was run outside the sandbox because dependencies were missing and validation needed `turbo`.
- `pnpm lint` passed outside the sandbox after sandboxed attempts failed with `[ERROR] fetch failed`.
- `pnpm test` passed outside the sandbox after sandboxed attempts failed with `[ERROR] fetch failed`.
- `git diff --check` passed after adding `forge-publisher`.
- Ruby `Psych.safe_load` frontmatter sanity check passed for `.codex/skills/forge-publisher/SKILL.md`.
- Ruby `Psych.safe_load` metadata sanity check passed for every `.codex/skills/forge-*/agents/openai.yaml` file, including `$skill-name` default prompt references.
- `quick_validate.py .codex/skills/forge-publisher` could not run because the host Python lacks the `yaml` module.

## Known Gaps

- Home dashboard mode switching is intentionally local React state only. It is demo-only and not persisted.
- Dashboard and section CTA buttons for unimplemented document, Ask Caniello, sharing, reminders, pets, timeline, and settings behavior are intentionally disabled or preview-only until real feature tasks are approved and implemented.
- The app shell task intentionally does not add dashboard cards, onboarding, persistence, live search, notifications, AI, sharing behavior, section routes, or mobile app work.
- Roadmap-sensitive future dashboard tasks expose Ask Caniello and sharing only as skeleton/navigation surfaces. Keep them inert and safety-worded until a human-approved task explicitly includes AI behavior, share links, caregiver access, or export behavior.
- `pnpm test` emitted existing Vitest localStorage experimental warnings and Turbo output warnings; tests still passed.
- `node_modules/` was installed locally for validation and should remain ignored.
- Official skill quick validation is pending until `PyYAML` is available.
- No `pnpm build` or full `pnpm test:e2e` run was recorded for the app-shell task.
- No full `pnpm test:e2e` run was recorded for the first-run onboarding task; validation used focused account tests, full web Vitest, TypeScript lint, a prior production build, and targeted authenticated Playwright smoke checks. The earlier evaluator browser gap was resolved by starting local Supabase and using the seed password from `infra/supabase/seed.sql`.

## Next Recommended Action

- Publish the approved PR #21 follow-up: inspect the final diff, stage only intentional files, commit, push `codex/pet-profile-foundation`, and ensure draft PR https://github.com/maciejgos/caniello/pull/21 reflects the latest commit.
- Optional maintainer action: merge draft PR https://github.com/maciejgos/caniello/pull/20 when ready.
- Human review of draft PR https://github.com/maciejgos/caniello/pull/19 remains pending.
- Optional editorial follow-up after evaluation: tighten non-goal wording in `README.md` and `spec/roadmap.md` so they mirror `spec/product-context.md`.
