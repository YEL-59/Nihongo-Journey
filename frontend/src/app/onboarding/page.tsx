'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Globe2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Languages,
  Award,
  GraduationCap,
  Briefcase,
  Flame,
  Check,
  User,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LearningLanguageMode } from '@/lib/storage';

export default function OnboardingPage() {
  const router = useRouter();
  const { preferences, updatePreferences, profile, updateProfile, updateProgress } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<LearningLanguageMode>(preferences.languageMode || 'all');
  const [selectedDailyMinutes, setSelectedDailyMinutes] = useState<number>(preferences.dailyTargetMinutes || 30);
  const [selectedGoal, setSelectedGoal] = useState<string>(profile.studyGoal || 'Pass JLPT N5 & Study/Work in Japan');
  const [learnerName, setLearnerName] = useState<string>(profile.name === 'Learner' ? '' : profile.name);
  const [startingPoint, setStartingPoint] = useState<'kana' | 'lesson1' | 'review'>('kana');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  const handleNextStep = () => {
    setValidationError('');
    if (step === 1) {
      updatePreferences({ languageMode: selectedLanguage });
      setStep(2);
    } else if (step === 2) {
      updatePreferences({ dailyTargetMinutes: selectedDailyMinutes });
      updateProfile({ studyGoal: selectedGoal });
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setValidationError('');
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleCompleteOnboarding = () => {
    const finalName = learnerName.trim() || 'Learner';

    setIsSubmitting(true);

    // Save profile and mark onboarding as complete
    updateProfile({
      name: finalName,
      hasCompletedOnboarding: true,
      studyGoal: selectedGoal,
      targetLevel: 'N5',
    });

    updatePreferences({
      languageMode: selectedLanguage,
      dailyTargetMinutes: selectedDailyMinutes,
    });

    // If starting with Kana, leave lesson at 1; if know kana, ensure lesson is set
    updateProgress({
      currentLessonId: 1,
    });

    setTimeout(() => {
      if (startingPoint === 'kana') {
        router.push('/hiragana');
      } else {
        router.push('/dashboard');
      }
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
        {/* Top Progress Indicator */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Learner Setup Wizard
            </span>
            <span>Step {step} of 3</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-sakura-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Step Content */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: EXPLANATION LANGUAGE */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Language Pedagogy</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Choose Your Preferred Explanations
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Select which language you want grammar points and vocabulary meanings explained in. You can toggle this anytime in settings.
                </p>
              </div>

              <div className="space-y-3">
                {/* Option 1: All 3 Languages */}
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('all')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 ${
                    selectedLanguage === 'all'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        All 3 Languages (Recommended)
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-600 text-white">
                        Popular
                      </span>
                    </div>
                    <p className="text-xs font-bn text-slate-700 dark:text-slate-300">
                      বাংলা + English + 日本語 — বাংলা ও ইংরেজি উভয় ভাষায় স্পষ্ট ব্যাখ্যা ও উদাহরণ।
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Ideal for Bangladeshi learners targeting Japanese universities, language schools, and visas.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedLanguage === 'all'
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {selectedLanguage === 'all' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* Option 2: Bangla + Japanese */}
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('bn')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 ${
                    selectedLanguage === 'bn'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      বাংলা + 日本語 (Bangla & Japanese)
                    </div>
                    <p className="text-xs font-bn text-slate-700 dark:text-slate-300">
                      সহজ ভাষায় বাংলায় ব্যাকরণ ও শব্দের অর্থ। কোনো জটিল ইংরেজি পরিভাষা ছাড়া।
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Direct explanations written specifically in clear, natural Bengali.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedLanguage === 'bn'
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {selectedLanguage === 'bn' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* Option 3: English + Japanese */}
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('en')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 ${
                    selectedLanguage === 'en'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      English + 日本語 (English & Japanese)
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Standard international textbook pedagogy matching Minna no Nihongo English editions.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedLanguage === 'en'
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {selectedLanguage === 'en' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DAILY TARGET & GOALS */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Habit & Commitment</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Set Your Daily Target & Goal
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Consistency is the secret to Japanese fluency. Choose a daily study time that fits your life.
                </p>
              </div>

              {/* Study Time Options */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Daily Study Commitment:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { minutes: 15, title: 'Casual Pace', desc: '15 mins / day', tag: 'Light' },
                    { minutes: 30, title: 'Balanced Pace', desc: '30 mins / day', tag: 'Recommended' },
                    { minutes: 60, title: 'Intensive Pace', desc: '60 mins / day', tag: 'Fast Track' },
                  ].map((target) => (
                    <button
                      key={target.minutes}
                      type="button"
                      onClick={() => setSelectedDailyMinutes(target.minutes)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        selectedDailyMinutes === target.minutes
                          ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {target.minutes} <span className="text-xs font-normal">min</span>
                      </div>
                      <div className="text-xs font-bold text-brand-600 dark:text-brand-400 mt-1">
                        {target.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {target.tag}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Objective Options */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Primary Learning Objective:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'study_japan', title: 'Study in Japan (University/Language School)', icon: GraduationCap },
                    { id: 'work_japan', title: 'Work in Japan (SSW / TITP / IT Engineer)', icon: Briefcase },
                    { id: 'jlpt_pass', title: 'Pass JLPT N5 Official Examination', icon: Award },
                    { id: 'hobby', title: 'Personal Interest, Anime & Japanese Culture', icon: Sparkles },
                  ].map((goalItem) => {
                    const Icon = goalItem.icon;
                    const isSelected = selectedGoal === goalItem.title;
                    return (
                      <button
                        key={goalItem.id}
                        type="button"
                        onClick={() => setSelectedGoal(goalItem.title)}
                        className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-brand-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {goalItem.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: STARTING POINT & PROFILE */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sakura-50 dark:bg-sakura-950/60 text-sakura-600 dark:text-sakura-300 text-xs font-semibold">
                  <User className="w-3.5 h-3.5" />
                  <span>Profile & Starting Level</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Tell Us About Yourself
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Personalize your dashboard profile and choose where you want to start learning.
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="learner-name"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
                >
                  Your Name / Call Sign:
                </label>
                <input
                  id="learner-name"
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  placeholder="e.g. Tanvir, Sarah, Rahim"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium transition-all"
                  autoFocus
                />
              </div>

              {/* Starting Level Choices */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Where Should We Begin?
                </label>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setStartingPoint('kana')}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                      startingPoint === 'kana'
                        ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        startingPoint === 'kana'
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Languages className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        Absolute Beginner (Start with Kana)
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Zero Japanese knowledge. Start from Hiragana and Katakana charts with stroke orders and audio drills.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStartingPoint('lesson1')}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                      startingPoint === 'lesson1'
                        ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        startingPoint === 'lesson1'
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        I know Kana (Jump to Lesson 1)
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Can already read Hiragana. Start directly with Minna no Nihongo Lesson 1 grammar and sentence patterns.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStartingPoint('review')}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                      startingPoint === 'review'
                        ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        startingPoint === 'review'
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        Reviewing for JLPT N5 (Roadmap & Dashboard)
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Explore full 25-lesson roadmap, Spaced Repetition flashcards, Kanji lab, and mock examinations.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-xs shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCompleteOnboarding}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-sakura-500 hover:from-brand-700 hover:to-sakura-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Dashboard...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Enter Nihongo Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
