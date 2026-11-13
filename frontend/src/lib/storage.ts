// Storage keys defined in requirements.md
export const STORAGE_KEYS = {
  PROFILE: 'nihongo_user_profile',
  PREFERENCES: 'nihongo_user_preferences',
  PROGRESS: 'nihongo_learning_progress',
  VOCAB_REVIEWS: 'nihongo_vocabulary_reviews',
  KANJI_PROGRESS: 'nihongo_kanji_progress',
  QUIZ_HISTORY: 'nihongo_quiz_history',
  STUDY_SESSIONS: 'nihongo_study_sessions',
  DAILY_ACTIVITY: 'nihongo_daily_activity',
  BOOKMARKS: 'nihongo_bookmarks',
  SCHEDULE: 'nihongo_schedule',
  KANA_MASTERY: 'nihongo_kana_mastery',
} as const;

export type LearningLanguageMode = 'all' | 'bn' | 'en';

export interface UserPreferences {
  languageMode: LearningLanguageMode;
  showRomaji: boolean;
  autoPlayAudio: boolean;
  theme: 'light' | 'dark' | 'system';
  dailyTargetMinutes: number;
  sidebarCollapsed: boolean;
}

export interface UserProfile {
  name: string;
  targetLevel: 'N5' | 'N4' | 'N3';
  startedAt: string;
  hasCompletedOnboarding: boolean;
  avatarSeed?: string;
  studyGoal: string;
}

export interface DailyActivity {
  currentStreak: number;
  lastActiveDate: string;
  history: Record<string, number>; // YYYY-MM-DD -> minutes studied
}

export interface LearningProgress {
  currentLessonId: number;
  completedLessons: number[];
  completedSections: Record<number, string[]>; // lessonId -> sectionIds
  vocabularyMasteredCount: number;
  kanjiMasteredCount: number;
  grammarPointsLearnedCount: number;
  streakDays: number;
}

export interface KanaMasteryData {
  mastered: string[]; // List of character IDs e.g. 'h-a', 'k-ka'
  quizScores: Array<{
    date: string;
    type: 'hiragana' | 'katakana' | 'all';
    score: number;
    total: number;
  }>;
}

export const DEFAULT_KANA_MASTERY: KanaMasteryData = {
  mastered: [],
  quizScores: [],
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  languageMode: 'all',
  showRomaji: true,
  autoPlayAudio: true,
  theme: 'light',
  dailyTargetMinutes: 30,
  sidebarCollapsed: false,
};

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Learner',
  targetLevel: 'N5',
  startedAt: new Date().toISOString(),
  hasCompletedOnboarding: false,
  studyGoal: 'Pass JLPT N5 & Study/Work in Japan',
};

export const DEFAULT_DAILY_ACTIVITY: DailyActivity = {
  currentStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  history: {
    [new Date().toISOString().split('T')[0]]: 15,
  },
};

export const DEFAULT_PROGRESS: LearningProgress = {
  currentLessonId: 1,
  completedLessons: [],
  completedSections: {},
  vocabularyMasteredCount: 12,
  kanjiMasteredCount: 5,
  grammarPointsLearnedCount: 3,
  streakDays: 1,
};

// Safe LocalStorage Helpers
export function getLocalStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return fallback;
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key "${key}":`, err);
  }
}

export function removeLocalStorageItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.warn(`Error removing localStorage key "${key}":`, err);
  }
}

// Export all user data as JSON
export function exportAllData(): string {
  if (typeof window === 'undefined') return '{}';
  const data: Record<string, unknown> = {};
  Object.values(STORAGE_KEYS).forEach((key) => {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      try {
        data[key] = JSON.parse(raw);
      } catch {
        data[key] = raw;
      }
    }
  });
  return JSON.stringify(data, null, 2);
}

// Import user data from JSON
export function importAllData(jsonData: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const parsed = JSON.parse(jsonData);
    Object.keys(parsed).forEach((key) => {
      window.localStorage.setItem(key, JSON.stringify(parsed[key]));
    });
    return true;
  } catch (err) {
    console.error('Failed to import user data:', err);
    return false;
  }
}

// Reset all user data
export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    window.localStorage.removeItem(key);
  });
}
