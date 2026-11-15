import { buildLevelPackage } from '@/content/shared/levelBuilder';
import { N2_EXAM_DURATION_SECONDS, N2_EXAM_QUESTIONS } from './exam';
import { N2_KANJI } from './kanji';
import { N2_LESSONS, N2_PHASES } from './lessons';
import { N2_LEVEL } from './level';
import { N2_GRAMMAR, N2_LISTENING, N2_READINGS, N2_SPEAKING_PROMPTS } from './skills';
import { N2_VOCABULARY } from './vocabulary';

export const N2_PACKAGE = buildLevelPackage({
  metadata: N2_LEVEL,
  phases: N2_PHASES,
  lessons: N2_LESSONS,
  vocabulary: N2_VOCABULARY,
  kanji: N2_KANJI,
  grammar: N2_GRAMMAR,
  readings: N2_READINGS,
  listening: N2_LISTENING,
  speakingPrompts: N2_SPEAKING_PROMPTS,
  examDurationSeconds: N2_EXAM_DURATION_SECONDS,
  examQuestions: N2_EXAM_QUESTIONS,
});

export { N2_LEVEL };
