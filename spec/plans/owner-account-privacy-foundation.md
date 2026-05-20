# Implement Owner Account Privacy Foundation

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. It is currently a draft implementation plan and is not approved for execution until a human explicitly approves the scope, milestone sequence, implementation steps, validation approach, and risks.

## Purpose / Big Picture

Caniello needs a privacy-aware account foundation before beta owners entrust it with pet health records, documents, reminders, and sharing. After this plan is implemented, a pet owner can open the Polish-first web app, sign up, see that their email must be verified, log in, recover access, log out, manage cookie preferences, reach privacy, terms, and medical-boundary pages, and request data export or account deletion from account settings. Non-essential analytics remain inactive unless consent is granted, and sensitive account, consent, export, and deletion actions are traceable through audit records.

The feature matters because the owner-facing MVP handles sensitive pet-care information. The observable result is a protected web app area under `apps/web`, backed by Supabase Auth and owner-scoped data boundaries, with tests proving that unauthenticated users cannot access protected screens, verified users can enter, cookie choices gate analytics, legal and medical links work, and export/deletion requests record auditable state.

## Progress

- [x] (2026-05-20T14:37Z) Read planning rules, repository guidance, the accepted owner-facing MVP requirement, accepted owner account privacy feature, accepted account/privacy/data-rights stories, target architecture, Supabase/Auth/RLS/localization ADRs, existing web app structure, current validation evidence, and ROADMAP status.
- [x] (2026-05-20T14:37Z) Drafted this self-contained ExecPlan for human review.
- [ ] Human approves or revises plan scope, milestone sequence, implementation steps, validation approach, risks, and whether subagent review is needed before implementation.
- [ ] Implementation begins on a feature branch only after human approval.
- [ ] Validation review is recorded under `spec/validation/` after implementation evidence exists.
- [ ] Release readiness is prepared under `spec/release-readiness/` only after validation review and human direction.

## Surprises & Discoveries

- Observation: Milestone 2 already created platform prerequisites for this feature.
  Evidence: `spec/validation/milestone-2-platform-foundation-validation.md` records passing checks for health/version routes, Supabase environment helpers, a first private owner data migration, RLS enablement, and a platform foundation gate.
- Observation: Supabase client libraries are not yet installed in `apps/web` or `packages/db`.
  Evidence: `apps/web/package.json` depends on Next.js, React, Zod, Vercel Analytics, Speed Insights, and `@caniello/contracts`, but not `@supabase/ssr` or `@supabase/supabase-js`.
- Observation: The marketing landing already has Polish-first language switching, legal pages, and consent-gated validation events.
  Evidence: `apps/web/features/marketing/MarketingApp.test.tsx` covers Polish default, English switching, legal routes, and validation events only after analytics consent.

## Decision Log

- Decision: Scope this plan to Web MVP owner account privacy behavior, not the completed platform foundation prerequisites.
  Rationale: Milestone 2 evidence already covers health/version routes, environment placeholders, and first migration/RLS skeleton. Re-planning them would blur the next user-visible owner foundation slice.
  Date/Author: 2026-05-20 / Codex

- Decision: Use Supabase Auth and Supabase-backed owner data boundaries rather than inventing a custom auth service.
  Rationale: Accepted ADRs `0004`, `0014`, and `0015` choose Supabase for auth, data, storage, RLS, migrations, minimal RBAC, audit, export, and deletion lifecycle controls.
  Date/Author: 2026-05-20 / Codex

- Decision: Implement export and deletion as request paths with clear user-facing status and audit entries, not full automated fulfillment.
  Rationale: The story requires starting an export or deletion path and making the state clear. Advanced legal request management, retention tooling, and admin-only deletion workflows are explicitly out of scope.
  Date/Author: 2026-05-20 / Codex

- Decision: Reuse and extend the existing marketing consent model instead of replacing it.
  Rationale: The landing implementation already gates validation events behind analytics consent. The owner app should share the consent storage key and preference semantics so visitors and beta users do not see inconsistent privacy behavior.
  Date/Author: 2026-05-20 / Codex

