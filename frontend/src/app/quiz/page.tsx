'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ClipboardCheck, History, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getLessonDetail, LESSONS_CURRICULUM, N5_VOCABULARY } from '@/content/levels/n5';
import { STORAGE_KEYS } from '@/lib/storage';

type QuizSource = 'lessons' | 'vocabulary' | 'mixed';

interface PoolQuestion {
  id: string;
  lesson: number | null;
  prompt: string;
  promptJa: string;
  choices: string[];
  answerIndex: number;
  explanationEn: string;
  explanationBn: string;
}

interface QuizAttempt {
  id: string;
  kind: 'quiz';
  completedAt: string;
  source: QuizSource;
  lessonFrom: number;
  lessonTo: number;
  correct: number;
  total: number;
}

const PASS_RATE = 0.7;

function localDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildLessonPool(from: number, to: number): PoolQuestion[] {
  const pool: PoolQuestion[] = [];
  for (let lesson = from; lesson <= to; lesson += 1) {
    const detail = getLessonDetail(lesson);
    if (!detail) continue;
    detail.quizQuestions.forEach((q) => {
      pool.push({
        id: q.id,
        lesson,
        prompt: q.questionEn,
        promptJa: q.questionJa,
        choices: q.choices.map((c) => c.text),
        answerIndex: q.choices.findIndex((c) => c.id === q.correctId),
        explanationEn: q.explanationEn,
        explanationBn: q.explanationBn,
      });
    });
    detail.exercises.forEach((ex) => {
      if (ex.type !== 'mcq') return;
      pool.push({
        id: ex.id,
        lesson,
        prompt: ex.questionEn,
        promptJa: ex.questionJa,
        choices: ex.choices.map((c) => c.text),
        answerIndex: ex.choices.findIndex((c) => c.id === ex.correctId),
        explanationEn: ex.explanationEn,
        explanationBn: ex.explanationBn,
      });
    });
  }
  return pool;
}

function buildVocabularyPool(): PoolQuestion[] {
  return N5_VOCABULARY.map((word) => {
    const distractors = shuffle(N5_VOCABULARY.filter((other) => other.meaningEn !== word.meaningEn))
      .slice(0, 3)
      .map((other) => other.meaningEn);
    const choices = shuffle([word.meaningEn, ...distractors]);
    return {
      id: `vocab-${word.id}`,
      lesson: null,
      prompt: `What does 「${word.japanese}」 (${word.romaji}) mean?`,
      promptJa: `「${word.japanese}」の意味は？`,
      choices,
      answerIndex: choices.indexOf(word.meaningEn),
      explanationEn: `${word.japanese} (${word.reading}) = ${word.meaningEn}. Example: ${word.exampleJa} — ${word.exampleEn}`,
      explanationBn: `${word.japanese} = ${word.meaningBn}। উদাহরণ: ${word.exampleJa} — ${word.exampleBn}`,
    };
  });
}

function readAttempts(): QuizAttempt[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is QuizAttempt => typeof item === 'object' && item !== null && (item as QuizAttempt).kind === 'quiz');
  } catch {
    return [];
  }
}

function saveAttempt(attempt: QuizAttempt, minutes: number): string | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    const history: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(history)) throw new Error('Saved quiz history is not a list.');
    if (history.some((item) => typeof item === 'object' && item !== null && (item as { id?: string }).id === attempt.id)) return null;
    window.localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify([...history, attempt]));

    const activityRaw = window.localStorage.getItem(STORAGE_KEYS.DAILY_ACTIVITY);
    const activity = activityRaw ? JSON.parse(activityRaw) : {};
    const today = new Date();
    const todayKey = localDateKey(today);
    const yesterdayKey = localDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
    const historyMap: Record<string, number> = activity && typeof activity.history === 'object' && activity.history ? activity.history : {};
    const streak = typeof activity?.currentStreak === 'number' ? activity.currentStreak : 0;
    const nextStreak = activity?.lastActiveDate === todayKey ? streak : activity?.lastActiveDate === yesterdayKey ? streak + 1 : 1;
    historyMap[todayKey] = (historyMap[todayKey] ?? 0) + minutes;
    window.localStorage.setItem(STORAGE_KEYS.DAILY_ACTIVITY, JSON.stringify({ currentStreak: nextStreak, lastActiveDate: todayKey, history: historyMap }));
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : 'The quiz result could not be saved.';
  }
}

