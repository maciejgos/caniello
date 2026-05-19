# Validation

Use this directory for acceptance checks, evaluation plans, review evidence, and validation scenarios for PDLC artifacts.

Validation here is about proving that requirements, features, stories, plans, and delivered outcomes are coherent and complete. Executable product tests should live in root-level `tests/` or beside source once product implementation begins.

Create one focused Markdown file per active validation scenario using `TEMPLATE.md`. When several old validation files cover incremental fixes for the same shipped slice, prefer a single history rollup so future agents can find the current evidence quickly.

## Human Checkpoint State

Directory guidance changes are draft workflow updates until a human explicitly reviews and approves them. Do not mark validation accepted, approved, complete, released, or merged without an explicit human decision.

Current rollups:

- `landing-page-validation-history.md`: consolidated landing-page validation evidence from the first landing page through routing, legal, analytics, and research-page fixes.
