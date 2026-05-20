# Caniello MVP Implementation Roadmap

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. Keep this file self-contained so a fresh Codex agent or a human novice can understand the intended implementation sequence without reading prior chat.

## Purpose / Big Picture

After this roadmap is approved and executed, Caniello will move from a validated landing page into a working MVP delivered in safe increments: Landing Page, Next.js Web MVP, Mobile MVP, and later operational tooling. A pet owner should eventually be able to sign in, add a pet, upload or scan a document, review extracted information, see timeline and reminders, ask sourced questions, and share a care summary.

This roadmap is story-by-story and feature-by-feature. It now treats the landing page as an accepted validation product slice, not merely a completed static page. The landing slice explains Wave 1 owner value, routes consented waitlist leads through MailerLite, preserves attribution for later segmentation, and measures validation events behind explicit consent. As of ADR 0001-0011, the previous FastAPI and Back Office MVP path is superseded for the MVP. The active MVP architecture is a TypeScript-first pnpm/Turborepo monorepo with `apps/web` as a Next.js App Router application, `apps/mobile` as the future Expo scaffold, shared packages under `packages/*`, Supabase as the local backend foundation, and one Vercel project rooted at `apps/web`.

## Progress

- [x] (2026-05-11) Read `spec/plans/PLANS.md`, the landing page plan, stack ADR, current Docker setup, package scripts, requirements, features, and stories.
- [x] (2026-05-11) Created this Draft implementation roadmap for human review.
- [x] (2026-05-11) Updated roadmap to include the human decision that Polish is the first MVP language with an English switch.
- [x] (2026-05-12) Reviewed newly accepted landing-page segmented validation requirement, features, and stories; updated this roadmap so Milestone 0 includes consent, segmented lead capture, MailerLite upsert, and validation instrumentation.
- [x] (2026-05-12) Replanned Milestone 0 against the current React landing page, existing tests, saved validation screenshots, and landing concept mockups.
- [x] (2026-05-12) Human approved beginning Milestone 0 implementation.
- [x] (2026-05-12) Created branch `codex/caniello-mvp-milestone-0` for Milestone 0 implementation.
- [x] (2026-05-12) Implemented the Milestone 0 landing page slice: Polish-first language switching, consent-gated segmented forms, future-wave research framing, footer/legal placeholders, server-side MailerLite upsert boundary, UTM capture, and consent-gated validation events.
- [x] (2026-05-12) Updated unit and Playwright E2E coverage for Polish default, English switching, consent blocking, owner/provider/clinic payloads, source attribution, UTM preservation, validation events, and responsive screenshots.
- [x] (2026-05-12) Ran validation gates for Milestone 0 implementation: `npm run test`, `npm run lint`, `npm run build`, and `npm run test:e2e` using Dockerized Node/Playwright runtimes.
- [x] (2026-05-12) Added validation evidence in `spec/validation/landing-page-validation-history.md`.
- [x] (2026-05-12) Revised the mid-page layout after human feedback that the implemented UI did not match the mockup: the process card, owner CTA, compact "What's next" cards, and final waitlist strip now follow the `image 1.png` composition more closely, with Wave 2/Wave 3 full forms opened from compact research CTAs.
- [x] (2026-05-12) Adjusted the three mid-page cards to equal desktop height after human visual feedback, then reran lint, build, and Playwright E2E screenshot validation.
- [x] (2026-05-12) Replaced the full-width analytics consent section with a small dismissing bottom popup and routed analytics consent and validation events through `/api/validation-events`.
- [x] (2026-05-13) Implemented the simple MailerLite integration refinement on branch `codex/mailerlite-integration`: local secret hygiene, `Caniello Waitlist` group lookup by name, subscriber upsert into that group using email only, API unit tests, and README configuration updates.
- [x] (2026-05-14) Human accepted the remaining Milestone 0 validation and release-readiness artifacts, including Wave 2, Wave 3, naming, timeline service links, layout unification, and Milestone 0 release-readiness records.
- [x] (2026-05-14) Added public-launch backlog work for Privacy Policy, Terms of Service, and medical-boundary content.
- [x] (2026-05-15) Captured the data-controller identity for the Privacy Policy draft: Cloud & More Maciej Gos / Cloud & More, NIP 5242507722, address B. Prusa 43/20, 05-800 Pruszków, privacy contact `privacy@caniello.com`.
- [x] (2026-05-17) Marked the older FastAPI and Back Office MVP implementation path as superseded by ADR 0001-0011 and linked the active migration plan in `spec/plans/completed-foundation-plans.md`.
- [x] (2026-05-17) Split the remaining Milestone 1 architecture decisions into separate ADRs 0013-0020 for platform topology, identity/access, data lifecycle, AI document intake, sharing/export, messaging, observability, and Stripe payment deferral.
- [x] Human review of roadmap scope, sequencing, and release slices beyond Milestone 0.
- [x] Backlog before public launch: prepare and implement Privacy Policy, Terms of Service, and medical-boundary content for landing lead capture.
- [x] Follow-up ADRs or solution designs for platform topology, auth/RBAC, AI document pipeline, data lifecycle, sharing/export, messaging, payments deferral, and observability.
- [x] Implementation authorization for Milestone 1 or further roadmap slices.
- [x] (2026-05-19) Human accepted the full Milestone 1 ADR package 0013-0021, including AI provider routing via ADR 0021.
- [x] (2026-05-19) Created branch `codex/milestone-2-platform-foundation` and implemented the Milestone 2 local platform foundation slice: health/version API routes, shared health/version contracts, Supabase config helpers, `.env.example` placeholders, and the first RLS-enabled Supabase migration skeleton.
- [x] (2026-05-19) Added focused Vitest coverage for health/version contracts, API routes, Supabase config helpers, and migration/RLS presence.
- [x] (2026-05-19) Ran Milestone 2 validation gates: `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e`; recorded evidence in `spec/validation/milestone-2-platform-foundation-validation.md` for human review.
- [x] (2026-05-19) Implemented the Milestone 2 platform foundation lifecycle gate as `pnpm validation:platform-foundation` and wired it into `.github/workflows/ci.yml` after the MailerLite integration gate.

## Surprises & Discoveries

- Observation: The Codex filesystem patch helper could not run in this workspace because the sandbox cannot create a user namespace.
  Evidence: `apply_patch` and initial sandboxed read commands failed with `bwrap: No permissions to create a new namespace`; scoped edits and validation commands were run with approved escalation.

- Observation: Milestone 2 can add a useful platform foundation without introducing a Supabase JavaScript client dependency yet.
  Evidence: `packages/db/src/index.ts` now centralizes Supabase URL/key reading and stable REST/Storage URL construction, while the first migration establishes schema and RLS boundaries for later Supabase client work.

- Observation: The landing page already has a completed ExecPlan and working React/Vite/Tailwind/Docker toolchain.
  Evidence: `spec/plans/completed-foundation-plans.md`, `package.json`, `Dockerfile`, `docker-compose.yml`, and `playwright.config.ts` exist.

