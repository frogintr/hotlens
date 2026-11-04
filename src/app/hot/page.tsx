import type { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { getAllTeardowns } from '../../lib/data';
import { TeardownCard } from '../../components/TeardownCard';

export const metadata: Metadata = {
  title: '热榜 — 热镜 hotlens',
  description: '各平台正在爆的内容拆解，按热度排序。',
};

export default function HotPage() {
  const teardowns = getAllTeardowns();

  return (
    <div className="py-8">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-neutral-900">
        <Flame className="h-8 w-8 text-red-500" />
        热榜
      </h1>
      <p className="mt-2 text-neutral-600">
        各平台正在爆的内容，按热度分排序。每一条都拆成能照着做的配方。
      </p>

      {teardowns.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-neutral-500">
          还没有拆解上榜，第一批热点马上就来。
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {teardowns.map((t) => (
            <TeardownCard key={t.slug} teardown={t} />
          ))}
        </div>
      )}
    </div>
  );
}
