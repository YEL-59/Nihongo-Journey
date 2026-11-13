# TASK-005: Lesson Engine & Interactive Player (Minna no Nihongo N5)

- **Task ID**: `TASK-005`
- **Domain**: Frontend (Next.js 14 / Lesson Engine)
- **Status**: `BACKLOG`
- **Priority**: `P0`
- **Assigned Role**: Full-Stack / Frontend Developer
- **Dependencies**: `TASK-003`

---

## 1. Objective
Build the Learning Center (`/learn`) and the 12-section master Lesson Player (`/lessons/[id]`) supporting textbook-aligned content (Minna no Nihongo N5 curriculum), trilingual explanations (Bangla, English, Japanese), and interactive exercises.

---

## 2. Deliverables
1. **Curriculum Index Page (`frontend/src/app/learn/page.tsx`):**
   - Lesson cards grouped by units (Lessons 1-5, 6-10, etc.) with completion badges and estimated times.
2. **12-Section Master Lesson Player (`frontend/src/app/lessons/[id]/page.tsx`):**
   - Section 1: Objectives & Overview
   - Section 2: Japanese Conversation / Text with toggleable Furigana
   - Section 3 & 4: Bangla & English Explanations
   - Section 5 & 6: Vocabulary list with audio and grammar breakdowns
   - Section 7 & 8: Listening & Speaking practice activities
   - Section 9 & 10: Interactive exercises (MCQ, Fill-in-blanks, Sentence ordering)
   - Section 11 & 12: End-of-lesson Quiz & Completion Summary
3. **Exercise Engine Components (`frontend/src/components/lessons/`):**
   - `MultipleChoiceExercise`, `FillBlanksExercise`, `SentenceOrderExercise`.
4. **Lesson Progress Sync:**
   - Update `nihongo_learning_progress` on quiz pass (>= 70%).

---

## 3. Acceptance & Verification Criteria
- [ ] Lesson player smoothly transitions between sections with stepper controls.
- [ ] Bilingual (Bangla & English) explanations toggle according to user preferences.
- [ ] Quiz computes score and unlocks the subsequent lesson in the roadmap.
- [ ] `npm run build` in `frontend/` succeeds with 0 errors.
