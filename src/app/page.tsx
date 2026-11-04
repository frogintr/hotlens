import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { getAllTeardowns } from '../lib/data';
import { platformLabel } from '../lib/format';
import { TeardownCard } from '../components/TeardownCard';
import type { TeardownRecord } from '../types/hotlens';

const PLATFORM_ENTRIES: { platform: TeardownRecord['platform']; blurb: string }[] = [
  { platform: 'bilibili', blurb: '知识区与新起号样本' },
  { platform: 'douyin', blurb: '短视频爆款主战场' },
  { platform: 'xiaohongshu', blurb: '图文与生活方式热点' },
  { platform: 'youtube', blurb: '长视频与全球趋势' },
  { platform: 'tiktok', blurb: '海外短视频风向标' },
  { platform: 'instagram', blurb: 'Reels 与视觉种草' },
];

export default function HomePage() {
  const teardowns = getAllTeardowns();
  const top5 = teardowns.slice(0, 5);
  const topics = Array.from(new Set(teardowns.map((t) => t.topic)));

  return (
    <div className="pb-4">
      {/* Hero：只做门面 */}
      <section className="py-12 text-center sm:py-16">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          什么热，拆什么
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
          热镜追踪各平台正在爆的内容，把爆款拆成钩子、结构、脚本和标题公式——
          普通人能照着做的可复制配方。
        </p>
        <Link
          href="/hot"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          <Flame className="h-5 w-5" />
          看今日热榜
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* 今日最热 Top 5 */}
      <section className="py-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">今日最热 Top 5</h2>
          <Link href="/hot" className="text-sm font-medium text-orange-600 hover:underline">
            全部热榜 →
          </Link>
        </div>
        {top5.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-neutral-500">
            拆解正在路上，第一批热点马上就来。
          </p>
        ) : (
          <ol className="mt-4 space-y-3">
            {top5.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={`/hot/${t.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-orange-300 hover:shadow"
                >
                  <span className="w-8 shrink-0 text-center text-2xl font-bold text-orange-500">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-neutral-900">{t.title}</span>
                    <span className="mt-0.5 block text-sm text-neutral-500">
                      {platformLabel(t.platform)} · {t.topic} · 热度 {t.heatScore}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-neutral-400" />
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 平台入口 */}
      <section className="py-6">
        <h2 className="text-2xl font-bold text-neutral-900">按平台逛</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PLATFORM_ENTRIES.map(({ platform, blurb }) => (
            <Link
              key={platform}
              href="/hot"
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:border-orange-300 hover:shadow"
            >
              <span className="font-semibold text-neutral-900">{platformLabel(platform)}</span>
              <span className="mt-1 block text-sm text-neutral-500">{blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 题材入口 */}
      {topics.length > 0 && (
        <section className="py-6">
          <h2 className="text-2xl font-bold text-neutral-900">热门题材</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {topics.map((topic) => (
              <Link
                key={topic}
                href="/hot"
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 font-medium text-neutral-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
              >
                {topic}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 往期精选 */}
      {teardowns.length > 0 && (
        <section className="py-6">
          <h2 className="text-2xl font-bold text-neutral-900">往期精选</h2>
          <div className="mt-4 space-y-3">
            {teardowns.slice(0, 3).map((t) => (
              <TeardownCard key={t.slug} teardown={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
