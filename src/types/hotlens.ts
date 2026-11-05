export interface TeardownMetrics {
  views?: number;
  likes: number;
  comments: number;
  shares: number;
  capturedAt: string;
}

export interface TeardownRecord {
  slug: string;
  title: string;
  platform:
    | 'youtube'
    | 'tiktok'
    | 'instagram'
    | 'x'
    | 'bilibili'
    | 'douyin'
    | 'xiaohongshu'
    | 'weibo'
    | 'reddit';
  sourceUrl: string;
  sourceId: string;
  thumbnailUrl: string;
  embedUrl?: string;
  kol: { handle: string; profileUrl: string };
  publishedAt: string;
  metrics: TeardownMetrics;
  heatScore: number;
  topic: string;
  hookType: string;
  timeline: { t: string; what: string }[];
  scriptFormula: string;
  visualFormula: string;
  titleCoverFormula: string;
  replicationSteps: string[];
  checklist: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  cost: string;
  gear: string[];
  risks: string[];
  teardownDate: string;
}

export interface KolRecord {
  handle: string;
  displayName: string;
  platform: TeardownRecord['platform'];
  profileUrl: string;
  whyWorthLearning: string;
  signatureFormula: string;
  difficultyRating: number;
  teardownSlugs: string[];
}
