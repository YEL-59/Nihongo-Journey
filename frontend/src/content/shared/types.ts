export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type LevelStatus = 'planned' | 'in-progress' | 'available';

export interface LevelMetadata {
  level: JLPTLevel;
  order: number;
  status: LevelStatus;
  prerequisites: JLPTLevel[];
}

export interface CurriculumPhase {
  phase: number;
  titleEn: string;
  titleBn: string;
  lessonRange: string;
  descriptionEn: string;
  descriptionBn: string;
}

export interface LessonCurriculumItem {
  id: number;
  lessonNumber: number;
  level: JLPTLevel;
  phase: number;
  phaseTitleEn: string;
  phaseTitleBn: string;
  titleJa: string;
  titleEn: string;
  titleBn: string;
  grammarPatterns: string[];
  grammarExplanationEn: string;
  grammarExplanationBn: string;
  vocabularyCount: number;
  kanjiCount: number;
  estimatedMinutes: number;
  culturalNoteEn: string;
  culturalNoteBn: string;
}

export interface VocabItem {
  japanese: string;
  reading: string;
  romajiReading: string;
  meaningEn: string;
  meaningBn: string;
  exampleJa: string;
  exampleEn: string;
  exampleBn: string;
  partOfSpeech: string;
}

export interface DialogueLine {
  speaker: string;
  japanese: string;
  furigana?: string;
  romajiLine: string;
  translationEn: string;
  translationBn: string;
}

export interface ExerciseChoice {
  id: string;
  text: string;
}

export interface MCQExercise {
  type: 'mcq';
  id: string;
  questionJa: string;
  questionEn: string;
  choices: ExerciseChoice[];
  correctId: string;
  explanationEn: string;
  explanationBn: string;
}

export interface FillBlanksExercise {
  type: 'fill';
  id: string;
  promptJa: string;
  promptEn: string;
  answer: string;
  hint: string;
  explanationEn: string;
  explanationBn: string;
}

export interface SentenceOrderExercise {
  type: 'order';
  id: string;
  instructionEn: string;
  instructionBn: string;
  parts: string[];
  correctOrder: string[];
  explanationEn: string;
  explanationBn: string;
}

export type AnyExercise = MCQExercise | FillBlanksExercise | SentenceOrderExercise;

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionJa: string;
  choices: ExerciseChoice[];
  correctId: string;
  explanationEn: string;
  explanationBn: string;
}

export interface LessonDetail {
  lessonId: number;
  objectivesEn: string[];
  objectivesBn: string[];
  dialogue: DialogueLine[];
  grammarNotesEn: string;
  grammarNotesBn: string;
  vocabulary: VocabItem[];
  listeningTip: string;
  speakingPromptEn: string;
  speakingPromptBn: string;
  exercises: AnyExercise[];
  quizQuestions: QuizQuestion[];
  culturalDeepDiveEn: string;
  culturalDeepDiveBn: string;
}

export type VocabularyCategory =
  | 'Greetings'
  | 'Food'
  | 'Verbs'
  | 'Numbers'
  | 'Time'
  | 'Travel'
  | 'Places'
  | 'People'
  | 'Adjectives'
  | 'Daily Life';

export interface VocabularyEntry {
  id: string;
  level: JLPTLevel;
  category: VocabularyCategory;
  japanese: string;
  reading: string;
  romaji: string;
  meaningEn: string;
  meaningBn: string;
  exampleJa: string;
  exampleReading: string;
  exampleEn: string;
  exampleBn: string;
}

export interface KanjiCompound {
  word: string;
  reading: string;
  meaningEn: string;
  meaningBn: string;
}

export interface KanjiEntry {
  character: string;
  level: JLPTLevel;
  strokeCount: number;
  meaningsEn: string[];
  meaningsBn: string[];
  onyomi: string[];
  kunyomi: string[];
  radical: string;
  radicalMeaningEn: string;
  strokeOrder: string[];
  compounds: KanjiCompound[];
}

export interface GrammarExample {
  label: string;
  japanese: string;
  meaningEn: string;
  meaningBn: string;
}

export interface GrammarPattern {
  id: string;
  lesson: number;
  pattern: string;
  title: string;
  formation: string;
  explanationEn: string;
  explanationBn: string;
  particles: string[];
  examples: GrammarExample[];
  mistakeEn: string;
  mistakeBn: string;
}

export interface JapaneseSegment {
  text: string;
  reading?: string;
}

export interface ReadingQuestion {
  prompt: string;
  choices: string[];
  answer: number;
  explanationEn: string;
  explanationBn: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  difficulty: 'Starter' | 'Practice' | 'Challenge';
  topic: string;
  lines: JapaneseSegment[][];
  translationEn: string;
  translationBn: string;
  questions: ReadingQuestion[];
}

export interface ListeningLine {
  speaker: string;
  japanese: string;
  english: string;
  bangla: string;
}

export interface ListeningQuestion {
  prompt: string;
  choices: string[];
  answer: number;
  explanationEn: string;
  explanationBn: string;
}

export interface ListeningConversation {
  id: string;
  title: string;
  level: JLPTLevel;
  lines: ListeningLine[];
  questions: ListeningQuestion[];
}

export interface SpeakingPrompt {
  id: string;
  title: string;
  level: JLPTLevel;
  japanese: string;
  meaningEn: string;
  meaningBn: string;
  goal: string;
}

export type ExamSectionId = 'language-knowledge' | 'grammar-reading' | 'listening';

export interface JLPTExamQuestion {
  id: string;
  section: ExamSectionId;
  promptEn: string;
  promptJa: string;
  choices: string[];
  answerIndex: number;
  explanationEn: string;
  explanationBn: string;
  readingText?: string;
  listeningText?: string;
}
