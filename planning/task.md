# Project Task Board

> **Workflow Rule**: 
> - Tasks are strictly executed sequentially 1-by-1.
> - A task is only marked `DONE` after both Backend and Frontend build checks pass (`npm run build`).
> - Token Efficiency: For detailed instructions on an active task, inspect the isolated task file in `planning/tasks/TASK-XXX.md`.

---

## Active Task Board

| Task ID | Task Title | Domain | Dependencies | Status | Priority | Verification |
|---|---|---|---|---|---|---|
| [`TASK-001`](tasks/TASK-001.md) | Client Intake & Architecture Blueprint | Planning | None | `READY` | `P0` | Pending |
| [`TASK-002`](tasks/TASK-002.md) | Backend Data Models & Mongoose Schemas | Backend | `TASK-001` | `BACKLOG` | `P0` | Pending |
| [`TASK-003`](tasks/TASK-003.md) | Backend API Routes, Controllers & Validation | Backend | `TASK-002` | `BACKLOG` | `P0` | Pending |
| [`TASK-004`](tasks/TASK-004.md) | Frontend Design Tokens, Navbar & Layout (Screenshot-Accurate) | Frontend | `TASK-001` | `BACKLOG` | `P1` | Pending |
| [`TASK-005`](tasks/TASK-005.md) | Frontend Feature Views & API Integration | Full-Stack | `TASK-003`, `TASK-004` | `BACKLOG` | `P0` | Pending |
| [`TASK-006`](tasks/TASK-006.md) | Full Platform Verification & Build Audit | QA | `TASK-005` | `BACKLOG` | `P0` | Pending |

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
- Load only the active task file (e.g. `planning/tasks/TASK-001.md`).
- Do NOT load completed or future tasks into prompt context.
