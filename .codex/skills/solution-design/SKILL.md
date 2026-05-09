---
name: solution-design
description: Turn approved features or stories into reviewable solution design artifacts, architecture decision records, and validation strategies. Use when Codex is asked to design UX flows, system behavior, technical approach, data flow, interfaces, tradeoffs, risks, ADRs, CI/CD validation gates, or continuous lifecycle checks before execution planning or implementation.
---

# Solution Design

## Overview

Turn approved feature or story intent into a design that can be reviewed, validated, and later converted into an ExecPlan. This skill is the architecture checkpoint in the PDLC flow: it identifies important decisions, records durable ADRs, and defines validation that can eventually become CI/CD or continuous lifecycle checks.

## Operating Principles

- Start from approved or review-ready feature and story artifacts.
- Never self-approve a design, ADR, validation strategy, or checkpoint; only a human can approve, accept, reject, or mark it complete.
- Design for observable behavior, maintainability, and validation, not just implementation convenience.
- Treat architecture decisions as durable product assets.
- Create an ADR when a decision affects system boundaries, data ownership, runtime behavior, security, deployment, extensibility, dependency choice, or long-term maintainability.
- Define validation while designing, including checks that can later run continuously in CI/CD.
- Preserve uncertainty as risks, tradeoffs, assumptions, or open questions.
- Do not create ExecPlans, source code, tests, or CI configuration unless the user explicitly asks to continue beyond design.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, `spec/README.md`, `spec/design/TEMPLATE.md`, `spec/architecture-records/TEMPLATE.md`, and `spec/validation/TEMPLATE.md` when they exist. Read the source feature or story files and any linked requirements.

2. Check design readiness.
   Confirm that the source artifacts contain enough scope, behavior, acceptance criteria, users, constraints, and unresolved questions to support design. If not, recommend returning to feature shaping or story breakdown.

3. Identify design scope.
   Decide whether the work needs a product/UX design, technical design, data or interface design, operating model, validation design, or a combination. Keep the design focused on the specific feature or story unless the user asks for a broader architecture.

4. Apply architecture guardrails.
   Start from the preferred architecture options in this skill unless the source artifacts or human direction require another path. When choosing or rejecting one of these options, record the rationale in the design and create or recommend an ADR if the choice is durable.

5. Draft the solution design.
   Use `spec/design/TEMPLATE.md` as the structure. Create or update one focused Markdown file in `spec/design/` using a kebab-case filename, such as `pdlc-artifact-flow.md` or `continuous-validation-gates.md`.

6. Make architecture decisions explicit.
   Identify decisions that should not remain hidden inside the design document. Create or update ADRs under `spec/architecture-records/` when the decision is durable, costly to reverse, cross-cutting, or important for future contributors. Keep ADRs short and link them from the design.

7. Define validation strategy.
   In the design `Validation` section, describe how the design can be reviewed, tested, demonstrated, or monitored. Include checks that could later become CI/CD gates, such as artifact schema checks, link checks, required-section checks, acceptance-criteria checks, policy checks, test commands, build checks, or release-readiness checks.

8. Separate immediate validation from lifecycle validation.
   Immediate validation proves the current design is acceptable. Lifecycle validation proves the design remains true as the product evolves. If a validation scenario should become a durable project check, create or recommend a matching artifact under `spec/validation/`.

9. Check execution readiness.
   Before finishing, verify that the design has enough detail for an ExecPlan or direct implementation. If not, record the missing decisions. Keep status as `Draft` unless the human explicitly approves the design and any related ADRs.

10. Recommend subagent review when risk warrants it.
   If the user explicitly asks for subagents, parallel review, or independent validation, use `architecture_decision_reviewer` to review architecture and ADR coverage, and use `validation_gate_reviewer` to review immediate and continuous validation gates. Use `product_coherence_reviewer` when there is concern that the design no longer preserves the source feature or story intent.

## Architecture Guardrails

