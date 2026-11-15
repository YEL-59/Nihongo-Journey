# TASK-019: Verify the Complete N5–N1 Frontend

- **Task ID**: `TASK-019`
- **Domain**: Frontend QA (Local-First Release)
- **Status**: `DONE`
- **Priority**: `P0`
- **Dependencies**: `TASK-018`

## Objective
Verify the complete five-level learner journey before starting backend implementation.

## Deliverables
- Test onboarding, current/target levels, status locks, shared routes, and level-specific progress.
- Verify lesson, vocabulary, kanji, grammar, reading, listening, speaking, quiz, and exam experiences for every published level.
- Verify loading, empty, error, success, keyboard/focus, and responsive states; confirm planned levels cannot be entered.
- Check local persistence, import/export compatibility, and legacy N5 progress migration.
- Run all frontend builds and content-integrity/browser checks; document remaining deferred issues.

## Acceptance Criteria
- [x] No route displays another level's content or progress.
- [x] Only levels passing their content gates are marked available.
- [x] N5 through N1 navigation works on desktop and mobile.
- [x] Frontend production build and focused regression checks pass.
- [x] TASK-009 may begin only after this task is complete.

## Verification Notes (2026-11-15)
- **Audits & Builds**: `audit:n5` through `audit:n1` (0 errors, 0 warnings), backend `tsc --noEmit`, frontend `tsc --noEmit`, and `next build` (22 routes, compiled Tailwind CSS `0ccd2bf2b19d48e8.css`) passed.
- **Fixes Applied**: Added `frontend/postcss.config.mjs` (resolving uncompiled `@tailwind` directives in CSS output) and updated `frontend/src/components/layout/Sidebar.tsx` so `JLPT ${profile.currentLevel} Simulator` and `Lesson Player` badge (`1-25` / `1-16`) reflect the active study level.
- **Browser QA**: Verified onboarding Steps 1–3 (`#target-jlpt-level`), `/roadmap` N5–N1 cards, `#current-study-level` switching across N5–N1, `/learn`, `/lessons/1` progress isolation (N3 vs N2), `/vocabulary`, `/kanji`, `/grammar`, `/reading`, `/listening`, `/speaking`, `/quiz`, `/jlpt`, `/settings` JSON export, 375x812 mobile layout (`scrollWidth === 375`, 0 horizontal overflow), and 0 console errors.
- **Deferred / Out-of-Scope Notes**: Real-device microphone recording playback (deferred from TASK-007) and native audio source decision (Q-003) remain open for future audio enhancement.
