'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Activity, Award, BookOpen, CalendarDays, Clock3, Layers } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { N5_KANJI, N5_VOCABULARY } from '@/content/levels/n5';
import { isVocabularyMastered, normalizeVocabularyReviewStore } from '@/lib/study';
import { STORAGE_KEYS } from '@/lib/storage';

interface ProgressSnapshot {
  history: Record<string, number>;
  streak: number;
  completedLessons: number;
  masteredVocabulary: number;
  masteredKanji: number;
  examAttempts: number;
  quizAttempts: number;
}

interface ActivityDay {
  key: string;
  label: string;
  minutes: number;
}

const EMPTY_SNAPSHOT: ProgressSnapshot = {
  history: {},
  streak: 0,
  completedLessons: 0,
  masteredVocabulary: 0,
  masteredKanji: 0,
  examAttempts: 0,
  quizAttempts: 0,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readStoredJson(key: string): unknown {
  const raw = window.localStorage.getItem(key);
  return raw === null ? null : JSON.parse(raw);
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function buildRecentDays(history: Record<string, number>, count: number): ActivityDay[] {
  const today = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (count - index - 1));
    const key = dateKey(date);
    return {
      key,
      label: date.toLocaleDateString('en', { weekday: 'short' }),
      minutes: history[key] ?? 0,
    };
  });
}

function minutesColor(minutes: number): string {
  if (minutes <= 0) return 'bg-slate-100 dark:bg-slate-800';
  if (minutes < 15) return 'bg-emerald-200 dark:bg-emerald-900';
  if (minutes < 30) return 'bg-emerald-400 dark:bg-emerald-700';
  return 'bg-emerald-600 dark:bg-emerald-500';
}

