'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Footer } from '@/components/shared/Footer';
import { X } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Check if current route is the public landing page
  const isLandingPage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-warm dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header */}
      <Header
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        isMobileDrawerOpen={isMobileDrawerOpen}
      />

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 flex w-full relative">
        {/* Desktop Sidebar (Rendered on in-app pages or when viewing all modules) */}
        {!isLandingPage && (
          <div className="hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
            <Sidebar />
          </div>
        )}

        {/* Mobile Drawer Slide-Over */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileDrawerOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative w-72 max-w-[85vw] h-full bg-warm dark:bg-[#0B0F19] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
              <div className="p-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Menu & Modules</span>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar onItemClick={() => setIsMobileDrawerOpen(false)} isMobileDrawer={true} />
              </div>
            </div>
          </div>
        )}

        {/* Center Main Content Area */}
        <main className={`flex-1 min-w-0 flex flex-col ${!isLandingPage ? 'pb-20 lg:pb-8' : ''}`}>
          <div className="flex-1">{children}</div>
          {isLandingPage && <Footer />}
        </main>
      </div>

      {/* Persistent Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};