- Decision: Keep Polish as the default language and English as a switchable alternative across the new authenticated owner surfaces.
  Rationale: Accepted ADR `0012` requires Polish-first behavior for public and owner-facing MVP flows, including privacy cues, validation messages, and medical-safety disclaimers.
  Date/Author: 2026-05-20 / Codex

## Outcomes & Retrospective

No implementation outcomes exist yet. The expected outcome after execution is a tested owner account privacy foundation ready for validation review. During implementation, update this section after each major milestone with what changed, what evidence passed, what remains, and whether any assumptions were wrong.

## Context and Orientation

Caniello is a TypeScript-first pnpm and Turborepo monorepo. The web app lives in `apps/web` and uses Next.js App Router conventions. Public landing, privacy, terms, and medical-boundary pages already exist under `apps/web/app/(landing)` and are powered by marketing feature code in `apps/web/features/marketing`. The authenticated owner app should be added under a separate route group such as `apps/web/app/(app)` and feature code under `apps/web/features/account` or smaller feature folders if the implementation naturally separates account access, consent, and settings.

Supabase is the chosen backend platform. Supabase means the hosted or local service that provides authentication, PostgreSQL database, storage, and row-level security. Row-level security, abbreviated RLS, is a Postgres feature that enforces which rows a user can read or write even if application code has a bug. Migrations are SQL files in `infra/supabase/migrations` that create or change database schema. The existing migration `infra/supabase/migrations/20260519000100_mvp_foundation.sql` creates `households`, `pets`, `documents`, `document_processing_jobs`, `extracted_fields`, `timeline_events`, `reminders`, `share_links`, and `audit_logs`, and enables RLS on them.

Supabase Auth stores users in `auth.users`. The first owner app should use Supabase email/password signup, login, email verification state, password reset entry, session read, and logout. A session is the authenticated browser state that proves the user has logged in. The app should use Supabase-supported Next.js session handling, server-side checks before private data access, and centralized helpers rather than scattering Supabase calls through unrelated UI components.

The accepted product artifacts are:

- `spec/requirements/owner-facing-mvp.md`, which requires account, privacy, consent, account deletion, data export, authorization, medical disclaimer, Polish-first interface, and audit foundations before sensitive beta data collection.
- `spec/features/owner-account-privacy-foundation.md`, which defines the account, consent, legal, data-rights, authorization, and audit feature.
- `spec/stories/account-signup-login-and-session.md`, which covers signup, login, email verification state, password reset, session handling, and logout.
- `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`, which covers cookie banner, preferences update path, privacy and terms links, medical disclaimer placement, and consent gating.
- `spec/stories/data-export-and-account-deletion.md`, which covers account settings entry points for data export and account deletion plus audit events.
- `spec/architecture/mvp-target-architecture.md`, which places landing, app, API routes, shared contracts, Supabase helpers, and migrations in the monorepo.
- `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`, `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`, and `spec/architecture-records/0012-polish-first-mvp-localization.md`, which govern backend, auth, lifecycle, RLS, audit, and language behavior.

Terms used in this plan:

- Audit log: a durable record that a sensitive action happened, including actor, action, entity type, optional entity id, metadata, and timestamp. The existing table is `public.audit_logs`.
- Non-essential analytics: page or product measurement that is not required for the page to function. It must remain off until the user consents.
- Data export request: an authenticated user action that asks Caniello to prepare or provide a copy of account data. In this MVP slice it may be recorded and shown as pending rather than immediately generating a file.
- Account deletion request: an authenticated user action that asks Caniello to delete the account or begin the deletion workflow. In this MVP slice it may be recorded and shown as requested rather than immediately deleting every row.
- Protected route: a page that redirects or blocks unauthenticated users before showing private account data.

## Plan of Work

Start by creating or switching to a feature branch, for example `codex/owner-account-privacy-foundation`, unless a human explicitly asks to stay on the current branch. Do not begin implementation until this draft plan is approved.

First, add Supabase runtime dependencies and helpers. Add `@supabase/supabase-js` to `packages/db` for typed Supabase client construction and add `@supabase/ssr` plus `@supabase/supabase-js` to `apps/web` for Next.js session handling. Extend `packages/db/src/index.ts` without breaking existing environment helper tests. Add helper functions for browser-safe client config, server-side client config, and stable action names for audit records if they are shared across API routes and tests. Keep server-only service-role behavior out of browser components.