- Observation: The historical stack ADR is superseded and was not enough detail for implementation planning.
  Evidence: `spec/architecture-records/0000-superseded-caniello-mvp-stack.md` explicitly says implementation planning depends on follow-up architecture decisions for topology, identity, AI intake, data lifecycle, sharing, messaging, payments, and observability.

- Observation: The current Docker Compose setup only runs the web app.
  Evidence: `docker-compose.yml` currently defines a single `web` service and no `api`, `db`, worker, or Supabase-local service.

- Observation: Landing-page scope has expanded from a basic waitlist page into a segmented validation slice.
  Evidence: `spec/requirements/landing-page-segmented-validation.md`, `spec/features/landing-page-mvp-value-experience.md`, `spec/features/landing-page-segmented-lead-capture.md`, `spec/features/landing-page-validation-instrumentation.md`, and eight accepted `spec/stories/landing-page-*.md` files now exist.

- Observation: The landing stories deliberately resolve the consent ambiguity with a conservative first-public baseline.
  Evidence: `spec/stories/landing-page-consent-and-analytics-policy-baseline.md` requires explicit lead-capture consent before sending lead data to MailerLite and blocks non-essential analytics until analytics consent is granted.

- Observation: Before Milestone 0 implementation, the landing UI was visually close to the Wave 1 "Better care. Stronger bond." mockup, but was not yet the segmented validation surface described by the accepted stories.
  Evidence: `src/App.tsx` hard-codes `copy.en`, renders hero, feature cards, process, mid-page CTA, and footer, but does not render the imported `LanguageToggle`, Wave 2/Wave 3 research cards, footer waitlist form, explicit lead-capture consent controls, analytics consent controls, or legal placeholder pages.

- Observation: Before Milestone 0 implementation, the waitlist form was a local-only prototype.
  Evidence: `src/components/WaitlistForm.tsx` validates email and shows local success text; `src/content.ts` says "the form confirms locally and does not send data to a server." No server-side MailerLite submission path exists in the current file list.

- Observation: Before Milestone 0 implementation, tests protected the old English-only local confirmation behavior.
  Evidence: `src/App.test.tsx` expects the page to render English by default and `tests/e2e/landing.spec.ts` captures `landing-english-*` screenshots and expects a local thank-you message after email entry.

- Observation: The landing mockups provide three distinct visual references for Milestone 0.
  Evidence: `spec/notes/landing/image 1.png` shows the compact Wave 1 landing page with "What's next" cards, final waitlist strip, and footer signup; `spec/notes/landing/image 2.png` shows a Wave 2 exploration concept for provider research interest; `spec/notes/landing/image 3.png` shows a Wave 3 research concept for clinic/vet interest. `spec/design/caniello-visual-direction.md` recommends the "Better care. Stronger bond." direction as the baseline validation landing page.

- Observation: The shell environment for Codex did not expose `npm` or `node` on the default `PATH`, but the Codex runtime node binary and Dockerized project runtimes were available.
  Evidence: direct `npm run test` and `npm run lint` returned `command not found`; validation was completed through `docker compose run --rm web ...` and `docker run --rm ... mcr.microsoft.com/playwright:v1.59.1-noble ...`.

- Observation: The project Docker image is based on Alpine, and Playwright browser installation inside that container downloaded an unsupported fallback build that did not expose the expected headless-shell path.
  Evidence: `docker compose run --rm web npm run test:e2e` failed before app execution with `spawn /root/.cache/ms-playwright/chromium_headless_shell-1217/chrome-linux/headless_shell ENOENT`; the same E2E test passed in the official Playwright Noble image.

- Observation: The MailerLite `Caniello Waitlist` group exists in the connected account.
  Evidence: A read-only `GET https://connect.mailerlite.com/api/groups?limit=100&filter[name]=Caniello%20Waitlist` call on 2026-05-13 returned group id `187371486947837507`, name `Caniello Waitlist`, and zero active subscribers. No subscriber was created during this verification.

- Observation: The first Milestone 0 implementation over-expanded the future-wave research section compared with the accepted mockup direction.
  Evidence: Human feedback compared `spec/notes/landing/image 1.png` against the implemented UI and noted that the left reference and right implementation were not aligned. The revised UI moves Wave 2/Wave 3 capture behind compact card CTAs and restores the process, CTA, "What's next," and final waitlist strip as a cohesive mid-page composition.

- Observation: Milestone 0 validation and release-readiness records are now accepted, but public launch still has explicit follow-up work.
  Evidence: On 2026-05-14, the human instructed Codex to approve the remaining documents and to add only Privacy Policy, Terms of Service, and medical-boundary work to the implementation roadmap backlog. The release-readiness records still preserve the distinction between accepting advisory evidence and actually merging, deploying, launching public traffic, tagging, announcing, or completing a production release.

- Observation: The repository now has accepted ADRs 0001-0011 for a TypeScript-first Next.js monorepo, which supersede the older FastAPI and Back Office MVP assumptions in this roadmap.
  Evidence: `spec/architecture-records/0001-use-typescript-nextjs-monorepo.md` through `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md` select Next.js App Router, Supabase, pnpm workspaces, Turborepo, Dev Containers, one Vercel project, Expo mobile, and pragmatic engineering practices.

## Decision Log

- Decision: Sequence the MVP as Landing Page, Platform Foundation, Web MVP, Mobile MVP, Back Office MVP, then deferred payments and hardening.
  Rationale: The landing page exists and validates acquisition. The Web MVP can prove core owner value faster than mobile-specific camera work. Mobile should reuse the same backend once the web flow proves the data model and API. Back office depends on real operational data and review states.
  Date/Author: 2026-05-11 / Codex

- Decision: Supersede the roadmap's FastAPI backend and Back Office MVP path for the MVP with the ADR 0001-0011 TypeScript-first monorepo path.
  Rationale: The accepted ADR chain now makes Next.js App Router API routes, Supabase, pnpm workspaces, Turborepo, Dev Containers, Expo mobile, and one Vercel project the governing MVP architecture. FastAPI, a separate `apps/api`, and Back Office product scope remain outside the active MVP path unless a future human-approved ADR or feature reintroduces them.
  Date/Author: 2026-05-17 / Codex

- Decision: Treat API, database, background jobs, and E2E tests as first-class roadmap slices rather than hidden implementation details.
  Rationale: The stories depend on durable data, document status, auth, and observable validation. These platform tasks must be visible so implementation does not produce isolated UI screens without working behavior.
  Date/Author: 2026-05-11 / Codex

- Decision: Keep Stripe in the roadmap as deferred until payment stories are approved.
  Rationale: The stack ADR accepts Stripe as the payment provider, but current MVP requirements and stories exclude billing from the first owner-facing implementation.
  Date/Author: 2026-05-11 / Codex

