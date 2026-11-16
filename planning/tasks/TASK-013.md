# TASK-013: N5–N1 Level Selection & Availability UX

- **Task ID**: `TASK-013`
- **Domain**: Frontend (Next.js / Level Navigation)
- **Status**: `DONE`
- **Priority**: `P0`
- **Dependencies**: `TASK-008`

## Objective
Connect the existing N5–N1 level registry to onboarding, the shared header, and the roadmap without exposing incomplete level content.

## Deliverables
1. Distinguish the learner's current study level from their target JLPT level. Support N5, N4, N3, N2, and N1 in typed profile data while preserving existing local profiles.
2. Show level status (`In progress`, `Available`, `Planned`) in the level picker and roadmap. A planned level is visible but cannot be selected as the current study level.
3. Allow the learner to set a future target level without falsely implying its curriculum is already available.
4. Keep N5 as the current usable course until another level passes its content gate.
5. Update N5-only brand copy in shared onboarding/navigation where it would incorrectly promise N5 as the product's final destination.

## Acceptance Criteria
- [x] Existing saved profiles still load; absent current-level data defaults safely to N5.
- [x] Current level and target level are separate values and are labeled clearly in the UI.
- [x] N4–N1 appear as planned and cannot navigate into incomplete lessons.
- [x] N5 remains reachable and existing N5 learning data is not reset.
- [x] Keyboard and mobile interactions work; root `npm run build` and `git diff --check` pass.

## Scope Notes
- Do not add N4 lesson content in this task.
- Do not change backend APIs or storage formats beyond a backward-compatible profile extension.
- Use the shared registry as the source of level order, prerequisites, and status.
