'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  STORAGE_KEYS,
  UserPreferences,
  UserProfile,
  LearningProgress,
  LevelProgressSnapshot,
  DailyActivity,
  DEFAULT_PREFERENCES,
  DEFAULT_PROFILE,
  DEFAULT_PROGRESS,
  DEFAULT_DAILY_ACTIVITY,
  getLocalStorageItem,
  setLocalStorageItem,
  LearningLanguageMode,
  isAudioPlaybackSpeed,
} from '@/lib/storage';
import { JLPT_LEVELS, isLevelSelectable } from '@/content/shared/registry';
import type { JLPTLevel } from '@/content/shared/types';

interface AppContextType {
  preferences: UserPreferences;
  profile: UserProfile;
  progress: LearningProgress;
  dailyActivity: DailyActivity;
  isMounted: boolean;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateProgress: (updates: Partial<LearningProgress>) => void;
  getLevelProgress: (level?: JLPTLevel) => LevelProgressSnapshot;
  updateLevelProgress: (level: JLPTLevel, updates: Partial<LevelProgressSnapshot>) => void;
  setLanguageMode: (mode: LearningLanguageMode) => void;
  toggleRomaji: () => void;
  toggleSidebar: () => void;
  playSpeech: (japaneseText: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [progress, setProgress] = useState<LearningProgress>(DEFAULT_PROGRESS);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity>(DEFAULT_DAILY_ACTIVITY);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    const storedPrefs = getLocalStorageItem<Partial<UserPreferences>>(STORAGE_KEYS.PREFERENCES, {});
    const loadedPrefs: UserPreferences = {
      ...DEFAULT_PREFERENCES,
      ...storedPrefs,
      audioSpeed: isAudioPlaybackSpeed(storedPrefs.audioSpeed) ? storedPrefs.audioSpeed : DEFAULT_PREFERENCES.audioSpeed,
    };
    const storedProfileValue = getLocalStorageItem<Partial<UserProfile> | null>(STORAGE_KEYS.PROFILE, {});
    const storedProfile = storedProfileValue
      && typeof storedProfileValue === 'object'
      && !Array.isArray(storedProfileValue)
      ? storedProfileValue
      : {};
    if (storedProfileValue === null || storedProfile !== storedProfileValue) {
      console.warn('Ignoring malformed stored user profile.');
    }
    const targetLevel = JLPT_LEVELS.find(({ level }) => level === storedProfile.targetLevel)?.level
      ?? DEFAULT_PROFILE.targetLevel;
    const storedCurrentLevel = JLPT_LEVELS.find(({ level }) => level === storedProfile.currentLevel)?.level;
    const currentLevel = storedCurrentLevel && isLevelSelectable(storedCurrentLevel)
      ? storedCurrentLevel
      : DEFAULT_PROFILE.currentLevel;
    const loadedProfile: UserProfile = {
      ...DEFAULT_PROFILE,
      ...storedProfile,
      currentLevel,
      targetLevel,
    };
    const loadedProgress = getLocalStorageItem<LearningProgress>(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS);
    const loadedActivity = getLocalStorageItem<DailyActivity>(STORAGE_KEYS.DAILY_ACTIVITY, DEFAULT_DAILY_ACTIVITY);

    setPreferences(loadedPrefs);
    setProfile(loadedProfile);
    setProgress(loadedProgress);
    setDailyActivity(loadedActivity);

    // Apply dark/light theme class to document element
    if (loadedPrefs.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updates };
      setLocalStorageItem(STORAGE_KEYS.PREFERENCES, next);
      if (updates.theme) {
        if (updates.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      setLocalStorageItem(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  }, []);

  const updateProgress = useCallback((updates: Partial<LearningProgress>) => {
    setProgress((prev) => {
      const next = { ...prev, ...updates };
      setLocalStorageItem(STORAGE_KEYS.PROGRESS, next);
      return next;
    });
  }, []);

  const getLevelProgress = useCallback(
    (level?: JLPTLevel): LevelProgressSnapshot => {
      const target = level ?? profile.currentLevel;
      const scoped = progress.levelProgress?.[target];
      if (scoped) return scoped;
      if (target === 'N5') {
        return {
          currentLessonId: progress.currentLessonId ?? 1,
          completedLessons: progress.completedLessons ?? [],
          completedSections: progress.completedSections ?? {},
        };
      }
      return {
        currentLessonId: 1,
        completedLessons: [],
        completedSections: {},
      };
    },
    [profile.currentLevel, progress],
  );

  const updateLevelProgress = useCallback(
    (level: JLPTLevel, updates: Partial<LevelProgressSnapshot>) => {
      setProgress((prev) => {
        const currentScoped: LevelProgressSnapshot =
          prev.levelProgress?.[level] ??
          (level === 'N5'
            ? {
                currentLessonId: prev.currentLessonId ?? 1,
                completedLessons: prev.completedLessons ?? [],
                completedSections: prev.completedSections ?? {},
              }
            : {
                currentLessonId: 1,
                completedLessons: [],
                completedSections: {},
              });
        const nextScoped: LevelProgressSnapshot = { ...currentScoped, ...updates };
        const next: LearningProgress = {
          ...prev,
          ...(level === 'N5' ? nextScoped : {}),
          levelProgress: {
            ...(prev.levelProgress ?? {}),
            [level]: nextScoped,
          },
        };
        setLocalStorageItem(STORAGE_KEYS.PROGRESS, next);
        return next;
      });
    },
    [],
  );

  const setLanguageMode = useCallback((mode: LearningLanguageMode) => {
    updatePreferences({ languageMode: mode });
  }, [updatePreferences]);

  const toggleRomaji = useCallback(() => {
    updatePreferences({ showRomaji: !preferences.showRomaji });
  }, [preferences.showRomaji, updatePreferences]);

  const toggleSidebar = useCallback(() => {
    updatePreferences({ sidebarCollapsed: !preferences.sidebarCollapsed });
  }, [preferences.sidebarCollapsed, updatePreferences]);

  // Audio speech synthesis helper using Web Speech API
  const playSpeech = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = preferences.audioSpeed;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }, [preferences.audioSpeed]);

  return (
    <AppContext.Provider
      value={{
        preferences,
        profile,
        progress,
        dailyActivity,
        isMounted,
        updatePreferences,
        updateProfile,
        updateProgress,
        getLevelProgress,
        updateLevelProgress,
        setLanguageMode,
        toggleRomaji,
        toggleSidebar,
        playSpeech,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
