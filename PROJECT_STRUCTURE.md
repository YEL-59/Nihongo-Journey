# 📁 EasyTemplate: Project Structure & Architecture Guide (A to Z)

> **Philosophy**: Built for speed, high token-efficiency, zero-Docker overhead, and rapid client deliveries using pure MERN Stack + Next.js App Router.

---

## 1. Directory Tree Overview

```text
easytemplate/
├── AGENTS.md                          # Master Autonomous Execution Rules (Plan -> Execute -> Verify)
├── README.md                          # Quickstart, local run commands & framework philosophy
├── HOW_TO_USE_BN.md                   # বাংলায় সম্পূর্ণ গাইড (Client Intake, 1-Click Prompt, Task Flow)
├── HOW_TO_USE_EN.md                   # English Developer Onboarding & Step-by-Step Guide
├── PROJECT_STRUCTURE.md               # Complete A to Z architecture guide (This file)
├── PROMPT_SHORTCUT.md                 # 1-Click Ready Prompts (Kickoff, Execute, Resume, Fix, Handover)
├── project.config.md                  # Central Project Config (Ports, Mongo URI, Brand Palette)
├── PRD_AND_PLAN.md                    # Master Blueprint (Visual Flow Diagrams, ERD, DB Plan, Schemas & Endpoints)
├── SRS.md                             # Software Requirements Specification (IEEE 830 standard)
├── TASKS.md                           # Quick high-level progress tracker
│
├── inputs/                            # Client Briefs & Assets Dropzone (No manual cleanup needed)
│   ├── client_docs/
│   │   ├── requirements.md            # Client PDF / Word brief text pasted here
│   │   └── telegram_chat.txt          # Client chat export (Overrides initial brief)
│   ├── screenshots/                   # Client UI screenshots for exact cloning
│   └── references.md                  # Competitor / inspiration links
│
├── planning/                          # Context-Isolated Task Board & Session Governance
│   ├── MEMORY.md                      # Persistent Project Brain (Live State, Prompt Logs, Token-Saver)
│   ├── task.md                        # Master Task Board with Status, Priority & Verification
│   ├── updateplanning.md              # Active Session Checkpoint & Fresh Session Resume Command
│   ├── open-questions.md              # Zero-Assumption Policy: Client ambiguities log
│   ├── decisions.md                   # Architecture Decision Records (ADR)
│   └── tasks/                         # Atomic task files (TASK-001.md to TASK-00N.md)
│       ├── TASK-001.md                # Architecture Blueprint
│       ├── TASK-002.md                # Mongoose Models
│       ├── TASK-003.md                # Express API Routes
│       ├── TASK-004.md                # Screenshot-Accurate Layout & Navbar
│       ├── TASK-005.md                # Feature Pages & API Integration
│       └── TASK-006.md                # Platform Verification & Build Audit
│
├── scripts/                           # Cross-Platform Automation (PowerShell + Bash)
│   ├── validate-project.ps1           # Project validation script for Windows
│   ├── validate-project.sh            # Project validation script for Linux / Mac
│   ├── check-task.ps1                 # Active task inspector for Windows
│   ├── check-task.sh                  # Active task inspector for Linux / Mac
│   └── dev.ps1                        # 1-Click Dev Server Launcher (PowerShell)
│
├── backend/                           # Pure MERN Backend (Express + TypeScript + Mongoose)
│   ├── src/
│   │   ├── config/                    # Environment variable parser
│   │   ├── middlewares/               # globalErrorHandler & notFound middleware
│   │   ├── routes/                    # API route index
│   │   ├── utils/                     # sendResponse standard envelope
│   │   ├── app.ts                     # Express application definition
│   │   └── server.ts                  # Server entry & MongoDB connection
│   ├── .env                           # Backend environment variables
│   ├── package.json                   # Backend dependencies & scripts
│   └── tsconfig.json                  # TypeScript compiler settings
│
├── frontend/                          # Modern Next.js Frontend (App Router + Tailwind + Lucide)
│   ├── public/
│   │   └── images/                    # Semantic Image Architecture (Zero Flat-Dumping)
│   │       ├── hero/                  # Hero banners, headers & cover visuals
│   │       ├── products/              # Catalog items, individual cards, packages
│   │       ├── categories/            # Category tiles, style cards, solution overviews
│   │       ├── gallery/               # Inspiration masonry grids, interior showcases
│   │       ├── features/              # Technical diagrams, swatches, mounting options
│   │       ├── anatomy/               # Visualizers, cutaways, layered section graphics
│   │       ├── showroom/              # Showroom tours, CNC machines, facility photos
│   │       └── slices/                # Reference crops from client screenshots
│   ├── src/
│   │   ├── app/                       # Next.js 14 App Router (layout.tsx, page.tsx, globals.css)
│   │   ├── components/                # Reusable UI primitives & shared components
│   │   │   ├── ui/                    # Buttons, Modals, Inputs, Cards
│   │   │   └── shared/                # Navbar, Footer, Drawers
│   │   ├── lib/                       # Utility functions (cn / clsx)
│   │   └── services/                  # Axios / API request handlers
│   ├── .env.local                     # Frontend environment variables
│   ├── package.json                   # Frontend dependencies & scripts
│   └── tailwind.config.ts             # Tailwind CSS tokens & theme setup
│
└── package.json                       # Root script orchestrator ("npm run dev", "npm run build")
```

---

## 2. Why EasyTemplate is Better than Heavy Enterprise Frameworks

| Comparison Factor | Heavy Framework (e.g. Avengerse) | EasyTemplate (This MERN Framework) |
|---|---|---|
| **DevOps / Containers** | Docker, Docker Compose (6 services), Nginx | **Zero Docker** – Runs natively on Node.js in seconds |
| **Backend Complexity** | NestJS, Prisma, Redis, Meilisearch, Postgres | **Express + Mongoose + TypeScript** – Pure MERN, lightweight |
| **Documentation Bloat** | 14 documentation files (50,000+ tokens) | **1 Consolidated Blueprint (`PRD_AND_PLAN.md`)** + `project.config.md` |
| **Agent Fragmentation** | 7 different agent personas (`iron_man`, `jarvis`, etc.) | **3 Unified Roles** (Architect, Full-Stack Dev, QA Verifier) |
| **Windows Compatibility** | Bash-only scripts (fails natively on PowerShell) | **Native PowerShell (`.ps1`)** + Bash (`.sh`) scripts |
| **Local Startup Time** | 2-5 minutes (pulling docker images, building) | **< 3 seconds** (`npm run dev`) |
| **RAM Usage** | 4GB - 8GB (Docker daemons, Postgres, Redis) | **< 400MB** total RAM |

---

## 3. How Token Efficiency is Enforced

1. **Context Isolation via Granular Tasks**:
   - Rather than asking an AI to read a massive 5,000-line specification, the AI only reads the active task file in `planning/tasks/TASK-XXX.md` (~50 lines).
   - This saves **85-90% of token consumption** on every interaction.

2. **Fresh Session Handoff Command**:
   - At the completion of each task, `planning/updateplanning.md` records the test results and outputs a single 1-line command.
   - The user can open a fresh AI chat window, paste that command, and the AI picks up right where it left off without needing the previous chat history!

3. **Single Source of Truth**:
   - Telegram chat exports take precedence over older conflicting PDF briefs.
   - Design tokens are derived directly from screenshots in `inputs/screenshots/`.
