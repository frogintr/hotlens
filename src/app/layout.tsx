import type { Metadata } from 'next';
import Link from 'next/link';
import { Flame } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: '热镜 hotlens — 什么热，拆什么',
  description:
    '多平台热点追踪 + 可复制、可学习的拆解分析站：把爆款拆成普通人能照着做的配方。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-[1150px] items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-neutral-900">
                热镜 <span className="text-orange-600">hotlens</span>
              </span>
              <span className="hidden text-sm text-neutral-500 sm:inline">什么热，拆什么</span>
            </Link>
            <nav className="flex items-center gap-5 text-[15px] font-medium text-neutral-700">
              <Link href="/" className="transition hover:text-orange-600">
                首页
              </Link>
              <Link href="/hot" className="inline-flex items-center gap-1 transition hover:text-orange-600">
                <Flame className="h-4 w-4" />
                热榜
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">{children}</main>

        <footer className="mt-16 border-t border-neutral-200 bg-white">
          <div className="mx-auto flex w-full max-w-[1150px] flex-col gap-2 px-4 py-8 text-sm text-neutral-500 sm:px-6">
            <p className="font-medium text-neutral-700">
              热镜 hotlens — 把爆款拆成普通人能照着做的配方。
            </p>
            <p>本站只做拆解分析，视频版权归原作者所有，均链接回原片。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
