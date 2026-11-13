# 📖 EasyTemplate: Developer Onboarding & Workflow Guide

> **Version**: 1.0  
> **Tech Stack**: Pure MERN Stack (Node.js, Express, TypeScript, Mongoose, Next.js 14 App Router, Tailwind CSS)  
> **Philosophy**: Built for rapid client delivery, zero-Docker overhead, token efficiency, and screenshot-accurate UI cloning.  
> **Bangla Guide**: [HOW_TO_USE_BN.md](HOW_TO_USE_BN.md) | **Folder Architecture**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | **SRS Specification**: [SRS.md](SRS.md)

---

## 1. Introduction

Unlike heavy multi-agent enterprise templates that mandate Docker, Nginx, PostgreSQL, NestJS, and 14 separate documentation files, **EasyTemplate** is optimized for high-velocity freelancers and developers who build modern full-stack web applications on the MERN stack.

### Key Benefits
- **Zero-Docker Simplicity**: No container dependencies, no VM overhead, no complex port forwarding. Runs natively on Windows, macOS, or Linux.
- **Context-Isolated Task Engine**: Uses granular task files in `planning/tasks/` (~50 lines each) to reduce AI context token consumption by 85–90%.
- **Single Source of Truth**: Clear conflict resolution—Telegram client chat messages automatically override older PDF briefs.
- **Continuous Build Gates**: Every task is verified by running TypeScript and Next.js builds (`npm run build`) before moving forward.
- **Cross-Platform Scripts**: Includes native Windows PowerShell (`.ps1`) and Bash (`.sh`) utilities.

---

## 2. Directory Layout & Key Roles

```text
easytemplate/
├── inputs/                # Client materials dropzone
│   ├── client_docs/       # requirements.md (brief/PDF) & telegram_chat.txt (chat export)
│   ├── screenshots/       # UI screenshots for pixel-accurate cloning
│   └── references.md      # Inspiration and competitor site links
├── planning/              # Task board and session governance
│   ├── task.md            # Master Task Board
│   ├── updateplanning.md  # Session checkpoint & fresh session resume command
│   ├── open-questions.md  # Client ambiguities log (Zero-Assumption Policy)
│   ├── decisions.md       # Architecture Decision Records (ADR)
│   └── tasks/             # Atomic task files (TASK-001.md, TASK-002.md...)
├── backend/               # Express + TypeScript + Mongoose (Port 5000)
├── frontend/              # Next.js 14 + Tailwind CSS + Lucide (Port 3000)
├── scripts/               # Automation scripts (PowerShell & Bash)
└── PROMPT_SHORTCUT.md     # 1-Click ready-to-copy prompts
```

---

## 3. End-to-End Workflow (Step-by-Step)

