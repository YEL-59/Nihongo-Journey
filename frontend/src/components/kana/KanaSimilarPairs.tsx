'use client';

import React from 'react';
import { Volume2, Lightbulb, AlertTriangle, ArrowRight } from 'lucide-react';
import { SimilarKanaPair } from '@/data/kana';
import { useApp } from '@/context/AppContext';

interface KanaSimilarPairsProps {
  pairs: SimilarKanaPair[];
  title?: string;
  subtitle?: string;
}

export const KanaSimilarPairs: React.FC<KanaSimilarPairsProps> = ({
  pairs,
  title = 'Confusing & Look-alike Characters (বিভ্রান্তিকর জোড়া)',
  subtitle = 'Master the subtle stroke angles and curves that distinguish easily confused characters.',
}) => {
  const { playSpeech } = useApp();

  return (
    <div className="space-y-6">
      {/* Informative Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/70 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-start space-x-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted mt-0.5 leading-relaxed">{subtitle}</p>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pairs.map((pair) => (
          <div
            key={pair.id}
            className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
          >
            {/* Visual Side-by-Side Character Comparison */}
            <div className="flex items-center justify-center space-x-6 py-2 border-b border-border/60">
              {pair.chars.map((char, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative group">
                    <div
                      className="text-5xl font-black text-indigo-950 dark:text-indigo-100 font-japanese select-none leading-tight"
                      style={{ fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif" }}
                    >
                      {char}
                    </div>
                    <button
                      type="button"
                      onClick={() => playSpeech(char)}
                      className="absolute -top-1 -right-4 p-1 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity"
                      title={`Listen to ${char}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs font-bold text-muted uppercase mt-1">
                    "{pair.romajis[idx]}"
                  </div>
                </div>
              ))}
            </div>

            {/* Difference Explanation */}
            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-foreground leading-relaxed">
                {pair.differenceEn}
              </div>
              <div className="text-muted leading-relaxed">
                বাংলা: {pair.differenceBn}
              </div>
            </div>

            {/* Quick Memory Tip Pill */}
            <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100/60 dark:border-indigo-900/30 flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-indigo-950 dark:text-indigo-200">Tip:</span>{' '}
                <span className="text-indigo-900 dark:text-indigo-300">{pair.tipEn}</span>
                <p className="text-[11px] text-muted mt-0.5">{pair.tipBn}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
