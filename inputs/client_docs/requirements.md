# Client Requirements & Project Brief

Paste any text from the client's PDF, Word document, or Fiverr order description here.

## Project Scope
- Client business type / domain:
- Main goal of the project:

## Key Features Requested in Initial Brief
- Feature 1:
- Feature 2:
- Feature 3:

## Special Notes
- (Any specific colors, deadlines, or constraints mentioned in the brief)

# Nihongo Journey – Product Requirements Document

**Product:** Nihongo Journey (にほんご Journey)  
**Version:** 1.0  
**Product Type:** Personal Japanese Language Learning Web Application  
**Initial Level:** Absolute Beginner – JLPT N5  
**Learning Languages:** Bangla, English and Japanese  
**Primary Goal:** Prepare learners for Japanese study, everyday communication and future opportunities in Japan.

---

## 1. Product Overview

Nihongo Journey is a self-paced Japanese language learning platform that guides learners from zero Japanese knowledge to JLPT N5, N4 and eventually N3.

The application combines structured textbook learning, interactive lessons, vocabulary memorization, grammar explanations, Kanji, listening, speaking, reading and examination preparation.

The initial release is frontend-focused and uses local browser storage. It must be usable without authentication or a backend.

## 2. Product Goals

1. Provide a complete beginner-to-N5 learning journey.
2. Support Bangla, English and Japanese explanations.
3. Make daily Japanese practice simple and structured.
4. Provide textbook-based lessons and exercises.
5. Support vocabulary and Kanji revision.
6. Develop listening, speaking and reading skills.
7. Track learning progress and study consistency.
8. Prepare learners for JLPT examinations.
9. Keep the architecture expandable for N4 and N3.

## 3. Target Audience

- Absolute Japanese beginners.
- Bangladeshi students planning to study in Japan.
- Professionals planning to work in Japan.
- JLPT N5/N4/N3 candidates.
- Independent Japanese language learners.

## 4. Technology Stack

| Category | Technology |
|---|---|
| Frontend | React + Vite |
| Language | JavaScript / JSX |
| CSS | Tailwind CSS v4 |
| Components | shadcn/ui |
| Icons | Lucide React |
| Routing | React Router |
| State | React Context / Zustand |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animation | AOS |
| Notifications | react-hot-toast |
| Storage | localStorage |
| Deployment | Vercel |

TypeScript is not required. All initial functionality must work on the frontend.

## 5. Learning Curriculum

### Foundation
- Hiragana
- Katakana
- Dakuten and Handakuten
- Combined Kana sounds
- Japanese pronunciation
- Greetings
- Self-introduction

### JLPT N5
- Minna no Nihongo I, Lessons 1–25
- Basic grammar
- Particles
- Verbs and adjectives
- Vocabulary
- Beginner Kanji
- Reading comprehension
- Listening comprehension
- JLPT practice examinations

### JLPT N4
- Intermediate beginner grammar
- Additional vocabulary and Kanji
- Longer conversations
- Reading and listening exercises

### JLPT N3
- Intermediate grammar
- More complex reading
- Everyday Japanese comprehension
- Listening and communication development

The content must be organized into Levels → Modules → Chapters → Lessons → Exercises → Tests.

## 6. Application Pages

| Route | Page |
|---|---|
| `/` | Landing page |
| `/onboarding` | Learner onboarding |
| `/dashboard` | Main dashboard |
| `/roadmap` | Learning roadmap |
| `/learn` | Learning center |
| `/lessons/:id` | Lesson player |
| `/hiragana` | Hiragana practice |
| `/katakana` | Katakana practice |
| `/vocabulary` | Vocabulary library |
| `/flashcards` | Flashcards and revision |
| `/grammar` | Grammar library |
| `/kanji` | Kanji learning |
| `/listening` | Listening lab |
| `/speaking` | Speaking lab |
| `/reading` | Reading practice |
| `/quiz` | Quiz center |
| `/jlpt` | JLPT examination center |
| `/progress` | Progress analytics |
| `/schedule` | Study planner |
| `/settings` | Application settings |

## 7. Dashboard

The dashboard must display:

- Personalized greeting.
- Current JLPT level.
- Learning streak.
- Total study time.
- Completed lessons.
- Vocabulary learned.
- Kanji learned.
- Continue learning card.
- Daily study checklist.
- Weekly progress chart.
- Upcoming revision tasks.
- Upcoming tests.

All analytics must use actual saved activity.

## 8. Lesson Player

Every lesson must contain:

