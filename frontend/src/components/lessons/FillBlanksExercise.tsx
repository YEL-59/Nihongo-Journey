'use client';

import { useState } from 'react';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { FillBlanksExercise as FillBlanksType } from '@/content/shared/types';
import { cn } from '@/lib/utils';

interface Props {
  exercise: FillBlanksType;
  languageMode: 'all' | 'bn' | 'en';
  onAnswer: (correct: boolean) => void;
}

export default function FillBlanksExercise({ exercise, languageMode, onAnswer }: Props) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = answer.trim().toLowerCase() === exercise.answer.trim().toLowerCase();

  function handleSubmit() {
    if (!answer.trim()) return;
    setSubmitted(true);
    onAnswer(isCorrect);
  }

  function handleReset() {
    setAnswer('');
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex-shrink-0 rounded-full bg-indigo-100 p-1.5 text-indigo-600">
          <HelpCircle className="h-4 w-4" />
        </span>
        <div>
          <p className="font-medium text-slate-800 leading-relaxed">{exercise.promptEn}</p>
          <p className="mt-2 font-japanese text-lg text-indigo-700">{exercise.promptJa}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Your answer</label>
        <input
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          disabled={submitted}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          placeholder="Type the answer"
        />
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className={cn(
            'rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
            answer.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'cursor-not-allowed bg-slate-100 text-slate-400',
          )}
        >
          Check Answer
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Try Again
          </button>
        </div>
      )}

      {submitted && (
        <div className={cn(
          'rounded-xl border px-4 py-3 text-sm leading-relaxed',
          isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800',
        )}>
          <p className="mb-1 flex items-center gap-2 font-semibold">
            {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {isCorrect ? 'Correct answer!' : 'Not quite — try again.'}
          </p>
          {exercise.hint && <p className="text-xs text-slate-600">Hint: {exercise.hint}</p>}
          {(languageMode === 'en' || languageMode === 'all') && <p>{exercise.explanationEn}</p>}
          {(languageMode === 'bn' || languageMode === 'all') && <p className="mt-1">{exercise.explanationBn}</p>}
        </div>
      )}
    </div>
  );
}
