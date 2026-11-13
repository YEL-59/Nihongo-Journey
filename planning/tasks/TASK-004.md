# TASK-004: Frontend Design Tokens, Navbar & Layout (Screenshot-Accurate)

- **Task ID**: `TASK-004`
- **Domain**: Frontend (Next.js / Tailwind CSS)
- **Status**: `BACKLOG`
- **Priority**: `P1`
- **Assigned Role**: Full-Stack Developer
- **Dependencies**: `TASK-001`

---

## 1. Objective
Extract exact colors, typography hierarchy, spacing, and component structure from `inputs/screenshots/` and implement the global shell (Navbar, Footer, Layout, Theme tokens).

---

## 2. Deliverables
1. Configure Tailwind color tokens in `frontend/tailwind.config.ts`.
2. Global Layout & Root Shell in `frontend/src/app/layout.tsx`.
3. Header / Navbar with mobile responsive drawer menu (`< 640px`) and desktop navigation (`> 1024px`).
4. Reusable UI components in `frontend/src/components/ui/`.

---

## 3. Acceptance & Verification Criteria
- [ ] Navbar and layout visually match the screenshot provided by client.
- [ ] Responsive navigation verified (mobile drawer + desktop menu).
- [ ] Next.js compilation check: `npm run build` in `frontend/` passes with 0 errors.
