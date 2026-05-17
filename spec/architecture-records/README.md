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
| [0010](./0010-use-dev-containers-for-local-development.md) | Accepted | Use Dev Containers for local development |
| [0011](./0011-use-pragmatic-engineering-practices-from-mvp-start.md) | Accepted | Use pragmatic engineering practices from MVP start |
| [0012](./0012-polish-first-mvp-localization.md) | Accepted | Use Polish-first MVP localization |
