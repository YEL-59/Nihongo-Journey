# TASK-015: Create the N4 Learning Package

- **Task ID**: `TASK-015`
- **Domain**: Frontend (JLPT N4 Content)
- **Status**: `DONE`
- **Priority**: `P0`
- **Dependencies**: `TASK-014`

## Objective
Author and integrate a complete original N4 course package using shared N5–N1 content contracts and reusable frontend tools.

## Deliverables
- Define N4 outcomes, prerequisites, module/chapter/lesson map, and coverage matrix.
- Create N4 lesson content, vocabulary, grammar, kanji, reading, listening, speaking, exercises, and an N4 practice/checkpoint set.
- Include Japanese, readings/romaji where supported, Bangla and English explanations, examples, feedback, and stable level-scoped IDs.
- Wire the N4 package into shared routes and level-specific progress/review without duplicating page implementations.
- Keep N4 `in-progress` until content, route, assessment, and accessibility checks pass.

## Acceptance Criteria
- [x] Each authored learning outcome has teaching content and answerable practice.
- [x] Required fields, IDs, answers, and lesson relationships pass content-integrity checks.
- [x] User progress cannot collide with N5 data.
- [x] N4 is not published as available until the full level gate passes.
- [x] Frontend build and browser smoke tests pass.