- Decision: Make Polish the default language for the first MVP and provide an English switch.
  Rationale: The human explicitly clarified that Polish-first language support with an English option is part of the MVP. This affects landing page, Web MVP, Mobile MVP, validation tests, and safety/legal copy.
  Date/Author: 2026-05-11 / Codex

- Decision: Implement the accepted landing-page segmented validation stories before starting the product-app platform foundation.
  Rationale: The public landing page is the current acquisition and validation surface. Its accepted stories now include consent, owner waitlist capture, provider and clinic research-interest capture, MailerLite upsert behavior, and validation event capture. Completing this slice produces immediate validation evidence while preserving the later Web MVP platform sequence.
  Date/Author: 2026-05-12 / Codex

- Decision: Use explicit landing-page source values across MailerLite and analytics.
  Rationale: The accepted feature and story set standardizes `landing_page_hero`, `landing_page_mid_cta`, `landing_page_footer`, `landing_page_wave2`, and `landing_page_wave3`. Reusing these values prevents lead capture and validation reporting from drifting apart.
  Date/Author: 2026-05-12 / Codex

- Decision: Keep Milestone 0 as an iteration on the existing React/Vite landing page rather than a new page or product-app scaffold.
  Rationale: The current UI already uses the approved Caniello brand assets and matches the Wave 1 visual direction closely enough to evolve. The accepted stories require consent, segmentation, MailerLite, analytics, Polish-first behavior, and Wave 2/Wave 3 framing; rebuilding the page would add risk without improving validation.
  Date/Author: 2026-05-12 / Codex

- Decision: Treat the three landing mockups as design direction with `image 1.png` as the primary composition target and `image 2.png`/`image 3.png` as research-stage content references.
  Rationale: The requirement says the images are references rather than final production assets. The current app already implements the `caniello-better-care-landing.png` baseline; the missing work is to add compact future-wave cards and research-interest capture without implying active Wave 2 or Wave 3 products.
  Date/Author: 2026-05-12 / Codex

- Decision: Add a deployment-safe `api/landing-leads.ts` server boundary for MailerLite upserts rather than sending MailerLite requests from browser code.
  Rationale: The accepted story requires that MailerLite secrets are never exposed to browser code. MailerLite's documented create/upsert subscriber endpoint supports non-destructive subscriber updates and group additions, so the boundary can preserve existing groups while adding Caniello segmentation.
  Date/Author: 2026-05-12 / Codex

- Decision: Use one configured MailerLite group, `Caniello Waitlist`, and send only the subscriber email plus group membership to MailerLite.
  Rationale: The human explicitly chose the simplest possible MailerLite integration. Caniello still validates role, wave, source, and consent server-side, but MailerLite is only the waitlist sink for now and does not receive extra segmentation fields.
  Date/Author: 2026-05-13 / Codex

- Decision: Implement validation events through a small server-side API boundary while keeping the final analytics sink undecided.
  Rationale: The analytics provider remains undecided, but the landing page should not treat analytics consent as only local UI behavior. `/api/validation-events` accepts consent and validation event payloads without exposing vendor credentials; browser localStorage is used only to remember whether the visitor has already made an analytics choice.
  Date/Author: 2026-05-12 / Codex

- Decision: Move the remaining public-launch legal, privacy, and medical-boundary work into this roadmap instead of the landing notes backlog.
  Rationale: The human clarified that "backlog" meant `spec/plans/caniello-mvp-implementation-roadmap.md`. Keeping this follow-up in the ExecPlan makes it visible to the next implementation agent and prevents a second backlog source from drifting.
  Date/Author: 2026-05-14 / Codex

## Outcomes & Retrospective

Milestone 2 local platform foundation implementation evidence is ready for human review as of 2026-05-19. The web app now exposes dynamic no-store `/api/health` and `/api/version` endpoints, shared contracts validate health/version payloads, `packages/db` centralizes Supabase environment handling, `.env.example` documents public and server-only platform placeholders, and `infra/supabase/migrations/20260519000100_mvp_foundation.sql` defines the first owner data tables with RLS enabled. Validation evidence is recorded in `spec/validation/milestone-2-platform-foundation-validation.md`. This implementation does not collect health records from public users, does not start Supabase services, and does not mark validation or release accepted.

Milestone 0 implementation, validation evidence, visual direction, and release-readiness records are accepted as of 2026-05-14. The landing page now defaults to Polish, preserves an English switch, renders Wave 1 value, captures landing lead interest through consent-gated forms, preserves source and UTM metadata, routes lead submissions through a server-side MailerLite boundary, records validation events through `/api/validation-events` only after analytics consent, and includes updated responsive Playwright screenshots under `spec/validation/screenshots/`. After human visual feedback, the mid-page process, CTA, future-wave cards, and final signup strip were revised to align more closely with the compact `image 1.png` mockup.

Validation passed for `npm run test`, `npm run lint`, `npm run build`, and `npm run test:e2e`. The E2E check required the official Playwright container image because the Alpine app container could not launch the downloaded Playwright fallback browser. The MailerLite API token is configured locally in ignored `.env.local`, and a read-only lookup verified the `Caniello Waitlist` group. Acceptance of the advisory records does not itself merge, deploy, launch public traffic, tag, announce, or mark a production release complete. Public launch remains gated by the backlog work for Privacy Policy, Terms of Service, medical boundaries, live MailerLite smoke testing, deployment target, rollback path, analytics/storage decisions where required, and intentional staging of the release candidate.

## Context and Orientation

Supersession notice for readers and agents: the remaining sections of this older roadmap preserve historical Milestone 0 evidence and pre-ADR planning context. Any later instruction in this file that says to build a FastAPI backend, create a separate `api/` or `apps/api` implementation, keep React/Vite as the active web runtime, use npm/package-lock as the active package-management path, expose the web app on port `5173`, or deliver Back Office as part of the MVP is superseded by ADR 0001-0011 and by `spec/plans/completed-foundation-plans.md`. The active MVP path is Next.js App Router under `apps/web`, Next.js API routes under `apps/web/app/api`, pnpm workspaces, Turborepo, Supabase local foundation, Dev Containers, and one Vercel project rooted at `apps/web`.

Caniello is a pet health and care organization utility. Its first MVP promise is one place for a pet's health records, reminders, documents, and shareable care information. The existing landing page is implemented with React, TypeScript, Vite, TailwindCSS, Docker, Vitest, and Playwright.

The superseded historical stack decision is `spec/architecture-records/0000-superseded-caniello-mvp-stack.md`: React for web, React Native for mobile, Python with FastAPI for backend, Vercel for deployment, Supabase for Postgres/Auth/Storage, Stripe for payments, and MailerLite for marketing and waitlist email.

The main owner-facing requirement is `spec/requirements/owner-facing-mvp.md`. The back-office requirement is `spec/requirements/back-office-mvp.md`. The first landing page requirement is `spec/requirements/first-landing-page.md`. The refined landing-page validation requirement is `spec/requirements/landing-page-segmented-validation.md`; it adds owner waitlist capture, future-wave research-interest capture, MailerLite lead handling, privacy/consent behavior, and validation instrumentation.

