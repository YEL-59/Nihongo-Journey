'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Map,
  CheckCircle2,
  Lock,
  PlayCircle,
  BookOpen,
  Sparkles,
  Clock,
  Languages,
  Award,
  ChevronRight,
  Filter,
  Check,
  Compass,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LESSONS_CURRICULUM, CURRICULUM_PHASES } from '@/content/levels/n5';
import { LessonCurriculumItem } from '@/content/shared/types';

export default function RoadmapPage() {
  const { progress, preferences } = useApp();
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');

  const currentLessonId = progress.currentLessonId || 1;
  const completedList = progress.completedLessons || [];
  const completedCount = completedList.length;
  const totalLessons = LESSONS_CURRICULUM.length;
  const percentComplete = Math.round((completedCount / totalLessons) * 100);

  const filteredLessons =
    selectedPhase === 'all'
      ? LESSONS_CURRICULUM
      : LESSONS_CURRICULUM.filter((l) => l.phase === selectedPhase);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* 🗺️ Header & Progress Stats Banner */}
      <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold">
              <Map className="w-3.5 h-3.5" />
              <span>Minna no Nihongo I • N5 Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Learning Roadmap <span className="font-jp text-lg text-slate-400 font-normal">(ロードマップ)</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              25 sequential lessons guiding you from absolute Japanese beginner to confident JLPT N5 mastery.
              Each lesson includes grammar, vocabulary, audio, exercises, and quizzes.
            </p>
          </div>

          {/* Quick Action Button */}
          <Link
            href={`/lessons/${currentLessonId}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02] shrink-0"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Continue Lesson {currentLessonId}</span>
          </Link>
        </div>

        {/* Progress Bar & Numerical Metrics */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 gap-2">
            <div className="flex items-center gap-4">
              <span>
                Progress: <strong className="text-brand-600 dark:text-brand-400">{completedCount}</strong> / {totalLessons} Lessons
              </span>
              <span>•</span>
              <span>
                Target: <strong className="text-emerald-600 dark:text-emerald-400">JLPT N5</strong>
              </span>
            </div>
            <span className="font-bold text-brand-600 dark:text-brand-400">{percentComplete}% Complete</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-brand-600 via-sakura-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(percentComplete, 4)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 🌸 Foundation Step: Kana Pre-requisite Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-50/80 via-sakura-50/40 to-emerald-50/40 dark:from-brand-950/40 dark:via-sakura-950/20 dark:to-emerald-950/20 border border-brand-200/80 dark:border-brand-800/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-jp font-bold text-lg shrink-0 shadow-sm">
            あ
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white">
                Prerequisite
              </span>
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                Foundation: Hiragana & Katakana (46 + 46 Kana)
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
              Before beginning Lesson 1, master the two basic phonetic scripts. Practice stroke orders, audio pronunciation, and character identification.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/hiragana"
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-all"
          >
            Hiragana Chart
          </Link>
          <Link
            href="/katakana"
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-all"
          >
            Katakana Chart
          </Link>
        </div>
      </div>

      {/* 🧭 Filter Buttons by Phase */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedPhase('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedPhase === 'all'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          All 25 Lessons
        </button>

        {CURRICULUM_PHASES.map((phase) => (
          <button
            key={phase.phase}
            type="button"
            onClick={() => setSelectedPhase(phase.phase)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedPhase === phase.phase
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Phase {phase.phase} ({phase.lessonRange})
          </button>
        ))}
      </div>

      {/* 📚 Lessons Grid / Timeline Pathway */}
      <div className="space-y-8">
        {CURRICULUM_PHASES.filter(
          (p) => selectedPhase === 'all' || p.phase === selectedPhase
        ).map((phase) => {
          const phaseLessons = LESSONS_CURRICULUM.filter((l) => l.phase === phase.phase);

          return (
            <div key={phase.phase} className="space-y-4">
              {/* Phase Banner */}
              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {phase.titleEn}
                  </h3>
                  <p className="font-bn text-xs text-slate-600 dark:text-slate-400">
                    {phase.titleBn} • {phase.descriptionEn}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-bold text-brand-600 dark:text-brand-400 shrink-0 self-start sm:self-auto border border-slate-200 dark:border-slate-700">
                  {phase.lessonRange}
                </span>
              </div>

              {/* Lesson Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {phaseLessons.map((lesson) => {
                  const isCompleted = completedList.includes(lesson.lessonNumber);
                  const isCurrent = lesson.lessonNumber === currentLessonId;

                  return (
                    <div
                      key={lesson.id}
                      className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                        isCurrent
                          ? 'border-brand-500 bg-white dark:bg-slate-900 shadow-glow ring-2 ring-brand-500/20'
                          : isCompleted
                          ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Top Header Strip */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                              isCurrent
                                ? 'bg-brand-600 text-white'
                                : isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            Lesson {lesson.lessonNumber}
                          </span>

                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lesson.estimatedMinutes}m</span>
                          </div>
                        </div>

                        {/* Title in JP, EN & BN */}
                        <div className="space-y-1">
                          <div className="font-jp font-bold text-sm text-slate-900 dark:text-white">
                            {lesson.titleJa}
                          </div>
                          <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                            {lesson.titleEn}
                          </div>
                          <div className="font-bn text-xs text-slate-500 dark:text-slate-400">
                            {lesson.titleBn}
                          </div>
                        </div>

                        {/* Key Grammar Pills */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Grammar Patterns:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {lesson.grammarPatterns.slice(0, 3).map((pat, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-jp font-medium"
                              >
                                {pat}
                              </span>
                            ))}
                            {lesson.grammarPatterns.length > 3 && (
                              <span className="text-[10px] text-slate-400 self-center">
                                +{lesson.grammarPatterns.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Metrics Badge */}
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          <span>{lesson.vocabularyCount} Vocab</span>
                          <span>•</span>
                          <span>{lesson.kanjiCount} Kanji</span>
                        </div>
                      </div>

                      {/* Action CTA Button */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <Link
                          href={`/lessons/${lesson.lessonNumber}`}
                          className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                            isCurrent
                              ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                              : isCompleted
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-700'
                          }`}
                        >
                          {isCurrent ? (
                            <>
                              <PlayCircle className="w-4 h-4" />
                              <span>Active Lesson (Continue)</span>
                            </>
                          ) : isCompleted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Completed (Review)</span>
                            </>
                          ) : (
                            <>
                              <span>Start Lesson {lesson.lessonNumber}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🏆 Milestone Capstone: JLPT N5 Official Examination Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-torii-600 via-brand-600 to-sakura-600 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            <span>Final Certification Milestone</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Full JLPT N5 Practice Examination Simulator
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl">
            Simulate the exact official examination conditions: Language Knowledge (Vocabulary/Grammar), Reading Comprehension, and Listening drills with real-time scoring.
          </p>
        </div>

        <Link
          href="/jlpt"
          className="px-6 py-3.5 rounded-2xl bg-white text-torii-700 hover:bg-slate-100 font-bold text-xs shadow-lg transition-all hover:scale-105 shrink-0 text-center"
        >
          Open JLPT Exam Center
        </Link>
      </div>
    </div>
  );
}
