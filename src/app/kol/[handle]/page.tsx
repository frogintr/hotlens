import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { getAllKols, getKolByHandle, getTeardownBySlug } from '../../../lib/data';
import { platformLabel } from '../../../lib/format';
import { DifficultyDots, TeardownCard } from '../../../components/TeardownCard';

export function generateStaticParams() {
  return getAllKols().map((k) => ({ handle: k.handle }));
}

export function generateMetadata({ params }: { params: { handle: string } }): Metadata {
  const kol = getKolByHandle(params.handle);
  if (!kol) return { title: '作者不存在 — 热镜 hotlens' };
  return {
    title: `${kol.displayName} — 热镜 hotlens`,
    description: kol.whyWorthLearning,
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function KolPage({ params }: { params: { handle: string } }) {
  const kol = getKolByHandle(params.handle);
  if (!kol) notFound();

  const teardowns = kol.teardownSlugs
    .map((slug) => getTeardownBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="py-8">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-white">
          {platformLabel(kol.platform)}
        </span>
      </div>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">{kol.displayName}</h1>
      <a
        href={kol.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 font-medium text-neutral-800 shadow-sm transition hover:border-orange-400 hover:text-orange-600"
      >
        <ExternalLink className="h-4 w-4" />
        原作者主页（{platformLabel(kol.platform)}）
      </a>

      <Block title="为什么值得学">
        <p className="text-neutral-700">{kol.whyWorthLearning}</p>
      </Block>

      <Block title="固定套路">
        <p className="text-neutral-700">{kol.signatureFormula}</p>
      </Block>

      <Block title="模仿难度总评">
        <span className="inline-flex items-center gap-2 text-neutral-700">
          难度 <DifficultyDots value={kol.difficultyRating} />
        </span>
      </Block>

      <section className="mt-6">
        <h2 className="text-xl font-bold text-neutral-900">代表作拆解</h2>
        {teardowns.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-neutral-500">
            这位作者的拆解正在路上。
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {teardowns.map((t) => (
              <TeardownCard key={t.slug} teardown={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
