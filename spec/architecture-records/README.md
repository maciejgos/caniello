# Architecture Records

Use this directory for architecture decision records (ADRs). ADRs capture important decisions, their context, and their consequences so future contributors understand why the system evolved.

Use `TEMPLATE.md` when creating a new ADR. Prefer one decision per file.

## Naming

Use a four-digit numeric prefix and a kebab-case title:

```text
NNNN-short-decision-title.md
```

Keep superseded records in this directory when they explain important history, but mark their status and replacement clearly.

## Index

| ADR | Status | Decision |
| --- | --- | --- |
| [0000](./0000-superseded-caniello-mvp-stack.md) | Superseded | Historical MVP stack baseline |
| [0001](./0001-use-typescript-nextjs-monorepo.md) | Accepted | Use TypeScript-first Next.js monorepo for Caniello MVP |
| [0002](./0002-use-caniello-monorepo-directory-standard.md) | Accepted | Use Caniello monorepo directory standard |
| [0003](./0003-keep-landing-app-and-api-in-one-nextjs-project.md) | Accepted | Keep landing, web app, and API in one Next.js project |
| [0004](./0004-use-supabase-for-mvp-data-auth-storage-and-rls.md) | Accepted | Use Supabase for MVP data, auth, storage, and RLS |
| [0005](./0005-deploy-web-on-vercel.md) | Accepted | Deploy the web application on Vercel |
| [0006](./0006-use-pnpm-workspaces-and-turborepo.md) | Accepted | Use pnpm workspaces and Turborepo for the monorepo |
| [0007](./0007-use-react-native-expo-for-mobile.md) | Accepted | Use React Native and Expo for mobile |
| [0008](./0008-use-mvp-product-tooling-baseline.md) | Accepted | Use MVP product tooling baseline |
| [0009](./0009-use-one-vercel-project-for-mvp.md) | Accepted | Use one Vercel project for Caniello MVP |
| [0011](./0011-use-pragmatic-engineering-practices-from-mvp-start.md) | Accepted | Use pragmatic engineering practices from MVP start |
| [0012](./0012-polish-first-mvp-localization.md) | Accepted | Use Polish-first MVP localization |
| [0013](./0013-use-vercel-nextjs-platform-topology.md) | Accepted | Use Vercel and Next.js as the MVP platform topology |
| [0014](./0014-use-supabase-auth-minimal-rbac-and-audit.md) | Accepted | Use Supabase Auth with minimal RBAC and audit controls |
| [0015](./0015-use-supabase-data-lifecycle-and-rls.md) | Accepted | Use Supabase migrations, RLS, and lifecycle controls for MVP data |
| [0016](./0016-use-staged-ai-document-intake-pipeline.md) | Accepted | Use a staged AI document intake pipeline |
| [0017](./0017-use-scoped-share-tokens-and-deferred-pdf-export.md) | Accepted | Use scoped share tokens and defer PDF export |
| [0018](./0018-use-mailerlite-for-marketing-and-defer-transactional-email.md) | Accepted | Use MailerLite for marketing email and defer transactional email choice |
| [0019](./0019-use-vercel-supabase-observability-and-mvp-recovery.md) | Accepted | Use Vercel and Supabase observability with MVP recovery playbooks |
| [0020](./0020-defer-stripe-payments-until-paid-plan-stories.md) | Accepted | Defer Stripe payments until paid-plan stories are approved |
| [0021](./0021-use-vercel-ai-gateway-for-ai-provider-routing.md) | Accepted | Use Vercel AI Gateway for AI provider routing in MVP |
| [0022](./0022-use-host-first-local-development-setup.md) | Draft | Use host-first local development setup |
| [0023](./0023-use-config-toml-for-local-supabase-auth-providers.md) | Draft | Use config.toml for local Supabase Auth providers |
| [0024](./0024-separate-audit-logs-from-product-events.md) | Accepted | Separate audit logs from product events |
| [0025](./0025-use-supabase-storage-for-mvp-document-upload.md) | Accepted | Use Supabase Storage for MVP document upload |
| [0026](./0026-use-manual-data-rights-runbook-before-automated-account-lifecycle.md) | Accepted | Use manual data-rights runbook before automated account lifecycle |
| [0027](./0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md) | Accepted | Use first-pet MVP scope and defer multi-pet management |
| [0028](./0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md) | Accepted | Use feature-local vertical slices with explicit shared-package graduation |
| [0029](./0029-strengthen-scoped-share-link-lifecycle-before-caregiver-accounts.md) | Accepted | Strengthen scoped share-link lifecycle before caregiver accounts |
| [0030](./0030-use-disposable-validation-fixtures-for-live-rls-tests.md) | Accepted | Use disposable validation fixtures for live RLS tests |
| [0031](./0031-require-release-readiness-playbook-before-public-health-record-upload.md) | Accepted | Require release-readiness playbook before public health-record upload |
| [0032](./0032-use-email-first-owner-auth-and-defer-oauth-rollout.md) | Accepted | Use email-first owner auth and defer OAuth rollout |
