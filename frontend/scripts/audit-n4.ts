import {
  N4_CURRICULUM_PHASES,
  N4_EXAM_DURATION_SECONDS,
  N4_EXAM_QUESTIONS,
  N4_GRAMMAR,
  N4_KANJI,
  N4_LESSONS_CURRICULUM,
  N4_LEVEL,
  N4_LISTENING,
  N4_READINGS,
  N4_SPEAKING_PROMPTS,
  N4_VOCABULARY,
  getN4LessonDetail,
} from '../src/content/levels/n4/index';
import {
  N5_GRAMMAR,
  N5_KANJI,
  N5_VOCABULARY,
} from '../src/content/levels/n5/index';

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
assert(N4_LEVEL.level === 'N4', 'N4_LEVEL.level must be N4');
assert(N4_LEVEL.prerequisites.includes('N5'), 'N4_LEVEL.prerequisites must include N5');

// 2. Curriculum & Lessons (1-16)
assert(N4_CURRICULUM_PHASES.length === 4, `Expected 4 N4 curriculum phases, got ${N4_CURRICULUM_PHASES.length}`);
assert(N4_LESSONS_CURRICULUM.length === 16, `Expected 16 N4 curriculum lessons, got ${N4_LESSONS_CURRICULUM.length}`);

const seenLessonNumbers = new Set<number>();
const seenChallengeIds = new Set<string>();

