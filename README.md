# Caniello

Caniello is a pet health and care organization utility.

It helps pet owners keep a trusted, shareable record of a pet's health, reminders, documents, and care information in one place.

## Purpose

Caniello exists to reduce the everyday chaos around pet health and care information:

- vaccination, medication, deworming, and visit reminders
- health records, allergies, chip number, medication, and important notes
- medical documents and test results
- care information that can be shared with family, caregivers, petsitters, groomers, or veterinarians

The initial product should be useful before it becomes a platform. Caniello starts as a focused owner-side utility, not as a full pet-care marketplace, clinic SaaS product, AI diagnosis tool, or official passport replacement.

## Current Stage

Status: `validation`

This repository is currently in product discovery and PDLC setup. The primary work should happen in `spec/` until implementation scope is clear enough to build.

The first goal is to validate whether pet owners repeatedly use and trust Caniello for pet health organization.

## Initial Audience

Primary early users:

- dog and cat owners in cities
- owners of pets with ongoing medication or chronic health history
- families or caregivers who share pet-care responsibilities

Later lightweight partners:

- petsitters
- groomers
- trainers
- small pet-care service providers
- clinics, only after owner-side usage and sharing behavior are validated

## MVP Scope

The first MVP should focus on one promise:

> One place for a pet's health records, reminders, documents, and shareable care information.

Initial product scope:

- pet profile with basic data, chip, allergies, medication, and important notes
- reminders for vaccination, medication, deworming, and visits
- document vault for medical records and test results
- shareable care card or PDF export
- family or caregiver access sharing

## Out of Scope for the Initial Product

Do not build these in the first product phase:

- full booking and payments
- clinic PIMS or EHR integrations
- AI symptom checking or diagnosis
- full marketplace mechanics
- claims that Caniello replaces an official EU pet passport

Official EU pet passports remain documents issued by authorized veterinarians. Caniello may support a digital health record or travel-ready care record, but it must not imply official passport replacement.

## Validation Goals

The first validation cycle should prioritize evidence of problem intensity, activation, and retention.

Target signals:

- 40 owner interviews
- 15 interviews with clinics or pet-service providers
- landing page and waitlist
- landing page conversion above 8% from relevant traffic
- thin MVP activation above 50%
- D30 retention above 25%
- weekly active owners above 20% among activated users

If retention is weak, do not expand into marketplace or clinic tooling.

## Repository Structure

```text
spec/    Product discovery, requirements, design, plans, validation, and lifecycle artifacts
src/     Application source code once implementation begins
tests/   Executable tests once implementation tooling exists
```

## Development Commands

The first landing page is a Dockerized React, TypeScript, Vite, and TailwindCSS app.

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server on `http://localhost:5173`.
- `npm run build`: type-check and build the production static files in `dist/`.
- `npm run test`: run Vitest and React Testing Library tests.
- `npm run test:e2e`: run Playwright browser checks against the landing page.
- `npm run lint`: run the TypeScript validation gate.
- `docker compose build`: build the local development container.
- `docker compose up`: run the landing page in Docker on `http://localhost:5173`.
- `docker compose down`: stop the Docker development container.

## Landing Lead Capture Configuration

Landing-page forms submit to the server-side `/api/landing-leads` boundary so MailerLite secrets are not exposed in browser code. Configure these environment variables in the deployment environment before live lead capture:

- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_NAME` (defaults to `Caniello Waitlist`)

The API looks up the configured MailerLite group by name and upserts the subscriber into that group using the submitted email address. Landing-page role and wave segmentation are intentionally deferred to a later MailerLite survey; the landing API rejects role or wave fields and only uses form source, language, consent, and UTM context for technical validation and attribution. Without `MAILERLITE_API_KEY`, the API returns a sanitized configuration error and does not send lead data.

Landing-page analytics consent and validation events are posted to `/api/validation-events`. The endpoint is a deployment-safe boundary for a future analytics sink; browser storage only remembers whether the visitor has already granted or declined analytics consent.

## Development Model

Caniello follows an AI-assisted, human-governed PDLC model:

1. Define intent and constraints in `spec/`.
2. Draft requirements, feature definitions, and validation criteria.
3. Review product scope before implementation.
4. Build the smallest validated product slice.
5. Capture validation evidence before expanding scope.
6. Feed learnings back into the control plane and this repository.

Implementation should not begin by adding a broad app scaffold. Start with validated product artifacts, then choose tooling when the first build slice is clear.

## Relationship to The Future Thinker World

Caniello is an execution repository governed by The Future Thinker World control plane.

The control plane holds the organizational context, strategic decisions, portfolio logic, and cross-repository learning. This repository should hold Caniello-specific product discovery, implementation, validation, and delivery artifacts.

Relevant control-plane records:

- `ventures/caniello/README.md`
- `ventures/caniello/context.md`
- `ventures/caniello/strategy.md`
- `ventures/caniello/decisions.md`
- `artifacts/the-future-thinker-caniello-pdf-analysis.md`

## Domain

Primary domain:

- <https://caniello.com>

## Name History

Caniello was previously explored under the name `Pawnora`.

Control-plane and source-analysis documents may still mention `Pawnora` as the historical name. New product work should use `Caniello`.
