'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import { N5_GRAMMAR } from '@/content/levels/n5';

export default function GrammarPage() {
  const [query, setQuery] = useState('');
  const [lesson, setLesson] = useState('All');

  const lessons = Array.from(new Set(N5_GRAMMAR.map((item) => item.lesson))).sort((a, b) => a - b);
  const patterns = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return N5_GRAMMAR.filter((item) => {
      const matchesLesson = lesson === 'All' || item.lesson === Number(lesson);
      const matchesQuery = !term || [
        item.pattern,
        item.title,
        item.formation,
        item.explanationEn,
        item.explanationBn,
        item.mistakeEn,
        item.mistakeBn,
        ...item.particles,
        ...item.examples.flatMap((example) => [example.japanese, example.meaningEn, example.meaningBn]),
      ].some((value) => value.toLocaleLowerCase().includes(term));
      return matchesLesson && matchesQuery;
    });
  }, [lesson, query]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-brand-700 via-indigo-700 to-violet-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <BookOpen className="h-4 w-4" />
          JLPT N5 Grammar Library
        </div>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black sm:text-4xl">Build clear sentences</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              Learn a pattern, notice the particles, then compare positive, negative, and question forms.
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur">
            {N5_GRAMMAR.length} N5 patterns
          </div>
        </div>
      </header>

      <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[minmax(0,1fr)_200px]">
        <label className="relative block">
          <span className="sr-only">Search grammar patterns</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a pattern, particle, or example..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-950"
          />
        </label>
        <label className="text-xs font-semibold text-slate-500">
          Lesson
          <select
            value={lesson}
            onChange={(event) => setLesson(event.target.value)}
            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="All">All lessons</option>
            {lessons.map((item) => <option key={item} value={item}>Lesson {item}</option>)}
          </select>
        </label>
        <p className="text-xs text-slate-500 sm:col-span-2" aria-live="polite">
          {patterns.length} {patterns.length === 1 ? 'pattern' : 'patterns'} found
        </p>
      </section>

      {patterns.length ? (
        <section className="grid gap-4 xl:grid-cols-2" aria-label="Grammar patterns">
          {patterns.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                    N5 · Lesson {item.lesson}
                  </span>
                  <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h2>
                </div>
                <span className="font-jp rounded-xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-200">
                  {item.pattern}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-950/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Formation</p>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{item.formation}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.explanationEn}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.explanationBn}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2" aria-label="Particles and grammar markers">
                {item.particles.map((particle) => (
                  <span key={particle} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                    {particle}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {item.examples.map((example) => (
                  <div key={example.label} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{example.label}</p>
                    <p className="mt-2 font-jp text-sm font-semibold text-slate-900 dark:text-white">{example.japanese}</p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{example.meaningEn}</p>
                    <p className="mt-1 text-xs text-slate-500">{example.meaningBn}</p>
                  </div>
                ))}
              </div>

              <details className="group mt-4 rounded-xl border border-rose-100 bg-rose-50/70 p-3 open:bg-rose-50 dark:border-rose-950 dark:bg-rose-950/20">
                <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-rose-800 dark:text-rose-200">
                  <Sparkles className="h-4 w-4" />
                  Common mistake
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-rose-900 dark:text-rose-100">{item.mistakeEn}</p>
                <p className="mt-1 text-sm leading-relaxed text-rose-800 dark:text-rose-200">{item.mistakeBn}</p>
              </details>
            </article>
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="font-bold text-slate-800 dark:text-white">No patterns match your search</p>
          <p className="mt-1 text-sm text-slate-500">Try another keyword or choose all lessons.</p>
        </div>
      )}
    </div>
  );
}
