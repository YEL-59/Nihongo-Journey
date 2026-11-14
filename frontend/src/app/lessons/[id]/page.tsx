'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Headphones, Languages, Mic, PlayCircle, Sparkles, Target } from 'lucide-react';
import { useMemo, useState } from 'react';
import MultipleChoiceExercise from '@/components/lessons/MultipleChoiceExercise';
import FillBlanksExercise from '@/components/lessons/FillBlanksExercise';
import SentenceOrderExercise from '@/components/lessons/SentenceOrderExercise';
import { useApp } from '@/context/AppContext';
import { getLessonDetail, LESSONS_CURRICULUM } from '@/content/levels/n5';
import { FillBlanksExercise as FillBlanksType, LessonDetail, MCQExercise, SentenceOrderExercise as SentenceOrderType } from '@/content/shared/types';
import { cn } from '@/lib/utils';

const sectionLabels = [
  'Overview',
  'Conversation',
  'English',
  'Bangla',
  'Vocabulary',
  'Grammar',
  'Listening',
  'MCQ',
  'Fill in the blank',
  'Sentence order',
  'Mini quiz',
  'Completion',
];

function createFallbackLessonDetail(lesson: (typeof LESSONS_CURRICULUM)[number]): LessonDetail {
  return {
    lessonId: lesson.lessonNumber,
    objectivesEn: [lesson.grammarExplanationEn],
    objectivesBn: [lesson.grammarExplanationBn],
    dialogue: [],
    grammarNotesEn: lesson.grammarExplanationEn,
    grammarNotesBn: lesson.grammarExplanationBn,
    vocabulary: [],
    listeningTip: 'Listen to the phrase aloud and repeat it several times.',
    speakingPromptEn: 'Repeat the sentence and use the grammar in your own example.',
    speakingPromptBn: 'বাক্যটি উচ্চারণ করে নিজের ভাষায় একই গঠন ব্যবহার করুন।',
    exercises: [],
    quizQuestions: [],
    culturalDeepDiveEn: lesson.culturalNoteEn,
    culturalDeepDiveBn: lesson.culturalNoteBn,
  };
}

