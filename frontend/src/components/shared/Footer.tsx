import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} EasyTemplate. Built for rapid, autonomous MERN development.
        </p>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <Link href="#privacy" className="hover:text-primary-600 transition-colors">Privacy</Link>
          <Link href="#terms" className="hover:text-primary-600 transition-colors">Terms</Link>
          <Link href="#contact" className="hover:text-primary-600 transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
};