1. Learning objectives.
2. Japanese content.
3. Bangla explanation.
4. English explanation.
5. Pronunciation.
6. Vocabulary.
7. Grammar.
8. Listening activity.
9. Speaking activity.
10. Interactive exercises.
11. Final quiz.
12. Completion summary.

Supported exercise types:

- Multiple choice.
- Fill in the blanks.
- Matching.
- Sentence ordering.
- Kana recognition.
- Vocabulary matching.
- Kanji reading.
- Japanese typing.

Provide previous/next navigation, hints, answer explanations, bookmarks, audio replay and lesson progress.

## 9. Language System

Every vocabulary and grammar item should support:

- Japanese script.
- Hiragana reading.
- Kanji where applicable.
- Romaji.
- English meaning.
- Bangla meaning.
- Example sentences.
- Pronunciation audio.

Allow learners to select Bangla + Japanese, English + Japanese or all three languages.

Romaji visibility must be configurable.

## 10. Vocabulary System

Features:

- Search and filter.
- Vocabulary categories.
- Level classification.
- Kanji and Hiragana.
- Pronunciation.
- Bangla and English translations.
- Example sentences.
- Audio.
- Favorite words.
- Personal word collections.
- Flashcards.
- Spaced repetition.

Spaced repetition review intervals:

- Same day.
- 1 day.
- 3 days.
- 7 days.
- 14 days.
- 30 days.

Provide Again, Hard, Good and Easy responses.

## 11. Kana Learning

Hiragana and Katakana modules must include:

- Full character charts.
- Individual character learning.
- Pronunciation.
- Audio replay.
- Writing exercises.
- Stroke order.
- Character recognition.
- Randomized tests.
- Similar-character comparisons.
- Dakuten and combined sounds.

## 12. Grammar Library

Each grammar item must contain:

- Grammar pattern.
- Bangla explanation.
- English explanation.
- Formation.
- Usage.
- Positive examples.
- Negative examples.
- Question examples.
- Common mistakes.
- Interactive exercises.

## 13. Kanji Learning

Each Kanji record should include:

- Character.
- Meaning.
- Onyomi.
- Kunyomi.
- Stroke count.
- Stroke order.
- Common vocabulary.
- Example sentences.
- Bangla and English explanations.
- Writing practice.
- Recognition quiz.

Teach Kanji through vocabulary rather than isolated memorization.

## 14. Listening Lab

Features:

- Beginner audio lessons.
- Japanese conversations.
- Slow playback.
- Normal playback.
- Replay controls.
- Japanese transcripts.
- Bangla translations.
- English translations.
- Listening comprehension questions.

Use properly licensed or original audio files.

## 15. Speaking Lab

Features:

- Pronunciation reference audio.
- Microphone recording.
- Recording playback.
- Sentence repetition.
- Shadowing.
- Personal recording history.
- Self-assessment.

Use browser MediaRecorder where supported.

Automatic pronunciation scoring is a future integration requiring an appropriate speech service.

## 16. Reading Practice

Provide:

- Kana reading.
- Vocabulary reading.
- Basic sentences.
- Conversations.
- Short paragraphs.
- Daily-life scenarios.
- Comprehension questions.
- Translation reveal.
- Vocabulary highlights.

## 17. Quiz and JLPT System

Question types:

- Multiple choice.
- Fill in the blanks.
- Matching.
- Sentence ordering.
- Vocabulary.
- Kanji.
- Grammar.
- Reading comprehension.
- Listening comprehension.

Examination features:

- Countdown timer.
- Question navigation.
- Mark for review.
- Answer submission.
- Automatic scoring.
- Detailed explanations.
- Incorrect answer review.
- Performance breakdown.

Provide N5 practice examinations first, followed by N4 and N3 content.

## 18. Study Planner

Default study routine:

| Time | Activity |
|---|---|
| 7:30–7:50 PM | Vocabulary |
| 7:50–8:20 PM | Grammar |
| 8:20–8:40 PM | Kanji |
| 8:40–9:00 PM | Listening |
| 9:00–9:20 PM | Speaking and reading |
| 9:20–9:30 PM | Revision |

Allow users to customize study time, daily targets, study days and reminders.

## 19. Progress Analytics

Track:

- Study time.
- Streaks.
- Completed lessons.
- Vocabulary mastery.
- Kanji progress.
- Grammar progress.
- Quiz results.
- Listening accuracy.
- Reading accuracy.
- Weekly and monthly activity.

## 20. UI/UX Requirements

