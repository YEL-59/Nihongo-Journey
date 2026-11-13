# ⚡ 1-Click AI Prompt Shortcuts Cheat Sheet

> **💡 Quick Language & Strategy Settings**:
> Run `npm run settings` in your terminal to change language or strategy anytime!
> - Press `1` -> Change Language (`English` or `বাংলা`).
> - Press `2` -> Change Execution Strategy (`FRONTEND_FIRST`, `BOTH_FULLSTACK`, `BACKEND_FIRST`).
> - When `language` is set to `en` in `settings.json`, **ALL** AI responses, task completion cards, and suggestions are strictly in English.

---

## 1. 🚀 Master Intake Kickoff Prompts (Start of Project)

### Option A: Frontend-First (Client Demo Priority - UI & Screenshots First)
*Use this when you want to show the client a clickable UI clone matching their screenshots before building backend APIs:*

```markdown
I have placed the client's materials in the `inputs/` directory:
- Telegram chat / messages: `inputs/client_docs/telegram_chat.txt`
- Requirements brief: `inputs/client_docs/requirements.md`
- UI Screenshots: `inputs/screenshots/`
- Reference websites: `inputs/references.md`

Language Preference: English
Execution Strategy: FRONTEND_FIRST
Follow `AGENTS.md`:
1. Check `settings.json` and ensure all responses and task reports are in English.
2. Analyze all inputs (Telegram messages override older PDF briefs).
3. Generate `PRD_AND_PLAN.md` with visual architecture & user flowcharts (Mermaid), database plan & visual ERD diagram, UI screenshot breakdown, design tokens, and mock data models.
4. Order tasks in `planning/tasks/` to build the Next.js layout, pages, and interactive states first for client approval, followed by backend endpoints and integration.
5. STOP and present the plan to me. Do not write any code until I review and approve with "OK".
```

*(বাংলায় দিতে চাইলে: `Language Preference: Bangla` লিখে দিন)*

---

### Option B: Both / Full-Stack (Standard MERN Workflow)
*Use this for concurrent full-stack development with live database and endpoints from the start:*

```markdown
I have placed the client's materials in the `inputs/` directory:
- Telegram chat: `inputs/client_docs/telegram_chat.txt`
- Requirements brief: `inputs/client_docs/requirements.md`
- UI Screenshots: `inputs/screenshots/`
- Reference websites: `inputs/references.md`

Language Preference: English
Execution Strategy: BOTH_FULLSTACK
Follow `AGENTS.md`:
1. Check `settings.json` and ensure all responses and task reports are in English.
2. Analyze all inputs (Telegram messages override older PDF briefs).
3. Generate `PRD_AND_PLAN.md` with visual system architecture and user flow diagrams, complete database plan, Mermaid ERD diagram, Mongoose schemas with field matrices, Express routes, and screenshot UI components.
4. Order tasks in `planning/tasks/` to build Mongoose models -> Express controllers/routes -> Next.js frontend -> API integration.
5. STOP and present the plan to me. Do not write any code until I review and approve with "OK".
```

---

### Option C: 🎯 Exact Screenshot Clone & Zero-Placeholder UI First
*Use this when the client gave you specific screenshots and you want the frontend to look 100% like their images:*

```markdown
I have placed client UI screenshots in the `inputs/screenshots/` directory:
- UI Screenshots: `inputs/screenshots/`
- Reference websites / notes: `inputs/references.md`
- Client brief / notes: `inputs/client_docs/requirements.md`

Language Preference: English
Execution Strategy: FRONTEND_FIRST (Exact Screenshot Clone Protocol)
Follow `AGENTS.md`:
1. Deconstruct every visual element in the screenshots: extract exact hex colors, typography styles, card aspect ratios, border radius, and drop shadows.
2. ZERO-PLACEHOLDER MANDATE: Identify every hero image, product photo, material finish, or banner in the screenshots. Proactively generate high-definition, photorealistic matching assets and place them in `frontend/public/images/`.
3. Include visual system/user flow diagrams, complete database plan, and Mermaid ERD diagram in `PRD_AND_PLAN.md`.
4. Build the responsive Next.js pages to be a pixel-accurate clone of the screenshots with 100% visual fidelity.
5. Implement all 6 UI states (Default/Success, Loading Skeleton, Empty State, Error Alert, Responsive Breakpoints, Focus/Hover).
6. Run `npm run build` to verify 0 errors and provide the local preview link: http://localhost:3000.
```

---

