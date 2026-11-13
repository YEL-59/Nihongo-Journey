'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Languages,
  PenTool,
  Layers,
  Headphones,
  Mic,
  Award,
  CheckCircle2,
  Volume2,
  Calendar,
  ShieldCheck,
  Compass,
  PlayCircle,
  GraduationCap,
  Clock,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LearningLanguageMode } from '@/lib/storage';

export default function HomePage() {
  const { preferences, setLanguageMode, playSpeech } = useApp();
  const [activeSentenceTab, setActiveSentenceTab] = useState<LearningLanguageMode>('all');
  const [activeRoadmapLevel, setActiveRoadmapLevel] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const sampleSentence = '初めまして、私は留学生です。よろしくお願いします。';
  const sampleRomaji = 'Hajimemashite, watashi wa ryuugakusei desu. Yoroshiku onegaishimasu.';

  const handlePlayAudio = (text: string) => {
    setPlayingWord(text);
    playSpeech(text);
    setTimeout(() => setPlayingWord(null), 1200);
  };

  return (
    <div className="w-full space-y-20 py-8 md:py-16">
      {/* 🌸 SECTION 1: HERO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Torii-inspired Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-sm animate-in fade-in zoom-in-95 duration-500">
          <span className="w-2 h-2 rounded-full bg-sakura-500 animate-pulse" />
          <span>Complete Beginner to JLPT N5 Masterclass • বাংলা • English • 日本語</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Master Japanese Step-by-Step with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-sakura-500">
              Real Confidence
            </span>
          </h1>
          <p className="font-bn text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-medium">
            আত্মবিশ্বাসের সাথে সহজে জাপানি ভাষা শিখুন—শূন্য থেকে JLPT N5 পর্যন্ত।
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, textbook-aligned Japanese learning platform tailored for Bangladeshi and global learners.
            Minna no Nihongo I lessons (1–25), Kana stroke animations, spaced repetition (SRS) flashcards, and native audio.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Your Journey (Free)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/roadmap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Explore N5 Roadmap</span>
          </Link>
          <Link
            href="/lessons/1"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-semibold text-sm transition-all"
          >
            <PlayCircle className="w-4 h-4 text-emerald-600" />
            <span>Try Lesson 1 Demo</span>
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400">25</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">Textbook Lessons</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Minna no Nihongo N5</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">700+</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">Essential Words</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">With Audio & Examples</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-sakura-500">103</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">N5 Kanji Characters</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Onyomi, Kunyomi & Strokes</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">100%</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">Offline LocalStorage</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">No Login Required</div>
          </div>
        </div>

        {/* ⛩️ INTERACTIVE TRILINGUAL PREVIEW WIDGET */}
        <div className="max-w-4xl mx-auto pt-6 text-left">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl overflow-hidden transition-all">
            {/* Widget Top Bar */}
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Interactive Trilingual Pedagogy Demo</span>
              </div>

              {/* Language Switch Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveSentenceTab('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeSentenceTab === 'all'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  All 3 Languages
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSentenceTab('bn')}
                  className={`px-2.5 py-1 rounded-lg transition-all font-bn ${
                    activeSentenceTab === 'bn'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  বাংলা + 日本語
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSentenceTab('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeSentenceTab === 'en'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  English + 日本語
                </button>
              </div>
            </div>

            {/* Sentence Body */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="font-jp text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-wide">
                    {sampleSentence}
                  </div>
                  {preferences.showRomaji && (
                    <div className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
                      {sampleRomaji}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePlayAudio(sampleSentence)}
                  className={`p-3 rounded-2xl border transition-all ${
                    playingWord === sampleSentence
                      ? 'bg-brand-600 text-white scale-110 shadow-glow'
                      : 'border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 hover:bg-brand-100'
                  }`}
                  aria-label="Listen to Japanese pronunciation"
                  title="Listen with native pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Translations Based on Tab */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {(activeSentenceTab === 'all' || activeSentenceTab === 'bn') && (
                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      বাংলা অনুবাদ (Bangla Explanation)
                    </span>
                    <p className="font-bn text-base text-slate-800 dark:text-slate-200 font-medium">
                      &ldquo;আপনার সাথে পরিচিত হয়ে ভালো লাগল, আমি একজন বিদেশি শিক্ষার্থী। দয়া করে আমাকে সহায়তা করবেন।&rdquo;
                    </p>
                  </div>
                )}

                {(activeSentenceTab === 'all' || activeSentenceTab === 'en') && (
                  <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200/80 dark:border-brand-800/40 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                      English Translation & Context
                    </span>
                    <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                      &ldquo;Nice to meet you, I am an international student. Please treat me kindly / I look forward to working with you.&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Word by Word Breakdown Badges */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Interactive Word Breakdown (Click to listen):
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { jp: '初めまして', ro: 'Hajimemashite', en: 'Nice to meet you', bn: 'পরিচিত হয়ে ভালো লাগল' },
                    { jp: '私', ro: 'Watashi', en: 'I / Me', bn: 'আমি' },
                    { jp: 'は', ro: 'wa', en: 'Topic Marker Particle', bn: 'বিষয়ের নির্দেশক' },
                    { jp: '留学生', ro: 'Ryuugakusei', en: 'International Student', bn: 'বিদেশি শিক্ষার্থী' },
                    { jp: 'です', ro: 'desu', en: 'Polite Copula (am/is)', bn: 'হই/হয় (ভদ্র প্রকাশ)' },
                    { jp: 'よろしく', ro: 'Yoroshiku', en: 'Best regards', bn: 'সহায়তা করবেন' },
                  ].map((word, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePlayAudio(word.jp)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left transition-all group"
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-jp font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-600">
                          {word.jp}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">({word.ro})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                        {word.bn} • {word.en}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⛩️ SECTION 2: 6 CORE PEDAGOGICAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Engineered for Beginners
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            6 Specialized Modules for Japanese Mastery
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Every feature is structured according to JLPT N5 guidelines and the proven Minna no Nihongo curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Kana Mastery */}
          <Link
            href="/hiragana"
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/50 hover:shadow-xl transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Languages className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                  Kana Mastery Center
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  46 + 46 Kana
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hiragana & Katakana stroke order, pronunciation replay, writing practice canvas, and character recognition quizzes.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 gap-1 pt-2">
              <span>Start Kana Practice</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: 12-Section Lesson Player */}
          <Link
            href="/learn"
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 hover:shadow-xl transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  12-Section Lesson Player
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  25 Lessons
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Minna no Nihongo I textbook-aligned. Objectives, vocabulary, grammar rules, exercises, dialogues, and final quizzes.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1 pt-2">
              <span>Explore Lessons</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Spaced Repetition SRS Flashcards */}
          <Link
            href="/flashcards"
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-sakura-500/50 hover:shadow-xl transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-sakura-50 dark:bg-sakura-950/60 text-sakura-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sakura-500 transition-colors">
                  Spaced Repetition (SRS)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sakura-100 dark:bg-sakura-950 text-sakura-700 dark:text-sakura-300">
                  Leitner Box
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SuperMemo algorithm for flashcards. Four rating options (Again, Hard, Good, Easy) across 1, 3, 7, 14 and 30-day intervals.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-sakura-500 gap-1 pt-2">
              <span>Review Due Cards</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Trilingual Bangla-English-Japanese */}
          <Link
            href="/grammar"
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-purple-500/50 hover:shadow-xl transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                  Trilingual Explanations
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  বাংলা + EN + 日
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No linguistic barriers. Grammar rules, particle nuances, and example sentences written clearly in both Bangla and English.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 gap-1 pt-2">
              <span>View Grammar Guide</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Audio & Speaking Lab */}
          <Link
            href="/speaking"
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/50 hover:shadow-xl transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  Audio & Speaking Lab
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  Speech Recorder
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Native Japanese pronunciation playback, pitch accent cues, and microphone recording for self-comparison.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400 gap-1 pt-2">
              <span>Open Speaking Lab</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: JLPT N5 Exam Simulator */}
          <Link
            href="/jlpt"
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-torii-500/50 hover:shadow-xl transition-all group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-torii-50 dark:bg-torii-950/60 text-torii-600 dark:text-torii-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-torii-600 transition-colors">
                  JLPT N5 Exam Simulator
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-torii-100 dark:bg-torii-950 text-torii-700 dark:text-torii-300">
                  Timed Practice
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Full timed examination simulating Language Knowledge (Vocabulary/Grammar), Reading, and Listening sections with scoring.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-torii-600 dark:text-torii-400 gap-1 pt-2">
              <span>Start Mock Exam</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 🌸 SECTION 3: VISUAL 4-PHASE ROADMAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Structured Learning Curriculum
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Your 4-Phase Path to JLPT N5 Certification
              </h2>
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveRoadmapLevel('N5')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeRoadmapLevel === 'N5'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                JLPT N5 (Active)
              </button>
              <button
                type="button"
                onClick={() => setActiveRoadmapLevel('N4')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeRoadmapLevel === 'N4'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                JLPT N4 (Coming)
              </button>
              <button
                type="button"
                onClick={() => setActiveRoadmapLevel('N3')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeRoadmapLevel === 'N3'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                JLPT N3 (Planned)
              </button>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3 relative">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Kana & Sound Foundation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hiragana, Katakana, Dakuten, Handakuten, Youon combined sounds, and Japanese pronunciation basics.
              </p>
              <div className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                Week 1–2 • 100% Mastery
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Lessons 1–10 (Basic Grammar)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Self-introduction, pointing objects (これ/それ/あれ), time, locations, places, and present/past verb forms.
              </p>
              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Week 3–6 • 250 Vocabulary
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3 relative">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Lessons 11–20 (Daily Life)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Counters, i/na adjectives, expressing desires (～たい), Te-form conjugations, and giving/receiving actions.
              </p>
              <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                Week 7–10 • 500 Vocabulary
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3 relative">
              <div className="w-8 h-8 rounded-xl bg-torii-600 text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Lessons 21–25 & Mock Exams
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Plain style conversations, opinions (～と思う), conditional Tara, and full timed JLPT N5 practice examinations.
              </p>
              <div className="text-[11px] font-semibold text-torii-600 dark:text-torii-400">
                Week 11–12 • JLPT Exam Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⏰ SECTION 4: CLIENT'S RECOMMENDED 2-HOUR STUDY ROUTINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-warm to-brand-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-brand-950/30 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Proven Study Habit Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              The Daily 2-Hour Japanese Routine (7:30–9:30 PM)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Structured daily cadence from the client brief designed to build effortless habit consistency.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { time: '7:30–7:50 PM', title: 'Vocabulary & SRS', min: '20 min', color: 'border-brand-500 text-brand-600' },
              { time: '7:50–8:20 PM', title: 'Grammar Patterns', min: '30 min', color: 'border-emerald-500 text-emerald-600' },
              { time: '8:20–8:40 PM', title: 'Kanji & Stroke Order', min: '20 min', color: 'border-sakura-500 text-sakura-500' },
              { time: '8:40–9:00 PM', title: 'Listening Comprehension', min: '20 min', color: 'border-amber-500 text-amber-500' },
              { time: '9:00–9:20 PM', title: 'Speaking & Shadowing', min: '20 min', color: 'border-purple-500 text-purple-600' },
              { time: '9:20–9:30 PM', title: 'Daily Quiz & Revision', min: '10 min', color: 'border-torii-500 text-torii-600' },
            ].map((slot, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1"
              >
                <div className="text-[10px] font-mono text-slate-400">{slot.time}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{slot.title}</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{slot.min}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 SECTION 5: CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-700 to-sakura-600 text-white text-center space-y-6 shadow-glow relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Begin Your Journey to Japan Today
            </h2>
            <p className="font-bn text-lg sm:text-xl text-white/90">
              আজই জাপানি ভাষা শেখা শুরু করুন—কোনো লগইন বা সাবস্ক্রিপশন ছাড়াই।
            </p>
            <p className="text-xs sm:text-sm text-white/80">
              Instant access to Hiragana charts, Lessons 1–25, spaced repetition flashcards, and JLPT N5 practice.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 relative z-10">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-brand-700 font-bold text-sm shadow-md hover:bg-slate-100 transition-all hover:scale-[1.02]"
            >
              Get Started for Free
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm backdrop-blur-md transition-all"
            >
              Go to Learner Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
