'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { SentenceOrderExercise as SentenceOrderType } from '@/content/shared/types';
import { cn } from '@/lib/utils';

interface Props {
  exercise: SentenceOrderType;
  languageMode: 'all' | 'bn' | 'en';
  onAnswer: (correct: boolean) => void;
}

export default function SentenceOrderExercise({ exercise, languageMode, onAnswer }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [used, setUsed] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const available = useMemo(
    () => exercise.parts.filter((part) => !used.includes(part)),
    [exercise.parts, used],
  );

  const isCorrect = JSON.stringify(selected) === JSON.stringify(exercise.correctOrder);

  function handleAdd(part: string) {
    if (submitted || used.includes(part)) return;
    setUsed((current) => [...current, part]);
    setSelected((current) => [...current, part]);
  }

  function handleReset() {
    setSelected([]);
    setUsed([]);
    setSubmitted(false);
  }

  function handleSubmit() {
    if (selected.length !== exercise.parts.length) return;
    setSubmitted(true);
    onAnswer(isCorrect);
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex-shrink-0 rounded-full bg-indigo-100 p-1.5 text-indigo-600">
          <HelpCircle className="h-4 w-4" />
        </span>
        <div>
          <p className="font-medium text-slate-800 leading-relaxed">{exercise.instructionEn}</p>
          <p className="mt-1 text-sm text-slate-500">{exercise.instructionBn}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Build the sentence</p>
        <div className="flex min-h-14 flex-wrap gap-2">
          {selected.length ? (
            selected.map((part, index) => (
              <span key={`${part}-${index}`} className="rounded-full bg-brand-100 px-3 py-1.5 text-sm font-medium text-brand-700">
                {part}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">No words selected yet</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Available parts</p>
        <div className="flex flex-wrap gap-2">
          {available.map((part) => (
            <button
              key={part}
              type="button"
              disabled={submitted}
              onClick={() => handleAdd(part)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {part}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted || selected.length !== exercise.parts.length}
          className={cn(
            'rounded-xl px-5 py-2.5 text-sm font-semibold transition-all',
            selected.length === exercise.parts.length ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'cursor-not-allowed bg-slate-100 text-slate-400',
          )}
        >
          Check Order
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      {submitted && (
        <div className={cn(
          'rounded-xl border px-4 py-3 text-sm leading-relaxed',
          isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800',
        )}>
          <p className="mb-1 flex items-center gap-2 font-semibold">
            {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {isCorrect ? 'Correct order!' : 'The order is off.'}
          </p>
          {(languageMode === 'en' || languageMode === 'all') && <p>{exercise.explanationEn}</p>}
          {(languageMode === 'bn' || languageMode === 'all') && <p className="mt-1">{exercise.explanationBn}</p>}
        </div>
      )}
    </div>
  );
}