## 2. ✅ Plan Approval & Execution Prompt
*Paste this after reviewing the generated `PRD_AND_PLAN.md`:*

**In English:**
```markdown
The plan is OK. Proceed to execute the tasks sequentially 1 by 1 according to `AGENTS.md`. Run tests/build after each task, ensure zero TypeScript errors, and update `planning/task.md`, `planning/MEMORY.md`, and `planning/updateplanning.md` with progress.
```

**বাংলায়:**
```markdown
প্ল্যানটি ঠিক আছে। AGENTS.md অনুযায়ী ধারাবাহিকভাবে ১টি করে টাস্ক এক্সিকিউট করো। প্রতিটি টাস্কের পর npm run build চালিয়ে ০ এরর নিশ্চিত করো এবং planning/task.md, planning/MEMORY.md ও planning/updateplanning.md আপডেট করো।
```

---

## 3. 🧠 Backend Pre-Execution Gate Prompt (DB Diagram & Flowchart First)
*Paste this when transitioning to Backend development or before building any database schemas and API routes:*

**In English:**
```markdown
We are preparing to build the backend. Follow Mandate 7 in `AGENTS.md`:
1. Analyze the SRS (`SRS.md` or client briefs) and inspect all existing frontend pages/components (`frontend/src/app/`, `frontend/src/components/`) to extract all required data models, form fields, filter parameters, and calculations.
2. Generate an End-to-End System & API Flowchart (`mermaid flowchart TD`).
3. Generate a visual Database ERD Diagram (`mermaid erDiagram`) showing all collections, field types, primary/foreign keys, and relationships (1:1, 1:N, N:M).
4. Provide the REST API endpoint specification matrix adhering to standard `sendResponse`.
5. STOP and present this complete visual plan to me in chat and save to `planning/BACKEND_PLAN.md`. Do not write any backend code until I review and approve with "OK".
```

**বাংলায়:**
```markdown
আমরা ব্যাকএন্ড তৈরির প্রস্তুতি নিচ্ছি। AGENTS.md এর Mandate 7 অনুযায়ী কাজ শুরু করো:
1. SRS এবং বর্তমান ফ্রন্টএন্ডের সকল পেজ ও কম্পোনেন্ট অ্যানালাইসিস করে ডাটা মডেল, ফিল্ড, ও কুয়েরি বের করো।
2. এন্ড-টু-এন্ড এপিআই রিকোয়েস্ট ফ্লোচার্ট (`mermaid flowchart TD`) তৈরি করো।
3. সম্পূর্ণ ডাটাবেজ ইআরডি ডায়াগ্রাম (`mermaid erDiagram`) তৈরি করো যাতে সব কালেকশন, ফিল্ড ও রিলেশনশিপ (1:1, 1:N) পরিষ্কারভাবে দেখা যায়।
4. রেস্ট এপিআই এন্ডপয়েন্ট ম্যাট্রিক্স প্রদর্শন করো।
5. ব্যাকএন্ডের কোড লেখার আগে পুরো প্ল্যান ও ডায়াগ্রাম চ্যাটে উপস্থাপন করো এবং planning/BACKEND_PLAN.md ফাইলে সেভ করো। আমি "OK" না বলা পর্যন্ত কোনো কোড লিখবে না।
```

---

## 4. 🔄 Client Modifications & Revision Prompts (Phase 5 Protocol)
*When the client reviews the site and asks for changes, revisions, or new features:*

### Method 1: Semantic Modifications Folder (`inputs/modifications/`)
*Drop your notes/changes in `inputs/modifications/update_notes/updates.md` and upload new screenshots to `inputs/modifications/screenshots/`:*

**In English:**
```markdown
Client requested updates/modifications. I have organized the revision materials into `inputs/modifications/`:
- Written Updates Brief: `inputs/modifications/update_notes/updates.md`
- Telegram Chat Export: `inputs/modifications/telegram_chats/` (messages.html / telegram_chat.txt)
- Revision Screenshots: `inputs/modifications/screenshots/` (ui_tweaks, new_sections, bug_fixes)

Execution Mode: CLIENT_MODIFICATION (Zero-Regression)
Follow Phase 5 of `AGENTS.md`:
1. Read `planning/MEMORY.md` and `PROJECT_STATUS.md` first to protect all existing working features and routes.
2. Deconstruct the requested modifications and create atomic revision tasks in `planning/tasks/`.
3. Apply surgical changes to the relevant frontend components and backend endpoints.
4. Verify with `npm run build` on both frontend and backend (ensure 0 errors).
5. Update `PROJECT_STATUS.md` and `planning/MEMORY.md` with modified files and live system state.
```

