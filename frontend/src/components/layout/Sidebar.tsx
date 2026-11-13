'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Languages,
  PenTool,
  PlayCircle,
  Library,
  Layers,
  FileText,
  Compass,
  Headphones,
  Mic,
  Scroll,
  Award,
  Calendar,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  User,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface NavItem {
  name: string;
  jpName: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  jpTitle: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Core & Roadmap',
    jpTitle: 'メイン',
    items: [
      { name: 'Dashboard', jpName: 'ダッシュボード', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Roadmap', jpName: 'ロードマップ', href: '/roadmap', icon: Map, badge: 'N5' },
      { name: 'Learning Center', jpName: '学習センター', href: '/learn', icon: BookOpen },
    ],
  },
  {
    title: 'Kana Foundation',
    jpTitle: '仮名',
    items: [
      { name: 'Hiragana Practice', jpName: 'ひらがな', href: '/hiragana', icon: Languages },
      { name: 'Katakana Practice', jpName: 'カタカナ', href: '/katakana', icon: PenTool },
    ],
  },
  {
    title: 'Curriculum & Practice',
    jpTitle: '学習と練習',
    items: [
      { name: 'Lesson Player', jpName: 'レッスン', href: '/lessons/1', icon: PlayCircle, badge: '1-25' },
      { name: 'Vocabulary Library', jpName: '語彙', href: '/vocabulary', icon: Library },
      { name: 'SRS Flashcards', jpName: '単語帳', href: '/flashcards', icon: Layers, badge: 'SRS', badgeColor: 'bg-emerald-500 text-white' },
      { name: 'Grammar Library', jpName: '文法', href: '/grammar', icon: FileText },
      { name: 'Kanji Lab', jpName: '漢字', href: '/kanji', icon: Compass },
    ],
  },
  {
    title: 'Language Skill Labs',
    jpTitle: 'スキルラボ',
    items: [
      { name: 'Listening Lab', jpName: '聴解', href: '/listening', icon: Headphones },
      { name: 'Speaking Lab', jpName: '発音', href: '/speaking', icon: Mic },
      { name: 'Reading Lab', jpName: '読解', href: '/reading', icon: Scroll },
    ],
  },
  {
    title: 'Exam & Analytics',
    jpTitle: '試験と計画',
    items: [
      { name: 'JLPT N5 Simulator', jpName: '模擬試験', href: '/jlpt', icon: Award, badge: 'Mock' },
      { name: 'Study Planner', jpName: '学習計画', href: '/schedule', icon: Calendar },
      { name: 'Progress Analytics', jpName: '進捗分析', href: '/progress', icon: BarChart3 },
      { name: 'Settings', jpName: '設定', href: '/settings', icon: Settings },
    ],
  },
];

interface SidebarProps {
  onItemClick?: () => void;
  isMobileDrawer?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick, isMobileDrawer = false }) => {
  const pathname = usePathname();
  const { preferences, toggleSidebar, profile, dailyActivity } = useApp();

  // If inside mobile drawer, force expanded layout
  const isCollapsed = isMobileDrawer ? false : preferences.sidebarCollapsed;

  return (
    <aside
      className={`h-full flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 bg-warm dark:bg-[#0B0F19] transition-all duration-300 ease-in-out select-none ${
        isMobileDrawer ? 'w-full' : isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header Brand (Shown in mobile drawer or expanded) */}
      {isMobileDrawer && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-sakura-500 flex items-center justify-center text-white font-jp font-bold text-sm">
            日
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">Nihongo Journey</h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-jp">日本語ラーニング</p>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span>{section.title}</span>
                <span className="text-[10px] font-jp opacity-70">{section.jpTitle}</span>
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onItemClick}
                  title={isCollapsed ? `${item.name} (${item.jpName})` : undefined}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400'
                    }`}
                  />

                  {!isCollapsed && (
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <div className="truncate">
                        <span className="block truncate">{item.name}</span>
                        <span
                          className={`block text-[10px] font-jp truncate leading-tight ${
                            isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {item.jpName}
                        </span>
                      </div>
                      {item.badge && (
                        <span
                          className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.badgeColor ||
                            (isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                      {item.name} <span className="font-jp text-[10px] text-slate-300">({item.jpName})</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer with Profile & Collapse Toggle */}
      {!isMobileDrawer && (
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
          {/* User Mini Profile */}
          <div
            className={`flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs shrink-0">
              <User className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {profile.name}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{dailyActivity.currentStreak} day streak</span>
                </div>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium ${
              isCollapsed ? 'justify-center' : ''
            }`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      )}
    </aside>
  );
};
