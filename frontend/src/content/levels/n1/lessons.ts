import { CurriculumPhase } from '@/content/shared/types';
import { CompactLessonSpec } from '@/content/shared/levelBuilder';
import { N1_LESSONS_PART1 } from './lessonsPart1';
import { N1_LESSONS_PART2A } from './lessonsPart2a';
import { N1_LESSONS_PART2 } from './lessonsPart2';

export const N1_PHASES: CurriculumPhase[] = [
  {
    phase: 1,
    titleEn: 'Editorial, Necessity & Literary Nuance',
    titleBn: 'সম্পাদকীয়, বাধ্যবাধকতা ও সাহিত্যিক সূক্ষ্মতা',
    lessonRange: 'Lessons 1–4',
    descriptionEn:
      'Express forced necessity (を余儀なくされる), essence (にほかならない), enduring emotion (てやまない), synergy (と相まって), and concession (ないまでも).',
    descriptionBn:
      'বাধ্যবাধকতা, মূলসত্তা, গভীর আবেগ, সম্মিলিত প্রভাব ও সূক্ষ্ম ছাড় প্রকাশ।',
  },
  {
    phase: 2,
    titleEn: 'Scope, Authority & Inevitability',
    titleBn: 'পরিসর, বাস্তবতা ও অবশ্যম্ভাবী পরিণতি',
    lessonRange: 'Lessons 5–8',
    descriptionEn:
      'Master unconditional scope (を問わず, いかんによらず), factual alignment (に即して), impossibility (べくもない), and turning points (に至って初めて).',
    descriptionBn:
      'শর্তহীন পরিসর, বাস্তবতার সাথে সামঞ্জস্য, অসম্ভাব্যতা ও উপলব্ধির চূড়ান্ত মুহূর্ত।',
  },
  {
    phase: 3,
    titleEn: 'Hypotheticals, Concession & Extreme Contrast',
    titleBn: 'অনুমান, শর্ত ও তীব্র বৈপরীত্য',
    lessonRange: 'Lessons 9–12',
    descriptionEn:
      'Convey futility (たところで), contingency (ようによっては, 次第では), vivid intensity (んばかりに), and disregard (をよそに, を尻目に).',
    descriptionBn:
      'নিরর্থকতা, পদ্ধতি-নির্ভরতা, তীব্রতা ও উপেক্ষার সূক্ষ্ম প্রকাশ।',
  },
  {
    phase: 4,
    titleEn: 'Formal Judgement, Causation & N1 Capstone',
    titleBn: 'আনুষ্ঠানিক মূল্যায়ন ও N1 সমাপনী',
    lessonRange: 'Lessons 13–16',
    descriptionEn:
      'Articulate uniqueness (ならではの), high-stakes thresholds (ともなると), tendencies (きらいがある), and formal declarations (をもって, に堪えない).',
    descriptionBn:
      'অনন্য বৈশিষ্ট্য, উচ্চতর স্তরের দায়, প্রবণতা ও আনুষ্ঠানিক সমাপনী ঘোষণা।',
  },
];

export const N1_LESSONS: CompactLessonSpec[] = [
  ...N1_LESSONS_PART1,
  ...N1_LESSONS_PART2A,
  ...N1_LESSONS_PART2,
];
