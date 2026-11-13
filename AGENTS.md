# Autonomous Project Execution Protocol: EasyTemplate (MERN Stack)

This workspace enforces a **Plan-First, Context-Isolated, Zero-Docker Execution Engine** designed for maximum token efficiency, rapid client turnarounds, and zero regressions.

---

## 1. System Philosophy & Core Mandates

1. **Pure MERN Stack & Zero-Docker**:
   - Backend: Node.js + Express + TypeScript + Mongoose (MongoDB).
   - Frontend: Next.js 14 (App Router) + Tailwind CSS + Lucide Icons.
   - Never introduce Docker, Nginx, or microservice infrastructure. Native local execution via `npm run dev`.
2. **Context Isolation**:
   - High-level task table lives in `planning/task.md`.
   - Detailed task specs live in isolated files under `planning/tasks/TASK-XXX.md` (~50 lines each).
   - When executing a task, load **only** the active task file. Never load unrelated tasks into prompt context.
3. **Conflict Resolution Hierarchy**:
   - Active user prompt instructions > Telegram chat exports (`messages.html` / `telegram_chat.txt` / `.json` in `inputs/client_docs/`) > PDF/initial brief (`inputs/client_docs/requirements.md`).
   - If two requirements conflict, Telegram chat strictly overrides earlier briefs.
4. **Zero-Assumption Policy**:
   - Never invent client requirements. If an edge case is missing from `inputs/`, record it under `planning/open-questions.md` and alert the developer.
5. **Persistent Session Memory & Zero-State-Loss Protocol**:
   - Never rely on conversational memory alone across sessions or days. Every prompt execution, state transition, touched file, and build verification must be logged to `planning/MEMORY.md`.
   - When resuming work (next day or fresh session), the AI reads `planning/MEMORY.md` and `planning/updateplanning.md` to restore full state instantly under 300 tokens without prompt mismatch or workflow drift.
6. **Strict Language Preference Protocol (English vs Bangla)**:
   - The AI MUST inspect `settings.json` and `project.config.md` for the active language setting (`"language": "en"` or `"language": "bn"`).
   - If `"language": "en"`: All AI thinking summaries, responses, task completion reports, session handoff cards, and next-day resume prompt suggestions MUST be 100% in **English**.
   - If `"language": "bn"`: All AI responses, task completion cards, and suggestions are in **Bangla**.
   - If not set or if starting a project without language defined, the AI MUST prompt at the very beginning:
     *"Which language do you prefer for communication and reports? [1] English [2] বাংলা"*.
   - Developers can toggle language anytime using `npm run settings` or editing `settings.json`.
7. **Mandatory Backend Pre-Execution Gate (Visual DB Diagram & Flowchart First)**:
   - Before writing ANY backend code (Mongoose models, schemas, Express routes, or controllers):
   - The AI MUST first perform a complete audit of the SRS (`SRS.md` / client briefs) AND all existing frontend pages, components, and forms to extract the full data contract (fields, relationships, filters, calculations).
   - The AI MUST generate and present:
     - (1) **End-to-End System & API Request Flowchart** (`mermaid flowchart TD`): User action -> Frontend API client -> Express Gateway & Guards -> Service/Controller -> MongoDB query.
     - (2) **Visual Database ERD Diagram** (`mermaid erDiagram`): All collections, field names, data types, primary/foreign keys, and cardinalities (`1:1`, `1:N`, `N:M`).
     - (3) **Endpoint Specification Matrix**: Method, URL, Request Payload, and `sendResponse` envelope.
   - **STOP & PRESENT TO DEVELOPER**: The AI MUST display this plan in chat and save to `planning/BACKEND_PLAN.md` (or `PRD_AND_PLAN.md`).
   - The AI is STRICTLY FORBIDDEN from writing any backend code until the developer reviews and explicitly approves with "OK" or "Proceed".

---

## 2. The 3 Strict Phases

### Phase 1: Intake & Plan Generation (MANDATORY BEFORE ANY CODE)
Whenever a user asks to start a project or build features:
1. **Read Inputs**: Inspect `inputs/client_docs/` (checking for `messages.html`, `telegram_chat.txt`, `requirements.md`), `inputs/screenshots/`, and `inputs/references.md`.
2. **Resolve Conflicts**: Telegram chat messages override any conflicting initial requirements in earlier briefs.
3. **Determine Execution Strategy**:
   - Confirm user preference (from prompt or `project.config.md`):
     - **Mode 1: `FRONTEND_FIRST` (Client Demo Priority)**:
       Build design tokens, responsive layout, and screenshot-accurate pages with mock data first. Client can immediately view and interact with the UI at `http://localhost:3000` for visual approval before backend models/APIs are built.
     - **Mode 2: `BOTH_FULLSTACK` (Standard MERN Concurrent)**:
       Backend Mongoose schemas and Express API endpoints are implemented first, followed immediately by frontend pages and real API wiring.
     - **Mode 3: `BACKEND_FIRST` (API & Logic Priority)**:
       All database schemas, routes, controllers, and validation are completed and tested before UI work begins.
