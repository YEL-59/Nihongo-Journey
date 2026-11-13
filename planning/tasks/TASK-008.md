# TASK-008: JLPT N5 Exam Center, Study Planner & Progress Analytics

- **Task ID**: `TASK-008`
- **Domain**: Frontend (Next.js 14 / Exams & Analytics)
- **Status**: `BACKLOG`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-003`

---

## 1. Objective
Implement the full JLPT N5 Exam Simulator (`/jlpt`), the Study Planner (`/schedule`), and the Progress Analytics dashboard (`/progress`), completing the frontend-first feature suite.

---

## 2. Deliverables
1. **JLPT N5 Examination Simulator (`frontend/src/app/jlpt/page.tsx`):**
   - Official structure: Language Knowledge (Vocab/Kanji), Grammar & Reading, Listening.
   - Timed countdown clock with auto-submission.
   - Question palette with "Mark for Review" flag.
   - Comprehensive score report, section-by-section pass/fail breakdown, and detailed explanations.
2. **Study Planner & Routine Scheduler (`frontend/src/app/schedule/page.tsx`):**
   - Default study routine (7:30–9:30 PM: Vocab, Grammar, Kanji, Listening, Speaking, Revision).
   - Custom routine editor, daily target time sliders, and reminder toggles stored in `nihongo_schedule`.
3. **Progress Analytics & Settings (`frontend/src/app/progress/page.tsx`, `/settings/page.tsx`):**
   - Visual charts (Recharts / SVG): Study time history, streak calendar, vocabulary mastery pie chart.
   - Settings: Preferred language toggle (Bangla/English/Both), Romaji visibility, audio speed.
   - Data Management: Export progress to JSON, import JSON backup, reset data with confirmation.

---

## 3. Acceptance & Verification Criteria
- [ ] Timed exam accurately tracks remaining seconds and evaluates answers.
- [ ] Analytics graphs reflect actual saved activity from `localStorage`.
- [ ] JSON export/import works reliably without data loss.
- [ ] `npm run build` in `frontend/` succeeds with 0 errors.
