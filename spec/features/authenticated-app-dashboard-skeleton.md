# Feature: Authenticated App Dashboard Skeleton

## Source Notes

The input combines two MVP mockups and the visual backlog for the Caniello Web + Mobile MVP.

- `spec/design/visual-artifacts/mvp/image 1.png` shows the signed-in owner dashboard: left navigation, top search and pet/account selectors, "What's next" cards, health summary, recent documents, care timeline preview, Ask Caniello panel, sharing prompt, and a care tip.
- `spec/design/visual-artifacts/mvp/image 6.png` shows first-run onboarding inside the same authenticated shell: a three-step getting-started strip, add-pet form, first-document upload/scan prompt, review-extraction illustration, and a tip.
- `spec/design/visual-artifacts/mvp/backlog.md` frames the MVP flow as Scan -> Extract -> Review -> Timeline -> Reminder -> Ask -> Share, while also listing auth, privacy, security, and owner workspace foundations as required.

## User Problem

After a successful login, the owner currently reaches a protected placeholder rather than a usable app surface. The owner needs an immediate sense of where pet profiles, documents, reminders, timeline, assistant, sharing, and account settings will live so the MVP can support onboarding and activation work.

## Outcome

Signed-in owners land in a polished Caniello app skeleton that matches the MVP visual direction, guides first-run setup, and provides stable navigation for the core owner-side product areas before the deeper document, reminder, sharing, and assistant features are implemented.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The feature supports the MVP Foundation outcomes for owner onboarding, pet profile creation, document/reminder entry points, trusted sharing/export discovery, and account/privacy language behavior. It does not expand into marketplace, clinic SaaS, booking, payments, or AI diagnosis.

## Scope

- Replace the protected placeholder at `/app` with an authenticated dashboard shell.
- Add the app navigation structure for Home, Pets, Timeline, Documents, Reminders, Ask Caniello, Sharing, and Settings.
- Add first-run onboarding skeleton based on the mockup, including add-pet and first-document prompts.
- Add dashboard skeleton for an owner with a pet, including "What's next", pet summary, recent documents, timeline preview, assistant prompt, sharing prompt, and care tip surfaces.
- Add empty-state or placeholder route surfaces for the core navigation destinations where needed.
- Preserve Polish and English language behavior, medical boundaries, privacy language, and safe assistant wording.
- Keep the first version implementation-ready without requiring live AI, document extraction, notification delivery, real search, or share-link permissions.

## Non-Goals

- No live AI chat, symptom checking, diagnosis, treatment recommendation, or emergency advice.
- No real OCR, document extraction, classification, processing jobs, or confidence scoring.
- No real document storage/upload implementation unless selected as a later task.
- No full reminder recurrence, push notifications, email reminder delivery, or calendar sync.
- No clinic SaaS, marketplace mechanics, booking, payments, or provider workflow ownership.
- No claim that Caniello replaces a veterinarian or an official EU pet passport.

## Candidate Tasks

- `spec/tasks/authenticated-app-shell-navigation.md` - Build the authenticated app shell and navigation skeleton.
- `spec/tasks/first-run-onboarding-skeleton.md` - Build the first-run onboarding dashboard state with add-pet and document prompts.
- `spec/tasks/home-dashboard-skeleton.md` - Build the returning-user home dashboard skeleton.
- `spec/tasks/app-section-empty-states.md` - Add skeleton route surfaces and empty states for core app sections.
- `spec/tasks/dashboard-skeleton-validation.md` - Verify responsive, language, auth, accessibility, and scope boundaries for the dashboard skeleton.

## Open Questions

- Should the first implementation use static/demo dashboard data only, or should it read the local seeded demo account and existing Supabase tables where already available?
- Should adding the first pet be a real save flow in this feature, or should the initial skeleton only present the form and defer persistence to a dedicated pet-profile task?
- Should the web skeleton include a mobile layout now, or should mobile-specific behavior remain deferred until the Expo app catches up?
- Should Ask Caniello appear as a visible disabled/preview panel in `Now`, or should it be navigation-only until a later AI-safe task is approved?

## Approval Notes

No roadmap approval is needed for a static authenticated app shell and MVP dashboard skeleton because it fits `Now - MVP Foundation`.

Human approval is needed before implementation if a selected task introduces database migrations, live file upload/storage behavior, AI assistant behavior, notification delivery, real share links, or any expansion beyond owner-side MVP foundations.
