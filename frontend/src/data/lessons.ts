// Detailed lesson content data: vocabulary, conversations, exercises per lesson
// Used by: /learn (index) and /lessons/[id] (12-section player)

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
  furigana?: string; // ruby markup: "日本語|にほんご" pairs joined by |
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
  promptJa: string; // Use ___ for blank
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
  parts: string[]; // shuffled parts to rearrange
  correctOrder: string[]; // correct sequence of parts
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

// --- Lesson 1: Self-Introductions & Identities ---
const lesson1: LessonDetail = {
  lessonId: 1,
  objectivesEn: [
    'Introduce yourself using は・です (A wa B desu)',
    'Negate identity with じゃありません',
    'Ask yes/no questions with the particle か',
    'Use も (too/also) and の (possessive)',
    'Politely ask about someone\'s nationality or profession',
  ],
  objectivesBn: [
    'は・です দিয়ে নিজের পরিচয় দেওয়া',
    'じゃありません দিয়ে নেতিবাচক বাক্য তৈরি',
    'か দিয়ে হ্যাঁ/না প্রশ্ন করা',
    'も (ও/আমিও) এবং の (মালিকানা) ব্যবহার',
    'বিনম্রভাবে জাতীয়তা বা পেশা জানতে চাওয়া',
  ],
  dialogue: [
    {
      speaker: 'マリア',
      japanese: 'はじめまして。マリアです。',
      furigana: '',
      romajiLine: 'Hajimemashite. Maria desu.',
      translationEn: 'Nice to meet you. I am Maria.',
      translationBn: 'আপনার সাথে পরিচিত হয়ে খুশি হলাম। আমি মারিয়া।',
    },
    {
      speaker: 'やまだ',
      japanese: 'はじめまして。やまだです。どうぞよろしく。',
      furigana: '',
      romajiLine: 'Hajimemashite. Yamada desu. Dōzo yoroshiku.',
      translationEn: 'Nice to meet you too. I am Yamada. Please treat me well.',
      translationBn: 'আমিও আপনার সাথে পরিচিত হয়ে খুশি। আমি ইয়ামাদা। ভালো থাকবেন।',
    },
    {
      speaker: 'マリア',
      japanese: 'やまださんは にほんじんですか。',
      furigana: '',
      romajiLine: 'Yamada-san wa Nihonjin desu ka?',
      translationEn: 'Mr. Yamada, are you Japanese?',
      translationBn: 'ইয়ামাদা সান, আপনি কি জাপানি?',
    },
    {
      speaker: 'やまだ',
      japanese: 'はい、にほんじんです。マリアさんは？',
      furigana: '',
      romajiLine: 'Hai, Nihonjin desu. Maria-san wa?',
      translationEn: 'Yes, I am Japanese. What about you, Maria?',
      translationBn: 'হ্যাঁ, আমি জাপানি। আপনি, মারিয়া সান?',
    },
    {
      speaker: 'マリア',
      japanese: 'わたしは ブラジルじんです。がくせいです。',
      furigana: '',
      romajiLine: 'Watashi wa Burajiru-jin desu. Gakusei desu.',
      translationEn: 'I am Brazilian. I am a student.',
      translationBn: 'আমি ব্রাজিলিয়ান। আমি একজন ছাত্রী।',
    },
  ],
  grammarNotesEn: `**Pattern 1 — N1 は N2 です (A is B)**
The は (wa) is the topic marker particle. It identifies what the sentence is about.
> わたし**は** がくせい**です**。→ I **am** a student.

**Pattern 2 — Negative: じゃありません**
To say "is not", replace です with じゃありません (casual) or ではありません (formal).
> やまださんは がくせい**じゃありません**。→ Yamada is **not** a student.

**Pattern 3 — Question: Sentence + か**
Add the particle か at the end (no rising intonation needed in writing):
> がくせいです**か**。→ Are you a student?

**Pattern 4 — も (also / too)**
も replaces は to mean "also":
> わたし**も** がくせいです。→ I am **also** a student.

**Pattern 5 — の (possessive / belonging)**
の connects nouns to show belonging or relationship:
> やまださんの でんわばんごう → Yamada's phone number`,

  grammarNotesBn: `**ধরন ১ — N1 は N2 です (A হলো B)**
は (wa) হলো বিষয় নির্দেশক কণা। এটি বাক্যের বিষয় চিহ্নিত করে।
> わたし**は** がくせい**です**。→ আমি ছাত্র/ছাত্রী।

**ধরন ২ — নেতিবাচক: じゃありません**
"নয়" বলতে です এর জায়গায় じゃありません (সাধারণ) বা ではありません (আনুষ্ঠানিক) ব্যবহার করুন।
> やまださんは がくせい**じゃありません**。→ ইয়ামাদা ছাত্র **নয়**।

**ধরন ৩ — প্রশ্ন: বাক্য + か**
বাক্যের শেষে か যোগ করুন (লেখায় স্বরের উঠানামা দরকার নেই):
> がくせいです**か**。→ আপনি কি ছাত্র/ছাত্রী?

**ধরন ৪ — も (ও / আমিও)**
は এর জায়গায় も বসালে "ও" বা "আমিও" অর্থ হয়:
> わたし**も** がくせいです।→ আমি**ও** ছাত্র/ছাত্রী।

**ধরন ৫ — の (মালিকানা/সম্পর্ক)**
দুটি বিশেষ্যের মধ্যে সম্পর্ক বা মালিকানা বোঝাতে の ব্যবহার হয়:
> やまださんの でんわばんごう → ইয়ামাদার ফোন নম্বর`,

  vocabulary: [
    { japanese: 'わたし', reading: 'わたし', romajiReading: 'watashi', meaningEn: 'I / me', meaningBn: 'আমি', exampleJa: 'わたしはがくせいです。', exampleEn: 'I am a student.', exampleBn: 'আমি একজন ছাত্র।', partOfSpeech: 'Pronoun' },
    { japanese: 'あなた', reading: 'あなた', romajiReading: 'anata', meaningEn: 'you', meaningBn: 'আপনি / তুমি', exampleJa: 'あなたはだれですか。', exampleEn: 'Who are you?', exampleBn: 'আপনি কে?', partOfSpeech: 'Pronoun' },
    { japanese: 'がくせい', reading: 'がくせい', romajiReading: 'gakusei', meaningEn: 'student', meaningBn: 'ছাত্র/ছাত্রী', exampleJa: 'マリアさんはがくせいです。', exampleEn: 'Maria is a student.', exampleBn: 'মারিয়া একজন ছাত্রী।', partOfSpeech: 'Noun' },
    { japanese: 'せんせい', reading: 'せんせい', romajiReading: 'sensei', meaningEn: 'teacher', meaningBn: 'শিক্ষক', exampleJa: 'やまださんはせんせいです。', exampleEn: 'Yamada-san is a teacher.', exampleBn: 'ইয়ামাদা সান শিক্ষক।', partOfSpeech: 'Noun' },
    { japanese: 'かいしゃいん', reading: 'かいしゃいん', romajiReading: 'kaishain', meaningEn: 'company employee', meaningBn: 'কোম্পানির কর্মকর্তা', exampleJa: 'わたしはかいしゃいんです。', exampleEn: 'I am a company employee.', exampleBn: 'আমি একজন কোম্পানির কর্মকর্তা।', partOfSpeech: 'Noun' },
    { japanese: 'にほんじん', reading: 'にほんじん', romajiReading: 'Nihonjin', meaningEn: 'Japanese person', meaningBn: 'জাপানি ব্যক্তি', exampleJa: 'やまださんはにほんじんです。', exampleEn: 'Yamada-san is Japanese.', exampleBn: 'ইয়ামাদা সান জাপানি।', partOfSpeech: 'Noun' },
    { japanese: 'なんさいですか', reading: 'なんさいですか', romajiReading: 'nan-sai desu ka', meaningEn: 'How old are you?', meaningBn: 'আপনার বয়স কত?', exampleJa: 'なんさいですか。にじゅうさんさいです。', exampleEn: 'How old are you? I am 23.', exampleBn: 'আপনার বয়স কত? আমার বয়স ২৩।', partOfSpeech: 'Phrase' },
    { japanese: 'はじめまして', reading: 'はじめまして', romajiReading: 'hajimemashite', meaningEn: 'Nice to meet you (first meeting)', meaningBn: 'প্রথম পরিচয়ে শুভেচ্ছা', exampleJa: 'はじめまして。マリアです。', exampleEn: 'Nice to meet you. I\'m Maria.', exampleBn: 'সাক্ষাৎ পেয়ে ভালো লাগলো। আমি মারিয়া।', partOfSpeech: 'Greeting' },
    { japanese: 'どうぞよろしく', reading: 'どうぞよろしく', romajiReading: 'dōzo yoroshiku', meaningEn: 'Please treat me well', meaningBn: 'অনুগ্রহ করে সদয় থাকবেন', exampleJa: 'どうぞよろしくおねがいします。', exampleEn: 'I look forward to working with you.', exampleBn: 'আপনার সাথে কাজ করতে পেরে আনন্দিত হব।', partOfSpeech: 'Greeting' },
    { japanese: 'しつれいですが', reading: 'しつれいですが', romajiReading: 'shitsurei desu ga', meaningEn: 'Excuse me, but... (polite preface)', meaningBn: 'মাফ করবেন, কিন্তু...', exampleJa: 'しつれいですが、おなまえは？', exampleEn: 'Excuse me, what is your name?', exampleBn: 'ক্ষমা করবেন, আপনার নাম কী?', partOfSpeech: 'Phrase' },
  ],

  listeningTip: 'In Japanese, the は particle sounds like "wa" (not "ha") when used as a topic marker. Listen carefully to this subtle shift from its written form.',
  speakingPromptEn: 'Practice introducing yourself: state your name, nationality, and occupation. Then ask your partner\'s name using ～さんは？',
  speakingPromptBn: 'নিজের পরিচয় দেওয়ার অনুশীলন করুন: আপনার নাম, জাতীয়তা এবং পেশা বলুন। তারপর আপনার অংশীদারের নাম জানতে ～さんは？ ব্যবহার করুন।',

  exercises: [
    {
      type: 'mcq',
      id: 'l1-ex1',
      questionJa: 'やまださんは がくせいですか。いいえ、やまださんは _____ です。',
      questionEn: 'Yamada is not a student. He is a teacher. Fill in the blank.',
      choices: [
        { id: 'a', text: 'にほんじん' },
        { id: 'b', text: 'せんせい' },
        { id: 'c', text: 'がくせいじゃありません' },
        { id: 'd', text: 'マリアさん' },
      ],
      correctId: 'b',
      explanationEn: 'せんせい (sensei) means "teacher". The sentence is "Yamada-san is a teacher."',
      explanationBn: 'せんせい মানে শিক্ষক। বাক্যটি হলো: ইয়ামাদা সান শিক্ষক।',
    },
    {
      type: 'fill',
      id: 'l1-ex2',
      promptJa: 'わたし ___ マリアです。(I am Maria)',
      promptEn: 'I am Maria. Use the correct topic marker particle.',
      answer: 'は',
      hint: 'Topic marker particle (sounds like "wa")',
      explanationEn: 'は (wa) is the topic marker particle used before です to state identity.',
      explanationBn: 'は (wa) হলো বিষয় নির্দেশক কণা যা です এর আগে পরিচয় জানাতে ব্যবহৃত হয়।',
    },
    {
      type: 'order',
      id: 'l1-ex3',
      instructionEn: 'Rearrange these words to form: "Are you a student?" in Japanese.',
      instructionBn: 'এই শব্দগুলো সাজিয়ে "আপনি কি ছাত্র?" বাক্যটি তৈরি করুন।',
      parts: ['ですか', 'あなた', 'は', 'がくせい'],
      correctOrder: ['あなた', 'は', 'がくせい', 'ですか'],
      explanationEn: 'Japanese word order: Topic (あなたは) + Predicate (がくせいですか).',
      explanationBn: 'জাপানি বাক্যের ক্রম: বিষয় (あなたは) + বিধেয় (がくせいですか)।',
    },
    {
      type: 'mcq',
      id: 'l1-ex4',
      questionJa: 'マリアさんも がくせいです。The particle も means:',
      questionEn: 'What does the particle も mean in this sentence?',
      choices: [
        { id: 'a', text: 'Is (copula)' },
        { id: 'b', text: 'Also / Too' },
        { id: 'c', text: 'Not' },
        { id: 'd', text: 'Possessive' },
      ],
      correctId: 'b',
      explanationEn: 'も replaces は and means "also" or "too" — indicating Maria is also a student (like someone else mentioned).',
      explanationBn: 'も হলো "ও" বা "আমিও" অর্থে ব্যবহৃত কণা, যা は এর জায়গায় বসে।',
    },
  ],

  quizQuestions: [
    {
      id: 'l1-q1',
      questionEn: 'How do you say "I am a student" in Japanese?',
      questionJa: '「私は学生です」の正しい読み方は？',
      choices: [
        { id: 'a', text: 'わたしはがくせいじゃありません。' },
        { id: 'b', text: 'わたしはがくせいですか。' },
        { id: 'c', text: 'わたしはがくせいです。' },
        { id: 'd', text: 'がくせいはわたしです。' },
      ],
      correctId: 'c',
      explanationEn: 'わたしはがくせいです = Watashi wa gakusei desu = I am a student.',
      explanationBn: 'わたしはがくせいです = আমি একজন ছাত্র/ছাত্রী।',
    },
    {
      id: 'l1-q2',
      questionEn: 'Which particle asks a yes/no question?',
      questionJa: 'はい・いいえの質問をするときに使う助詞は？',
      choices: [
        { id: 'a', text: 'は' },
        { id: 'b', text: 'も' },
        { id: 'c', text: 'の' },
        { id: 'd', text: 'か' },
      ],
      correctId: 'd',
      explanationEn: 'か is the question particle. Add it at the end of a statement to make it a question.',
      explanationBn: 'か হলো প্রশ্ন কণা। বাক্যের শেষে か যোগ করলে সেটি প্রশ্নে পরিণত হয়।',
    },
    {
      id: 'l1-q3',
      questionEn: 'How do you say "I am NOT a teacher"?',
      questionJa: '「私は先生ではありません」の口語表現は？',
      choices: [
        { id: 'a', text: 'わたしはせんせいです。' },
        { id: 'b', text: 'わたしはせんせいじゃありません。' },
        { id: 'c', text: 'わたしもせんせいです。' },
        { id: 'd', text: 'せんせいはわたしですか。' },
      ],
      correctId: 'b',
      explanationEn: 'じゃありません is the casual negative of です meaning "is not".',
      explanationBn: 'じゃありません হলো です এর নেতিবাচক রূপ, যার অর্থ "নয়"।',
    },
    {
      id: 'l1-q4',
      questionEn: 'What does やまださんのかばん mean?',
      questionJa: '「山田さんのかばん」の意味は？',
      choices: [
        { id: 'a', text: 'Yamada\'s bag' },
        { id: 'b', text: 'Yamada is a bag' },
        { id: 'c', text: 'Yamada\'s teacher' },
        { id: 'd', text: 'Bag and Yamada' },
      ],
      correctId: 'a',
      explanationEn: 'の shows possession. やまださんのかばん = Yamada-san\'s bag.',
      explanationBn: 'の মালিকানা বোঝায়। やまださんのかばん = ইয়ামাদার ব্যাগ।',
    },
    {
      id: 'l1-q5',
      questionEn: 'What is the first thing you say when meeting someone in Japanese?',
      questionJa: '初対面のあいさつは？',
      choices: [
        { id: 'a', text: 'どうぞよろしく' },
        { id: 'b', text: 'はじめまして' },
        { id: 'c', text: 'しつれいですが' },
        { id: 'd', text: 'ありがとうございます' },
      ],
      correctId: 'b',
      explanationEn: 'はじめまして (Hajimemashite) is the standard first-time greeting meaning "Nice to meet you".',
      explanationBn: 'はじめまして হলো প্রথম সাক্ষাতের আনুষ্ঠানিক অভিবাদন — "আপনার সাথে পরিচিত হয়ে ভালো লাগলো"।',
    },
  ],

  culturalDeepDiveEn: `**Japanese Bowing (お辞儀 — Ojigi)**
Bowing is the cornerstone of Japanese social interaction. Unlike handshakes in Western cultures, bowing communicates respect, gratitude, and apology. The depth and duration of a bow signals the level of formality:
- **15° bow** — casual greeting between equals or friends
- **30° bow** — standard polite greeting in business settings
- **45° bow** — deep respect, senior persons, or sincere apology
- **90° bow** — very rare; profound apology or extreme reverence

**Business Card Etiquette (名刺交換 — Meishi Kōkan)**
Exchanging business cards is a solemn ritual in Japan:
1. Present your card with **both hands**, text facing the recipient
2. Bow slightly when offering
3. Receive the other's card with **both hands** and study it respectfully for a few seconds
4. Never write on, fold, or casually tuck away a received card — place it carefully on the table or in a card holder`,

  culturalDeepDiveBn: `**জাপানি অভিবাদন — ওজিগি (お辞儀)**
মাথা নত করে অভিবাদন জানানো (ওজিগি) জাপানি সামাজিক মিথস্ক্রিয়ার মূল ভিত্তি। পশ্চিমা করমর্দনের মতো এখানে মাথা নত করা সম্মান, কৃতজ্ঞতা এবং ক্ষমা প্রার্থনার প্রতীক:
- **১৫° নত হওয়া** — সমবয়সী বা বন্ধুদের মধ্যে সাধারণ অভিবাদন
- **৩০° নত হওয়া** — ব্যবসায়িক পরিবেশে মানসম্পন্ন সৌজন্য অভিবাদন
- **৪৫° নত হওয়া** — বয়োজ্যেষ্ঠ বা উচ্চপদস্থ ব্যক্তিকে গভীর সম্মান প্রদর্শন
- **৯০° নত হওয়া** — অত্যন্ত বিরল; গভীর ক্ষমাপ্রার্থনা বা চরম শ্রদ্ধা

**বিজনেস কার্ড আদান-প্রদান (名刺交換 — মেইশি কৌকান)**
জাপানে বিজনেস কার্ড আদান-প্রদান একটি গম্ভীর আচার:
১. **দুই হাতে** কার্ড দিন, টেক্সট গ্রহণকারীর দিকে মুখ করে
২. দেওয়ার সময় সামান্য মাথা নত করুন
৩. অপরের কার্ড **দুই হাতে** গ্রহণ করুন এবং কয়েক সেকেন্ড মনোযোগ দিয়ে পড়ুন
৪. গৃহীত কার্ডে কখনো লিখবেন না, ভাঁজ করবেন না বা অযত্নে রাখবেন না — টেবিলে সাবধানে রাখুন বা কার্ড হোল্ডারে রাখুন`,
};

