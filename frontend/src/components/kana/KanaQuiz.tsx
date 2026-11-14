'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  HelpCircle,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Flame,
  ArrowRight,
  Sparkles,
  Headphones,
} from 'lucide-react';
import { KanaCharacter, KanaType } from '@/content/shared/kana';
import { useApp } from '@/context/AppContext';
import { STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem, KanaMasteryData, DEFAULT_KANA_MASTERY } from '@/lib/storage';

interface KanaQuizProps {
  characters: KanaCharacter[];
  type: KanaType;
  onCompleteQuiz?: (score: number, total: number) => void;
}

type QuizQuestionMode = 'kana-to-romaji' | 'romaji-to-kana' | 'audio-to-kana';

interface Question {
  target: KanaCharacter;
  mode: QuizQuestionMode;
  options: KanaCharacter[];
  correctAnswer: string;
}

export const KanaQuiz: React.FC<KanaQuizProps> = ({ characters, type, onCompleteQuiz }) => {
  const [quizState, setQuizState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'gojuon' | 'dakuten'>('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  const { playSpeech } = useApp();

  // Filter pool based on category selection
  const pool = useMemo(() => {
    if (categoryFilter === 'gojuon') {
      return characters.filter((c) => c.category === 'gojuon');
    }
    if (categoryFilter === 'dakuten') {
      return characters.filter((c) => c.category === 'dakuten' || c.category === 'handakuten');
    }
    return characters;
  }, [characters, categoryFilter]);

  // Generate randomized questions
  const startQuiz = useCallback(() => {
    if (pool.length < 4) return;

    const shuffledTargets = [...pool].sort(() => 0.5 - Math.random()).slice(0, questionCount);
    const modes: QuizQuestionMode[] = ['kana-to-romaji', 'romaji-to-kana', 'audio-to-kana'];

    const newQuestions: Question[] = shuffledTargets.map((target) => {
      // Pick random question mode
      const mode = modes[Math.floor(Math.random() * modes.length)];

      // Pick 3 random distractors from pool
      const distractors = pool
        .filter((c) => c.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allOptions = [...distractors, target].sort(() => 0.5 - Math.random());
      const correctAnswer = mode === 'kana-to-romaji' ? target.romaji : target.character;

      return {
        target,
        mode,
        options: allOptions,
        correctAnswer,
      };
    });

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setQuizState('running');
  }, [pool, questionCount]);

  // Handle current question audio if in listening mode
  useEffect(() => {
    if (quizState === 'running' && questions[currentIndex]?.mode === 'audio-to-kana') {
      playSpeech(questions[currentIndex].target.character);
    }
  }, [quizState, currentIndex, questions, playSpeech]);

  // Handle user answer submission
  const handleSelectOption = (answer: string) => {
    if (isAnswerChecked) return;

    setSelectedAnswer(answer);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex];
    const isCorrect = answer === currentQ.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > highestStreak) setHighestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  // Move to next question or complete quiz
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      // Quiz completed
      setQuizState('completed');

      // Save to localStorage
      try {
        const existing = getLocalStorageItem<KanaMasteryData>(
          STORAGE_KEYS.KANA_MASTERY,
          DEFAULT_KANA_MASTERY
        );
        const updated: KanaMasteryData = {
          ...existing,
          quizScores: [
            ...(existing.quizScores || []),
            {
              date: new Date().toISOString(),
              type,
              score,
              total: questions.length,
            },
          ],
        };
        setLocalStorageItem(STORAGE_KEYS.KANA_MASTERY, updated);
      } catch (err) {
        console.warn('Could not save quiz score to localStorage:', err);
      }

      if (onCompleteQuiz) {
        onCompleteQuiz(score, questions.length);
      }
    }
  };

  // -----------------------------------------------------------
  // STATE 1: IDLE / CONFIGURATION SCREEN
  // -----------------------------------------------------------
  if (quizState === 'idle') {
    return (
      <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground">
            {type === 'hiragana' ? 'Hiragana' : 'Katakana'} Mastery Quiz
          </h2>
          <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
            Test character recognition, romaji reading, and listening comprehension with randomized questions and instant feedback.
          </p>
        </div>

        {/* Configuration Options */}
        <div className="space-y-4 text-left max-w-sm mx-auto pt-2">
          {/* Question Count Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Number of Questions:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setQuestionCount(10)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  questionCount === 10
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-muted/10 border-border text-foreground hover:bg-muted/20'
                }`}
              >
                10 Questions (Quick)
              </button>
              <button
                type="button"
                onClick={() => setQuestionCount(20)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  questionCount === 20
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-muted/10 border-border text-foreground hover:bg-muted/20'
                }`}
              >
                20 Questions (Standard)
              </button>
            </div>
          </div>

          {/* Scope / Character Pool */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
              Character Scope:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['all', 'gojuon', 'dakuten'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-muted/10 border-border text-foreground hover:bg-muted/20'
                  }`}
                >
                  {cat === 'all' ? 'All Kana' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={startQuiz}
          className="w-full max-w-sm mx-auto py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start Quiz Now</span>
        </button>
      </div>
    );
  }

  // -----------------------------------------------------------
  // STATE 3: COMPLETED SCREEN
  // -----------------------------------------------------------
  if (quizState === 'completed') {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassing = percentage >= 70;

    return (
      <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-lg text-center space-y-6 animate-in zoom-in-95 duration-200">
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-md ${
            isPassing
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600'
              : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600'
          }`}
        >
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-foreground">
            {isPassing ? 'Omedetou! (Congratulations!)' : 'Good Effort! Keep Practicing!'}
          </h2>
          <p className="text-xs text-muted mt-1">
            You finished the {type === 'hiragana' ? 'Hiragana' : 'Katakana'} test.
          </p>
        </div>

        {/* Score Card */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-border space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Final Accuracy</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {percentage}%
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-muted/20 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isPassing ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-border/60">
            <span className="text-muted">
              Correct: <strong className="text-foreground">{score} / {questions.length}</strong>
            </span>
            <span className="text-muted flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>Best Streak: <strong>{highestStreak}</strong></span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={startQuiz}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
          <button
            type="button"
            onClick={() => setQuizState('idle')}
            className="flex-1 py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted/15 text-foreground font-semibold text-xs transition-colors"
          >
            Change Settings
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------
  // STATE 2: ACTIVE QUESTION SCREEN
  // -----------------------------------------------------------
  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  return (
    <div className="max-w-xl mx-auto p-5 sm:p-7 rounded-3xl bg-card border border-border shadow-lg space-y-6">
      {/* Top Header: Progress Bar & Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-muted uppercase">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="w-24 h-2 rounded-full bg-muted/20 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {streak > 1 && (
            <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400 font-bold animate-pulse">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>{streak} Streak!</span>
            </div>
          )}
          <div className="font-semibold text-muted">
            Score: <strong className="text-foreground">{score}</strong>
          </div>
        </div>
      </div>

      {/* Question Prompt Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-indigo-950/40 dark:to-stone-900 border border-indigo-100 dark:border-indigo-900/40 text-center space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
          {currentQ.mode === 'kana-to-romaji' && 'What is the Romaji reading?'}
          {currentQ.mode === 'romaji-to-kana' && 'Select the matching Kana character:'}
          {currentQ.mode === 'audio-to-kana' && 'Listen and pick the correct Kana:'}
        </div>

        {/* Display Item */}
        {currentQ.mode === 'audio-to-kana' ? (
          <div className="py-4">
            <button
              type="button"
              onClick={() => playSpeech(currentQ.target.character)}
              className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center mx-auto transition-transform active:scale-95 animate-pulse"
              title="Replay audio"
            >
              <Headphones className="w-8 h-8" />
            </button>
            <div className="text-xs text-muted mt-2 font-medium">Click to hear again</div>
          </div>
        ) : (
          <div
            className="text-6xl sm:text-7xl font-black text-indigo-950 dark:text-indigo-100 font-japanese select-none py-2"
            style={{ fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif" }}
          >
            {currentQ.mode === 'kana-to-romaji' ? currentQ.target.character : currentQ.target.romaji}
          </div>
        )}

        {/* Small Audio Helper */}
        {currentQ.mode !== 'audio-to-kana' && (
          <button
            type="button"
            onClick={() => playSpeech(currentQ.target.character)}
            className="inline-flex items-center space-x-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Hear sound</span>
          </button>
        )}
      </div>

      {/* 4 Multiple Choice Options */}
      <div className="grid grid-cols-2 gap-3">
        {currentQ.options.map((option) => {
          const val = currentQ.mode === 'kana-to-romaji' ? option.romaji : option.character;
          const isSelected = selectedAnswer === val;
          const isCorrect = val === currentQ.correctAnswer;

          let btnStyle = 'bg-card border-border hover:border-indigo-300 dark:hover:border-indigo-700 text-foreground';

          if (isAnswerChecked) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-red-500 text-white border-red-600 font-bold';
            } else {
              btnStyle = 'opacity-40 border-border';
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswerChecked}
              onClick={() => handleSelectOption(val)}
              className={`h-16 rounded-2xl border-2 text-xl font-bold flex items-center justify-center transition-all ${btnStyle}`}
            >
              <span style={{ fontFamily: currentQ.mode !== 'kana-to-romaji' ? "'Noto Sans JP', sans-serif" : 'inherit' }}>
                {val}
              </span>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback Alert & Next Button */}
      {isAnswerChecked && (
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-border flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center space-x-2 text-xs">
            {selectedAnswer === currentQ.correctAnswer ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  Correct! ({currentQ.target.character} = "{currentQ.target.romaji}")
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-red-600 dark:text-red-400">
                  Incorrect. Correct answer is <strong>"{currentQ.correctAnswer}"</strong>
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextQuestion}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5 self-end sm:self-auto"
          >
            <span>{currentIndex + 1 === questions.length ? 'See Results' : 'Next Question'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
