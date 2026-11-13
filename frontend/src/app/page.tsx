'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Database, Server, Smartphone, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import api from '@/services/api';

export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [backendMessage, setBackendMessage] = useState<string>('');

  useEffect(() => {
    api.get('/')
      .then((res) => {
        setBackendStatus('connected');
        setBackendMessage(res.data);
      })
      .catch(() => {
        setBackendStatus('disconnected');
        setBackendMessage('Backend offline (Run `npm run start:dev` in backend)');
      });
  }, []);

  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800 text-xs font-semibold text-primary-700 dark:text-primary-300">
          <Zap className="w-3.5 h-3.5" />
          <span>Autonomous MERN Template Ready</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto">
          High-Velocity Client Projects with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-sky-400">
            Zero Wasted Tokens
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Pre-configured with Next.js 14 App Router, Tailwind CSS, TypeScript, and Express/MongoDB backend. Ready for screenshot-to-exact-clone development.
        </p>

        {/* Backend Connectivity Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${
              backendStatus === 'connected' ? 'bg-emerald-500 animate-pulse' :
              backendStatus === 'checking' ? 'bg-amber-500 animate-ping' : 'bg-rose-500'
            }`} />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Backend Status: {backendStatus === 'connected' ? `Connected (${backendMessage})` : backendMessage || 'Checking connection...'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="w-full sm:w-auto">
            <span>Explore Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Read Documentation
          </Button>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineered for Precision & Speed
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Everything needed to clone client screenshots and deploy robust full-stack applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-primary-600">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Screenshot Exact Clone</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tailwind design tokens mapped directly to client mockups, wireframes, and reference site interactions.
            </p>
          </Card>

          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Mobile-First Responsive</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Every component supports mobile, tablet, and widescreen desktop layouts out of the box.
            </p>
          </Card>

          <Card hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">MERN Architecture</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Type-safe Mongoose models and Express APIs linked cleanly with Axios interceptors.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
