'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bookmark, CheckCircle2, Clock3, RotateCcw, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { N5_VOCABULARY } from '@/content/levels/n5';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  STORAGE_KEYS,
  VocabularyReviewRating,
  VocabularyReviewStore,
} from '@/lib/storage';
import {
  getDueVocabularyIds,
  isVocabularyMastered,
  normalizeSavedIds,
  normalizeVocabularyReviewStore,
  scheduleVocabularyReview,
} from '@/lib/study';

const ratings: Array<{ value: VocabularyReviewRating; label: string; tone: string }> = [
  { value: 'again', label: 'Again', tone: 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100' },
  { value: 'hard', label: 'Hard', tone: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100' },
  { value: 'good', label: 'Good', tone: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
  { value: 'easy', label: 'Easy', tone: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100' },
];

export default function FlashcardsPage() {
  const { isMounted, preferences, progress, updateProgress, playSpeech } = useApp();
  const [reviews, setReviews] = useState<VocabularyReviewStore>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [dueIds, setDueIds] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [lastScheduled, setLastScheduled] = useState<string | null>(null);

  useEffect(() => {
    if (!isMounted) return;
    const storedReviews = normalizeVocabularyReviewStore(
      getLocalStorageItem<unknown>(STORAGE_KEYS.VOCAB_REVIEWS, {}),
    );
    setReviews(storedReviews);
    setBookmarks(normalizeSavedIds(getLocalStorageItem<unknown>(STORAGE_KEYS.BOOKMARKS, [])));
    setDueIds(getDueVocabularyIds(N5_VOCABULARY.map((entry) => entry.id), storedReviews));
    updateProgress({
      vocabularyMasteredCount: Object.values(storedReviews).filter(isVocabularyMastered).length,
    });
  }, [isMounted, updateProgress]);

  const activeQueue = useMemo(
    () => savedOnly ? dueIds.filter((id) => bookmarks.includes(id)) : dueIds,
    [bookmarks, dueIds, savedOnly],
  );
  const activeWord = N5_VOCABULARY.find((entry) => entry.id === activeQueue[0]);
  const masteredCount = Object.values(reviews).filter(isVocabularyMastered).length;
  const nextFutureReview = Object.values(reviews)
    .map((review) => new Date(review.dueAt))
    .filter((date) => date.getTime() > Date.now())
    .sort((a, b) => a.getTime() - b.getTime())[0];

  function rateCard(rating: VocabularyReviewRating) {
    if (!activeWord) return;
    const record = scheduleVocabularyReview(activeWord.id, reviews[activeWord.id], rating);
    const nextReviews = { ...reviews, [activeWord.id]: record };
    setReviews(nextReviews);
    setLocalStorageItem(STORAGE_KEYS.VOCAB_REVIEWS, nextReviews);
    setDueIds((current) => current.filter((id) => id !== activeWord.id));
    setFlipped(false);
    setReviewedCount((count) => count + 1);
    setLastScheduled(rating === 'again' ? 'Again — reset and queued for a short retry.' : `Next review in ${record.intervalDays} day${record.intervalDays === 1 ? '' : 's'}.`);
    const nextMasteredCount = Object.values(nextReviews).filter(isVocabularyMastered).length;
    if (nextMasteredCount !== progress.vocabularyMasteredCount) {
      updateProgress({ vocabularyMasteredCount: nextMasteredCount });
    }
  }

  if (!isMounted) {
    return (
      <div className="mx-auto w-full max-w-5xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8" aria-label="Loading flashcards">
        <div className="h-32 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  const showEnglish = preferences.languageMode === 'en' || preferences.languageMode === 'all';
  const showBangla = preferences.languageMode === 'bn' || preferences.languageMode === 'all';

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-brand-700 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <RotateCcw className="h-4 w-4" />
          Spaced repetition
        </div>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black sm:text-4xl">Flashcard review</h1>
            <p className="mt-2 max-w-xl text-sm text-white/80">
              Recall first, reveal the answer, then choose how well you knew it. Your next review is scheduled automatically.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
              <div className="text-2xl font-black">{dueIds.length}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/75">Due now</div>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 text-center backdrop-blur">
              <div className="text-2xl font-black">{masteredCount}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/75">Mastered</div>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-7 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">N5 deck</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {activeQueue.length ? `${activeQueue.length} card${activeQueue.length === 1 ? '' : 's'} in this session` : `${reviewedCount} reviewed this session`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setSavedOnly((value) => !value); setFlipped(false); }}
            aria-pressed={savedOnly}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              savedOnly ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${savedOnly ? 'fill-current' : ''}`} />
            {savedOnly ? 'Saved words only' : 'Review saved words'}
          </button>
        </div>

        {activeWord ? (
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setFlipped((value) => !value)}
              aria-pressed={flipped}
              aria-label={flipped ? 'Show the Japanese prompt' : 'Reveal the answer'}
              className="relative block h-[300px] w-full rounded-3xl text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-brand-300 sm:h-[340px]"
              style={{ perspective: '1200px' }}
            >
              <span
                className="absolute inset-0 transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <span
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-indigo-50 p-6 text-center shadow-inner dark:border-brand-900 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {activeWord.category} · {activeWord.level}
                  </span>
                  <span className="mt-5 font-jp text-6xl font-black text-slate-900 dark:text-white">{activeWord.japanese}</span>
                  {preferences.showRomaji && <span className="mt-2 font-jp text-sm text-slate-500">{activeWord.reading} · {activeWord.romaji}</span>}
                  <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">Think of the meaning, then tap to reveal</span>
                </span>
                <span
                  className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 text-center shadow-inner dark:border-emerald-900 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Answer</span>
                  {showEnglish && <span className="mt-3 text-xl font-black text-slate-900 dark:text-white">{activeWord.meaningEn}</span>}
                  {showBangla && <span className="mt-1 text-lg font-semibold text-slate-700 dark:text-slate-200">{activeWord.meaningBn}</span>}
                  <span className="mt-4 font-jp text-lg font-bold text-emerald-800 dark:text-emerald-300">{activeWord.exampleJa}</span>
                  {preferences.showRomaji && <span className="mt-1 font-jp text-xs text-slate-500">{activeWord.exampleReading}</span>}
                  {showEnglish && <span className="mt-2 text-sm text-slate-600 dark:text-slate-300">{activeWord.exampleEn}</span>}
                  {showBangla && <span className="mt-1 text-sm text-slate-500">{activeWord.exampleBn}</span>}
                </span>
              </span>
            </button>

            {flipped && (
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => playSpeech(activeWord.japanese)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Volume2 className="h-4 w-4 text-brand-600" />
                  Play pronunciation
                </button>
                <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                  {ratings.map((rating) => (
                    <button
                      key={rating.value}
                      type="button"
                      onClick={() => rateCard(rating.value)}
                      className={`rounded-xl border px-4 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${rating.tone}`}
                    >
                      {rating.label}
                      <span className="mt-0.5 block text-[10px] font-medium opacity-70">
                        {rating.value === 'again' ? 'Retry soon' : rating.value === 'hard' ? '1 day' : rating.value === 'good' ? '3–7 days' : '14–30 days'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-950/40">
            {savedOnly && dueIds.length > 0 ? (
              <>
                <Bookmark className="mx-auto h-8 w-8 text-amber-500" />
                <h2 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">No saved cards are due</h2>
                <p className="mt-1 text-sm text-slate-500">Save a word in the vocabulary library or switch back to all due cards.</p>
              </>
            ) : (
              <>
                <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-500" />
                <h2 className="mt-3 text-xl font-black text-slate-800 dark:text-white">You’re all caught up</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {nextFutureReview
                    ? `Your next scheduled card is ${nextFutureReview.toLocaleString()}.`
                    : 'New vocabulary cards will appear here as you study.'}
                </p>
                {lastScheduled && <p className="mt-3 text-xs font-semibold text-emerald-700">{lastScheduled}</p>}
              </>
            )}
            {savedOnly && (
              <button type="button" onClick={() => setSavedOnly(false)} className="mt-4 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
                Review all due cards
              </button>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />Again resets and returns in about 10 minutes</span>
          <span>Reviewed this session: {reviewedCount}</span>
        </div>
      </section>
    </div>
  );
}
