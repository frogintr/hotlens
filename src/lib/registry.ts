import type { KolRecord, TeardownRecord } from '../types/hotlens';

import vibeZhishi from '../../data/teardowns/vibe-zhishi.json';
import biteXinyu from '../../data/kols/bite-xinyu.json';

export const teardownRegistry: TeardownRecord[] = [
  vibeZhishi as TeardownRecord,
];

export const kolRegistry: KolRecord[] = [biteXinyu as KolRecord];