Design direction: Modern educational SaaS with Japanese-inspired visual elements.

- Primary colors: Indigo and purple.
- Secondary colors: Soft green.
- Background: Warm off-white.
- Cards: Rounded corners.
- Fonts: Inter and Noto Sans JP.
- Icons: Lucide.
- Responsive desktop sidebar.
- Mobile bottom navigation.
- Light and dark themes.
- Accessible keyboard navigation.
- Subtle animations.
- Clear loading, error and empty states.

## 21. Frontend Architecture

Recommended structure:

```text
src/
├── app/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── dashboard/
│   ├── lessons/
│   ├── vocabulary/
│   ├── grammar/
│   ├── kanji/
│   ├── listening/
│   ├── speaking/
│   └── quiz/
├── pages/
├── data/
│   ├── curriculum/
│   ├── lessons.js
│   ├── vocabulary.js
│   ├── grammar.js
│   ├── kanji.js
│   ├── hiragana.js
│   ├── katakana.js
│   └── quizzes.js
├── hooks/
├── context/
├── services/
├── utils/
├── constants/
├── lib/
└── styles/
```

Create reusable components such as LessonLayout, LessonHeader, VocabularyCard, Flashcard, GrammarExplanation, KanaGrid, KanjiCard, AudioPlayer, QuestionRenderer and QuizResult.

## 22. Data Models

### Lesson

- id
- level
- moduleId
- title
- titleJa
- order
- duration
- sections
- exercises
- prerequisites

### Vocabulary

- id
- japanese
- hiragana
- kanji
- romaji
- meaningBn
- meaningEn
- audio
- examples
- level
- category

### Grammar

- id
- level
- pattern
- explanationBn
- explanationEn
- formation
- examples
- exercises

### Kanji

- id
- character
- meaningBn
- meaningEn
- onyomi
- kunyomi
- strokeCount
- vocabulary
- examples

### User Progress

- currentLevel
- completedLessons
- vocabularyProgress
- kanjiProgress
- quizAttempts
- studySessions
- dailyActivity
- streak
- bookmarks

## 23. Local Persistence

Use localStorage initially.

Storage keys:

- `nihongo_user_profile`
- `nihongo_user_preferences`
- `nihongo_learning_progress`
- `nihongo_vocabulary_reviews`
- `nihongo_kanji_progress`
- `nihongo_quiz_history`
- `nihongo_study_sessions`
- `nihongo_daily_activity`
- `nihongo_bookmarks`
- `nihongo_schedule`

Requirements:

- Auto-save.
- Restore after refresh.
- Versioned data.
- Export JSON.
- Import JSON.
- Reset with confirmation.
- Prevent duplicate completion records.

## 24. Functional Priorities

### Must Have
- Dashboard.
- Roadmap.
- Kana learning.
- Lesson player.
- Vocabulary.
- Grammar.
- Quizzes.
- Local progress.
- Flashcards.
- Kanji.

### Should Have
- Listening.
- Speaking recorder.
- Reading.
- JLPT tests.
- Analytics.
- Study planner.
- Import/export.

### Future
- AI Japanese tutor.
- Speech assessment.
- Backend.
- Authentication.
- Cloud synchronization.
- Multi-user support.
- Mobile application.

## 25. Development Phases

1. Project setup and design system.
2. Landing page and dashboard.
3. Onboarding and learning roadmap.
4. Hiragana and Katakana modules.
5. Lesson engine.
6. Vocabulary and grammar systems.
7. Flashcards and spaced repetition.
8. Kanji learning.
9. Listening and speaking.
10. Reading and JLPT examinations.
11. Analytics and study planner.
12. Testing and deployment.

## 26. Acceptance Criteria

The first release must satisfy:

- Learners can start from zero.
- Kana practice works.
- N5 roadmap is navigable.
- Lessons support all three languages.
- Vocabulary can be saved and revised.
- Grammar exercises work.
- Kanji information is available.
- Audio playback works.
- Recording works on supported browsers.
- Quiz results are calculated correctly.
- Progress survives browser refresh.
- Analytics reflect real activity.
- Mobile and desktop layouts work.
- No dead buttons or fake functionality.

## 27. Final Product Vision

Nihongo Journey should become a complete Japanese learning companion.

The initial focus is a reliable frontend-only N5 learning experience. After validating the application, expand it into a full learning platform with N4, N3, AI tutoring, speech assessment, cloud synchronization and multiple learner profiles.

**Core principle: Learn Japanese step by step, practice every day, track progress and prepare for real-life communication in Japan.**
