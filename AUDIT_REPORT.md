# PeptideSourceHub.net 全面网站审计报告

> 审计日期：2026-08-09 | 审计范围：/home/admin/peptidesourcehub | 站点：Astro SSG + Tailwind CSS v4，45 页纯静态站点

---

## 构建概要

| 指标 | 结果 |
|------|------|
| `npm run build` | **通过** — 45 页在 4.42s 内生成，0 错误 / 0 警告 |
| `npm audit` | **通过** — 0 个漏洞 |
| dist/ 总大小 | **27MB**（82 张图片占绝大部分） |
| CSS 产物 | `BaseLayout.BkruWHXr.css` — 69KB（单一打包文件） |
| JS 产物 | **无独立 JS 文件**（内联脚本仅存在于 HTML） |
| 最大单页 HTML | `index.html` — 64KB；多数产品页 ~40-49KB |

---

## 1. 代码质量 — 评分：5/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| 无 ESLint / Prettier 配置 | 项目缺少 `eslint.config.*`、`.prettierrc` 或任何代码格式化/规范工具 | 高 |
| 零 TypeScript 使用 | 文件全为 `.astro`，无 `.ts` 文件；`package.json` 也无 `@types/*`、无 `tsconfig.json`；虽有 `get-tsconfig` 但来自依赖传递 | 高 |
| 26 个产品页硬编码 | 每个产品页（bpc-157, semaglutide, tirzepatide, ...）均为独立 `.astro` 文件，包含重复的布局结构、表格模式、CTA 和规格模板。代码高度重复 | 高 |
| 未使用 Astro Content Collections | 数据完全可以被模型化为 Markdown/MDX 内容集合或 JSON 数据文件，从而消除重复代码 | 高 |
| 不用的布局文件 | `src/layouts/Layout.astro` 是一个遗留的 13 行占位布局——未被任何页面导入 | 低 |
| 404 页面不一致 | `404.astro` 使用 `BaseLayout`（无 Header/Footer），而其它所有页面使用 `PageLayout`（含 Header/Footer）。这导致 404 页面丢失导航和页脚 | 中 |
| CSS 组织良好 | CSS 使用 Tailwind v4 的 `@theme` tokens、`@layer base/components/utilities` 分层——结构清晰 | — |
| 内联脚本模式分散 | 相同的 FAQ accordion 脚本被重复写入 `index.astro` 和 `faq.astro` 中；滚动监听器在 `BaseLayout.astro` 和 `Header.astro` 中各自定义 | 中 |

### 建议

1. **引入 `astro.config.mjs` 中的 content collections**，为 26 个产品、6 个分类和博客文章建模。单一产品模板即可渲染所有产品。
2. **添加 TypeScript**：`tsconfig.json` + 为 Astro.props 定义接口。
3. **添加 ESLint + Prettier**：`npm create @eslint/config` + `.prettierrc`。
4. **移除 `Layout.astro`** 或以别名方式重构。
5. **将 accordion/logic 提取为可复用组件**。

---

## 2. SEO — 评分：7.5/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| Title / Meta Description | 所有页面通过 `BaseLayout` props 设有正确的 `<title>` 和 `<meta name="description">`；格式为 `{title} — Peptides Source Hub` | 良好 |
| Canonical URL | `<link rel="canonical">` 在所有页面上正确输出绝对 URL | 良好 |
| Schema.org JSON-LD | **覆盖面广**：Organization（全局）、Product、FAQPage、BreadcrumbList、Article、Blog、CollectionPage、ContactPage、AboutPage、WebSite —— 所有结构化数据均以内联 `<script type="application/ld+json">` 注入 | 良好 |
| Open Graph / Twitter Card | `og:title`、`og:description`、`og:image`（可选）、`og:type: website`、`og:url`、`og:site_name`、`twitter:card: summary_large_image` —— 全部存在于 `BaseLayout.astro:22-29` | 良好 |
| robots.txt | 存在并配置正确，含站点地图引用；对 AI 爬虫（GPTBot、ChatGPT-User、Claude-Web 等）也设了 Allow 规则 | 良好 |
| sitemap.xml | **存在但不完整**：仅列出 8 个产品详情页 URL，但实际生成 45 页。缺失 URL：aod-9604, ara-290, argireline, cjc-1295-dac, cjc-1295-no-dac, dsip, epithalon, foxo4-dri, ghrp-2, ghrp-6, ipamorelin, leuphasyl, matrixyl, peg-mgf, selank, semax, snap-8, thymosin-beta-4 | 高 |
| hreflang | 仅设置 `<link rel="alternate" hreflang="en">` 和 `hreflang="x-default"`，二者指向相同 URL —— 冗余。无真正的多语言变体存在，但标签重复 | 低 |
| 语义化 HTML | 产品页和博客页使用了 `<article>` 和 `<main>`，但主页因页面内联 CSS/脚本而膨胀（~64KB HTML） | 中 |
| 图片 alt 属性 | 全部产品图片和 QR 码均有描述性 alt 文本；品牌 Logo 使用 `alt=""`（纯装饰）——正确 | 良好 |
| 面包屑导航 | 产品页和分类页均有视觉面包屑（`<nav aria-label="Breadcrumb">`），且有对应的 JSON-LD BreadcrumbList | 良好 |
| 内链 | Footer、相关产品区块和分类页中均有丰富的产品交叉链接 | 良好 |

