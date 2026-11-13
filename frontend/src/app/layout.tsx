import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Nihongo Journey (にほんご Journey) | Absolute Beginner to JLPT N5 Mastery',
  description:
    'A comprehensive, self-paced Japanese language learning platform featuring Minna no Nihongo N5 lessons, Kana practice, SRS flashcards, and trilingual explanations in Bangla, English & Japanese.',
  keywords: [
    'Japanese learning',
    'JLPT N5',
    'Minna no Nihongo',
    'Learn Japanese in Bangla',
    'Hiragana',
    'Katakana',
    'Kanji',
    'Japanese grammar',
    'Japanese SRS flashcards',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-warm dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
