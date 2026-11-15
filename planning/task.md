# Project Task Board: Nihongo Journey (にほんご Journey)

> **Workflow Rule**: 
> - Strategy: `FRONTEND_FIRST` (Client Demo Priority -> Local Storage & UI First -> Backend Mongoose & API -> Integration).
> - Tasks follow the declared dependency order and are executed sequentially 1-by-1.
> - The local-first N5–N1 frontend must pass its release gate before backend tasks begin.
> - A task is marked `DONE` only after its own acceptance checks and required build pass.
> - Token Efficiency: For detailed instructions on an active task, inspect the isolated task file in `planning/tasks/TASK-XXX.md`.

---

## Active Task Board

| Task ID | Task Title | Domain | Dependencies | Status | Priority | Verification |
|---|---|---|---|---|---|---|
| [`TASK-001`](tasks/TASK-001.md) | Client Intake & Architecture Blueprint | Planning | None | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-002`](tasks/TASK-002.md) | Design Tokens, Shell Layout, Navigation & Landing Page | Frontend | `TASK-001` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-003`](tasks/TASK-003.md) | Onboarding, Roadmap & Learner Dashboard Views | Frontend | `TASK-002` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-004`](tasks/TASK-004.md) | Kana Mastery Center (Hiragana & Katakana Practice) | Frontend | `TASK-002` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-005`](tasks/TASK-005.md) | Lesson Engine & Interactive Player (Minna no Nihongo N5) | Frontend | `TASK-003` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-006`](tasks/TASK-006.md) | Vocabulary Library, Kanji Lab & SRS Flashcards | Frontend | `TASK-003` | `DONE` | `P0` | Clean (0 errors) |
| [`TASK-007`](tasks/TASK-007.md) | Grammar Library, Reading Lab, Listening & Speaking Labs | Frontend | `TASK-005` + approved level-aware content structure | `DONE` | `P0` | Closed at developer direction; real-device recording playback deferred |
| [`TASK-008`](tasks/TASK-008.md) | JLPT N5 Exam Center, Study Planner & Progress Analytics | Frontend | `TASK-003` | `DONE` | `P0` | Root backend/frontend build and browser acceptance checks passed |
| [`TASK-013`](tasks/TASK-013.md) | N5–N1 Level Selection & Availability UX | Frontend | `TASK-008` | `DONE` | `P0` | Build, `git diff --check`, onboarding target-level flow, header/roadmap locks, legacy fallback, and mobile/keyboard checks passed |
| [`TASK-014`](tasks/TASK-014.md) | N5 Content Audit & Completion Gate | Frontend | `TASK-013` | `DONE` | `P0` | `audit:n5` (0 errors/warnings), backend `tsc`, frontend `next build`, and browser smoke tests on `/lessons/1`, `/reading`, `/listening`, `/speaking`, `/jlpt` passed; N5 marked `available` |
| [`TASK-015`](tasks/TASK-015.md) | Create the N4 Learning Package | Frontend | `TASK-014` | `DONE` | `P0` | `audit:n4` & `audit:n5` (0 errors/warnings), backend `tsc`, frontend `next build` (22 routes), and N4/N5 browser smoke tests passed; N4 marked `available` |
| [`TASK-016`](tasks/TASK-016.md) | Create the N3 Learning Package | Frontend | `TASK-015` | `DONE` | `P0` | `audit:n3`, `audit:n4`, `audit:n5` (0 errors/warnings), backend `tsc`, frontend `next build` (22 routes) passed; browser smoke test canceled by user to switch to Kilo Code |
| [`TASK-017`](tasks/TASK-017.md) | Create the N2 Learning Package | Frontend | `TASK-016` | `DONE` | `P0` | `audit:n2`, `audit:n3`, `audit:n4`, `audit:n5` (0 errors/warnings), backend `tsc`, frontend `tsc --noEmit` & `next build` (22 routes) passed; N2 marked `available` |
| [`TASK-018`](tasks/TASK-018.md) | Create the N1 Learning Package | Frontend | `TASK-017` | `DONE` | `P0` | `audit:n1` (0 errors/warnings), backend `tsc --noEmit`, frontend `tsc --noEmit` & `next build` (22 routes) passed; N1 marked `available` |
| [`TASK-019`](tasks/TASK-019.md) | Verify the Complete N5–N1 Frontend | Frontend QA | `TASK-018` | `DONE` | `P0` | `audit:n5`–`audit:n1` (0 errors), backend/frontend `tsc --noEmit`, `next build` (22 routes, compiled Tailwind CSS), and N5–N1 desktop + 375px mobile browser QA passed |
| [`TASK-009`](tasks/TASK-009.md) | Backend Data Models & Mongoose Schemas (Gate Approved) | Backend | `TASK-019` | `READY` | `P0` | Ready to begin |
| [`TASK-010`](tasks/TASK-010.md) | Backend REST APIs, Controllers & Validation | Backend | `TASK-009` | `BACKLOG` | `P0` | Pending |
| [`TASK-011`](tasks/TASK-011.md) | Frontend-Backend Integration & Cloud Sync Engine | Full-Stack | `TASK-008`, `TASK-010`, `TASK-019` | `BACKLOG` | `P0` | Pending |
| [`TASK-012`](tasks/TASK-012.md) | Full Platform Verification, E2E Build Audit & Delivery | QA | `TASK-011` | `BACKLOG` | `P0` | Pending |

---

## Task Status Legend
- `BACKLOG`: Awaiting prior dependency completion.
- `READY`: All dependencies met; ready to be picked up in current or fresh session.
- `BLOCKED`: Paused until a required decision or prerequisite is resolved.
- `IN_PROGRESS`: Actively being coded.
- `IN_REVIEW`: Code written, pending build/test verification.
- `DONE`: Build passed, acceptance criteria validated.
- `BLOCKED`: Blocked by missing client specification (see `planning/open-questions.md`).

---

## Granular Task Architecture (`planning/tasks/`)
Each task has an atomic specification file in `planning/tasks/` to save AI context tokens:
- Load only the active task file (e.g. `planning/tasks/TASK-004.md`).
- Do NOT load completed or future tasks into prompt context.
