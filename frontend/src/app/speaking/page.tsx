'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Play, Square, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import StudyLabSkeleton from '@/components/skills/StudyLabSkeleton';
import { N5_SPEAKING_PROMPTS } from '@/content/levels/n5';

function mediaErrorMessage(error: unknown) {
  const name = error instanceof DOMException
    ? error.name
    : typeof error === 'object' && error !== null && 'name' in error && typeof error.name === 'string'
      ? error.name
      : 'UnknownError';

  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
    return 'Microphone access was denied. Allow microphone access in your browser’s site settings, then try again.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'No microphone was found. Connect a microphone and try again.';
  }
  if (name === 'NotReadableError' || name === 'TrackStartError') {
    return 'The microphone could not be opened. It may be in use by another application.';
  }
  if (name === 'SecurityError') {
    return 'Microphone access requires a secure page. Use localhost or HTTPS.';
  }
  if (name === 'NotSupportedError') {
    return 'This browser cannot create a recording format it can play back. Try a current browser.';
  }
  return `Recording could not start (${name}). Check your microphone and browser permissions, then try again.`;
}

export default function SpeakingPage() {
  const { isMounted } = useApp();
  const [promptId, setPromptId] = useState(N5_SPEAKING_PROMPTS[0].id);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mountedRef = useRef(true);
  const prompt = N5_SPEAKING_PROMPTS.find((item) => item.id === promptId) ?? N5_SPEAKING_PROMPTS[0];
  const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        void audioContextRef.current.close().catch((closeError: unknown) => {
          console.error('Unable to close microphone waveform audio context:', closeError);
        });
      }
      if (speechAvailable) window.speechSynthesis.cancel();
    };
  }, [speechAvailable]);

  useEffect(() => {
    if (!recordingUrl) return;
    return () => URL.revokeObjectURL(recordingUrl);
  }, [recordingUrl]);

  useEffect(() => {
    if (!isRecording) return;
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!analyser || !canvas || !context) return;

    const samples = new Uint8Array(analyser.fftSize);
    let frame = 0;
    const draw = () => {
      analyser.getByteTimeDomainData(samples);
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      context.lineWidth = 2;
      context.strokeStyle = '#0f766e';
      context.beginPath();
      const step = width / samples.length;
      samples.forEach((sample, index) => {
        const y = (sample / 128) * (height / 2);
        if (index === 0) context.moveTo(0, y);
        else context.lineTo(index * step, y);
      });
      context.stroke();
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  async function startRecording() {
    setError('');
    setRating(null);
    setRecordingUrl(null);
    setElapsedSeconds(0);

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('This browser does not support microphone recording. Try a current browser on localhost or HTTPS.');
      return;
    }

    let stream: MediaStream | null = null;
    try {
      const activeStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream = activeStream;
      streamRef.current = activeStream;
      chunksRef.current = [];

      if ('AudioContext' in window) {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const source = audioContext.createMediaStreamSource(activeStream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        analyserRef.current = analyser;
        await audioContext.resume();
      } else {
        setError('Live waveform is unavailable in this browser, but audio recording can still continue.');
      }

      const playbackProbe = document.createElement('audio');
      const mimeType = ['audio/webm', 'audio/mp4', 'audio/webm;codecs=opus']
        .find((type) => MediaRecorder.isTypeSupported(type) && playbackProbe.canPlayType(type) !== '');
      if (!mimeType) throw new DOMException('No supported recording format can be played.', 'NotSupportedError');

      const recorder = new MediaRecorder(activeStream, { mimeType });
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (mountedRef.current) {
          if (blob.size) setRecordingUrl(URL.createObjectURL(blob));
          else setError('The recording was empty. Check your microphone and try again.');
          setIsRecording(false);
        }
        activeStream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        analyserRef.current = null;
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          try {
            await audioContextRef.current.close();
          } catch (closeError) {
            console.error('Unable to close microphone waveform audio context:', closeError);
          }
        }
        audioContextRef.current = null;
      };
      recorder.onerror = () => {
        if (mountedRef.current) setError('The browser stopped recording because of a microphone error. Please try again.');
      };
      recorder.start();
      setIsRecording(true);
    } catch (recordingError) {
      stream?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          await audioContextRef.current.close();
        } catch (closeError) {
          console.error('Unable to close microphone waveform audio context:', closeError);
        }
      }
      audioContextRef.current = null;
      setIsRecording(false);
      setError(mediaErrorMessage(recordingError));
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
  }

  function playReference() {
    setError('');
    if (!speechAvailable) {
      setError('Japanese speech playback is unavailable in this browser. You can still practice from the written example.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(prompt.japanese);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    utterance.onerror = () => setError('The browser could not play the reference. Check that a Japanese speech voice is available.');
    window.speechSynthesis.speak(utterance);
  }

  if (!isMounted) return <StudyLabSkeleton cards={2} />;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-800 p-6 text-white shadow-xl sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
          <Mic className="h-4 w-4" />
          JLPT N5 Speaking Lab
        </div>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Listen, speak, and reflect</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Hear a browser-generated Japanese reference, record your own practice, then listen back and rate your attempt.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Choose a speaking goal</h2>
          {N5_SPEAKING_PROMPTS.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={isRecording}
              onClick={() => {
                if (isRecording) stopRecording();
                setPromptId(item.id);
                setRecordingUrl(null);
                setRating(null);
                setError('');
              }}
              aria-pressed={prompt.id === item.id}
              className={`w-full rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                prompt.id === item.id
                  ? 'border-brand-500 bg-brand-50 shadow-soft dark:border-brand-700 dark:bg-brand-950/30'
                  : 'border-slate-200 bg-white hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900'
              } ${isRecording ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.level} speaking prompt</span>
              <span className="mt-1 block font-bold text-slate-900 dark:text-white">{item.title}</span>
            </button>
          ))}
        </aside>

        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-800 dark:bg-violet-950/50 dark:text-violet-200">
                  N5 · Shadowing practice
                </span>
                <h2 className="mt-3 text-xl font-black text-slate-900 dark:text-white">{prompt.title}</h2>
                <p className="mt-3 font-jp text-xl leading-relaxed text-slate-900 dark:text-white">{prompt.japanese}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{prompt.meaningEn}</p>
                <p className="mt-1 text-sm text-slate-500">{prompt.meaningBn}</p>
                <p className="mt-3 text-xs text-slate-500">Practice goal: {prompt.goal}</p>
              </div>
              <button
                type="button"
                onClick={playReference}
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 transition hover:bg-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-200"
              >
                <Volume2 className="h-4 w-4" /> Play reference
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Your recording</h2>
                <p className="text-xs text-slate-500" aria-live="polite">
                  {isRecording ? `Recording · ${elapsedSeconds}s` : recordingUrl ? 'Recording ready to review' : 'Microphone is off until you start'}
                </p>
              </div>
              {!isRecording ? (
                <button type="button" onClick={startRecording} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
                  <Mic className="h-4 w-4" /> Start recording
                </button>
              ) : (
                <button type="button" onClick={stopRecording} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500">
                  <Square className="h-4 w-4" /> Stop recording
                </button>
              )}
            </div>

            <canvas
              ref={canvasRef}
              width={720}
              height={120}
              aria-label={isRecording ? 'Live microphone waveform' : 'Waveform display'}
              className={`mt-4 h-24 w-full rounded-xl border ${isRecording ? 'border-teal-300 bg-teal-50 dark:border-teal-900 dark:bg-teal-950/20' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40'}`}
            />

            {error && <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200">{error}</p>}

            {recordingUrl && (
              <div className="mt-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Listen to your attempt</p>
                <audio controls src={recordingUrl} className="w-full" aria-label="Recorded Japanese practice audio">
                  Your browser cannot play this recording.
                </audio>
                <div className="mt-4">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">How did it feel? Rate your attempt</p>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setRating(score)}
                        aria-pressed={rating === score}
                        className={`min-h-10 rounded-xl border text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                          rating === score
                            ? 'border-brand-600 bg-brand-600 text-white'
                            : 'border-slate-200 text-slate-700 hover:border-brand-300 dark:border-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                  {rating !== null && <p role="status" className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">Self-rating saved for this practice: {rating}/5.</p>}
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
