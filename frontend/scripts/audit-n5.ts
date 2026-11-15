import {
  CURRICULUM_PHASES,
  LESSONS_CURRICULUM,
  N5_EXAM_DURATION_SECONDS,
  N5_EXAM_QUESTIONS,
  N5_GRAMMAR,
  N5_KANJI,
  N5_LEVEL,
  N5_LISTENING,
  N5_READINGS,
  N5_SPEAKING_PROMPTS,
  N5_VOCABULARY,
  getLessonDetail,
} from '../src/content/levels/n5/index';
import { getLevelContent } from '../src/content/shared/levelContent';
import type { JLPTLevel } from '../src/content/shared/types';

const errors: string[] = [];
const warnings: string[] = [];

function assert(condition: boolean, message: string, isWarning = false) {
  if (!condition) {
    if (isWarning) warnings.push(message);
    else errors.push(message);
  }
}

function nonEmpty(value: string | undefined | null): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

// 1. Level metadata
assert(N5_LEVEL.level === 'N5', 'N5_LEVEL.level must be N5');

// 2. Curriculum & Lessons (1-25)
assert(CURRICULUM_PHASES.length === 4, `Expected 4 curriculum phases, got ${CURRICULUM_PHASES.length}`);
assert(LESSONS_CURRICULUM.length === 25, `Expected 25 curriculum lessons, got ${LESSONS_CURRICULUM.length}`);

const seenLessonNumbers = new Set<number>();
const seenChallengeIds = new Set<string>();
const duplicateOrderParts: string[] = [];

