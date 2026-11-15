import { N5_PACKAGE } from '@/content/levels/n5';
import { N4_PACKAGE } from '@/content/levels/n4';
import { N3_PACKAGE } from '@/content/levels/n3';
import { N2_PACKAGE } from '@/content/levels/n2';
import { N1_PACKAGE } from '@/content/levels/n1';
import { JLPTLevel, LevelContentPackage } from '@/content/shared/types';

const PACKAGES_BY_LEVEL: Record<JLPTLevel, LevelContentPackage> = {
  N5: N5_PACKAGE,
  N4: N4_PACKAGE,
  N3: N3_PACKAGE,
  N2: N2_PACKAGE,
  N1: N1_PACKAGE,
};

export function getLevelContent(level: JLPTLevel): LevelContentPackage {
  return PACKAGES_BY_LEVEL[level] ?? N5_PACKAGE;
}
