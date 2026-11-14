export { N5_LEVEL } from './level';
export { CURRICULUM_PHASES, LESSONS_CURRICULUM } from './curriculum';
export { getLessonDetail } from './lessons';
import { N5_VOCABULARY as BASE_VOCABULARY } from './vocabulary';
import { N5_VOCABULARY_EXTENDED } from './vocabularyExtended';
import { N5_KANJI as BASE_KANJI } from './kanji';
import { N5_KANJI_EXTENDED } from './kanjiExtended';

const seenWords = new Set(BASE_VOCABULARY.flatMap((entry) => [entry.id, entry.japanese]));
export const N5_VOCABULARY = [
  ...BASE_VOCABULARY,
  ...N5_VOCABULARY_EXTENDED.filter((entry) => !seenWords.has(entry.id) && !seenWords.has(entry.japanese)),
];

const seenKanji = new Set(BASE_KANJI.map((entry) => entry.character));
export const N5_KANJI = [...BASE_KANJI, ...N5_KANJI_EXTENDED.filter((entry) => !seenKanji.has(entry.character))];
import { N5_GRAMMAR as BASE_GRAMMAR } from './skills';
import { N5_GRAMMAR_EXTENDED } from './grammarExtended';
export { N5_LISTENING, N5_READINGS, N5_SPEAKING_PROMPTS } from './skills';

const seenGrammar = new Set(BASE_GRAMMAR.map((item) => item.id));
export const N5_GRAMMAR = [...BASE_GRAMMAR, ...N5_GRAMMAR_EXTENDED.filter((item) => !seenGrammar.has(item.id))].sort(
  (a, b) => a.lesson - b.lesson,
);
export { N5_EXAM_DURATION_SECONDS, N5_EXAM_QUESTIONS } from './exam';