Second, add the minimal schema needed for account settings, consent, export requests, and deletion requests. Create a new migration under `infra/supabase/migrations`, with a timestamp newer than `20260519000100_mvp_foundation.sql`. Add tables such as `public.account_profiles`, `public.consent_events`, `public.data_export_requests`, and `public.account_deletion_requests` only if they are needed to make behavior observable. `account_profiles` should reference `auth.users(id)` and store minimal owner account fields, language preference, and timestamps. `consent_events` should record consent changes for authenticated users when a user is known, with metadata for anonymous landing consent remaining in browser storage and existing validation events. `data_export_requests` and `account_deletion_requests` should reference the owner user, include status values such as `requested`, `processing`, `completed`, `failed`, or `cancelled` as appropriate, and store timestamps. Enable RLS on every new private table. Owners may read and insert their own export and deletion requests; service-role or future approved operator actions may update status through server-only paths. Record every sensitive action in `audit_logs`.

Third, build shared contracts. Extend `packages/contracts/src/index.ts` with Zod schemas for signup input, login input, password reset request, account profile update, consent preference update, export request response, deletion request response, and audit action names if useful. Zod is already used in this package; keep strict object schemas so API route payloads reject unexpected fields. Add focused tests in `packages/contracts/src/index.test.ts` for valid payloads, invalid emails, unsupported language values, and rejected unknown fields.

Fourth, add web Supabase session helpers. Create server/client helpers under `apps/web/lib/supabase` or `apps/web/features/account/lib`, following `apps/web/AGENTS.md`: server-only integration helpers must not be imported into client components. Use Next.js App Router route handlers, server components, middleware, or server actions according to the smallest clear implementation. The owner app must be able to read the current session, redirect unauthenticated users away from protected pages, and sign out. If middleware is added, keep it narrow to protected owner routes such as `/app` and do not affect public landing, privacy, terms, medical-boundaries, marketplace, clinics, or API routes.

Fifth, implement account access UI. Add routes such as `/signup`, `/login`, `/reset-password`, and `/app` in `apps/web/app`. The exact route names may be adjusted to fit existing navigation, but the plan's acceptance requires public signup/login/reset entry points and a protected app home. Add feature components under `apps/web/features/account`. The UI should show Polish by default, with English switching using the same language storage semantics as the marketing feature. Signup should submit valid email/password details to Supabase Auth and show a verification state after account creation. Login should create a session for verified returning users. Password reset should start Supabase's reset flow and show clear next steps. Logout should end the session and make protected screens require login again. Medical and privacy trust messaging should remain visible in the auth flow.

Sixth, implement consent preferences across landing and app. Extract reusable consent constants or hooks if needed from `apps/web/features/marketing/components/AnalyticsConsentPopup.tsx` and related marketing code. Preserve existing landing behavior. Add an account settings or privacy settings entry point where users can reopen and change analytics preferences. Consent changes should immediately apply to non-essential analytics and should produce an auditable event for authenticated users. For anonymous visitors, retain the existing local storage and `/api/validation-events` behavior.

Seventh, implement account settings for data export and deletion. Add a protected settings page such as `/app/settings/privacy` or `/app/settings/account`. Show profile basics, language preference, consent preferences, data export action, and account deletion action. Export and deletion actions should call server-side route handlers or server actions that validate the session, insert request rows, write audit logs, and return clear status. Do not silently delete the account immediately unless a later human-approved design changes this plan; showing "requested" is acceptable for this MVP foundation and matches the story scope.

Eighth, add automated tests. Use Vitest and React Testing Library for contracts, route handlers, helpers, and UI components. Use Playwright for browser behavior across public and protected pages. Tests should prove: Polish default and English switch on auth/account surfaces; unauthenticated users cannot access `/app`; signup shows verification state; login starts a protected session in a mocked or local Supabase-compatible path; logout blocks protected access again; reset password entry validates email and shows next steps; consent remains off before grant and changes when preferences are saved; legal and medical-boundary links remain reachable; export and deletion requests produce user-facing status and audit evidence.

