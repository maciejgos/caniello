# 0001 — Use TypeScript-first Next.js monorepo for Caniello MVP

## Status

Accepted

## Date

2026-05-17

## Decision

Caniello MVP will be developed as a TypeScript-first monorepo.

The landing page, web application, and API routes will live in a single Next.js application under:

- `apps/web`

The mobile application will live under:

- `apps/mobile`

Shared domain logic, types, configuration, and data-access utilities will live under:

- `packages/*`

Supabase will be used for database, authentication, storage, and row-level security.

Vercel will deploy the web application using:

- Root Directory: `apps/web`

The MVP will not include a separate FastAPI backend, separate backend repository, microservices, full back-office, marketplace, booking, payments, clinic SaaS, AI diagnosis, or official pet passport replacement.

## Context

Caniello is currently a focused MVP experiment around pet health records, reminders, document vault, and trusted sharing.

The goal is to reduce complexity, speed up validation, and keep the product architecture aligned with the MVP scope.

## Consequences

### Positive

- Faster MVP delivery.
- One language across web, mobile, shared packages, and API routes.
- Simpler deployment on Vercel.
- Easier sharing of types and validation schemas.
- Lower operational overhead than maintaining a separate backend service.

### Tradeoffs

- Next.js API routes become the initial backend boundary.
- Long-running backend jobs may require a separate worker or service later.
- A future dedicated backend may be needed if API complexity, AI processing, or background automation grows.

## Review triggers

Revisit this decision if:

- reminder processing requires reliable background jobs beyond what the MVP setup supports;
- mobile API needs become significantly different from web;
- document processing becomes heavy;
- AI-assisted workflows enter scope;
- back-office becomes operationally necessary;
- API traffic or security boundaries justify a separate backend.
