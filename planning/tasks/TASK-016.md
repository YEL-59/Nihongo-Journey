# TASK-016: Create the N3 Learning Package

- **Task ID**: `TASK-016`
- **Domain**: Frontend (JLPT N3 Content)
- **Status**: `DONE`
- **Priority**: `P0`
- **Dependencies**: `TASK-015`

## Objective
Build a complete original N3 course package after N4 passes its sequential release gate.

## Deliverables
- Define N3 outcomes and prerequisites, then map modules and lessons to a coverage matrix.
- Create N3 lessons, vocabulary, grammar, kanji, reading, listening, speaking, exercises, and checkpoint practice.
- Add bilingual explanations, Japanese examples, answer rationales, and stable N3-scoped IDs.
- Integrate with shared routes, study tools, and isolated progress/review state.
- Keep N3 `in-progress` until its content and frontend quality gate passes.

## Acceptance Criteria
- [x] Content and practice cover every declared N3 outcome (`planning/N3_COVERAGE_MATRIX.md`).
- [x] Data integrity, progression, assessment feedback, and level-scoped persistence pass (`audit:n3` 0 errors/0 warnings).
- [x] N3 remained `in-progress` until `audit:n3` passed, then marked `available`.
- [x] Frontend `next build` (22 routes) and backend `tsc` passed; N3 browser smoke test was started and canceled by user to switch to Kilo Code.
