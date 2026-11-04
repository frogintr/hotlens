import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  CheckSquare,
  ExternalLink,
  Eye,
  Flame,
  Heart,
  ListOrdered,
  MessageCircle,
  Share2,
  Wrench,
} from 'lucide-react';
import { getAllTeardowns, getKolByHandle, getTeardownBySlug } from '../../../lib/data';
import { formatCount, platformLabel } from '../../../lib/format';
import { DifficultyDots } from '../../../components/TeardownCard';

export function generateStaticParams() {
  return getAllTeardowns().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const teardown = getTeardownBySlug(params.slug);
  if (!teardown) return { title: '拆解不存在 — 热镜 hotlens' };
  return {
    title: `${teardown.title} — 热镜 hotlens`,
    description: `${platformLabel(teardown.platform)} 爆款拆解：钩子、结构、脚本套路与可复制配方。`,
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function TeardownDetailPage({ params }: { params: { slug: string } }) {
  const teardown = getTeardownBySlug(params.slug);
  if (!teardown) notFound();

  const kol = getKolByHandle(teardown.kol.handle);
  const { metrics } = teardown;

  const metricItems = [
    { icon: Eye, label: '播放', value: metrics.views },
    { icon: Heart, label: '点赞', value: metrics.likes },
    { icon: MessageCircle, label: '评论', value: metrics.comments },
    { icon: Share2, label: '分享', value: metrics.shares },
  ];

  return (
    <article className="py-8">
      {/* 头部 */}
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
        <span className="text-neutral-400">拆解日期 {teardown.teardownDate}</span>
      </div>
      <h1 className="mt-3 text-3xl font-bold leading-snug text-neutral-900">{teardown.title}</h1>
      <p className="mt-2 text-neutral-500">
        原作发布于 {teardown.publishedAt} · 作者{' '}
        <Link href={`/kol/${teardown.kol.handle}`} className="font-medium text-orange-600 hover:underline">
          {kol?.displayName ?? teardown.kol.handle}
        </Link>
      </p>

      {/* 原片：官方嵌入或外链，永不托管 */}
      <div className="mt-6">
        {teardown.embedUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-sm">
            <iframe
              src={teardown.embedUrl}
              title={teardown.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : teardown.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={teardown.thumbnailUrl}
            alt={teardown.title}
            className="aspect-video w-full rounded-2xl object-cover shadow-sm"
          />
        ) : null}
        <a
          href={teardown.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 font-medium text-neutral-800 shadow-sm transition hover:border-orange-400 hover:text-orange-600"
        >
          <ExternalLink className="h-4 w-4" />
          看原片（{platformLabel(teardown.platform)}）
        </a>
      </div>

      {/* 数据快照 */}
      <Section title="数据快照">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metricItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl bg-neutral-50 p-4 text-center">
              <Icon className="mx-auto h-5 w-5 text-neutral-400" />
              <div className="mt-1.5 text-2xl font-bold text-neutral-900">{formatCount(value)}</div>
              <div className="text-sm text-neutral-500">{label}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-neutral-400">数据抓取于 {metrics.capturedAt}，为拆解时快照。</p>
      </Section>

      {/* 为什么爆 */}
      <Section title="为什么爆">
        <h3 className="font-semibold text-neutral-900">0–3 秒钩子</h3>
        <p className="mt-1 text-neutral-700">{teardown.hookType}</p>
        <h3 className="mt-5 font-semibold text-neutral-900">结构时间轴</h3>
        <ol className="mt-2 space-y-2.5">
          {teardown.timeline.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-14 shrink-0 rounded-md bg-orange-50 px-2 py-0.5 text-center font-mono text-sm font-semibold text-orange-600">
                {item.t}
              </span>
              <span className="text-neutral-700">{item.what}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* 怎么抄 */}
      <Section title="怎么抄">
        <h3 className="font-semibold text-neutral-900">脚本套路</h3>
        <p className="mt-1 text-neutral-700">{teardown.scriptFormula}</p>
        <h3 className="mt-5 font-semibold text-neutral-900">视觉套路</h3>
        <p className="mt-1 text-neutral-700">{teardown.visualFormula}</p>
        <h3 className="mt-5 font-semibold text-neutral-900">标题封面公式</h3>
        <p className="mt-1 text-neutral-700">{teardown.titleCoverFormula}</p>
        <h3 className="mt-5 flex items-center gap-2 font-semibold text-neutral-900">
          <ListOrdered className="h-5 w-5 text-orange-500" />
          复刻步骤
        </h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-6 text-neutral-700">
          {teardown.replicationSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Section>

      {/* 模仿评分 */}
      <Section title="模仿评分">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="inline-flex items-center gap-2 text-neutral-700">
            难度 <DifficultyDots value={teardown.difficulty} />
          </span>
          <span className="text-neutral-700">
            成本：<span className="font-medium text-neutral-900">{teardown.cost}</span>
          </span>
        </div>
        <h3 className="mt-5 flex items-center gap-2 font-semibold text-neutral-900">
          <Wrench className="h-5 w-5 text-orange-500" />
          所需设备
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-neutral-700">
          {teardown.gear.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </Section>

      {/* 复刻清单 */}
      <Section title="复刻清单">
        <ul className="space-y-2">
          {teardown.checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-neutral-700">
              <CheckSquare className="mt-1 h-5 w-5 shrink-0 text-green-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 风险提示 */}
      <Section title="风险提示">
        <ul className="space-y-2">
          {teardown.risks.map((risk, i) => (
            <li key={i} className="flex items-start gap-2.5 text-neutral-700">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-500" />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 作者区 */}
      <section className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-900 p-5 text-white shadow-sm sm:p-6">
        <h2 className="text-xl font-bold">关于作者</h2>
        <p className="mt-2 text-neutral-300">
          {kol ? (
            <>
              {kol.displayName}（{platformLabel(teardown.platform)}）— {kol.signatureFormula}
            </>
          ) : (
            <>本条拆解的作者：{teardown.kol.handle}</>
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/kol/${teardown.kol.handle}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-neutral-900 transition hover:bg-orange-100"
          >
            看作者拆解主页
          </Link>
          <a
            href={teardown.kol.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 font-medium text-white transition hover:border-white"
          >
            <ExternalLink className="h-4 w-4" />
            原作者主页
          </a>
        </div>
      </section>
    </article>
  );
}
