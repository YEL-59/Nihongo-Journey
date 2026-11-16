export { N4_LEVEL } from './level';
export { N4_CURRICULUM_PHASES, N4_LESSONS_CURRICULUM } from './curriculum';
export { getN4LessonDetail } from './lessons';
export { N4_VOCABULARY } from './vocabulary';
export { N4_KANJI } from './kanji';
export {
  N4_GRAMMAR,
  N4_READINGS,
  N4_LISTENING,
  N4_SPEAKING_PROMPTS,
} from './skills';
export { N4_EXAM_DURATION_SECONDS, N4_EXAM_QUESTIONS } from './exam';

import { N4_LEVEL } from './level';
import { N4_CURRICULUM_PHASES, N4_LESSONS_CURRICULUM } from './curriculum';
import { getN4LessonDetail } from './lessons';
import { N4_VOCABULARY } from './vocabulary';
import { N4_KANJI } from './kanji';
import { N4_GRAMMAR, N4_READINGS, N4_LISTENING, N4_SPEAKING_PROMPTS } from './skills';
import { N4_EXAM_DURATION_SECONDS, N4_EXAM_QUESTIONS } from './exam';
import type { LevelContentPackage } from '@/content/shared/types';

export const N4_PACKAGE: LevelContentPackage = {
  metadata: N4_LEVEL,
  phases: N4_CURRICULUM_PHASES,
  curriculum: N4_LESSONS_CURRICULUM,
  getLessonDetail: getN4LessonDetail,
  vocabulary: N4_VOCABULARY,
  kanji: N4_KANJI,
  grammar: N4_GRAMMAR,
  readings: N4_READINGS,
  listening: N4_LISTENING,
  speakingPrompts: N4_SPEAKING_PROMPTS,
  examDurationSeconds: N4_EXAM_DURATION_SECONDS,
  examQuestions: N4_EXAM_QUESTIONS,
};
