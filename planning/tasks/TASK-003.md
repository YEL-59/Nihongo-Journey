# TASK-003: Onboarding, Roadmap & Learner Dashboard Views

- **Task ID**: `TASK-003`
- **Domain**: Frontend (Next.js 14 / State & LocalStorage)
- **Status**: `DONE`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-002` (Completed)
- **Completed At**: 2026-11-13 14:27
- **Verification**: Frontend `npm run build` passed (0 errors, 7 static routes) | Backend `npm run build` passed (0 errors)

---

## 1. Objective
Build the client-side persistence adapter, the 3-step onboarding wizard (`/onboarding`), the visual learning roadmap (`/roadmap`), and the main learner dashboard (`/dashboard`).

---

## 2. Deliverables
1. **Curriculum Master Data Model (`frontend/src/data/curriculum.ts`):**
   - Complete 25-lesson Minna no Nihongo N5 syllabus organized across 4 phases with titles (JP, EN, BN), grammar patterns, cultural notes, vocabulary and Kanji counts.
2. **Onboarding Flow (`frontend/src/app/onboarding/page.tsx`):**
   - Step 1: Learning language selection (Bangla, English, Both) with visual selection feedback.
   - Step 2: Goal setting (Daily study time: 15m, 30m, 60m) and primary learning objective (Study in Japan, Work in Japan, JLPT N5, Hobby).
   - Step 3: Starting level selection (Zero knowledge vs. Kana known vs. Review) and profile personalization.
   - Transitions directly to `/dashboard` or `/hiragana` while persisting to `localStorage`.
3. **Interactive Learning Roadmap (`frontend/src/app/roadmap/page.tsx`):**
   - Visual progress bar, phase filter tabs, Kana prerequisite card, 25 individual lesson cards with grammar patterns, time estimates, and active/completed states.
   - JLPT N5 capstone exam milestone banner.
4. **Learner Dashboard (`frontend/src/app/dashboard/page.tsx`):**
   - Time-of-day personalized Japanese/English greeting (Ohayou/Konnichiwa/Konbanwa).
   - Live streak flame counter (`5 Day Streak`), Level pill (`JLPT N5`), completed lessons, vocabulary, and Kanji statistics.
   - Continue Learning hero card for current active lesson.
   - Spaced Repetition (SRS) due card.
   - Interactive 5-item daily study checklist with local completion toggles.
   - 7-day weekly study activity visual bar chart.
   - Quick practice shortcuts matrix.

---

## 3. Acceptance & Verification Criteria
- [x] Onboarding seamlessly transitions to Dashboard and saves settings to `localStorage`.
- [x] Refreshing browser preserves streak, profile, and roadmap progress.
- [x] `npm run build` in `frontend/` succeeds with 0 errors.
- [x] `npm run build` in `backend/` succeeds with 0 errors.