for (const lesson of N4_LESSONS_CURRICULUM) {
  assert(!seenLessonNumbers.has(lesson.lessonNumber), `Duplicate N4 lessonNumber ${lesson.lessonNumber}`);
  seenLessonNumbers.add(lesson.lessonNumber);
  assert(lesson.level === 'N4', `Lesson ${lesson.lessonNumber} level is ${lesson.level}`);
  assert(nonEmpty(lesson.titleJa) && nonEmpty(lesson.titleEn) && nonEmpty(lesson.titleBn), `Lesson ${lesson.lessonNumber} missing title fields`);
  assert(lesson.grammarPatterns.length > 0, `Lesson ${lesson.lessonNumber} has no grammarPatterns`);
  assert(nonEmpty(lesson.grammarExplanationEn) && nonEmpty(lesson.grammarExplanationBn), `Lesson ${lesson.lessonNumber} missing grammarExplanation`);
  assert(nonEmpty(lesson.culturalNoteEn) && nonEmpty(lesson.culturalNoteBn), `Lesson ${lesson.lessonNumber} missing culturalNote`);

  const detail = getN4LessonDetail(lesson.lessonNumber);
  assert(Boolean(detail), `Lesson ${lesson.lessonNumber} missing LessonDetail`);
  if (!detail) continue;

  assert(detail.objectivesEn.length > 0 && detail.objectivesBn.length > 0, `Lesson ${lesson.lessonNumber} missing objectives`);
  assert(detail.objectivesEn.length === detail.objectivesBn.length, `Lesson ${lesson.lessonNumber} objectivesEn/Bn length mismatch`);
  assert(detail.dialogue.length >= 3, `Lesson ${lesson.lessonNumber} needs >= 3 dialogue lines`);
  detail.dialogue.forEach((line, idx) => {
    assert(nonEmpty(line.speaker) && nonEmpty(line.japanese) && nonEmpty(line.translationEn) && nonEmpty(line.translationBn), `Lesson ${lesson.lessonNumber} dialogue[${idx}] missing fields`);
  });

  assert(nonEmpty(detail.grammarNotesEn) && nonEmpty(detail.grammarNotesBn), `Lesson ${lesson.lessonNumber} missing grammarNotes`);
  assert(detail.vocabulary.length >= 3, `Lesson ${lesson.lessonNumber} needs >= 3 vocabulary items`);
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
    assert(ex.id.startsWith('n4-'), `Exercise ${ex.id} must be scoped with n4-`);
    assert(nonEmpty(ex.explanationEn) && nonEmpty(ex.explanationBn), `Exercise ${ex.id} missing EN/BN explanation`);

    if (ex.type === 'mcq') {
      assert(ex.choices.length >= 2, `MCQ ${ex.id} needs >= 2 choices`);
      assert(ex.choices.some((c) => c.id === ex.correctId), `MCQ ${ex.id} correctId ${ex.correctId} not in choices`);
    } else if (ex.type === 'fill') {
      assert(nonEmpty(ex.answer) && nonEmpty(ex.promptJa) && nonEmpty(ex.promptEn), `Fill ${ex.id} missing fields`);
    } else if (ex.type === 'order') {
      assert(ex.parts.length >= 2 && ex.parts.length === ex.correctOrder.length, `Order ${ex.id} parts/correctOrder length mismatch`);
      assert([...ex.parts].sort().join('|') === [...ex.correctOrder].sort().join('|'), `Order ${ex.id} parts do not match correctOrder`);
      assert(new Set(ex.parts).size === ex.parts.length, `Order ${ex.id} has duplicate parts`);
    }
  }

  assert(detail.quizQuestions.length >= 3, `Lesson ${lesson.lessonNumber} needs >= 3 quizQuestions`);
  for (const q of detail.quizQuestions) {
    assert(!seenChallengeIds.has(q.id), `Duplicate quiz id: ${q.id}`);
    seenChallengeIds.add(q.id);
    assert(q.id.startsWith('n4-'), `Quiz ${q.id} must be scoped with n4-`);
    assert(q.choices.length >= 2, `Quiz ${q.id} needs >= 2 choices`);
    assert(q.choices.some((c) => c.id === q.correctId), `Quiz ${q.id} correctId ${q.correctId} not in choices`);
    assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Quiz ${q.id} missing EN/BN explanation`);
  }

  assert(nonEmpty(detail.culturalDeepDiveEn) && nonEmpty(detail.culturalDeepDiveBn), `Lesson ${lesson.lessonNumber} missing culturalDeepDive`);
}

// 3. Vocabulary & zero collision with N5 IDs
const n5VocabIds = new Set(N5_VOCABULARY.map((v) => v.id));
const vocabIds = new Set<string>();
for (const entry of N4_VOCABULARY) {
  assert(entry.id.startsWith('n4-'), `Vocab ${entry.id} must start with n4-`);
  assert(!n5VocabIds.has(entry.id), `Vocab ${entry.id} collides with N5 vocab ID`);
  assert(!vocabIds.has(entry.id), `Duplicate N4 vocab id: ${entry.id}`);
  vocabIds.add(entry.id);
  assert(entry.level === 'N4', `Vocab ${entry.id} level is ${entry.level}`);
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

// 4. Kanji & zero overlap with N5 Kanji
const n5KanjiSet = new Set(N5_KANJI.map((k) => k.character));
const kanjiChars = new Set<string>();
for (const entry of N4_KANJI) {
  assert(!n5KanjiSet.has(entry.character), `N4 Kanji ${entry.character} overlaps with N5 Kanji`);
  assert(!kanjiChars.has(entry.character), `Duplicate N4 kanji: ${entry.character}`);
  kanjiChars.add(entry.character);
  assert(entry.level === 'N4', `Kanji ${entry.character} level is ${entry.level}`);
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
const n5GrammarIds = new Set(N5_GRAMMAR.map((g) => g.id));
const grammarIds = new Set<string>();
const grammarLessons = new Set<number>();
for (const g of N4_GRAMMAR) {
  assert(g.id.startsWith('n4-'), `Grammar ${g.id} must start with n4-`);
  assert(!n5GrammarIds.has(g.id), `Grammar ${g.id} collides with N5 grammar ID`);
  assert(!grammarIds.has(g.id), `Duplicate N4 grammar id: ${g.id}`);
  grammarIds.add(g.id);
  grammarLessons.add(g.lesson);
  assert(g.lesson >= 1 && g.lesson <= 16, `Grammar ${g.id} invalid lesson ${g.lesson}`);
  assert(nonEmpty(g.pattern) && nonEmpty(g.title) && nonEmpty(g.formation) && nonEmpty(g.explanationEn) && nonEmpty(g.explanationBn), `Grammar ${g.id} missing fields`);
  assert(g.examples.length > 0, `Grammar ${g.id} missing examples`);
}
for (let lesson = 1; lesson <= 16; lesson += 1) {
  assert(grammarLessons.has(lesson), `N4 Lesson ${lesson} has no grammar entry in N4_GRAMMAR`);
}

// 6. Reading
assert(N4_READINGS.length >= 6, `Expected >= 6 N4 reading passages, got ${N4_READINGS.length}`);
const readingIds = new Set<string>();
for (const r of N4_READINGS) {
  assert(r.id.startsWith('n4-'), `Reading ${r.id} must start with n4-`);
  assert(!readingIds.has(r.id), `Duplicate reading id: ${r.id}`);
  readingIds.add(r.id);
  assert(r.lines.length > 0 && nonEmpty(r.translationEn) && nonEmpty(r.translationBn), `Reading ${r.id} missing content`);
  assert(r.questions.length >= 2, `Reading ${r.id} needs >= 2 questions`);
  for (const q of r.questions) {
    assert(q.answer >= 0 && q.answer < q.choices.length, `Reading ${r.id} question answer out of range`);
    assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Reading ${r.id} question missing explanations`);
  }
}

