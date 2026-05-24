# Caniello Handoff

## Current State

- Active task: None. Last completed product task: `spec/tasks/authenticated-app-shell-navigation.md`.
- Active branch: `codex/evaluator-validation-artifact`.
- Current workflow: updating the active `forge-evaluator` skill so every evaluation leaves a durable validation artifact in `spec/validation/`.

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

## Changed Files

- `.codex/skills/forge-evaluator/SKILL.md`
- `spec/handoff.md`

Previous publish note:

- `git status --short --untracked-files=all` was clean on `codex/authenticated-app-shell-navigation` after the draft PR was opened.

## Validation Status

Current workflow-harness update:

- Reviewed the evaluator skill diff and existing `spec/validation/TEMPLATE.md`.
- No product tests were run because the change only updates local skill instructions and handoff notes.

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

## Next Recommended Action

- Review draft PR https://github.com/maciejgos/caniello/pull/13. It remains draft and needs human review before any ready-for-review, merge, release, or deployment action.
- Next product task after this shell work: `spec/tasks/first-run-onboarding-skeleton.md`, because it builds on the new authenticated frame without adding dashboard cards or persistence.
