# 0019 - Use Vercel and Supabase observability with MVP recovery playbooks

## Status

Draft

## Date

2026-05-17

## Context

The MVP needs enough operational visibility for landing, app, API routes, data services, and future document processing without introducing a heavy observability stack too early.

## Decision

Vercel provides deployment logs, runtime logs, preview deployments, rollback, Web Analytics, and Speed Insights for the web surface. Supabase provides database, Auth, Storage, and RLS operational visibility for MVP data services.

Application events should be recorded for important product behavior once product flows exist: signup, first pet, first document, processing failure, extraction confirmed, reminder created, share created, share revoked, export generated, and account deletion requested.

PostHog remains deferred until Caniello needs deeper activation, retention, and product analytics beyond Vercel Analytics and MailerLite signup/survey evidence. Health checks start with a lightweight Next.js API route and Supabase connectivity check during local platform foundation. Job monitoring becomes required when asynchronous document processing is introduced.

Incident response for MVP must be documented in release-readiness before public health-record upload: pause traffic, disable provider credentials, revoke problematic share links, redeploy previous Vercel deployment, and preserve audit evidence.

## Consequences

This gives the MVP practical observability and recovery without a large platform build. The tradeoff is that deeper product analytics and job monitoring remain future work until product flows justify them.

## Related Artifacts

- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [0005 - Deploy the web application on Vercel](./0005-deploy-web-on-vercel.md)
- [0008 - Use MVP product tooling baseline](./0008-use-mvp-product-tooling-baseline.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
