'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Eye, EyeOff, Sparkles, CheckCircle2, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface WritingCanvasProps {
  character: string;
  romaji: string;
  strokeCount: number;
  strokeHints?: string[];
  onComplete?: () => void;
}

export const WritingCanvas: React.FC<WritingCanvasProps> = ({
  character,
  romaji,
  strokeCount,
  strokeHints = [],
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedStrokes, setCompletedStrokes] = useState(0);
  const { playSpeech } = useApp();

  // Clear the canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, []);

  // Reset when character changes
  useEffect(() => {
    clearCanvas();
    setCurrentStep(0);
    setCompletedStrokes(0);
  }, [character, clearCanvas]);

  // Coordinate normalizer for mouse and touch
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1e1b4b'; // Deep Indigo ink
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    setCompletedStrokes((prev) => {
      const next = prev + 1;
      if (next >= strokeCount && onComplete) {
        onComplete();
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-md mx-auto">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between w-full mb-3 px-1">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Strokes:</span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
            {completedStrokes} / {strokeCount}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-muted/10 transition-colors text-foreground"
            title="Toggle background tracing guide"
          >
            {showGuide ? <EyeOff className="w-3.5 h-3.5 text-muted" /> : <Eye className="w-3.5 h-3.5 text-indigo-600" />}
            <span>{showGuide ? 'Hide Guide' : 'Show Guide'}</span>
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 transition-colors text-foreground"
            title="Clear canvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
          <button
            type="button"
            onClick={() => playSpeech(character)}
            className="p-1 rounded-lg border border-border bg-card hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 transition-colors"
            title="Hear pronunciation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Drawing Pad with Tracing Layer */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 bg-white dark:bg-stone-900 shadow-inner overflow-hidden flex items-center justify-center">
        {/* Japanese Grid Guidelines (Traditional Kanji/Kana practice sheet crosshair) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical dashed center line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l border-dashed border-stone-200 dark:border-stone-800" />
          {/* Horizontal dashed center line */}
          <div className="absolute left-0 right-0 top-1/2 h-0 border-t border-dashed border-stone-200 dark:border-stone-800" />
          {/* Diagonal corner markers */}
          <div className="absolute top-2 left-2 text-[10px] text-stone-300 dark:text-stone-700 font-mono">1</div>
          <div className="absolute top-2 right-2 text-[10px] text-stone-300 dark:text-stone-700 font-mono">2</div>
          <div className="absolute bottom-2 left-2 text-[10px] text-stone-300 dark:text-stone-700 font-mono">3</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-stone-300 dark:text-stone-700 font-mono">4</div>
        </div>

        {/* Faint Background Tracing Character */}
        {showGuide && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[180px] sm:text-[200px] font-bold text-stone-200/80 dark:text-stone-700/60 leading-none transition-opacity"
            style={{ fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif" }}
          >
            {character}
          </div>
        )}

        {/* User Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
        />

        {/* Success Splash Indicator when finished drawing */}
        {completedStrokes >= strokeCount && hasDrawn && (
          <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-medium shadow-md animate-bounce">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Good Job!</span>
          </div>
        )}
      </div>

      {/* Step by Step Stroke Hints Guide */}
      {strokeHints.length > 0 && (
        <div className="w-full mt-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-foreground flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Stroke Order Guide</span>
            </span>
            <span className="text-[11px] text-muted">
              Step {currentStep + 1} of {strokeHints.length}
            </span>
          </div>

          <div className="text-xs text-foreground/80 leading-relaxed min-h-[32px]">
            {strokeHints[currentStep]}
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center space-x-1.5 mt-2.5">
            {strokeHints.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep ? 'w-6 bg-indigo-600' : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-indigo-300'
                }`}
                title={`View stroke step ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
