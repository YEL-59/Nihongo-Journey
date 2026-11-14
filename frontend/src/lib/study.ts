import {
  VocabularyReviewRating,
  VocabularyReviewRecord,
  VocabularyReviewStore,
} from '@/lib/storage';

const INITIAL_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

const QUALITY_BY_RATING: Record<VocabularyReviewRating, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

function isReviewRating(value: unknown): value is VocabularyReviewRating {
  return value === 'again' || value === 'hard' || value === 'good' || value === 'easy';
}

export function normalizeVocabularyReviewStore(value: unknown): VocabularyReviewStore {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const reviews: VocabularyReviewStore = {};
  for (const [wordId, candidate] of Object.entries(value)) {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) continue;
    const record = candidate as Record<string, unknown>;
    const dueAt = typeof record.dueAt === 'string' ? Date.parse(record.dueAt) : NaN;
    const reviewedAt = typeof record.lastReviewedAt === 'string' ? Date.parse(record.lastReviewedAt) : NaN;
    const intervalDays = record.intervalDays;
    const repetitions = record.repetitions;
    const easeFactor = record.easeFactor;
    const lapses = record.lapses;

    if (
      record.wordId !== wordId ||
      typeof record.dueAt !== 'string' ||
      !Number.isFinite(dueAt) ||
      typeof record.lastReviewedAt !== 'string' ||
      !Number.isFinite(reviewedAt) ||
      typeof intervalDays !== 'number' ||
      !Number.isFinite(intervalDays) ||
      intervalDays < 0 ||
      typeof repetitions !== 'number' ||
      !Number.isInteger(repetitions) ||
      repetitions < 0 ||
      typeof easeFactor !== 'number' ||
      !Number.isFinite(easeFactor) ||
      easeFactor < MIN_EASE_FACTOR ||
      typeof lapses !== 'number' ||
      !Number.isInteger(lapses) ||
      lapses < 0 ||
      !isReviewRating(record.lastRating)
    ) {
      continue;
    }

    reviews[wordId] = {
      wordId,
      dueAt: record.dueAt,
      intervalDays,
      repetitions,
      easeFactor,
      lapses,
      lastRating: record.lastRating,
      lastReviewedAt: record.lastReviewedAt,
    };
  }
  return reviews;
}

export function normalizeSavedIds(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function nextIntervalDays(
  rating: VocabularyReviewRating,
  repetitions: number,
  previousInterval: number,
  easeFactor: number,
): number {
  if (rating === 'again') return 10 / (24 * 60);
  if (rating === 'hard') return 1;
  if (rating === 'good') {
    if (repetitions === 0) return 3;
    if (repetitions === 1) return 7;
    return Math.max(1, Math.round(previousInterval * easeFactor));
  }
  if (repetitions === 0) return 14;
  if (repetitions === 1) return 30;
  return Math.max(1, Math.round(previousInterval * easeFactor * 1.3));
}

export function scheduleVocabularyReview(
  wordId: string,
  previous: VocabularyReviewRecord | undefined,
  rating: VocabularyReviewRating,
  reviewedAt = new Date(),
): VocabularyReviewRecord {
  const previousEase = previous?.easeFactor ?? INITIAL_EASE_FACTOR;
  const quality = QUALITY_BY_RATING[rating];
  const easeFactor = Math.max(
    MIN_EASE_FACTOR,
    previousEase + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
  );
  const repetitions = rating === 'again' ? 0 : (previous?.repetitions ?? 0) + 1;
  const intervalDays = nextIntervalDays(
    rating,
    previous?.repetitions ?? 0,
    previous?.intervalDays ?? 0,
    easeFactor,
  );
  const dueAt = new Date(reviewedAt.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    wordId,
    dueAt: dueAt.toISOString(),
    intervalDays,
    repetitions,
    easeFactor,
    lapses: (previous?.lapses ?? 0) + (rating === 'again' ? 1 : 0),
    lastRating: rating,
    lastReviewedAt: reviewedAt.toISOString(),
  };
}

export function isVocabularyMastered(record: VocabularyReviewRecord): boolean {
  return record.repetitions >= 2 && record.intervalDays >= 7;
}

export function getDueVocabularyIds(
  wordIds: string[],
  reviews: Record<string, VocabularyReviewRecord>,
  now = new Date(),
): string[] {
  return wordIds.filter((wordId) => {
    const review = reviews[wordId];
    return !review || new Date(review.dueAt).getTime() <= now.getTime();
  });
}
