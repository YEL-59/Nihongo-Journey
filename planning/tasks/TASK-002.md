# TASK-002: Design Tokens, Shell Layout, Navigation & Landing Page

- **Task ID**: `TASK-002`
- **Domain**: Frontend (Next.js 14 / Tailwind CSS)
- **Status**: `DONE`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-001`
- **Completed At**: 2026-11-13 14:21
- **Verification**: Frontend `npm run build` passed (0 errors) | Backend `npm run build` passed (0 errors)

---

## 1. Objective
Establish the foundational design system, theme tokens, Japanese-inspired aesthetic, responsive global navigation shell, and the public landing page (`/`).

---

## 2. Deliverables
1. **Design Tokens & Fonts (`frontend/tailwind.config.ts`, `globals.css`):**
   - Brand Indigo (`#4F46E5`), Purple (`#7C3AED`), Emerald (`#10B981`), Warm Off-White (`#FDFBF7`), Sakura Pink (`#EC4899`), Torii Crimson (`#E11D48`).
   - Font configuration: `Inter` for Latin, `Noto Sans JP` for Japanese text, `Hind Siliguri` for Bangla.
2. **Responsive Shell Components (`frontend/src/components/layout/`):**
   - Collapsible desktop sidebar (`Sidebar.tsx`) with links to all 19 application modules.
   - Mobile persistent bottom navigation bar (`MobileNav.tsx`) with 5 core tabs.
   - Top Header bar (`Header.tsx`) with streak flame counter, JLPT N5 pill, and language toggle (EN/BN/JA).
   - Global Layout coordinator (`AppShell.tsx`) with mobile slide-over drawer.
3. **Storage & State Foundation (`frontend/src/lib/storage.ts`, `AppContext.tsx`):**
   - Safe access for all 10 LocalStorage keys, language mode, romaji switch, streak tracking, theme toggle, and audio speech synthesis.
4. **Landing Page (`frontend/src/app/page.tsx`):**
   - Hero showcase with Torii-inspired badge, feature highlights, JLPT level roadmap preview, language toggle, and "Start Journey" CTA.
   - Interactive Trilingual Demo Sentence widget with native speech synthesis playback and interactive word-by-word breakdown.
   - 6 Core pedagogical pillar cards with 6-state UI styling.
   - 4-Phase Curriculum Roadmap preview.
   - Daily 2-Hour Study Routine card.
   - Zero-backend offline LocalStorage guarantee banner.
5. **6-State UI Enforcement** on interactive cards and navigation items.

---

## 3. Acceptance & Verification Criteria
- [x] Responsive navigation verified on desktop, tablet, and mobile breakpoints.
- [x] Japanese and English typography renders cleanly.
- [x] `npm run build` in `frontend/` succeeds with 0 errors.
- [x] `npm run build` in `backend/` succeeds with 0 errors.