// 7. Listening
assert(N4_LISTENING.length >= 6, `Expected >= 6 N4 listening conversations, got ${N4_LISTENING.length}`);
const listeningIds = new Set<string>();
for (const item of N4_LISTENING) {
  assert(item.id.startsWith('n4-'), `Listening ${item.id} must start with n4-`);
  assert(!listeningIds.has(item.id), `Duplicate listening id: ${item.id}`);
  listeningIds.add(item.id);
  assert(item.level === 'N4', `Listening ${item.id} level is ${item.level}`);
  assert(item.lines.length >= 2, `Listening ${item.id} needs >= 2 lines`);
  assert(item.questions.length >= 2, `Listening ${item.id} needs >= 2 questions`);
  for (const q of item.questions) {
    assert(q.answer >= 0 && q.answer < q.choices.length, `Listening ${item.id} question answer out of range`);
    assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Listening ${item.id} question missing explanations`);
  }
}

// 8. Speaking
assert(N4_SPEAKING_PROMPTS.length >= 6, `Expected >= 6 N4 speaking prompts, got ${N4_SPEAKING_PROMPTS.length}`);
const speakingIds = new Set<string>();
for (const s of N4_SPEAKING_PROMPTS) {
  assert(s.id.startsWith('n4-'), `Speaking ${s.id} must start with n4-`);
  assert(!speakingIds.has(s.id), `Duplicate speaking id: ${s.id}`);
  speakingIds.add(s.id);
  assert(s.level === 'N4', `Speaking ${s.id} level is ${s.level}`);
  assert(nonEmpty(s.japanese) && nonEmpty(s.meaningEn) && nonEmpty(s.meaningBn) && nonEmpty(s.goal), `Speaking ${s.id} missing fields`);
}

// 9. Exam
assert(N4_EXAM_DURATION_SECONDS > 0, 'N4_EXAM_DURATION_SECONDS must be > 0');
assert(N4_EXAM_QUESTIONS.length >= 12, `Expected >= 12 N4 exam questions, got ${N4_EXAM_QUESTIONS.length}`);
const examIds = new Set<string>();
for (const q of N4_EXAM_QUESTIONS) {
  assert(q.id.startsWith('n4-'), `Exam ${q.id} must start with n4-`);
  assert(!examIds.has(q.id), `Duplicate exam id: ${q.id}`);
  examIds.add(q.id);
  assert(q.answerIndex >= 0 && q.answerIndex < q.choices.length, `Exam ${q.id} answerIndex out of range`);
  assert(nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn), `Exam ${q.id} missing explanations`);
}

console.log('--- JLPT N4 Content Audit Summary ---');
console.log(`Lessons: ${N4_LESSONS_CURRICULUM.length}`);
console.log(`Vocabulary: ${N4_VOCABULARY.length}`);
console.log(`Kanji: ${N4_KANJI.length}`);
console.log(`Grammar: ${N4_GRAMMAR.length} (lessons covered: ${grammarLessons.size}/16)`);
console.log(`Readings: ${N4_READINGS.length} (${N4_READINGS.reduce((acc, r) => acc + r.questions.length, 0)} questions)`);
console.log(`Listening: ${N4_LISTENING.length} (${N4_LISTENING.reduce((acc, l) => acc + l.questions.length, 0)} questions)`);
console.log(`Speaking: ${N4_SPEAKING_PROMPTS.length}`);
console.log(`Exam: ${N4_EXAM_QUESTIONS.length} questions`);
console.log(`Errors: ${errors.length}, Warnings: ${warnings.length}`);

if (warnings.length > 0) {
  console.warn('\nWarnings:');
  warnings.forEach((w) => console.warn(`  - ${w}`));
}
if (errors.length > 0) {
  console.error('\nErrors:');
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
