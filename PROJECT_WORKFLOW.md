# EasyTemplate Autonomous Workflow & Development Guide

## 1. Directory Structure

```text
easytemplate/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── .prettierrc
│   ├── eslint.config.mjs
│   ├── package.json
│   ├── tsconfig.json
│   ├── dist/
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       └── config/
│           └── index.ts
├── frontend/
│   ├── (Next.js 14+ / App Router + Tailwind CSS)
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   └── ...
├── inputs/
│   ├── screenshots/     <-- Drop client UI screenshots here
│   ├── client_docs/     <-- Drop client PDFs, notes, Telegram exports
│   └── references.md    <-- Paste live reference site URLs & specific details
└── PROJECT_WORKFLOW.md
```

---

## 2. Low-Token Client Intake Workflow

### Step 1: Input Gathering (No manual cleanup needed)
1. Drop the Telegram chat export into `inputs/client_docs/telegram_chat.txt`.
2. Drop any requirement PDF / brief text into `inputs/client_docs/requirements.md`.
3. Drop client UI screenshots into `inputs/screenshots/`.
4. Put any reference site links in `inputs/references.md`.

### Step 2: The 1-Shot Spec Compiler
Run this single prompt to convert all messy input into an execution-ready PRD:

> "Read all files in `inputs/`. Extract the finalized feature set, resolve conflicts (Telegram chat overrides earlier PDFs), generate visual system architecture & user flow diagrams, create database plan with Mermaid ERD, define backend Mongoose schemas/routes, and map the UI components to match the screenshots. Output the result to `PRD_AND_PLAN.md`."

### Step 3: Screenshot-to-Exact-Clone Frontend Workflow
When building the frontend:
1. **Analyze Design Tokens First:** Colors (primary, secondary, gradients), typography hierarchy, spacing, rounded corners, card shadows.
2. **Component Breakdown:** Header/Navbar, Hero section, feature grids, modals, footer.
3. **Responsive Design Standard:**
   - Mobile: `< 640px` (drawer/hamburger, single-column cards)
   - Tablet: `640px - 1024px` (two-column layout)
   - Desktop: `> 1024px` (full navigation, container max-w-7xl, multi-column)
4. **Reference Site Integration:** When reference links are provided, match animation styles, transitions, and hover effects.

---

## 3. Backend Quick Reference

- **Development:** `npm run start:dev` (runs `ts-node-dev` with hot reloading)
- **Production Build:** `npm run build` (compiles to `./dist`)
- **Production Start:** `npm run start:prod` (runs compiled `dist/server.js`)
- **Linting:** `npm run lint`
- **Formatting:** `npm run prettier`