4. **Generate Master Plan (`PRD_AND_PLAN.md`)**:
   - **Visual System & Flow Diagrams**:
     - System Architecture Diagram (`mermaid graph TD / LR`): Client Layer (Next.js 14), Server Layer (Express, Middleware, Controllers, Services), and Persistence Layer (Mongoose, MongoDB).
     - User Journey & Process Flowchart (`mermaid flowchart TD / LR`): End-to-end user navigation, decisions, state transitions, validation, and feedback loop.
     - API Lifecycle / Data Flow Sequence Diagram (`mermaid sequenceDiagram`): Client-Server-DB interaction lifecycle.
   - **Database Plan & Visual ERD Diagram**:
     - Visual Entity Relationship Diagram (`mermaid erDiagram`): All collections/entities, field types, primary keys, foreign keys, cardinality and relations (`1:1`, `1:N`, `N:M`).
     - MongoDB Architecture Strategy: Embedding vs referencing rationale, indexing strategy, soft-delete, and audit timestamps.
   - **Detailed Data Models & Schemas**:
     - Complete TypeScript interfaces and Mongoose schema definitions.
     - Field-by-field specification tables (Field, Type, Required, Unique, Default, Index, Validation).
   - **Backend Endpoints**: Methods, URLs, request/response bodies adhering to standard `sendResponse` envelope.
   - **Frontend UI & Components**: Exact mapping of screens from `inputs/screenshots/`, responsive breakpoints (`<640px`, `640px-1024px`, `>1024px`), and extracted design tokens.
   - **Execution Strategy Declared**: Document whether tasks will follow `FRONTEND_FIRST` or `BOTH_FULLSTACK`.
5. **Populate Task Board**:
   - Create atomic tasks in `planning/tasks/TASK-001.md`, `TASK-002.md`, etc., ordered according to the chosen strategy.
   - Update `planning/task.md` and `planning/updateplanning.md`.
6. **STOP & PRESENT TO USER**:
   - Display the plan, strategy choice, and task summary.
   - **DO NOT write any project code until the user says "OK", "Proceed", or approves the plan.**

---

### Phase 2: Sequential Execution (1-by-1)
Once the user approves the plan:
1. **Pick the Next Unfinished Task** from `planning/task.md` (where dependencies are met).
2. **Read Isolated Task Spec**: Inspect only `planning/tasks/TASK-XXX.md`.
3. **Execute Deliverables**: Create or modify the exact required files in `backend/` or `frontend/`.
4. **Frontend 6-State Requirement**: Every interactive screen/component must implement:
   - (1) Default / Success state
   - (2) Loading Skeleton
   - (3) Empty state
   - (4) Validation / Error alert
   - (5) Responsive breakpoints (Mobile Drawer `<640px`, Tablet `640-1024px`, Desktop `>1024px`)
   - (6) Interactive / Focus state
5. **Continuous Build Verification Gate**:
   - **Backend**: Run `npm run build` in `backend/` to ensure 0 TypeScript compilation errors. Verify `sendResponse` contract and `globalErrorHandler`.
   - **Frontend**: Run `npm run build` in `frontend/` to verify Next.js routes, types, and build traces.
6. **Mandatory Automated Memory Logging, Status Update & Fresh Session Card**:
   - Change task status to `DONE` in `planning/task.md` and `planning/updateplanning.md` with build verification results.
   - Update `PROJECT_STATUS.md`: check off completed module items `[x]`, update overall completion %, set the next ready task as `[⏳ ACTIVE]`, and refresh the 1-click resume command.
   - Automatically log the prompt execution, touched files, build status, and updated active system state into `planning/MEMORY.md`.
   - The AI **MUST automatically display the suggestion box in the active language** at the end of its response so the user can easily copy and open a fresh chat or resume tomorrow:

**If Language is `EN` (English)**:
```markdown
---
### 🏁 Task Completion Report: [TASK-XXX]
- **Status**: DONE
- **Verification**: Backend & Frontend `npm run build` passed (0 errors)
- **Checklist Updated**: `PROJECT_STATUS.md` marked [x] with next task queued
- **Memory Synced**: `planning/MEMORY.md` updated with prompt summary & system state
- **Next Ready Task**: [TASK-YYY]

💡 **Token-Saving & Next-Day Session Suggestion**:
Task completed successfully and saved to memory. To prevent token waste, resume later, or keep AI performance at peak speed, open a **New Chat Window** and paste this exact command (stamped with current checkpoint date & time):

```text
Read PROJECT_STATUS.md and planning/MEMORY.md (Checkpoint: [YYYY-MM-DD HH:MM]) to restore session state and execute the next task [TASK-YYY].
```
*(Or to continue working in this chat, simply type: **"Continue"**)*
---
```

**If Language is `BN` (বাংলা)**:
```markdown
---
### 🏁 Task Completion Report: [TASK-XXX]
- **Status**: DONE
- **Verification**: Backend & Frontend `npm run build` passed (0 errors)
- **Checklist Updated**: `PROJECT_STATUS.md` ফাইলে চেকমার্ক [x] ও পরবর্তী টাস্ক আপডেট করা হয়েছে
- **Memory Synced**: `planning/MEMORY.md` updated with prompt summary & system state
- **Next Ready Task**: [TASK-YYY]

💡 **Token-Saving & Next-Day Session Suggestion (টোকেন সাশ্রয় ও ধারাবাহিকতা বজায় রাখার পরামর্শ)**:
টাস্ক সফলভাবে সম্পন্ন ও মেমোরিতে সেভ হয়েছে। অতিরিক্ত টোকেন খরচ বন্ধ করতে, পরে বা কালকে শুরু করতে এখনই একটি **New Chat Window** খুলুন এবং তারিখ ও সময়সহ নিচের কমান্ডটি পেস্ট করুন:

```text
PROJECT_STATUS.md এবং planning/MEMORY.md (চেকপয়েন্ট: [YYYY-MM-DD HH:MM]) দেখে সেশন স্টেট রিস্টোর করো এবং পরবর্তী টাস্কটি [TASK-YYY] এক্সিকিউট করো।
```
*(অথবা এই চ্যাটেই চালিয়ে যেতে চাইলে শুধু লিখুন: **"Continue"**)*
---
```

---

## 3. Screenshot-to-Exact-Clone Protocol (Zero-Placeholder Mandate)

When client UI screenshots exist in `inputs/screenshots/`, the AI must clone the frontend to achieve maximum visual fidelity:

1. **Extract Exact Visual Tokens**:
   - Extract exact hex codes from the screenshot for backgrounds, card surfaces, borders, buttons, badges, and hover tints.
   - Match typography weights (hero headings, subheadings, pill tags, spec matrices).
   - Match corner radius (`rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`) and shadows (`shadow-sm`, `shadow-xl`, custom glow).
2. **Zero-Placeholder Asset Generation & Semantic Folder Mandate**:
   - **NEVER use generic placeholders, broken links, or empty gray boxes.**
   - **Semantic Image Folder Architecture**: Never dump image files flatly into the root `images/` folder. Always organize assets into domain-based subdirectories under `frontend/public/images/`:
     - `frontend/public/images/hero/` — Hero banners, large background headers, landing covers.
     - `frontend/public/images/products/` — Catalog items, individual product cards, package details.
     - `frontend/public/images/categories/` — Category tiles, style cards, solution overview cards.
     - `frontend/public/images/gallery/` — Interior inspiration showcases, architectural portfolio photos.
     - `frontend/public/images/features/` — Technical diagrams, material swatches, mounting options.
     - `frontend/public/images/anatomy/` — Interactive visualizers, component cross-sections, cutaways.
     - `frontend/public/images/showroom/` — Showroom tours, factory/CNC machinery, office photos.
     - `frontend/public/images/slices/` — Reference crops from client UI screenshots.
   - Reference assets via real local paths (e.g. `/images/hero/filename.jpg`, `/images/products/item.jpg`) with `next/image` or responsive `img`.
3. **Screenshot Fidelity Checklist (Quality Gate)**:
   - [ ] **Navbar**: Logo placement, mega menu links, search bar, and action buttons match the screenshot.
   - [ ] **Hero Section**: Exact layout, headline hierarchy, pill badges, and realistic background visuals.
   - [ ] **Card Grid**: Exact column layout, aspect ratios, badges, pricing typography, and hover zoom effects.
   - [ ] **Interactive Widgets**: Tabs, sliders, configurators, and modal popups faithfully mirror the screenshot's design language.
   - [ ] **Footer**: Exact column breakdown, links, and contact options.

