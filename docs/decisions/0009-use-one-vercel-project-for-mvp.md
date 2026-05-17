# 0009 — Use one Vercel project for Caniello MVP

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP will use one GitHub repository and one Vercel project for the deployable web application.

The MVP setup is:

- GitHub repository: `caniello`
- Vercel project: `caniello-web`
- Root Directory: `apps/web`
- Domain: `www.caniello.com`

The single `caniello-web` project will serve:

- `www.caniello.com` for the landing page
- `www.caniello.com/privacy` for privacy policy
- `www.caniello.com/app` for the authenticated web application
- `www.caniello.com/api/*` for API routes
- `www.caniello.com/share/*` for trusted sharing

This means the landing page, web app, and API routes are one Vercel project because they all live inside `apps/web`.

## Context

ADR 0001 establishes Caniello MVP as a TypeScript-first monorepo. ADR 0003 keeps the landing page, authenticated app, and API routes in one Next.js project. ADR 0005 chooses Vercel for deploying the web application.

This decision records the deployment topology for MVP: one monorepo may support multiple Vercel projects over time, but MVP only needs one Vercel project because it has one deployable web application.

## Consequences

### Positive

- Simplest possible Vercel setup for MVP.
- One project owns landing, web app, API routes, and trusted sharing.
- No deployment split between landing and app during early validation.
- No separate API deployment to configure, secure, monitor, or maintain.
- Vercel Root Directory remains aligned with the monorepo structure: `apps/web`.

### Tradeoffs

- Landing, app, API routes, and sharing routes share one Vercel project lifecycle.
- App routes initially live under `www.caniello.com/app` rather than a dedicated `app.caniello.com` subdomain.
- If back-office or API boundaries become necessary later, new Vercel projects and domains will need to be introduced deliberately.

## Explicit non-goals for MVP

The MVP will not create these Vercel projects:

- `caniello-api`, because there is no separate `apps/api`.
- `caniello-backoffice`, because back-office is outside MVP.
- `caniello-mobile`, because mobile is not deployed through Vercel.

The mobile app may live in the monorepo under `apps/mobile`, but mobile deployment belongs to:

- Expo / EAS
- App Store Connect
- Google Play Console

## Future Vercel project split

Additional Vercel projects may be introduced later if Caniello adds separate deployable applications:

- `caniello-web`
  - Root Directory: `apps/web`
  - Domain: `www.caniello.com` or `app.caniello.com`
- `caniello-backoffice`
  - Root Directory: `apps/backoffice`
  - Domain: `admin.caniello.com`
- `caniello-api`
  - Root Directory: `apps/api`
  - Domain: `api.caniello.com`

These projects are not needed for MVP.

## Implementation Standard

Vercel projects should map to deployable applications, not to every folder in the monorepo.

For MVP:

- use one GitHub repository: `caniello`;
- use one Vercel project: `caniello-web`;
- set Vercel Root Directory to `apps/web`;
- serve landing, app, API routes, and trusted sharing from that project;
- do not create separate Vercel projects for API, back-office, or mobile.

## Review triggers

Revisit this decision if:

- `apps/backoffice` enters MVP or near-term product scope;
- a separate `apps/api` becomes necessary;
- `app.caniello.com`, `admin.caniello.com`, or `api.caniello.com` becomes operationally useful;
- API isolation is needed for security, scaling, ownership, or reliability;
- mobile deployment requirements become coupled to web release workflows.
