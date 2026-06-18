# Validation: New-owner access validation

## Status

Accepted

## Scope

Evaluate `spec/tasks/new-owner-access-validation.md`: a brand-new local owner can sign up and reach the protected app through the supported email/password path, while Google and Apple auth affordances no longer imply unavailable OAuth works.

## Source Artifacts

- `spec/tasks/new-owner-access-validation.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `DESIGN.md`
- `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`
- `spec/architecture-records/0023-use-config-toml-for-local-supabase-auth-providers.md`
- `spec/architecture-records/0032-use-email-first-owner-auth-and-defer-oauth-rollout.md`
- `README.md`
- `apps/web/features/account/AccountApp.tsx`
- `apps/web/features/account/content.ts`
- `apps/web/features/account/server/auth.ts`
- `apps/web/features/account/server/supabase-auth-gateway.ts`
- `apps/web/features/account/AccountApp.test.tsx`
- `apps/web/features/account/server/auth.test.ts`
- `tests/e2e/account.spec.ts`
- `tests/e2e/new-owner-live.spec.ts`

## Preconditions

- Local Supabase was started with `./scripts/start.sh`.
- The Next.js dev server was running with `pnpm --filter web dev`.
- Supabase Auth settings at `http://127.0.0.1:55321/auth/v1/settings` reported `mailer_autoconfirm: true`.
- Local Mailpit was reachable at `http://127.0.0.1:54324`; no confirmation email is expected while local autoconfirm remains enabled.

## Execution Mode And Evaluator Layers

- Execution mode: Normal implementation with security-sensitive auth validation.
- Evaluator layers used: roadmap scope review, task acceptance criteria mapping, auth API behavior, UI behavior, browser validation, local Supabase behavior, documentation review, and formatting/build gates.

## Required Gates And Ratchets

- Focused auth tests: Passed.
- Full web test suite: Passed.
- TypeScript/lint: Passed outside sandbox after sandbox `fetch failed`.
- Browser account route checks: Passed outside sandbox after sandbox `fetch failed`.
- Live local new-owner E2E: Passed outside sandbox with local Supabase and Mailpit running.
- Build: Passed outside sandbox after sandbox `fetch failed`.
- Formatting and whitespace: Passed.
- Spec alignment gate: Passed outside sandbox after sandbox `fetch failed`.
- Product scope ratchet: Preserved. No OAuth rollout, provider config, provider secrets, account linking, paid auth, release, deployment, or roadmap movement was added.
- Design ratchet: Preserved. Auth surfaces keep the split mockup structure; visible deviation is limited to disabled OAuth state copy required by ADR 0032.

## Acceptance Criteria Mapping

- Criterion: A new local owner can complete signup and login in a documented validation path.
  Evidence status: Supported
  Evidence: `tests/e2e/new-owner-live.spec.ts` passed with `CANIELLO_RUN_LIVE_AUTH_E2E=1` on desktop and mobile Chromium. The test creates a unique local owner, verifies disabled OAuth buttons, submits signup, reads local Auth settings, and reaches `/app` when `mailer_autoconfirm` is true. README documents this local path and the future Inbucket confirmation path if email confirmation is enabled.

- Criterion: Google and Apple buttons no longer silently fail or imply unavailable behavior works.
  Evidence status: Supported
  Evidence: `AccountApp.tsx` renders Google and Apple buttons as disabled, with accessible labels that include unavailable-state text. `AccountApp.test.tsx`, `tests/e2e/account.spec.ts`, and `tests/e2e/new-owner-live.spec.ts` assert the disabled state and visible Polish/English unavailable copy.

- Criterion: Login/signup screens match supplied MVP auth mockups 1:1 for visible UI, or approved deviations are documented.
  Evidence status: Supported
  Evidence: The existing split auth shell, hero image, feature tiles, form layout, and social button positions are preserved. The intentional visible deviation is the disabled social-login explanation, required by ADR 0032 so the UI does not advertise unavailable provider behavior.

- Criterion: Tests or browser evidence cover the chosen new-owner path.
  Evidence status: Supported
  Evidence: Live local browser validation passed for desktop and mobile Chromium. Mocked account browser checks still cover the confirmation-required branch.

- Criterion: The validation artifact or handoff records any remaining production-auth caveats.
  Evidence status: Supported
  Evidence: This artifact, the task handoff notes, and `README.md` state that production OAuth rollout, provider secrets, account linking, and production auth configuration remain out of scope.

- Criterion: No production OAuth provider configuration, provider secrets, account linking, paid auth work, release, deployment, or roadmap movement is introduced.
  Evidence status: Supported
  Evidence: Diff review found no provider configuration blocks, secrets, release/deployment changes, or roadmap phase changes. ADR 0032 email-first auth is preserved.

## Checks

