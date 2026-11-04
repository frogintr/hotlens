# 热镜 hotlens

> 什么热，拆什么 —— 多平台热点追踪 + 可复制、可学习的拆解分析站。

## 定位

热镜（hotlens）是一个**拆解网站**：追踪 YouTube、TikTok、B站、抖音、小红书等平台正在爆的内容，把爆款拆成普通人能照着做的配方——0–3 秒钩子、结构时间轴、脚本套路、视觉套路、标题封面公式、复刻步骤、模仿难度与成本。

页面分三级：

- `/` Landing —— 门面：定位、今日最热 Top 5、平台/题材入口、往期精选
- `/hot` 热榜 —— 全部拆解按热度分排序的信息流
- `/hot/[slug]` 拆解详情 —— 官方嵌入播放器、数据快照、为什么爆、怎么抄、模仿评分、复刻清单、风险提示
- `/kol/[handle]` KOL 页 —— 为什么值得学、固定套路、代表作拆解索引

## 硬约束

- **视频永不进仓库、永不上站**：只存原始链接、平台官方嵌入地址和缩略图地址；仓库里只有 JSON 数据和文字拆解。`.gitignore` 拦截 `*.mp4 / *.mov / *.webm / *.mkv / *.avi`。
- 内容以结构化数据维护：`data/teardowns/*.json`（每篇拆解一条）、`data/kols/*.json`（每个 KOL 一条），类型定义在 `src/types/hotlens.ts`，读取层在 `src/lib/data.ts`。

## 本地运行

```bash
npm install
npm run dev     # 开发服务器 http://localhost:3000
npm run build   # 生产构建
npm run start   # 运行生产构建
```

技术栈：Next.js 14（App Router）+ React 18 + TypeScript + Tailwind CSS 3.4。
