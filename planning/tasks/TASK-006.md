# TASK-006: Vocabulary Library, Kanji Lab & SRS Flashcards

- **Task ID**: `TASK-006`
- **Domain**: Frontend (Next.js 14 / Flashcards & Study Labs)
- **Status**: `BACKLOG`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-003`

---

## 1. Objective
Build the Vocabulary Library (`/vocabulary`), the Kanji Study Lab (`/kanji`), and the Spaced Repetition Flashcards system (`/flashcards`) implementing the SM-2 algorithm.

---

## 2. Deliverables
1. **Vocabulary Library (`frontend/src/app/vocabulary/page.tsx`):**
   - Real-time search by Kanji, Hiragana, Romaji, English, or Bangla.
   - Filter by categories (Greetings, Food, Verbs, Numbers, Travel) and JLPT level.
   - Word cards with audio pronunciation trigger, bookmark toggle, and example sentences.
2. **Kanji Study Lab (`frontend/src/app/kanji/page.tsx`):**
   - N5 Kanji grid with search and stroke count filter.
   - Detailed Kanji card modal: Onyomi, Kunyomi, radical breakdown, meanings in EN & BN, stroke order visualizer, and vocabulary compounds.
3. **SRS Flashcards Center (`frontend/src/app/flashcards/page.tsx`):**
   - 3D card flip animation (Question: Kanji/Hiragana -> Answer: Meaning, Audio, Examples).
   - Leitner/SM-2 response buttons: `Again` (Reset), `Hard` (1d), `Good` (3d/7d), `Easy` (14d/30d).
   - Daily due deck counter and review queue stored in `nihongo_vocabulary_reviews`.

---

## 3. Acceptance & Verification Criteria
- [ ] Vocabulary search filters instantaneously with 0 lag.
- [ ] Flashcard flips smoothly and schedules next review timestamp in `localStorage`.
- [ ] Kanji cards show complete Onyomi, Kunyomi, and bilingual explanations.
- [ ] `npm run build` in `frontend/` succeeds with 0 errors.
