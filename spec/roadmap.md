# Caniello Roadmap

This roadmap is the active lightweight prioritization filter for Caniello. It answers whether a task should exist now. It does not replace human approval for scope changes, release decisions, or durable product direction.

## Now - MVP Foundation

Goal: build a focused pet health organization utility that is useful before Caniello becomes a platform.

Outcomes:

- Owner can create and manage a pet profile.
- Owner can store key health information.
- Owner can add care reminders.
- Owner can upload or store important documents.
- Owner can share a care card, share link, or PDF-style summary when approved for implementation.
- Owner-facing account, privacy, consent, and language behavior are reliable enough for MVP validation.

Success signals:

- User can onboard without help.
- User creates at least one pet profile.
- User creates at least one reminder or document.
- Thin MVP activation is above 50%.
- Landing or acquisition funnel evidence remains above the validation threshold for relevant traffic.

Allowed scope:

- pet profile;
- health records;
- reminders;
- document vault;
- trusted sharing or export;
- owner account, privacy, consent, and localization foundations;
- local development, CI, validation, and platform reliability needed to build and verify the MVP.

## Next - Retention and Sharing

Goal: prove repeat usage and trusted sharing after the owner-side foundation works.

Outcomes:

- Owner returns to update records.
- Family or caregiver can access shared information.
- Reminders create repeat value.
- Sharing behavior can be observed without expanding into provider workflow ownership.

Success signals:

- D30 retention above 25%.
- Weekly active owners above 20% among activated users.
- Shared care information is viewed or used by at least one trusted recipient segment.

## Later - AI-Assisted Context and Partner Learning

Goal: add AI and partner-facing capabilities only after enough trustworthy pet context and owner behavior exist.

Allowed scope:

- document extraction;
- care summaries grounded in user-owned records;
- reminder suggestions;
- owner-facing organization assistance;
- lightweight partner interest learning.

AI and partner work must preserve medical-safety, privacy, and owner-control boundaries.

## Not Now

Do not implement without explicit human approval and a roadmap update:

- marketplace mechanics;
- full booking and payments;
- payments-first monetization flows;
- clinic SaaS, PIMS, or EHR integrations;
- broad clinic portals or partner workflow ownership;
- AI symptom checking, AI diagnosis, treatment recommendations, or veterinary decision-making;
- veterinary replacement claims, including claims that Caniello replaces an authorized veterinarian;
- official EU pet passport replacement claims;
- complex partner integrations;
- advanced multi-role care teams, family plans, or complex household permissions beyond private owner data and controlled sharing;
- advanced analytics, referral mechanics, duplicate detection, calendar sync, or partner document-upload flows unless approved for a specific validation task;
- broad back-office systems beyond approved MVP support needs.

## Governance

Codex may suggest roadmap updates, identify drift, and record recommendations in `spec/handoff.md`.

Codex must not silently move work into `Now`, remove non-goals, expand MVP scope, or mark roadmap changes approved.
