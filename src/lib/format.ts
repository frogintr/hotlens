import type { TeardownRecord } from '../types/hotlens';

/** 数字格式化：203000 -> "20.3万"，18000 -> "1.8万"，157 -> "157" */
export function formatCount(n: number): string {
  if (n >= 100_000_000) {
    return trimZero((n / 100_000_000).toFixed(1)) + '亿';
  }
  if (n >= 10_000) {
    return trimZero((n / 10_000).toFixed(1)) + '万';
  }
  return n.toLocaleString('zh-CN');
}

function trimZero(s: string): string {
  return s.endsWith('.0') ? s.slice(0, -2) : s;
}

export const PLATFORM_LABELS: Record<TeardownRecord['platform'], string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  x: 'X',
  bilibili: '哔哩哔哩',
  douyin: '抖音',
  xiaohongshu: '小红书',
  weibo: '微博',
  reddit: 'Reddit',
};

export function platformLabel(platform: TeardownRecord['platform']): string {
  return PLATFORM_LABELS[platform] ?? platform;
}
