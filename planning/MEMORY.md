# 🧠 Project Memory Bank & Continuous Session State

> **Purpose**: This file is the permanent memory of the project. Whenever a prompt is executed, the AI automatically logs the prompt summary, modified files, and verified system state here. When starting a fresh session or resuming the next day, the AI reads this file first to instantly restore 100% context with minimal token usage and zero workflow mismatch.

---

## 1. 📌 Active System State Snapshot (বর্তমান প্রজেক্টের লাইভ স্টেট)
*This section is automatically updated at the end of every prompt/task.*

- **Project Name**: EasyTemplate (Pure MERN Stack)
- **Last Active Session**: 2026-11-10
- **Language Preference**: `EN` (English) *(Configurable via `npm run settings` or `settings.json`: `en` or `bn`)*
- **Current Execution Strategy**: `FRONTEND_FIRST` / `BOTH_FULLSTACK` (Configured in `settings.json` & `project.config.md`)
- **Active Task**: `TASK-001` (Awaiting Client Intake / Planning)
- **Overall System Health**: `READY` (Initial Foundation Clean)
- **Anti-Regression Engine**: `ACTIVE` (Phase 5 Client Modification Protocol enabled)
- **Single Update Dropzone**: `inputs/client_docs/updates.md` (Active)
- **Backend Service (Port 5000)**:
  - Base URL: `http://localhost:5000/api`
  - Health Endpoint: `http://localhost:5000/api` (Verified)
  - Implemented Models: Initial Server & App structure in `backend/src/`
  - Active Endpoints: Initial health check routes
  - Build Status: `npm run build` -> Clean (0 TypeScript errors)
- **Frontend Service (Port 3000)**:
  - Local URL: `http://localhost:3000`
  - App Router: Next.js 14 + Tailwind CSS
  - Implemented Routes: Initial layout & home page
  - Build Status: `npm run build` -> Clean (0 errors)
- **Recently Touched Files**:
  - `settings.json`
  - `scripts/settings.js`
  - `scripts/sync-core.js`
  - `scripts/sync.js`
  - `scripts/sync-to-project.ps1`
  - `inputs/client_docs/updates.md`
  - `AGENTS.md`
  - `PROMPT_SHORTCUT.md`
  - `project.config.md`
  - `planning/MEMORY.md`
  - `planning/updateplanning.md`
  - `package.json`

---

## 2. ⚡ Cumulative Rolling Summary (টোকেন সাশ্রয়ী সামগ্রিক সারসংক্ষেপ)
*A high-density snapshot (<150 words) enabling any new AI session to grasp the entire project trajectory instantly.*

- **Architecture**: Pure MERN (MongoDB + Express + TypeScript + Next.js 14 App Router + Tailwind CSS). Zero Docker, zero microservice complexity.
- **Workflow State**: Zero-placeholder, screenshot-accurate development engine with interactive settings CLI (`npm run settings`). Supports bilingual prompts & reports (English/Bangla).
- **Client Modification Engine**: Phase 5 Client Modification Protocol active. Developers can drop single update briefs in `inputs/client_docs/updates.md`, Telegram exports (`messages.html`/`telegram_chat.txt`), or new screenshots with zero regressions.
- **Sync System**: 1-click sync engine (`node scripts/sync.js "path/to/project"`) to replicate the exact framework to any other workspace (such as `door`).

---

## 3. 📜 Chronological Prompt & Task Execution Log (প্রম্পট ও কাজের ইতিহাস)
*Every user prompt, feature change, bug fix, and task completion is recorded here chronologically.*

### 🔹 Session 2026-11-09 (System Memory & Asset Structure Initialization)
| # | Time | User Prompt / Goal | Actions Taken & Files Modified | Verification / Build | Next Ready Step |
|---|---|---|---|---|---|
| 01 | 15:25 | Add persistent memory system to preserve state across days and reduce token usage | Created `planning/MEMORY.md`, updated `AGENTS.md`, `planning/updateplanning.md`, `PROMPT_SHORTCUT.md`, and guides. | Verified (Clean) | `TASK-001`: Client Intake |
| 02 | 15:53 | Enforce semantic image folder architecture under `frontend/public/images/` | Created semantic subdirectories (`hero`, `products`, `categories`, `gallery`, `features`, `anatomy`, `showroom`, `slices`), updated documentation and scripts. | Verified (Clean) | `TASK-001`: Client Intake |

### 🔹 Session 2026-11-10 (Language Preferences, Quick Settings & Client Modification Engine)
| # | Time | User Prompt / Goal | Actions Taken & Files Modified | Verification / Build | Next Ready Step |
|---|---|---|---|---|---|
| 03 | 15:55 | Add language preference (English vs Bangla) with English display, interactive settings CLI, client modification handling workflow, single-file updates, and project sync | Created `settings.json`, `scripts/settings.js` (CLI for language/strategy toggling), `scripts/sync-core.js`, `scripts/sync.js`, updated `scripts/sync-to-project.ps1`, created `inputs/client_docs/updates.md`, updated `AGENTS.md` (Mandate 6 & Phase 5 Modification Protocol), updated `PROMPT_SHORTCUT.md` (bilingual shortcuts & revision prompts), updated `project.config.md`, `package.json`, and `planning/MEMORY.md`. | Verified (Clean) | Ready for Client Intake or Target Project Sync (`door`) |

### 🔹 Session 2026-11-11 (Backend Pre-Execution Planning Gate & Component Bundles)
| # | Time | User Prompt / Goal | Actions Taken & Files Modified | Verification / Build | Next Ready Step |
|---|---|---|---|---|---|
| 04 | 10:25 | Enforce backend pre-execution gate with visual DB ERD diagram & system flowchart based on SRS & frontend page audit before writing backend code | Added Mandate 7 in `AGENTS.md`, added Backend Pre-Execution Gate prompt in `PROMPT_SHORTCUT.md`, created component bundle workflow (`inputs/modifications/features/`), updated guides and synced to `door`. | Verified (Clean) | Ready for execution |

---

## 4. 🌅 Next-Day / Fresh Session Resume Protocol (পরবর্তী দিন বা নতুন চ্যাটে শুরু করার নিয়ম)

When you close the chat today and return tomorrow, or open a fresh chat window to save tokens, copy and paste this single prompt based on your language preference:

### In English:
```text
Read planning/MEMORY.md and planning/updateplanning.md to restore yesterday's session state and resume the active task seamlessly without mismatch.
```

### বাংলায়:
```text
planning/MEMORY.md এবং planning/updateplanning.md দেখে গতকালকের কাজের ধারাবাহিকতা ও বর্তমান স্টেট রিড করো এবং পরবর্তী টাস্কটি এক্সিকিউট করো।
```