// --- Lesson 2: Pointing Objects ---
const lesson2: LessonDetail = {
  lessonId: 2,
  objectivesEn: [
    'Use これ/それ/あれ (this/that/that over there) to point to objects',
    'Use この/その/あの + noun as modifiers',
    'Agree and disagree with そうです / そうじゃありません',
    'Ask what something is with ～は なんですか',
    'Identify items using ～は ～のです (belongs to)',
  ],
  objectivesBn: [
    'これ/それ/あれ দিয়ে কাছে ও দূরের জিনিস নির্দেশ করা',
    'この/その/あの + বিশেষ্য মডিফায়ার হিসেবে ব্যবহার',
    'সম্মতি ও অসম্মতি জানাতে そうです / そうじゃありません',
    '～は なんですか দিয়ে জিনিস কী জিজ্ঞাসা',
    '～は ～のです দিয়ে মালিকানা নির্দেশ',
  ],
  dialogue: [
    {
      speaker: 'マリア',
      japanese: 'すみません、これは なんですか。',
      romajiLine: 'Sumimasen, kore wa nan desu ka?',
      translationEn: 'Excuse me, what is this?',
      translationBn: 'ক্ষমা করবেন, এটা কী?',
    },
    {
      speaker: 'やまだ',
      japanese: 'それは ケータイです。',
      romajiLine: 'Sore wa keetai desu.',
      translationEn: 'That is a mobile phone.',
      translationBn: 'সেটা একটা মোবাইল ফোন।',
    },
    {
      speaker: 'マリア',
      japanese: 'あれも やまださんの ケータイですか。',
      romajiLine: 'Are mo Yamada-san no keetai desu ka?',
      translationEn: 'Is that over there also Yamada-san\'s mobile phone?',
      translationBn: 'ওটাও কি ইয়ামাদা সানের মোবাইল ফোন?',
    },
    {
      speaker: 'やまだ',
      japanese: 'いいえ、そうじゃありません。あれは たなかさんの ケータイです。',
      romajiLine: 'Iie, sō ja arimasen. Are wa Tanaka-san no keetai desu.',
      translationEn: 'No, that\'s not right. That is Tanaka-san\'s mobile phone.',
      translationBn: 'না, তা নয়। ওটা তানাকা সানের মোবাইল ফোন।',
    },
  ],
  grammarNotesEn: `**Demonstrative Pronouns: これ / それ / あれ**
These pronouns replace nouns entirely:
- **これ** (kore) — this (near the speaker)
- **それ** (sore) — that (near the listener)
- **あれ** (are) — that over there (far from both)

**Demonstrative Modifiers: この / その / あの**
These come directly before nouns:
- **この** ほん → this book
- **その** ほん → that book
- **あの** ほん → that book over there

**そうです / そうじゃありません**
- そうです → That's right / Yes (agreeing with a statement)
- そうじゃありません → That's not right (polite disagreement)`,

  grammarNotesBn: `**নির্দেশক সর্বনাম: これ / それ / あれ**
এই সর্বনামগুলো বিশেষ্যের সম্পূর্ণ জায়গা নেয়:
- **これ** (কোরে) — এটা (বক্তার কাছে)
- **それ** (সোরে) — ওটা (শ্রোতার কাছে)
- **あれ** (আরে) — সেটা (উভয়ের থেকে দূরে)

**নির্দেশক মডিফায়ার: この / その / あの**
এগুলো সরাসরি বিশেষ্যের আগে বসে:
- **この** ほん → এই বই
- **その** ほん → ওই বই
- **あの** ほん → সেই বই (দূরে)

**そうです / そうじゃありません**
- そうです → হ্যাঁ, তাই / একমত
- そうじゃありません → না, তা নয় (বিনম্র দ্বিমত)`,

  vocabulary: [
    { japanese: 'これ', reading: 'これ', romajiReading: 'kore', meaningEn: 'this (thing)', meaningBn: 'এটা (কাছে)', exampleJa: 'これはほんです。', exampleEn: 'This is a book.', exampleBn: 'এটা একটা বই।', partOfSpeech: 'Pronoun' },
    { japanese: 'それ', reading: 'それ', romajiReading: 'sore', meaningEn: 'that (thing near listener)', meaningBn: 'ওটা (শ্রোতার কাছে)', exampleJa: 'それはなんですか。', exampleEn: 'What is that?', exampleBn: 'ওটা কী?', partOfSpeech: 'Pronoun' },
    { japanese: 'あれ', reading: 'あれ', romajiReading: 'are', meaningEn: 'that (thing over there)', meaningBn: 'সেটা (দূরে)', exampleJa: 'あれはたなかさんのかさです。', exampleEn: 'That over there is Tanaka\'s umbrella.', exampleBn: 'সেটা তানাকার ছাতা।', partOfSpeech: 'Pronoun' },
    { japanese: 'なん / なに', reading: 'なん / なに', romajiReading: 'nan / nani', meaningEn: 'what', meaningBn: 'কী / কি', exampleJa: 'これはなんですか。', exampleEn: 'What is this?', exampleBn: 'এটা কী?', partOfSpeech: 'Interrogative' },
    { japanese: 'ほん', reading: 'ほん', romajiReading: 'hon', meaningEn: 'book', meaningBn: 'বই', exampleJa: 'これはにほんごのほんです。', exampleEn: 'This is a Japanese language book.', exampleBn: 'এটা জাপানি ভাষার বই।', partOfSpeech: 'Noun' },
    { japanese: 'かさ', reading: 'かさ', romajiReading: 'kasa', meaningEn: 'umbrella', meaningBn: 'ছাতা', exampleJa: 'このかさはいくらですか。', exampleEn: 'How much is this umbrella?', exampleBn: 'এই ছাতার দাম কত?', partOfSpeech: 'Noun' },
    { japanese: 'かばん', reading: 'かばん', romajiReading: 'kaban', meaningEn: 'bag', meaningBn: 'ব্যাগ', exampleJa: 'そのかばんはだれのですか。', exampleEn: 'Whose bag is that?', exampleBn: 'ওই ব্যাগটা কার?', partOfSpeech: 'Noun' },
    { japanese: 'じしょ', reading: 'じしょ', romajiReading: 'jisho', meaningEn: 'dictionary', meaningBn: 'অভিধান', exampleJa: 'あのじしょはたかいです。', exampleEn: 'That dictionary over there is expensive.', exampleBn: 'সেই অভিধানটা দামি।', partOfSpeech: 'Noun' },
  ],

  listeningTip: 'Pay attention to whether the speaker uses kore, sore, or are — it reveals where the object is in relation to both speakers.',
  speakingPromptEn: 'Practice pointing to objects around you and saying what they are. Try: 「これは ___です。」 and ask your partner 「それは なんですか？」',
  speakingPromptBn: 'আপনার চারপাশের জিনিসগুলো দেখিয়ে বলার অনুশীলন করুন। চেষ্টা করুন: 「これは ___です。」 এবং আপনার অংশীদারকে জিজ্ঞেস করুন 「それは なんですか？」',

  exercises: [
    {
      type: 'mcq',
      id: 'l2-ex1',
      questionJa: 'The book is near you (the listener). Which demonstrative is correct?',
      questionEn: 'The object is near the listener (you). Which word do you use?',
      choices: [
        { id: 'a', text: 'これ' },
        { id: 'b', text: 'それ' },
        { id: 'c', text: 'あれ' },
        { id: 'd', text: 'どれ' },
      ],
      correctId: 'b',
      explanationEn: 'それ (sore) is used for objects near the listener (the person being spoken to).',
      explanationBn: 'それ শ্রোতার কাছের জিনিসের জন্য ব্যবহার হয়।',
    },
    {
      type: 'fill',
      id: 'l2-ex2',
      promptJa: '___ ほんは マリアさんのです。(This book is Maria\'s.)',
      promptEn: 'Choose the correct modifier for "this book" (book is near the speaker).',
      answer: 'この',
      hint: 'Modifier form of これ',
      explanationEn: 'この is the modifier form of これ — it goes directly before a noun.',
      explanationBn: 'この হলো これ এর মডিফায়ার রূপ — এটা সরাসরি বিশেষ্যের আগে বসে।',
    },
    {
      type: 'order',
      id: 'l2-ex3',
      instructionEn: 'Rearrange to say: "That over there is Yamada\'s umbrella."',
      instructionBn: '"সেই দূরের ছাতাটা ইয়ামাদার।" বাক্যটি সাজান।',
      parts: ['あれ', 'やまださんの', 'は', 'かさです'],
      correctOrder: ['あれ', 'は', 'やまださんの', 'かさです'],
      explanationEn: 'Structure: あれは (that is) + やまださんの (Yamada\'s) + かさです (umbrella).',
      explanationBn: 'গঠন: あれは (সেটা হলো) + やまださんの (ইয়ামাদার) + かさです (ছাতা)।',
    },
  ],

  quizQuestions: [
    {
      id: 'l2-q1',
      questionEn: 'You want to refer to something far from both you and the listener. Which word do you use?',
      questionJa: '話者にも聞き手にも遠いものを指す言葉は？',
      choices: [
        { id: 'a', text: 'これ' },
        { id: 'b', text: 'それ' },
        { id: 'c', text: 'あれ' },
        { id: 'd', text: 'どれ' },
      ],
      correctId: 'c',
      explanationEn: 'あれ refers to things far from both the speaker and listener.',
      explanationBn: 'あれ বক্তা ও শ্রোতা উভয়ের থেকে দূরের জিনিস বোঝায়।',
    },
    {
      id: 'l2-q2',
      questionEn: 'How do you ask "What is this?" in Japanese?',
      questionJa: '「これは何ですか」の正しい表現は？',
      choices: [
        { id: 'a', text: 'これはだれですか。' },
        { id: 'b', text: 'これはなんですか。' },
        { id: 'c', text: 'これはどこですか。' },
        { id: 'd', text: 'これはいくらですか。' },
      ],
      correctId: 'b',
      explanationEn: 'なんですか means "what is it?" — the correct question for identifying unknown objects.',
      explanationBn: 'なんですか মানে "এটা কী?" — অজানা জিনিস শনাক্ত করার সঠিক প্রশ্ন।',
    },
    {
      id: 'l2-q3',
      questionEn: 'そうじゃありません is used to:',
      questionJa: 'そうじゃありませんの意味は？',
      choices: [
        { id: 'a', text: 'Ask a question' },
        { id: 'b', text: 'Agree with a statement' },
        { id: 'c', text: 'Politely disagree' },
        { id: 'd', text: 'State a price' },
      ],
      correctId: 'c',
      explanationEn: 'そうじゃありません means "That is not right" — a polite way to disagree or correct someone.',
      explanationBn: 'そうじゃありません মানে "তা নয়" — ভদ্রভাবে দ্বিমত পোষণ বা সংশোধন করার উপায়।',
    },
    {
      id: 'l2-q4',
      questionEn: 'Which is correct for "that bag" (near the listener)?',
      questionJa: '聞き手の近くにあるかばんを指す表現は？',
      choices: [
        { id: 'a', text: 'このかばん' },
        { id: 'b', text: 'そのかばん' },
        { id: 'c', text: 'あのかばん' },
        { id: 'd', text: 'どのかばん' },
      ],
      correctId: 'b',
      explanationEn: 'その is the modifier form of それ — used for things near the listener.',
      explanationBn: 'その হলো それ এর মডিফায়ার রূপ — শ্রোতার কাছের জিনিসের জন্য।',
    },
    {
      id: 'l2-q5',
      questionEn: 'What does 「それは やまださんのです」mean?',
      questionJa: '「それは山田さんのです」の意味は？',
      choices: [
        { id: 'a', text: 'Is Yamada-san that?' },
        { id: 'b', text: 'That is Yamada-san.' },
        { id: 'c', text: 'That is Yamada-san\'s (belonging).' },
        { id: 'd', text: 'Yamada-san is not that.' },
      ],
      correctId: 'c',
      explanationEn: 'やまださんのです = Yamada-san\'s. The の ending without a following noun means possession.',
      explanationBn: 'やまださんのです = ইয়ামাদার। の এর পরে বিশেষ্য না থাকলে মালিকানা বোঝায়।',
    },
  ],

  culturalDeepDiveEn: `**Omiyage (お土産) — The Art of Gift-Giving in Japan**
When Japanese people travel, it is an almost universal custom to bring back omiyage (souvenirs/snacks) for colleagues, friends, and family. This practice is deeply ingrained:
- **Never return empty-handed** from a trip, even a weekend getaway
- Omiyage are typically local specialty foods (sweets, snacks) in attractive packaging
- In offices, omiyage boxes are placed in communal areas for all to share
- The act matters more than the item — it shows you thought of others while away
- Japanese train stations and airports are designed with large omiyage shopping areas specifically for this purpose`,

  culturalDeepDiveBn: `**ওমিয়াগে (お土産) — জাপানের উপহার সংস্কৃতি**
জাপানিরা যেকোনো ভ্রমণ থেকে ফেরার সময় সহকর্মী, বন্ধু এবং পরিবারের জন্য ওমিয়াগে (স্মৃতিচিহ্ন/মিষ্টান্ন) নিয়ে আসেন। এটি গভীরভাবে প্রোথিত একটি রীতি:
- **কখনো খালি হাতে ফিরবেন না** — সপ্তাহান্তের ছোট ভ্রমণ থেকেও
- ওমিয়াগে সাধারণত স্থানীয় বিশেষ খাবার (মিষ্টি, স্ন্যাক্স) সুন্দর প্যাকেজিংয়ে
- অফিসে এটি সবার সাথে ভাগ করে নেওয়ার জন্য সাধারণ জায়গায় রাখা হয়
- জিনিসটার চেয়ে ভাবনাটা বেশি গুরুত্বপূর্ণ — আপনি দূরে থেকেও অন্যদের কথা মনে রেখেছেন
- জাপানের ট্রেন স্টেশন ও বিমানবন্দরে বিশেষভাবে বড় ওমিয়াগে শপিং এরিয়া থাকে`,
};

// Master map: lessonId -> detail
export const LESSON_DETAILS: Record<number, LessonDetail> = {
  1: lesson1,
  2: lesson2,
};

// Helper to get lesson detail with fallback for lessons without full detail yet
export function getLessonDetail(lessonId: number): LessonDetail | null {
  return LESSON_DETAILS[lessonId] ?? null;
}