- Check: Focused account component tests
  Type: Automated
  Status: Passed
  Expected result: Signup/login UI validates fields, handles verification-required and autoconfirmed signup states, redirects authenticated signup/login to `/app`, and disables unavailable social auth controls.
  Actual result: `pnpm --filter web test -- AccountApp.test.tsx` passed 17 tests.

- Check: Focused account server auth tests
  Type: Automated
  Status: Passed
  Expected result: Signup rejects invalid payloads, returns `verification_required` when Supabase requires email confirmation, and returns `authenticated` when local autoconfirm provides an authenticated signup.
  Actual result: `pnpm --filter web test -- features/account/server/auth.test.ts` passed 6 tests.

- Check: Full web Vitest suite
  Type: Automated
  Status: Passed
  Expected result: Existing authenticated app, API, and feature behavior does not regress.
  Actual result: `pnpm --filter web test` passed 20 files with 110 tests passed and 5 opt-in files skipped.

- Check: Web TypeScript validation
  Type: Automated
  Status: Passed
  Expected result: Account auth changes compile under the web TypeScript config.
  Actual result: `pnpm --filter web lint` passed outside the sandbox after the sandbox run failed with `fetch failed`.

- Check: Account route browser checks
  Type: UI
  Status: Passed
  Expected result: Signup/login routes remain Polish-first, switchable to English, preserve mockup shell behavior, show disabled OAuth state, and cover mocked email-verification guidance.
  Actual result: `pnpm --filter web test:e2e -- account.spec.ts` passed 6 tests on desktop and mobile Chromium outside the sandbox after the sandbox run failed with `fetch failed`.

- Check: Live local new-owner browser validation
  Type: UI / Behavior
  Status: Passed
  Expected result: A unique new owner can sign up through the real local app and reach the protected app using the current local Supabase auth settings.
  Actual result: `CANIELLO_RUN_LIVE_AUTH_E2E=1 pnpm --filter web test:e2e -- new-owner-live.spec.ts` passed 2 tests on desktop and mobile Chromium with local Supabase and Mailpit running.

- Check: Production build
  Type: Automated
  Status: Passed
  Expected result: Production build succeeds with account auth changes.
  Actual result: `pnpm build` passed outside the sandbox after the sandbox run failed with `fetch failed`.

- Check: Formatting and whitespace
  Type: Automated
  Status: Passed
  Expected result: Changed files use the repository formatting and contain no whitespace errors.
  Actual result: `pnpm format:check` passed outside the sandbox after the sandbox run failed with `fetch failed`; `git diff --check` passed.

- Check: Spec alignment gate
  Type: Automated
  Status: Passed
  Expected result: Implementation-bearing changes include scoped task and validation evidence.
  Actual result: `pnpm validation:spec-alignment` passed outside the sandbox after the sandbox run failed with `fetch failed`; the gate reported 8 project-affecting files, 1 task artifact, and 1 validation artifact.

## Evidence

- Local Supabase Auth settings returned `mailer_autoconfirm: true`, `external.google: false`, and `external.apple: false`.
- Initial live E2E failed because the test expected a Mailpit confirmation email, but the local stack autoconfirmed signup and sent no message. The implementation and live test were corrected to respect the actual Auth settings.
- The live validation created unique `codex-new-owner-*@example.com` local users through the browser path and reached `/app`.

## Findings

- None blocking.

## Missing, Skipped, Or Unavailable Checks

- Check: Production OAuth provider validation
  Reason: Explicitly out of scope. ADR 0032 defers Google and Apple rollout.
  Risk: Low for this task because the UI now disables those actions and documents email/password as the supported MVP validation path.

- Check: Real Mailpit confirmation branch
  Reason: Current local Supabase settings use `mailer_autoconfirm: true`, so no confirmation email is sent. The live test includes the Mailpit branch for future local configurations where confirmation is enabled.
  Risk: Low. The existing mocked account E2E still covers verification-required UI guidance.

## Future CI/CD Or Lifecycle Gates

- Gate: Live local auth smoke
  Trigger: Before MVP readiness passes or PRs touching account signup/login behavior.
  Blocks: Readiness evidence when `CANIELLO_RUN_LIVE_AUTH_E2E=1 pnpm --filter web test:e2e -- new-owner-live.spec.ts` fails against local Supabase.

- Gate: Social-auth availability assertions
  Trigger: PRs touching account UI or auth provider configuration.
  Blocks: Merge when Google or Apple controls imply working OAuth without provider configuration and browser evidence.

## Result

Pass. The task acceptance criteria are satisfied and validation evidence is adequate.

## Follow-Up

- Human review should confirm the visible disabled OAuth copy is acceptable as the intentional mockup deviation required by ADR 0032.
- Production OAuth rollout remains a separate future task requiring provider setup, secret handling, callback review, and account-linking decisions.

## Human Decision

Accepted by the human on 2026-06-18. Acceptance applies to the evaluated task and validation evidence only. It does not approve merge, release, deployment, production readiness, OAuth rollout, provider setup, or roadmap movement.
