# Caniello Product Context

This file is the durable product context for Caniello. Use it with `spec/roadmap.md` before shaping, planning, implementing, or evaluating work.

## Product Purpose

Caniello is a pet health and care organization utility.

It helps pet owners keep a trusted, shareable record of a pet's health, reminders, documents, and care information in one place. The product should be useful before it becomes a platform.

## MVP Promise

The first MVP focuses on one promise:

> One place for a pet's health records, reminders, documents, and shareable care information.

Initial MVP scope:

- pet profile with basic data, chip, allergies, medication, and important notes;
- reminders for vaccination, medication, deworming, and visits;
- document vault for medical records and test results;
- shareable care card, controlled share link, or PDF-style export when approved for implementation;
- family or caregiver access sharing;
- owner account, privacy, consent, and language foundations needed for MVP validation.

## Audience

Primary early users:

- dog and cat owners in cities;
- owners of pets with ongoing medication or chronic health history;
- families or caregivers who share pet-care responsibilities.

Later lightweight partner learning may involve petsitters, groomers, trainers, small pet-care service providers, and clinics. Partner and clinic workflows should follow owner-side validation, not precede it.

## Validation Goals

The first validation cycle should prove problem intensity, activation, retention, and trust.

Target signals:

- 40 owner interviews;
- 15 interviews with clinics or pet-service providers;
- landing page and waitlist;
- landing page conversion above 8% from relevant traffic;
- thin MVP activation above 50%;
- D30 retention above 25%;
- weekly active owners above 20% among activated users.

If retention is weak, do not expand into marketplace, clinic tooling, or broad partner systems.

## Explicit Non-Goals

Do not build these in the first product phase without explicit human approval and a roadmap update:

- marketplace mechanics;
- full booking and payments;
- payments-first monetization flows;
- clinic SaaS, PIMS, or EHR integrations;
- broad clinic portals or partner workflow ownership;
- AI symptom checking, AI diagnosis, treatment recommendations, or veterinary decision-making;
- claims that Caniello replaces an official EU pet passport;
- advanced multi-role care teams, family plans, or complex household permissions beyond private owner data and controlled sharing;
- advanced analytics, referral mechanics, duplicate detection, calendar sync, or partner document-upload flows unless approved for a specific validation task.

## Medical and Legal Boundary

Official EU pet passports remain documents issued by authorized veterinarians. Caniello may support a digital health record or travel-ready care record, but it must not imply official passport replacement.

AI or automation must remain organization assistance, not veterinary judgment. AI output that affects trusted pet history should be reviewable and user-confirmed before it becomes a durable record. Ask-style features must cite user-owned source records when relevant and avoid diagnosis, treatment decisions, emergency advice, or unsafe medical guidance.

EU-facing beta work must preserve privacy, consent, account deletion, data export, authorization, and medical disclaimer foundations before collecting sensitive beta data at scale.

## Control-Plane Relationship

Caniello is an execution repository governed by The Future Thinker World control plane.

The control plane holds organizational context, strategic decisions, portfolio logic, and cross-repository learning. This repository should hold Caniello-specific product discovery, implementation, validation, and delivery artifacts.

Relevant control-plane records:

- `ventures/caniello/README.md`
- `ventures/caniello/context.md`
- `ventures/caniello/strategy.md`
- `ventures/caniello/decisions.md`
- `artifacts/the-future-thinker-caniello-pdf-analysis.md`

## Historical Name

Caniello was previously explored under the name `Pawnora`. Control-plane and source-analysis documents may still mention `Pawnora` as the historical name. New product work should use `Caniello`.
