# Validation: Account Privacy Settings Foundation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/account-privacy-settings-foundation.md`: authenticated owner Settings UI and `/api/account/settings` API for account profile, consent events, data export requests, and account deletion requests.

## Source Artifacts

- Task: `spec/tasks/account-privacy-settings-foundation.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- Existing schema: `infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql`
- Changed files reviewed:
  - `packages/contracts/src/index.ts`
  - `packages/contracts/src/index.test.ts`
  - `apps/web/app/api/account/settings/route.ts`
  - `apps/web/app/api/account/settings/route.test.ts`
  - `apps/web/features/account/server/account-settings.ts`
  - `apps/web/features/account/server/account-settings.test.ts`
  - `apps/web/features/account/server/account-settings.rls.test.ts`
  - `apps/web/features/account/components/AccountSettingsSection.tsx`
  - `apps/web/features/account/components/AuthenticatedAppShell.tsx`
  - `apps/web/features/account/content.ts`
  - `apps/web/features/account/AccountApp.test.tsx`

## Preconditions

- Local dependencies installed.
- Local Supabase available for the opt-in RLS check and browser login.
- Next.js dev server running at `http://localhost:3000` for browser smoke.

## Acceptance Criteria Mapping

- Criterion: Authenticated owners can load settings profile and see display name, language, latest consent, and latest data-rights request statuses.
  Evidence status: Supported
  Evidence: `AccountSettingsSection` loads `/api/account/settings`; `AccountApp.test.tsx` verifies visible profile values and no-request statuses; browser smoke confirmed the Settings screen loads after seeded login.

- Criterion: Authenticated owners can save display name/language updates, record consent choices, request data export, and request account deletion confirmation through Settings UI.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx` verifies the PUT profile payload, POST consent payload, POST data export payload, and POST account deletion payload gated by `DELETE` confirmation. Server helper validates each payload through shared contracts and inserts only request rows for data-rights actions.

- Criterion: Unauthenticated API access is rejected before account privacy tables are read or written.
  Evidence status: Supported
  Evidence: `apps/web/app/api/account/settings/route.test.ts` verifies GET, PUT, and POST return 401 from the auth boundary.

- Criterion: Request copy makes clear export and deletion requests are recorded for follow-up and do not immediately create files or delete the account.
  Evidence status: Supported
  Evidence: Polish and English copy in `content.ts` explicitly says the view does not generate export files/download links/emails and does not automatically delete accounts or records.

- Criterion: Polish and English copy preserve privacy, consent, data-rights, medical-safety, and official-passport boundaries.
  Evidence status: Supported
  Evidence: `content.ts` includes localized settings and privacy note copy; browser and UI tests preserve the shared medical boundary copy and no official-document claim is introduced.

- Criterion: Focused tests and relevant type/lint/build/browser checks pass or unavailable checks are recorded.
  Evidence status: Supported
  Evidence: Focused tests, full web tests, monorepo tests, TypeScript checks, lint, production build, `git diff --check`, live RLS, and browser smoke passed. Sandboxed `pnpm test`, `pnpm --filter web lint`, `pnpm build`, and the live RLS test hit expected sandbox fetch/localhost limits and passed when rerun outside the sandbox.

## Checks

- Check: Focused account settings contract/server/route tests
  Type: Automated
  Status: Passed
  Expected result: Shared response contract, server mapping, and unauthenticated route behavior pass.
  Actual result: `./node_modules/.bin/vitest run packages/contracts/src/index.test.ts apps/web/features/account/server/account-settings.test.ts apps/web/app/api/account/settings/route.test.ts` passed; 3 files, 25 tests.

- Check: Account app UI tests
  Type: Automated
  Status: Passed
  Expected result: Settings UI loads, submits expected profile/consent/export/deletion request payloads, and keeps deletion request disabled until `DELETE`.
  Actual result: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web` passed; 15 tests.

- Check: Full web test suite
  Type: Automated
  Status: Passed
  Expected result: Existing web behavior remains intact and new opt-in RLS file is skipped by default.
  Actual result: `pnpm --filter web test` passed; 17 files passed, 4 skipped, 93 tests passed, 4 skipped.

- Check: Monorepo tests
  Type: Automated
  Status: Passed
  Expected result: Package and app tests pass through Turborepo.
  Actual result: Sandboxed `pnpm test` failed with `fetch failed`; approved outside-sandbox rerun passed with 10 successful tasks.

- Check: TypeScript and lint gates
  Type: Automated
  Status: Passed
  Expected result: Contracts and web TypeScript checks pass.
  Actual result: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json` passed; `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json` passed; sandboxed `pnpm --filter web lint` failed with `fetch failed`; approved outside-sandbox rerun passed.

- Check: Production build
  Type: Automated
  Status: Passed
  Expected result: Production build succeeds and includes `/api/account/settings`.
  Actual result: Sandboxed `pnpm build` failed with `fetch failed`; approved outside-sandbox rerun passed and listed `/api/account/settings`.

- Check: Opt-in live Supabase RLS
  Type: Security
  Status: Passed
  Expected result: A second owner can manage their own account privacy records but cannot read, update, or insert records for Anna's owner account.
  Actual result: Sandboxed run failed on localhost `EPERM`; approved outside-sandbox `env CANIELLO_RUN_SUPABASE_RLS_TESTS=1 ./node_modules/.bin/vitest run features/account/server/account-settings.rls.test.ts` passed; 1 test.

- Check: Browser smoke
  Type: UI
  Status: Passed
  Expected result: Seeded owner can log in, open Settings, see the real settings surface, deletion request stays disabled without confirmation, no console errors, and no horizontal overflow on desktop or mobile.
  Actual result: In-app Browser smoke passed at 1280px desktop and 390x900 mobile. `/app` Settings heading was visible, deletion request button was disabled without `DELETE`, console error count was 0, and horizontal overflow was 0 at both widths.

- Check: Whitespace diff
  Type: Automated
  Status: Passed
  Expected result: No trailing whitespace or conflict marker issues.
  Actual result: `git diff --check` passed.

## Evidence

- Focused contract/server/route tests: passed.
- Full web tests: passed.
- Monorepo tests, web lint, and production build: passed outside the sandbox after sandbox `fetch failed`.
- Opt-in live account settings RLS test: passed outside the sandbox after sandbox localhost `EPERM`.
- Browser smoke: passed with no console errors and no horizontal overflow at desktop and mobile widths.

## Missing, Skipped, or Unavailable Checks

- Check: Full Playwright E2E suite
  Reason: The task was covered by focused browser smoke and component/API/security tests; the repository's broad E2E suite was not required for this narrow authenticated Settings surface.
  Risk: Low. The changed behavior is covered by targeted UI tests plus a real browser smoke.

## Future CI/CD or Lifecycle Gates

- Gate: Account privacy RLS integration
  Trigger: Pull requests touching `account_profiles`, `consent_events`, `data_export_requests`, `account_deletion_requests`, or `/api/account/settings`.
  Blocks: Review readiness when owner isolation fails.

- Gate: Authenticated Settings browser smoke
  Trigger: Pull requests touching authenticated account shell, settings UI, or account settings API.
  Blocks: Review readiness when Settings cannot load, has console errors, or overflows mobile.

## Result

Ready for human review

Evaluator verdict: Pass.

## Follow-Up

No evaluator gaps found. Actual data export generation, download links, email delivery, account deletion execution, role/caregiver permission changes, and background jobs remain intentionally out of scope.

## Human Decision

Pending. This evaluation does not approve, merge, release, deploy, or mark the task accepted.
