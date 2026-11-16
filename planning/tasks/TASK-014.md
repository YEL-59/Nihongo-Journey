# TASK-014: N5 Content Audit & Completion Gate

- **Task ID**: `TASK-014`
- **Domain**: Frontend (N5 Curriculum & QA)
- **Status**: `DONE`
- **Priority**: `P0`
- **Dependencies**: `TASK-013`

## Objective
Verify the existing N5 package end-to-end, retain its current lessons and datasets, and fill the remaining coverage gaps before N4 is released.

## Deliverables
- Audit the 25 lesson records, approximately 156 vocabulary entries, approximately 103 kanji, grammar coverage, exercises, and 12-question practice set.
- Expand the currently small reading, listening, and speaking activity sets with original material and linked comprehension/practice checks.
- Verify each lesson presents and scores all required exercises, saves progress accurately, and handles retries/review.
- Create a data-integrity/coverage report or tests for unique IDs, required Bangla/English fields, valid answers, and cross-links.
- Keep N5 `in-progress` until all acceptance checks pass; do not imply official JLPT score equivalence.

## Acceptance Criteria
- [x] Every declared N5 outcome maps to content and at least one practice/check item.
- [x] No lesson is marked complete while required scored work is unavailable.
- [x] Skill and exam answers, explanations, saved progress, and empty states are verified.
- [x] Original content only; no copied textbook passages or official exam questions.
- [x] Frontend build, content-integrity checks, and browser smoke tests pass.