The roadmap uses these terms:

Web MVP means the authenticated browser application for owners and beta operators. It is separate from the public landing page.

Mobile MVP means the React Native application focused on owner onboarding, camera-first document capture, daily reminders, timeline, Ask Caniello, and sharing.

Polish-first language support means the first MVP opens in Polish by default and offers an English switch. English mockups in `spec/notes/` are layout references unless a human separately approves English as final copy.

FastAPI is the Python backend framework from the superseded historical path. The active MVP API boundary is Next.js API routes under `apps/web/app/api`, with Supabase owning data, auth, storage, and RLS. FastAPI should not be implemented unless a later human-approved ADR reintroduces it.

Database container means a local development Postgres-compatible service that lets contributors run API tests and migrations without touching production data. Because Supabase is the accepted hosted database provider, the database schema and SQL should remain compatible with Supabase Postgres.

E2E tests are end-to-end browser or mobile-flow tests. For web, use Playwright because the project already has `npm run test:e2e`. For mobile, add a React Native E2E strategy only after the mobile scaffold exists and the team chooses the tool.

MailerLite upsert means the landing page sends a lead to MailerLite in a way that creates the subscriber if the email is new and updates the existing subscriber if the email already exists. The update must add relevant groups and fields without removing previous groups for the same email.

Lead-capture consent means the visitor explicitly agrees to submit their email and related metadata for waitlist or research-interest follow-up. For the first public landing-page baseline, Caniello must not send lead data to MailerLite unless this consent is present.

Analytics consent means the visitor explicitly allows non-essential validation events. For the first public landing-page baseline, page views and form interaction events are not sent to an analytics system until this consent is granted.

## Roadmap Overview

Milestone 0 is Landing Page and acquisition validation. Its implementation and evidence are accepted. The landing page is now the Polish-first validation surface for Wave 1 owner value, research-safe Wave 2 and Wave 3 framing, lead-capture consent, analytics consent, MailerLite waitlist submission, validation-event routing, UTM preservation, and responsive screenshot evidence. Remaining Milestone 0 work is public-launch preparation rather than core landing implementation: Privacy Policy, Terms of Service, medical-boundary copy, live MailerLite smoke testing, deployment target, rollback path, analytics/storage decisions where needed, and final staging.

Milestone 1 is Architecture and platform design. ADRs 0001-0021 are accepted and define the remaining MVP platform boundaries: Next.js App Router in `apps/web`, Vercel deployment, Supabase data/auth/storage/RLS, pnpm/Turborepo, Dev Containers, MailerLite for marketing and waitlist lifecycle email, Stripe deferred until paid-plan stories are approved, and separate decisions for identity/access, data lifecycle, AI document intake, sharing/export, messaging, and observability. Milestone 1 prevents API, database, auth, storage, integration, and worker choices from being improvised during feature work.

Milestone 2 is Local platform foundation. Add the first Supabase-backed foundation under the accepted monorepo path: local Supabase start, migrations and seed structure, RLS skeletons, shared contracts and database helpers, lightweight Next.js health/version API routes, environment examples, and validation commands through pnpm/Turborepo. Do not add FastAPI, a separate API service, or a production Docker path unless a later human-approved ADR reopens that scope.

Milestone 3 is Web MVP owner foundation. Implement account/privacy, first-pet onboarding, and the home workspace in the browser app against the backend.

Milestone 4 is Web MVP document memory loop. Implement upload, processing status, review/confirm, documents library, timeline, and reminders. This is the first complete activation loop.

Milestone 5 is Web MVP assistant and sharing. Implement sourced Ask Caniello behavior, medical safety boundaries, care summary preview, share links, PDF export, and revocation.

Milestone 6 is Mobile MVP. Build the React Native app after the API contracts and core web owner flow stabilize. Start with mobile onboarding and scan/upload, then add review, home, timeline, reminders, Ask Caniello, and sharing.

Milestone 7 is Back Office MVP. Implement admin auth/RBAC, dashboard/system health, user support console, support actions, review queue, review detail actions, audit log, and AI safety visibility.

Milestone 8 is hardening, validation, and release readiness. Add full E2E coverage, CI gates, performance and security checks, operational recovery notes, validation evidence, and release-readiness artifacts.

## Feature-by-Feature and Story-by-Story Sequence

### Milestone 0: Landing Page

The landing page is the public acquisition surface and should remain narrow, but it is no longer only a static positioning page. It must validate owner demand for Wave 1 while separately measuring research-stage interest from pet service providers and clinics or veterinarians. Wave 2 and Wave 3 must remain visibly framed as research so the page does not imply that marketplace or clinic collaboration products are available.

Source artifacts:

- `spec/requirements/first-landing-page.md`
- `spec/requirements/landing-page-segmented-validation.md`
- `spec/plans/completed-foundation-plans.md`
- `spec/features/landing-page-mvp-value-experience.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/features/landing-page-validation-instrumentation.md`
- `spec/design/caniello-visual-direction.md`
- `spec/notes/landing/backlog.md`
- `spec/notes/landing/image 1.png`
- `spec/notes/landing/image 2.png`
- `spec/notes/landing/image 3.png`

Milestone 0 implementation state:

The current app is a React/Vite landing-page application with Polish-first and English copy, shared landing page sections, dedicated Wave 2 Marketplace exploration and Wave 3 Clinic research routes, consent-gated waitlist forms, a server-side MailerLite boundary in `api/landing-leads.ts`, and a validation-event API in `api/validation-events.ts`. The UI has been iterated against `spec/notes/landing/image 1.png`, `spec/notes/landing/image 2.png`, `spec/notes/landing/image 3.png`, and the accepted `spec/design/caniello-visual-direction.md`. Unit, build, lint, and Playwright evidence are recorded in accepted validation artifacts under `spec/validation/`.

The accepted visual and product direction preserves the Caniello brand, wordmark, pet/app hero image, serif headline style, navy/gold/cream palette, compact Wave 1 composition, and research-safe Wave 2/Wave 3 pages. The release-readiness artifacts accept the advisory evidence but deliberately do not merge, deploy, launch public traffic, tag, announce, or complete a production release.

Completed implementation record:

1. The page became language-ready with Polish as default and English switching.
2. The consent baseline was implemented for lead capture and analytics events.
3. The hero and MVP value sections were tightened around records, reminders, documents, and owner-controlled sharing.
4. The "What's next" section and dedicated Wave 2/Wave 3 routes were kept research-safe and avoid active-product language.
5. Footer, trust, responsive layout, and final waitlist access were implemented with placeholder legal links pending public-launch content.
6. Landing lead capture was simplified to the current approved MailerLite waitlist model: server-side validation preserves source, language, consent, and UTM context while MailerLite receives only the configured waitlist group membership and subscriber email.
7. Validation events route through `/api/validation-events` after analytics consent.
8. Unit, lint, build, and Playwright checks were run and recorded in accepted validation artifacts.

Remaining Milestone 0 backlog before public launch:

1. Prepare and implement Privacy Policy content for the landing page and lead-capture flow.
2. Prepare and implement Terms of Service content for the landing page.
3. Prepare and implement medical-boundary copy that clearly says Caniello does not diagnose, does not provide medical advice, does not replace a veterinarian, and does not replace an official pet passport.
4. Ensure footer links lead to working Privacy Policy and Terms of Service pages before public traffic.
5. Ensure form and trust-section copy clearly explains data use and contact consent.
6. Submit the legal/privacy/medical-boundary content for human/legal review before public launch.

Known controller details for the Privacy Policy draft:

- Full name: Cloud & More Maciej Gos.
- Trading name: Cloud & More.
- NIP: 5242507722.
- Address: B. Prusa 43/20, 05-800 Pruszków.
- Privacy contact email: `privacy@caniello.com`.
- General contact email: `hello@caniello.com`.

Story order:

1. `spec/stories/polish-first-language-switching.md`
2. `spec/stories/landing-page-consent-and-analytics-policy-baseline.md`
3. `spec/stories/landing-page-hero-and-mvp-value.md`
4. `spec/stories/landing-page-future-waves-research-framing.md`
5. `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
6. `spec/stories/landing-page-owner-waitlist-capture.md`
7. `spec/stories/landing-page-provider-and-clinic-interest-capture.md`
8. `spec/stories/landing-page-mailerlite-subscriber-upsert.md`
9. `spec/stories/landing-page-validation-events-and-utm-capture.md`

Current and likely source files for Milestone 0 follow-up:

- `src/` contains the React/Vite landing app, shared page sections, waitlist form, content, and routes.
- `api/landing-leads.ts` contains the server-side MailerLite lead boundary.
- `api/validation-events.ts` contains the server-side validation-event boundary.
- `src/App.test.tsx` and `tests/e2e/landing.spec.ts` cover unit/integration and Playwright browser behavior.
- The next public-launch backlog will likely touch landing content, footer/legal routing, and tests for Privacy Policy, Terms of Service, and medical-boundary visibility.

Validation:

- Run `pnpm build`, `pnpm test`, `pnpm lint`, and `pnpm test:e2e` on the active monorepo path.
- Verify the landing page opens in Polish by default and can switch to English without losing entered form state unexpectedly.
- Verify the rendered page still follows the current Caniello brand direction: wordmark, navy/gold/cream palette, pet/app hero image, compact feature/process blocks, and mockup-informed future-wave cards.
- Verify landing waitlist submissions preserve source, language, consent, and UTM context.
- Verify Wave 2 Marketplace and Wave 3 Clinic routes remain research-framed and do not present active marketplace, booking, payment, clinic SaaS, diagnosis, treatment, or official passport-replacement scope.
- Verify generic waitlist capture does not send role or interest-wave segmentation before the later MailerLite survey exists.
- Verify missing lead-capture consent blocks MailerLite submission and shows a clear consent message.
- Verify MailerLite submission remains server-side and does not expose secrets to browser code.
- Verify non-essential analytics events are blocked before analytics consent and recorded after analytics consent.
- Verify UTM values are preserved in lead metadata after lead consent and event metadata after analytics consent.
- Verify Wave 2 and Wave 3 copy does not say `coming soon`, `launching next`, `available now`, or equivalent launch-commitment language.
- Verify public-launch backlog changes provide working Privacy Policy, Terms of Service, and medical-boundary access before public traffic.
- Capture Playwright screenshots for desktop and mobile under `spec/validation/screenshots/`.

Milestone 0 recovery guidance:

If the language switch introduces layout breakage, keep the current English content as a temporary comparison fixture in tests while fixing Polish copy overflow. If MailerLite credentials or group IDs are unavailable, implement the server-side boundary with configuration validation and mocked tests, then mark live MailerLite verification as blocked in `spec/validation/` until the human provides the required environment values. If the analytics provider remains undecided, implement consent state, UTM parsing, and an internal event adapter interface first, then wire the approved sink later without changing form behavior.

### Milestone 1: Architecture and Platform Readiness

This milestone produces decisions, not product code. It must happen before backend and product implementation because it defines the system boundaries.

Source artifacts:

- `spec/architecture-records/0000-superseded-caniello-mvp-stack.md`
- `spec/requirements/owner-facing-mvp.md`
- `spec/requirements/back-office-mvp.md`

Accepted ADR and solution-design coverage:

1. Platform topology and deployment boundary: ADR 0001, 0003, 0005, 0009, 0010, 0011, and ADR 0013 keep the MVP in one Next.js web app on Vercel with Supabase-backed data services and Dev Containers for local development.
2. Identity and access: ADR 0004 and ADR 0014 choose Supabase Auth, owner sessions, minimal roles, explicit operator constraints, MFA requirement before operator/admin data access, and audit behavior for sensitive actions.
3. Data lifecycle: ADR 0004 and ADR 0015 assign schema, migrations, RLS, Storage, retention, export/deletion, backup/recovery, and audit-log expectations to the Supabase-backed platform foundation.
4. AI document intake pipeline: ADR 0016 starts with deterministic processing states and server-side orchestration in Next.js/Supabase, deferring real OCR/AI provider choice until a dedicated ADR/story defines provider, data flow, retry, and evaluation behavior.
5. Sharing/export: ADR 0002, 0003, 0004, 0009, and ADR 0017 define `/share/[token]`, opaque scoped tokens, revocation, optional expiry, access logging, and deferred PDF generation.
6. Messaging: ADR 0008 and ADR 0018 keep MailerLite for marketing, waitlist, early-access lifecycle email, and surveys while deferring product transactional email provider choice to the relevant story.
7. Observability and operations: ADR 0005, 0008, 0009, and ADR 0019 define Vercel logs, Vercel Analytics, Speed Insights, Supabase operational visibility, future application events, deferred PostHog, health checks, and incident/recovery expectations.
8. Payments: ADR 0020 records Stripe as the accepted payment provider with implementation deferred until paid-plan requirements or stories are approved.
9. AI provider routing: ADR 0021 chooses Vercel AI Gateway as the server-side model access boundary with data-minimization, observability, retry/fallback, and safety constraints that complement ADR 0016.

Validation:

- Each ADR 0013-0021 has `Status`, `Context`, `Decision`, `Consequences`, and `Related Artifacts`.
- Each architecture decision is captured in a separate ADR file and reflected in `spec/architecture/mvp-target-architecture.md` diagrams.
- Milestone 1 is complete after human acceptance of ADRs 0013-0021 on 2026-05-19.

### Milestone 2: Local Platform Foundation

At the end of this milestone, contributors can run the Next.js web app from the pnpm/Turborepo workspace, start the local Supabase stack when data/Auth/Storage/RLS work begins, and call lightweight Next.js health/version endpoints. Migrations, seed data, RLS skeletons, shared contracts, and database helpers are in their accepted monorepo locations.

Features enabled:

- `spec/features/owner-account-privacy-foundation.md`
- `spec/features/pet-onboarding-and-workspace.md`

Stories supported:

- `spec/stories/account-signup-login-and-session.md`
- `spec/stories/create-first-pet-profile.md`

Back-office access remains deferred from the active MVP unless a later human-approved ADR or feature reintroduces it.

Implementation tasks:

1. Add lightweight Next.js health and version API routes under `apps/web/app/api/health/route.ts` and `apps/web/app/api/version/route.ts`.
2. Keep shared payload schemas and API contracts in `packages/contracts`.
3. Add or complete Supabase client and repository-style helpers in `packages/db` without scattering raw Supabase queries through UI components.
4. Add local environment examples in `.env.example` with non-secret placeholders for Supabase URL, Supabase anon key, Supabase service role key, Vercel app URLs, Stripe keys for deferred billing, MailerLite key, and analytics settings.
5. Keep migration tooling under `infra/supabase/migrations/`; the first schema should cover user/profile references, households, pets, documents, extracted fields, timeline events, reminders, share links, audit logs, and processing jobs at a minimal level.
6. Add RLS policy skeletons before exposing private pet, document, reminder, account, or sharing data.
7. Add tests for health/version routes, shared contracts, Supabase helper construction, and migration presence.
8. Update README and AGENTS only after tooling is real and reproducible.

Expected local commands after this milestone:

    pnpm install
    pnpm dev
    pnpm lint
    pnpm test
    pnpm build
    pnpm test:e2e
    pnpm exec supabase start --workdir infra/supabase

Validation:

- `GET /api/health` in the Next.js app returns HTTP 200.
- The API can connect to the local database.
- Migrations can be applied from a clean database.
- The web app can read an API health value in a controlled test or smoke page without exposing secrets.

### Milestone 3: Web MVP Owner Foundation

At the end of this milestone, a browser user can authenticate, satisfy privacy/consent boundaries, create a first pet, choose the document-first path, and land in a useful home workspace.

Features:

- `spec/features/owner-account-privacy-foundation.md`
- `spec/features/pet-onboarding-and-workspace.md`

Story order:

1. `spec/stories/account-signup-login-and-session.md`
2. `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`
3. `spec/stories/polish-first-language-switching.md`
4. `spec/stories/data-export-and-account-deletion.md`
5. `spec/stories/create-first-pet-profile.md`
6. `spec/stories/onboarding-first-document-choice.md`
7. `spec/stories/home-whats-next-workspace.md`

Implementation tasks:

1. Add app routing for public landing, auth screens, onboarding, and authenticated app shell.
2. Integrate Supabase Auth according to ADR 0013 after it is accepted or revised by the human.
3. Implement Polish-first language behavior with an English switch before broadening owner flows.
4. Implement cookie consent and policy/disclaimer surfaces before analytics or MailerLite tracking.
5. Implement first-pet creation through Next.js API/server boundaries and Supabase.
6. Implement home workspace using real pet, reminder, document, and pending-review data where available, with empty states when not available.
7. Add unit and integration tests for auth states, language switching, pet creation, onboarding branches, and home states.
8. Add Playwright E2E tests for signup/login mock or test auth flow, Polish default, English switch, create first pet, and reach Home.

Validation:

- `pnpm test` covers component, contract, server-boundary, and state behavior.
- API/server-boundary tests cover owner profile and pet creation.
- `pnpm test:e2e` proves a user can reach the web app in Polish by default, switch to English, create or use a test session, add a pet, and see the home workspace.

### Milestone 4: Web MVP Document Memory Loop

At the end of this milestone, a browser user can upload a document, see processing status, review extracted fields, confirm trusted records, and see timeline/reminder outputs.

Features:

- `spec/features/ai-document-intake-and-review.md`
- `spec/features/care-timeline-and-reminders.md`

Story order:

1. `spec/stories/upload-or-scan-document.md`
2. `spec/stories/document-processing-status.md`
3. `spec/stories/review-edit-confirm-extraction.md`
4. `spec/stories/documents-library-and-detail.md`
5. `spec/stories/timeline-from-confirmed-records.md`
6. `spec/stories/reminder-suggestions-and-management.md`
7. `spec/stories/reminder-notification-preferences.md`

Implementation tasks:

1. Implement signed upload flow through Next.js API/server boundaries and Supabase Storage.
2. Implement document metadata, processing job records, and status transitions.
3. Add a worker or queue process according to the AI document pipeline ADR. For early local testing, this may use deterministic fake extraction before a real OCR/AI provider is introduced.
4. Implement review/edit/confirm UI using mockups from `spec/notes/web`.
5. On confirmation, create timeline events and reminder suggestions from confirmed fields only.
6. Implement documents library and detail views.
7. Implement reminders list, edit, complete, and notification preferences.
8. Add API/server-boundary, worker or deterministic-processing, and E2E tests for the full upload-to-confirm-to-timeline flow.

Validation:

- API tests prove upload metadata, processing state transitions, review edits, confirmation, timeline creation, and reminder creation.
- Worker tests prove retryable job behavior.
- Playwright E2E proves a user can upload a sample fixture, see processing, review fields, confirm, and then see document, timeline, and reminder updates.

### Milestone 5: Web MVP Assistant and Sharing

At the end of this milestone, a browser user can ask sourced questions about confirmed records and share a read-only care summary by link or PDF.

Features:

- `spec/features/ask-caniello-sourced-assistant.md`
- `spec/features/care-summary-sharing.md`

Story order:

1. `spec/stories/ask-caniello-chat-with-sources.md`
2. `spec/stories/ask-caniello-medical-safety.md`
3. `spec/stories/care-summary-preview.md`
4. `spec/stories/share-link-pdf-export-and-revocation.md`

Implementation tasks:

1. Add retrieval over confirmed pet records, documents, timeline events, and reminders.
2. Add Ask Caniello API endpoint behind server-side model/provider boundaries.
3. Add medical safety refusals and source references.
4. Add summary preview from verified profile, medication, vaccination, allergy, note, document, and reminder data.
5. Add share-link token creation, recipient read-only view, revocation, and audit logging.
6. Add PDF export according to sharing/export ADR.
7. Add tests for source-backed answers, no-record answers, unsafe medical prompts, share creation, revoked access, and PDF output.

Validation:

- API tests cover assistant grounding and safety cases.
- Playwright E2E covers asking a sourced question, seeing a source, generating a summary, opening a share link, exporting PDF, and revoking the link.

### Milestone 6: Mobile MVP

At the end of this milestone, a mobile user can complete the same core owner loop with mobile-appropriate navigation and camera-first document capture.

Features:

- `spec/features/pet-onboarding-and-workspace.md`
- `spec/features/ai-document-intake-and-review.md`
- `spec/features/care-timeline-and-reminders.md`
- `spec/features/ask-caniello-sourced-assistant.md`
- `spec/features/care-summary-sharing.md`

Story order:

1. Reuse `spec/stories/account-signup-login-and-session.md` for mobile auth.
2. Reuse `spec/stories/polish-first-language-switching.md`.
3. Reuse `spec/stories/create-first-pet-profile.md`.
4. Reuse `spec/stories/onboarding-first-document-choice.md`.
5. Implement mobile-specific scan path from `spec/stories/upload-or-scan-document.md`.
6. Reuse review, home, documents, timeline, reminders, Ask, and sharing stories with mobile UI acceptance.

Implementation tasks:

1. Add React Native app workspace only after the API contracts are stable.
2. Decide whether the repository becomes a monorepo with `apps/web`, `apps/mobile`, and `api`, or whether mobile lives in a separate app folder. Record the decision before moving files.
3. Implement mobile auth, language selection, and pet onboarding against the same backend.
4. Implement camera capture and upload using platform permissions.
5. Implement review/confirm, Home, timeline, documents, reminders, Ask Caniello, and sharing with mobile layouts from `spec/notes/web` mobile mockups.
6. Add mobile unit tests and an E2E approach after the React Native stack is chosen.

Validation:

- Mobile app runs locally against the same API/database stack.
- Mobile user can open Polish by default, switch to English, sign in, add pet, scan/upload, review/confirm, see timeline/reminder, ask a sourced question, and generate/share a summary.
- Mobile camera permission denial and upload failure states are validated.

### Milestone 7: Back Office MVP

At the end of this milestone, authorized beta operators can safely support users, monitor health, and review AI extraction issues.

Features:

- `spec/features/back-office-access-control.md`
- `spec/features/back-office-support-console.md`
- `spec/features/back-office-ai-review-queue.md`
- `spec/features/back-office-health-audit-and-ai-safety.md`

Story order:

1. `spec/stories/back-office-admin-auth-and-rbac.md`
2. `spec/stories/back-office-dashboard-and-system-health.md`
3. `spec/stories/back-office-global-search-and-user-detail.md`
4. `spec/stories/back-office-support-actions-and-notes.md`
5. `spec/stories/back-office-review-queue-triage.md`
6. `spec/stories/back-office-review-detail-actions.md`
7. `spec/stories/back-office-audit-log-and-ai-safety.md`

Implementation tasks:

1. Implement admin identity boundary, MFA, RBAC, and privileged session behavior according to the auth ADR.
2. Implement admin app shell and dashboard using the back-office mockups from `spec/notes/back-office`.
3. Implement user search and user detail with permission-limited sensitive data.
4. Implement support actions and internal notes with audit logging.
5. Implement review queue and review detail actions against real document-processing states.
6. Implement audit log, activity feed, system health, and AI safety views.
7. Add E2E tests for admin login, dashboard, user lookup, support action, review approval/flag/reprocess, and audit evidence.

Validation:

- API tests cover RBAC and audit behavior.
- Playwright E2E covers the key admin flows using seeded beta data.
- Unauthorized roles cannot access privileged actions.

### Milestone 8: Hardening, CI/CD, Release Readiness

At the end of this milestone, the MVP has automated validation gates and durable release evidence.

Implementation tasks:

1. Add CI commands for web build, web tests, web lint, API tests, migration checks, and E2E tests.
2. Add seeded E2E fixtures for owner and admin flows.
3. Add validation artifacts under `spec/validation/` for each release slice.
4. Add release-readiness artifacts under `spec/release-readiness/` before any human release decision.
5. Add observability, backup, restore, and incident-recovery evidence according to the operations ADR.
6. Keep lifecycle learnings under `spec/lifecycle/` after release or sustained beta usage.

Validation:

- CI passes all required checks.
- Validation artifacts distinguish passed, failed, skipped, unavailable, and future checks.
- Release-readiness notes include unresolved risks, rollback/recovery notes, and explicit human approval state.

## Concrete Steps for the Next Implementation Slice

Do not start product implementation until the human approves this roadmap or explicitly asks Codex to begin.

Milestone 0 implementation and advisory release-readiness evidence are accepted. The recommended next slice is the Milestone 0 public-launch backlog for legal, privacy, and medical-boundary content. This slice should not expand product scope. It should replace placeholder legal/trust handling with working Privacy Policy and Terms of Service pages or routes, add clear medical-boundary copy, and keep the landing page's current consent and MailerLite behavior intact.

From `/Users/macg/Code/caniello`, begin by checking the working tree:

    git status --short

Create a feature branch before edits:

    git checkout -b codex/landing-legal-medical-boundaries

Inspect the accepted landing-page and release-readiness artifacts before editing source code:

    sed -n '1,220p' spec/requirements/landing-page-segmented-validation.md
    sed -n '1,220p' spec/stories/landing-page-consent-and-analytics-policy-baseline.md
    sed -n '1,220p' spec/stories/landing-page-footer-legal-and-responsive-trust.md
    sed -n '1,220p' spec/stories/cookie-consent-privacy-and-medical-boundaries.md
    sed -n '1,220p' spec/validation/landing-page-validation-history.md
    sed -n '1,220p' spec/release-readiness/landing-page-release-readiness-history.md

Implement the public-launch backlog in this order:

1. Add or update landing content for a working Privacy Policy route or page.
2. Add or update landing content for a working Terms of Service route or page.
3. Add medical-boundary copy in the landing trust/legal surface explaining that Caniello does not diagnose, does not provide medical advice, does not replace a veterinarian, and does not replace an official pet passport.
4. Update footer links and any legal placeholders so visitors can reach the new content before public traffic.
5. Keep MailerLite, consent, analytics, UTM, and research-wave behavior unchanged unless a new accepted story explicitly changes them.
6. Add or update focused tests for legal links and medical-boundary copy.

Run validation for this public-launch backlog slice on the active monorepo path:

    pnpm build
    pnpm test
    pnpm lint
    pnpm test:e2e

After this public-launch backlog is validated and accepted, the next product-app slice is Milestone 2 local platform foundation, without building owner features yet. Accepted ADRs 0013-0021 supply the missing Milestone 1 decisions for topology, auth, data lifecycle, AI pipeline, AI provider routing, sharing/export, messaging, payments, and observability.

Use accepted ADRs 0013-0021 as the boundary for Milestone 2. Add or validate local platform files under the accepted monorepo path:

    apps/web/app/api/health/route.ts
    apps/web/app/api/version/route.ts
    packages/contracts/
    packages/db/
    infra/supabase/config.toml
    infra/supabase/migrations/
    infra/supabase/seed.sql
    .env.example

Keep Docker Compose focused on the Dev Container workspace and supporting local services. Use Supabase CLI for the local database/Auth/Storage/RLS stack instead of adding a separate FastAPI API service or hand-written Postgres-only development path.

Add expected commands to README only after they work:

    pnpm install
    pnpm dev
    pnpm lint
    pnpm test
    pnpm build
    pnpm test:e2e
    pnpm exec supabase start --workdir infra/supabase

## Validation and Acceptance

This roadmap is ready for implementation only when the human approves or revises the sequence and explicitly authorizes implementation.

For Milestone 0, acceptance should prove the landing page is a consent-safe validation instrument:

- A first-time visitor sees Caniello's Wave 1 owner-side promise, MVP value cards, simple process, research-safe future-wave framing, and a footer with legal/trust access.
- Polish is the default landing language, and English switching works without changing the medical, privacy, or scope boundaries.
- A visitor can submit a valid waitlist email only after required lead-capture consent, and each submission preserves source, language, consent, and UTM context.
- The main landing page links to Wave 2 Marketplace exploration and Wave 3 Clinic research views without presenting either as an active product.
- Wave 2 and Wave 3 pages preserve research framing, unavailable-scope copy, and generic waitlist capture without sending role or interest-wave segmentation before the later MailerLite survey exists.
- MailerLite can receive the subscriber email in the configured `Caniello Waitlist` group through the server-side boundary without exposing secrets to browser code.
- Non-essential analytics events are not sent before analytics consent, and after analytics consent the team can count page views, waitlist successes, waitlist errors, Wave 2 interest, Wave 3 interest, and UTM context.
- `pnpm build`, `pnpm test`, `pnpm lint`, and `pnpm test:e2e` pass.
- Before public launch, working Privacy Policy, Terms of Service, and medical-boundary content are added and accepted.

For Milestone 2, acceptance should be observable:

- The Dev Container workspace builds and can run pnpm/Turborepo commands.
- Visiting `http://localhost:3000` shows the existing Next.js web app.
- Calling a lightweight Next.js health endpoint returns HTTP 200 with a simple healthy response.
- Supabase local services can start through `pnpm exec supabase start --workdir infra/supabase` when schema/RLS work begins.
- Running migrations from an empty local Supabase database succeeds once the first schema migration exists.
- Running `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` still passes the existing landing and API-route checks.

