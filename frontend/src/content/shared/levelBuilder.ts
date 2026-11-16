import {
  AnyExercise,
  CurriculumPhase,
  DialogueLine,
  GrammarPattern,
  JLPTExamQuestion,
  JLPTLevel,
  KanjiEntry,
  LessonCurriculumItem,
  LessonDetail,
  LevelContentPackage,
  LevelMetadata,
  ListeningConversation,
  QuizQuestion,
  ReadingPassage,
  SpeakingPrompt,
  VocabItem,
  VocabularyEntry,
} from '@/content/shared/types';

export interface CompactLessonSpec {
  lessonNumber: number;
  phase: number;
  titleJa: string;
  titleEn: string;
  titleBn: string;
  grammarPatterns: string[];
  grammarExplanationEn: string;
  grammarExplanationBn: string;
  culturalNoteEn: string;
  culturalNoteBn: string;
  estimatedMinutes?: number;
  objectivesEn: string[];
  objectivesBn: string[];
  dialogue: DialogueLine[];
  vocabulary: VocabItem[];
  listeningTip: string;
  speakingPromptEn: string;
  speakingPromptBn: string;
  exercises: AnyExercise[];
  quizQuestions: QuizQuestion[];
}

export interface CompactLevelInput {
  metadata: LevelMetadata;
  phases: CurriculumPhase[];
  lessons: CompactLessonSpec[];
  vocabulary: VocabularyEntry[];
  kanji: KanjiEntry[];
  grammar: GrammarPattern[];
  readings: ReadingPassage[];
  listening: ListeningConversation[];
  speakingPrompts: SpeakingPrompt[];
  examDurationSeconds: number;
  examQuestions: JLPTExamQuestion[];
}

export function buildLevelPackage(input: CompactLevelInput): LevelContentPackage {
  const level: JLPTLevel = input.metadata.level;
  const phaseMap = new Map(input.phases.map((p) => [p.phase, p]));

  const curriculum: LessonCurriculumItem[] = input.lessons.map((lesson) => {
    const phase = phaseMap.get(lesson.phase);
    return {
      id: lesson.lessonNumber,
      lessonNumber: lesson.lessonNumber,
      level,
      phase: lesson.phase,
      phaseTitleEn: phase?.titleEn ?? `${level} Phase ${lesson.phase}`,
      phaseTitleBn: phase?.titleBn ?? `${level} ধাপ ${lesson.phase}`,
      titleJa: lesson.titleJa,
      titleEn: lesson.titleEn,
      titleBn: lesson.titleBn,
      grammarPatterns: lesson.grammarPatterns,
      grammarExplanationEn: lesson.grammarExplanationEn,
      grammarExplanationBn: lesson.grammarExplanationBn,
      vocabularyCount: lesson.vocabulary.length,
      kanjiCount: Math.max(2, Math.round(input.kanji.length / input.lessons.length)),
      estimatedMinutes: lesson.estimatedMinutes ?? 25,
      culturalNoteEn: lesson.culturalNoteEn,
      culturalNoteBn: lesson.culturalNoteBn,
    };
  });

  const detailMap = new Map<number, LessonDetail>(
    input.lessons.map((lesson) => [
      lesson.lessonNumber,
      {
        lessonId: lesson.lessonNumber,
        objectivesEn: lesson.objectivesEn,
        objectivesBn: lesson.objectivesBn,
        dialogue: lesson.dialogue,
        grammarNotesEn: lesson.grammarExplanationEn,
        grammarNotesBn: lesson.grammarExplanationBn,
        vocabulary: lesson.vocabulary,
        listeningTip: lesson.listeningTip,
        speakingPromptEn: lesson.speakingPromptEn,
        speakingPromptBn: lesson.speakingPromptBn,
        exercises: lesson.exercises,
        quizQuestions: lesson.quizQuestions,
        culturalDeepDiveEn: lesson.culturalNoteEn,
        culturalDeepDiveBn: lesson.culturalNoteBn,
      },
    ]),
  );

  return {
    metadata: input.metadata,
    phases: input.phases,
    curriculum,
    getLessonDetail: (lessonId: number) => detailMap.get(lessonId),
    vocabulary: input.vocabulary,
    kanji: input.kanji,
    grammar: input.grammar,
    readings: input.readings,
    listening: input.listening,
    speakingPrompts: input.speakingPrompts,
    examDurationSeconds: input.examDurationSeconds,
    examQuestions: input.examQuestions,
  };
}
