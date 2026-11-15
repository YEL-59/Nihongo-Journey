import { buildLevelPackage } from '@/content/shared/levelBuilder';
import { N1_EXAM_DURATION_SECONDS, N1_EXAM_QUESTIONS } from './exam';
import { N1_KANJI } from './kanji';
import { N1_LESSONS, N1_PHASES } from './lessons';
import { N1_LEVEL } from './level';
import { N1_GRAMMAR, N1_LISTENING, N1_READINGS, N1_SPEAKING_PROMPTS } from './skills';
import { N1_VOCABULARY } from './vocabulary';

export const N1_PACKAGE = buildLevelPackage({
  metadata: N1_LEVEL,
  phases: N1_PHASES,
  lessons: N1_LESSONS,
  vocabulary: N1_VOCABULARY,
  kanji: N1_KANJI,
  grammar: N1_GRAMMAR,
  readings: N1_READINGS,
  listening: N1_LISTENING,
  speakingPrompts: N1_SPEAKING_PROMPTS,
  examDurationSeconds: N1_EXAM_DURATION_SECONDS,
  examQuestions: N1_EXAM_QUESTIONS,
});

export { N1_LEVEL };
