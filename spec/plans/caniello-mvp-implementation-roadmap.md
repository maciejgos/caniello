# Caniello MVP Implementation Roadmap

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. Keep this file self-contained so a fresh Codex agent or a human novice can understand the intended implementation sequence without reading prior chat.

## Purpose / Big Picture

After this roadmap is approved and executed, Caniello will move from a validated landing page into a working MVP delivered in safe increments: Landing Page, Web MVP, Mobile MVP, and Back Office MVP. A pet owner should eventually be able to sign in, add a pet, upload or scan a document, review extracted information, see timeline and reminders, ask sourced questions, and share a care summary. A beta operator should eventually be able to monitor health, support users, and review AI extraction risks.

This roadmap is story-by-story and feature-by-feature. It now treats the landing page as an active validation product slice, not merely a completed static page. The landing slice must explain Wave 1 owner value, capture segmented leads, integrate with MailerLite, and measure validation events behind explicit consent. The later product slices include platform work that the stories depend on: a FastAPI backend, local API and database containers, Supabase integration boundaries, database migrations, background document-processing jobs, and automated unit, integration, and Playwright end-to-end tests.

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
- [x] (2026-05-12) Added validation evidence in `spec/validation/landing-page-milestone-0-validation.md`.
- [x] (2026-05-12) Revised the mid-page layout after human feedback that the implemented UI did not match the mockup: the process card, owner CTA, compact "What's next" cards, and final waitlist strip now follow the `image 1.png` composition more closely, with Wave 2/Wave 3 full forms opened from compact research CTAs.
- [x] (2026-05-12) Adjusted the three mid-page cards to equal desktop height after human visual feedback, then reran lint, build, and Playwright E2E screenshot validation.
- [x] (2026-05-12) Replaced the full-width analytics consent section with a small dismissing bottom popup and routed analytics consent and validation events through `/api/validation-events`.
- [x] (2026-05-13) Implemented the simple MailerLite integration refinement on branch `codex/mailerlite-integration`: local secret hygiene, `Caniello Waitlist` group lookup by name, subscriber upsert into that group using email only, API unit tests, and README configuration updates.
- [ ] Human review of Milestone 0 implementation scope, validation evidence, and whether to revise or proceed.
- [ ] Human review of roadmap scope, sequencing, and release slices beyond Milestone 0.
- [ ] Follow-up ADRs or solution designs for platform topology, auth/RBAC, AI document pipeline, data lifecycle, sharing/export, messaging, payments deferral, and observability.
- [ ] Implementation authorization for Milestone 1 or further roadmap slices.

## Surprises & Discoveries

- Observation: The landing page already has a completed ExecPlan and working React/Vite/Tailwind/Docker toolchain.
  Evidence: `spec/plans/first-landing-page.md`, `package.json`, `Dockerfile`, `docker-compose.yml`, and `playwright.config.ts` exist.

- Observation: The accepted stack ADR is a parent stack decision, not enough detail for implementation planning.
  Evidence: `spec/architecture-records/caniello-mvp-stack.md` explicitly says implementation planning depends on follow-up architecture decisions for topology, identity, AI intake, data lifecycle, sharing, messaging, payments, and observability.

- Observation: The current Docker Compose setup only runs the web app.
  Evidence: `docker-compose.yml` currently defines a single `web` service and no `api`, `db`, worker, or Supabase-local service.

- Observation: Landing-page scope has expanded from a basic waitlist page into a segmented validation slice.
  Evidence: `spec/requirements/landing-page-segmented-validation.md`, `spec/features/landing-page-mvp-value-experience.md`, `spec/features/landing-page-segmented-lead-capture.md`, `spec/features/landing-page-validation-instrumentation.md`, and eight accepted `spec/stories/landing-page-*.md` files now exist.

- Observation: The landing stories deliberately resolve the consent ambiguity with a conservative first-public baseline.
  Evidence: `spec/stories/landing-page-consent-and-analytics-policy-baseline.md` requires explicit lead-capture consent before sending lead data to MailerLite and blocks non-essential analytics until analytics consent is granted.

