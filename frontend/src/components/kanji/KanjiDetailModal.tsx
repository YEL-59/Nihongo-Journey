'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Volume2, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { KanjiEntry } from '@/content/shared/types';

interface KanjiDetailModalProps {
  kanji: KanjiEntry | null;
  isMastered: boolean;
  onClose: () => void;
  onToggleMastered: (character: string) => void;
}

export default function KanjiDetailModal({
  kanji,
  isMastered,
  onClose,
  onToggleMastered,
}: KanjiDetailModalProps) {
  const [strokeStep, setStrokeStep] = useState(0);
  const { playSpeech, preferences } = useApp();

  useEffect(() => {
    setStrokeStep(0);
  }, [kanji?.character]);

  useEffect(() => {
    if (!kanji) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [kanji, onClose]);

  if (!kanji) return null;

  const showEnglish = preferences.languageMode === 'en' || preferences.languageMode === 'all';
  const showBangla = preferences.languageMode === 'bn' || preferences.languageMode === 'all';
  const currentStroke = Math.min(strokeStep, kanji.strokeOrder.length - 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="kanji-detail-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">JLPT {kanji.level} Kanji</p>
            <h2 id="kanji-detail-title" className="text-xl font-black text-slate-900 dark:text-white">
              Kanji details
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close kanji details" className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-5 overflow-y-auto p-5">
          <div className="flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-100 p-5 sm:flex-row sm:items-center dark:from-brand-950/40 dark:to-indigo-950/30">
            <div className="flex items-center gap-4">
              <span className="font-jp text-6xl font-black text-brand-800 dark:text-brand-200">{kanji.character}</span>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{kanji.strokeCount} strokes</p>
                <button
                  type="button"
                  onClick={() => playSpeech(kanji.character)}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  <Volume2 className="h-4 w-4" />
                  Listen
                </button>
              </div>
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {showEnglish && (
                <div className="rounded-xl bg-white/80 p-3 dark:bg-slate-900/70">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Meaning</p>
                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{kanji.meaningsEn.join(', ')}</p>
                </div>
              )}
              {showBangla && (
                <div className="rounded-xl bg-white/80 p-3 dark:bg-slate-900/70">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">বাংলা অর্থ</p>
                  <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{kanji.meaningsBn.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Onyomi 音読み</p>
              <p className="mt-2 font-jp text-lg font-semibold text-slate-900 dark:text-white">{kanji.onyomi.join('、') || '—'}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Kunyomi 訓読み</p>
              <p className="mt-2 font-jp text-lg font-semibold text-slate-900 dark:text-white">{kanji.kunyomi.join('、') || '—'}</p>
            </div>
          </div>

          <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Stroke-order practice</h3>
                <p className="text-xs text-slate-500">Follow each numbered direction in sequence.</p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                Step {strokeStep + 1} of {kanji.strokeOrder.length}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-950/50">
              <span className="font-jp text-5xl font-bold text-slate-300 dark:text-slate-700" aria-hidden="true">{kanji.character}</span>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap gap-1.5" aria-label={`${strokeStep + 1} of ${kanji.strokeOrder.length} stroke steps completed`}>
                  {kanji.strokeOrder.map((_, index) => (
                    <span
                      key={index}
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                        index <= strokeStep ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
                      }`}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{kanji.strokeOrder[currentStroke]}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <button
                type="button"
                onClick={() => setStrokeStep((step) => Math.max(0, step - 1))}
                disabled={strokeStep === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
              >
                <ChevronLeft className="h-4 w-4" /> Previous stroke
              </button>
              <button
                type="button"
                onClick={() => setStrokeStep((step) => Math.min(kanji.strokeOrder.length - 1, step + 1))}
                disabled={strokeStep === kanji.strokeOrder.length - 1}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next stroke <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white">Radical</h3>
            <p className="mt-1 font-jp text-lg text-slate-800 dark:text-slate-100">
              {kanji.radical} <span className="font-sans text-sm text-slate-500">({kanji.radicalMeaningEn})</span>
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-bold text-slate-900 dark:text-white">Vocabulary compounds</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {kanji.compounds.map((compound) => (
                <div key={`${compound.word}-${compound.reading}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
                  <p className="font-jp text-lg font-bold text-slate-900 dark:text-white">{compound.word}</p>
                  <p className="font-jp text-xs text-slate-500">{compound.reading}</p>
                  {showEnglish && <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">{compound.meaningEn}</p>}
                  {showBangla && <p className="text-xs text-slate-500">{compound.meaningBn}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 px-5 py-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => onToggleMastered(kanji.character)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${
              isMastered ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isMastered ? 'Mastered' : 'Mark mastered'}
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}
