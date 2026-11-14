'use client';

import { useEffect, useState } from 'react';
import { Bookmark, BookOpen, Search, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { N5_VOCABULARY } from '@/content/levels/n5';
import { VocabularyCategory } from '@/content/shared/types';
import { getLocalStorageItem, setLocalStorageItem, STORAGE_KEYS } from '@/lib/storage';
import { normalizeSavedIds } from '@/lib/study';

const CATEGORIES: Array<'All' | VocabularyCategory> = ['All', 'Greetings', 'Food', 'Verbs', 'Numbers', 'Time', 'Travel', 'Places', 'People', 'Adjectives', 'Daily Life'];

export default function VocabularyPage() {
  const { isMounted, preferences, playSpeech } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | VocabularyCategory>('All');
  const [level, setLevel] = useState('All');
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    if (isMounted) setBookmarks(normalizeSavedIds(getLocalStorageItem<unknown>(STORAGE_KEYS.BOOKMARKS, [])));
  }, [isMounted]);

  const levels = Array.from(new Set(N5_VOCABULARY.map((entry) => entry.level)));
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredVocabulary = N5_VOCABULARY.filter((entry) => {
    const matchesQuery = !normalizedQuery || [
      entry.japanese,
      entry.reading,
      entry.romaji,
      entry.meaningEn,
      entry.meaningBn,
      entry.exampleJa,
      entry.exampleEn,
      entry.exampleBn,
    ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));

    return matchesQuery &&
      (category === 'All' || entry.category === category) &&
      (level === 'All' || entry.level === level);
  });

  function toggleBookmark(id: string) {
    const next = bookmarks.includes(id)
      ? bookmarks.filter((bookmark) => bookmark !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    setLocalStorageItem(STORAGE_KEYS.BOOKMARKS, next);
  }

  const showEnglish = preferences.languageMode === 'en' || preferences.languageMode === 'all';
  const showBangla = preferences.languageMode === 'bn' || preferences.languageMode === 'all';

  if (!isMounted) {
    return (
      <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8" aria-label="Loading vocabulary">
        <div className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-56 rounded-2xl bg-slate-200 dark:bg-slate-800" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <BookOpen className="h-4 w-4" />
          N5 Vocabulary Library
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black sm:text-4xl">Words you can use</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              Search Japanese, readings, romaji, or either translation. Save useful words and review them in your flashcards.
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur">
            {N5_VOCABULARY.length} starter words
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_140px]">
          <label className="relative block">
            <span className="sr-only">Search vocabulary</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search kanji, kana, romaji, English, or Bangla..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as 'All' | VocabularyCategory)}
              className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">
            JLPT level
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="All">All levels</option>
              {levels.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>{filteredVocabulary.length} {filteredVocabulary.length === 1 ? 'word' : 'words'} found</span>
          <span>{bookmarks.length} saved</span>
        </div>
      </section>

      {filteredVocabulary.length ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Vocabulary results">
          {filteredVocabulary.map((entry) => {
            const isBookmarked = bookmarks.includes(entry.id);
            return (
              <article key={entry.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                      {entry.category} · {entry.level}
                    </span>
                    <h2 className="mt-3 font-jp text-3xl font-black text-slate-900 dark:text-white">{entry.japanese}</h2>
                    <p className="font-jp text-sm text-slate-500">{entry.reading}</p>
                    {preferences.showRomaji && <p className="mt-0.5 text-xs text-slate-400">{entry.romaji}</p>}
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => playSpeech(entry.japanese)}
                      aria-label={`Play ${entry.japanese} pronunciation`}
                      className="rounded-xl p-2 text-brand-600 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:hover:bg-brand-950/50"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(entry.id)}
                      aria-label={isBookmarked ? `Remove ${entry.japanese} from saved words` : `Save ${entry.japanese}`}
                      aria-pressed={isBookmarked}
                      className={`rounded-xl p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${isBookmarked ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                      <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 min-h-12 space-y-1">
                  {showEnglish && <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.meaningEn}</p>}
                  {showBangla && <p className="text-sm text-slate-600 dark:text-slate-300">{entry.meaningBn}</p>}
                </div>

                <div className="mt-4 flex-1 rounded-xl bg-slate-50 p-3 dark:bg-slate-950/50">
                  <p className="font-jp text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.exampleJa}</p>
                  {preferences.showRomaji && <p className="mt-1 font-jp text-xs text-slate-400">{entry.exampleReading}</p>}
                  {showEnglish && <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{entry.exampleEn}</p>}
                  {showBangla && <p className="mt-1 text-xs text-slate-500">{entry.exampleBn}</p>}
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
          <Search className="mx-auto h-8 w-8 text-slate-400" />
          <h2 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-100">No matching words</h2>
          <p className="mt-1 text-sm text-slate-500">Try another search or clear the category and level filters.</p>
          <button
            type="button"
            onClick={() => { setQuery(''); setCategory('All'); setLevel('All'); }}
            className="mt-4 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
