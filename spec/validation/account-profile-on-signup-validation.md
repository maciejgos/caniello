# Validation: Account Profile on Signup

## Status

Draft

## Scope

Validate that Supabase Auth signup now creates a matching `public.account_profiles` row for app-level profile data, including `display_name` and preferred account language when metadata is available.

## Source Artifacts

- `spec/features/owner-account-privacy-foundation.md`
- `spec/stories/account-signup-login-and-session.md`
- `infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql`
- `infra/supabase/migrations/20260523093000_create_account_profile_on_auth_signup.sql`
- `packages/contracts/src/index.ts`
- `apps/web/features/account/AccountApp.tsx`
- `apps/web/features/account/server/supabase-auth-gateway.ts`

## Preconditions

- Local Supabase is running.
- `auth.users` and `public.account_profiles` tables exist from prior migrations.
- The web app has Supabase URL and anon key configuration.

## Acceptance Criteria Mapping

- Criterion: New auth users receive a corresponding app profile row.
  Evidence status: Supported
  Evidence: The new migration creates `public.create_account_profile_for_auth_user()` and an `after insert on auth.users` trigger that inserts into `public.account_profiles`.

- Criterion: Existing auth users without profiles are backfilled.
  Evidence status: Supported
  Evidence: The migration includes an `insert ... select` backfill where `account_profiles.id is null`; local application inserted one backfilled row for `t.tester@example.com`.

- Criterion: Signup display name is persisted to app profile data.
  Evidence status: Supported
  Evidence: Signup payload now includes `fullName`, Supabase Auth metadata stores it as `displayName`, and a live local Supabase Auth signup for `profile.trigger.test@example.com` produced `display_name = 'Profile Trigger Test'` and `language = 'en'` in `public.account_profiles`.

## Checks

- Check: Contracts package tests.
  Type: Automated
  Status: Passed
  Expected result: Signup contract requires and accepts `fullName`.
  Actual result: `pnpm --filter @caniello/contracts test` passed 10 tests.

- Check: DB package migration tests.
  Type: Automated
  Status: Passed
  Expected result: Migration text contains the auth-user profile trigger and backfill.
  Actual result: `pnpm --filter @caniello/db test` passed 11 tests.

- Check: Web account tests.
  Type: Automated
  Status: Passed
  Expected result: Signup UI submits `fullName` and existing auth flows still pass.
  Actual result: `pnpm --filter web test -- AccountApp.test.tsx auth.test.ts` passed 11 tests.

- Check: Full TypeScript lint gate.
  Type: Automated
  Status: Passed
  Expected result: Contract, DB, and web changes typecheck across the monorepo.
  Actual result: `pnpm lint` passed 7 package lint tasks.

- Check: Account browser E2E.
  Type: UI
  Status: Passed
  Expected result: Signup form and protected-route account flow remain functional on desktop and mobile Chromium.
  Actual result: `pnpm --filter web test:e2e -- account.spec.ts` passed 6 tests.

- Check: Local Supabase data verification.
  Type: Behavior
  Status: Passed
  Expected result: `auth.users` rows have matching `public.account_profiles` rows after migration and new signup.
  Actual result: `t.tester@example.com` now joins to an account profile with language `pl`; `profile.trigger.test@example.com` joins to an account profile with display name `Profile Trigger Test` and language `en`.

## Evidence

- Local migration application output: function created, trigger created, and one existing profile row backfilled.
- Local Supabase join query confirmed profile rows for `t.tester@example.com` and `profile.trigger.test@example.com`.
- Test commands listed above passed.

## Missing, Skipped, or Unavailable Checks

- Check: Production Supabase migration run.
  Reason: This change was applied only to local Supabase in this session.
  Risk: Production or preview environments will not create profiles until the migration is applied there.

- Check: Cleanup of local smoke-test auth user.
  Reason: `profile.trigger.test@example.com` was created to prove the trigger path.
  Risk: Local database contains one extra test account until removed or reset.

## Future CI/CD or Lifecycle Gates

- Gate: Migration application check.
  Trigger: Pull requests touching `infra/supabase/migrations/`.
  Blocks: Merge when a fresh local Supabase database cannot apply migrations.

- Gate: Auth signup integration test.
  Trigger: Pull requests touching account signup, auth gateway, or account profile schema.
  Blocks: Merge when signup no longer creates an app profile row.

## Result

Ready for human review

## Follow-Up

- Apply the migration in any shared preview or production Supabase project before relying on `public.account_profiles`.
- Decide whether existing blank display names, such as the backfilled `t.tester@example.com` row, should be editable in account settings or repaired manually.

## Human Decision

Pending

Record the explicit human decision when provided. Do not mark validation accepted, complete, released, or merged without explicit human approval.