**বাংলায়:**
```markdown
ক্লায়েন্টের নতুন পরিবর্তন ও রিভিশনের তথ্য `inputs/modifications/` ফোল্ডারে সাজিয়ে রেখেছি:
- লিখিত আপডেট নোট: `inputs/modifications/update_notes/updates.md`
- টেলিগ্রাম চ্যাট এক্সপোর্ট: `inputs/modifications/telegram_chats/`
- রিভিশন স্ক্রিনশট: `inputs/modifications/screenshots/` (ui_tweaks, new_sections, bug_fixes)

AGENTS.md এর Phase 5 (ক্লায়েন্ট মডিফিকেশন প্রোটোকল) অনুসরণ করো:
1. প্রথমে planning/MEMORY.md এবং PROJECT_STATUS.md দেখে বর্তমান কাজের স্টেট প্রটেক্ট করো।
2. ক্লায়েন্টের চাওয়া পরিবর্তনগুলো বের করে planning/tasks/ এ টাস্ক যুক্ত করো।
3. পূর্বের কোনো কোড নষ্ট না করে সুনির্দিষ্ট পরিবর্তনগুলো সম্পন্ন করো।
4. ফ্রন্টএন্ড ও ব্যাকএন্ডে `npm run build` চালিয়ে ০ এরর নিশ্চিত করো।
5. PROJECT_STATUS.md ও planning/MEMORY.md আপডেট করো।
```

---

### Method 2: Component Bundle (Image + Notes in ONE folder - e.g. Navbar)
*When you want to modify a specific component like Navbar, Hero, or Modal without touching other files:*
*Drop both your screenshot (e.g. `navbar.png`) and your text file (`notes.txt`) into `inputs/modifications/features/navbar/`:*

**In English:**
```markdown
I have created a component modification bundle in `inputs/modifications/features/navbar/`:
- Screenshot(s): `inputs/modifications/features/navbar/` (reference image)
- Instructions: `inputs/modifications/features/navbar/notes.txt`

Follow Phase 5 of `AGENTS.md`:
1. Read `notes.txt` and inspect the attached screenshot(s) to understand the requested design changes.
2. Locate the corresponding navbar component in `frontend/src/components/`.
3. Apply surgical modifications to match the screenshot and requirements with zero regressions to the rest of the application.
4. Run `npm run build` on both frontend and backend to verify 0 errors.
5. Update `PROJECT_STATUS.md` and `planning/MEMORY.md`.
```

**বাংলায়:**
```markdown
আমি নির্দিষ্ট কম্পোনেন্ট পরিবর্তনের জন্য `inputs/modifications/features/navbar/` ফোল্ডারে ফাইল রেখেছি:
- স্ক্রিনশট: `inputs/modifications/features/navbar/` (ডিজাইন রেফারেন্স)
- নির্দেশনা: `inputs/modifications/features/navbar/notes.txt`

AGENTS.md এর Phase 5 অনুযায়ী:
1. `notes.txt` ফাইলটি পড়ে এবং স্ক্রিনশট দেখে ন্যাপবার ডিজাইনের পরিবর্তনগুলো বুঝে নাও।
2. `frontend/src/components/` থেকে ন্যাপবার কম্পোনেন্টটি বের করো।
3. অন্য কোনো পেজ নষ্ট না করে নিখুঁতভাবে পরিবর্তনটি সম্পন্ন করো।
4. `npm run build` চালিয়ে ০ এরর নিশ্চিত করো।
5. `PROJECT_STATUS.md` এবং `planning/MEMORY.md` আপডেট করো।
```

---

### Method 3: Raw Telegram Chat Export (`messages.html` or `telegram_chat.txt`)
*Drop exported chat into `inputs/client_docs/` and new images into `inputs/screenshots/`:*

**In English:**
```markdown
The client sent raw revision feedback via Telegram chat. I have saved it to:
- Telegram Chat Export: `inputs/client_docs/telegram_chat.txt` (or `inputs/client_docs/messages.html`)
- Attached Screenshots: `inputs/screenshots/`

Follow Phase 5 (Client Modification Protocol) in `AGENTS.md`:
1. Read `planning/MEMORY.md` to protect existing working code.
2. Parse the chat messages to extract finalized revision requirements (ignore casual chat/greetings).
3. Schedule revision tasks in `planning/task.md`.
4. Apply code changes without regressions and verify with `npm run build`.
5. Update `planning/MEMORY.md` and present the completion report in English.
```

