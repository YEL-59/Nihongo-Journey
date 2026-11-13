'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  Globe2,
  Moon,
  Sun,
  Menu,
  X,
  BookOpen,
  Sparkles,
  Award,
  ChevronDown,
  Volume2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LearningLanguageMode } from '@/lib/storage';

interface HeaderProps {
  onToggleMobileDrawer?: () => void;
  isMobileDrawerOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileDrawer,
  isMobileDrawerOpen = false,
}) => {
  const pathname = usePathname();
  const { preferences, updatePreferences, setLanguageMode, toggleRomaji, dailyActivity, profile } = useApp();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isDark = preferences.theme === 'dark';

  const toggleTheme = () => {
    updatePreferences({ theme: isDark ? 'light' : 'dark' });
  };

  const languageLabels: Record<LearningLanguageMode, { en: string; bn: string }> = {
    all: { en: 'All (BN + EN + JA)', bn: 'সব ভাষা (বাংলা + EN + 日本語)' },
    bn: { en: 'Bangla + Japanese', bn: 'বাংলা + 日本語' },
    en: { en: 'English + Japanese', bn: 'English + 日本語' },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-warm/95 dark:bg-[#0B0F19]/95 backdrop-blur-md transition-colors duration-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {onToggleMobileDrawer && (
              <button
                type="button"
                onClick={onToggleMobileDrawer}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Toggle navigation drawer"
              >
                {isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Torii Gate Symbol Container */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-sakura-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/25 group-hover:scale-105 transition-transform">
                <span className="font-jp font-bold text-base select-none">日</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                    Nihongo <span className="text-brand-600 dark:text-brand-400">Journey</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-torii-50 dark:bg-torii-500/10 text-torii-600 dark:text-torii-400 border border-torii-200 dark:border-torii-500/20">
                    JLPT {profile.targetLevel}
                  </span>
                </div>
                <span className="text-[10px] font-jp text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
                  にほんご Journey • বাংলা ও English
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Shortcuts (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Link
              href="/dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/roadmap"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/roadmap'
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Roadmap (N5)
            </Link>
            <Link
              href="/learn"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname.startsWith('/learn') || pathname.startsWith('/lessons')
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Lessons (1-25)
            </Link>
            <Link
              href="/hiragana"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/hiragana' || pathname === '/katakana'
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Kana
            </Link>
            <Link
              href="/flashcards"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/flashcards'
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              SRS Flashcards
            </Link>
            <Link
              href="/jlpt"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/jlpt'
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              JLPT Mock
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak Counter with Glow */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-sm"
              title={`${dailyActivity.currentStreak} day study streak! Keep practicing today.`}
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{dailyActivity.currentStreak}</span>
              <span className="hidden sm:inline font-normal text-[11px] text-amber-600/80 dark:text-amber-400/80">days</span>
            </div>

            {/* Romaji Quick Toggle Pill */}
            <button
              type="button"
              onClick={toggleRomaji}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                preferences.showRomaji
                  ? 'bg-brand-50 dark:bg-brand-950/50 border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-70'
              }`}
              title="Toggle Romaji (Latin transliteration) visibility"
            >
              <span className="text-[11px]">Romaji:</span>
              <span className="font-bold">{preferences.showRomaji ? 'ON' : 'OFF'}</span>
            </button>

            {/* Language Mode Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                aria-label="Select explanation language mode"
              >
                <Globe2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span className="hidden sm:inline uppercase font-bold text-[11px]">
                  {preferences.languageMode}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-30 py-1.5 text-xs">
                    <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Explanation Language
                    </div>
                    {(['all', 'bn', 'en'] as LearningLanguageMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          setLanguageMode(mode);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          preferences.languageMode === mode
                            ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div>
                          <div>{languageLabels[mode].en}</div>
                          <div className="text-[11px] font-bn text-slate-500 dark:text-slate-400">
                            {languageLabels[mode].bn}
                          </div>
                        </div>
                        {preferences.languageMode === mode && (
                          <span className="w-2 h-2 rounded-full bg-brand-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle color theme"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Start / Dashboard CTA Button */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-semibold shadow-sm shadow-brand-500/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Learning App</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