### Step 1: Input Gathering
Place raw client assets into `inputs/`:
1. Drop PDF / brief notes into `inputs/client_docs/requirements.md`.
2. Drop Telegram / WhatsApp chat exports into `inputs/client_docs/` (Telegram Desktop's default export **`messages.html`** is 100% natively supported—no conversion needed! `.txt` and `.json` are also supported).
3. Drop client UI screenshots into `inputs/screenshots/`.
4. Put any reference URLs in `inputs/references.md`.

### Step 2: Choose Execution Strategy & Trigger Kickoff
You can choose whether you want **Frontend-First** (ideal for fast client UI approval) or **Both / Full-Stack** (standard MERN):

#### Option A: Frontend-First (Client Demo Priority)
> Builds Next.js layout, UI primitives, and screenshot-accurate views with mock data first. The client can immediately review the interactive prototype at `http://localhost:3000`. Once approved, backend models and routes are built and wired up.

```text
I have dropped the client's materials in the `inputs/` directory:
- Telegram chat: `inputs/client_docs/telegram_chat.txt`
- Requirements brief: `inputs/client_docs/requirements.md`
- UI Screenshots: `inputs/screenshots/`
- Reference websites: `inputs/references.md`

Execution Strategy: FRONTEND_FIRST
Follow AGENTS.md:
1. Analyze all inputs (Telegram messages override older PDF briefs).
2. Generate PRD_AND_PLAN.md with visual system architecture flow diagrams, user journey flowchart, database plan, visual ERD diagram, and mock data models.
3. Order tasks in planning/tasks/ for frontend UI first, followed by backend endpoints and integration.
4. STOP and present the plan to me. Do not write any code until I approve with "OK".
```

#### Option B: Both / Full-Stack (Standard MERN Workflow)
> Builds backend schemas, endpoints, and frontend views concurrently with live database connectivity.

```text
I have dropped the client's materials in the `inputs/` directory:
- Telegram chat: `inputs/client_docs/telegram_chat.txt`
- Requirements brief: `inputs/client_docs/requirements.md`
- UI Screenshots: `inputs/screenshots/`
- Reference websites: `inputs/references.md`

Execution Strategy: BOTH_FULLSTACK
Follow AGENTS.md:
1. Analyze all inputs (Telegram messages override older PDF briefs).
2. Generate PRD_AND_PLAN.md with visual system/flow diagrams, complete database plan, Mermaid ERD diagram, Mongoose schemas, Express APIs, and UI components.
3. Order tasks in planning/tasks/ for Mongoose models -> Express routes -> Next.js frontend -> API integration.
4. STOP and present the plan to me. Do not write any code until I approve with "OK".
```

### Step 3: Human Approval Gate
The AI analyzes the inputs, generates `PRD_AND_PLAN.md` (complete with visual architecture & user flowcharts, database strategy, Mermaid ERD diagram, and detailed Mongoose schemas), and presents the executive summary and task list.
Review the plan. Once satisfied, reply:
```text
The plan is OK. Proceed to execute the tasks sequentially 1 by 1 according to `AGENTS.md`. Run tests/build after each task and update `planning/task.md`.
```

### Step 4: Autonomous Sequential Execution & Verification
The AI executes the tasks 1-by-1:
- **Backend Tasks**: Creates Mongoose schemas, Express controllers, route handlers, and verifies with `npm run build` in `backend/`.
- **Frontend Tasks**: Creates Next.js page routes, Tailwind styles, and UI components implementing the 6 mandatory UI states:
  1. Default / Success
  2. Loading Skeleton
  3. Empty State
  4. Validation / Error Alert
  5. Responsive Breakpoints (`<640px`, `640px-1024px`, `>1024px`)
  6. Interactive / Focus State
- **Self-Verification**: Builds Next.js via `npm run build` in `frontend/`.

### Step 5: Automated Fresh Session Suggestion (100% Proactive)

**Yes, this is completely automated!** After completing every major task and running build checks, the AI is mandated by `AGENTS.md` to automatically display this **Task Completion & Fresh Session Suggestion Card** at the end of its response:

```markdown
---
### 🏁 Task Completion Report: [TASK-002]
- **Status**: DONE
- **Verification**: `npm run build` passed with 0 errors
- **Next Ready Task**: [TASK-003]

💡 **Token-Saving & Next-Day Session Suggestion (Proactive Alert)**:
A major task has completed. To prevent token compounding, save session state for tomorrow, and keep context 100% fresh, open a **New Chat Window** and paste this 1-line command:

```text
planning/MEMORY.md এবং planning/updateplanning.md দেখে গতকালকের কাজের ধারাবাহিকতা ও বর্তমান স্টেট রিড করো এবং পরবর্তী টাস্কটি এক্সিকিউট করো।
```
*(Or in English: "Read `planning/MEMORY.md` and `planning/updateplanning.md` to restore yesterday's session state and resume the active task seamlessly without mismatch.")*

(Or simply reply "Continue" to proceed within this current chat window).
---
```

**Benefits for you:**
- You don't have to remember task numbers or open files manually.
- If you stop today and start tomorrow, the single-line command restores full session memory in 2 seconds with zero context loss.
- Avoids workflow mismatch and saves 95% tokens.
- If you prefer to stay in the same chat, simply reply `"Continue"`.

---

## 4. Running the Project Locally

Run both frontend and backend concurrently with a single command from the root directory:

```bash
npm run dev
```

Or on Windows PowerShell:
```powershell
.\scripts\dev.ps1
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Status**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 5. Verification & Pre-Handover Audit

Before handing the completed project to the client, run the automated validation suite:

**Windows PowerShell:**
```powershell
.\scripts\validate-project.ps1
```

**macOS / Linux / Git Bash:**
```bash
./scripts/validate-project.sh
```

A passing report (`SUCCESS: All EasyTemplate MERN components are healthy!`) guarantees that all required files exist and both backend and frontend compile with zero TypeScript errors.

---

## 6. Persistent Memory & State Persistence Engine (`planning/MEMORY.md`)

### The Problem It Solves
When developing across multiple days or chat sessions, conversational context vanishes when you close the chat window. If you start fresh the next day, the AI loses track of previous prompts, custom styling adjustments, bug fixes, and active route states. Re-explaining burns thousands of tokens and creates workflow mismatches (regressions, duplicate code, or overwritten features).

### How the Memory Bank Works
EasyTemplate incorporates a permanent, structured **Project Memory Bank** at [`planning/MEMORY.md`](planning/MEMORY.md):

1. **Auto Prompt & Task Logger**:
   At the end of every prompt execution (features, bug fixes, UI polishes), the AI automatically records the user prompt, touched files, build status, and key decisions into Section 3 of `planning/MEMORY.md`.
2. **Live System Snapshot**:
   Section 1 maintains the real-time status of backend routes, Mongoose models, frontend pages, active ports, and health checks.
3. **1-Click Next-Day Resume**:
   When starting work tomorrow or opening a new chat window, simply paste:
   ```text
   planning/MEMORY.md এবং planning/updateplanning.md দেখে গতকালকের কাজের ধারাবাহিকতা ও বর্তমান স্টেট রিড করো এবং পরবর্তী টাস্কটি এক্সিকিউট করো।
   ```
   *(English: "Read `planning/MEMORY.md` and `planning/updateplanning.md` to restore yesterday's session state and resume the active task seamlessly without mismatch.")*
4. **Key Benefits**:
   - **95% Token Savings**: The AI restores 100% of the project context using <300 tokens without scanning the whole repository.
   - **Zero Workflow Mismatch**: Guarantees that earlier work, established routes, and verified components are never overwritten or lost.

---

## 7. Semantic Image Folder Architecture (`frontend/public/images/`)

To prevent flat-directory clutter and keep large assets clean and structured, EasyTemplate enforces a domain-based folder hierarchy:

```text
frontend/public/images/
├── hero/          # Hero banners, landing cover backgrounds, page header visuals
├── products/      # Product cards, catalog items, accessories & package details
├── categories/    # Category cards, collection tiles, style options & solutions
├── gallery/       # Real interior photography, showcase masonry grids, portfolios
├── features/      # Technical diagrams, material swatches, mounting options
├── anatomy/       # Interactive visualizers, component cross-sections, cutaways
├── showroom/      # Showroom tour, factory/CNC machinery, office photos
└── slices/        # Temporary cropped slices from client screenshots
```

**Rule**: All image assets must be referenced through their semantic path (e.g., `/images/hero/banner.jpg`, `/images/products/item.jpg`). Never dump raw images flatly into `/images/`.

---

## 8. Interactive Settings & Language Control (`npm run settings`)

EasyTemplate provides an interactive command-line settings utility to customize your development experience with a single keystroke:

```bash
npm run settings
```
*(Or run `node scripts/settings.js` / PowerShell `.\scripts\settings.ps1`)*

### Interactive Menu Options:
- **Press `1`**: **Language Selection (English / বাংলা)**:
  - Select `1` or type `english`: Sets `"language": "en"`. All AI responses, task completion reports, session handoff cards, and resume prompts are strictly in **English**.
  - Select `2` or type `bangla`: Sets `"language": "bn"`. All responses and prompts are displayed in **বাংলা**.
- **Press `2`**: **Execution Strategy**: Switch between `FRONTEND_FIRST`, `BOTH_FULLSTACK`, or `BACKEND_FIRST`.
- **Press `3`**: **Client Modification Guide**: View instructions on handling client revisions.
- **Press `4`**: **Live System Snapshot**: Inspect the current active state of all models, routes, and memory.
- **Press `5`**: **Sync to Another Project**: Replicate the EasyTemplate framework to any target folder.

All choices are instantly written to `settings.json` and synchronized with `project.config.md`.

---

## 9. Client Modifications & Revision Protocol (Zero-Regression Engine)

When the client reviews your live preview or screenshots and asks for changes, you can handle it effortlessly without breaking existing code:

### 1. Where to Put Feedback
You can provide client modifications in ANY format:
- **Single All-in-One File**: Fill or paste all notes into `inputs/client_docs/updates.md`.
- **Raw Telegram / Chat Export**: Drop `messages.html` or `telegram_chat.txt` into `inputs/client_docs/`.
- **New UI Screenshots**: Drop new screenshots into `inputs/screenshots/`.

### 2. Trigger the 1-Click Modification Prompt
Open AI Chat and paste:
```markdown
Client requested updates/modifications. I have provided the full details in:
- Updates Brief: `inputs/client_docs/updates.md`
- New UI Screenshots: `inputs/screenshots/`

Execution Mode: CLIENT_MODIFICATION (Zero-Regression)
Follow Phase 5 of `AGENTS.md`:
1. Read `planning/MEMORY.md` first to protect all existing working features and routes.
2. Deconstruct the requested modifications and create atomic revision tasks in `planning/tasks/`.
3. Apply surgical changes to the relevant frontend components and backend endpoints.
4. Verify with `npm run build` on both frontend and backend (ensure 0 errors).
5. Update `planning/MEMORY.md` with modified files and live system state.
```

### 3. How the AI Handles It
1. Inspects `planning/MEMORY.md` to identify existing working components so nothing is overwritten.
2. Creates surgical modification tasks (`TASK-MOD-001`, `TASK-MOD-002`, etc.) in `planning/tasks/`.
3. Edits only the targeted components/endpoints.
4. Executes `npm run build` to ensure 0 TypeScript or Next.js build errors.
5. Logs all touched files in `planning/MEMORY.md` and outputs the completion card in your chosen language.

---

## 10. Syncing EasyTemplate to Another Project (e.g. `door`)

You can replicate this entire framework (including settings, memory, prompt shortcuts, and scripts) into any existing project:

```bash
node scripts/sync.js "C:\Users\Tofayel\Desktop\door"
```
Or run the PowerShell script:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-to-project.ps1 -TargetPath "C:\Users\Tofayel\Desktop\door"
```

Once synced, open the target project and run `npm run settings` to start working immediately!
