import { N1_LEVEL } from '@/content/levels/n1/level';
import { N2_LEVEL } from '@/content/levels/n2/level';
import { N3_LEVEL } from '@/content/levels/n3/level';
import { N4_LEVEL } from '@/content/levels/n4/level';
import { N5_LEVEL } from '@/content/levels/n5/level';
import { JLPTLevel, LevelMetadata } from '@/content/shared/types';

export const JLPT_LEVELS: LevelMetadata[] = [
  N5_LEVEL,
  N4_LEVEL,
  N3_LEVEL,
  N2_LEVEL,
  N1_LEVEL,
];

export function getLevelMetadata(level: JLPTLevel): LevelMetadata {
  const metadata = JLPT_LEVELS.find((item) => item.level === level);
  if (!metadata) throw new Error(`Missing metadata for JLPT level ${level}`);
  return metadata;
}

export function isLevelAvailable(level: JLPTLevel): boolean {
  return getLevelMetadata(level).status === 'available';
}
