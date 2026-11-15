import { LessonDetail } from '@/content/shared/types';
import { N4_LESSONS_1_TO_8 } from './lessonsPart1';
import { N4_LESSONS_9_TO_16 } from './lessonsPart2';

export const N4_LESSONS_BY_ID: Record<number, LessonDetail> = {
  ...N4_LESSONS_1_TO_8,
  ...N4_LESSONS_9_TO_16,
};

export function getN4LessonDetail(lessonId: number): LessonDetail | undefined {
  return N4_LESSONS_BY_ID[lessonId];
}
