import { N3_PACKAGE } from '../src/content/levels/n3/index';
import {
  N4_GRAMMAR,
  N4_KANJI,
  N4_VOCABULARY,
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
assert(N3_PACKAGE.metadata.level === 'N3', 'N3_LEVEL.level must be N3');
assert(
  N3_PACKAGE.metadata.prerequisites.includes('N5') &&
    N3_PACKAGE.metadata.prerequisites.includes('N4'),
  'N3_LEVEL.prerequisites must include N5 and N4',
);

// 2. Curriculum & Lessons (1-16)
assert(
  N3_PACKAGE.phases.length === 4,
  `Expected 4 N3 curriculum phases, got ${N3_PACKAGE.phases.length}`,
);
assert(
  N3_PACKAGE.curriculum.length === 16,
  `Expected 16 N3 curriculum lessons, got ${N3_PACKAGE.curriculum.length}`,
);

const seenLessonNumbers = new Set<number>();
const seenChallengeIds = new Set<string>();

for (const lesson of N3_PACKAGE.curriculum) {
  assert(
    !seenLessonNumbers.has(lesson.lessonNumber),
    `Duplicate N3 lessonNumber ${lesson.lessonNumber}`,
  );
  seenLessonNumbers.add(lesson.lessonNumber);
  assert(lesson.level === 'N3', `Lesson ${lesson.lessonNumber} level is ${lesson.level}`);
  assert(
    nonEmpty(lesson.titleJa) && nonEmpty(lesson.titleEn) && nonEmpty(lesson.titleBn),
    `Lesson ${lesson.lessonNumber} missing title fields`,
  );
  assert(
    lesson.grammarPatterns.length > 0,
    `Lesson ${lesson.lessonNumber} has no grammarPatterns`,
  );
  assert(
    nonEmpty(lesson.grammarExplanationEn) && nonEmpty(lesson.grammarExplanationBn),
    `Lesson ${lesson.lessonNumber} missing grammarExplanation`,
  );
  assert(
    nonEmpty(lesson.culturalNoteEn) && nonEmpty(lesson.culturalNoteBn),
    `Lesson ${lesson.lessonNumber} missing culturalNote`,
  );

  const detail = N3_PACKAGE.getLessonDetail(lesson.lessonNumber);
  assert(Boolean(detail), `Lesson ${lesson.lessonNumber} missing LessonDetail`);
  if (!detail) continue;

  assert(
    detail.objectivesEn.length > 0 && detail.objectivesBn.length > 0,
    `Lesson ${lesson.lessonNumber} missing objectives`,
  );
  assert(
    detail.objectivesEn.length === detail.objectivesBn.length,
    `Lesson ${lesson.lessonNumber} objectivesEn/Bn length mismatch`,
  );
  assert(
    detail.dialogue.length >= 3,
    `Lesson ${lesson.lessonNumber} needs >= 3 dialogue lines`,
  );
  detail.dialogue.forEach((line, idx) => {
    assert(
      nonEmpty(line.speaker) &&
        nonEmpty(line.japanese) &&
        nonEmpty(line.translationEn) &&
        nonEmpty(line.translationBn),
      `Lesson ${lesson.lessonNumber} dialogue[${idx}] missing fields`,
    );
  });

  assert(
    nonEmpty(detail.grammarNotesEn) && nonEmpty(detail.grammarNotesBn),
    `Lesson ${lesson.lessonNumber} missing grammarNotes`,
  );
  assert(
    detail.vocabulary.length >= 3,
    `Lesson ${lesson.lessonNumber} needs >= 3 vocabulary items`,
  );
  detail.vocabulary.forEach((v, idx) => {
    assert(
      nonEmpty(v.japanese) &&
        nonEmpty(v.reading) &&
        nonEmpty(v.meaningEn) &&
        nonEmpty(v.meaningBn),
      `Lesson ${lesson.lessonNumber} vocab[${idx}] missing fields`,
    );
  });

  assert(
    nonEmpty(detail.listeningTip) &&
      nonEmpty(detail.speakingPromptEn) &&
      nonEmpty(detail.speakingPromptBn),
    `Lesson ${lesson.lessonNumber} missing listening/speaking prompts`,
  );

  const mcq = detail.exercises.filter((e) => e.type === 'mcq');
  const fill = detail.exercises.filter((e) => e.type === 'fill');
  const order = detail.exercises.filter((e) => e.type === 'order');
  assert(mcq.length >= 1, `Lesson ${lesson.lessonNumber} missing MCQ exercise`);
  assert(fill.length >= 1, `Lesson ${lesson.lessonNumber} missing FillBlanks exercise`);
  assert(order.length >= 1, `Lesson ${lesson.lessonNumber} missing SentenceOrder exercise`);

  for (const ex of detail.exercises) {
    assert(!seenChallengeIds.has(ex.id), `Duplicate exercise id: ${ex.id}`);
    seenChallengeIds.add(ex.id);
    assert(ex.id.startsWith('n3-'), `Exercise ${ex.id} must be scoped with n3-`);
    assert(
      nonEmpty(ex.explanationEn) && nonEmpty(ex.explanationBn),
      `Exercise ${ex.id} missing EN/BN explanation`,
    );

    if (ex.type === 'mcq') {
      assert(ex.choices.length >= 2, `MCQ ${ex.id} needs >= 2 choices`);
      assert(
        ex.choices.some((c) => c.id === ex.correctId),
        `MCQ ${ex.id} correctId ${ex.correctId} not in choices`,
      );
    } else if (ex.type === 'fill') {
      assert(
        nonEmpty(ex.answer) && nonEmpty(ex.promptJa) && nonEmpty(ex.promptEn),
        `Fill ${ex.id} missing fields`,
      );
    } else if (ex.type === 'order') {
      assert(
        ex.parts.length >= 2 && ex.parts.length === ex.correctOrder.length,
        `Order ${ex.id} parts/correctOrder length mismatch`,
      );
      assert(
        [...ex.parts].sort().join('|') === [...ex.correctOrder].sort().join('|'),
        `Order ${ex.id} parts do not match correctOrder`,
      );
      assert(new Set(ex.parts).size === ex.parts.length, `Order ${ex.id} has duplicate parts`);
    }
  }

  assert(
    detail.quizQuestions.length >= 3,
    `Lesson ${lesson.lessonNumber} needs >= 3 quizQuestions`,
  );
  for (const q of detail.quizQuestions) {
    assert(!seenChallengeIds.has(q.id), `Duplicate quiz id: ${q.id}`);
    seenChallengeIds.add(q.id);
    assert(q.id.startsWith('n3-'), `Quiz ${q.id} must be scoped with n3-`);
    assert(q.choices.length >= 2, `Quiz ${q.id} needs >= 2 choices`);
    assert(
      q.choices.some((c) => c.id === q.correctId),
      `Quiz ${q.id} correctId ${q.correctId} not in choices`,
    );
    assert(
      nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn),
      `Quiz ${q.id} missing EN/BN explanation`,
    );
  }

  assert(
    nonEmpty(detail.culturalDeepDiveEn) && nonEmpty(detail.culturalDeepDiveBn),
    `Lesson ${lesson.lessonNumber} missing culturalDeepDive`,
  );
}

