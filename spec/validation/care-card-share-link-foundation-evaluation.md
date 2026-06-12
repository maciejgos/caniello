# Validation: Care Card Share Link Foundation

## Status

Ready for human review

## Scope

Evaluate `spec/tasks/care-card-share-link-foundation.md`: owner-authenticated creation and revocation of scoped care-card share links, public read-only `/share/[token]` rendering, token safety, localization boundaries, and preservation of MVP non-goals.

## Source Artifacts

- Task: `spec/tasks/care-card-share-link-foundation.md`
- Product context: `spec/product-context.md`
- Roadmap: `spec/roadmap.md`
- ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md`
- Changed implementation files:
  - `packages/contracts/src/index.ts`
  - `apps/web/features/account/server/share-links.ts`
  - `apps/web/app/api/share-links/route.ts`
  - `apps/web/app/share/[token]/page.tsx`
  - `apps/web/features/account/components/CareCardPreviewSection.tsx`
  - `apps/web/features/account/content.ts`
- Changed tests:
  - `apps/web/features/account/server/share-links.test.ts`
  - `apps/web/app/api/share-links/route.test.ts`
  - `apps/web/features/account/AccountApp.test.tsx`

## Preconditions

- Existing `public.share_links` table and owner RLS policies from the MVP foundation migration.
- Existing pet profile, reminder, and document metadata APIs and server mappers.
- Local web dev server on `http://localhost:3000` for browser checks.

## Acceptance Criteria Mapping

- Criterion: A signed-in owner with a saved pet can create an expiring care-card share link from Sharing.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx` creates a link from Sharing and asserts generated URL and expiry display; `share-links.test.ts` verifies insert payload includes `pet_id`, `expires_at`, and hashed token.
- Criterion: The owner can see active share-link status and revoke the active link.
  Evidence status: Supported
  Evidence: `AccountApp.test.tsx` asserts active link UI and revoke request; `share-links.test.ts` verifies revocation is scoped by share link id and pet id.
- Criterion: Share-link API requests reject unauthenticated owners before data access.
  Evidence status: Supported
  Evidence: `app/api/share-links/route.test.ts` covers GET, POST, and PUT 401 responses.
- Criterion: Share-link tokens are generated as opaque random tokens and persisted only as hashes.
  Evidence status: Supported
  Evidence: `share-links.ts` uses `randomBytes(32).toString("base64url")` and SHA-256 hashing; `share-links.test.ts` asserts stored token hash format and that client result does not contain the stored hash.
- Criterion: `/share/[token]` displays a read-only care card for active unexpired tokens and does not expose owner account, household, hidden documents, or raw token hashes.
  Evidence status: Supported
  Evidence: `readSharedCareCard` resolves active unrevoked unexpired tokens server-side with service-role client, maps bounded pet/reminder/document metadata, and tests assert no token hash or owner id in the public result. The 2026-06-12 local Supabase authenticated browser smoke confirmed the public page renders Bruno, Rabies vaccine, and Rabies certificate from the generated token URL.
- Criterion: Invalid, expired, or revoked tokens show a safe unavailable state without leaking whether a pet or owner exists.
  Evidence status: Supported
  Evidence: `readSharedCareCard` returns the same unavailable 404 for missing token or missing pet; desktop and mobile Playwright smoke confirmed `/share/not-a-real-token` renders the unavailable page with no console or page errors.
- Criterion: UI copy remains Polish-first with English switching for owner management copy and shared-page safety boundaries.
  Evidence status: Supported
  Evidence: `content.ts` adds Polish and English owner share-link copy; `AccountApp.test.tsx` covers Polish create/revoke and existing English care-card switching. Public shared page uses Polish-first safety copy.
- Criterion: Focused tests cover owner create/revoke, public token resolution, unauthenticated API access, token hashing behavior, UI create/revoke states, public invalid-token display, and preserved shell behavior.
  Evidence status: Supported
  Evidence: Focused server, route, account UI, full web, and browser checks passed as listed below.

## Checks

- Check: `./node_modules/.bin/vitest run apps/web/features/account/server/share-links.test.ts apps/web/app/api/share-links/route.test.ts`
  Type: Automated
  Status: Passed
  Expected result: Share-link helper and unauthenticated route behavior pass.
  Actual result: 2 files passed, 7 tests passed.
- Check: `./node_modules/.bin/vitest run AccountApp.test.tsx` from `apps/web`
  Type: Automated
  Status: Passed
  Expected result: Account UI tests, including care-card share-link create/revoke, pass.
  Actual result: 1 file passed, 14 tests passed, with existing localStorage experimental warning.
- Check: `pnpm --filter web test`
  Type: Automated
  Status: Passed
  Expected result: Full web Vitest suite passes.
  Actual result: 15 files passed, 3 opt-in files skipped, 86 tests passed, 3 skipped, with existing localStorage experimental warnings.
- Check: `pnpm test`
  Type: Automated
  Status: Passed
  Expected result: Monorepo tests pass.
  Actual result: Outside-sandbox rerun passed after sandbox fetch failure; 10 turbo tasks successful.
- Check: `./node_modules/.bin/tsc --noEmit --pretty false -p apps/web/tsconfig.json`
  Type: Automated
  Status: Passed
  Expected result: Web TypeScript check passes.
  Actual result: Passed.
- Check: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/contracts/tsconfig.json`
  Type: Automated
  Status: Passed
  Expected result: Contracts TypeScript check passes.
  Actual result: Passed.