export default function ProgressPage() {
  const { isMounted, preferences } = useApp();
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(EMPTY_SNAPSHOT);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isMounted) return;
    try {
      const rawActivity = readStoredJson(STORAGE_KEYS.DAILY_ACTIVITY);
      const rawProgress = readStoredJson(STORAGE_KEYS.PROGRESS);
      const rawKanji = readStoredJson(STORAGE_KEYS.KANJI_PROGRESS);
      const rawExams = readStoredJson(STORAGE_KEYS.QUIZ_HISTORY);
      const rawReviews = readStoredJson(STORAGE_KEYS.VOCAB_REVIEWS);

      if (rawActivity !== null && !isRecord(rawActivity)) throw new Error('Saved study activity is invalid.');
      if (rawProgress !== null && !isRecord(rawProgress)) throw new Error('Saved lesson progress is invalid.');
      if (rawKanji !== null && (!Array.isArray(rawKanji) || rawKanji.some((item) => typeof item !== 'string'))) {
        throw new Error('Saved kanji progress is invalid.');
      }
      if (rawExams !== null && (!Array.isArray(rawExams) || rawExams.some((attempt) => !isRecord(attempt)))) {
        throw new Error('Saved exam history is invalid.');
      }
      if (rawReviews !== null && !isRecord(rawReviews)) throw new Error('Saved vocabulary reviews are invalid.');
      const activity = isRecord(rawActivity) ? rawActivity : {};
      if (activity.history !== undefined && !isRecord(activity.history)) throw new Error('Saved study history is invalid.');
      const historySource = isRecord(activity.history) ? activity.history : {};
      const history: Record<string, number> = {};
      for (const [key, value] of Object.entries(historySource)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
          throw new Error('Saved study history contains an invalid date or duration.');
        }
        history[key] = value;
      }
      const progress = isRecord(rawProgress) ? rawProgress : {};
      if (progress.completedLessons !== undefined && (
        !Array.isArray(progress.completedLessons)
        || progress.completedLessons.some((item) => typeof item !== 'number' || !Number.isInteger(item))
      )) {
        throw new Error('Saved completed lesson list is invalid.');
      }
      const completedLessons = Array.isArray(progress.completedLessons) ? new Set(progress.completedLessons).size : 0;
      const masteredKanjiIds = Array.isArray(rawKanji)
        ? new Set(rawKanji.filter((item): item is string => typeof item === 'string'))
        : new Set<string>();
      const reviews = normalizeVocabularyReviewStore(rawReviews ?? {});
      if (isRecord(rawReviews) && Object.keys(reviews).length !== Object.keys(rawReviews).length) {
        throw new Error('Saved vocabulary review history contains invalid entries.');
      }
      const allAttempts = Array.isArray(rawExams) ? rawExams.filter(isRecord) : [];
      const quizAttempts = allAttempts.filter((attempt) => attempt.kind === 'quiz').length;
      const examAttempts = allAttempts.length - quizAttempts;

      setSnapshot({
        history,
        streak: typeof activity.currentStreak === 'number' && Number.isFinite(activity.currentStreak)
          ? Math.max(0, Math.floor(activity.currentStreak))
          : 0,
        completedLessons,
        masteredVocabulary: N5_VOCABULARY.filter((entry) => reviews[entry.id] && isVocabularyMastered(reviews[entry.id])).length,
        masteredKanji: N5_KANJI.filter((entry) => masteredKanjiIds.has(entry.character)).length,
        examAttempts,
        quizAttempts,
      });
    } catch (loadError) {
      console.error('Unable to load progress analytics:', loadError);
      setError('Saved progress could not be loaded. Try refreshing the page.');
    } finally {
      setIsLoaded(true);
    }
  }, [isMounted]);

  const week = useMemo(() => buildRecentDays(snapshot.history, 7), [snapshot.history]);
  const month = useMemo(() => buildRecentDays(snapshot.history, 28), [snapshot.history]);
  const maxMinutes = Math.max(preferences.dailyTargetMinutes, 1, ...week.map((day) => day.minutes));
  const chartPoints = week.map((day, index) => {
    const x = 28 + index * 64;
    const y = 124 - (day.minutes / maxMinutes) * 92;
    return `${x},${y}`;
  }).join(' ');
  const totalVocabulary = N5_VOCABULARY.length;
  const vocabularyPercent = totalVocabulary
    ? Math.min(100, Math.round((snapshot.masteredVocabulary / totalVocabulary) * 100))
    : 0;
  const studiedDays = Object.values(snapshot.history).filter((minutes) => minutes > 0).length;
  const hasActivity = studiedDays > 0
    || snapshot.completedLessons > 0
    || snapshot.examAttempts > 0
    || snapshot.quizAttempts > 0
    || snapshot.masteredVocabulary > 0
    || snapshot.masteredKanji > 0;

  if (!isMounted || !isLoaded) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse space-y-5 px-4 py-8 sm:px-6">
        <div className="h-24 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid gap-4 sm:grid-cols-3"><div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" /><div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" /><div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" /></div>
        <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75"><Activity className="h-4 w-4" />Your saved learning activity</div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Progress analytics</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">Charts use data saved in this browser; no activity is invented for empty days.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Current streak', value: `${snapshot.streak} days`, icon: CalendarDays },
          { label: 'Lessons completed', value: `${snapshot.completedLessons} / 25`, icon: BookOpen },
          { label: 'Vocabulary mastered', value: `${snapshot.masteredVocabulary} / ${totalVocabulary}`, icon: Layers },
          { label: 'Exams / quizzes', value: `${snapshot.examAttempts} / ${snapshot.quizAttempts}`, icon: Award },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                {metric.label}<Icon className="h-4 w-4 text-brand-600" />
              </div>
              <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{metric.value}</p>
            </article>
          );
        })}
      </section>

      {!error && !hasActivity && (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900">
          <Clock3 className="mx-auto h-8 w-8 text-slate-400" />
          <h2 className="mt-3 font-bold text-slate-800 dark:text-slate-100">No saved study activity yet</h2>
          <p className="mt-1 text-sm text-slate-500">Complete a lesson, review vocabulary, or take the N5 practice exam to start your charts.</p>
          <Link href="/learn" className="mt-4 inline-flex min-h-10 items-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">Go to lessons</Link>
        </section>
      )}

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Study time · last 7 days</h2>
              <p className="text-xs text-slate-500">Minutes recorded in your local activity history</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200">Target {preferences.dailyTargetMinutes} min/day</span>
          </div>
          {week.some((day) => day.minutes > 0) ? (
            <div className="mt-5">
              <svg viewBox="0 0 440 150" role="img" aria-label="Line chart of study minutes over the last seven days" className="h-44 w-full overflow-visible">
                {[0, 1, 2, 3].map((line) => {
                  const y = 124 - line * 30;
                  return <line key={line} x1="20" x2="420" y1={y} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeDasharray="4 5" />;
                })}
                <polyline points={chartPoints} fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {week.map((day, index) => {
                  const x = 28 + index * 64;
                  const y = 124 - (day.minutes / maxMinutes) * 92;
                  return (
                    <g key={day.key}>
                      <circle cx={x} cy={y} r="5" fill="#4f46e5" />
                      <text x={x} y="145" textAnchor="middle" className="fill-slate-500 text-[10px]">{day.label}</text>
                      <title>{`${day.key}: ${day.minutes} minutes`}</title>
                    </g>
                  );
                })}
              </svg>
            </div>
          ) : (
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-950/50">Your seven-day chart will appear after study time is saved.</p>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">N5 vocabulary mastery</h2>
          <p className="mt-1 text-xs text-slate-500">Based on saved spaced-repetition reviews</p>
          <div className="mt-5 flex items-center gap-4">
            <div
              role="img"
              aria-label={`${vocabularyPercent}% of N5 vocabulary mastered`}
              className="grid h-28 w-28 shrink-0 place-items-center rounded-full"
              style={{ background: `conic-gradient(#4f46e5 ${vocabularyPercent}%, #e2e8f0 ${vocabularyPercent}% 100%)` }}
            >
              <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center dark:bg-slate-900">
                <span className="text-xl font-black text-slate-900 dark:text-white">{vocabularyPercent}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{snapshot.masteredVocabulary} mastered</p>
              <p className="mt-1 text-xs text-slate-500">{totalVocabulary - snapshot.masteredVocabulary} still to review</p>
              <Link href="/vocabulary" className="mt-3 inline-block text-xs font-bold text-brand-700 underline-offset-2 hover:underline dark:text-brand-300">Review vocabulary</Link>
            </div>
          </div>
          <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
            {snapshot.masteredKanji} of {N5_KANJI.length} N5 kanji marked mastered.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Study consistency · last 28 days</h2>
            <p className="text-xs text-slate-500">Each square reflects saved minutes for that date.</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{studiedDays} active days recorded</span>
        </div>
        {studiedDays ? (
          <div className="mt-5 grid grid-cols-7 gap-2" role="img" aria-label="Calendar heatmap of saved study activity">
            {month.map((day) => (
              <div key={day.key} title={`${day.key}: ${day.minutes} min`} className={`aspect-square rounded-md ${minutesColor(day.minutes)}`} />
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-950/50">Your activity calendar is empty until a study session is recorded.</p>
        )}
      </section>

      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">{error}</p>}
    </div>
  );
}