- Observation: The current landing UI is visually close to the Wave 1 "Better care. Stronger bond." mockup, but it is not yet the segmented validation surface described by the accepted stories.
  Evidence: `src/App.tsx` hard-codes `copy.en`, renders hero, feature cards, process, mid-page CTA, and footer, but does not render the imported `LanguageToggle`, Wave 2/Wave 3 research cards, footer waitlist form, explicit lead-capture consent controls, analytics consent controls, or legal placeholder pages.

- Observation: The current waitlist form is a local-only prototype.
  Evidence: `src/components/WaitlistForm.tsx` validates email and shows local success text; `src/content.ts` says "the form confirms locally and does not send data to a server." No server-side MailerLite submission path exists in the current file list.

- Observation: Current tests protect the old English-only local confirmation behavior.
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

## Decision Log

- Decision: Sequence the MVP as Landing Page, Platform Foundation, Web MVP, Mobile MVP, Back Office MVP, then deferred payments and hardening.
  Rationale: The landing page exists and validates acquisition. The Web MVP can prove core owner value faster than mobile-specific camera work. Mobile should reuse the same backend once the web flow proves the data model and API. Back office depends on real operational data and review states.
  Date/Author: 2026-05-11 / Codex

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

## Outcomes & Retrospective

Milestone 0 implementation is ready for human review but is not accepted or released. The landing page now defaults to Polish, preserves an English switch, renders Wave 1 value, captures owner/provider/clinic interest through consent-gated forms, preserves source and UTM metadata, routes lead submissions through a server-side MailerLite boundary, records validation events through `/api/validation-events` only after analytics consent, and includes updated responsive Playwright screenshots under `spec/validation/screenshots/`. After human visual feedback, the mid-page process, CTA, future-wave cards, and final signup strip were revised to align more closely with the compact `image 1.png` mockup.

Validation passed for `npm run test`, `npm run lint`, `npm run build`, and `npm run test:e2e`. The E2E check required the official Playwright container image because the Alpine app container could not launch the downloaded Playwright fallback browser. The MailerLite API token is configured locally in ignored `.env.local`, and a read-only lookup verified the `Caniello Waitlist` group; live subscriber mutation remains blocked until a human approves a real or disposable test email submission.

## Context and Orientation

Caniello is a pet health and care organization utility. Its first MVP promise is one place for a pet's health records, reminders, documents, and shareable care information. The existing landing page is implemented with React, TypeScript, Vite, TailwindCSS, Docker, Vitest, and Playwright.

The accepted stack decision is `spec/architecture-records/caniello-mvp-stack.md`: React for web, React Native for mobile, Python with FastAPI for backend, Vercel for deployment, Supabase for Postgres/Auth/Storage, Stripe for payments, and MailerLite for marketing and waitlist email.

The main owner-facing requirement is `spec/requirements/owner-facing-mvp.md`. The back-office requirement is `spec/requirements/back-office-mvp.md`. The first landing page requirement is `spec/requirements/first-landing-page.md`. The refined landing-page validation requirement is `spec/requirements/landing-page-segmented-validation.md`; it adds owner waitlist capture, future-wave research-interest capture, MailerLite lead handling, privacy/consent behavior, and validation instrumentation.

The roadmap uses these terms:

Web MVP means the authenticated browser application for owners and beta operators. It is separate from the public landing page.

Mobile MVP means the React Native application focused on owner onboarding, camera-first document capture, daily reminders, timeline, Ask Caniello, and sharing.

Polish-first language support means the first MVP opens in Polish by default and offers an English switch. English mockups in `spec/notes/` are layout references unless a human separately approves English as final copy.

FastAPI is the Python framework for the backend API. In this roadmap, the API is the server-side boundary for business logic, AI/OCR orchestration, secure file operations, audit events, and integrations.

Database container means a local development Postgres-compatible service that lets contributors run API tests and migrations without touching production data. Because Supabase is the accepted hosted database provider, the database schema and SQL should remain compatible with Supabase Postgres.

E2E tests are end-to-end browser or mobile-flow tests. For web, use Playwright because the project already has `npm run test:e2e`. For mobile, add a React Native E2E strategy only after the mobile scaffold exists and the team chooses the tool.

