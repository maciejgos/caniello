# 0005 — Deploy the web application on Vercel

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP will deploy the web application on Vercel.

The MVP Vercel project should be:

- Project: `caniello-web`
- Root Directory: `apps/web`
- Domain: `www.caniello.com`

The MVP will not create a separate `caniello-api` Vercel project because API routes live inside the Next.js application.

## Context

Caniello MVP uses a single Next.js application for landing, authenticated app, API routes, and trusted sharing. Vercel is a natural deployment target for this shape because it supports Next.js routing, server-side behavior, preview deployments, analytics, and domain management with low setup overhead.

## Consequences

### Positive

- Direct fit for the chosen Next.js application architecture.
- Simple deployment from `apps/web`.
- Preview deployments can support fast review of product and landing changes.
- `www.caniello.com` can serve both marketing and MVP web app routes.
- No separate API deployment is needed for MVP.

### Tradeoffs

- Vercel-specific runtime behavior may influence implementation choices.
- Long-running or compute-heavy work may need a separate service later.
- Deployment configuration must remain aligned with the monorepo root and `apps/web` root directory.

## Implementation Standard

The web deployment should treat `apps/web` as the Vercel root directory.

API routes, webhooks, and trusted sharing routes should be implemented inside the Next.js app unless a later ADR introduces a separate backend or worker.

## Review triggers

Revisit this decision if:

- API or background workload requirements exceed Vercel's practical MVP fit;
- another platform becomes necessary for cost, compliance, region, or runtime reasons;
- Caniello introduces multiple deployable web applications;
- the product requires a separate API deployment boundary.