for (const lesson of LESSONS_CURRICULUM) {
  assert(!seenLessonNumbers.has(lesson.lessonNumber), `Duplicate lessonNumber ${lesson.lessonNumber}`);
  seenLessonNumbers.add(lesson.lessonNumber);
  assert(lesson.level === 'N5', `Lesson ${lesson.lessonNumber} level is ${lesson.level}`);
  assert(nonEmpty(lesson.titleJa) && nonEmpty(lesson.titleEn) && nonEmpty(lesson.titleBn), `Lesson ${lesson.lessonNumber} missing title fields`);
  assert(lesson.grammarPatterns.length > 0, `Lesson ${lesson.lessonNumber} has no grammarPatterns`);
  assert(nonEmpty(lesson.grammarExplanationEn) && nonEmpty(lesson.grammarExplanationBn), `Lesson ${lesson.lessonNumber} missing grammarExplanation`);
  assert(nonEmpty(lesson.culturalNoteEn) && nonEmpty(lesson.culturalNoteBn), `Lesson ${lesson.lessonNumber} missing culturalNote`);

  const detail = getLessonDetail(lesson.lessonNumber);
  assert(Boolean(detail), `Lesson ${lesson.lessonNumber} missing LessonDetail`);
  if (!detail) continue;

  assert(detail.objectivesEn.length > 0 && detail.objectivesBn.length > 0, `Lesson ${lesson.lessonNumber} missing objectives`);
  assert(detail.objectivesEn.length === detail.objectivesBn.length, `Lesson ${lesson.lessonNumber} objectivesEn/Bn length mismatch`);
  assert(detail.dialogue.length > 0, `Lesson ${lesson.lessonNumber} missing dialogue`);
  detail.dialogue.forEach((line, idx) => {
    assert(nonEmpty(line.speaker) && nonEmpty(line.japanese) && nonEmpty(line.translationEn) && nonEmpty(line.translationBn), `Lesson ${lesson.lessonNumber} dialogue[${idx}] missing fields`);
  });

  assert(nonEmpty(detail.grammarNotesEn) && nonEmpty(detail.grammarNotesBn), `Lesson ${lesson.lessonNumber} missing grammarNotes`);
  assert(detail.vocabulary.length > 0, `Lesson ${lesson.lessonNumber} missing vocabulary`);
  detail.vocabulary.forEach((v, idx) => {
    assert(nonEmpty(v.japanese) && nonEmpty(v.reading) && nonEmpty(v.meaningEn) && nonEmpty(v.meaningBn), `Lesson ${lesson.lessonNumber} vocab[${idx}] missing fields`);
  });

  assert(nonEmpty(detail.listeningTip) && nonEmpty(detail.speakingPromptEn) && nonEmpty(detail.speakingPromptBn), `Lesson ${lesson.lessonNumber} missing listening/speaking prompts`);

  const mcq = detail.exercises.filter((e) => e.type === 'mcq');
  const fill = detail.exercises.filter((e) => e.type === 'fill');
  const order = detail.exercises.filter((e) => e.type === 'order');
  assert(mcq.length >= 1, `Lesson ${lesson.lessonNumber} missing MCQ exercise`);
  assert(fill.length >= 1, `Lesson ${lesson.lessonNumber} missing FillBlanks exercise`);
  assert(order.length >= 1, `Lesson ${lesson.lessonNumber} missing SentenceOrder exercise`);

  for (const ex of detail.exercises) {
    assert(!seenChallengeIds.has(ex.id), `Duplicate exercise id: ${ex.id}`);
    seenChallengeIds.add(ex.id);
    assert(nonEmpty(ex.explanationEn) && nonEmpty(ex.explanationBn), `Exercise ${ex.id} missing EN/BN explanation`);

    if (ex.type === 'mcq') {
      assert(ex.choices.length >= 2, `MCQ ${ex.id} needs >= 2 choices`);
      assert(ex.choices.some((c) => c.id === ex.correctId), `MCQ ${ex.id} correctId ${ex.correctId} not in choices`);
    } else if (ex.type === 'fill') {
      assert(nonEmpty(ex.answer) && nonEmpty(ex.promptJa) && nonEmpty(ex.promptEn), `Fill ${ex.id} missing fields`);
    } else if (ex.type === 'order') {
      assert(ex.parts.length >= 2 && ex.parts.length === ex.correctOrder.length, `Order ${ex.id} parts/correctOrder length mismatch`);
      const sortedParts = [...ex.parts].sort().join('|');
      const sortedCorrect = [...ex.correctOrder].sort().join('|');
      assert(sortedParts === sortedCorrect, `Order ${ex.id} parts do not match correctOrder`);
      if (new Set(ex.parts).size !== ex.parts.length) {
        duplicateOrderParts.push(ex.id);
      }
    }
  }

  assert(detail.quizQuestions.length >= 1, `Lesson ${lesson.lessonNumber} missing quizQuestions`);
  for (const q of detail.quizQuestions) {
    assert(!seenChallengeIds.has(q.id), `Duplicate quiz id: ${q.id}`);
    seenChallengeIds.add(q.id);
    assert(q.choices.length >= 2, `Quiz ${q.id} needs >= 2 choices`);
    assert(q.choices.some((c) => c.id === q.correctId), `Quiz ${q.id} correctId ${q.correctId} not in choices`);
    assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Quiz ${q.id} missing EN/BN explanation`);
  }

  assert(nonEmpty(detail.culturalDeepDiveEn) && nonEmpty(detail.culturalDeepDiveBn), `Lesson ${lesson.lessonNumber} missing culturalDeepDive`);
}

if (duplicateOrderParts.length > 0) {
  warnings.push(`SentenceOrder exercises with duplicate parts (requires index-based selection): ${duplicateOrderParts.join(', ')}`);
}

// 3. Vocabulary
const vocabIds = new Set<string>();
for (const entry of N5_VOCABULARY) {
  assert(!vocabIds.has(entry.id), `Duplicate vocab id: ${entry.id}`);
  vocabIds.add(entry.id);
  assert(entry.level === 'N5', `Vocab ${entry.id} level is ${entry.level}`);
  assert(
    nonEmpty(entry.japanese) &&
      nonEmpty(entry.reading) &&
      nonEmpty(entry.romaji) &&
      nonEmpty(entry.meaningEn) &&
      nonEmpty(entry.meaningBn) &&
      nonEmpty(entry.exampleJa) &&
      nonEmpty(entry.exampleReading) &&
      nonEmpty(entry.exampleEn) &&
      nonEmpty(entry.exampleBn),
    `Vocab ${entry.id} missing required fields`,
  );
}

// 4. Kanji
const kanjiChars = new Set<string>();
for (const entry of N5_KANJI) {
  assert(!kanjiChars.has(entry.character), `Duplicate kanji: ${entry.character}`);
  kanjiChars.add(entry.character);
  assert(entry.level === 'N5', `Kanji ${entry.character} level is ${entry.level}`);
  assert(entry.strokeCount > 0, `Kanji ${entry.character} invalid strokeCount`);
  assert(entry.meaningsEn.length > 0 && entry.meaningsBn.length > 0, `Kanji ${entry.character} missing meanings`);
  assert(entry.onyomi.length > 0 || entry.kunyomi.length > 0, `Kanji ${entry.character} missing readings`);
  assert(nonEmpty(entry.radical) && nonEmpty(entry.radicalMeaningEn), `Kanji ${entry.character} missing radical`);
  assert(entry.strokeOrder.length > 0, `Kanji ${entry.character} missing strokeOrder`);
  assert(entry.compounds.length > 0, `Kanji ${entry.character} missing compounds`);
  for (const c of entry.compounds) {
    assert(nonEmpty(c.word) && nonEmpty(c.reading) && nonEmpty(c.meaningEn) && nonEmpty(c.meaningBn), `Kanji ${entry.character} compound missing fields`);
  }
}

// 5. Grammar
const grammarIds = new Set<string>();
const grammarLessons = new Set<number>();
for (const g of N5_GRAMMAR) {
  assert(!grammarIds.has(g.id), `Duplicate grammar id: ${g.id}`);
  grammarIds.add(g.id);
  grammarLessons.add(g.lesson);
  assert(g.lesson >= 1 && g.lesson <= 25, `Grammar ${g.id} invalid lesson ${g.lesson}`);
  assert(
    nonEmpty(g.pattern) &&
      nonEmpty(g.title) &&
      nonEmpty(g.formation) &&
      nonEmpty(g.explanationEn) &&
      nonEmpty(g.explanationBn) &&
      nonEmpty(g.mistakeEn) &&
      nonEmpty(g.mistakeBn),
    `Grammar ${g.id} missing fields`,
  );
  assert(g.particles.length > 0 && g.examples.length > 0, `Grammar ${g.id} missing particles or examples`);
  for (const ex of g.examples) {
    assert(nonEmpty(ex.label) && nonEmpty(ex.japanese) && nonEmpty(ex.meaningEn) && nonEmpty(ex.meaningBn), `Grammar ${g.id} example missing fields`);
  }
}
for (let lessonNum = 1; lessonNum <= 25; lessonNum += 1) {
  assert(grammarLessons.has(lessonNum), `Grammar missing coverage for lesson ${lessonNum}`);
}

// 6. Readings
const readingIds = new Set<string>();
for (const r of N5_READINGS) {
  assert(!readingIds.has(r.id), `Duplicate reading id: ${r.id}`);
  readingIds.add(r.id);
  assert(nonEmpty(r.title) && nonEmpty(r.topic) && r.lines.length > 0 && nonEmpty(r.translationEn) && nonEmpty(r.translationBn), `Reading ${r.id} missing fields`);
  assert(r.questions.length > 0, `Reading ${r.id} has no questions`);
  r.questions.forEach((q, idx) => {
    assert(nonEmpty(q.prompt) && q.choices.length >= 2 && q.answer >= 0 && q.answer < q.choices.length, `Reading ${r.id} q[${idx}] invalid`);
    assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Reading ${r.id} q[${idx}] missing explanation`);
  });
}