MailerLite upsert means the landing page sends a lead to MailerLite in a way that creates the subscriber if the email is new and updates the existing subscriber if the email already exists. The update must add relevant groups and fields without removing previous groups for the same email.

Lead-capture consent means the visitor explicitly agrees to submit their email and related metadata for waitlist or research-interest follow-up. For the first public landing-page baseline, Caniello must not send lead data to MailerLite unless this consent is present.

Analytics consent means the visitor explicitly allows non-essential validation events. For the first public landing-page baseline, page views and form interaction events are not sent to an analytics system until this consent is granted.

## Roadmap Overview

Milestone 0 is Landing Page and acquisition validation. The original page implementation exists in `src/App.tsx`, `src/content.ts`, `src/components/WaitlistForm.tsx`, `src/components/LanguageToggle.tsx`, `src/index.css`, and the landing tests. The accepted landing-page story set makes this milestone active again. The landing page must become a segmented validation surface: Polish-first with an English switch, clear Wave 1 owner value, research-safe Wave 2 and Wave 3 framing, explicit lead-capture and analytics consent, owner waitlist capture, provider and clinic/vet research-interest capture, MailerLite upsert behavior, and validation event or count capture.

Milestone 1 is Architecture and platform design. Before coding the product app, create or approve follow-up ADRs for deployment topology, owner/admin identity, data lifecycle, AI document pipeline, sharing/export, messaging, observability, and payments deferral. This milestone prevents the API, database, auth, storage, and worker choices from being improvised during feature work.

Milestone 2 is Local development and backend foundation. Add an `api` service for FastAPI and a local `db` service for Postgres-compatible development. Add migrations, health checks, API tests, seed data, and Docker Compose commands that start web, API, and database together.

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
- `spec/plans/first-landing-page.md`
- `spec/features/landing-page-mvp-value-experience.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/features/landing-page-validation-instrumentation.md`
- `spec/design/caniello-visual-direction.md`
- `spec/notes/landing/backlog.md`
- `spec/notes/landing/image 1.png`
- `spec/notes/landing/image 2.png`
- `spec/notes/landing/image 3.png`

Current implementation context:

The current app is a single-page React/Vite landing page. `src/App.tsx` imports `caniello-bruno-app-hero.png`, `caniello-dark-wordmark.png`, and `puppys_transparent.png`; renders a header, hero, four feature blocks, "How Caniello works," a mid-page waitlist CTA, and footer; and hard-codes `const text = copy.en`. `src/content.ts` already contains both Polish and English copy, but the page does not currently use the Polish copy or `src/components/LanguageToggle.tsx`. `src/components/WaitlistForm.tsx` validates email locally and never sends data to a server. `src/App.test.tsx` and `tests/e2e/landing.spec.ts` currently validate the English-only local-confirmation page, so they must be updated as Milestone 0 behavior changes.

The visual target for this milestone is not a complete redesign. Preserve the current brand, wordmark, pet/app hero image, serif headline style, navy/gold/cream palette, and compact layout direction from `spec/design/visual-artifacts/caniello-better-care-landing.png`. Use `spec/notes/landing/image 1.png` as the primary composition reference for adding a compact "What's next" section, a final waitlist strip, and footer signup access. Use `spec/notes/landing/image 2.png` and `spec/notes/landing/image 3.png` only as references for research-stage Wave 2 and Wave 3 language and optional context fields; do not add separate marketplace or clinic product pages unless a later human decision approves them.

Implementation order:

