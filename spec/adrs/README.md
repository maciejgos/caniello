# Architecture Decisions

ADRs record durable, expensive-to-reverse decisions. New records use the next four-digit number and `TEMPLATE.md`; drafts require explicit human approval before dependent implementation.

| ADR                                                                                       | Status     | Decision                                      |
| ----------------------------------------------------------------------------------------- | ---------- | --------------------------------------------- |
| [0001](0001-use-typescript-nextjs-monorepo.md)                                            | Accepted   | TypeScript-first Next.js monorepo             |
| [0002](0002-use-caniello-monorepo-directory-standard.md)                                  | Superseded | Original monorepo documentation layout        |
| [0003](0003-keep-landing-app-and-api-in-one-nextjs-project.md)                            | Accepted   | One Next.js project for landing, app, and API |
| [0004](0004-use-supabase-for-mvp-data-auth-storage-and-rls.md)                            | Accepted   | Supabase data, auth, storage, and RLS         |
| [0005](0005-deploy-web-on-vercel.md)                                                      | Accepted   | Vercel web deployment                         |
| [0006](0006-use-pnpm-workspaces-and-turborepo.md)                                         | Accepted   | pnpm workspaces and Turborepo                 |
| [0007](0007-use-react-native-expo-for-mobile.md)                                          | Accepted   | React Native and Expo for mobile              |
| [0008](0008-use-mvp-product-tooling-baseline.md)                                          | Accepted   | MVP product tooling baseline                  |
| [0009](0009-use-one-vercel-project-for-mvp.md)                                            | Accepted   | One Vercel MVP project                        |
| [0011](0011-use-pragmatic-engineering-practices-from-mvp-start.md)                        | Accepted   | Pragmatic engineering practices               |
| [0012](0012-polish-first-mvp-localization.md)                                             | Accepted   | Polish-first localization                     |
| [0013](0013-use-vercel-nextjs-platform-topology.md)                                       | Accepted   | Vercel and Next.js topology                   |
| [0014](0014-use-supabase-auth-minimal-rbac-and-audit.md)                                  | Accepted   | Supabase Auth, minimal RBAC, and audit        |
| [0015](0015-use-supabase-data-lifecycle-and-rls.md)                                       | Accepted   | Migrations, RLS, and data lifecycle           |
| [0016](0016-use-staged-ai-document-intake-pipeline.md)                                    | Accepted   | Staged AI document intake                     |
| [0017](0017-use-scoped-share-tokens-and-deferred-pdf-export.md)                           | Accepted   | Scoped share tokens and deferred PDF          |
| [0018](0018-use-mailerlite-for-marketing-and-defer-transactional-email.md)                | Accepted   | MailerLite marketing boundary                 |
| [0019](0019-use-vercel-supabase-observability-and-mvp-recovery.md)                        | Accepted   | Observability and recovery                    |
| [0020](0020-defer-stripe-payments-until-paid-plan-stories.md)                             | Accepted   | Deferred Stripe payments                      |
| [0021](0021-use-vercel-ai-gateway-for-ai-provider-routing.md)                             | Accepted   | Vercel AI Gateway routing                     |
| [0022](0022-use-host-first-local-development-setup.md)                                    | Draft      | Host-first local development                  |
| [0023](0023-use-config-toml-for-local-supabase-auth-providers.md)                         | Draft      | Local Auth provider configuration             |
| [0024](0024-separate-audit-logs-from-product-events.md)                                   | Accepted   | Separate audit and product events             |
| [0025](0025-use-supabase-storage-for-mvp-document-upload.md)                              | Accepted   | Private Supabase document storage             |
| [0026](0026-use-manual-data-rights-runbook-before-automated-account-lifecycle.md)         | Accepted   | Manual data-rights operations                 |
| [0027](0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md)                    | Accepted   | First-pet MVP scope                           |
| [0028](0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md) | Accepted   | Feature-local vertical slices                 |
| [0029](0029-strengthen-scoped-share-link-lifecycle-before-caregiver-accounts.md)          | Accepted   | Hardened share-link lifecycle                 |
| [0030](0030-use-disposable-validation-fixtures-for-live-rls-tests.md)                     | Accepted   | Disposable live RLS fixtures                  |
| [0031](0031-require-release-readiness-playbook-before-public-health-record-upload.md)     | Accepted   | Public-upload release readiness               |
| [0032](0032-use-email-first-owner-auth-and-defer-oauth-rollout.md)                        | Accepted   | Email-first owner authentication              |
| [0033](0033-use-lean-spec-driven-workflow.md)                                             | Accepted   | Lean spec-driven workflow                     |
