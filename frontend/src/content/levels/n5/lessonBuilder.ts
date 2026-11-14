import { LessonDetail } from '@/content/shared/types';

/** [English, Bangla] */
export type Pair = [string, string];

/** Compact lesson source format, expanded into a full LessonDetail by buildLesson(). */
export interface CompactLesson {
  id: number;
  obj: Pair[];
  /** [speaker, japanese, romaji, english, bangla] */
  dlg: [string, string, string, string, string][];
  gram: Pair;
  /** [japanese, romaji, english, bangla, partOfSpeech, exampleJa, exampleEn, exampleBn] */
  vocab: [string, string, string, string, string, string, string, string][];
  tip: string;
  speak: Pair;
  /** [questionJa, questionEn, choices, correctIndex, explanationEn, explanationBn] */
  mcq: [string, string, string[], number, string, string];
  /** [promptJa, promptEn, answer, hint, explanationEn, explanationBn] */
  fill: [string, string, string, string, string, string];
  /** [instructionEn, instructionBn, correctOrder, explanationEn, explanationBn] */
  order: [string, string, string[], string, string];
  /** [questionEn, questionJa, choices, correctIndex, explanationEn, explanationBn] */
  quiz: [string, string, string[], number, string, string][];
  culture: Pair;
}

const ids = ['a', 'b', 'c', 'd', 'e'];
const toChoices = (choices: string[]) => choices.map((text, index) => ({ id: ids[index], text }));

/** Deterministic scramble that never returns the original order. */
function scramble(parts: string[]): string[] {
  const rotated = [...parts.slice(2), ...parts.slice(0, 2)].reverse();
  return rotated.join('|') === parts.join('|') ? [...parts].reverse() : rotated;
}

export function buildLesson(c: CompactLesson): LessonDetail {
  const p = `l${c.id}`;
  return {
    lessonId: c.id,
    objectivesEn: c.obj.map((o) => o[0]),
    objectivesBn: c.obj.map((o) => o[1]),
    dialogue: c.dlg.map(([speaker, japanese, romajiLine, translationEn, translationBn]) => ({
      speaker,
      japanese,
      furigana: '',
      romajiLine,
      translationEn,
      translationBn,
    })),
    grammarNotesEn: c.gram[0],
    grammarNotesBn: c.gram[1],
    vocabulary: c.vocab.map(([japanese, romajiReading, meaningEn, meaningBn, partOfSpeech, exampleJa, exampleEn, exampleBn]) => ({
      japanese,
      reading: japanese,
      romajiReading,
      meaningEn,
      meaningBn,
      exampleJa,
      exampleEn,
      exampleBn,
      partOfSpeech,
    })),
    listeningTip: c.tip,
    speakingPromptEn: c.speak[0],
    speakingPromptBn: c.speak[1],
    exercises: [
      {
        type: 'mcq',
        id: `${p}-ex1`,
        questionJa: c.mcq[0],
        questionEn: c.mcq[1],
        choices: toChoices(c.mcq[2]),
        correctId: ids[c.mcq[3]],
        explanationEn: c.mcq[4],
        explanationBn: c.mcq[5],
      },
      {
        type: 'fill',
        id: `${p}-ex2`,
        promptJa: c.fill[0],
        promptEn: c.fill[1],
        answer: c.fill[2],
        hint: c.fill[3],
        explanationEn: c.fill[4],
        explanationBn: c.fill[5],
      },
      {
        type: 'order',
        id: `${p}-ex3`,
        instructionEn: c.order[0],
        instructionBn: c.order[1],
        parts: scramble(c.order[2]),
        correctOrder: c.order[2],
        explanationEn: c.order[3],
        explanationBn: c.order[4],
      },
    ],
    quizQuestions: c.quiz.map(([questionEn, questionJa, choices, correct, explanationEn, explanationBn], index) => ({
      id: `${p}-q${index + 1}`,
      questionEn,
      questionJa,
      choices: toChoices(choices),
      correctId: ids[correct],
      explanationEn,
      explanationBn,
    })),
    culturalDeepDiveEn: c.culture[0],
    culturalDeepDiveBn: c.culture[1],
  };
}