### 建议

- **将 sitemap.xml 更新为包含全部 45 个 URL**。缺失 18 个产品详情页将严重削弱 Google 索引能力。
- 移除重复的 `hreflang="x-default"` 或改为在未来的多语言部署中正确实现（例如添加 `zh`、`ja`、`ko` 变体）。
- 考虑实现 `astro-sitemap` 集成，自动从路由生成 sitemap.xml。

---

## 3. 性能 — 评分：5/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| 图片格式 | **82 张产品图片全部为 PNG / JPG** —— 无一转换为 WebP 或 AVIF。最大的 PNG 达 ~885KB（nad-plus-bottle.png、kpv-bottle.png）| 高 |
| 图片 srcset / 响应式 | 无 `<img srcset>` 属性；所有图片加载单一分辨率 | 高 |
| 图片尺寸 | 许多图片应用于 48px/96px 容器中，但原始文件高达 500-885KB | 高 |
| 懒加载 | 绝大多数图片有 `loading="lazy"`；首屏关键图片（如产品主图）未使用 `loading="eager"` 或 `fetchpriority="high"` | 中 |
| CSS 体积 | 单一 CSS 69KB —— 对纯 Tailwind 驱动的站点来说可接受，打包合理 | 良好 |
| JS 体积 | 无独立 JS 打包；所有交互逻辑以内联 `<script>` 标签嵌入 —— 避免了额外网络请求，但无法利用缓存 | 中 |
| 字体加载 | Google Fonts 使用 `display=swap`（良好），有 `preconnect` 但缺少 `preload` 用于关键字体文件 | 中 |
| 关键渲染路径 | 无 CSS 内联于 `<head>` 中用于首屏渲染；CSS 作为外部文件加载 | 中 |
| Tailwind Purging | Tailwind v4 基于使用情况自动管理 —— 生效中。未发现冗余 CSS | 良好 |
| 静态资源缓存 | `_headers` 为 `favicon.svg`（1 年）和 `/images/*`（1 年，immutable）设置缓存策略。但 HTML 页面无显式缓存标头 | 中 |
| Astro Islands | 无 `client:load` / `client:idle` 指令使用 —— 纯 SSG（静态）方法，对本站点而言合适 | 良好 |

### 建议

1. **批量将产品 PNG/JPG 转换为 WebP**（若兼容性要求较低可转为 AVIF），使用 `sharp` 或 `@astrojs/image`。例如 `nad-plus-bottle.png`（885KB）转换为 WebP 约可压缩至 80-120KB。
2. 通过 Astro 的 `<Image />` 组件为产品缩略图添加 `srcset`。
3. 为 Google Fonts CSS 添加 `<link rel="preload">`。
4. 为 HTML 页面（`/*.html`）和 CSS/JS 静态资源在 `_headers` 中添加 `Cache-Control` 规则。

---

