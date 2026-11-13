# TASK-009: Backend Data Models & Mongoose Schemas

- **Task ID**: `TASK-009`
- **Domain**: Backend (Node.js / Express / Mongoose / MongoDB)
- **Status**: `BACKLOG`
- **Priority**: `P0`
- **Assigned Role**: Backend Developer
- **Dependencies**: `TASK-001`

---

## 1. Objective
Implement TypeScript interfaces and Mongoose models in `backend/` reflecting the visual ERD diagram and field specification matrices approved in `PRD_AND_PLAN.md`.

> [!IMPORTANT]
> **Pre-Execution Gate**: Backend code must only be written after the developer reviews and explicitly approves the plan.

---

## 2. Deliverables
1. **TypeScript Interfaces (`backend/src/modules/*/interface.ts`):**
   - Interfaces for `User`, `UserProfile`, `Lesson`, `Vocabulary`, `GrammarPoint`, `Kanji`, `VocabularyReview`, `QuizAttempt`, and `StudySession`.
2. **Mongoose Models (`backend/src/modules/*/model.ts`):**
   - Complete field types, validations, default values, compound indexes, and timestamps matching `PRD_AND_PLAN.md` specification tables.
3. **Database Connection & Seeding Scripts (`backend/src/seeds/`):**
   - Seed script for initial Minna no Nihongo Lesson 1 vocabulary, grammar, and Kanji.

---

## 3. Acceptance & Verification Criteria
- [ ] Schemas strictly reflect the visual ERD diagram and data dictionary.
- [ ] Indexes are created for search optimization (e.g., text search on Japanese/Hiragana/Romaji/Meanings).
- [ ] `npm run build` in `backend/` succeeds with 0 TypeScript compilation errors.
