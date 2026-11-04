import Link from 'next/link';
import { Flame } from 'lucide-react';
import type { TeardownRecord } from '../types/hotlens';
import { formatCount, platformLabel } from '../lib/format';

export function DifficultyDots({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`难度 ${value}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i <= value ? 'bg-orange-500' : 'bg-neutral-300'}`}
        />
      ))}
      <span className="ml-1 text-sm text-neutral-500">{value}/5</span>
    </span>
  );
}

export function TeardownCard({ teardown }: { teardown: TeardownRecord }) {
  const { metrics } = teardown;
  return (
    <Link
      href={`/hot/${teardown.slug}`}
      className="block rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow"
    >
      <div className="flex items-start gap-4">
        {teardown.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={teardown.thumbnailUrl}
            alt=""
            className="hidden h-24 w-40 shrink-0 rounded-lg object-cover sm:block"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-white">
              {platformLabel(teardown.platform)}
            </span>
            <span className="rounded-full bg-orange-50 px-2.5 py-1 font-medium text-orange-600">
              {teardown.topic}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-red-500">
              <Flame className="h-3.5 w-3.5" />
              热度 {teardown.heatScore}
            </span>
          </div>
          <h3 className="mt-2.5 text-lg font-semibold leading-snug text-neutral-900">
            {teardown.title}
          </h3>
          <p className="mt-1.5 text-sm text-neutral-500">
            播放 {formatCount(metrics.views)} · 点赞 {formatCount(metrics.likes)} · 评论{' '}
            {formatCount(metrics.comments)}（{metrics.capturedAt} 快照）
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
            <span>
              作者：
              <span className="font-medium text-neutral-800">{teardown.kol.handle}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              模仿难度 <DifficultyDots value={teardown.difficulty} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
