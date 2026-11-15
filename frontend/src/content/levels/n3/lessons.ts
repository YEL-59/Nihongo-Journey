import { CurriculumPhase } from '@/content/shared/types';
import { CompactLessonSpec } from '@/content/shared/levelBuilder';
import { N3_LESSONS_PART1 } from './lessonsPart1';
import { N3_LESSONS_PART2A } from './lessonsPart2a';
import { N3_LESSONS_PART2 } from './lessonsPart2';

export const N3_PHASES: CurriculumPhase[] = [
  {
    phase: 1,
    titleEn: 'Habit Change, Effort & Decisions',
    titleBn: 'অভ্যাস পরিবর্তন, প্রচেষ্টা ও সিদ্ধান্ত',
    lessonRange: 'Lessons 1–4',
    descriptionEn:
      'Expressing gradual change (ようになる), conscious effort (ようにする), completion/prep (てしまう/ておく), tendencies (がちだ), and decisions (ことにする/ことになる).',
    descriptionBn:
      'ধীরে ধীরে পরিবর্তন, সচেতন চেষ্টা, পূর্বপ্রস্তুতি, প্রবণতা এবং ব্যক্তিগত ও প্রাতিষ্ঠানিক সিদ্ধান্ত প্রকাশ।',
  },
  {
    phase: 2,
    titleEn: 'Cause, Credit, Perspective & Contrast',
    titleBn: 'কারণ, কৃতিত্ব, দৃষ্টিভঙ্গি ও বৈপরীত্য',
    lessonRange: 'Lessons 5–8',
    descriptionEn:
      'Distinguishing positive causes (おかげで) from blame (せいで), framing viewpoints (にとって/に対して), and expressing contrast/concession (一方で/にもかかわらず).',
    descriptionBn:
      'ইতিবাচক ও নেতিবাচক কারণ, দৃষ্টিভঙ্গি, দুই দিকের তুলনা এবং বৈপরীত্য প্রকাশ।',
  },
  {
    phase: 3,
    titleEn: 'Nuanced Negation, Degree & Means',
    titleBn: 'সূক্ষ্ম অস্বীকৃতি, মাত্রা ও মাধ্যম',
    lessonRange: 'Lessons 9–12',
    descriptionEn:
      'Avoiding absolutes (わけではない/とは限らない), proportional change (ば〜ほど), time windows (うちに/間に), and sources/variation (によって/によると).',
    descriptionBn:
      'সূক্ষ্ম অস্বীকৃতি, সমানুপাতিক পরিবর্তন, সময়ের পরিসর এবং মাধ্যম ও তথ্যের উৎস প্রকাশ।',
  },
  {
    phase: 4,
    titleEn: 'Supposition, Requests & N3 Capstone',
    titleBn: 'অনুমান, অনুরোধ ও N3 ক্যাপস্টোন',
    lessonRange: 'Lessons 13–16',
    descriptionEn:
      'Expressing certainty/disbelief (に違いない/はずがない), impressions (らしい/っぽい/気味), requests (てほしい), and minimal conditions (さえ〜ば/からこそ).',
    descriptionBn:
      'দৃঢ় অনুমান ও অসম্ভবতা, ভাব ও উপসর্গ, অনুরোধ-অনুমতি এবং ন্যূনতম শর্ত প্রকাশ।',
  },
];

export const N3_LESSONS: CompactLessonSpec[] = [
  ...N3_LESSONS_PART1,
  ...N3_LESSONS_PART2A,
  ...N3_LESSONS_PART2,
];
