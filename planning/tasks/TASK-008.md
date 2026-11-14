# TASK-008: JLPT N5 Exam Center, Study Planner & Progress Analytics

- **Task ID**: `TASK-008`
- **Domain**: Frontend (Next.js 14 / Exams & Analytics)
- **Status**: `DONE`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-003`

---

## 1. Objective
Implement the full JLPT N5 Exam Simulator (`/jlpt`), the Study Planner (`/schedule`), and the Progress Analytics dashboard (`/progress`), completing the frontend-first feature suite.

---

## 2. Deliverables
1. **JLPT N5 Examination Simulator (`frontend/src/app/jlpt/page.tsx`):**
   - JLPT-style structure: Language Knowledge (Vocab/Kanji), Grammar & Reading, Listening.
   - Timed countdown clock with auto-submission.
   - Question palette with "Mark for Review" flag.
   - Score report, section-by-section practice benchmark, and detailed explanations. Clearly label it as original practice content, not an official JLPT exam or scaled-score prediction.
2. **Study Planner & Routine Scheduler (`frontend/src/app/schedule/page.tsx`):**
   - Default study routine (7:30–9:30 PM: Vocab, Grammar, Kanji, Listening, Speaking, Revision).
   - Custom routine editor, daily target time sliders, and reminder toggles stored in `nihongo_schedule`.
3. **Progress Analytics & Settings (`frontend/src/app/progress/page.tsx`, `/settings/page.tsx`):**
   - Visual charts (SVG): Study time history, streak calendar, vocabulary mastery chart.
   - Settings: Preferred language toggle (Bangla/English/Both), Romaji visibility, audio speed.
   - Data Management: Export progress to JSON, import JSON backup, reset data with confirmation.

---

## 3. Acceptance & Verification Criteria
- [x] Timed exam countdown, auto-submission, answers, flags, and section scoring verified.
- [x] Analytics reflect saved exam activity and empty states do not invent activity.
- [x] JSON export, supported-key validation, import, reset confirmation, and data restoration verified in the browser.
- [x] Root `npm run build` passes for backend and frontend with 0 errors; `git diff --check` passes.

## Verification Notes
- Browser-tested a timed practice attempt, answer review, progress charts, schedule editing/persistence, settings export/import/reset, and auto-submit with an accelerated browser clock.
- The test restored the browser's original app storage values after exercising import and reset.
- The 12-question set is original N5 practice material and does not claim official exam coverage or score equivalency.
