# TASK-017: Create the N2 Learning Package

- **Task ID**: `TASK-017`
- **Domain**: Frontend (JLPT N2 Content)
- **Status**: `DONE`
- **Priority**: `P0`
- **Dependencies**: `TASK-016`

## Objective
Build a complete original N2 course package after N3 passes its sequential release gate.

## Deliverables
- Define N2 outcomes/prerequisites and a coverage matrix before bulk content authoring.
- Create N2 lessons, vocabulary, grammar, kanji, reading, listening, speaking, exercises, and checkpoint practice.
- Add bilingual explanations, Japanese examples, answer rationales, and stable N2-scoped IDs.
- Integrate with shared routes, study tools, and isolated progress/review state.
- Keep N2 `in-progress` until its content and frontend quality gate passes.

## Acceptance Criteria
- [x] Content and practice cover every declared N2 outcome.
- [x] Data integrity, progression, assessment feedback, and level-scoped persistence pass (`audit:n2` 0 errors/0 warnings).
- [x] N2 was kept `in-progress` until the N2 gate passed, then marked `available`.
- [x] Backend `tsc`, frontend `tsc --noEmit`, and `next build` (22 routes) passed.
