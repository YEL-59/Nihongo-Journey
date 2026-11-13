# TASK-010: Backend REST APIs, Controllers & Validation

- **Task ID**: `TASK-010`
- **Domain**: Backend (Node.js / Express API)
- **Status**: `BACKLOG`
- **Priority**: `P0`
- **Assigned Role**: Backend Developer
- **Dependencies**: `TASK-009`

---

## 1. Objective
Build the Express controllers, business services, and route handlers for the endpoints specified in `PRD_AND_PLAN.md`, adhering to the standard `sendResponse` envelope and error handling.

---

## 2. Deliverables
1. **Module Routes & Controllers:**
   - `/api/v1/lessons`: List and detail endpoints with exercises.
   - `/api/v1/vocabulary`: Search, category filtering, and bookmark endpoints.
   - `/api/v1/grammar`: List and single pattern retrieval endpoints.
   - `/api/v1/kanji`: Character lookup and stroke data endpoints.
   - `/api/v1/reviews`: SRS flashcard queue retrieval and review submission.
   - `/api/v1/quiz`: Quiz evaluation and score calculation endpoint.
   - `/api/v1/sync`: Batch progress synchronization endpoint.
2. **Standard Response & Error Handling:**
   - Standard envelope via `sendResponse.ts` (`statusCode`, `success`, `message`, `data`).
   - Centralized `globalErrorHandler.ts` catching validation and runtime errors.

---

## 3. Acceptance & Verification Criteria
- [ ] All routes respond with the standardized `sendResponse` format.
- [ ] Proper HTTP status codes returned (200 OK, 201 Created, 400 Bad Request, 404 Not Found).
- [ ] `npm run build` in `backend/` succeeds with 0 errors.
