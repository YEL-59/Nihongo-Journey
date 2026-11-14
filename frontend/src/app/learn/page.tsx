'use client';

import Link from 'next/link';
import { BookOpen, CheckCircle2, Clock3, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CURRICULUM_PHASES, LESSONS_CURRICULUM } from '@/content/levels/n5';

export default function LearnPage() {
  const { progress } = useApp();
  const completedSet = new Set(progress.completedLessons ?? []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-sakura-600 p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
          <Sparkles className="h-4 w-4" />
          Learning Center
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Minna no Nihongo N5 Path</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
          Study the full beginner curriculum with bilingual guidance, vocabulary practice, listening prompts, and structured lesson checkpoints.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BookOpen className="h-4 w-4 text-brand-600" />
            Lessons available
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900">{LESSONS_CURRICULUM.length}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Completed
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900">{completedSet.size}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="h-4 w-4 text-amber-600" />
            Study time
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900">{LESSONS_CURRICULUM.reduce((total, lesson) => total + lesson.estimatedMinutes, 0)} min</div>
        </div>
      </div>

      <div className="space-y-8">
        {CURRICULUM_PHASES.map((phase) => {
          const lessons = LESSONS_CURRICULUM.filter((lesson) => lesson.phase === phase.phase);

          return (
            <section key={phase.phase} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{phase.lessonRange}</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">{phase.titleEn}</h2>
                  <p className="text-sm text-slate-500">{phase.titleBn}</p>
                </div>
                <p className="max-w-md text-sm text-slate-500">{phase.descriptionEn}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {lessons.map((lesson) => {
                  const isCompleted = completedSet.has(lesson.lessonNumber);
                  const isCurrent = progress.currentLessonId === lesson.lessonNumber;

                  return (
                    <Link
                      href={`/lessons/${lesson.lessonNumber}`}
                      key={lesson.id}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-300 hover:bg-brand-50"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">
                          Lesson {lesson.lessonNumber}
                        </span>
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Done
                          </span>
                        ) : isCurrent ? (
                          <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">Current</span>
                        ) : (
                          <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-600">Ready</span>
                        )}
                      </div>

                      <h3 className="mt-4 text-lg font-black text-slate-900">{lesson.titleEn}</h3>
                      <p className="mt-1 text-sm text-slate-500">{lesson.titleBn}</p>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                        <span>{lesson.estimatedMinutes} min</span>
                        <span>{lesson.vocabularyCount} vocab</span>
                        <span>{lesson.kanjiCount} kanji</span>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
                        {isCompleted ? 'Review lesson' : 'Open lesson'}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