Use these as preferred defaults during solution design. They guide decisions but do not approve them. Durable choices still need human approval and often need ADRs.

### Preferred Application Stack

- Frontend: React for interactive product UI.
- Styling: TailwindCSS for utility-first styling and fast iteration.
- Backend/API option A: Python with FastAPI for AI orchestration, API endpoints, validation workflows, data processing, and integrations that benefit from the Python ecosystem.
- Backend/API option B: Node.js with TypeScript for type-safe full-stack development, Cloudflare- or Vercel-hosted APIs, shared frontend/backend types, real-time features, and teams that prefer a TypeScript-first codebase.
- Frontend/full-stack hosting: Cloudflare Pages or Vercel for web UI delivery, preview deployments, serverless functions, and frontend-adjacent API routes.
- Edge/API gateway: Cloudflare Workers, Vercel Edge Middleware, or Vercel Edge Functions only for lightweight routing, request shaping, caching, auth handoff, and edge concerns.
- AI/model runtime: server-side model provider APIs or dedicated backend services as the feature requires; do not assume a managed cloud AI platform as the default.
- Database: choose per feature based on data model, access patterns, consistency needs, hosting constraints, and operational ownership.

### Separation of Responsibilities

- Keep React responsible for browser interaction, client state, and user-facing flows.
- Keep TailwindCSS responsible for styling; avoid introducing a separate component styling framework without an ADR.
- Keep Cloudflare or Vercel responsible for web hosting, preview deployments, global delivery, frontend-adjacent serverless APIs, and lightweight edge request handling.
- Keep FastAPI responsible for backend business logic, orchestration, long-running workflows, server-side validation, data processing, and integration with AI/cloud services when Python is the better fit.
- Keep Node.js with TypeScript responsible for backend APIs, shared type contracts, Cloudflare- or Vercel-hosted services, event-driven workflows, or full-stack TypeScript systems when TypeScript is the better fit.
- Keep AI/model providers behind server-side boundaries; do not put provider secrets, evaluation pipelines, or model operations in frontend code.
- Keep databases responsible for durable state, audit trails, workflow state, user data, and queryable validation evidence. Do not use chat history as the source of record.

### Decision Rules

- Prefer React + TailwindCSS for UI unless the feature is non-visual or the user chooses another frontend stack.
- Prefer Cloudflare Pages or Vercel for frontend or full-stack web hosting when the product needs a web UI; choose based on deployment workflow, runtime needs, edge behavior, team familiarity, and operational ownership.
- Prefer Cloudflare Workers, Vercel Edge Middleware, or Vercel Edge Functions for edge glue, not heavy backend orchestration.
- Prefer FastAPI for backend services that need Python libraries, AI orchestration, server-side workflow logic, data processing, or deeper cloud SDK integration.
- Prefer Node.js with TypeScript for backend services that benefit from shared types with React, Cloudflare or Vercel deployment compatibility, event-driven APIs, real-time behavior, or a TypeScript-first developer experience.
- Prefer server-side model provider integrations or dedicated backend services for AI workloads, evaluation pipelines, or managed model operations.
- Prefer PostgreSQL-compatible relational storage for core product data, workflow state, approvals, audit logs, and relationships that need consistency and queryability.
- Prefer object storage for large files, generated artifacts, screenshots, exports, or evidence blobs.
- Prefer key-value or edge storage only for low-latency cache, session, feature-flag, or ephemeral edge data.
- Prefer vector storage only when semantic retrieval is an explicit feature requirement; define source-of-truth storage separately.
- Do not force every feature through all layers. A documentation-only or artifact-validation feature may not need UI, backend, edge, or AI provider integration.
- If choosing between FastAPI and Node.js with TypeScript, explain the decision using team skills, runtime target, AI/data needs, type-sharing needs, deployment model, and operational complexity.
- If FastAPI is proposed for edge runtime behavior, explain the hosting target, because Cloudflare Workers and Vercel Edge Functions do not run normal Python FastAPI applications.
- If Node.js with TypeScript is proposed for AI orchestration, explain how model calls, evaluation, data processing, and SDK support will be handled.
- If a database is introduced, define data ownership, migration approach, backup/recovery expectations, retention, access controls, local development setup, and CI/CD validation checks.
- If a design crosses Cloudflare- or Vercel-hosted code and external AI/model providers, describe the boundary, data flow, authentication path, observability needs, and failure behavior.

