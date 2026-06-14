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
- Decide whether visible Google and Apple sign-in buttons should be implemented for local validation or hidden/disabled with clear unavailable state.
- Ensure login/signup copy does not advertise working OAuth if provider configuration is absent.
- Add focused tests or browser checks for new-owner signup/login and unavailable OAuth affordances.
- Match the relevant auth mockups in `spec/design/visual-artifacts/mvp/` 1:1 for visible layout, labels, controls, and unavailable states, unless a deviation is explicitly recorded and approved.

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

- [ ] Focused auth tests.
- [ ] Browser validation for new-owner signup/login.
- [ ] Browser validation that unavailable OAuth actions are not misleading.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