## 4. 无障碍 — 评分：4.5/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| Skip-to-Content 链接 | **缺失** —— 键盘用户无法绕过导航 | 高 |
| ARIA 标签 | `Header.astro` 中的 `<nav>` 有 `role="navigation"`；汉堡菜单有 `aria-label` 和 `aria-expanded`；FAQ 按钮有 `aria-expanded`。但部分图标仅有 `aria-label` 无 `<title>` 回退 | 中 |
| 键盘导航 | 移动端菜单支持 Escape 关闭（良好）。但桌面下拉菜单无键盘交互，主页 Tab 顺序依赖浏览器默认行为 | 中 |
| 颜色对比度 | 主色（primary `#0a1628` 在 white `#ffffff` 上）对比度 ~18.6:1（通过 AAA）。但 **accent orange `#f59e0b` 在 white 上约 2.1:1（不合格）**——用于参数标签、统计和图标 | 高 |
| Focus 样式 | 无自定义 `:focus-visible` 样式声明；依赖浏览器默认 focus 环（大部分被 Tailwind reset 移除） | 高 |
| 表单标签关联 | Footer 中的 newsletter `<input type="email">` **缺少 `<label>` 元素**（仅使用 `placeholder`）| 高 |
| 图片 alt | 产品图片有描述性 alt，品牌 Logo 用 `alt=""` | 良好 |
| 动画偏好 | 无 `prefers-reduced-motion` 媒体查询 —— `animate-on-scroll` 和 `stagger-children` 动画对前庭障碍用户可能造成困扰 | 中 |
| 语义化标题层级 | 正确使用 h1-h3，但部分页面的 heading 层级边缘模糊（分类页中的 `<h2 class="text-sm uppercase">` 在视觉上并非标题风格） | 低 |

### 建议