Ninth, update durable PDLC evidence after implementation. Use the `validation-review` skill to create a validation artifact under `spec/validation/` that maps test results and any skipped checks back to this plan, the feature, the stories, ADRs, and requirements. Update `ROADMAP.md` in the same implementation change so Milestone 3 and this feature reflect the real implementation and validation state without implying human acceptance. Use `release-readiness` only after validation review and human direction.

## Milestones

Milestone 1 establishes dependencies, contracts, and database shape. At the end of this milestone, the repository has Supabase client dependencies, strict request/response schemas, and migrations for account profile, consent history, export requests, and deletion requests with RLS. A novice can run `pnpm test --filter=@caniello/contracts`, `pnpm test --filter=@caniello/db` if db tests are added there, and `pnpm validation:platform-foundation` to see existing platform gates remain healthy. This milestone is accepted when tests prove schemas reject bad payloads and static migration checks prove every new private table has RLS.

Milestone 2 establishes authenticated routing and account access. At the end of this milestone, signup, login, reset-password, protected app home, and logout paths exist in the Next.js app. A browser user who is not logged in cannot view the protected owner app. A user who signs up sees email verification guidance. A returning verified user can log in and reach the protected app. A logged-in user can log out and loses protected access. This milestone is accepted when Vitest covers route/helper behavior and Playwright proves the protected-route flow.

Milestone 3 establishes privacy, consent, and legal/medical boundaries across the owner app. At the end of this milestone, the existing landing consent behavior still works, account settings can reopen consent preferences, non-essential analytics remain off before consent, saved preferences apply immediately, and privacy, terms, and medical-boundary links are reachable from auth and account surfaces. This milestone is accepted when tests show no validation events before consent, events after consent, preference changes persisted, and legal links resolve.

Milestone 4 establishes data export and account deletion request paths. At the end of this milestone, an authenticated user can request export or deletion from account settings, see a clear requested state, and the system records audit evidence. This milestone is accepted when tests show unauthenticated calls are rejected, authenticated calls create request records, user-facing status appears, and `audit_logs` records the action.

Milestone 5 completes validation evidence and review handoff. At the end of this milestone, `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e` have been run or explicitly marked unavailable with reasons. A validation artifact under `spec/validation/` maps evidence to every story and acceptance criterion. `ROADMAP.md` points to that evidence and reflects the current state. This milestone is accepted only when a human reviews the evidence; Codex may recommend readiness but must not self-approve.

## Concrete Steps

From repository root `/workspaces/caniello`, confirm the worktree before implementation:

    git status --short

Create or switch to the implementation branch after human approval:

    git switch -c codex/owner-account-privacy-foundation

If the branch already exists, use:

    git switch codex/owner-account-privacy-foundation

Install dependencies after approval. The exact command may need to be split by package depending on pnpm behavior:

    pnpm --filter @caniello/db add @supabase/supabase-js
    pnpm --filter web add @supabase/ssr @supabase/supabase-js

If package names differ because the package is named `db` instead of `@caniello/db`, inspect `packages/db/package.json` and use the package name from that file. Do not hand-edit `pnpm-lock.yaml`; let pnpm update it.

Add or update contract tests first:

    pnpm --filter @caniello/contracts test

Expected result: existing contract tests pass before changes; new tests fail until schemas are implemented; after implementation all contract tests pass.

Add the database migration and db tests. Use a new migration filename like:

    infra/supabase/migrations/20260520HHMMSS_owner_account_privacy_foundation.sql

The timestamp must be current when the implementation is performed and must sort after the existing migration. After adding migration tests, run:

    pnpm --filter @caniello/db test
    pnpm validation:platform-foundation

Expected result: db tests pass and platform foundation validation still passes. If local Supabase is available, also run:

    pnpm exec supabase start --workdir infra/supabase

Then apply or reset the local database according to Supabase CLI output. Record any skipped local Supabase check in validation evidence if Docker or Supabase services are unavailable.

