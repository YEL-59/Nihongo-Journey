# Architecture Decision Records (ADR)

This document tracks all key technical and design decisions made throughout the project lifecycle.

---

## ADR-001: MERN Stack Foundation without Docker Overhead

- **Status**: Accepted
- **Context**: Freelance client projects require fast iteration, instant local development, low system resource footprint, and zero dev-ops friction.
- **Decision**: 
  - Backend: Node.js + Express + TypeScript + Mongoose (MongoDB).
  - Frontend: Next.js 14 App Router + Tailwind CSS + Lucide Icons.
  - Zero-Docker policy: Both run natively with `npm run dev` in the root workspace.
- **Consequences**: Fast startup times, easy debugging, minimal token burn, and simple deployment to platforms like Vercel + Render / Railway / DigitalOcean.

---

## ADR-002: Standardized Backend Response Envelope

- **Status**: Accepted
- **Context**: Frontend services require predictable API payloads to handle Loading, Success, and Error states cleanly.
- **Decision**: All Express controllers must use `sendResponse`:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Resource fetched successfully",
    "data": {}
  }
  ```
  All errors must funnel through `globalErrorHandler` returning:
  ```json
  {
    "success": false,
    "message": "Descriptive error message",
    "errorSources": []
  }
  ```