### ADR Expectations

Create or recommend ADRs for:

- Choosing React + TailwindCSS as the frontend stack.
- Choosing Cloudflare or Vercel for hosting, edge routing, serverless functions, preview deployments, or deployment workflows.
- Choosing Python + FastAPI as the backend/API layer.
- Choosing Node.js + TypeScript as the backend/API layer.
- Choosing an AI runtime, model provider, evaluation service, or model operations platform.
- Choosing a database, persistence model, migration approach, or storage provider.
- Defining the boundary between Cloudflare or Vercel edge behavior and backend behavior.
- Defining data flow, authentication, authorization, audit, or privacy behavior across Cloudflare- or Vercel-hosted code, backend services, and AI/model providers.

## Architecture Decision Triggers

Create or recommend an ADR when the design includes:

- A dependency, framework, runtime, hosting, database, or external service choice.
- A boundary between modules, agents, plugins, workflows, or systems.
- A data ownership, persistence, privacy, or retention decision.
- A security, permissions, approval, audit, or compliance decision.
- A CI/CD, release, deployment, rollback, or operational policy.
- A decision that future contributors are likely to question.
- A tradeoff where multiple reasonable options exist and the rationale matters.

Do not create an ADR for incidental implementation details that can change locally without broad impact.

## Continuous Validation Guidance

When the user wants validation to be included in CI/CD or run continuously, design checks in layers:

- Static artifact checks: required Markdown sections, status values, links, naming, and references between requirements, features, stories, designs, ADRs, and validation files.
- Policy checks: human checkpoint presence, approval status, open-question handling, and ADR coverage for durable decisions.
- Product checks: unit tests, integration tests, build commands, linting, type checks, and end-to-end behavior once product code exists.
- Release checks: validation evidence, unresolved risk review, changelog or release notes, rollback notes, and final human approval.

State which checks can exist now, which require future tooling, and which should block CI/CD later.

## Design Quality Bar

A solution design should answer:

- Which feature or story does this design support?
- What behavior or workflow will exist after implementation?
- What architecture choices are being made?
- Which alternatives were considered?
- What risks, tradeoffs, assumptions, and open questions remain?
- Which decisions need ADRs?
- How will the design be validated immediately?
- How can the design be checked continuously during the product lifecycle?
- What must be true before execution planning or implementation begins?

## Human Checkpoint

End solution-design work by asking the human to approve or revise:

- Proposed design
- Architecture decisions and ADRs
- Alternatives and tradeoffs
- Risks and assumptions
- Immediate validation approach
- Future CI/CD or continuous validation gates
- Whether subagent review is needed before execution planning
- Whether the design is ready for an ExecPlan or implementation

Do not move to `spec/plans/`, `spec/validation/`, `tests/`, CI/CD configuration, or `src/` until this checkpoint is approved or the user explicitly asks to continue. When the design is approved and the next step is planning implementation, use the `execution-planning` skill.

Codex and subagents may recommend that the design, ADRs, or validation strategy are ready for review, but must not change status to approved or treat the checkpoint as complete without explicit human approval.

## Output Pattern

When creating or updating solution design artifacts, provide:

- The design file path.
- Any ADR file paths created or recommended.
- Any validation file paths created or recommended.
- Source feature, story, and requirement file paths.
- A short summary of the design direction.
- Key architecture decisions and tradeoffs.
- Immediate and future lifecycle validation notes.
- The human approval checkpoint and recommended next action.