// 3. Vocabulary & zero collision with N5/N4 IDs
const priorVocabIds = new Set([
  ...N5_VOCABULARY.map((v) => v.id),
  ...N4_VOCABULARY.map((v) => v.id),
]);
const vocabIds = new Set<string>();
assert(
  N3_PACKAGE.vocabulary.length >= 70,
  `Expected >= 70 N3 vocabulary entries, got ${N3_PACKAGE.vocabulary.length}`,
);
for (const entry of N3_PACKAGE.vocabulary) {
  assert(entry.id.startsWith('n3-'), `Vocab ${entry.id} must start with n3-`);
  assert(!priorVocabIds.has(entry.id), `Vocab ${entry.id} collides with N5/N4 vocab ID`);
  assert(!vocabIds.has(entry.id), `Duplicate N3 vocab id: ${entry.id}`);
  vocabIds.add(entry.id);
  assert(entry.level === 'N3', `Vocab ${entry.id} level is ${entry.level}`);
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

// 4. Kanji & zero overlap with N5/N4 Kanji
const priorKanjiSet = new Set([
  ...N5_KANJI.map((k) => k.character),
  ...N4_KANJI.map((k) => k.character),
]);
const kanjiChars = new Set<string>();
assert(
  N3_PACKAGE.kanji.length >= 40,
  `Expected >= 40 N3 kanji entries, got ${N3_PACKAGE.kanji.length}`,
);
for (const entry of N3_PACKAGE.kanji) {
  assert(
    !priorKanjiSet.has(entry.character),
    `N3 Kanji ${entry.character} overlaps with N5/N4 Kanji`,
  );
  assert(!kanjiChars.has(entry.character), `Duplicate N3 kanji: ${entry.character}`);
  kanjiChars.add(entry.character);
  assert(entry.level === 'N3', `Kanji ${entry.character} level is ${entry.level}`);
  assert(entry.strokeCount > 0, `Kanji ${entry.character} invalid strokeCount`);
  assert(
    entry.meaningsEn.length > 0 && entry.meaningsBn.length > 0,
    `Kanji ${entry.character} missing meanings`,
  );
  assert(
    entry.onyomi.length > 0 || entry.kunyomi.length > 0,
    `Kanji ${entry.character} missing readings`,
  );
  assert(
    nonEmpty(entry.radical) && nonEmpty(entry.radicalMeaningEn),
    `Kanji ${entry.character} missing radical`,
  );
  assert(entry.strokeOrder.length > 0, `Kanji ${entry.character} missing strokeOrder`);
  assert(entry.compounds.length > 0, `Kanji ${entry.character} missing compounds`);
  for (const c of entry.compounds) {
    assert(
      nonEmpty(c.word) && nonEmpty(c.reading) && nonEmpty(c.meaningEn) && nonEmpty(c.meaningBn),
      `Kanji ${entry.character} compound missing fields`,
    );
  }
}

// 5. Grammar
const priorGrammarIds = new Set([
  ...N5_GRAMMAR.map((g) => g.id),
  ...N4_GRAMMAR.map((g) => g.id),
]);
const grammarIds = new Set<string>();
const grammarLessons = new Set<number>();
assert(
  N3_PACKAGE.grammar.length >= 32,
  `Expected >= 32 N3 grammar patterns, got ${N3_PACKAGE.grammar.length}`,
);
for (const g of N3_PACKAGE.grammar) {
  assert(g.id.startsWith('n3-'), `Grammar ${g.id} must start with n3-`);
  assert(!priorGrammarIds.has(g.id), `Grammar ${g.id} collides with N5/N4 grammar ID`);
  assert(!grammarIds.has(g.id), `Duplicate N3 grammar id: ${g.id}`);
  grammarIds.add(g.id);
  grammarLessons.add(g.lesson);
  assert(g.lesson >= 1 && g.lesson <= 16, `Grammar ${g.id} invalid lesson ${g.lesson}`);
  assert(
    nonEmpty(g.pattern) &&
      nonEmpty(g.title) &&
      nonEmpty(g.formation) &&
      nonEmpty(g.explanationEn) &&
      nonEmpty(g.explanationBn),
    `Grammar ${g.id} missing fields`,
  );
  assert(g.examples.length > 0, `Grammar ${g.id} missing examples`);
}
for (let lesson = 1; lesson <= 16; lesson += 1) {
  assert(grammarLessons.has(lesson), `N3 Lesson ${lesson} has no grammar entry in N3_GRAMMAR`);
}

// 6. Reading
assert(
  N3_PACKAGE.readings.length >= 6,
  `Expected >= 6 N3 reading passages, got ${N3_PACKAGE.readings.length}`,
);
const readingIds = new Set<string>();
for (const r of N3_PACKAGE.readings) {
  assert(r.id.startsWith('n3-'), `Reading ${r.id} must start with n3-`);
  assert(!readingIds.has(r.id), `Duplicate reading id: ${r.id}`);
  readingIds.add(r.id);
  assert(
    r.lines.length > 0 && nonEmpty(r.translationEn) && nonEmpty(r.translationBn),
    `Reading ${r.id} missing content`,
  );
  assert(r.questions.length >= 2, `Reading ${r.id} needs >= 2 questions`);
  for (const q of r.questions) {
    assert(
      q.answer >= 0 && q.answer < q.choices.length,
      `Reading ${r.id} question answer out of range`,
    );
    assert(
      nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn),
      `Reading ${r.id} question missing explanations`,
    );
  }
}

