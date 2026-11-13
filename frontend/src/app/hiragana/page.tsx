'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Languages,
  PenTool,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Trophy,
  Volume2,
  Sparkles,
  ArrowRight,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import {
  HIRAGANA_GOJUON,
  HIRAGANA_DAKUTEN,
  HIRAGANA_YOON,
  SIMILAR_HIRAGANA_PAIRS,
  getAllHiragana,
  KanaCharacter,
} from '@/data/kana';
import { KanaGrid } from '@/components/kana/KanaGrid';
import { KanaDetailModal } from '@/components/kana/KanaDetailModal';
import { WritingCanvas } from '@/components/kana/WritingCanvas';
import { KanaSimilarPairs } from '@/components/kana/KanaSimilarPairs';
import { KanaQuiz } from '@/components/kana/KanaQuiz';
import { useApp } from '@/context/AppContext';
import {
  STORAGE_KEYS,
  getLocalStorageItem,
  setLocalStorageItem,
  KanaMasteryData,
  DEFAULT_KANA_MASTERY,
} from '@/lib/storage';

type ActiveTab = 'chart' | 'writing' | 'similar' | 'quiz';

export default function HiraganaPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chart');
  const [selectedKana, setSelectedKana] = useState<KanaCharacter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [activePracticeKana, setActivePracticeKana] = useState<KanaCharacter>(HIRAGANA_GOJUON[0]);
  const [isClientReady, setIsClientReady] = useState(false);

  const { isMounted, playSpeech } = useApp();

  const allHiragana = useMemo(() => getAllHiragana(), []);

  // Load mastered kana from localStorage on client mount
  useEffect(() => {
    setIsClientReady(true);
    const data = getLocalStorageItem<KanaMasteryData>(
      STORAGE_KEYS.KANA_MASTERY,
      DEFAULT_KANA_MASTERY
    );
    if (data && Array.isArray(data.mastered)) {
      setMasteredIds(data.mastered);
    }
  }, []);

  // Toggle mastery status
  const handleToggleMaster = useCallback((kanaId: string) => {
    setMasteredIds((prev) => {
      const isCurrentlyMastered = prev.includes(kanaId);
      const next = isCurrentlyMastered
        ? prev.filter((id) => id !== kanaId)
        : [...prev, kanaId];

      const currentData = getLocalStorageItem<KanaMasteryData>(
        STORAGE_KEYS.KANA_MASTERY,
        DEFAULT_KANA_MASTERY
      );
      setLocalStorageItem(STORAGE_KEYS.KANA_MASTERY, {
        ...currentData,
        mastered: next,
      });

      return next;
    });
  }, []);

  // Open character modal
  const handleSelectKana = (kana: KanaCharacter) => {
    setSelectedKana(kana);
    setIsModalOpen(true);
    playSpeech(kana.character);
  };

  // Modal Next/Prev navigation
  const currentIndex = selectedKana ? allHiragana.findIndex((k) => k.id === selectedKana.id) : -1;
  const handlePrevKana = currentIndex > 0 ? () => setSelectedKana(allHiragana[currentIndex - 1]) : undefined;
  const handleNextKana = currentIndex < allHiragana.length - 1 ? () => setSelectedKana(allHiragana[currentIndex + 1]) : undefined;

  // Calculate mastery progress metrics
  const coreMasteredCount = HIRAGANA_GOJUON.filter((k) => masteredIds.includes(k.id)).length;
  const totalMasteredCount = allHiragana.filter((k) => masteredIds.includes(k.id)).length;
  const corePercentage = Math.round((coreMasteredCount / HIRAGANA_GOJUON.length) * 100);

  // Loading skeleton state
  if (!isMounted || !isClientReady) {
    return (
      <div className="space-y-6 animate-pulse p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="h-28 rounded-3xl bg-muted/20" />
        <div className="h-12 w-80 rounded-2xl bg-muted/20" />
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-muted/15" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Hero Header Banner with Progress Meter */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Japanese Calligraphy Background Accent */}
        <div className="absolute right-4 -bottom-6 text-9xl font-black text-white/5 font-japanese select-none pointer-events-none">
          ひらがな
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-indigo-200 border border-white/10">
                Foundation • Step 1
              </span>
              <span className="text-xs text-indigo-200 font-medium">46 Core Characters + Dakuten & Yoon</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-3">
              <span>Hiragana Mastery Center</span>
              <span className="text-xl sm:text-2xl font-japanese text-indigo-300 font-normal">
                (ひらがな)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-xl leading-relaxed">
              Master the phonetic bedrock of the Japanese language. Learn pronunciation, stroke order, mnemonics, and test your recognition with instant quizzes.
            </p>
          </div>

          {/* Quick Mastery Progress Metric Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 min-w-[240px] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-indigo-100 flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Gojuon Mastered</span>
              </span>
              <span className="font-bold text-white">
                {coreMasteredCount} / {HIRAGANA_GOJUON.length}
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${corePercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-indigo-200 pt-0.5">
              <span>{corePercentage}% Complete</span>
              <span>Total: {totalMasteredCount} / {allHiragana.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-card border border-border shadow-sm overflow-x-auto max-w-full">
        <button
          type="button"
          onClick={() => setActiveTab('chart')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'chart'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-muted hover:text-foreground hover:bg-muted/10'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>Character Charts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('writing')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'writing'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-muted hover:text-foreground hover:bg-muted/10'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Writing & Stroke Lab</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('similar')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'similar'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-muted hover:text-foreground hover:bg-muted/10'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Look-alike Pairs</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-muted hover:text-foreground hover:bg-muted/10'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Mastery Quiz</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: KANA CHARTS & AUDIO GRID */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'chart' && (
        <KanaGrid
          characters={allHiragana}
          type="hiragana"
          masteredIds={masteredIds}
          onSelectKana={handleSelectKana}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: WRITING & STROKE ORDER LAB */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'writing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Character Selector Palette */}
          <div className="p-4 rounded-3xl bg-card border border-border shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Select Character to Trace
              </span>
              <span className="text-xs font-semibold text-indigo-600">
                {HIRAGANA_GOJUON.length} Gojuon
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-[460px] overflow-y-auto pr-1">
              {HIRAGANA_GOJUON.map((char) => {
                const isSelected = activePracticeKana.id === char.id;
                const isMastered = masteredIds.includes(char.id);

                return (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => {
                      setActivePracticeKana(char);
                      playSpeech(char.character);
                    }}
                    className={`h-14 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                        : isMastered
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-foreground'
                        : 'bg-card border-border hover:border-indigo-300 text-foreground'
                    }`}
                  >
                    <span className="text-lg font-bold font-japanese leading-none">
                      {char.character}
                    </span>
                    <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-muted'}`}>
                      {char.romaji}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Writing Canvas */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border shadow-sm flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-4xl font-bold font-japanese text-foreground">
                  {activePracticeKana.character}
                </span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  "{activePracticeKana.romaji}"
                </span>
                <button
                  type="button"
                  onClick={() => playSpeech(activePracticeKana.character)}
                  className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                  title="Play audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-muted mt-1">
                {activePracticeKana.mnemonicEn}
              </p>
            </div>

            <WritingCanvas
              character={activePracticeKana.character}
              romaji={activePracticeKana.romaji}
              strokeCount={activePracticeKana.strokeCount}
              strokeHints={activePracticeKana.strokeHints}
              onComplete={() => {
                if (!masteredIds.includes(activePracticeKana.id)) {
                  handleToggleMaster(activePracticeKana.id);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: CONFUSING LOOK-ALIKE PAIRS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'similar' && (
        <KanaSimilarPairs
          pairs={SIMILAR_HIRAGANA_PAIRS}
          title="Confusing Hiragana Characters (বিভ্রান্তিকর হিরাগানা জোড়া)"
          subtitle="Learn the exact stroke differences between easily confused characters like さ vs き, は vs ほ, and れ vs ね vs わ."
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: MASTERY QUIZ */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'quiz' && (
        <KanaQuiz
          characters={allHiragana}
          type="hiragana"
          onCompleteQuiz={(score, total) => {
            console.log(`Quiz completed with score: ${score}/${total}`);
          }}
        />
      )}

      {/* Interactive Detail Modal / Drawer */}
      <KanaDetailModal
        kana={selectedKana}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMastered={selectedKana ? masteredIds.includes(selectedKana.id) : false}
        onToggleMaster={handleToggleMaster}
        onPrev={handlePrevKana}
        onNext={handleNextKana}
      />
    </div>
  );
}
