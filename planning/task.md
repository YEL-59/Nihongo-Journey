# Project Task Board: Nihongo Journey (にほんご Journey)

> **Workflow Rule**: 
> - Strategy: `FRONTEND_FIRST` (Client Demo Priority -> Local Storage & UI First -> Backend Mongoose & API -> Integration).
> - Tasks are strictly executed sequentially 1-by-1.
> - A task is only marked `DONE` after both Backend and Frontend build checks pass (`npm run build`).
> - Token Efficiency: For detailed instructions on an active task, inspect the isolated task file in `planning/tasks/TASK-XXX.md`.

---

## Active Task Board

| Task ID | Task Title | Domain | Dependencies | Status | Priority | Verification |
|---|---|---|---|---|---|---|
| [`TASK-001`](tasks/TASK-001.md) | Client Intake & Architecture Blueprint | Planning | None | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-002`](tasks/TASK-002.md) | Design Tokens, Shell Layout, Navigation & Landing Page | Frontend | `TASK-001` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-003`](tasks/TASK-003.md) | Onboarding, Roadmap & Learner Dashboard Views | Frontend | `TASK-002` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-004`](tasks/TASK-004.md) | Kana Mastery Center (Hiragana & Katakana Practice) | Frontend | `TASK-002` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-005`](tasks/TASK-005.md) | Lesson Engine & Interactive Player (Minna no Nihongo N5) | Frontend | `TASK-003` | `READY` | `P0` | Pending |
| [`TASK-006`](tasks/TASK-006.md) | Vocabulary Library, Kanji Lab & SRS Flashcards | Frontend | `TASK-003` | `BACKLOG` | `P0` | Pending |
| [`TASK-007`](tasks/TASK-007.md) | Grammar Library, Reading Lab, Listening & Speaking Labs | Frontend | `TASK-005` | `BACKLOG` | `P0` | Pending |
| [`TASK-008`](tasks/TASK-008.md) | JLPT N5 Exam Center, Study Planner & Progress Analytics | Frontend | `TASK-003` | `BACKLOG` | `P0` | Pending |
| [`TASK-009`](tasks/TASK-009.md) | Backend Data Models & Mongoose Schemas (Gate Approved) | Backend | `TASK-001` | `BACKLOG` | `P0` | Pending |
| [`TASK-010`](tasks/TASK-010.md) | Backend REST APIs, Controllers & Validation | Backend | `TASK-009` | `BACKLOG` | `P0` | Pending |
| [`TASK-011`](tasks/TASK-011.md) | Frontend-Backend Integration & Cloud Sync Engine | Full-Stack | `TASK-008`, `TASK-010` | `BACKLOG` | `P0` | Pending |
| [`TASK-012`](tasks/TASK-012.md) | Full Platform Verification, E2E Build Audit & Delivery | QA | `TASK-011` | `BACKLOG` | `P0` | Pending |

---

## Task Status Legend
- `BACKLOG`: Awaiting prior dependency completion.
- `READY`: All dependencies met; ready to be picked up in current or fresh session.
- `IN_PROGRESS`: Actively being coded.
- `IN_REVIEW`: Code written, pending build/test verification.
- `DONE`: Build passed, acceptance criteria validated.
- `BLOCKED`: Blocked by missing client specification (see `planning/open-questions.md`).

---

## Granular Task Architecture (`planning/tasks/`)
Each task has an atomic specification file in `planning/tasks/` to save AI context tokens:
- Load only the active task file (e.g. `planning/tasks/TASK-004.md`).
- Do NOT load completed or future tasks into prompt context.
