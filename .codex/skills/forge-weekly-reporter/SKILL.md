---
name: forge-weekly-reporter
description: Draft and finalize a Caniello weekly work report for external feedback by summarizing roadmap context, tasks, handoff notes, validation evidence, and git activity, then asking the human for reflection and feedback before finalizing.
---

# Forge Weekly Reporter

## Purpose

Create one weekly Caniello work report under `spec/weekly-reports/` for sharing progress and feedback with an external organization such as The Future Thinker World.

The report is a communication artifact, not a roadmap authority. It may summarize status, learning, risks, feedback requests, and next steps, but it must not approve scope, mark human checkpoints complete, or move roadmap items.

## Inputs

- Human-provided audience, date range, and emphasis, if provided.
- `AGENTS.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/handoff.md`
- Relevant files in `spec/tasks/`, `spec/features/`, and `spec/validation/`
- Recent git activity for the reporting period
- Current dirty worktree status

## Workflow

1. Determine the report week.
   - If the user gives dates, use them.
   - Otherwise use the last seven calendar days ending today.
   - Use absolute dates in the report title and metadata.
2. Inspect `spec/product-context.md` and `spec/roadmap.md` to keep the report aligned with the MVP promise and current roadmap phase.
3. Inspect `spec/handoff.md` for current working state, validation status, known gaps, and next action.
4. Inspect relevant task, feature, and validation files changed or referenced during the week.
5. Inspect git history and worktree state:
   - commits in the date range;
   - changed files in the date range;
   - current branch;
   - uncommitted changes, clearly labeled as in progress.
6. Draft a concise weekly report with evidence-based statements only.
7. Ask the human for feedback before finalizing. Include short questions such as:
   - What personal learning or reflection should be added?
   - What challenges or blockers should be named?
   - What feedback should The Future Thinker World be asked to provide?
   - Is there anything sensitive or internal that should be removed?
8. After the human responds, incorporate their feedback and write the final report.
9. If the human asks only for a draft, write a draft clearly labeled `Draft - awaiting human feedback`.
10. Mention skipped or unavailable evidence instead of pretending the report is complete.

## Rules

- Do not invent completed work.
- Do not claim validation passed unless evidence exists.
- Do not move roadmap items or expand MVP scope.
- Do not mark tasks, ADRs, releases, PRs, or approvals complete.
- Distinguish completed, in-progress, planned, blocked, and proposed work.
- Keep external-facing wording clear, plain, and non-technical where possible.
- Keep sensitive details out of the final report unless the human explicitly asks to include them.
- Prefer one report file per week.

## Report Path

Use:

```text
spec/weekly-reports/YYYY-MM-DD-caniello-weekly-report.md
```

Use the report end date for `YYYY-MM-DD`.

Create `spec/weekly-reports/` if it does not exist.

## Report Shape

Use this structure unless the user requests another format:

```markdown
# Caniello Weekly Work Report

Week: YYYY-MM-DD to YYYY-MM-DD
Prepared for: The Future Thinker World
Status: Draft | Final

## Summary

## Product Focus

## Work Completed

## Work In Progress

## Validation and Evidence

## Key Learnings

## Challenges and Risks

## Feedback Requested

## Next Steps

## Source Notes
```

`Source Notes` should list the local evidence used, such as task files, handoff notes, validation files, and git commits. Keep it brief.

## Output

End with:

- report path;
- status: `Draft - awaiting human feedback` or `Final`;
- reporting dates;
- evidence used;
- feedback incorporated or still needed.
