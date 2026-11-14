'use client';

import { useEffect, useState } from 'react';
import { Headphones, Languages, Pause, Play } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import StudyLabSkeleton from '@/components/skills/StudyLabSkeleton';
import { N5_LISTENING } from '@/content/levels/n5';
import { ListeningConversation } from '@/content/shared/types';

type TranscriptLanguage = 'Japanese' | 'English' | 'Bangla';
type PlaybackRate = 0.75 | 1 | 1.25;

const LANGUAGE_FIELD: Record<TranscriptLanguage, 'japanese' | 'english' | 'bangla'> = {
  Japanese: 'japanese',
  English: 'english',
  Bangla: 'bangla',
};

export default function ListeningPage() {
  const { isMounted } = useApp();
  const [conversationId, setConversationId] = useState(N5_LISTENING[0].id);
  const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1);
  const [visibleLanguages, setVisibleLanguages] = useState<TranscriptLanguage[]>(['Japanese']);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState('');

  const conversation = N5_LISTENING.find((item) => item.id === conversationId) ?? N5_LISTENING[0];
  const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  function toggleLanguage(language: TranscriptLanguage) {
    setVisibleLanguages((current) => current.includes(language)
      ? current.filter((item) => item !== language)
      : [...current, language]);
  }

  function playConversation() {
    setSpeechError('');
    if (!speechAvailable) {
      setSpeechError('Japanese speech playback is unavailable in this browser. You can still read the transcript and answer the questions.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(conversation.lines.map((line) => line.japanese).join('。'));
    utterance.lang = 'ja-JP';
    utterance.rate = playbackRate;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechError('The browser could not play this speech. Try again or check that a Japanese voice is available.');
    };
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }

  function stopConversation() {
    if (speechAvailable) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  if (!isMounted) return <StudyLabSkeleton cards={2} />;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-sky-700 via-blue-700 to-indigo-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <Headphones className="h-4 w-4" />
          JLPT N5 Listening Lab
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Listen, notice, understand</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Practice with short Japanese conversations. Playback uses your browser’s Japanese speech voice, which may vary by device.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Choose a conversation</h2>
          {N5_LISTENING.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                stopConversation();
                setConversationId(item.id);
                setSpeechError('');
              }}
              aria-pressed={conversation.id === item.id}
              className={`w-full rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                conversation.id === item.id
                  ? 'border-brand-500 bg-brand-50 shadow-soft dark:border-brand-700 dark:bg-brand-950/30'
                  : 'border-slate-200 bg-white hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">JLPT {item.level}</span>
              <span className="mt-1 block font-bold text-slate-900 dark:text-white">{item.title}</span>
            </button>
          ))}
        </aside>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{conversation.title}</h2>
                <p className="mt-1 text-xs text-slate-500">Original N5 practice conversation · Browser speech synthesis</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!isSpeaking ? (
                  <button type="button" onClick={playConversation} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
                    <Play className="h-4 w-4" /> Play
                  </button>
                ) : (
                  <button type="button" onClick={stopConversation} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
                    <Pause className="h-4 w-4" /> Stop
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Playback speed</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Playback speed">
                {([0.75, 1, 1.25] as const).map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setPlaybackRate(rate);
                      if (isSpeaking) stopConversation();
                    }}
                    aria-pressed={playbackRate === rate}
                    className={`min-h-10 rounded-xl border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                      playbackRate === rate
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-slate-200 text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {rate.toFixed(2).replace(/0$/, '')}×
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Languages className="h-4 w-4" /> Transcript languages
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(['Japanese', 'English', 'Bangla'] as const).map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => toggleLanguage(language)}
                    aria-pressed={visibleLanguages.includes(language)}
                    className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                      visibleLanguages.includes(language)
                        ? 'border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-950/40 dark:text-brand-200'
                        : 'border-slate-200 text-slate-500 dark:border-slate-700'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
              {!visibleLanguages.length && <p className="mt-2 text-xs text-amber-700">Select at least one language to show the transcript.</p>}

              <div className="mt-4 space-y-3">
                {conversation.lines.map((line, index) => (
                  <div key={`${line.speaker}-${index}`} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/50">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-brand-600">Speaker {line.speaker}</span>
                    {visibleLanguages.map((language) => {
                      const field = LANGUAGE_FIELD[language];
                      return <p key={language} className={`text-sm leading-relaxed text-slate-700 dark:text-slate-200 ${field === 'japanese' ? 'font-jp text-base' : ''}`}><span className="mr-2 text-[10px] font-bold uppercase text-slate-400">{language}</span>{line[field]}</p>;
                    })}
                  </div>
                ))}
              </div>
            </div>

            {speechError && <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200">{speechError}</p>}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Check what you heard</h2>
            <div className="mt-4 space-y-5">
              {conversation.questions.map((question, questionIndex) => {
                const key = `${conversation.id}-${questionIndex}`;
                const selected = answers[key];
                const isCorrect = selected === question.answer;
                return (
                  <fieldset key={key} className="space-y-2">
                    <legend className="text-sm font-bold text-slate-800 dark:text-slate-100">{question.prompt}</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {question.choices.map((choice, choiceIndex) => {
                        const chosen = selected === choiceIndex;
                        const color = selected === undefined
                          ? 'border-slate-200 hover:border-brand-400 dark:border-slate-700'
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
                            className={`min-h-10 rounded-xl border px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${color}`}
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
          </section>
        </div>
      </section>
    </div>
  );
}
