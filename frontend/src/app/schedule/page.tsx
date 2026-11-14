'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Bell, CalendarDays, Clock3, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEFAULT_STUDY_SCHEDULE, normalizeStudySchedule, StudyRoutine, StudySchedule } from '@/lib/schedule';
import { STORAGE_KEYS } from '@/lib/storage';

function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number);
  const total = (hours * 60 + mins + minutes) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export default function SchedulePage() {
  const { isMounted, updatePreferences } = useApp();
  const [schedule, setSchedule] = useState<StudySchedule>(DEFAULT_STUDY_SCHEDULE);
  const [titleDrafts, setTitleDrafts] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isMounted) return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        const normalized = normalizeStudySchedule(parsed);
        if (!normalized) {
          setError('The saved schedule is invalid. The default routine is shown; save it to replace the damaged entry.');
        } else {
          setSchedule(normalized);
        }
      }
    } catch (loadError) {
      console.error('Unable to load the study schedule:', loadError);
      setError('The saved schedule could not be read. The default routine is shown.');
    } finally {
      setIsReady(true);
    }
  }, [isMounted]);

  function saveSchedule(next: StudySchedule) {
    setError('');
    setNotice('');
    try {
      window.localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(next));
      setSchedule(next);
      updatePreferences({ dailyTargetMinutes: next.dailyTargetMinutes });
      setNotice('Schedule saved in this browser.');
    } catch (saveError) {
      console.error('Unable to save the study schedule:', saveError);
      setError('The schedule could not be saved. Check available browser storage and try again.');
    }
  }

  function updateRoutine(id: string, changes: Partial<StudyRoutine>) {
    saveSchedule({
      ...schedule,
      routines: schedule.routines.map((item) => item.id === id ? { ...item, ...changes } : item),
    });
  }

  function commitRoutineTitle(id: string, currentTitle: string) {
    const draft = titleDrafts[id];
    if (draft === undefined) return;
    setTitleDrafts((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    const title = draft.trim();
    if (!title) {
      setError('A study block needs a name.');
      return;
    }
    if (title !== currentTitle) updateRoutine(id, { title });
  }

  function handleTargetChange(event: ChangeEvent<HTMLInputElement>) {
    saveSchedule({ ...schedule, dailyTargetMinutes: Number(event.target.value) });
  }

  function handleAddRoutine() {
    if (schedule.routines.length >= 12) {
      setError('A routine can contain up to 12 study blocks.');
      return;
    }
    saveSchedule({
      ...schedule,
      routines: [
        ...schedule.routines,
        { id: `routine-${Date.now()}`, title: 'New study block', durationMinutes: 15 },
      ],
    });
  }

  if (!isMounted || !isReady) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse space-y-5 px-4 py-8 sm:px-6">
        <div className="h-24 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  const totalMinutes = schedule.routines.reduce((total, item) => total + item.durationMinutes, 0);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <CalendarDays className="h-4 w-4" />
          Build a steady routine
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Study planner</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Shape a repeatable routine around your available time. Your plan stays on this device.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Default evening routine</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Starts at 7:30 PM and includes vocabulary, grammar, kanji, listening, speaking, and revision.
              </p>
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950/40 dark:text-teal-200">
              {totalMinutes} min total
            </span>
          </div>

          <label className="mt-5 block max-w-xs text-sm font-semibold text-slate-700 dark:text-slate-200">
            Routine start time
            <input
              type="time"
              value={schedule.startTime}
              onChange={(event) => saveSchedule({ ...schedule, startTime: event.target.value })}
              className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>

          {schedule.routines.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Your routine is empty.</p>
              <p className="mt-1 text-xs text-slate-500">Add a block or restore the suggested routine.</p>
              <button
                type="button"
                onClick={() => saveSchedule(DEFAULT_STUDY_SCHEDULE)}
                className="mt-3 min-h-10 rounded-lg border border-brand-500 px-3 text-sm font-semibold text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:text-brand-300"
              >
                Restore default routine
              </button>
            </div>
          ) : (
            <ol className="mt-5 space-y-3">
              {schedule.routines.map((routine, index) => {
                const start = schedule.routines
                  .slice(0, index)
                  .reduce((time, previous) => addMinutes(time, previous.durationMinutes), schedule.startTime);
                const end = addMinutes(start, routine.durationMinutes);
                return (
                  <li key={routine.id} className="grid gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700 sm:grid-cols-[minmax(0,1fr)_112px_auto] sm:items-center">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-800 dark:bg-teal-950/50 dark:text-teal-200">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <label className="sr-only" htmlFor={`routine-title-${routine.id}`}>Study block name</label>
                        <input
                          id={`routine-title-${routine.id}`}
                          value={titleDrafts[routine.id] ?? routine.title}
                          maxLength={60}
                          onChange={(event) => {
                            setTitleDrafts((current) => ({ ...current, [routine.id]: event.target.value }));
                            setError('');
                          }}
                          onBlur={() => commitRoutineTitle(routine.id, routine.title)}
                          className="min-h-9 w-full rounded-lg border border-transparent bg-transparent px-2 text-sm font-semibold text-slate-800 focus-visible:border-brand-500 focus-visible:outline-none dark:text-slate-100"
                        />
                        <span className="ml-2 text-[11px] text-slate-500">{start}–{end}</span>
                      </div>
                    </div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Minutes
                      <select
                        value={routine.durationMinutes}
                        onChange={(event) => {
                          const durationMinutes = Number(event.target.value);
                          updateRoutine(routine.id, { durationMinutes });
                        }}
                        className="mt-1 min-h-9 w-full rounded-lg border border-slate-300 bg-white px-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:border-slate-700 dark:bg-slate-950"
                      >
                        {Array.from({ length: 24 }, (_, index) => (index + 1) * 5).map((minutes) => (
                          <option key={minutes} value={minutes}>{minutes} min</option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => saveSchedule({ ...schedule, routines: schedule.routines.filter((item) => item.id !== routine.id) })}
                      aria-label={`Remove ${routine.title}`}
                      className="min-h-9 rounded-lg px-3 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 dark:hover:bg-rose-950/30"
                    >
                      <Trash2 className="mx-auto h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ol>
          )}

          <button
            type="button"
            onClick={handleAddRoutine}
            className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-dashed border-teal-500 px-4 text-sm font-semibold text-teal-800 transition hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 dark:text-teal-200 dark:hover:bg-teal-950/30"
          >
            <Plus className="h-4 w-4" />
            Add study block
          </button>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
              <Clock3 className="h-4 w-4 text-amber-600" />
              Daily study target
            </div>
            <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{schedule.dailyTargetMinutes} <span className="text-base font-semibold text-slate-500">min</span></p>
            <input
              type="range"
              min={15}
              max={240}
              step={15}
              value={schedule.dailyTargetMinutes}
              onChange={handleTargetChange}
              aria-label="Daily study target in minutes"
              className="mt-4 w-full accent-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500"><span>15 min</span><span>4 hours</span></div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
              <Bell className="h-4 w-4 text-indigo-600" />
              Reminder preference
            </div>
            <label className="mt-4 flex min-h-11 cursor-pointer items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-200">
              <span>Enable study reminder</span>
              <input
                type="checkbox"
                checked={schedule.remindersEnabled}
                onChange={(event) => saveSchedule({ ...schedule, remindersEnabled: event.target.checked })}
                className="h-5 w-5 accent-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Reminder time
              <input
                type="time"
                value={schedule.reminderTime}
                disabled={!schedule.remindersEnabled}
                onChange={(event) => saveSchedule({ ...schedule, reminderTime: event.target.value })}
                className="mt-1 min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:border-slate-700 dark:bg-slate-950"
              />
            </label>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">This saves your preference locally; browser notifications are not scheduled yet.</p>
          </section>
        </aside>
      </section>

      {notice && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">{notice}</p>}
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">{error}</p>}
    </div>
  );
}