For Web MVP milestones, acceptance should be end-to-end:

- A test owner can sign in, add a pet, upload a sample document, see processing status, review and confirm fields, see timeline/reminder updates, ask a sourced question, generate a summary, open a share link, export PDF, and revoke access.
- Polish is the default language, and English switching works across representative owner flows.

For Mobile MVP, acceptance should prove the same owner value on a mobile device or simulator:

- A test owner can open Polish by default, switch to English, sign in, add a pet, scan or upload a document, review and confirm, see reminders/timeline, ask a sourced question, and share a summary.

For Back Office MVP, acceptance should prove safe beta operations:

- A permitted admin can log in, inspect dashboard health, search a user, take a support action, review an AI extraction, flag or approve it, and see audit evidence.
- A role without permission is blocked from privileged actions.

## Idempotence and Recovery

Roadmap work is documentation-only and can be revised safely. Implementation work should be additive and branch-based. Do not delete existing landing page files or rewrite the current app structure until a topology decision says where web code should live.

Docker Compose changes should preserve the existing `web` service. Add `api` and `db` services without breaking `docker compose up` for the landing page. If database migrations fail, reset only the local development volume after confirming no real or user-provided data lives there.

Secrets must not be committed. Use `.env.example` for variable names and keep real values in local `.env` files or deployment environment variables.

