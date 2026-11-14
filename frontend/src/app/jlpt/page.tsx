'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Flag, Headphones, RotateCcw, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ExamSectionId, JLPTExamQuestion } from '@/content/shared/types';
import { N5_EXAM_DURATION_SECONDS, N5_EXAM_QUESTIONS } from '@/content/levels/n5';
import { STORAGE_KEYS } from '@/lib/storage';

const SECTIONS: Array<{ id: ExamSectionId; title: string; shortTitle: string }> = [
  { id: 'language-knowledge', title: 'Language Knowledge · Vocabulary & Kanji', shortTitle: 'Vocabulary / Kanji' },
  { id: 'grammar-reading', title: 'Grammar & Reading', shortTitle: 'Grammar / Reading' },
  { id: 'listening', title: 'Listening', shortTitle: 'Listening' },
];

interface SectionScore {
  correct: number;
  total: number;
}

interface ExamAttempt {
  id: string;
  completedAt: string;
  durationSeconds: number;
  correct: number;
  total: number;
  sections: Record<ExamSectionId, SectionScore>;
}

interface StoredActivity {
  currentStreak: number;
  lastActiveDate: string;
  history: Record<string, number>;
}

const EMPTY_ACTIVITY: StoredActivity = { currentStreak: 0, lastActiveDate: '', history: {} };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function localDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

function calculateSections(answers: Record<string, number>) {
  return SECTIONS.reduce<Record<ExamSectionId, SectionScore>>((scores, section) => {
    const questions = N5_EXAM_QUESTIONS.filter((question) => question.section === section.id);
    scores[section.id] = {
      correct: questions.filter((question) => answers[question.id] === question.answerIndex).length,
      total: questions.length,
    };
    return scores;
  }, {
    'language-knowledge': { correct: 0, total: 0 },
    'grammar-reading': { correct: 0, total: 0 },
    listening: { correct: 0, total: 0 },
  });
}

function storeAttempt(attempt: ExamAttempt, studyMinutes: number) {
  const keys = [STORAGE_KEYS.QUIZ_HISTORY, STORAGE_KEYS.DAILY_ACTIVITY];
  const previous = new Map<string, string | null>();
  try {
    keys.forEach((key) => previous.set(key, window.localStorage.getItem(key)));
  } catch (readError) {
    console.error('Unable to read existing exam history before saving.', readError);
    return 'Existing exam history could not be read, so this result was not saved.';
  }

  try {
    const oldHistoryRaw = previous.get(STORAGE_KEYS.QUIZ_HISTORY);
    const oldHistory: unknown = oldHistoryRaw ? JSON.parse(oldHistoryRaw) : [];
    if (!Array.isArray(oldHistory)) throw new Error('Saved exam history is not a list.');

    const activityRaw = previous.get(STORAGE_KEYS.DAILY_ACTIVITY);
    const activityValue: unknown = activityRaw ? JSON.parse(activityRaw) : EMPTY_ACTIVITY;
    if (!isRecord(activityValue)) throw new Error('Saved study activity is invalid.');
    if (activityValue.history !== undefined && !isRecord(activityValue.history)) {
      throw new Error('Saved study activity history is invalid.');
    }
    const existingHistory = isRecord(activityValue.history) ? activityValue.history : {};
    const history: Record<string, number> = {};
    for (const [key, value] of Object.entries(existingHistory)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
        throw new Error('Saved study activity contains an invalid day or duration.');
      }
      history[key] = value;
    }

    const today = new Date();
    const todayKey = localDateKey(today);
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const lastActiveDate = typeof activityValue.lastActiveDate === 'string' ? activityValue.lastActiveDate : '';
    const currentStreak = typeof activityValue.currentStreak === 'number' && Number.isInteger(activityValue.currentStreak)
      ? Math.max(0, activityValue.currentStreak)
      : 0;
    const nextStreak = lastActiveDate === todayKey
      ? currentStreak
      : lastActiveDate === localDateKey(yesterday)
        ? currentStreak + 1
        : 1;
    history[todayKey] = (history[todayKey] ?? 0) + studyMinutes;

    window.localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify([...oldHistory, attempt]));
    window.localStorage.setItem(STORAGE_KEYS.DAILY_ACTIVITY, JSON.stringify({
      currentStreak: nextStreak,
      lastActiveDate: todayKey,
      history,
    }));
    return null;
  } catch (writeError) {
    const rollbackErrors: unknown[] = [];
    previous.forEach((value, key) => {
      try {
        if (value === null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, value);
      } catch (rollbackError) {
        rollbackErrors.push(rollbackError);
      }
    });
    console.error('Unable to save the exam result and activity record.', { writeError, rollbackErrors });
    return writeError instanceof Error ? writeError.message : 'The exam result could not be saved.';
  }
}

