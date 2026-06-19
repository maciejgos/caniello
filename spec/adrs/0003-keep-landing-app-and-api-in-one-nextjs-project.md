# 0003 — Keep landing, web app, and API in one Next.js project

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP will keep the public landing page, authenticated web application, backend-for-frontend logic, API routes, webhooks, and trusted sharing routes in one Next.js application under `apps/web`.

The application will use:

- Next.js
- React
- TypeScript
- Zod for runtime validation and schema definitions
- React Hook Form for form state where forms are non-trivial
- TanStack Query only if client-side API usage becomes complex enough to justify it

The recommended MVP routes are:

- `www.caniello.com` for the landing page
- `www.caniello.com/privacy` for privacy policy
- `www.caniello.com/terms` for terms when needed
- `www.caniello.com/app` for the authenticated web app
- `www.caniello.com/share/[token]` for trusted sharing and care cards

`app.caniello.com` may be introduced later if the product needs a dedicated application subdomain.

## Context

Caniello MVP needs to validate pet health records, reminders, document vault, and trusted sharing without carrying the operational weight of a separate backend service.

Next.js allows the product to keep marketing pages, application UI, API routes, server-side logic, and integration endpoints in one deployable application. This supports the accepted TypeScript-first monorepo direction and avoids introducing FastAPI or a separate API repository for MVP.

## Consequences

### Positive

- Fewer deployable units for MVP.
- One TypeScript codebase for landing, app UI, and backend-for-frontend routes.
- Easier sharing of validation schemas and API contracts.
- Simpler Vercel deployment using `apps/web` as the root directory.
- Lower operational overhead than a separate backend service.

### Tradeoffs

- Next.js API routes become the initial backend boundary.
- Long-running jobs, heavy document processing, and complex AI workflows may need a worker or backend service later.
- The app must keep route groups, feature modules, and server/client boundaries disciplined to avoid a tangled web application.

## Implementation Standard

Implementation should place Next.js route files under `apps/web/app`, feature-specific UI and application logic under `apps/web/features`, and web-only integration helpers under `apps/web/lib`.

Route groups should follow the directory standard in ADR 0002:

- `app/(marketing)/`
- `app/(app)/`
- `app/api/`
- `app/share/[token]/`

## Review triggers

Revisit this decision if:

- API complexity outgrows Next.js API routes;
- background processing becomes reliable-job infrastructure rather than request/response logic;
- AI-assisted workflows enter MVP scope;
- `app.caniello.com` becomes operationally useful;
- a separate backend boundary becomes necessary for security, scaling, or team ownership.
