# TASK-004: Kana Mastery Center (Hiragana & Katakana)

- **Task ID**: `TASK-004`
- **Domain**: Frontend (Next.js 14 / Interactive Kana Lab)
- **Status**: `DONE`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-002`, `TASK-003` (Completed)

---

## 1. Objective
Implement the complete Kana mastery system featuring Hiragana (`/hiragana`) and Katakana (`/katakana`) charts, stroke order animations, audio pronunciation playback, and character recognition quizzes.

---

## 2. Deliverables
1. **Interactive Kana Grids (`frontend/src/components/kana/KanaGrid.tsx`):**
   - 46 Gojuon characters + Dakuten + Handakuten + Yoon (combination sounds).
   - Character modal/drawer showing stroke count, Romaji, and audio trigger.
2. **Stroke Order Visualizer & Writing Canvas:**
   - Step-by-step stroke diagrams and interactive canvas for touch/mouse writing practice.
3. **Pronunciation Audio Integration:**
   - Web Audio API / HTML5 Audio player with audio clips or high-fidelity synthesized speech.
4. **Kana Recognition Quiz:**
   - Randomized 10-question recognition test with instant feedback and score tracking.
5. **Hiragana & Katakana Pages:**
   - `frontend/src/app/hiragana/page.tsx` and `frontend/src/app/katakana/page.tsx`.

---

## 3. Acceptance & Verification Criteria
- [x] Both Hiragana and Katakana tables display all 46 core characters plus modified sounds.
- [x] Interactive audio plays without error upon click.
- [x] Quiz accurately tallies correct answers and updates learner progress in `localStorage`.
- [x] `npm run build` in `frontend/` passes with 0 errors.