export default function QuizPage() {
  const { isMounted, preferences, playSpeech } = useApp();
  const [source, setSource] = useState<QuizSource>('mixed');
  const [lessonFrom, setLessonFrom] = useState(1);
  const [lessonTo, setLessonTo] = useState(5);
  const [length, setLength] = useState(10);
  const [questions, setQuestions] = useState<PoolQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    if (isMounted) setAttempts(readAttempts());
  }, [isMounted]);

  const showEnglish = preferences.languageMode === 'en' || preferences.languageMode === 'all';
  const showBangla = preferences.languageMode === 'bn' || preferences.languageMode === 'all';

  const poolSize = useMemo(() => {
    const lessonCount = buildLessonPool(lessonFrom, lessonTo).length;
    if (source === 'lessons') return lessonCount;
    if (source === 'vocabulary') return N5_VOCABULARY.length;
    return lessonCount + N5_VOCABULARY.length;
  }, [source, lessonFrom, lessonTo]);

  function startQuiz() {
    const lessonPool = source === 'vocabulary' ? [] : buildLessonPool(lessonFrom, lessonTo);
    const vocabPool = source === 'lessons' ? [] : buildVocabularyPool();
    const picked = shuffle([...lessonPool, ...vocabPool]).slice(0, length);
    setQuestions(picked);
    setCurrent(0);
    setAnswers({});
    setFinished(false);
    setSaveError('');
    setStartedAt(Date.now());
  }

  function finishQuiz() {
    const correct = questions.filter((q) => answers[q.id] === q.answerIndex).length;
    const minutes = Math.max(1, Math.round((Date.now() - (startedAt ?? Date.now())) / 60000));
    const attempt: QuizAttempt = {
      id: `quiz-${startedAt ?? Date.now()}`,
      kind: 'quiz',
      completedAt: new Date().toISOString(),
      source,
      lessonFrom,
      lessonTo,
      correct,
      total: questions.length,
    };
    const error = saveAttempt(attempt, minutes);
    if (error) setSaveError(error);
    setAttempts(readAttempts());
    setFinished(true);
  }

  const question = questions[current];
  const selected = question ? answers[question.id] : undefined;
  const correctCount = questions.filter((q) => answers[q.id] === q.answerIndex).length;
  const percent = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const inProgress = questions.length > 0 && !finished;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-brand-700 via-indigo-700 to-violet-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <ClipboardCheck className="h-4 w-4" />
          Quiz Center · クイズ
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Test what you have learned</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Build a quiz from lesson grammar, vocabulary, or both. Every answer is explained, and your scores are saved to your progress.
        </p>
      </header>

      {!inProgress && !finished && (
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Set up your quiz</h2>
          <div className="grid gap-2 sm:grid-cols-3">
            {([
              ['mixed', 'Mixed', 'Lessons + vocabulary'],
              ['lessons', 'Lesson grammar', 'Questions from lessons'],
              ['vocabulary', 'Vocabulary', 'Word meanings'],
            ] as const).map(([value, label, hint]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSource(value)}
                className={`rounded-xl border p-3 text-left transition ${source === value ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200 dark:bg-brand-900/30' : 'border-slate-200 hover:border-brand-300 dark:border-slate-700'}`}
              >
                <span className="block text-sm font-bold text-slate-900 dark:text-white">{label}</span>
                <span className="text-xs text-slate-500">{hint}</span>
              </button>
            ))}
          </div>

          {source !== 'vocabulary' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold text-slate-500">
                From lesson
                <select
                  value={lessonFrom}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setLessonFrom(value);
                    if (value > lessonTo) setLessonTo(value);
                  }}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {LESSONS_CURRICULUM.map((l) => <option key={l.lessonNumber} value={l.lessonNumber}>Lesson {l.lessonNumber}</option>)}
                </select>
              </label>
              <label className="text-xs font-semibold text-slate-500">
                To lesson
                <select
                  value={lessonTo}
                  onChange={(e) => setLessonTo(Number(e.target.value))}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {LESSONS_CURRICULUM.filter((l) => l.lessonNumber >= lessonFrom).map((l) => <option key={l.lessonNumber} value={l.lessonNumber}>Lesson {l.lessonNumber}</option>)}
                </select>
              </label>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-slate-500">Number of questions</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[5, 10, 20].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setLength(n)}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${length === n ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">{poolSize} questions available for this selection.</p>
          </div>

          <button
            type="button"
            onClick={startQuiz}
            disabled={poolSize === 0}
            className="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Start quiz ({Math.min(length, poolSize)} questions)
          </button>
        </section>
      )}

      {inProgress && question && (
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Question {current + 1} / {questions.length}{question.lesson ? ` · Lesson ${question.lesson}` : ' · Vocabulary'}</span>
            <span>{correctCount} correct</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full bg-brand-600 transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
          <div>
            <button
              type="button"
              onClick={() => playSpeech(question.promptJa)}
              className="text-left text-xl font-bold text-slate-900 hover:text-brand-600 dark:text-white"
              title="Play audio"
            >
              {question.promptJa}
            </button>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{question.prompt}</p>
          </div>
          <div className="grid gap-2">
            {question.choices.map((choice, index) => {
              const answered = selected !== undefined;
              const isCorrect = index === question.answerIndex;
              const isPicked = index === selected;
              const tone = !answered
                ? 'border-slate-200 hover:border-brand-400 hover:bg-brand-50 dark:border-slate-700 dark:hover:bg-slate-800'
                : isCorrect
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                  : isPicked
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30'
                    : 'border-slate-200 opacity-60 dark:border-slate-700';
              return (
                <button
                  key={`${question.id}-${index}`}
                  type="button"
                  disabled={answered}
                  onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: index }))}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium text-slate-800 transition dark:text-slate-100 ${tone}`}
                >
                  <span>{choice}</span>
                  {answered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  {answered && isPicked && !isCorrect && <XCircle className="h-5 w-5 text-rose-600" />}
                </button>
              );
            })}
          </div>
          {selected !== undefined && (
            <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
              <p className={`font-bold ${selected === question.answerIndex ? 'text-emerald-600' : 'text-rose-600'}`}>
                {selected === question.answerIndex ? 'Correct! 正解！' : 'Not quite.'}
              </p>
              {showEnglish && <p className="mt-1 text-slate-700 dark:text-slate-200">{question.explanationEn}</p>}
              {showBangla && <p className="mt-1 text-slate-700 dark:text-slate-200">{question.explanationBn}</p>}
            </div>
          )}
          <div className="flex justify-end">
            {current < questions.length - 1 ? (
              <button
                type="button"
                disabled={selected === undefined}
                onClick={() => setCurrent((c) => c + 1)}
                className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-50"
              >
                Next question
              </button>
            ) : (
              <button
                type="button"
                disabled={selected === undefined}
                onClick={finishQuiz}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                Finish quiz
              </button>
            )}
          </div>
        </section>
      )}

      {finished && (
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-2 text-center">
            <Trophy className={`h-10 w-10 ${percent >= PASS_RATE * 100 ? 'text-amber-500' : 'text-slate-400'}`} />
            <p className="text-4xl font-black text-slate-900 dark:text-white">{percent}%</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {correctCount} of {questions.length} correct · {percent >= PASS_RATE * 100 ? 'Passed — great work! 合格！' : 'Below 70% — review and try again.'}
            </p>
            {saveError && <p className="text-xs text-rose-600">Result not saved: {saveError}</p>}
          </div>
          {questions.some((q) => answers[q.id] !== q.answerIndex) && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Review your mistakes</h3>
              <ul className="mt-2 space-y-2">
                {questions.filter((q) => answers[q.id] !== q.answerIndex).map((q) => (
                  <li key={q.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
                    <p className="font-semibold text-slate-900 dark:text-white">{q.promptJa}</p>
                    <p className="text-emerald-700 dark:text-emerald-400">Answer: {q.choices[q.answerIndex]}</p>
                    {showEnglish && <p className="text-slate-600 dark:text-slate-300">{q.explanationEn}</p>}
                    {showBangla && <p className="text-slate-600 dark:text-slate-300">{q.explanationBn}</p>}
                    {q.lesson && (
                      <Link href={`/lessons/${q.lesson}`} className="mt-1 inline-block text-xs font-semibold text-brand-600 hover:underline">
                        Revisit lesson {q.lesson} →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={startQuiz} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
              <RotateCcw className="h-4 w-4" /> New quiz, same settings
            </button>
            <button type="button" onClick={() => { setQuestions([]); setFinished(false); }} className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
              Change settings
            </button>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <History className="h-5 w-5" /> Recent quizzes
        </h2>
        {attempts.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No quizzes yet. Your results will appear here.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
            {[...attempts].reverse().slice(0, 8).map((a) => {
              const pct = a.total ? Math.round((a.correct / a.total) * 100) : 0;
              return (
                <li key={a.id} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-slate-700 dark:text-slate-200">
                    {new Date(a.completedAt).toLocaleDateString()} · {a.source === 'vocabulary' ? 'Vocabulary' : `Lessons ${a.lessonFrom}–${a.lessonTo}${a.source === 'mixed' ? ' + vocab' : ''}`}
                  </span>
                  <span className={`font-bold ${pct >= PASS_RATE * 100 ? 'text-emerald-600' : 'text-rose-600'}`}>{a.correct}/{a.total} ({pct}%)</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
