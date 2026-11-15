import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Nihongo Journey (にほんご Journey) | JLPT N5–N1 Japanese Learning',
  description:
    'A self-paced Japanese learning path from JLPT N5 to N1, with all five levels available and trilingual explanations in Bangla, English, and Japanese.',
  keywords: [
    'Japanese learning',
    'JLPT N5',
    'JLPT N5 to N1',
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
