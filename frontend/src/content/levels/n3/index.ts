import { buildLevelPackage } from '@/content/shared/levelBuilder';
import { N3_EXAM_DURATION_SECONDS, N3_EXAM_QUESTIONS } from './exam';
import { N3_KANJI } from './kanji';
import { N3_LESSONS, N3_PHASES } from './lessons';
import { N3_LEVEL } from './level';
import { N3_GRAMMAR, N3_LISTENING, N3_READINGS, N3_SPEAKING_PROMPTS } from './skills';
import { N3_VOCABULARY } from './vocabulary';

export const N3_PACKAGE = buildLevelPackage({
  metadata: N3_LEVEL,
  phases: N3_PHASES,
  lessons: N3_LESSONS,
  vocabulary: N3_VOCABULARY,
  kanji: N3_KANJI,
  grammar: N3_GRAMMAR,
  readings: N3_READINGS,
  listening: N3_LISTENING,
  speakingPrompts: N3_SPEAKING_PROMPTS,
  examDurationSeconds: N3_EXAM_DURATION_SECONDS,
  examQuestions: N3_EXAM_QUESTIONS,
});

export { N3_LEVEL };
