# TASK-007: Grammar Library, Reading Lab, Listening & Speaking Labs

- **Task ID**: `TASK-007`
- **Domain**: Frontend (Next.js 14 / Skills & Media Labs)
- **Status**: `BACKLOG`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-005`

---

## 1. Objective
Implement the advanced language skill modules: Grammar Library (`/grammar`), Reading Lab (`/reading`), Listening Lab (`/listening`), and Speaking Lab with microphone recording (`/speaking`).

---

## 2. Deliverables
1. **Grammar Library (`frontend/src/app/grammar/page.tsx`):**
   - N5 sentence pattern cards (e.g., `~は~です`, `~てください`, `~たいです`, `~ましょう`).
   - Formation rules, particle highlights, Bangla & English explanations, positive/negative/question examples, and common mistake warnings.
2. **Reading Practice Lab (`frontend/src/app/reading/page.tsx`):**
   - Graded reading passages and dialogues with Furigana toggle and translation reveal.
   - Reading comprehension questions with instant answer validation.
3. **Listening Lab (`frontend/src/app/listening/page.tsx`):**
   - Audio conversation player with playback rate selector (0.75x, 1.0x, 1.25x).
   - Interactive transcript with toggleable Japanese, English, and Bangla text.
   - Comprehension questions linked to audio segments.
4. **Speaking Lab (`frontend/src/app/speaking/page.tsx`):**
   - Reference native pronunciation audio.
   - HTML5 `MediaRecorder` integration for microphone recording and playback.
   - Shadowing practice mode and self-assessment scoring.

---

## 3. Acceptance & Verification Criteria
- [ ] Audio player supports variable playback speeds (0.75x slow vs 1.0x normal).
- [ ] Microphone recorder captures audio, provides instant waveform/playback, and handles browser permissions gracefully.
- [ ] Reading texts display toggleable translations and furigana.
- [ ] `npm run build` in `frontend/` passes with 0 errors.