// 7. Listening
const listeningIds = new Set<string>();
for (const l of N5_LISTENING) {
  assert(!listeningIds.has(l.id), `Duplicate listening id: ${l.id}`);
  listeningIds.add(l.id);
  assert(l.level === 'N5' && nonEmpty(l.title) && l.lines.length > 0, `Listening ${l.id} missing fields`);
  l.lines.forEach((line, idx) => {
    assert(nonEmpty(line.speaker) && nonEmpty(line.japanese) && nonEmpty(line.english) && nonEmpty(line.bangla), `Listening ${l.id} line[${idx}] missing fields`);
  });
  assert(l.questions.length > 0, `Listening ${l.id} has no questions`);
  l.questions.forEach((q, idx) => {
    assert(nonEmpty(q.prompt) && q.choices.length >= 2 && q.answer >= 0 && q.answer < q.choices.length, `Listening ${l.id} q[${idx}] invalid`);
    assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Listening ${l.id} q[${idx}] missing explanation`);
  });
}

// 8. Speaking
const speakingIds = new Set<string>();
for (const s of N5_SPEAKING_PROMPTS) {
  assert(!speakingIds.has(s.id), `Duplicate speaking id: ${s.id}`);
  speakingIds.add(s.id);
  assert(s.level === 'N5' && nonEmpty(s.title) && nonEmpty(s.japanese) && nonEmpty(s.meaningEn) && nonEmpty(s.meaningBn) && nonEmpty(s.goal), `Speaking ${s.id} missing fields`);
}

// 9. Exam
assert(N5_EXAM_DURATION_SECONDS > 0, 'N5_EXAM_DURATION_SECONDS must be > 0');
const examIds = new Set<string>();
const examSections = new Set<string>();
for (const q of N5_EXAM_QUESTIONS) {
  assert(!examIds.has(q.id), `Duplicate exam id: ${q.id}`);
  examIds.add(q.id);
  examSections.add(q.section);
  assert(nonEmpty(q.promptEn) && nonEmpty(q.promptJa) && q.choices.length >= 2 && q.answerIndex >= 0 && q.answerIndex < q.choices.length, `Exam ${q.id} invalid`);
  assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Exam ${q.id} missing explanation`);
  if (q.section === 'listening') {
    assert(nonEmpty(q.listeningText), `Exam listening ${q.id} missing listeningText`);
  }
}
assert(examSections.has('language-knowledge') && examSections.has('grammar-reading') && examSections.has('listening'), 'Exam must cover all 3 sections');

assert(N5_VOCABULARY.length >= 150, `Expected >= 150 vocabulary entries, got ${N5_VOCABULARY.length}`);
assert(N5_KANJI.length >= 100, `Expected >= 100 kanji entries, got ${N5_KANJI.length}`);
assert(N5_READINGS.length >= 8, `Expected >= 8 reading passages, got ${N5_READINGS.length}`);
assert(N5_LISTENING.length >= 8, `Expected >= 8 listening conversations, got ${N5_LISTENING.length}`);
assert(N5_SPEAKING_PROMPTS.length >= 8, `Expected >= 8 speaking prompts, got ${N5_SPEAKING_PROMPTS.length}`);
assert(N5_EXAM_QUESTIONS.length >= 12, `Expected >= 12 exam questions, got ${N5_EXAM_QUESTIONS.length}`);

console.log('=== N5 Content Audit Summary ===');
console.log(`Level status: ${N5_LEVEL.status}`);
console.log(`Curriculum lessons: ${LESSONS_CURRICULUM.length}`);
console.log(`Vocabulary entries: ${N5_VOCABULARY.length}`);
console.log(`Kanji entries: ${N5_KANJI.length}`);
console.log(`Grammar patterns: ${N5_GRAMMAR.length} (covering ${grammarLessons.size}/25 lessons)`);
console.log(`Reading passages: ${N5_READINGS.length} (${N5_READINGS.reduce((sum, r) => sum + r.questions.length, 0)} questions)`);
console.log(`Listening conversations: ${N5_LISTENING.length} (${N5_LISTENING.reduce((sum, l) => sum + l.questions.length, 0)} questions)`);
console.log(`Speaking prompts: ${N5_SPEAKING_PROMPTS.length}`);
console.log(`Exam questions: ${N5_EXAM_QUESTIONS.length}`);
console.log(`Errors: ${errors.length}`);
for (const err of errors) console.error('ERROR:', err);
console.log(`Warnings: ${warnings.length}`);
for (const warn of warnings) console.warn('WARN:', warn);

// 10. Multi-level N4-N1 Content Package Audit
const expansionLevels: JLPTLevel[] = ['N4', 'N3', 'N2', 'N1'];
for (const lvl of expansionLevels) {
  const pkg = getLevelContent(lvl);
  assert(pkg.metadata.level === lvl, `${lvl} metadata.level mismatch`);
  assert(pkg.metadata.status === 'available' || pkg.metadata.status === 'in-progress', `${lvl} metadata.status must be available or in-progress`);
  assert(pkg.phases.length > 0, `${lvl} must have phases`);
  assert(pkg.curriculum.length > 0, `${lvl} must have curriculum`);
  assert(pkg.vocabulary.length > 0, `${lvl} must have vocabulary`);
  assert(pkg.kanji.length > 0, `${lvl} must have kanji`);
  assert(pkg.grammar.length > 0, `${lvl} must have grammar`);
  assert(pkg.readings.length > 0, `${lvl} must have readings`);
  assert(pkg.listening.length > 0, `${lvl} must have listening`);
  assert(pkg.speakingPrompts.length > 0, `${lvl} must have speakingPrompts`);
  assert(pkg.examDurationSeconds > 0, `${lvl} examDurationSeconds must be > 0`);

  const seenL = new Set<number>();
  for (const lesson of pkg.curriculum) {
    assert(!seenL.has(lesson.lessonNumber), `${lvl} duplicate lesson ${lesson.lessonNumber}`);
    seenL.add(lesson.lessonNumber);
    assert(lesson.level === lvl, `${lvl} lesson ${lesson.lessonNumber} level mismatch`);
    const detail = pkg.getLessonDetail(lesson.lessonNumber);
    assert(Boolean(detail), `${lvl} lesson ${lesson.lessonNumber} missing LessonDetail`);
    if (detail) {
      assert(detail.exercises.length >= 1 && detail.quizQuestions.length >= 1, `${lvl} lesson ${lesson.lessonNumber} missing exercises or quiz`);
      for (const ex of detail.exercises) {
        assert(nonEmpty(ex.explanationEn) && nonEmpty(ex.explanationBn), `${lvl} exercise ${ex.id} missing explanation`);
        if (ex.type === 'mcq') assert(ex.choices.some((c) => c.id === ex.correctId), `${lvl} MCQ ${ex.id} invalid correctId`);
        if (ex.type === 'order') assert(ex.parts.length === ex.correctOrder.length, `${lvl} Order ${ex.id} length mismatch`);
      }
      for (const q of detail.quizQuestions) {
        assert(q.choices.some((c) => c.id === q.correctId), `${lvl} quiz ${q.id} invalid correctId`);
      }
    }
  }

  const seenV = new Set<string>();
  for (const v of pkg.vocabulary) {
    assert(!seenV.has(v.id), `${lvl} duplicate vocab ${v.id}`);
    seenV.add(v.id);
    assert(v.level === lvl && nonEmpty(v.meaningEn) && nonEmpty(v.meaningBn), `${lvl} vocab ${v.id} invalid`);
  }

  const seenK = new Set<string>();
  for (const k of pkg.kanji) {
    assert(!seenK.has(k.character), `${lvl} duplicate kanji ${k.character}`);
    seenK.add(k.character);
    assert(k.level === lvl && k.meaningsEn.length > 0 && k.meaningsBn.length > 0, `${lvl} kanji ${k.character} invalid`);
  }

  const lvlExamSections = new Set<string>();
  const seenE = new Set<string>();
  for (const q of pkg.examQuestions) {
    assert(!seenE.has(q.id), `${lvl} duplicate exam ${q.id}`);
    seenE.add(q.id);
    lvlExamSections.add(q.section);
    assert(q.answerIndex >= 0 && q.answerIndex < q.choices.length, `${lvl} exam ${q.id} invalid answerIndex`);
    assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `${lvl} exam ${q.id} missing explanation`);
  }
  assert(
    lvlExamSections.has('language-knowledge') && lvlExamSections.has('grammar-reading') && lvlExamSections.has('listening'),
    `${lvl} exam must cover all 3 sections`,
  );

  console.log(`${lvl} audit: ${pkg.curriculum.length} lessons, ${pkg.vocabulary.length} vocab, ${pkg.kanji.length} kanji, ${pkg.grammar.length} grammar, ${pkg.readings.length} readings, ${pkg.listening.length} listening, ${pkg.speakingPrompts.length} speaking, ${pkg.examQuestions.length} exam`);
}

if (errors.length > 0) {
  console.error(`Total errors after multi-level audit: ${errors.length}`);
  for (const err of errors) console.error('ERROR:', err);
  process.exit(1);
}
