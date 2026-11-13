import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, BookOpen, Compass, Award, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-warm/80 dark:bg-[#0B0F19]/80 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-sakura-500 flex items-center justify-center text-white font-jp font-bold text-sm shadow-sm shadow-brand-500/20">
                日
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                Nihongo <span className="text-brand-600 dark:text-brand-400">Journey</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Complete Japanese learning companion from absolute beginner to JLPT N5 mastery. Featuring trilingual explanations in Bangla, English & Japanese.
            </p>
            <div className="text-[11px] font-jp text-slate-400 dark:text-slate-500">
              にほんご Journey • 初心者からN5合格へ
            </div>
          </div>

          {/* Foundation & Curriculum */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              Curriculum (N5)
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/hiragana" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Hiragana Chart & Stroke Order
                </Link>
              </li>
              <li>
                <Link href="/katakana" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Katakana Practice & Audio
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Minna no Nihongo (Lessons 1–25)
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  700+ Core N5 Vocabulary
                </Link>
              </li>
              <li>
                <Link href="/grammar" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Grammar Rule Patterns & Formulas
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Practice & Labs */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Practice & Labs
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/flashcards" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  SRS Spaced Repetition Flashcards
                </Link>
              </li>
              <li>
                <Link href="/kanji" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Kanji Lab (103 N5 Characters)
                </Link>
              </li>
              <li>
                <Link href="/listening" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Native Audio Listening Lab
                </Link>
              </li>
              <li>
                <Link href="/speaking" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Speaking Lab & Speech Recorder
                </Link>
              </li>
              <li>
                <Link href="/reading" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Reading Comprehension Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Exam & Offline Storage */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Exams & Data
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/jlpt" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  JLPT N5 Practice Examinations
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Daily Study Routine (7:30–9:30 PM)
                </Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Progress Analytics & Streaks
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  LocalStorage Backup & JSON Export
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Nihongo Journey. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Japanese learners worldwide.</span>
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Offline LocalStorage Ready</span>
            </span>
            <span>•</span>
            <span className="font-jp">日本語 • বাংলা • English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
