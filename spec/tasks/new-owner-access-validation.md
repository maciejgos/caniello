# Task: New-owner access validation

## Goal

Make local MVP validation possible for a brand-new owner account without relying only on the seeded Anna/Bruno account.

## Roadmap Alignment

Phase: Now

Why this belongs here:

New-owner access is required for the MVP activation path. The task supports onboarding, account reliability, consent, and validation without expanding into paid auth, marketplace, or provider workflows.

Related roadmap item:

`spec/roadmap.md` - Now / owner account, privacy, consent, and language behavior are reliable enough for MVP validation.

## Scope

- Confirm the local signup flow can complete in development through Mailpit/Inbucket, Supabase local auth configuration, or a documented validation-account confirmation bypass.
- Keep email/password as the MVP validation path and make visible Google and Apple sign-in buttons disabled with clear unavailable-state copy.
- Ensure login/signup copy does not advertise working OAuth if provider configuration is absent.
- Document the local new-owner validation path, including where to confirm the signup email in the local Supabase Inbucket.
- Add focused tests or browser checks for new-owner signup/login and unavailable OAuth affordances.
- Match `spec/design/visual-artifacts/mvp/sign-up.png` and `spec/design/visual-artifacts/mvp/sign-in.png` 1:1 for visible layout, labels, controls, and unavailable states, unless a deviation is explicitly recorded and approved.

## Non-Goals

- Production OAuth rollout.
- Paid auth provider work, SSO, passkeys, MFA, or account linking.
- Email marketing automation.
- Release, deployment, or production auth configuration.

## Acceptance Criteria

- A new local owner can complete signup and login in a documented validation path.
- Google and Apple buttons no longer silently fail or imply unavailable behavior works.
- Login/signup screens match the supplied MVP auth mockups 1:1 for visible UI, or approved deviations are documented.
- Tests or browser evidence cover the chosen new-owner path.
- The validation artifact or handoff records any remaining production-auth caveats.
- No production OAuth provider configuration, provider secrets, account linking, paid auth work, release, deployment, or roadmap movement is introduced.

## Implementation Notes

- Relevant areas likely include `apps/web/features/account/`, auth routes, local Supabase config under `infra/supabase/`, and setup scripts or docs.
- Preserve Polish-first localization and existing medical/privacy boundaries.
- Follow accepted ADR `0032-use-email-first-owner-auth-and-defer-oauth-rollout.md`: email/password is the MVP validation path, and OAuth buttons must not imply working provider support before rollout.
- Check draft ADR `0023-use-config-toml-for-local-supabase-auth-providers.md` before changing local auth provider configuration.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`, `spec/architecture-records/0032-use-email-first-owner-auth-and-defer-oauth-rollout.md`.
- Draft boundary to check before local provider config changes: `spec/architecture-records/0023-use-config-toml-for-local-supabase-auth-providers.md`.
- New ADR needed: No for hiding/disabling unavailable buttons or documenting local email confirmation; yes if changing auth provider strategy.
- ADR draft: None.
- Approval state: ADR 0032 accepted by human on 2026-06-14; provider strategy changes still need explicit architecture approval.

## Verification

- [x] Focused auth tests.
- [x] Browser validation for new-owner signup/login.
- [x] Browser validation that unavailable OAuth actions are not misleading.
- [x] Local validation path documented.
- [x] No roadmap scope expansion.
- [x] Handoff updated.

## Handoff Notes

Implemented on branch `codex/new-owner-access-validation`.

Changed the signup auth boundary so Supabase autoconfirmed local signups return `authenticated` instead of always showing email-verification guidance. The signup form redirects authenticated signup responses into `/app`; verification-required responses still show the existing email guidance. Google and Apple auth buttons remain visible for mockup alignment, but they are disabled with visible Polish/English unavailable-state copy and accessible labels. README now documents the local new-owner validation path and notes that the current local Supabase settings report `mailer_autoconfirm: true`; Inbucket confirmation is documented as the future path if local email confirmation is enabled.

Validation passed: focused `AccountApp.test.tsx`; focused account server auth tests; full `pnpm --filter web test`; `pnpm --filter web lint` outside sandbox after sandbox `fetch failed`; `pnpm --filter web test:e2e -- account.spec.ts` outside sandbox after sandbox `fetch failed`; opt-in live local new-owner E2E `CANIELLO_RUN_LIVE_AUTH_E2E=1 pnpm --filter web test:e2e -- new-owner-live.spec.ts` outside sandbox with local Supabase and Mailpit running; `pnpm build` outside sandbox after sandbox `fetch failed`; `pnpm format:check` outside sandbox after sandbox `fetch failed`; `pnpm validation:spec-alignment` outside sandbox after sandbox `fetch failed`; `git diff --check`. Initial live E2E failed because local Supabase autoconfirmed signups and did not send Mailpit confirmation email; implementation and test were corrected to respect `/auth/v1/settings`.

Validation artifact: `spec/validation/new-owner-access-validation-evaluation.md`.

No production OAuth rollout, provider secrets, account linking, email marketing automation, release, deployment, merge, production-readiness state, or roadmap movement is included or approved.

## Human Decision

Accepted on 2026-06-18. Acceptance applies to this task and its validation evidence only. It does not approve merge, release, deployment, production readiness, OAuth rollout, provider setup, or roadmap movement.
