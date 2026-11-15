# Nihongo Journey — Kilo Code Project Rules

1. **Follow `AGENTS.md`**: Always follow the protocol in `AGENTS.md` at the repository root (`FRONTEND_FIRST` strategy, English `en` communication, zero-Docker MERN, 6-state UI, build verification, and memory logging).
2. **Restore State First**: At the start of every session, read `PROJECT_STATUS.md` and `planning/MEMORY.md` to restore the active task and system state.
3. **Isolated Task Execution**: Load only the active task spec from `planning/tasks/TASK-XXX.md` (next up: `TASK-017: Create the N2 Learning Package`).
4. **Quality Gates**:
   - Never mark a JLPT level `available` in `frontend/src/content/levels/<level>/level.ts` until its content audit script (`audit:n5`, `audit:n4`, `audit:n3`, etc.) passes with 0 errors and `next build` + browser smoke tests pass.
   - Run `npx tsc -p backend/tsconfig.json` and `Set-Location frontend; npx next build` after edits.
5. **Sync Memory**: Update `planning/tasks/TASK-XXX.md`, `planning/task.md`, `planning/updateplanning.md`, `PROJECT_STATUS.md`, and `planning/MEMORY.md` after every completed task.