Implement web helper, route, component, and Playwright tests. Run focused web checks as work proceeds:

    pnpm --filter web test
    pnpm --filter web typecheck
    pnpm --filter web build

Run full workspace checks before validation review:

    pnpm test
    pnpm lint
    pnpm build
    pnpm test:e2e

Expected result: all commands complete successfully. If a command fails, update this ExecPlan's `Surprises & Discoveries` with the error, fix the underlying issue, and rerun the failed command. If a check is unavailable for environmental reasons, record the exact reason in the validation artifact rather than treating it as passed.

After implementation, create validation evidence with the `validation-review` skill under `spec/validation/`, then update `ROADMAP.md` with links to the plan and validation artifact. Do not mark acceptance or release complete without explicit human approval.

## Validation and Acceptance

Acceptance is behavior-based. The implementation satisfies the plan when these observations are true:

An unauthenticated visitor can open signup, login, reset password, privacy, terms, and medical-boundary pages. The pages default to Polish. Switching to English changes core labels, validation messages, policy links, and medical/privacy trust copy to English.

A new beta user can submit valid signup details and sees an email verification state. The system does not treat the user as verified until Supabase reports verification. Because local transactional email setup may vary, implementation tests may mock the Supabase response for verification-state UI, but the route/helper boundary must match Supabase Auth behavior.

A returning verified user can log in and view a protected owner app page. An unauthenticated user who opens that protected page is redirected or shown a login requirement. After logout, protected pages require login again.

Password reset has a visible entry point. A user who submits a valid email sees reset next steps. Invalid email input is rejected with localized validation copy.

Non-essential analytics and marketing cookies remain inactive until consent is granted. The existing landing consent test remains green. Account settings let an authenticated user change preferences. A saved preference applies immediately and is persisted. Authenticated consent changes create audit evidence.

Privacy policy, terms, and medical-boundary content are reachable from auth and account settings surfaces. Medical-boundary copy says Caniello organizes records and does not replace a veterinarian, diagnosis, treatment advice, emergency care, or an official pet passport.

An authenticated user can request data export and sees the request state. An authenticated user can request account deletion and sees the next state. Unauthenticated export or deletion calls are rejected. Export and deletion requests are traceable in audit evidence.

The required automated command set is:

    pnpm test
    pnpm lint
    pnpm build
    pnpm test:e2e

The recommended focused command set is:

    pnpm --filter @caniello/contracts test
    pnpm --filter @caniello/db test
    pnpm --filter web test
    pnpm --filter web typecheck
    pnpm validation:platform-foundation

Run local Supabase migration validation when the host supports Docker and Supabase CLI:

    pnpm exec supabase start --workdir infra/supabase

If local Supabase cannot run, record that as skipped with risk in `spec/validation/`; do not claim migration apply success without running it.

## Idempotence and Recovery

All source edits should be additive or narrowly scoped. Running tests multiple times is safe. Running `pnpm install` or `pnpm add` multiple times is safe, though it may rewrite the lockfile consistently.

If dependency installation fails because of network restrictions, request approval for the networked command rather than replacing dependencies with ad hoc local code. If Supabase local services fail because Docker is unavailable, continue with static tests and record the skipped operational check.

If a migration file has a syntax error before it has been applied to a shared environment, edit the migration in place during the same feature branch. If it has already been applied to a shared environment, create a new corrective migration instead of rewriting history.

