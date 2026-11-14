'use client';

import React, { useState, useMemo } from 'react';
import { Search, Volume2, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { KanaCharacter, KanaCategory, KanaType } from '@/content/shared/kana';
import { useApp } from '@/context/AppContext';

interface KanaGridProps {
  characters: KanaCharacter[];
  type: KanaType;
  masteredIds: string[];
  onSelectKana: (kana: KanaCharacter) => void;
  isLoading?: boolean;
}

export const KanaGrid: React.FC<KanaGridProps> = ({
  characters,
  type,
  masteredIds,
  onSelectKana,
  isLoading = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<KanaCategory>('gojuon');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRomajiLocal, setShowRomajiLocal] = useState(true);
  const { preferences, playSpeech } = useApp();

  // Combine local toggle with global preference
  const isRomajiVisible = preferences.showRomaji && showRomajiLocal;

  // Filter characters by category and search
  const filteredCharacters = useMemo(() => {
    let list = characters;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(
        (c) =>
          c.character.includes(q) ||
          c.romaji.toLowerCase().includes(q) ||
          c.row.toLowerCase().includes(q) ||
          c.exampleWord?.english.toLowerCase().includes(q) ||
          c.exampleWord?.bangla.includes(q)
      );
    }

    if (activeCategory === 'dakuten') {
      return list.filter((c) => c.category === 'dakuten' || c.category === 'handakuten');
    }

    return list.filter((c) => c.category === activeCategory);
  }, [characters, activeCategory, searchQuery]);

  // Rows configuration for standard 50-sound chart (Gojuon)
  const gojuonRows = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n'];
  const columns: Array<'a' | 'i' | 'u' | 'e' | 'o'> = ['a', 'i', 'u', 'e', 'o'];

  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto animate-pulse py-8">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-muted/20 border border-border" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs & Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-muted/15 border border-border self-start md:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => {
              setActiveCategory('gojuon');
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeCategory === 'gojuon' && !searchQuery
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            Gojuon (46 Core)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('dakuten');
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeCategory === 'dakuten' && !searchQuery
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            Dakuten & P (25)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('yoon');
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeCategory === 'yoon' && !searchQuery
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            Yoon Combos (33)
          </button>
        </div>

        {/* Search Input & Romaji Visibility Toggle */}
        <div className="flex items-center space-x-2.5">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (e.g. ka, か, dog)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-border bg-stone-50 dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-foreground placeholder:text-muted"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowRomajiLocal(!showRomajiLocal)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isRomajiVisible
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                : 'bg-card border-border text-muted hover:text-foreground'
            }`}
            title="Toggle Romaji subtitle visibility"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Romaji:</span>
            <span>{isRomajiVisible ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Grid Display */}
      {filteredCharacters.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-card border border-border">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">No Kana Characters Found</h3>
          <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
            We couldn't find any characters matching "{searchQuery}". Try searching for romaji like "ka" or "shi".
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Reset Search
          </button>
        </div>
      ) : activeCategory === 'gojuon' && !searchQuery ? (
        /* Traditional 5-Column 50-Sound Chart for Gojuon */
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Column Header Titles: a, i, u, e, o */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center text-xs font-bold uppercase tracking-wider text-muted pb-1">
            <span>A-dan (あ)</span>
            <span>I-dan (い)</span>
            <span>U-dan (う)</span>
            <span>E-dan (え)</span>
            <span>O-dan (お)</span>
          </div>

          {/* Gojuon Rows */}
          {gojuonRows.map((rowName) => {
            const rowChars = characters.filter((c) => c.row === rowName && c.category === 'gojuon');
            if (rowChars.length === 0) return null;

            return (
              <div key={rowName} className="grid grid-cols-5 gap-2 sm:gap-3">
                {rowName === 'n' ? (
                  // 'N' row special placement in 5-col grid
                  <>
                    <KanaCard
                      kana={rowChars[0]}
                      isMastered={masteredIds.includes(rowChars[0].id)}
                      showRomaji={isRomajiVisible}
                      onSelect={() => onSelectKana(rowChars[0])}
                      onPlaySound={() => playSpeech(rowChars[0].character)}
                    />
                    <div className="rounded-2xl border border-dashed border-border/40 bg-muted/5 col-span-4 flex items-center justify-center text-xs text-muted/40 font-mono">
                      (End of Gojuon Table)
                    </div>
                  </>
                ) : (
                  columns.map((col) => {
                    const char = rowChars.find((c) => c.column === col);
                    if (!char) {
                      // Empty Japanese phonetic gap (e.g. yi, ye, wu)
                      return (
                        <div
                          key={col}
                          className="h-20 sm:h-24 rounded-2xl border border-dashed border-border/30 bg-muted/5 flex items-center justify-center text-muted/30 text-xs"
                        >
                          —
                        </div>
                      );
                    }

                    return (
                      <KanaCard
                        key={char.id}
                        kana={char}
                        isMastered={masteredIds.includes(char.id)}
                        showRomaji={isRomajiVisible}
                        onSelect={() => onSelectKana(char)}
                        onPlaySound={() => playSpeech(char.character)}
                      />
                    );
                  })
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Free Responsive Card Grid for Dakuten, Yoon, or Active Search */
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filteredCharacters.map((char) => (
            <KanaCard
              key={char.id}
              kana={char}
              isMastered={masteredIds.includes(char.id)}
              showRomaji={isRomajiVisible}
              onSelect={() => onSelectKana(char)}
              onPlaySound={() => playSpeech(char.character)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface KanaCardProps {
  kana: KanaCharacter;
  isMastered: boolean;
  showRomaji: boolean;
  onSelect: () => void;
  onPlaySound: () => void;
}

const KanaCard: React.FC<KanaCardProps> = ({
  kana,
  isMastered,
  showRomaji,
  onSelect,
  onPlaySound,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`group relative h-20 sm:h-24 rounded-2xl border p-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md select-none ${
        isMastered
          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
          : 'bg-card border-border hover:border-indigo-300 dark:hover:border-indigo-700'
      }`}
    >
      {/* Mastered Badge Indicator */}
      {isMastered && (
        <div className="absolute top-1.5 right-1.5 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100 dark:fill-emerald-950" />
        </div>
      )}

      {/* Audio Play Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPlaySound();
        }}
        className="absolute top-1.5 left-1.5 p-1 rounded-md text-muted hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Listen to audio"
      >
        <Volume2 className="w-3.5 h-3.5" />
      </button>

      {/* Main Kana Character */}
      <div
        className="text-2xl sm:text-3xl font-bold text-foreground font-japanese leading-none group-hover:scale-110 transition-transform"
        style={{ fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif" }}
      >
        {kana.character}
      </div>

      {/* Phonetic Romaji Subtitle */}
      {showRomaji && (
        <div className="text-xs font-semibold text-muted tracking-tight mt-1">
          {kana.romaji}
        </div>
      )}

      {/* Stroke count pill on hover */}
      <div className="absolute bottom-1 text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
        {kana.strokeCount} strokes
      </div>
    </div>
  );
};
