# ⚙️ Project Configuration: Nihongo Journey (にほんご Journey)

> **Version**: 1.0.0  
> **Architecture**: Lightweight MERN Stack + Next.js 14 App Router  
> **Execution Engine**: Plan-First, Context-Isolated, Zero-Docker AI Protocol  
> **Active Strategy**: `FRONTEND_FIRST` (Client Demo Priority -> Local Storage & UI First -> Backend Mongoose & API -> Integration)  

---

## 1. Project Information & Metadata

- **Project Name**: Nihongo Journey (にほんご Journey)
- **Project Domain**: Personal Japanese Language Learning Web Application (Beginner to JLPT N5)
- **Status**: `INTAKE_AND_PLAN_COMPLETE` (Awaiting Developer Approval Gate)
- **Language Preference**: `EN` (English)
- **Client Brief Source**: `inputs/client_docs/requirements.md` & `inputs/client_docs/telegram_chat.txt`
- **Client Modifications / Updates**: `inputs/client_docs/updates.md`
- **UI Screenshots**: `inputs/screenshots/`
- **Reference Websites**: `inputs/references.md`

---

## 2. Global Settings & Language Control
- Run `npm run settings` in terminal anytime to interactively toggle language or execution strategy.
- **AI Behavior Rule**:
  - When language is set to `EN`: All conversation responses, build status messages, task completion reports, session handoff cards, and next-day resume prompt suggestions MUST be in **English**.
  - When language is set to `BN`: All responses and cards are displayed in **Bangla**.

---

## 3. Technology Stack Specification

| Layer | Technology | Version / Configuration | Directory |
|---|---|---|---|
| **Backend Runtime** | Node.js + Express | Express 4.x + TypeScript | `backend/` |
| **Database** | MongoDB | Mongoose 8.x ODM | `backend/` |
| **Frontend Framework** | Next.js 14 | App Router + TypeScript | `frontend/` |
| **Styling** | Tailwind CSS | PostCSS + Autoprefixer | `frontend/` |
| **Iconography** | Lucide React | Modern SVG icons | `frontend/` |
| **Audio / Recording** | HTML5 Audio & Web MediaRecorder | In-browser playback & voice recording | `frontend/` |
| **Local Storage** | Browser LocalStorage | 10 persistent keys | `frontend/` |
| **HTTP Client** | Axios | Standardized API client | `frontend/src/services/` |
| **Concurrency** | concurrently | Runs both frontend & backend concurrently | Root |
| **DevOps / Container** | **NONE** | Zero-Docker policy (Native local execution) | N/A |
