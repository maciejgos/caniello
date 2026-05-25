# Caniello Handoff

## Current State

- Active task: None. Last completed product task: `spec/tasks/first-run-onboarding-skeleton.md`.
- Active branch: `codex/first-run-onboarding-skeleton`.
- Current workflow: first-run onboarding skeleton implementation, refactor, validation artifact, and handoff notes are prepared on a dirty branch; pending human review, optional `pnpm test:e2e`, or optional publish.

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

## Current Dirty Worktree

- `apps/web/features/account/AccountApp.tsx`
- `apps/web/features/account/AccountApp.test.tsx`
- `apps/web/features/account/content.ts`
- `apps/web/features/account/components/AppHomeDashboard.tsx`
- `apps/web/features/account/components/AppIcon.tsx`
- `apps/web/features/account/components/AppSidebar.tsx`
- `apps/web/features/account/components/AppTopBar.tsx`
- `apps/web/features/account/components/AuthenticatedAppShell.tsx`
- `apps/web/features/account/components/CanielloTip.tsx`
- `apps/web/features/account/components/DocumentSetupPanel.tsx`
- `apps/web/features/account/components/FirstRunOnboarding.tsx`
- `apps/web/features/account/components/OnboardingField.tsx`
- `apps/web/features/account/components/OnboardingIcon.tsx`
- `apps/web/features/account/components/PetSetupPanel.tsx`
- `apps/web/features/account/components/SetupStepper.tsx`
- `spec/tasks/first-run-onboarding-skeleton.md`
- `spec/validation/first-run-onboarding-skeleton-evaluation.md`
- `spec/handoff.md`

Dirty worktree note: current dirty files belong to the first-run onboarding implementation, feature-local component split, evaluator artifact, task verification notes, and this handoff refresh.

Previous publish note:

- `git status --short --untracked-files=all` was clean on `codex/authenticated-app-shell-navigation` after the draft PR was opened.

## Validation Status

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

- The app shell task intentionally does not add dashboard cards, onboarding, persistence, live search, notifications, AI, sharing behavior, section routes, or mobile app work.
- Roadmap-sensitive future dashboard tasks expose Ask Caniello and sharing only as skeleton/navigation surfaces. Keep them inert and safety-worded until a human-approved task explicitly includes AI behavior, share links, caregiver access, or export behavior.
- `pnpm test` emitted existing Vitest localStorage experimental warnings and Turbo output warnings; tests still passed.
- `node_modules/` was installed locally for validation and should remain ignored.
- Official skill quick validation is pending until `PyYAML` is available.
- No `pnpm build` or full `pnpm test:e2e` run was recorded for the app-shell task.
- No full `pnpm test:e2e` run was recorded for the first-run onboarding task; validation used focused account tests, full web Vitest, TypeScript lint, a prior production build, and targeted authenticated Playwright smoke checks. The earlier evaluator browser gap was resolved by starting local Supabase and using the seed password from `infra/supabase/seed.sql`.

## Next Recommended Action

- Optional: run full `pnpm test:e2e` if broader route-level confidence is desired before publish.
- Optional: use `forge-publisher` after human review if the first-run onboarding skeleton scope is accepted.
- Optional follow-up product task: `spec/tasks/home-dashboard-skeleton.md`, after the first-run skeleton is accepted.
