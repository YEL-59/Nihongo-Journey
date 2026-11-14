# TASK-007: Grammar Library, Reading Lab, Listening & Speaking Labs

- **Task ID**: `TASK-007`
- **Domain**: Frontend (Next.js 14 / Skills & Media Labs)
- **Status**: `DONE`
- **Priority**: `P0`
- **Assigned Role**: Frontend Developer
- **Dependencies**: `TASK-005`; approved level-aware content structure is implemented

---

## 1. Objective
Implement the advanced language skill modules: Grammar Library (`/grammar`), Reading Lab (`/reading`), Listening Lab (`/listening`), and Speaking Lab with microphone recording (`/speaking`).

> **Progress note**: The developer approved the N5–N1 shared-content architecture. N5 content now lives in `frontend/src/content/levels/n5/`, while shared contracts, registry, and kana content live under `frontend/src/content/shared/`. N4–N1 remain metadata-only and planned. Finish and verify the four N5 labs before marking this task done.
>
> **Progress note (2026-11-14)**: Browser-generated Japanese speech is the fastest current demo path; native recordings are deferred until an authorized source is selected in Q-003. Reading translation and listening language, playback-rate selection, and answer feedback were verified. A simulated permission denial shows a clear recovery message, and a synthetic-stream test produced a recording blob and enabled self-rating. The smoke-test browser could not decode that recording, so real-device capture and playable recorded audio still need verification.
>
> **Closure note (2026-11-14)**: Closed at the developer's direction. Browser-generated speech is accepted for this frontend milestone; native recordings remain deferred under Q-003. Real-device recording playback is a known follow-up, not a verified acceptance result.

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
   - Provide Japanese reference pronunciation audio using browser speech synthesis for the frontend demo; native recordings are deferred pending an approved source.
   - HTML5 `MediaRecorder` integration for microphone recording and playback.
   - Shadowing practice mode and self-assessment scoring.

---

## 3. Acceptance & Verification Criteria
- [x] Audio player exposes variable playback speeds; UI state and speech-rate wiring verified.
- [ ] Microphone permission denial is handled; synthetic capture produced a review blob, but real-device playback remains unverified (developer accepted this follow-up at closure).
- [x] Reading translations are toggleable; furigana is present in the passages.
- [x] Root `npm run build` passes for backend and frontend with 0 errors.