1. First make the current page language-ready without changing the visual direction. Replace the hard-coded `copy.en` use in `src/App.tsx` with state-backed language selection, render the existing `LanguageToggle`, default to Polish, and allow English switching. Keep the hero and feature layout close to the current page and `image 1.png`. Update unit and E2E tests so they no longer expect English by default.
2. Implement `spec/stories/landing-page-consent-and-analytics-policy-baseline.md`. Add reusable lead-capture consent controls near every landing lead form, visible Privacy Policy links, and analytics consent state before any non-essential event collection. Placeholder legal pages or clearly marked placeholder routes may be used only if the human approves them for launch context; otherwise the implementation must keep legal links visible and identify them as placeholders in validation notes.
3. Implement `spec/stories/landing-page-hero-and-mvp-value.md`. Keep the current hero image and product mockup, then tighten copy so the first viewport communicates records, reminders, documents, and owner-controlled sharing in Polish by default and English by switch. Preserve scope-safe language: no official passport replacement, no AI diagnosis, no treatment advice, no active marketplace, no active clinic SaaS.
4. Implement `spec/stories/landing-page-future-waves-research-framing.md`. Add a compact "What's next" section modeled primarily on `spec/notes/landing/image 1.png`. The section must include Wave 2 "Trusted pet services" and Wave 3 "Clinic collaboration" cards or equivalent blocks, both labeled research or exploration, both saying future waves depend on validated demand, and both avoiding `coming soon`, `launching next`, `available now`, or equivalent language.
5. Implement `spec/stories/landing-page-footer-legal-and-responsive-trust.md`. Add the final waitlist strip and footer signup access shown in `image 1.png` or an equivalent responsive treatment. Footer links should include product, company, resources, Privacy Policy, and Terms of Service access or approved placeholders. Verify the current mid-page pet image does not cover form text on mobile or desktop after layout changes.
6. Implement `spec/stories/landing-page-owner-waitlist-capture.md`. Generalize `WaitlistForm` so hero, mid-page, and footer owner forms submit typed payloads with `role=pet_owner`, `interest_wave=wave_1`, and one of `source=landing_page_hero`, `source=landing_page_mid_cta`, or `source=landing_page_footer`. Invalid email, missing consent, pending, success, and error states must be visible and keyboard-accessible.
7. Implement `spec/stories/landing-page-provider-and-clinic-interest-capture.md`. Add Wave 2 and Wave 3 research-interest capture paths from the "What's next" cards. A modal, inline expanded form, or compact embedded form is acceptable if it stays responsive and research-labeled. Wave 2 submissions must use `role=pet_service_provider`, `interest_wave=wave_2`, and `source=landing_page_wave2`; Wave 3 submissions must use `role=clinic_vet`, `interest_wave=wave_3`, and `source=landing_page_wave3`. Preserve optional business or clinic fields only where the UI actually collects them.
8. Implement `spec/stories/landing-page-mailerlite-subscriber-upsert.md`. Add a server-side or deployment-safe API boundary so MailerLite secrets are never exposed to browser code. The boundary must create or update subscribers, add relevant groups or equivalent segmentation without removing previous groups, store supported custom fields and UTM fields, and return sanitized success or error responses. If Vite-only static hosting cannot support this safely by itself, add a small serverless function or document the required hosting boundary before implementation.
9. Implement `spec/stories/landing-page-validation-events-and-utm-capture.md`. Add a lightweight validation event path only after analytics consent. The accepted reporting path may be a selected analytics provider, a backend endpoint, MailerLite exports, or equivalent count storage, but it must support page views, waitlist submissions, waitlist successes, waitlist errors, Wave 2 interest, Wave 3 interest, source attribution, UTM preservation, and conversion calculation as `waitlist_success / page_view`.

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

Likely source files to change:

- `src/App.tsx` for page composition, language state, Wave 2/Wave 3 sections, footer signup, and consent/analytics UI placement.
- `src/content.ts` for Polish-first and English copy covering hero, features, process, future waves, consent, legal links, validation states, and research-stage thank-you messages.
- `src/components/LanguageToggle.tsx` to ensure it is rendered and accessible if it is not already complete.
- `src/components/WaitlistForm.tsx` to support source-specific payloads, lead consent, async submission states, role and wave fields, UTM metadata, and reusable owner/provider/clinic variants.
- A new landing lead client helper under `src/lib/` or `src/utils/` if implementation needs shared payload construction, email validation, UTM parsing, analytics consent checks, or API calls.
- A new server-side MailerLite boundary appropriate to the selected hosting model, for example an API route or function file, with secrets read from environment variables.
- `src/App.test.tsx` and new focused tests for language switching, consent gating, payload construction, source attribution, and form states.
- `tests/e2e/landing.spec.ts` for Polish default, English switch, responsive screenshots, owner waitlist sources, future-wave research capture, and consent behavior.
- `README.md` and `AGENTS.md` only after new commands or environment variables are real and reproducible from committed files.

Validation:

- Run `npm run build`, `npm run test`, `npm run lint`, and `npm run test:e2e`.
- Verify the landing page opens in Polish by default and can switch to English without losing entered form state unexpectedly.
- Verify the rendered page still follows the current Caniello brand direction: wordmark, navy/gold/cream palette, pet/app hero image, compact feature/process blocks, and mockup-informed future-wave cards.
- Verify owner waitlist submissions use `role=pet_owner`, `interest_wave=wave_1`, and the correct source value for hero, mid-page, or footer.
- Verify Wave 2 provider interest submissions use `role=pet_service_provider`, `interest_wave=wave_2`, and `source=landing_page_wave2`.
- Verify Wave 3 clinic/vet interest submissions use `role=clinic_vet`, `interest_wave=wave_3`, and `source=landing_page_wave3`.
- Verify missing lead-capture consent blocks MailerLite submission and shows a clear consent message.
- Verify repeated email submission updates the existing MailerLite subscriber and does not remove previous groups.
- Verify non-essential analytics events are blocked before analytics consent and recorded after analytics consent.
- Verify UTM values are preserved in lead metadata after lead consent and event metadata after analytics consent.
- Verify Wave 2 and Wave 3 copy does not say `coming soon`, `launching next`, `available now`, or equivalent launch-commitment language.
- Capture Playwright screenshots for desktop and mobile under `spec/validation/screenshots/`.

Milestone 0 recovery guidance:

If the language switch introduces layout breakage, keep the current English content as a temporary comparison fixture in tests while fixing Polish copy overflow. If MailerLite credentials or group IDs are unavailable, implement the server-side boundary with configuration validation and mocked tests, then mark live MailerLite verification as blocked in `spec/validation/` until the human provides the required environment values. If the analytics provider remains undecided, implement consent state, UTM parsing, and an internal event adapter interface first, then wire the approved sink later without changing form behavior.

### Milestone 1: Architecture and Platform Readiness

This milestone produces decisions, not product code. It must happen before backend and product implementation because it defines the system boundaries.

Source artifacts:

- `spec/architecture-records/caniello-mvp-stack.md`
- `spec/requirements/owner-facing-mvp.md`
- `spec/requirements/back-office-mvp.md`

Required follow-up ADRs or solution designs:

1. Platform topology and deployment boundary: decide how React, React Native, FastAPI, Vercel, local Docker, environments, preview deployments, and rollback fit together.
2. Identity and access: decide owner auth, admin auth, MFA, RBAC, sessions, Supabase Auth usage, and audit behavior.
3. Data lifecycle: decide schema ownership, migrations, row-level security, storage buckets, retention, export, deletion, backup, and audit-log policy.
4. AI document intake pipeline: decide upload flow, signed URLs, worker/queue model, OCR/AI provider boundary, retries, processing states, and review handoff.
5. Sharing/export: decide share-token scope, revocation, expiry policy, PDF generation, storage, and access logging.
6. Messaging: decide MailerLite boundaries versus transactional auth, reminder, export, and operational email.
7. Observability and operations: decide logs, job monitoring, support visibility, health checks, alerts, incident response, and recovery.
8. Payments: record Stripe as deferred or define the exact paid-plan trigger.

Validation:

- Each ADR has `Status`, `Context`, `Decision`, `Consequences`, and `Related Artifacts`.
- Architecture reviewer should review the topology, auth, AI pipeline, data lifecycle, and sharing ADRs before implementation starts.

### Milestone 2: Local Platform Foundation

At the end of this milestone, contributors can run the web app, FastAPI backend, and local database from Docker Compose. The API exposes health and version endpoints, migrations run locally, and tests prove API/database connectivity.

Features enabled:

- `spec/features/owner-account-privacy-foundation.md`
- `spec/features/pet-onboarding-and-workspace.md`
- `spec/features/back-office-access-control.md`

Stories supported:

- `spec/stories/account-signup-login-and-session.md`
- `spec/stories/create-first-pet-profile.md`
- `spec/stories/back-office-admin-auth-and-rbac.md`

Implementation tasks:

1. Add backend source under `api/` with a FastAPI app, dependency management, configuration, health endpoint, and test setup.
2. Add an API Dockerfile, for example `api/Dockerfile`, that starts the FastAPI development server.
3. Extend `docker-compose.yml` with `api` and `db` services. The `db` service should be Postgres-compatible for local development and use a named Docker volume so data survives container restarts.
4. Add local environment examples, such as `.env.example`, with non-secret placeholders for `DATABASE_URL`, Supabase URL, Supabase anon key, Supabase service role key, Stripe keys, MailerLite key, and app URLs.
5. Add migration tooling under `api/migrations/` or a clearly named migration directory. The first schema should cover users/profile references, households, pets, documents, extracted fields, timeline events, reminders, share links, audit logs, and processing jobs at a minimal level.
6. Add API tests for health, database connection, and migration presence.
7. Update README and AGENTS only after tooling is real and reproducible.

Expected local commands after this milestone:

    docker compose build
    docker compose up web api db
    npm run build
    npm run test
    npm run lint
    npm run test:e2e

Expected future API commands should be added once the backend tooling is chosen:

    docker compose run --rm api pytest
    docker compose run --rm api python -m alembic upgrade head

Validation:

- `GET /health` on the API returns HTTP 200.
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
2. Integrate Supabase Auth according to the identity ADR.
3. Implement Polish-first language behavior with an English switch before broadening owner flows.
4. Implement cookie consent and policy/disclaimer surfaces before analytics or MailerLite tracking.
5. Implement first-pet creation through FastAPI and the database.
6. Implement home workspace using real pet, reminder, document, and pending-review data where available, with empty states when not available.
7. Add unit and integration tests for auth states, language switching, pet creation, onboarding branches, and home states.
8. Add Playwright E2E tests for signup/login mock or test auth flow, Polish default, English switch, create first pet, and reach Home.

Validation:

- `npm run test` covers component and state behavior.
- API tests cover owner profile and pet creation.
- `npm run test:e2e` proves a user can reach the web app in Polish by default, switch to English, create or use a test session, add a pet, and see the home workspace.

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

1. Implement signed upload flow through FastAPI and Supabase Storage.
2. Implement document metadata, processing job records, and status transitions.
3. Add a worker or queue process according to the AI document pipeline ADR. For early local testing, this may use deterministic fake extraction before a real OCR/AI provider is introduced.
4. Implement review/edit/confirm UI using mockups from `spec/notes/web`.
5. On confirmation, create timeline events and reminder suggestions from confirmed fields only.
6. Implement documents library and detail views.
7. Implement reminders list, edit, complete, and notification preferences.
8. Add API, worker, and E2E tests for the full upload-to-confirm-to-timeline flow.

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

The recommended next slice is Milestone 0: Landing Page segmented validation. This slice should update the existing React/Vite landing page without starting authenticated product-app work. It should produce a public validation surface that can collect owner waitlist leads, provider research interest, clinic/vet research interest, and consent-gated validation evidence.

From `/Users/macg/Code/caniello`, begin by checking the working tree:

    git status --short

Create a feature branch before edits:

    git checkout -b codex/landing-segmented-validation

Inspect the accepted landing-page artifacts before editing source code:

    sed -n '1,220p' spec/requirements/landing-page-segmented-validation.md
    sed -n '1,220p' spec/features/landing-page-mvp-value-experience.md
    sed -n '1,220p' spec/features/landing-page-segmented-lead-capture.md
    sed -n '1,220p' spec/features/landing-page-validation-instrumentation.md
    sed -n '1,220p' spec/stories/landing-page-consent-and-analytics-policy-baseline.md
    sed -n '1,220p' spec/stories/landing-page-owner-waitlist-capture.md
    sed -n '1,220p' spec/stories/landing-page-mailerlite-subscriber-upsert.md

Implement the landing-page stories in this order:

1. Consent and analytics policy baseline.
2. Hero and MVP value experience.
3. Future-wave research framing.
4. Footer, legal, and responsive trust.
5. Owner waitlist capture.
6. Provider and clinic/vet interest capture.
7. MailerLite subscriber upsert.
8. Validation events and UTM capture.

Use these shared source values exactly:

    landing_page_hero
    landing_page_mid_cta
    landing_page_footer
    landing_page_wave2
    landing_page_wave3