export default function JLPTPage() {
  const { isMounted, playSpeech } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(N5_EXAM_DURATION_SECONDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [saveError, setSaveError] = useState('');
  const savedAttempt = useRef(false);
  const deadline = useRef<number | null>(null);

  const currentQuestion = N5_EXAM_QUESTIONS[currentIndex];
  const sectionScores = useMemo(() => calculateSections(answers), [answers]);
  const correctCount = N5_EXAM_QUESTIONS.filter((question) => answers[question.id] === question.answerIndex).length;
  const answeredCount = Object.keys(answers).length;
  const percent = Math.round((correctCount / N5_EXAM_QUESTIONS.length) * 100);
  const activeSection = SECTIONS.find((section) => section.id === currentQuestion?.section);

  function submitExam() {
    if (isSubmitted) return;
    setIsActive(false);
    setIsSubmitted(true);
  }

  useEffect(() => {
    const endAt = deadline.current;
    if (!isActive || isSubmitted || endAt === null) return;
    const updateRemaining = () => {
      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) {
        setIsActive(false);
        setIsSubmitted(true);
      }
    };
    const timer = window.setInterval(updateRemaining, 250);
    return () => window.clearInterval(timer);
  }, [isActive, isSubmitted]);

  useEffect(() => {
    if (!isSubmitted || savedAttempt.current) return;
    savedAttempt.current = true;
    const sections = calculateSections(answers);
    const elapsedSeconds = Math.max(0, N5_EXAM_DURATION_SECONDS - secondsRemaining);
    const attempt: ExamAttempt = {
      id: `n5-${Date.now()}`,
      completedAt: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
      correct: N5_EXAM_QUESTIONS.filter((question) => answers[question.id] === question.answerIndex).length,
      total: N5_EXAM_QUESTIONS.length,
      sections,
    };
    setSaveError(storeAttempt(attempt, Math.max(0.1, Math.round((elapsedSeconds / 60) * 10) / 10)) ?? '');
  }, [answers, isSubmitted, secondsRemaining]);

  function startExam() {
    savedAttempt.current = false;
    deadline.current = Date.now() + N5_EXAM_DURATION_SECONDS * 1000;
    setAnswers({});
    setFlagged([]);
    setCurrentIndex(0);
    setSecondsRemaining(N5_EXAM_DURATION_SECONDS);
    setSaveError('');
    setIsSubmitted(false);
    setIsActive(true);
  }

  function toggleFlag(questionId: string) {
    setFlagged((current) => current.includes(questionId)
      ? current.filter((id) => id !== questionId)
      : [...current, questionId]);
  }

  function moveToSection(sectionId: ExamSectionId) {
    const index = N5_EXAM_QUESTIONS.findIndex((question) => question.section === sectionId);
    if (index >= 0) setCurrentIndex(index);
  }

  if (!isMounted) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse space-y-5 px-4 py-8 sm:px-6">
        <div className="h-24 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (!isActive && !isSubmitted) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 p-6 text-white shadow-xl sm:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/75"><AwardIcon />JLPT N5 practice center</div>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Ready for a quick mock?</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Practice vocabulary, kanji, grammar, reading, and listening in one timed set.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {SECTIONS.map((section) => {
            const count = N5_EXAM_QUESTIONS.filter((question) => question.section === section.id).length;
            return (
              <article key={section.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="font-bold text-slate-900 dark:text-white">{section.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{count} original practice questions</p>
              </article>
            );
          })}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">18-minute N5 practice set</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {N5_EXAM_QUESTIONS.length} questions across the three exam areas. Unanswered questions are scored as incorrect; you can flag items and return before submitting.
          </p>
          <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            This original practice set uses a 60% learning benchmark. It is not an official JLPT exam or scaled-score prediction.
          </p>
          <button
            type="button"
            onClick={startExam}
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-bold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            Start timed practice
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </div>
    );
  }

  if (isSubmitted) {
    const passed = percent >= 60 && SECTIONS.every(({ id }) => {
      const score = sectionScores[id];
      return score.total > 0 && score.correct / score.total >= 0.6;
    });
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className={`rounded-3xl p-6 text-white shadow-xl sm:p-8 ${passed ? 'bg-gradient-to-br from-emerald-700 to-teal-800' : 'bg-gradient-to-br from-indigo-700 to-violet-800'}`}>
          <div className="flex items-center gap-2 text-sm font-semibold text-white/75"><CheckCircle2 className="h-4 w-4" />Practice complete</div>
          <h1 className="mt-3 text-3xl font-black">{passed ? 'Nice work—practice benchmark reached.' : 'Good practice. Review and try again.'}</h1>
          <p className="mt-2 text-sm text-white/80">{correctCount} of {N5_EXAM_QUESTIONS.length} correct · {percent}% · {answeredCount} answered</p>
          <p className="mt-3 text-xs text-white/70">This is an unscaled practice result, not an official JLPT pass prediction.</p>
        </header>

        {saveError && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">Result shown, but not saved: {saveError}</p>}
        {!saveError && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">Result and study time saved to this browser.</p>}

        <section className="grid gap-4 md:grid-cols-3">
          {SECTIONS.map((section) => {
            const result = sectionScores[section.id];
            const sectionPassed = result.total > 0 && result.correct / result.total >= 0.6;
            return (
              <article key={section.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-slate-900 dark:text-white">{section.shortTitle}</h2>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${sectionPassed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200'}`}>
                    {sectionPassed ? 'Benchmark met' : 'Review'}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{result.correct} / {result.total}</p>
                <p className="mt-1 text-xs text-slate-500">Practice benchmark: 60% per section</p>
              </article>
            );
          })}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Answer review</h2>
          {N5_EXAM_QUESTIONS.map((question, index) => {
            const selected = answers[question.id];
            const correct = selected === question.answerIndex;
            return (
              <article key={question.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{index + 1}. {question.promptEn}</p>
                  <span className={`shrink-0 text-xs font-bold ${correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>{correct ? 'Correct' : 'Review'}</span>
                </div>
                <p className="mt-1 font-jp text-sm text-slate-600 dark:text-slate-300">{question.promptJa}</p>
                <p className="mt-2 text-xs text-slate-500">Your answer: {selected === undefined ? 'Not answered' : question.choices[selected]} · Correct: {question.choices[question.answerIndex]}</p>
                <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-950/50 dark:text-slate-300">{question.explanationEn} {question.explanationBn}</p>
              </article>
            );
          })}
        </section>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={startExam} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
            <RotateCcw className="h-4 w-4" />Try again
          </button>
          <Link href="/progress" className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:border-slate-700 dark:text-slate-200">View progress</Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion || !activeSection) return null;
  const isFlagged = flagged.includes(currentQuestion.id);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">{activeSection.shortTitle}</p>
          <h1 className="mt-1 text-xl font-black text-slate-900 dark:text-white">N5 Timed Practice</h1>
        </div>
        <div className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-black ${secondsRemaining <= 60 ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'}`} aria-live="polite">
          <Clock3 className="h-5 w-5" />
          {formatTime(secondsRemaining)}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Question {currentIndex + 1} of {N5_EXAM_QUESTIONS.length}</p>
            <button
              type="button"
              onClick={() => toggleFlag(currentQuestion.id)}
              aria-pressed={isFlagged}
              className={`inline-flex min-h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${isFlagged ? 'border-amber-400 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200' : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'}`}
            >
              <Flag className="h-3.5 w-3.5" />
              {isFlagged ? 'Marked for review' : 'Mark for review'}
            </button>
          </div>
          <h2 className="mt-5 text-lg font-bold leading-relaxed text-slate-900 dark:text-white">{currentQuestion.promptEn}</h2>
          <p className="mt-2 font-jp text-base text-slate-600 dark:text-slate-300">{currentQuestion.promptJa}</p>
          {currentQuestion.readingText && <p className="mt-4 rounded-xl bg-emerald-50 p-4 font-jp text-lg leading-relaxed text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">{currentQuestion.readingText}</p>}
          {currentQuestion.listeningText && (
            <div className="mt-4 rounded-xl bg-sky-50 p-4 dark:bg-sky-950/30">
              <p className="font-jp text-lg text-sky-950 dark:text-sky-100">{currentQuestion.listeningText}</p>
              <button type="button" onClick={() => playSpeech(currentQuestion.listeningText ?? '')} className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-sky-300 px-3 text-xs font-bold text-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 dark:border-sky-800 dark:text-sky-200">
                <Headphones className="h-4 w-4" />Play listening prompt
              </button>
            </div>
          )}

          <fieldset className="mt-6 space-y-3">
            <legend className="sr-only">Choose one answer</legend>
            {currentQuestion.choices.map((choice, index) => {
              const selected = answers[currentQuestion.id] === index;
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setAnswers((current) => ({ ...current, [currentQuestion.id]: index }))}
                  aria-pressed={selected}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${selected ? 'border-brand-500 bg-brand-50 font-semibold text-brand-900 dark:bg-brand-950/40 dark:text-brand-100' : 'border-slate-200 text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:text-slate-200'}`}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-current text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                  {choice}
                </button>
              );
            })}
          </fieldset>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              disabled={currentIndex === 0}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:border-slate-700 dark:text-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />Previous
            </button>
            {currentIndex < N5_EXAM_QUESTIONS.length - 1 ? (
              <button type="button" onClick={() => setCurrentIndex((index) => Math.min(N5_EXAM_QUESTIONS.length - 1, index + 1))} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" onClick={submitExam} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500">
                Submit practice <Send className="h-4 w-4" />
              </button>
            )}
          </div>
        </main>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 dark:text-white">Question palette</h2>
              <span className="text-xs text-slate-500">{answeredCount}/{N5_EXAM_QUESTIONS.length} answered</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {N5_EXAM_QUESTIONS.map((question, index) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Question ${index + 1}${answers[question.id] === undefined ? ', unanswered' : ', answered'}${flagged.includes(question.id) ? ', marked for review' : ''}`}
                  aria-current={currentIndex === index ? 'step' : undefined}
                  className={`relative min-h-10 rounded-lg border text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${currentIndex === index ? 'border-brand-600 bg-brand-600 text-white' : answers[question.id] !== undefined ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200' : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'}`}
                >
                  {index + 1}
                  {flagged.includes(question.id) && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-500" />}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              {SECTIONS.map((section) => (
                <button key={section.id} type="button" onClick={() => moveToSection(section.id)} className="flex min-h-9 w-full items-center justify-between rounded-lg px-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:text-slate-300 dark:hover:bg-slate-800">
                  {section.shortTitle}
                  <span>{sectionScores[section.id].correct}/{sectionScores[section.id].total}</span>
                </button>
              ))}
            </div>
          </section>
          <button type="button" onClick={submitExam} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-300 px-4 text-sm font-semibold text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 dark:border-rose-900 dark:text-rose-300">
            Submit early
          </button>
        </aside>
      </div>
    </div>
  );
}

function AwardIcon() {
  return <span aria-hidden="true" className="text-sm">N5</span>;
}
