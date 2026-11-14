'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import KanjiDetailModal from '@/components/kanji/KanjiDetailModal';
import { useApp } from '@/context/AppContext';
import { N5_KANJI } from '@/content/levels/n5';
import { KanjiEntry } from '@/content/shared/types';
import { getLocalStorageItem, setLocalStorageItem, STORAGE_KEYS } from '@/lib/storage';

type StrokeFilter = 'all' | 'short' | 'medium' | 'long';

function matchesStrokeFilter(strokeCount: number, filter: StrokeFilter): boolean {
  if (filter === 'short') return strokeCount <= 3;
  if (filter === 'medium') return strokeCount >= 4 && strokeCount <= 6;
  if (filter === 'long') return strokeCount >= 7;
  return true;
}

export default function KanjiPage() {
  const { isMounted, progress, updateProgress, preferences } = useApp();
  const [query, setQuery] = useState('');
  const [strokeFilter, setStrokeFilter] = useState<StrokeFilter>('all');
  const [mastered, setMastered] = useState<string[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<KanjiEntry | null>(null);

  useEffect(() => {
    if (!isMounted) return;
    const stored = getLocalStorageItem<unknown>(STORAGE_KEYS.KANJI_PROGRESS, []);
    const masteredIds = Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : [];
    setMastered(masteredIds);
    updateProgress({ kanjiMasteredCount: masteredIds.length });
  }, [isMounted, updateProgress]);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const showEnglish = preferences.languageMode === 'en' || preferences.languageMode === 'all';
  const showBangla = preferences.languageMode === 'bn' || preferences.languageMode === 'all';
  const filteredKanji = useMemo(() => N5_KANJI.filter((entry) => {
    const searchable = [
      entry.character,
      ...entry.meaningsEn,
      ...entry.meaningsBn,
      ...entry.onyomi,
      ...entry.kunyomi,
      entry.radical,
      ...entry.compounds.flatMap((compound) => [compound.word, compound.reading, compound.meaningEn, compound.meaningBn]),
    ].join(' ').toLocaleLowerCase();

    return (!normalizedQuery || searchable.includes(normalizedQuery)) && matchesStrokeFilter(entry.strokeCount, strokeFilter);
  }), [normalizedQuery, strokeFilter]);

  function toggleMastered(character: string) {
    const next = mastered.includes(character)
      ? mastered.filter((item) => item !== character)
      : [...mastered, character];
    setMastered(next);
    setLocalStorageItem(STORAGE_KEYS.KANJI_PROGRESS, next);
    if (next.length !== progress.kanjiMasteredCount) {
      updateProgress({ kanjiMasteredCount: next.length });
    }
  }

  if (!isMounted) {
    return (
      <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8" aria-label="Loading kanji">
        <div className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
          {Array.from({ length: 16 }, (_, index) => <div key={index} className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-sakura-600 via-purple-700 to-brand-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <Sparkles className="h-4 w-4" />
          Kanji Lab · JLPT N5
        </div>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black sm:text-4xl">Learn kanji in context</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              Explore readings, meanings, radicals, stroke steps, and useful vocabulary compounds.
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur">
            {mastered.length} / {N5_KANJI.length} N5 kanji mastered
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px]">
          <label className="relative block">
            <span className="sr-only">Search kanji</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search kanji, meanings, or readings..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Stroke count
            <select
              value={strokeFilter}
              onChange={(event) => setStrokeFilter(event.target.value as StrokeFilter)}
              className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="all">Any number</option>
              <option value="short">1–3 strokes</option>
              <option value="medium">4–6 strokes</option>
              <option value="long">7+ strokes</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500">{filteredKanji.length} of {N5_KANJI.length} N5 kanji shown</p>
      </section>

      {filteredKanji.length ? (
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7" aria-label="N5 kanji cards">
          {filteredKanji.map((entry) => {
            const isMastered = mastered.includes(entry.character);
            return (
              <button
                type="button"
                key={entry.character}
                onClick={() => setSelectedKanji(entry)}
                className="group relative flex min-h-36 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                {isMastered && <span className="absolute right-2 top-2 rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-700">Mastered</span>}
                <span className="font-jp text-5xl font-black text-slate-900 transition group-hover:text-brand-700 dark:text-white">{entry.character}</span>
                {showEnglish && <span className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">{entry.meaningsEn[0]}</span>}
                {showBangla && <span className="mt-1 text-[11px] text-slate-500">{entry.meaningsBn[0]}</span>}
                <span className="mt-1 text-[10px] text-slate-400">{entry.strokeCount} strokes</span>
              </button>
            );
          })}
        </section>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
          <BookOpen className="mx-auto h-8 w-8 text-slate-400" />
          <h2 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-100">No kanji match those filters</h2>
          <p className="mt-1 text-sm text-slate-500">Try a different meaning, reading, or stroke range.</p>
          <button
            type="button"
            onClick={() => { setQuery(''); setStrokeFilter('all'); }}
            className="mt-4 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}

      <KanjiDetailModal
        kanji={selectedKanji}
        isMastered={selectedKanji ? mastered.includes(selectedKanji.character) : false}
        onClose={() => setSelectedKanji(null)}
        onToggleMastered={toggleMastered}
      />
    </div>
  );
}