- Check: `./node_modules/.bin/tsc --noEmit --pretty false -p packages/db/tsconfig.json`
  Type: Automated
  Status: Passed
  Expected result: DB package TypeScript check passes.
  Actual result: Passed.
- Check: `pnpm --filter web lint`
  Type: Automated
  Status: Passed
  Expected result: Web lint/type gate passes.
  Actual result: Outside-sandbox rerun passed after sandbox fetch failure.
- Check: `pnpm build`
  Type: Automated
  Status: Passed
  Expected result: Production build succeeds and includes share routes.
  Actual result: Outside-sandbox rerun passed after sandbox fetch failure; build listed `/api/share-links` and `/share/[token]`.
- Check: `git diff --check`
  Type: Automated
  Status: Passed
  Expected result: No whitespace errors.
  Actual result: Passed.
- Check: Playwright desktop smoke for `/share/not-a-real-token` and protected `/app`.
  Type: UI
  Status: Passed
  Expected result: Public unavailable page renders, `/app` redirects to login, no console/page errors, no horizontal overflow.
  Actual result: Outside-sandbox Playwright passed at 1440x1000: unavailable page visible, `/app` redirected to `/login?next=%2Fapp`, overflow 0, no console/page errors.
- Check: Playwright mobile smoke for `/share/not-a-real-token`.
  Type: UI
  Status: Passed
  Expected result: Public unavailable page renders on mobile, no console/page errors, no horizontal overflow.
  Actual result: Outside-sandbox Playwright passed at 390x900: unavailable page visible, overflow 0, no console/page errors.
- Check: Seeded local Supabase authenticated browser smoke for login, create link, open active public link, revoke link, and confirm revoked link unavailable.
  Type: UI
  Status: Passed
  Expected result: Seeded owner can create a localhost share URL, the public URL renders Bruno's read-only care card with bounded reminder and document metadata, revocation makes the same URL unavailable, and there are no console/page errors or horizontal overflow.
  Actual result: Rerun on 2026-06-12 passed using seeded owner `akowalska@example.com`: generated URL used `http://localhost:3000/share/...`, public page showed Bruno, Rabies vaccine, and Rabies certificate, revoked URL rendered `Link jest niedostepny`, desktop app/public overflow was 0, and console/page errors were empty.
- Check: Roadmap and non-goal review.
  Type: Manual
  Status: Passed
  Expected result: No scope drift beyond Now MVP trusted sharing/export foundation.
  Actual result: No PDF generation, caregiver accounts, invitations, household permission changes, file sharing, AI, provider workflows, booking, payments, marketplace, mobile, release, deployment, merge, or roadmap movement were added.

## Evidence

- Focused tests passed after implementation and after the expired-link list fix.
- Full web tests passed after the final fix.
- Full monorepo tests passed outside the sandbox after sandbox fetch failure.
- Production build passed outside the sandbox and listed new dynamic public and API routes.
- Browser validation passed for public unavailable state and protected app redirect on desktop and mobile.
- Local Supabase authenticated browser validation passed on 2026-06-12 after fixing the public token route and request-origin URL generation.

## Findings

- Fixed on 2026-06-12: Next.js 16 route params for `apps/web/app/share/[token]/page.tsx` must be awaited before reading `token`; the live public route previously rendered a 500 because the token was undefined.
- Fixed on 2026-06-12: `/api/share-links` should build owner-visible URLs from the request `Origin` header when present; live local creation previously returned `http://0.0.0.0:3000/share/...` from `request.nextUrl.origin`.

## Missing, Skipped, or Unavailable Checks

- None for the scoped task after the 2026-06-12 local Supabase retest.

## Future CI/CD or Lifecycle Gates

- Gate: Opt-in live Supabase share-link RLS/integration test.
  Trigger: When local Supabase is available in developer or CI validation.
  Blocks: Future changes to share-link persistence, RLS, or public token lookup when failing.
- Gate: Authenticated Playwright share-link E2E.
  Trigger: Before release or when browser E2E infrastructure can start local Supabase reliably.
  Blocks: Release-readiness for public sharing if create/open/revoke fails.

## Result

Pass

## Follow-Up

- Recommended next action: continue human review on draft PR #26.
- Consider promoting the successful local Supabase create/open/revoke smoke into a committed Playwright E2E once the project has a stable local Supabase E2E harness.

## Human Decision

Pending. The evaluator does not approve, merge, release, deploy, mark human checkpoints complete, or move roadmap scope.
