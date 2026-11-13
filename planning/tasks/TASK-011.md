# TASK-011: Frontend-Backend Integration & Cloud Sync Engine

- **Task ID**: `TASK-011`
- **Domain**: Full-Stack Integration
- **Status**: `BACKLOG`
- **Priority**: `P0`
- **Assigned Role**: Full-Stack Developer
- **Dependencies**: `TASK-008`, `TASK-010`

---

## 1. Objective
Wire the Next.js 14 frontend API client (`frontend/src/services/api.ts`) to the Express backend endpoints, implementing dual-mode operation: offline-first localStorage with automatic cloud sync when connected.

---

## 2. Deliverables
1. **API Client Service Layer (`frontend/src/services/`):**
   - Typed service calls for lessons, vocabulary, grammar, kanji, reviews, and sync.
2. **Offline-First Synchronization Engine (`frontend/src/lib/syncEngine.ts`):**
   - Automatically detects server availability.
   - Syncs local progress, quiz attempts, and SRS flashcard states to backend MongoDB.
   - Merges server changes with local state using timestamp-based conflict resolution.
3. **UI Sync Status Indicator:**
   - Subtle sync badge in top navigation (Cloud synced vs. Local offline mode).

---

## 3. Acceptance & Verification Criteria
- [ ] Application functions seamlessly even when backend is stopped (graceful offline fallback).
- [ ] Starting backend triggers background synchronization without freezing the UI.
- [ ] `npm run build` passes on both `frontend/` and `backend/`.
