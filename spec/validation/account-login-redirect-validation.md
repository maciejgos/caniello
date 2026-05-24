# Validation: Account Login Redirect

## Status

Draft

## Scope

Validate that a successful owner login redirects directly to the protected owner panel instead of leaving the user on an intermediate account success card.

## Source Artifacts

- [Owner Account Privacy Foundation ExecPlan](../plans/owner-account-privacy-foundation.md)
- [Owner Account Privacy Foundation feature](../features/owner-account-privacy-foundation.md)
- [Supabase Auth ADR](../architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md)
- [Account app implementation](../../apps/web/features/account/AccountApp.tsx)
- [Account app tests](../../apps/web/features/account/AccountApp.test.tsx)

## Preconditions

- Account login API returns an OK response after Supabase Auth accepts credentials.
- Protected owner app remains available at `/app`.
- Existing protected-route proxy sends unauthenticated users to `/login?next=/app`.

## Acceptance Criteria Mapping

- Criterion: Successful login should land the owner in the protected panel.
  Evidence status: Supported
  Evidence: `AccountApp` now calls `window.location.assign()` on an OK login response and uses the sanitized `next` path when present, defaulting to `/app`.

- Criterion: The login success state should not render an intermediate panel-selection card.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx` asserts no status card is rendered after successful login and that navigation is invoked.

- Criterion: Existing protected-route redirect behavior remains compatible.
  Evidence status: Supported
  Evidence: The redirect helper accepts a local `next=/app` path and rejects empty or protocol-relative values.

## Checks

- Check: Focused account component test
  Type: Automated
  Status: Passed
  Expected result: Login form redirects to `/app` after a successful API response.
  Actual result: `pnpm --filter web test -- AccountApp.test.tsx` passed with 7 tests.

- Check: Web TypeScript lint/typecheck
  Type: Automated
  Status: Passed
  Expected result: Account redirect implementation typechecks.
  Actual result: `pnpm --filter web lint` passed.

## Evidence

- `pnpm --filter web test -- AccountApp.test.tsx`: 1 test file passed, 7 tests passed.
- `pnpm --filter web lint`: TypeScript check completed successfully.

## Missing, Skipped, or Unavailable Checks

- Check: Browser E2E login against real local Supabase credentials.
  Reason: No stable test account and credential fixture were introduced for this change.
  Risk: Unit evidence covers redirect behavior; a future E2E should confirm Supabase cookies plus navigation work together in a browser.

## Future CI/CD or Lifecycle Gates

- Gate: Auth login E2E with seeded local Supabase user
  Trigger: Account-route Playwright suite
  Blocks: Regressions where login succeeds but the browser remains on `/login` or cannot access `/app`.

## Result

Ready for human review

## Follow-Up

- Add a seeded-login Playwright flow once the local auth fixture strategy is settled.

## Human Decision

Pending
