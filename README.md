# ⚡ EasyTemplate: Autonomous MERN Stack AI Framework

> **The ultra-lightweight, zero-Docker AI starter framework built for rapid freelance client delivery, token efficiency, and screenshot-accurate full-stack MERN web applications.**

[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Next.js%2014-blue.svg)](https://nextjs.org/)
[![Zero Docker](https://img.shields.io/badge/Containers-Zero%20Docker-green.svg)](project.config.md)
[![Token Efficient](https://img.shields.io/badge/AI%20Tokens-Context%20Isolated-purple.svg)](planning/task.md)

---

## 🧭 Quick Navigation & Guides
- 🇧🇩 **সহজ বাংলা ব্যবহার নির্দেশিকা (Bangla Guide)**: [HOW_TO_USE_BN.md](HOW_TO_USE_BN.md)
- 🇬🇧 **Developer Onboarding & Workflow Guide (English)**: [HOW_TO_USE_EN.md](HOW_TO_USE_EN.md)
- 📄 **Software Requirements Specification (SRS)**: [SRS.md](SRS.md)
- 📁 **A to Z Directory & Architecture Guide**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- ⚡ **1-Click AI Prompt Shortcuts**: [PROMPT_SHORTCUT.md](PROMPT_SHORTCUT.md)
- ⚙️ **Project Tech Stack Config**: [project.config.md](project.config.md)
- 🤖 **Global Agent Protocol**: [AGENTS.md](AGENTS.md)

---

## 💡 Why EasyTemplate?

Heavy multi-agent templates mandate Docker, Nginx, PostgreSQL, NestJS, and 14 separate planning documents. For client projects and freelance MVPs, this causes massive token burn, bloated RAM usage, and Windows PowerShell script errors.

**EasyTemplate eliminates this friction:**
- **Zero-Docker Simplicity**: Runs natively in seconds on Node.js and MongoDB.
- **Pure MERN Stack**: Node.js + Express + TypeScript + Mongoose (Backend) & Next.js 14 App Router + Tailwind CSS + Lucide Icons (Frontend).
- **Context-Isolated Tasks**: Atomic 50-line task specs in `planning/tasks/` save 85–90% AI context tokens.
- **Continuous Build Gates**: Every task is validated via `npm run build` before being marked DONE.
- **Fresh Session Handoff**: Continue seamlessly in fresh chat windows without carrying conversational debt.

---

## 🚀 Quick Start (Local Run)

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Run Both Backend & Frontend Concurrently
```bash
npm run dev
```
*Or on Windows PowerShell:*
```powershell
.\scripts\dev.ps1
```

- **Frontend Web**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Status**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🛠️ Project Health Verification

Run the automated verification suite to audit file structure and TypeScript/Next.js builds:

**Windows PowerShell:**
```powershell
npm run validate
```
*Or:*
```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate-project.ps1
```

**Linux / macOS:**
```bash
./scripts/validate-project.sh
```

---

## 📋 The 3-Step Development Cycle

```text
  1. Intake & Blueprint          2. Sequential Execution           3. Continuous Build Gate
 ┌───────────────────────┐      ┌─────────────────────────┐      ┌──────────────────────────┐
 │ Drop client brief &   │ ---> │ AI executes 1 task from │ ---> │ Runs `npm run build` on  │
 │ screenshots in        │      │ `planning/tasks/`       │      │ both Backend & Frontend  │
 │ `inputs/`             │      │ (Mongoose / Next.js)    │      │ before marking task DONE │
 └───────────────────────┘      └─────────────────────────┘      └──────────────────────────┘
```

1. **Intake**: Drop files in `inputs/` and paste the Kickoff Prompt from [PROMPT_SHORTCUT.md](PROMPT_SHORTCUT.md).
2. **Review & Approve**: Review the generated [PRD_AND_PLAN.md](PRD_AND_PLAN.md) and reply `"Proceed"`.
3. **Delivery**: The AI executes tasks sequentially, validates with zero errors, and delivers clean code.



inputs/
├── client_docs/                  # 📋 Initial Project Kickoff Briefs
│   ├── requirements.md           # Client initial PDF or specifications
│   └── telegram_chat.txt         # Initial conversation history
│
├── screenshots/                  # 📸 Initial Screenshots (from project start)
│
└── modifications/                # 🔄 Dedicated Ongoing Client Revision Dropzone
    │
    ├── update_notes/             # 📝 Written change requests & briefs
    │   └── updates.md            # Structured single-file brief (what to add, change, remove)
    │
    ├── telegram_chats/           # 💬 Client revision chat exports
    │   ├── messages.html         # Native Telegram HTML export (auto-parsed)
    │   └── telegram_chat.txt     # Plain text chat export
    │
    └── screenshots/              # 🖼️ Modification & Revision Screenshots
        ├── ui_tweaks/            # Color, button, font, spacing or layout changes
        ├── new_sections/         # Brand new pages, sections, cards or modals requested
        └── bug_fixes/            # Screenshots highlighting visual bugs or issues