---

### Phase 3: Final Verification & Delivery Summary
When all tasks in `planning/task.md` are marked `DONE`:
1. Run the project validation script:
   - Windows: `powershell -ExecutionPolicy Bypass -File scripts/validate-project.ps1`
   - Linux / Mac: `./scripts/validate-project.sh`
2. Present a clean client handover summary:
   - Backend test status and API endpoints.
   - Frontend pages created with screenshot fidelity confirmation.
   - Local startup commands (`npm run dev` or `.\scripts\dev.ps1`).
   - Git commit suggestion.

---

## 4. Automated Memory & Continuous State Persistence Protocol (Zero-Mismatch Engine)

To guarantee that previous prompts, context, and code states **NEVER vanish** between sessions or days:

1. **Session Resume Protocol (Next Day / Fresh Chat)**:
   - When the user starts a new chat or resumes the next day with the handoff command:
     - The AI MUST inspect `planning/MEMORY.md` and `planning/updateplanning.md` first.
     - Extract the Active System State, the latest prompt log, and the next unfinished task.
     - Never re-analyze the entire codebase unless requested, keeping token consumption below 300 tokens.
2. **Every-Prompt Execution Logging Rule**:
   - Regardless of whether the user requests a full task, a bug fix, styling tweaks, or API endpoints:
     - At the end of every response, the AI MUST record the prompt summary, touched files, and verification state in Section 3 of `planning/MEMORY.md`.
     - Update the Live System State Snapshot in Section 1 of `planning/MEMORY.md`.
3. **Zero-Mismatch & Anti-Regression Rule**:
   - Before modifying existing files or creating new components/routes, the AI must cross-reference `planning/MEMORY.md` to ensure:
     - Pre-existing routes and models are NOT overwritten or duplicated.
     - Working client features or styles are never inadvertently removed.
     - System flow strictly adheres to established architecture and previous decisions.

---

## 5. Client Modification & Revision Protocol (Zero-Regression Engine)

When the client reviews the application and requests modifications, design changes, new endpoints, or feature revisions:

### 1. Semantic Dropzone & Supported Input Formats
The developer can organize client modifications into dedicated, purpose-built folders under `inputs/modifications/`:
- **Component & Feature Bundles (Image + Notes in ONE folder)**:
  - Create a dedicated component folder like `inputs/modifications/features/navbar/` containing both the screenshot (e.g. `navbar.png`) AND instructions (`notes.txt`).
- **Written Change Requests**: `inputs/modifications/update_notes/updates.md` (Single all-in-one brief for frontend/backend changes).
- **Telegram & Chat Exports**: `inputs/modifications/telegram_chats/` (drop `messages.html` or `telegram_chat.txt` containing client revision feedback).
- **Revision Screenshots & Visual References**:
  - `inputs/modifications/screenshots/ui_tweaks/` — Color, button, alignment, spacing or typography adjustments.
  - `inputs/modifications/screenshots/new_sections/` — Brand new sections, pages, or modal popups requested.
  - `inputs/modifications/screenshots/bug_fixes/` — Visual bugs or broken layouts highlighted by the client.
*(Legacy paths `inputs/client_docs/updates.md` and `inputs/screenshots/` remain 100% backwards-compatible).*

### 2. Autonomous AI Modification Lifecycle
Whenever the developer triggers a modification prompt:
1. **Memory & State Audit (Anti-Regression Gate)**:
   - The AI inspects `planning/MEMORY.md` to identify all previously working routes, models, and UI components.
   - It is strictly forbidden to overwrite or delete existing working logic unless explicitly commanded by the client.
2. **Delta Extraction & Task Scheduling**:
   - The AI extracts the exact delta between current system state and requested modifications.
   - It creates atomic revision task files (e.g. `planning/tasks/TASK-MOD-001.md`) and logs them in `planning/task.md`.
3. **Surgical Implementation**:
   - Deliverables are executed incrementally without affecting unrelated modules.
   - Any new images are placed in `frontend/public/images/` under the appropriate semantic subfolder.
4. **Mandatory Build Verification**:
   - `npm run build` must run on both `backend/` and `frontend/` to guarantee zero errors.
5. **Memory Synchronization & Bilingual Handover**:
   - Record the modification prompt, touched files, and updated live status in `planning/MEMORY.md`.
   - Output the Task Completion Report and Next-Day Resume Card in the developer's selected language (`en` or `bn`).