**বাংলায়:**
```markdown
ক্লায়েন্টের টেলিগ্রাম চ্যাটের এক্সপোর্ট ড্রপ করেছি:
- টেলিগ্রাম চ্যাট: `inputs/client_docs/telegram_chat.txt` (বা `messages.html`)
- নতুন স্ক্রিনশট: `inputs/screenshots/`

AGENTS.md এর Phase 5 অনুযায়ী:
1. planning/MEMORY.md রিড করে বর্তমান কাজ সংরক্ষণ করো।
2. টেলিগ্রাম চ্যাট থেকে আসল রিকোয়ারমেন্ট ফিল্টার করে মডিফিকেশন টাস্ক তৈরি করো।
3. কোনো রিগ্রেশন ছাড়া কোড পরিবর্তন করো এবং `npm run build` চেক করো।
4. planning/MEMORY.md আপডেট করে রিপোর্ট প্রদর্শন করো।
```

---

## 4. 🌅 Next-Day & Fresh Session Resume Prompt (Save 95% Tokens)
*When you start work the next day or after a break, open `PROJECT_STATUS.md` to see the exact checkpoint timestamp, then open a fresh AI chat window and paste:*

**In English:**
```markdown
Read PROJECT_STATUS.md and planning/MEMORY.md (Checkpoint: [YYYY-MM-DD HH:MM]) to restore session state and execute the next task [TASK-XXX].
```

**বাংলায়:**
```markdown
PROJECT_STATUS.md এবং planning/MEMORY.md (চেকপয়েন্ট: [YYYY-MM-DD HH:MM]) দেখে সেশন স্টেট রিস্টোর করো এবং পরবর্তী টাস্কটি [TASK-XXX] এক্সিকিউট করো।
```

---

## 5. 💾 End-of-Day Memory Checkpoint & State Lock Prompt
*Before closing your laptop or ending work for the day:*

**In English:**
```markdown
Log today's session summary, modified files, and active system state to `planning/MEMORY.md` and `planning/updateplanning.md` so we can resume tomorrow seamlessly with zero context loss.
```

**বাংলায়:**
```markdown
আজকের সেশনের সব কাজ, পরিবর্তিত ফাইল এবং বর্তমান লাইভ স্টেট planning/MEMORY.md এবং planning/updateplanning.md ফাইলে নিখুঁতভাবে সেভ করো, যাতে কালকে নতুন চ্যাটে সরাসরি এখান থেকে কাজ শুরু করা যায়।
```

---

## 6. 🛠️ Bug Fix & Screenshot Polish Prompt
*If you or the client find an issue or want quick UI adjustments:*

**In English:**
```markdown
I noticed an issue with [describe issue or component]:
- Expected behavior: [what should happen]
- Observed behavior / error: [what happened]

Please inspect the relevant files, resolve the root cause, run `npm run build` to verify zero regressions, and update `planning/MEMORY.md` and `planning/updateplanning.md`.
```

**বাংলায়:**
```markdown
আমি [কম্পোনেন্ট বা ফিচারের নাম] এ একটি সমস্যা লক্ষ্য করেছি:
- যা হওয়া উচিত ছিল: [বর্ণনা]
- যা ঘটছে বা এরর: [বর্ণনা]

প্রয়োজনীয় ফাইল চেক করে সমাধান করো, `npm run build` দিয়ে ০ এরর নিশ্চিত করো এবং planning/MEMORY.md ও updateplanning.md আপডেট করো।
```

---

## 7. 📦 Final Handover & Audit Prompt
*When all tasks in `planning/task.md` are marked DONE:*

**In English:**
```markdown
All tasks are marked DONE. Run the final validation suite (`powershell -ExecutionPolicy Bypass -File scripts/validate-project.ps1`), verify that both backend and frontend build with 0 errors, and provide a clean client delivery summary including:
1. Delivered backend endpoints & models
2. Built frontend pages & screenshot fidelity confirmation
3. Local run instructions and git commit suggestion
```

**বাংলায়:**
```markdown
সব টাস্ক সম্পন্ন হয়েছে। ফাইনাল ভ্যালিডেশন স্ক্রিপ্ট চালাও, ব্যাকএন্ড ও ফ্রন্টএন্ডে ০ এরর নিশ্চিত করো এবং ক্লায়েন্টকে দেওয়ার মতো সুন্দর ডেলিভারি সামারি তৈরি করো।
```