If route protection accidentally affects public routes, narrow middleware matching or route-group checks so `/`, `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, `/clinics`, `/api/landing-leads`, and `/api/validation-events` preserve existing behavior.

If tests reveal that immediate account deletion would cascade-delete data before audit evidence or user confirmation is clear, keep deletion as a recorded request and document the fuller deletion lifecycle for a later approved slice.

Before any final handoff, run `git status --short` and verify that changed files are intentional. Do not revert unrelated user edits.

## Artifacts and Notes

Source artifacts used to draft this plan:

- `README.md`
- `AGENTS.md`
- `apps/web/AGENTS.md`
- `ROADMAP.md`
- `spec/plans/PLANS.md`
- `spec/requirements/owner-facing-mvp.md`
- `spec/features/owner-account-privacy-foundation.md`
- `spec/stories/account-signup-login-and-session.md`
- `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`
- `spec/stories/data-export-and-account-deletion.md`
- `spec/architecture/mvp-target-architecture.md`
- `spec/architecture-records/0004-use-supabase-for-mvp-data-auth-storage-and-rls.md`
- `spec/architecture-records/0012-polish-first-mvp-localization.md`
- `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`
- `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`
- `spec/validation/milestone-2-platform-foundation-validation.md`

Important existing implementation paths:

- `apps/web/app/(landing)` contains public landing and legal pages.
- `apps/web/features/marketing` contains the current landing, language, consent, legal, and validation-event behavior.
- `packages/contracts/src/index.ts` contains existing strict Zod schemas for landing leads, validation events, health, and version payloads.
- `packages/db/src/index.ts` contains existing Supabase environment and endpoint helpers.
- `infra/supabase/migrations/20260519000100_mvp_foundation.sql` contains the first owner data tables, RLS policies, and audit log table.
- `tests/e2e/landing.spec.ts` contains existing Playwright coverage that must remain green.

Expected concise validation transcript after full implementation should look like:

    pnpm test
    Tasks: all successful

    pnpm lint
    Tasks: all successful

    pnpm build
    Tasks: all successful

    pnpm test:e2e
    12+ passed

The exact number of tests may increase. The important observation is that all existing landing checks still pass and new account privacy checks pass.

## Interfaces and Dependencies

Use these dependencies:

- `@supabase/supabase-js` for Supabase Auth and typed client behavior.
- `@supabase/ssr` in the Next.js web app for App Router compatible session handling.
- Existing `zod` in `packages/contracts` for strict payload validation.
- Existing Next.js App Router route handlers, server components, client components, or server actions as appropriate.
- Existing Vitest, React Testing Library, and Playwright setup.

End-state interfaces should include, or closely approximate, these stable shapes. Exact names may change during implementation if the codebase pattern makes another name clearer, but the behavior must remain.

In `packages/contracts/src/index.ts`, expose strict schemas and types for:

    accountLanguageSchema: "pl" or "en"
    accountSignupPayloadSchema: { email, password, language, acceptedTerms }
    accountLoginPayloadSchema: { email, password }
    passwordResetRequestPayloadSchema: { email, language }
    consentPreferencePayloadSchema: { analyticsConsent, marketingConsent optional, language }
    dataExportRequestPayloadSchema: { language }
    accountDeletionRequestPayloadSchema: { confirmation, language }

In `packages/db/src/index.ts`, preserve existing functions:

    readSupabaseClientConfig
    readSupabaseServiceRoleConfig
    buildSupabaseRestUrl
    buildSupabaseStorageUrl

Add helpers only if they keep Supabase construction and audit action names centralized. Do not expose the service-role key to client code.

In `apps/web`, provide route or action boundaries for:

    signup
    login
    logout
    password reset request
    read current authenticated session
    save consent preferences
    request data export
    request account deletion

Every server-side mutation should validate input with `packages/contracts`, verify the authenticated user when the action is private, and write an audit record for sensitive authenticated actions.

## Human Checkpoint

Before implementation, a human must approve or revise:

- Plan scope: Web MVP owner account privacy foundation, not mobile or later document workflows.
- Milestones and sequence: dependencies/schema/contracts, auth routes, consent/legal boundaries, export/deletion, validation evidence.
- Concrete implementation steps and whether dependency installation is acceptable.
- Validation and acceptance approach, including whether local Supabase migration apply is required before implementation handoff.
- Risks, assumptions, and recovery guidance.
- Whether subagent review is needed before implementation.
- Whether Codex may begin implementation.

Codex must not begin implementation, create source changes under `apps/`, `packages/`, `infra/`, or `tests/`, or mark any checkpoint complete until the human explicitly approves this plan or gives a clear implementation instruction.

## Revision Notes

- 2026-05-20 / Codex: Created the initial draft ExecPlan for Owner Account Privacy Foundation. Reason: the user requested execution planning for the accepted feature, and the plan is needed before implementation can safely begin.
