import { CurriculumPhase } from '@/content/shared/types';
import { CompactLessonSpec } from '@/content/shared/levelBuilder';
import { N2_LESSONS_PART1 } from './lessonsPart1';
import { N2_LESSONS_PART2A } from './lessonsPart2a';
import { N2_LESSONS_PART2 } from './lessonsPart2';

export const N2_PHASES: CurriculumPhase[] = [
  {
    phase: 1,
    titleEn: 'Formal Occasions, Grounds & Contrast',
    titleBn: 'আনুষ্ঠানিক উপলক্ষ, ভিত্তি ও বৈপরীত্য',
    lessonRange: 'Lessons 1–4',
    descriptionEn:
      'Framing milestones (にあたって/に際して), citing evidence (に基づいて/を踏まえて), formal contrast (にもかかわらず/一方で), and inevitability/risk (ざるを得ない/かねない).',
    descriptionBn:
      'গুরুত্বপূর্ণ সূচনা, তথ্যভিত্তিক সিদ্ধান্ত, আনুষ্ঠানিক বৈপরীত্য এবং বাধ্যবাধকতা ও ঝুঁকি প্রকাশ।',
  },
  {
    phase: 2,
    titleEn: 'Scope, Timing & Relationship',
    titleBn: 'ক্ষেত্র, সময় ও সম্পর্ক',
    lessonRange: 'Lessons 5–8',
    descriptionEn:
      'Defining formal domains and spans (において/にわたって), immediate sequence (次第/た途端), adaptation/shift (に応じて/に伴って), and inclusivity (にかかわらず/を問わず).',
    descriptionBn:
      'আনুষ্ঠানিক ক্ষেত্র ও ব্যাপ্তি, তাৎক্ষণিক ধারাবাহিকতা, পরিস্থিতি অনুযায়ী সমন্বয় এবং শর্তনিরপেক্ষতা প্রকাশ।',
  },
  {
    phase: 3,
    titleEn: 'Reasoning, Emphasis & Evaluation',
    titleBn: 'যুক্তি, গুরুত্ব ও মূল্যায়ন',
    lessonRange: 'Lessons 9–12',
    descriptionEn:
      'Expressing firm commitment (からには/以上は), constraints and urgency (わけにはいかない/どころではない), additive emphasis (ばかりか/のみならず), and inference (からすると/からして).',
    descriptionBn:
      'দৃঢ় অঙ্গীকার, বাধ্যবাধকতা ও জরুরি অবস্থা, অতিরিক্ত গুরুত্ব এবং লক্ষণ থেকে বিচার প্রকাশ।',
  },
  {
    phase: 4,
    titleEn: 'Nuance, Resolution & N2 Capstone',
    titleBn: 'সূক্ষ্ম ভাব, সিদ্ধান্ত ও N2 ক্যাপস্টোন',
    lessonRange: 'Lessons 13–16',
    descriptionEn:
      'Conveying deep impressions and advice (ものがある/ことだ), essence vs limits (にほかならない/にすぎない), hypotheticals/preconditions (たとしても/ないことには), and ongoing shifts (つつある/てならない).',
    descriptionBn:
      'গভীর অনুভূতি ও পরামর্শ, মূল সত্য বনাম সীমাবদ্ধতা, কাল্পনিক শর্ত এবং চলমান পরিবর্তন প্রকাশ।',
  },
];

export const N2_LESSONS: CompactLessonSpec[] = [
  ...N2_LESSONS_PART1,
  ...N2_LESSONS_PART2A,
  ...N2_LESSONS_PART2,
];
