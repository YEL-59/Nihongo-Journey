'use client';

import { useState } from 'react';
import { BookOpen, Languages } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import StudyLabSkeleton from '@/components/skills/StudyLabSkeleton';
import { N5_READINGS } from '@/content/levels/n5';
import { ReadingPassage } from '@/content/shared/types';

function FuriganaLine({ segments, showFurigana }: { segments: ReadingPassage['lines'][number]; showFurigana: boolean }) {
  return (
    <p className="font-jp text-lg leading-loose text-slate-900 dark:text-white sm:text-xl">
      {segments.map((segment, index) => (
        <span key={`${segment.text}-${index}`}>
          {showFurigana && segment.reading ? (
            <ruby>{segment.text}<rt className="text-[10px] font-normal text-brand-600">{segment.reading}</rt></ruby>
          ) : segment.text}
        </span>
      ))}
    </p>
  );
}

export default function ReadingPage() {
  const { isMounted } = useApp();
  const [showFurigana, setShowFurigana] = useState(true);
  const [translations, setTranslations] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  function toggleTranslation(id: string) {
    setTranslations((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  if (!isMounted) return <StudyLabSkeleton cards={2} />;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <BookOpen className="h-4 w-4" />
          JLPT N5 Reading Lab
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Read a little every day</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Read short original passages, reveal furigana and translations when you need support, then check your understanding.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowFurigana((value) => !value)}
            aria-pressed={showFurigana}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <Languages className="h-4 w-4" />
            Furigana: {showFurigana ? 'On' : 'Off'}
          </button>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-2" aria-label="Reading passages">
        {N5_READINGS.map((passage) => (
          <article key={passage.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
                  N5 · {passage.difficulty} · {passage.topic}
                </span>
                <h2 className="mt-3 text-xl font-black text-slate-900 dark:text-white">{passage.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => toggleTranslation(passage.id)}
                aria-pressed={translations.includes(passage.id)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-slate-700 dark:text-slate-200"
              >
                {translations.includes(passage.id) ? 'Hide translation' : 'Reveal translation'}
              </button>
            </div>

            <div className="mt-4 space-y-2 rounded-2xl bg-emerald-50/70 p-4 dark:bg-emerald-950/20">
              {passage.lines.map((line, index) => <FuriganaLine key={index} segments={line} showFurigana={showFurigana} />)}
            </div>

            {translations.includes(passage.id) && (
              <div className="mt-3 rounded-xl border border-emerald-100 bg-white p-4 text-sm dark:border-emerald-950 dark:bg-slate-950/50" aria-live="polite">
                <p className="text-slate-700 dark:text-slate-200"><span className="font-bold">EN:</span> {passage.translationEn}</p>
                <p className="mt-2 text-slate-600 dark:text-slate-300"><span className="font-bold">BN:</span> {passage.translationBn}</p>
              </div>
            )}

            <div className="mt-5 space-y-4">
              {passage.questions.map((question, questionIndex) => {
                const key = `${passage.id}-${questionIndex}`;
                const selected = answers[key];
                const isCorrect = selected === question.answer;
                return (
                  <fieldset key={key} className="space-y-2">
                    <legend className="text-sm font-bold text-slate-800 dark:text-slate-100">{questionIndex + 1}. {question.prompt}</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {question.choices.map((choice, choiceIndex) => {
                        const chosen = selected === choiceIndex;
                        const style = selected === undefined
                          ? 'border-slate-200 hover:border-emerald-400 dark:border-slate-700'
                          : choiceIndex === question.answer
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100'
                            : chosen
                              ? 'border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-100'
                              : 'border-slate-200 opacity-70 dark:border-slate-700';
                        return (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => setAnswers((current) => ({ ...current, [key]: choiceIndex }))}
                            aria-pressed={chosen}
                            className={`min-h-10 rounded-xl border px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 ${style}`}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                    {selected !== undefined && (
                      <p role="status" className={`rounded-lg px-3 py-2 text-xs ${isCorrect ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200'}`}>
                        {isCorrect ? 'Correct!' : 'Not quite.'} {question.explanationEn} {question.explanationBn}
                      </p>
                    )}
                  </fieldset>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
