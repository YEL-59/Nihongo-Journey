# TASK-018: Create the N1 Learning Package

- **Task ID**: `TASK-018`
- **Domain**: Frontend (JLPT N1 Content)
- **Status**: `DONE`
- **Priority**: `P0`
- **Dependencies**: `TASK-017`

## Objective
Build a complete original N1 course package after N2 passes its sequential release gate.

## Deliverables
- Define N1 outcomes/prerequisites and a coverage matrix before bulk content authoring.
- Create N1 lessons, vocabulary, grammar, kanji, reading, listening, speaking, exercises, and checkpoint practice.
- Include advanced authentic-style original material, bilingual explanations, Japanese examples, and answer rationales.
- Integrate with shared routes, study tools, and isolated progress/review state.
- Keep N1 `in-progress` until its content and frontend quality gate passes.

## Acceptance Criteria
- [x] Content and practice cover every declared N1 outcome (`planning/N1_COVERAGE_MATRIX.md`).
- [x] Data integrity, progression, assessment feedback, and level-scoped persistence pass (`audit:n1` 0 errors/0 warnings).
- [x] N1 was kept `in-progress` during authoring and marked `available` only after the N1 gate passed.
- [x] Backend `tsc --noEmit`, frontend `tsc --noEmit`, and frontend `next build` (22 routes) passed.
