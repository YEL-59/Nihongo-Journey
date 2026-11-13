'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, BookOpen, Layers, LayoutDashboard } from 'lucide-react';

interface MobileTab {
  name: string;
  jpName: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mobileTabs: MobileTab[] = [
  { name: 'Home', jpName: 'ホーム', href: '/', icon: Home },
  { name: 'Roadmap', jpName: 'マップ', href: '/roadmap', icon: Map },
  { name: 'Lessons', jpName: '学習', href: '/learn', icon: BookOpen },
  { name: 'Review', jpName: '復習', href: '/flashcards', icon: Layers, badge: 'SRS' },
  { name: 'Dashboard', jpName: 'マイ', href: '/dashboard', icon: LayoutDashboard },
];

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 dark:border-slate-800/80 bg-warm/95 dark:bg-[#0B0F19]/95 backdrop-blur-md safe-bottom shadow-lg transition-colors duration-200"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname === tab.href || (tab.href !== '/dashboard' && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all group relative ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1 text-[8px] font-bold rounded-full bg-emerald-500 text-white leading-none py-0.5">
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-600 dark:bg-brand-400" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-tight">{tab.name}</span>
              <span className="text-[8px] font-jp opacity-60 leading-none">{tab.jpName}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
