'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { CheckCircle2, Download, Languages, RotateCcw, Upload, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { importAllData, exportAllData, resetAllData, AudioPlaybackSpeed, LearningLanguageMode } from '@/lib/storage';

const LANGUAGE_OPTIONS: Array<{ value: LearningLanguageMode; label: string; description: string }> = [
  { value: 'all', label: 'Bangla + English', description: 'Show both explanation languages with Japanese.' },
  { value: 'en', label: 'English', description: 'Show English explanations with Japanese.' },
  { value: 'bn', label: 'Bangla', description: 'Show Bangla explanations with Japanese.' },
];

const AUDIO_SPEEDS: AudioPlaybackSpeed[] = [0.75, 1, 1.25];

export default function SettingsPage() {
  const { isMounted, preferences, updatePreferences, setLanguageMode, toggleRomaji } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [reloadAfterImport, setReloadAfterImport] = useState(false);

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setMessage('');
    setReloadAfterImport(false);
    setIsImporting(true);
    try {
      if (!file.name.toLowerCase().endsWith('.json')) {
        throw new Error('Choose a JSON backup file.');
      }
      const imported = importAllData(await file.text());
      if (!imported) throw new Error('The backup could not be imported. Your existing data was preserved where possible.');
      setMessage('Backup imported. Reload the app to apply its settings and progress.');
      setReloadAfterImport(true);
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : 'The backup could not be read.');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function handleExport() {
    setError('');
    setMessage('');
    try {
      const file = new Blob([exportAllData()], { type: 'application/json' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nihongo-journey-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage('Your backup file has been downloaded.');
    } catch (exportError) {
      console.error('Unable to export user data:', exportError);
      setError('The backup could not be created. Check browser storage permissions and try again.');
    }
  }

  function handleReset() {
    if (!window.confirm('Reset all saved learning data and preferences? This cannot be undone.')) return;
    setError('');
    setMessage('');
    try {
      resetAllData();
      window.location.reload();
    } catch (resetError) {
      console.error('Unable to reset user data:', resetError);
      setError('Your data could not be reset. Check browser storage permissions and try again.');
    }
  }

  if (!isMounted) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse space-y-5 px-4 py-8 sm:px-6">
        <div className="h-24 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-52 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
          <Languages className="h-4 w-4" />
          Learning preferences
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Settings & data</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/75">
          Personalize explanations and protect your local learning progress.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">Explanation language</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setLanguageMode(option.value)}
              aria-pressed={preferences.languageMode === option.value}
              className={`rounded-xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                preferences.languageMode === option.value
                  ? 'border-brand-500 bg-brand-50 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100'
                  : 'border-slate-200 hover:border-brand-300 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              <span className="block font-bold">{option.label}</span>
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{option.description}</span>
            </button>
          ))}
        </div>

        <label className="mt-5 flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700">
          <span>
            <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">Show romaji</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Display Latin transliteration beside Japanese.</span>
          </span>
          <input
            type="checkbox"
            checked={preferences.showRomaji}
            onChange={toggleRomaji}
            className="h-5 w-5 accent-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          />
        </label>

        <div className="mt-5">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
            <Volume2 className="h-4 w-4 text-brand-600" />
            Audio playback speed
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Audio playback speed">
            {AUDIO_SPEEDS.map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => updatePreferences({ audioSpeed: speed })}
                aria-pressed={preferences.audioSpeed === speed}
                className={`min-h-10 rounded-xl border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                  preferences.audioSpeed === speed
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-slate-200 text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:text-slate-200'
                }`}
              >
                {speed.toFixed(2).replace(/0$/, '')}×
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">Data backup</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Export or restore your local progress, preferences, schedule, and review history.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-400 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:border-slate-700 dark:text-slate-200"
          >
            <Upload className="h-4 w-4" />
            {isImporting ? 'Importing…' : 'Import JSON'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="sr-only"
            aria-label="Choose a Nihongo Journey JSON backup"
          />
        </div>
        {message && (
          <p role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {message}
          </p>
        )}
        {reloadAfterImport && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 min-h-10 rounded-xl border border-emerald-600 px-4 text-sm font-semibold text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 dark:text-emerald-200"
          >
            Reload with imported data
          </button>
        )}
        {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">{error}</p>}
      </section>

      <section className="rounded-2xl border border-rose-200 bg-white p-5 shadow-soft dark:border-rose-900/70 dark:bg-slate-900 sm:p-6">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">Reset learning data</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          This removes all saved progress and preferences from this browser. Export a backup first if you may want to restore it.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/30"
        >
          <RotateCcw className="h-4 w-4" />
          Reset all data
        </button>
      </section>
    </div>
  );
}
