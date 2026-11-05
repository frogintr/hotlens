import type { KolRecord, TeardownRecord } from '../types/hotlens';

import vibeZhishi from '../../data/teardowns/vibe-zhishi.json';
import insidebodyLab from '../../data/teardowns/insidebody-lab.json';
import biteXinyu from '../../data/kols/bite-xinyu.json';
import insidebodyLabKol from '../../data/kols/insidebody-lab.json';

export const teardownRegistry: TeardownRecord[] = [
  vibeZhishi as TeardownRecord,
  insidebodyLab as TeardownRecord,
];

export const kolRegistry: KolRecord[] = [
  biteXinyu as KolRecord,
  insidebodyLabKol as KolRecord,
];
