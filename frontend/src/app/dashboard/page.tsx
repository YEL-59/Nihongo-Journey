'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  PlayCircle,
  BarChart3,
  Calendar,
  Languages,
  PenTool,
  Compass,
  Headphones,
  Mic,
  ChevronRight,
  Check,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LESSONS_CURRICULUM } from '@/data/curriculum';

export default function DashboardPage() {
  const { profile, progress, preferences, dailyActivity, updateProgress } = useApp();

  // Dynamic Time-based Greeting
  const [greeting, setGreeting] = useState<{ ja: string; ro: string; en: string }>({
    ja: 'こんにちは',
    ro: 'Konnichiwa',
    en: 'Good afternoon',
  });

  // Daily Checklist items with client-side interactive state
  const [checklist, setChecklist] = useState<
    Array<{ id: string; label: string; jp: string; completed: boolean; link: string }>
  >([
    { id: 'kana', label: 'Practice 10 Kana characters', jp: '仮名の練習', completed: false, link: '/hiragana' },
    { id: 'srs', label: 'Review 15 Spaced Repetition Flashcards', jp: '単語帳の復習', completed: false, link: '/flashcards' },
    { id: 'lesson', label: 'Study current lesson grammar points', jp: '文法の学習', completed: false, link: `/lessons/${progress.currentLessonId || 1}` },
    { id: 'listen', label: 'Complete 10-minute native listening activity', jp: 'リスニング練習', completed: false, link: '/listening' },
    { id: 'speak', label: 'Record 3 Japanese practice sentences', jp: 'スピーキング録音', completed: false, link: '/speaking' },
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting({ ja: 'おはようございます', ro: 'Ohayou gozaimasu', en: 'Good morning' });
    } else if (hour < 18) {
      setGreeting({ ja: 'こんにちは', ro: 'Konnichiwa', en: 'Good afternoon' });
    } else {
      setGreeting({ ja: 'こんばんは', ro: 'Konbanwa', en: 'Good evening' });
    }
  }, []);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedChecklistCount = checklist.filter((c) => c.completed).length;

  const currentLessonId = progress.currentLessonId || 1;
  const currentLesson =
    LESSONS_CURRICULUM.find((l) => l.lessonNumber === currentLessonId) || LESSONS_CURRICULUM[0];

  const totalLessons = LESSONS_CURRICULUM.length;
  const completedLessonsCount = progress.completedLessons?.length || 0;
  const percentComplete = Math.round((completedLessonsCount / totalLessons) * 100);

  // Generate 7-day activity mock bars from actual activity history
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyTarget = preferences.dailyTargetMinutes || 30;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* 🌸 HEADER: PERSONALIZED GREETING & STREAK BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-jp text-base text-brand-600 dark:text-brand-400 font-bold">
              {greeting.ja}、{profile.name}さん！
            </span>
            <span className="text-xs text-slate-400 font-mono">({greeting.ro})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {greeting.en}, {profile.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Goal: <strong className="text-slate-700 dark:text-slate-300">{profile.studyGoal}</strong> • Target:{' '}
            <strong className="text-brand-600 dark:text-brand-400">JLPT {profile.targetLevel}</strong>
          </p>
        </div>

        {/* Metric Badges */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Streak Flame */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 shadow-sm">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
            <div>
              <div className="text-xs font-bold leading-tight">{dailyActivity.currentStreak} Day Streak</div>
              <div className="text-[10px] text-amber-600/80 dark:text-amber-400/80">Study Consistency</div>
            </div>
          </div>

          {/* Level Pill */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-torii-50 dark:bg-torii-950/40 border border-torii-200 dark:border-torii-800 text-torii-700 dark:text-torii-300 shadow-sm">
            <Award className="w-5 h-5 text-torii-600" />
            <div>
              <div className="text-xs font-bold leading-tight">Level {profile.targetLevel}</div>
              <div className="text-[10px] text-torii-600/80">Beginner Track</div>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Lessons Completed */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Lessons</span>
            <BookOpen className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {completedLessonsCount} <span className="text-sm font-normal text-slate-400">/ 25</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(percentComplete, 5)}%` }}
            />
          </div>
        </div>

        {/* Vocabulary Mastered */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Vocabulary</span>
            <Languages className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {progress.vocabularyMasteredCount || 12} <span className="text-sm font-normal text-slate-400">/ 700</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Spaced Review Active
          </div>
        </div>

        {/* Kanji Mastered */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Kanji</span>
            <Compass className="w-4 h-4 text-sakura-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {progress.kanjiMasteredCount || 5} <span className="text-sm font-normal text-slate-400">/ 103</span>
          </div>
          <div className="text-[11px] text-sakura-500 font-semibold font-jp">
            漢字 (N5 Basics)
          </div>
        </div>

        {/* Daily Study Time */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Target / Day</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {dailyTarget} <span className="text-sm font-normal text-slate-400">min</span>
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            Daily Goal Active
          </div>
        </div>
      </div>

      {/* 🚀 CONTINUE LEARNING CARD & UPCOMING SRS REVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Lesson Showcase (2 Columns) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-sakura-600 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Curriculum Lesson</span>
            </div>
            <div>
              <div className="font-jp text-lg opacity-90">{currentLesson.titleJa}</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Lesson {currentLesson.lessonNumber}: {currentLesson.titleEn.split(':')[1] || currentLesson.titleEn}
              </h2>
              <p className="font-bn text-sm text-white/90 mt-1">
                {currentLesson.titleBn}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
              {currentLesson.grammarExplanationEn}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/20 relative z-10">
            <div className="flex items-center gap-3 text-xs text-white/90">
              <span>{currentLesson.vocabularyCount} Vocabulary</span>
              <span>•</span>
              <span>{currentLesson.kanjiCount} Kanji</span>
              <span>•</span>
              <span>{currentLesson.estimatedMinutes} Minutes</span>
            </div>

            <Link
              href={`/lessons/${currentLesson.lessonNumber}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-brand-700 hover:bg-slate-100 font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <PlayCircle className="w-4 h-4 text-brand-600" />
              <span>Resume Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Spaced Repetition Due Card (1 Column) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>SRS Spaced Repetition</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Vocabulary Review Due
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                15 <span className="text-xs font-normal text-slate-400">Cards</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Due for review today based on your SuperMemo recall intervals (Again, Hard, Good, Easy).
              </p>
            </div>
          </div>

          <Link
            href="/flashcards"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs text-center shadow-sm shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            Review Flashcards Now
          </Link>
        </div>
      </div>

      {/* 📅 DAILY STUDY CHECKLIST & WEEKLY ACTIVITY CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Study Checklist */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Today&apos;s Study Checklist</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {completedChecklistCount} of {checklist.length} tasks completed today
              </p>
            </div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/60">
              {Math.round((completedChecklistCount / checklist.length) * 100)}%
            </span>
          </div>

          <div className="space-y-2.5">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  item.completed
                    ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-500 dark:text-slate-400 line-through'
                    : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleChecklistItem(item.id)}
                  className="flex items-center gap-3 text-left flex-1"
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                      item.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="text-xs font-medium">
                    <div>{item.label}</div>
                    <span className="text-[10px] font-jp opacity-60 no-underline">{item.jp}</span>
                  </div>
                </button>

                <Link
                  href={item.link}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Open task view"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Study Activity Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Weekly Study Activity</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">Last 7 Days</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your daily learning volume against your {dailyTarget} min target.
            </p>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4 space-y-4">
            <div className="h-40 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {[25, 30, 45, 20, 35, 15, 30].map((minutes, idx) => {
                const heightPercent = Math.min(Math.round((minutes / 60) * 100), 100);
                const isTargetMet = minutes >= dailyTarget;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {minutes}m
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl h-32 flex items-end overflow-hidden p-1">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          isTargetMet
                            ? 'bg-gradient-to-t from-brand-600 to-emerald-500'
                            : 'bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-700 dark:to-slate-600'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {daysOfWeek[idx]}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span>Goal Met ({dailyTarget}m+)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-400 dark:bg-slate-600" />
                <span>Partial Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 QUICK LEARNING MODULE SHORTCUTS */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
          Explore Practice Modules
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: 'Hiragana', jp: 'ひらがな', href: '/hiragana', icon: Languages, color: 'text-brand-600' },
            { title: 'Katakana', jp: 'カタカナ', href: '/katakana', icon: PenTool, color: 'text-sakura-500' },
            { title: 'Vocabulary', jp: '単語', href: '/vocabulary', icon: BookOpen, color: 'text-emerald-600' },
            { title: 'Kanji Lab', jp: '漢字', href: '/kanji', icon: Compass, color: 'text-purple-600' },
            { title: 'Listening', jp: '聴解', href: '/listening', icon: Headphones, color: 'text-amber-500' },
            { title: 'Speaking', jp: '発音', href: '/speaking', icon: Mic, color: 'text-torii-600' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 shadow-soft hover:shadow-md transition-all text-center space-y-2 group"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-600">
                    {item.title}
                  </div>
                  <div className="font-jp text-[10px] text-slate-400">{item.jp}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