export default function LessonPlayerPage() {
  const params = useParams<{ id: string }>();
  const lessonId = Number(params?.id ?? 1) || 1;
  const { preferences, progress, updateProgress, playSpeech } = useApp();
  const [currentSection, setCurrentSection] = useState(0);
  const [showFurigana, setShowFurigana] = useState(false);
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const lesson = LESSONS_CURRICULUM.find((item) => item.lessonNumber === lessonId) ?? LESSONS_CURRICULUM[0];
  const detail = useMemo(() => getLessonDetail(lessonId) ?? createFallbackLessonDetail(lesson), [lesson, lessonId]);

  const challengeIds = useMemo(
    () => [
      ...detail.exercises.map((exercise) => exercise.id),
      ...detail.quizQuestions.map((question) => question.id),
    ],
    [detail],
  );

  const correctCount = challengeIds.filter((id) => exerciseResults[id] === true).length;
  const score = challengeIds.length ? Math.round((correctCount / challengeIds.length) * 100) : 0;
  const nextLessonNumber = lessonId < 25 ? lessonId + 1 : null;

  function handleExerciseResult(id: string, isCorrect: boolean) {
    setExerciseResults((previous) => ({ ...previous, [id]: isCorrect }));
  }

  function handleCompleteLesson() {
    const completedSet = new Set(progress.completedLessons ?? []);
    completedSet.add(lessonId);

    updateProgress({
      currentLessonId: nextLessonNumber ?? lessonId,
      completedLessons: Array.from(completedSet),
      completedSections: {
        ...(progress.completedSections ?? {}),
        [lessonId]: sectionLabels.map((_, index) => String(index + 1)),
      },
    });
    setCompleted(true);
  }

  const showEnglish = preferences.languageMode === 'en' || preferences.languageMode === 'all';
  const showBangla = preferences.languageMode === 'bn' || preferences.languageMode === 'all';
  const mcqExercise = detail.exercises.find((exercise): exercise is MCQExercise => exercise.type === 'mcq');
  const fillExercise = detail.exercises.find((exercise): exercise is FillBlanksType => exercise.type === 'fill');
  const orderExercise = detail.exercises.find((exercise): exercise is SentenceOrderType => exercise.type === 'order');

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-sakura-600 p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
                <Sparkles className="h-4 w-4" />
                Lesson {lesson.lessonNumber} Overview
              </div>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">{lesson.titleJa}</h2>
              <p className="mt-2 text-sm text-white/80 sm:text-base">{lesson.titleEn}</p>
              <p className="mt-2 text-sm text-white/80">{lesson.titleBn}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Phase</div>
                <div className="mt-2 text-lg font-bold text-slate-900">{lesson.phaseTitleEn}</div>
                <div className="text-sm text-slate-500">{lesson.phaseTitleBn}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Duration</div>
                <div className="mt-2 text-lg font-bold text-slate-900">{lesson.estimatedMinutes} min</div>
                <div className="text-sm text-slate-500">Focused lesson flow</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Grammar</div>
                <div className="mt-2 text-lg font-bold text-slate-900">{lesson.grammarPatterns[0]}</div>
                <div className="text-sm text-slate-500">Targeted sentence pattern</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                <Target className="h-4 w-4 text-brand-600" />
                Learning objectives
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {(detail.objectivesEn ?? []).map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-slate-800">{objective}</p>
                      {!!(detail.objectivesBn?.[index]) && (
                        <p className="mt-1 text-sm text-slate-500">{detail.objectivesBn[index]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 2</p>
                <h3 className="text-2xl font-black text-slate-900">Conversation</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFurigana((previous) => !previous)}
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700"
              >
                <Languages className="h-4 w-4" />
                {showFurigana ? 'Hide' : 'Show'} Furigana
              </button>
            </div>
            <div className="space-y-3">
              {detail.dialogue.map((line, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">{line.speaker}</span>
                    {line.romajiLine && <span className="text-xs text-slate-400">{line.romajiLine}</span>}
                  </div>
                  <div className="mt-3">
                    <p className="font-jp text-xl text-slate-900">
                      {showFurigana ? (line.furigana || line.japanese) : line.japanese}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => playSpeech(line.japanese)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                    >
                      <Headphones className="h-3.5 w-3.5" />
                      Listen
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-800">EN:</span> {line.translationEn}</p>
                    <p><span className="font-semibold text-slate-800">BN:</span> {line.translationBn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 3</p>
            <h3 className="text-2xl font-black text-slate-900">English breakdown</h3>
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {detail.grammarNotesEn}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 4</p>
            <h3 className="text-2xl font-black text-slate-900">Bangla explanations</h3>
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {detail.grammarNotesBn}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 5</p>
            <h3 className="text-2xl font-black text-slate-900">Vocabulary deck</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {detail.vocabulary.map((word, index) => (
                <div key={`${word.japanese}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-jp text-lg text-slate-900">{word.japanese}</p>
                      <p className="text-xs text-slate-500">{word.reading} • {word.romajiReading}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => playSpeech(word.japanese)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700"
                    >
                      <Mic className="h-3.5 w-3.5" />
                      Audio
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-600">{word.meaningEn}</span>
                    <span className="text-slate-500">{word.meaningBn}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Example: {word.exampleJa}</p>
                  <p className="text-xs text-slate-500">{word.exampleEn} / {word.exampleBn}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 6</p>
            <h3 className="text-2xl font-black text-slate-900">Grammar breakdown</h3>
            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              {lesson.grammarPatterns.map((pattern, index) => (
                <div key={pattern} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <span className="font-semibold text-brand-700">Pattern {index + 1}:</span> {pattern}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              {showEnglish && <p className="mb-3">{detail.grammarNotesEn}</p>}
              {showBangla && <p>{detail.grammarNotesBn}</p>}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 7</p>
            <h3 className="text-2xl font-black text-slate-900">Listening & speaking</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-700">
                  <Headphones className="h-4 w-4" />
                  Listening tip
                </div>
                <p className="text-sm text-slate-700">{detail.listeningTip}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-700">
                  <Mic className="h-4 w-4" />
                  Speaking prompt
                </div>
                <p className="text-sm text-slate-700">{showEnglish ? detail.speakingPromptEn : detail.speakingPromptBn}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => playSpeech(detail.dialogue[0]?.japanese ?? lesson.titleJa)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <PlayCircle className="h-4 w-4" />
              Play model audio
            </button>
          </div>
        );
      case 7:
        return mcqExercise ? (
          <MultipleChoiceExercise
            exercise={mcqExercise}
            languageMode={preferences.languageMode}
            showRomaji={preferences.showRomaji}
            onAnswer={(correct) => handleExerciseResult(mcqExercise.id, correct)}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">No MCQ available for this lesson yet.</div>
        );
      case 8:
        return fillExercise ? (
          <FillBlanksExercise
            exercise={fillExercise}
            languageMode={preferences.languageMode}
            onAnswer={(correct) => handleExerciseResult(fillExercise.id, correct)}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">No fill-in-the-blank task for this lesson yet.</div>
        );
      case 9:
        return orderExercise ? (
          <SentenceOrderExercise
            exercise={orderExercise}
            languageMode={preferences.languageMode}
            onAnswer={(correct) => handleExerciseResult(orderExercise.id, correct)}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">No sentence ordering task for this lesson yet.</div>
        );
      case 10:
        return (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 11</p>
            <h3 className="text-2xl font-black text-slate-900">Mini quiz</h3>
            <div className="space-y-4">
              {detail.quizQuestions.length ? (
                detail.quizQuestions.map((question, index) => (
                  <div key={question.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                    <p className="text-sm font-semibold text-slate-500">Question {index + 1}</p>
                    <p className="mt-2 text-lg font-medium text-slate-800">{question.questionEn}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {question.choices.map((choice) => (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => handleExerciseResult(question.id, choice.id === question.correctId)}
                          className={cn(
                            'rounded-xl border px-3 py-2 text-left text-sm font-medium transition',
                            exerciseResults[question.id] === true && choice.id === question.correctId
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-300 hover:bg-brand-50',
                          )}
                        >
                          {choice.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
                  Quiz content for this lesson is being prepared. Continue to the completion summary to lock in progress.
                </div>
              )}
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Section 12</p>
            <h3 className="text-2xl font-black text-slate-900">Lesson completion summary</h3>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-brand-50 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Progress snapshot</div>
              <div className="mt-3 text-4xl font-black text-slate-900">{score}%</div>
              <p className="mt-2 text-sm text-slate-600">
                {correctCount} of {challengeIds.length || 1} answers correct.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-800">Cultural note</div>
                <p className="mt-2">{lesson.culturalNoteEn}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-800">বাংলা সংস্কৃতি</div>
                <p className="mt-2">{lesson.culturalNoteBn}</p>
              </div>
            </div>
            {!completed && (
              <button
                type="button"
                onClick={handleCompleteLesson}
                disabled={challengeIds.length ? score < 70 : false}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition',
                  challengeIds.length ? (score >= 70 ? 'bg-brand-600 text-white hover:bg-brand-700' : 'cursor-not-allowed bg-slate-200 text-slate-500') : 'bg-brand-600 text-white hover:bg-brand-700',
                )}
              >
                {challengeIds.length ? (score >= 70 ? 'Complete lesson' : 'Need 70%+ to unlock completion') : 'Complete lesson'}
              </button>
            )}
            {completed && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                Lesson marked complete and saved to your study progress.
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/learn" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-brand-300 hover:bg-brand-50">
            <ChevronLeft className="h-4 w-4" />
            Back to Learning Center
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">Lesson {lesson.lessonNumber}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{score}% accuracy</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{correctCount} correct</span>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Minna no Nihongo N5</p>
            <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{lesson.titleEn}</h1>
            <p className="mt-1 text-sm text-slate-500">{lesson.titleBn}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookOpen className="h-4 w-4 text-brand-600" />
            {lesson.estimatedMinutes} minutes • {lesson.vocabularyCount} vocab • {lesson.kanjiCount} kanji
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
          {sectionLabels.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setCurrentSection(index)}
              className={cn(
                'rounded-xl border px-2 py-2 text-center text-[11px] font-semibold transition',
                currentSection === index
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-200 hover:bg-brand-50',
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {renderSection()}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            disabled={currentSection === 0}
            onClick={() => setCurrentSection((previous) => Math.max(0, previous - 1))}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition',
              currentSection === 0 && 'cursor-not-allowed opacity-50',
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            type="button"
            onClick={() => setCurrentSection((previous) => Math.min(sectionLabels.length - 1, previous + 1))}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            {currentSection === sectionLabels.length - 1 ? 'Review summary' : 'Next section'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          Unlock the next lesson after reaching at least 70% accuracy on the lesson exercises.
        </div>
        {nextLessonNumber && (
          <Link href={`/lessons/${nextLessonNumber}`} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Continue to Lesson {nextLessonNumber}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