1. **添加 Skip-to-Content 链接**：`<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>`。
2. **审查并修正所有 accent color (#f59e0b) 的使用**，将其替换为对比度达标的颜色（如 `#b45309` 用于文本、`#d97706` 用于大号文本）。
3. 添加 `:focus-visible` 样式，例如 `.focus-ring { @apply focus-visible:outline-2 focus-visible:outline-accent }`。
4. 为 newsletter 表单添加 `<label class="sr-only" for="newsletter-email">Email address</label>` 并关联 id。
5. 为滚动动画包裹 `@media (prefers-reduced-motion: no-preference)`。

---

## 5. 内容质量 — 评分：7/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| 产品信息完整性 | 产品页内容**丰富**：CAS 号、分子量、序列、纯度、溶解度、标准配置、研究领域、药理数据、QC 规格、FAQ、定价层级、相关产品 —— 远超一般肽类供应商网站 | 良好 |
| EEAT 信号 | 作者信息（Dr. Aaron Wang，博士学历）在 About 页、Contact 页和博客中展示；博客文章有 `datePublished`；但**产品页缺少「上次更新」日期** | 中 |
| 去重内容 | 26 个产品页内容**100% 独立** —— 无跨产品翻录内容。各肽类数据经研究定制 | 良好 |
| 分类逻辑一致性 | 部分不一致：`cosmetic-skin/index.astro` 的统计卡片声称「2 Core Peptides」，但其规格表格却列出 **5** 个产品（GHK-Cu、Snap-8、Leuphasyl、Argireline、Matrixyl）。其他分类也有类似的计数不精确问题 | 中 |
| 定价透明度 | 产品页显示层级折扣百分比，但具体美金价格模糊（仅标「Contact」或「List price」） | 中 |
| 博客深度 | 高质量：COA 解读指南（含 10 个问题 + 答案的清单）、GLP-1 对比矩阵、Cagrilintide 战略指南。具有实质性关联 | 良好 |
| 法规免责声明 | 所有产品页和 Footer 均包含「FOR LABORATORY RESEARCH USE ONLY — NOT FOR MEDICAL USE」声明 | 良好 |
| 编号的 callout 错误 | Shipping 页面在其地图占位区有一个格式错误：`<span class="text-sm">...</span>` 包含 HTML 标签编码错误（可能只是输出标志） | 低

### 建议

- 更新分类页统计卡片，使其表格中列出的实际产品数量保持一致。
- 为所有产品页添加 `dateModified` 字段。
- 考虑添加作者 schema Person（而非仅 Organization），以提升 EEAT。

---

## 6. 安全性 — 评分：6/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| CSP（内容安全策略） | 已实施但**过于宽松**：`script-src 'self' 'unsafe-inline' 'unsafe-eval'` —— `unsafe-eval` 会令 CSP 防御 XSS 的大部分价值丧失 | 高 |
| 安全标头 | HSTS（max-age=63072000；includeSubDomains；preload）、X-Frame-Options: DENY、X-Content-Type-Options: nosniff、Referrer-Policy、Permissions-Policy —— 所有这些均已在 `_headers` 中正确设置 | 良好 |
| _redirects 防护 | 阻止常见扫描路径（.env、.git、wp-*、admin、backup.zip 等）返回 410 Gone | 良好 |
| 依赖审计 | `npm audit` 返回 0 个漏洞 | 良好 |
| 表单 | 仅有一个 newsletter 表单（`onsubmit="event.preventDefault()"` —— 无实际提交逻辑）。无登录、支付或用户数据收集表单暴露 | 低 |
| 敏感信息 | 未在 HTML 或 JS 中检测到暴露的 API 密钥、令牌或密码 | 良好 |
| CSRF | 无状态变更端点 —— 纯静态网站，因此 CSRF 空白 | 良好 |

### 建议

1. **移除 CSP 中的 `'unsafe-eval'`**。改用 `'nonce-{random}'` 处理内联脚本，或将内联 JS 提取为外部文件（需调整当前的内联 accordion/header 脚本）。
2. 同样审查 `'unsafe-inline'` —— 若重构脚本为外部文件，可移除该指令。
3. 考虑为 HTML 页面添加 `Cache-Control: no-cache` / CDN 配置，以减少 Cloudflare 缓存导致的敏感数据残留风险。

---

## 7. 移动端体验 — 评分：7/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| 响应式布局 | Tailwind 响应式类（`md:`、`lg:`）被一致使用；布局流畅适配手机至宽屏显示 | 良好 |
| 移动端导航 | 全屏覆盖菜单，含动画入场、良好间距（`py-4` 点击目标）、Escape 键关闭和 CSS 过渡。CTA 优先 | 良好 |
| 触摸目标 | 移动端导航链接为 `w-full` 且 `py-4`，满足 48px 最低标准。桌面按钮使用 `p-2` ~ `p-3`，一般在标准范围内 | 良好 |
| 表格处理 | 所有数据表包裹在 `overflow-x-auto` 的父容器内 —— 防止移动端水平溢出 | 良好 |
| 视口高度 | Hero 区使用 `min-h-[90vh]`，在移动设备上占用过多屏幕空间，可能掩盖下方内容 | 中 |
| 字体大小 | 文本缩放合理：h1 在移动端为 `text-3xl`，桌面端为 `text-5xl`。正文字号 `text-sm`（14px）对长段落来说略偏小 | 中 |

### 建议

- 考虑在移动端将 hero 高度减小为 `min-h-[70vh]` 或 `min-h-[60vh]`。
- 将正文 `p` 标签从 `text-sm`（14px）增大为 `text-base`（16px）。

---

## 8. 部署与运维 — 评分：7/10

| 项目 | 发现 | 严重程度 |
|------|------|----------|
| 构建脚本 | `npm run build` → `astro build` —— 标准且正常运行。输出目录为 `dist/` | 良好 |
| Cloudflare Pages 兼容性 | `dist/` 输出为纯静态 HTML/CSS/JS —— 完全兼容 Cloudflare Pages、Netlify、Vercel 或任何静态主机 | 良好 |
| `_headers` | 路径 `/`、`/favicon.svg`、`/images/*` 均已定义安全标头和缓存策略 | 良好 |
| `_redirects` | 定义 10 个 410 规则保护免受扫描攻击 | 良好 |
| 自定义 404 页 | 存在（`src/pages/404.astro`），但**使用 BaseLayout 不含 Header/Footer**（与 `_redirects` 中的 `/404.html` 路径匹配） | 中 |
| CI/CD | 仓库中无 `.github/workflows/`、无 Cloudflare Pages 构建钩子文档、无环境变量示例文件 | 中 |
| Sitemap 自动化 | Sitemap 为手动维护的 XML 文件，**非自动生成** —— 随着产品增加会逐渐过时 | 中 |
| PDF 资产 | `/download/product-list-price.pdf` 在 `public/` 目录中并作为静态资源提供服务 | 良好 |

### 建议

- 配置 Cloudflare Pages 部署（`wrangler.toml` 或 GitHub integration）。
- 切换为 `astro-sitemap` 集成，从路由自动生成 sitemap.xml。
- 修复 404 页面，使其也使用 `PageLayout`（含 Header/Footer），或提供其不使用导航的明确理由。

---

## 总结仪表盘

| 维度 | 评分 |
|------|------|
| 1. 代码质量 | **5/10** |
| 2. SEO | **7.5/10** |
| 3. 性能 | **5/10** |
| 4. 无障碍 | **4.5/10** |
| 5. 内容质量 | **7/10** |
| 6. 安全性 | **6/10** |
| 7. 移动端体验 | **7/10** |
| 8. 部署与运维 | **7/10** |
| **加权总分** | **6.0/10** |

---

## 优先修复清单（Top 10）

| # | 问题 | 维度 | 严重程度 | 修复方案 |
|---|------|------|----------|----------|
| 1 | **图片转 WebP + 添加 srcset** | 性能 | 高 | 使用 `sharp` 批量转换为 WebP；集成 `<Image />` 组件（@astrojs/image 或自定义），产出 2x/3x 源集。预期产物体积减少 60-80% |
| 2 | **sitemap.xml 缺失 18 个产品页** | SEO | 高 | 在 `astro.config.mjs` 中添加 `@astrojs/sitemap` 集成，从路由自动生成 |
| 3 | **采用 Content Collections 消除产品页代码重复** | 代码质量 | 高 | 创建 `src/content/products/` 含 MDX/JSON 数据文件；编写 `src/pages/products/[...slug].astro` 单一模板 |
| 4 | **从 CSP 中移除 `unsafe-eval`** | 安全性 | 高 | 将内联 JS 提取为 `<script src>`，添加 nonce 或 hash 来源 |
| 5 | **添加 Skip-to-Content 链接** | 无障碍 | 高 | 在 `<body>` 起始处添加 `<a href="#main" class="sr-only focus:not-sr-only">` |
| 6 | **添加 TypeScript + ESLint + Prettier** | 代码质量 | 高 | 安装 tsconfig、eslint-plugin-astro、prettier-plugin-astro；在 `package.json` 中添加 lint/format 脚本 |
| 7 | **修复 accent color (#f59e0b) 对比度** | 无障碍 | 高 | 在白色背景下将文本 accent 更换为 `#b45309`；在深色背景下可保留当前颜色 |
| 8 | **分类页产品计数对齐** | 内容质量 | 中 | 更新统计卡片，使各分类计数与规格表格匹配（例如 cosmetic-skin：2→5） |
| 9 | **关注 Newsletter 表单标签** | 无障碍 | 高 | 为 email input 添加 `<label>`（或 `sr-only` label），并设置 `for`/`id` 关联 |
| 10 | **添加字体 preload + 关键 CSS 内联** | 性能 | 中 | 为 Google Fonts CSS 添加 `<link rel="preload" as="style">`；考虑内联关键的 tailwind base 规则 |

---

## 亮点

以下方面实施良好，值得肯定：

- **Schema.org JSON-LD 覆盖面**：每一位客户几乎都未如此全面地实施结构化数据——BreadcrumbList、FAQPage、Product、Article、Organization 一应俱全。
- **产品内容深度**：每个肽产品均包含 CAS 号、分子量、序列、纯度、QC 方法、研究领域、药理学、比较表格——远超普通电商产品页。
- **博客质量**：COA 解读指南（10 问清单）、GLP-1 对比矩阵展示了对该领域的真正理解。此类内容具有建立 EEAT 的能力。
- **安全标头**：HSTS + X-Frame-Options + CSP + _redirects 410 规则的组合显示出良好的安全意识。
- **响应式设计**：移动端全屏菜单配合动画和键盘支持，体验打磨到位。
- **构建整洁**：0 个漏洞，<5s 的构建时间，清晰的 CSS 架构（@theme tokens + @layer）。

---

*报告由 opencode 在 2026-08-09 生成。*
