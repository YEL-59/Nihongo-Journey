'use client';

import React, { useState } from 'react';
import {
  X,
  Volume2,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  PenTool,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { KanaCharacter } from '@/data/kana';
import { WritingCanvas } from './WritingCanvas';
import { useApp } from '@/context/AppContext';

interface KanaDetailModalProps {
  kana: KanaCharacter | null;
  isOpen: boolean;
  onClose: () => void;
  isMastered: boolean;
  onToggleMaster: (kanaId: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const KanaDetailModal: React.FC<KanaDetailModalProps> = ({
  kana,
  isOpen,
  onClose,
  isMastered,
  onToggleMaster,
  onPrev,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'write'>('info');
  const { playSpeech } = useApp();

  if (!isOpen || !kana) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-lg bg-card rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-stone-50/70 dark:bg-stone-900/50">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
              {kana.type}
            </span>
            <span className="text-xs text-muted capitalize">
              {kana.category} • {kana.strokeCount} strokes
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Mastered Toggle Pill */}
            <button
              type="button"
              onClick={() => onToggleMaster(kana.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                isMastered
                  ? 'bg-emerald-500 text-white shadow-sm hover:bg-emerald-600'
                  : 'bg-muted/15 text-muted hover:bg-muted/30 hover:text-foreground'
              }`}
            >
              {isMastered ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mastered</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5" />
                  <span>Mark Mastered</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-muted hover:text-foreground hover:bg-muted/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="overflow-y-auto px-6 py-5 flex-1 space-y-6">
          {/* Main Visual Header: Big Kana + Romaji + Sound Trigger */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-50/60 via-purple-50/40 to-pink-50/30 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-stone-900 border border-indigo-100/60 dark:border-indigo-900/40">
            <div className="flex items-center space-x-5">
              <div
                className="text-6xl font-bold text-indigo-950 dark:text-indigo-100 font-japanese drop-shadow-sm select-none"
                style={{ fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif" }}
              >
                {kana.character}
              </div>

              <div>
                <div className="text-3xl font-black text-foreground tracking-tight">
                  {kana.romaji}
                </div>
                <div className="text-xs text-muted font-medium mt-0.5">
                  Row: <span className="uppercase text-foreground">{kana.row}</span> • Column: <span className="uppercase text-foreground">{kana.column}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => playSpeech(kana.character)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md hover:shadow-indigo-500/25 transition-all transform active:scale-95"
              title="Play Japanese pronunciation"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Listen</span>
            </button>
          </div>

          {/* Sub-tab Navigation: Info vs Practice Writing */}
          <div className="flex rounded-xl bg-muted/15 p-1 border border-border">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                activeTab === 'info'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Details & Mnemonics</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('write')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                activeTab === 'write'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Stroke Order & Writing</span>
            </button>
          </div>

          {/* TAB 1: DETAILS & MNEMONICS */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              {/* Trilingual Mnemonics Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Memory Aid / Mnemonic (মনে রাখার কৌশল)</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {kana.mnemonicEn}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  বাংলা: {kana.mnemonicBn}
                </p>
              </div>

              {/* Example Vocabulary Word Card */}
              {kana.exampleWord && (
                <div className="p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-900/60 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      Example Word (শব্দার্থ)
                    </span>
                    <button
                      type="button"
                      onClick={() => playSpeech(kana.exampleWord.japanese)}
                      className="p-1 rounded-md text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                      title="Play example pronunciation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 font-japanese">
                      {kana.exampleWord.japanese}
                    </span>
                    <span className="text-sm font-semibold text-muted">
                      ({kana.exampleWord.romaji})
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-foreground/90 flex flex-wrap gap-x-4 gap-y-1">
                    <div>
                      <span className="text-muted">EN:</span>{' '}
                      <span className="font-medium">{kana.exampleWord.english}</span>
                    </div>
                    <div>
                      <span className="text-muted">BN:</span>{' '}
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">
                        {kana.exampleWord.bangla}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Similar / Confusing Character Alert */}
              {kana.similarWith && kana.similarWith.length > 0 && (
                <div className="p-3.5 rounded-xl bg-orange-50/80 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/30 flex items-start space-x-2.5">
                  <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-orange-900 dark:text-orange-200">
                      Look-alike characters:
                    </span>{' '}
                    <span className="text-orange-800 dark:text-orange-300">
                      Be careful not to confuse with{' '}
                      <strong className="text-sm mx-1 underline">{kana.similarWith.join(', ')}</strong>. Check the
                      "Confusing Pairs" tab to see stroke and shape differences!
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WRITING & STROKE CANVAS */}
          {activeTab === 'write' && (
            <div className="py-2">
              <WritingCanvas
                character={kana.character}
                romaji={kana.romaji}
                strokeCount={kana.strokeCount}
                strokeHints={kana.strokeHints}
                onComplete={() => {
                  if (!isMastered) {
                    onToggleMaster(kana.id);
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Modal Footer with Previous / Next Navigation */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-stone-50/70 dark:bg-stone-900/50">
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/15 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-[11px] font-mono text-muted uppercase">
            ID: {kana.id}
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/15 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