// 7. Listening
assert(
  N3_PACKAGE.listening.length >= 6,
  `Expected >= 6 N3 listening conversations, got ${N3_PACKAGE.listening.length}`,
);
const listeningIds = new Set<string>();
for (const item of N3_PACKAGE.listening) {
  assert(item.id.startsWith('n3-'), `Listening ${item.id} must start with n3-`);
  assert(!listeningIds.has(item.id), `Duplicate listening id: ${item.id}`);
  listeningIds.add(item.id);
  assert(item.level === 'N3', `Listening ${item.id} level is ${item.level}`);
  assert(item.lines.length >= 2, `Listening ${item.id} needs >= 2 lines`);
  assert(item.questions.length >= 2, `Listening ${item.id} needs >= 2 questions`);
  for (const q of item.questions) {
    assert(
      q.answer >= 0 && q.answer < q.choices.length,
      `Listening ${item.id} question answer out of range`,
    );
    assert(
      nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn),
      `Listening ${item.id} question missing explanations`,
    );
  }
}

// 8. Speaking
assert(
  N3_PACKAGE.speakingPrompts.length >= 6,
  `Expected >= 6 N3 speaking prompts, got ${N3_PACKAGE.speakingPrompts.length}`,
);
const speakingIds = new Set<string>();
for (const s of N3_PACKAGE.speakingPrompts) {
  assert(s.id.startsWith('n3-'), `Speaking ${s.id} must start with n3-`);
  assert(!speakingIds.has(s.id), `Duplicate speaking id: ${s.id}`);
  speakingIds.add(s.id);
  assert(s.level === 'N3', `Speaking ${s.id} level is ${s.level}`);
  assert(
    nonEmpty(s.japanese) && nonEmpty(s.meaningEn) && nonEmpty(s.meaningBn) && nonEmpty(s.goal),
    `Speaking ${s.id} missing fields`,
  );
}