Add or update environment examples only for variables that the implementation really uses. For MailerLite, real secrets must stay out of Git. If the landing implementation needs a server-side endpoint, keep the MailerLite API key server-side and expose only safe public configuration to the browser.

Run validation for the landing slice:

    npm run build
    npm run test
    npm run lint
    npm run test:e2e

After Milestone 0 is validated, the next product-app slice is Milestone 1 and Milestone 2 together, but without building owner features yet. That slice should create the missing design/ADR foundation and local platform skeleton.

Create or update ADRs under `spec/architecture-records/` for topology, auth, data lifecycle, AI pipeline, sharing/export, messaging, payments, and observability.

After those are accepted or explicitly deferred by the human, add local platform files:

    api/
    api/Dockerfile
    api/pyproject.toml
    api/app/
    api/tests/
    docker-compose.yml
    .env.example

Extend Docker Compose to include:

    web: React/Vite frontend on http://localhost:5173
    api: FastAPI backend on http://localhost:8000
    db: local Postgres-compatible database for development and tests

Add expected commands to README only after they work:

    docker compose build
    docker compose up web api db
    docker compose run --rm api pytest
    docker compose run --rm api python -m alembic upgrade head
    npm run build
    npm run test
    npm run lint
    npm run test:e2e

## Validation and Acceptance

This roadmap is ready for implementation only when the human approves or revises the sequence and explicitly authorizes implementation.

For Milestone 0, acceptance should prove the landing page is a consent-safe validation instrument:

- A first-time visitor sees Caniello's Wave 1 owner-side promise, MVP value cards, simple process, research-safe future-wave framing, and a footer with legal/trust access.
- Polish is the default landing language, and English switching works without changing the medical, privacy, or scope boundaries.
- A pet owner can submit a valid waitlist email from hero, mid-page, and footer contexts only after required lead-capture consent, and each submission carries the correct role, wave, and source metadata.
- A pet service provider can submit Wave 2 research interest with `role=pet_service_provider`, `interest_wave=wave_2`, and `source=landing_page_wave2`.
- A clinic or veterinarian can submit Wave 3 research interest with `role=clinic_vet`, `interest_wave=wave_3`, and `source=landing_page_wave3`.
- MailerLite creates new subscribers, updates repeated emails without duplicates, and does not remove existing groups when adding new landing-page interest.
- Non-essential analytics events are not sent before analytics consent, and after analytics consent the team can count page views, waitlist successes, waitlist errors, Wave 2 interest, Wave 3 interest, and UTM context.
- `npm run build`, `npm run test`, `npm run lint`, and `npm run test:e2e` pass.

For Milestone 2, acceptance should be observable:

- Starting Docker Compose brings up web, API, and database services.
- Visiting `http://localhost:5173` shows the existing web app.
- Calling `http://localhost:8000/health` returns HTTP 200 with a simple healthy response.
- Running API tests proves the backend can connect to the local database.
- Running migrations from an empty database succeeds.
- Running `npm run test:e2e` still passes the existing landing checks.

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

The accepted dependency direction is React for web, React Native for mobile, FastAPI for backend, Vercel for deployment, Supabase for Postgres/Auth/Storage, Stripe for payments, and MailerLite for marketing/waitlist email.

The API should expose clear owner-facing resources for pets, documents, extraction reviews, timeline events, reminders, assistant questions, summaries, share links, and account data controls. It should expose admin-facing resources for dashboard health, user search, support actions, review queue, audit log, and AI safety.

The database should persist durable product state: pets, households, documents, extracted fields, confirmed records, timeline events, reminders, share links, processing jobs, audit entries, support notes, and admin permissions. Raw files should live in Supabase Storage or a local storage-compatible development path defined by the storage design.

The E2E test suite should start with Playwright for web because it already exists. It should later include seeded user and admin flows, not only landing-page checks.

## Artifacts and Notes

Primary source artifacts:

- `spec/requirements/first-landing-page.md`
- `spec/requirements/landing-page-segmented-validation.md`
- `spec/requirements/owner-facing-mvp.md`
- `spec/requirements/back-office-mvp.md`
- `spec/architecture-records/caniello-mvp-stack.md`
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