## Interfaces and Dependencies

The accepted dependency direction is Next.js and React for web, React Native and Expo for mobile, Next.js API routes for MVP backend-for-frontend boundaries, Vercel for deployment and rollback, Supabase for Postgres/Auth/Storage/RLS, Stripe for deferred payments, and MailerLite for marketing, waitlist, early-access lifecycle email, and surveys.

Next.js API routes should expose clear owner-facing resources for pets, documents, extraction reviews, timeline events, reminders, assistant questions, summaries, share links, and account data controls when their stories enter implementation. Administrative resources remain deferred; any temporary operator utilities must be narrow, server-side, audited, and explicitly approved before touching user data.

Supabase should persist durable product state: pets, households, documents, extracted fields, confirmed records, timeline events, reminders, share links, processing jobs, audit entries, account data controls, and any approved operator/support records. Raw files and generated exports should live in Supabase Storage or a local Supabase-compatible development path defined by migrations and storage policies.

The E2E test suite should start with Playwright for web because it already exists. It should later include seeded user and admin flows, not only landing-page checks.

## Artifacts and Notes

Primary source artifacts:

- `spec/requirements/first-landing-page.md`
- `spec/requirements/landing-page-segmented-validation.md`
- `spec/requirements/owner-facing-mvp.md`
- `spec/requirements/back-office-mvp.md`
- `spec/architecture-records/0000-superseded-caniello-mvp-stack.md`
- `spec/features/landing-page-mvp-value-experience.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/features/landing-page-validation-instrumentation.md`
- `spec/features/owner-account-privacy-foundation.md`
- `spec/features/pet-onboarding-and-workspace.md`
- `spec/features/ai-document-intake-and-review.md`
- `spec/features/care-timeline-and-reminders.md`
- `spec/features/ask-caniello-sourced-assistant.md`
- `spec/features/care-summary-sharing.md`
- `spec/features/back-office-access-control.md`
- `spec/features/back-office-support-console.md`
- `spec/features/back-office-ai-review-queue.md`
- `spec/features/back-office-health-audit-and-ai-safety.md`
- `spec/stories/landing-page-consent-and-analytics-policy-baseline.md`
- `spec/stories/landing-page-hero-and-mvp-value.md`
- `spec/stories/landing-page-future-waves-research-framing.md`
- `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- `spec/stories/landing-page-owner-waitlist-capture.md`
- `spec/stories/landing-page-provider-and-clinic-interest-capture.md`
- `spec/stories/landing-page-mailerlite-subscriber-upsert.md`
- `spec/stories/landing-page-validation-events-and-utm-capture.md`
- `spec/stories/`
- `spec/notes/landing/`
- `spec/notes/web/`
- `spec/notes/back-office/`

Change note: Created on 2026-05-11 to give Caniello a clear feature-by-feature and story-by-story implementation roadmap that includes the landing page, Web MVP, Mobile MVP, API/database containers, and E2E testing.

Change note: Updated on 2026-05-11 to include Polish-first MVP language behavior with an English switch across landing page, Web MVP, and Mobile MVP.

Change note: Updated on 2026-05-12 to align Milestone 0 and the next implementation slice with the accepted landing-page segmented validation requirement, accepted landing-page features, and accepted landing-page stories. The update adds the conservative consent baseline, MailerLite upsert expectations, shared landing source values, future-wave research framing, validation event and UTM capture, and a landing-first implementation sequence before platform foundation work.

Change note: Updated on 2026-05-12 to replan Milestone 0 against the current React/Vite landing page, existing English-only tests, saved validation screenshots, and landing concept mockups. The update keeps the current Wave 1 visual direction, uses `spec/notes/landing/image 1.png` as the main composition reference, uses `image 2.png` and `image 3.png` only for research-stage Wave 2/Wave 3 context, and makes the missing Polish-first, consent, segmented capture, MailerLite, analytics, responsive footer, and recovery steps explicit before implementation.
