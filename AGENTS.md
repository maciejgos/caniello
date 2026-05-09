# Repository Guidelines

## Project Structure & Module Organization

This repository is Flow Forge, an AI-native PDLC workflow template for running human-governed product development with Codex. Treat `spec/` as the primary workspace until product implementation begins:

- `spec/requirements/` for business needs, constraints, and acceptance criteria.
- `spec/features/` for feature definitions, scope, and outcomes.
- `spec/stories/` for implementation-ready user stories and tasks.
- `spec/design/` for UX, technical design, and flows.
- `spec/plans/` for ExecPlans that guide complex Codex-executed implementation work.
- `spec/architecture-records/` for ADRs based on the included template.
- `spec/validation/` for acceptance checks, evaluation plans, and evidence that PDLC artifacts or delivered outcomes are complete.
- `spec/release-readiness/` for advisory release, merge, and deployment readiness records before human release decisions.
- `spec/lifecycle/` for post-release retrospectives, incidents, feedback, metrics, and continuous improvement notes.
- `.codex/` for Codex runtime configuration, including agent definitions, rules, and skills. Project-scoped custom subagents belong in standalone `.codex/agents/*.toml` files with `name`, `description`, and `developer_instructions`.
- `src/` for product implementation code once this template is instantiated. Source-specific agent guidance belongs in `src/AGENTS.md`.
- `tests/` for executable product tests once implementation tooling exists.

Each spec subdirectory should include a `README.md` explaining its purpose and a `TEMPLATE.md` for new artifacts, except `spec/plans/`, where `spec/plans/PLANS.md` is the authoritative self-contained guide for ExecPlan format and maintenance rules.

Keep generated output, caches, and dependency folders out of version control. Add `.gitignore` when a toolchain is introduced.

## Build, Test, and Development Commands

No package manager or build system is committed yet because this is currently a workflow template. When implementation tooling is added, document exact commands here. Expected examples:

- `npm install` or equivalent: install dependencies.
- `npm run dev`: start a local development process.
- `npm run build`: produce a production build or packaged plugin artifact.
- `npm test`: run the default test suite.
- `npm run lint`: check formatting and static-analysis rules.

Do not add setup steps that cannot be reproduced from committed files.

## Coding Style & Naming Conventions

Follow project tooling once it exists. Until then, use 2-space indentation for JavaScript, TypeScript, JSON, and Markdown. Prefer `camelCase` for variables and functions, `PascalCase` for classes and components, and `kebab-case` for filenames unless a framework requires otherwise.

Keep modules focused. Avoid large utility files; group shared helpers under `src/lib/` or `src/utils/` when needed.

## Testing Guidelines

During workflow-template work, validate Markdown structure, links, examples, and artifact completeness. Use `spec/validation/` for acceptance evidence before product code exists. During product implementation, place executable tests under `tests/` or beside source files with a suffix such as `.test.ts` or `.spec.ts`. Each behavior change should include a focused test where practical.

## Commit & Pull Request Guidelines

This repository has no commits yet, so no historical convention can be inferred. Use clear, imperative commit messages such as `Add PDLC spec templates`.

Before committing, run `git status --short` and verify only intentional files are staged. Pull requests should include a short summary, testing notes, and linked issues when applicable. Include screenshots or terminal output for user-visible changes, CLI behavior, or generated artifacts.

## Agent-Specific Instructions

Before broad changes, inspect the tree with `git status --short` and preserve user edits. Do not rewrite history on `main` unless requested. Update this guide whenever the repository gains tooling, directories, remotes, or contribution rules.

Nested `AGENTS.md` files may add more specific instructions for their subtree. Follow the closest applicable `AGENTS.md` when editing files.

Do not self-approve PDLC artifacts or checkpoints. Codex and subagents may draft artifacts, review artifacts, recommend readiness, and summarize evidence, but only an explicit human instruction can approve, accept, reject, or mark a checkpoint complete. Keep generated artifacts in `Draft` status unless the human explicitly asks to change the status.

Only use Codex subagents when the user explicitly asks for subagents, delegation, or parallel agent work. Prefer review subagents after PDLC artifacts exist:

- `product_coherence_reviewer` for product intent, scope, and artifact-chain consistency.
- `architecture_decision_reviewer` for solution design, ADR coverage, and architectural risk.
- `validation_gate_reviewer` for acceptance criteria, validation evidence, and CI/CD gate readiness.
- `execution_plan_reviewer` for ExecPlan self-containment, milestones, concrete steps, recovery, and implementation readiness.
- `implementation_reviewer` for checking implementation changes against the approved ExecPlan, scope, acceptance criteria, validation evidence, and no-self-approval policy.
- `security_reviewer` for security, privacy, permissions, data handling, dependency risk, and abuse cases.
- `quality_gate_reviewer` for maintainability, test quality, lint/type/build gates, Playwright UI evidence, and implementation hygiene.
- `release_readiness_reviewer` for final merge, release, or deployment readiness, approval state, validation evidence, unresolved risks, rollback, and no-self-approval policy.
- `lifecycle_learning_reviewer` for post-release learning, incidents, feedback, metrics, missed assumptions, follow-up requirements, ADR drift, and validation improvements.

## ExecPlans

When writing complex features or significant refactors, use an ExecPlan (as described in spec/plans/PLANS.md) from design to implementation. When executing an approved ExecPlan, use the `implementation-execution` skill and keep the ExecPlan updated as a living artifact.

## Implementation Guardrails

During implementation, create or switch to a feature branch before edits unless the human explicitly says to stay on the current branch. Use TDD and BDD where practical: define behavior first, add or update tests first when tooling exists, then implement the smallest scoped change. Apply SOLID and KISS principles so responsibilities stay focused, dependencies stay explicit, interfaces stay narrow, and the implementation remains as simple as the behavior allows. Use established design patterns when they clarify boundaries, lifecycle, orchestration, or extension points; avoid patterns that add ceremony without reducing real complexity. Validate usability with available lint, typecheck, build, unit, integration, manual, and end-to-end checks. Use Playwright for browser UI validation when a UI exists, and capture screenshots as reference evidence when useful. Review changes against design, security, quality, validation gates, and the no-self-approval policy before asking for human acceptance.

## Validation Review

After implementation, use the `validation-review` skill to record evidence under `spec/validation/`. Map validation back to requirements, features, stories, designs, ADRs, and ExecPlans. Distinguish passed, failed, skipped, unavailable, and future CI/CD checks. Do not mark validation accepted or complete without explicit human approval.

## Release Readiness

After validation review, use the `release-readiness` skill to prepare the final human release decision and record durable evidence under `spec/release-readiness/`. Summarize approval state, validation and CI/CD evidence, security and quality review notes, unresolved risks, rollback or recovery notes, and recommended next action. Do not merge, release, deploy, tag, announce, or mark release complete without explicit human approval.

## Lifecycle Retrospective

After release, merge, deployment, incident, or sustained usage, use the `lifecycle-retrospective` skill to record learnings under `spec/lifecycle/`. Route approved follow-up work back into requirements refinement, ADR updates, validation improvements, process changes, or operational work. Do not approve priorities, close incidents, or start a new lifecycle loop without explicit human approval.