// 9. Exam
assert(N3_PACKAGE.examDurationSeconds > 0, 'N3_EXAM_DURATION_SECONDS must be > 0');
assert(
  N3_PACKAGE.examQuestions.length >= 12,
  `Expected >= 12 N3 exam questions, got ${N3_PACKAGE.examQuestions.length}`,
);
const examIds = new Set<string>();
for (const q of N3_PACKAGE.examQuestions) {
  assert(q.id.startsWith('n3-'), `Exam ${q.id} must start with n3-`);
  assert(!examIds.has(q.id), `Duplicate exam id: ${q.id}`);
  examIds.add(q.id);
  assert(
    q.answerIndex >= 0 && q.answerIndex < q.choices.length,
    `Exam ${q.id} answerIndex out of range`,
  );
  assert(
    nonEmpty(q.explanationEn) && nonEmpty(q.explanationBn),
    `Exam ${q.id} missing explanations`,
  );
}

console.log('--- JLPT N3 Content Audit Summary ---');
console.log(`Lessons: ${N3_PACKAGE.curriculum.length}`);
console.log(`Vocabulary: ${N3_PACKAGE.vocabulary.length}`);
console.log(`Kanji: ${N3_PACKAGE.kanji.length}`);
console.log(`Grammar: ${N3_PACKAGE.grammar.length} (lessons covered: ${grammarLessons.size}/16)`);
console.log(
  `Readings: ${N3_PACKAGE.readings.length} (${N3_PACKAGE.readings.reduce((acc, r) => acc + r.questions.length, 0)} questions)`,
);
console.log(
  `Listening: ${N3_PACKAGE.listening.length} (${N3_PACKAGE.listening.reduce((acc, l) => acc + l.questions.length, 0)} questions)`,
);
console.log(`Speaking: ${N3_PACKAGE.speakingPrompts.length}`);
console.log(`Exam: ${N3_PACKAGE.examQuestions.length} questions`);
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
