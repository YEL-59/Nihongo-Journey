'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  STORAGE_KEYS,
  UserPreferences,
  UserProfile,
  LearningProgress,
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

interface AppContextType {
  preferences: UserPreferences;
  profile: UserProfile;
  progress: LearningProgress;
  dailyActivity: DailyActivity;
  isMounted: boolean;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateProgress: (updates: Partial<LearningProgress>) => void;
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
    const loadedProfile = getLocalStorageItem<UserProfile>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
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
