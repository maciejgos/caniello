# Caniello MVP Implementation Roadmap

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. Keep this file self-contained so a fresh Codex agent or a human novice can understand the intended implementation sequence without reading prior chat.

## Purpose / Big Picture

After this roadmap is approved and executed, Caniello will move from a validated landing page into a working MVP delivered in safe increments: Landing Page, Web MVP, Mobile MVP, and Back Office MVP. A pet owner should eventually be able to sign in, add a pet, upload or scan a document, review extracted information, see timeline and reminders, ask sourced questions, and share a care summary. A beta operator should eventually be able to monitor health, support users, and review AI extraction risks.

This roadmap is story-by-story and feature-by-feature. It also includes platform work that the stories depend on: a FastAPI backend, local API and database containers, Supabase integration boundaries, database migrations, background document-processing jobs, and automated unit, integration, and Playwright end-to-end tests.

## Progress

- [x] (2026-05-11) Read `spec/plans/PLANS.md`, the landing page plan, stack ADR, current Docker setup, package scripts, requirements, features, and stories.
- [x] (2026-05-11) Created this Draft implementation roadmap for human review.
- [x] (2026-05-11) Updated roadmap to include the human decision that Polish is the first MVP language with an English switch.
- [ ] Human review of roadmap scope, sequencing, and release slices.
- [ ] Follow-up ADRs or solution designs for platform topology, auth/RBAC, AI document pipeline, data lifecycle, sharing/export, messaging, payments deferral, and observability.
- [ ] Implementation authorization for the first roadmap slice.

## Surprises & Discoveries

- Observation: The landing page already has a completed ExecPlan and working React/Vite/Tailwind/Docker toolchain.
  Evidence: `spec/plans/first-landing-page.md`, `package.json`, `Dockerfile`, `docker-compose.yml`, and `playwright.config.ts` exist.

- Observation: The accepted stack ADR is a parent stack decision, not enough detail for implementation planning.
  Evidence: `spec/architecture-records/caniello-mvp-stack.md` explicitly says implementation planning depends on follow-up architecture decisions for topology, identity, AI intake, data lifecycle, sharing, messaging, payments, and observability.

- Observation: The current Docker Compose setup only runs the web app.
  Evidence: `docker-compose.yml` currently defines a single `web` service and no `api`, `db`, worker, or Supabase-local service.

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

## Outcomes & Retrospective

No implementation outcome is recorded yet. This roadmap is Draft and awaits human review before implementation begins.

## Context and Orientation

Caniello is a pet health and care organization utility. Its first MVP promise is one place for a pet's health records, reminders, documents, and shareable care information. The existing landing page is implemented with React, TypeScript, Vite, TailwindCSS, Docker, Vitest, and Playwright.

The accepted stack decision is `spec/architecture-records/caniello-mvp-stack.md`: React for web, React Native for mobile, Python with FastAPI for backend, Vercel for deployment, Supabase for Postgres/Auth/Storage, Stripe for payments, and MailerLite for marketing and waitlist email.

The main owner-facing requirement is `spec/requirements/owner-facing-mvp.md`. The back-office requirement is `spec/requirements/back-office-mvp.md`. The first landing page requirement is `spec/requirements/first-landing-page.md`.

The roadmap uses these terms:

Web MVP means the authenticated browser application for owners and beta operators. It is separate from the public landing page.

Mobile MVP means the React Native application focused on owner onboarding, camera-first document capture, daily reminders, timeline, Ask Caniello, and sharing.

Polish-first language support means the first MVP opens in Polish by default and offers an English switch. English mockups in `spec/notes/` are layout references unless a human separately approves English as final copy.

FastAPI is the Python framework for the backend API. In this roadmap, the API is the server-side boundary for business logic, AI/OCR orchestration, secure file operations, audit events, and integrations.

Database container means a local development Postgres-compatible service that lets contributors run API tests and migrations without touching production data. Because Supabase is the accepted hosted database provider, the database schema and SQL should remain compatible with Supabase Postgres.

E2E tests are end-to-end browser or mobile-flow tests. For web, use Playwright because the project already has `npm run test:e2e`. For mobile, add a React Native E2E strategy only after the mobile scaffold exists and the team chooses the tool.

## Roadmap Overview

Milestone 0 is Landing Page and acquisition validation. This is mostly complete, but it must be revised back to Polish-first behavior with an English switch before being treated as first-MVP-ready. The remaining landing work should connect the waitlist to MailerLite only after privacy and consent behavior are explicit.

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

The landing page is the public acquisition surface and should remain narrow. It should continue to validate positioning, trust, and waitlist interest before the product app expands.

Source artifacts:

- `spec/requirements/first-landing-page.md`
- `spec/plans/first-landing-page.md`

Implementation order:

1. Keep the current landing page stable and covered by `npm run build`, `npm run test`, `npm run lint`, and `npm run test:e2e`.
2. Restore or implement Polish as the default landing language with an English switch.
3. Add E2E coverage proving Polish default and English switching.
4. Add MailerLite waitlist integration only after privacy and cookie consent behavior is designed.
5. Add landing conversion tracking only after non-essential analytics consent is implemented.

Validation:

- Run `npm run build`, `npm run test`, `npm run lint`, and `npm run test:e2e`.
- Verify the landing page opens in Polish by default and can switch to English.
- Capture Playwright screenshots for desktop and mobile under `spec/validation/screenshots/`.

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

The recommended next slice is Milestone 1 and Milestone 2 together, but without building owner features yet. That slice should create the missing design/ADR foundation and local platform skeleton.

From `/Users/macg/Code/caniello`, begin by checking the working tree:

    git status --short

Create a feature branch before edits:

    git checkout -b codex/mvp-platform-foundation

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
- `spec/requirements/owner-facing-mvp.md`
- `spec/requirements/back-office-mvp.md`
- `spec/architecture-records/caniello-mvp-stack.md`
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
- `spec/stories/`
- `spec/notes/web/`
- `spec/notes/back-office/`

Change note: Created on 2026-05-11 to give Caniello a clear feature-by-feature and story-by-story implementation roadmap that includes the landing page, Web MVP, Mobile MVP, API/database containers, and E2E testing.

Change note: Updated on 2026-05-11 to include Polish-first MVP language behavior with an English switch across landing page, Web MVP, and Mobile MVP.
