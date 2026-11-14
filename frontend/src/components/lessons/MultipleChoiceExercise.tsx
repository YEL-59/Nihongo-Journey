'use client';

import React, { useState } from 'react';
import { MCQExercise } from '@/content/shared/types';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Props {
  exercise: MCQExercise;
  onAnswer: (correct: boolean) => void;
  languageMode: 'all' | 'bn' | 'en';
  showRomaji: boolean;
}

export default function MultipleChoiceExercise({ exercise, onAnswer, languageMode }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === exercise.correctId;

  function handleSelect(id: string) {
    if (submitted) return;
    setSelected(id);
  }

  function handleSubmit() {
    if (!selected || submitted) return;
    setSubmitted(true);
    onAnswer(selected === exercise.correctId);
  }

  function handleReset() {
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm space-y-5">
      {/* Question */}
      <div className="space-y-1">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 rounded-full bg-indigo-100 p-1.5 text-indigo-600">
            <HelpCircle className="h-4 w-4" />
          </span>
          <div>
            <p className="font-medium text-slate-800 leading-relaxed">{exercise.questionEn}</p>
            {exercise.questionJa && (
              <p className="mt-1 text-indigo-700 font-japanese text-lg">{exercise.questionJa}</p>
            )}
          </div>
        </div>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {exercise.choices.map((choice) => {
          const isSelected = selected === choice.id;
          const isRight = submitted && choice.id === exercise.correctId;
          const isWrong = submitted && isSelected && !isCorrect;

          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice.id)}
              disabled={submitted}
              className={cn(
                'relative flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                !submitted && !isSelected && 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50',
                !submitted && isSelected && 'border-indigo-500 bg-indigo-50 text-indigo-800',
                isRight && 'border-emerald-500 bg-emerald-50 text-emerald-800',
                isWrong && 'border-red-400 bg-red-50 text-red-700',
                submitted && !isSelected && choice.id !== exercise.correctId && 'border-slate-100 bg-slate-50 text-slate-400 opacity-60',
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  !submitted && 'bg-white text-slate-500 border border-slate-200',
                  submitted && isRight && 'bg-emerald-500 text-white',
                  submitted && isWrong && 'bg-red-400 text-white',
                  submitted && !isSelected && choice.id !== exercise.correctId && 'bg-white text-slate-400 border border-slate-200',
                )}
              >
                {choice.id.toUpperCase()}
              </span>
              <span className="font-japanese text-base">{choice.text}</span>
              {submitted && isRight && <CheckCircle className="ml-auto h-5 w-5 text-emerald-500 flex-shrink-0" />}
              {submitted && isWrong && <XCircle className="ml-auto h-5 w-5 text-red-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation after submit */}
      {submitted && (
        <div
          className={cn(
            'rounded-xl px-4 py-3 text-sm leading-relaxed',
            isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200',
          )}
        >
          <p className="font-semibold mb-1">{isCorrect ? '✅ Correct!' : '❌ Not quite!'}</p>
          {(languageMode === 'en' || languageMode === 'all') && (
            <p>{exercise.explanationEn}</p>
          )}
          {(languageMode === 'bn' || languageMode === 'all') && (
            <p className="mt-1 text-sm">{exercise.explanationBn}</p>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className={cn(
              'rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
              selected
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed',
            )}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
