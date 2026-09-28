# PeptidesSourceHub.net — SEO & 内容审计报告

> 审计日期：2026-09-27 | 站点：Astro SSG + Tailwind v4，49 页静态站 | 上一版审计：2026-08-09（当时 45 页）

---

## 一、总体结论

| 维度 | 评分 | 说明 |
|---|---|---|
| 技术 SEO | **9/10** | canonical/sitemap/robots/OG/H1/alt 全绿；本次修掉 2 类问题 |
| 结构化数据 | **8/10** | 覆盖广、价格字段完全合规；本次修掉一处 Google 违规 |
| 内容质量 | **6.5/10** | 合规表述扎实、无薄页；但产品页高度模板化、详情页缺口大 |
| 合规 | **9/10** | RUO 表述 100% 覆盖、折扣口径已统一、无医疗声称 |

**本次修复 2 类问题（P0 + P1），已全部上线。**

---

## 二、P0：FAQPage 结构化数据与页面可见内容不一致（已修复）

**问题**：Google 明确要求 FAQPage 标记的问答必须在页面上可见。审计发现 **12 个页面**存在漂移：

| 页面 | schema 问答 | 可见 FAQ | 问题 |
|---|---|---|---|
| `/` 首页 | 5 条 | 4 条（**完全不同**） | 0% 重合 |
| `/about/`、`/contact/` | 各 5 条 | **完全没有可见 FAQ** | 最严重 |
| 6 个分类页 | 各 5 条 | 3–4 条（部分不同） | 部分漂移 |
| 3 篇博客 | 各 5 条 | 1–6 条（部分不同） | 部分漂移 |

**修复**（让 schema 与可见内容同源，不做任何编造）：
- 首页 → schema 由其可见 `faqs` 数组生成（4 条）
- `/about/`、`/contact/` → **新增可见 FAQ 区块**，渲染其原有 schema 的 5 条问答（同时补充了内容）
- 6 个分类页 + 2 篇静态博客 → 从页面可见的 `<details>` 提取，重建 schema
- `blog/peptide-quality-guide` → schema 由其可见 `checklist` 10 问生成

**验证**：39 个含 FAQPage 的页面、**202 条问答，schema 与可见内容一致率 100%**（修复前 12 页不一致）。

---

## 三、P1：Title / Meta Description 长度（已修复）

- **Title > 60 字符：7 页**（品牌后缀 " — Peptides Source Hub" 占 23 字符，把 37–59 字符的标题顶超）
  → 布局层修复：后缀仅在总长 ≤60 时追加（一处改动覆盖全站）
- **Meta description > 160 字符：9 页** → 逐条精简重写，含义不变、未新增未核实信息
- 另修 1 个标题本体超长（GLP-1 指南 62 字符）

**验证**：title >60 = **0**（最长 60）；description >160 = **0**（最长 160）

---

## 四、审计通过项（无需处理）

| 检查项 | 结果 |
|---|---|
| Title / description 覆盖 | 49/49 页，**0 缺失、0 重复** |
| Canonical | 49/49 页绝对 URL |
| sitemap.xml | **完整**（49/49，仅 404 排除——正确）。*上一版审计的"仅 8 个 URL"问题已修复* |
| robots.txt | 正确，含 sitemap 声明与 AI 爬虫 Allow 规则（GPTBot 等） |
| H1 | 49/49 页**唯一**，无缺失 |
| 图片 alt | 78 张图 **0 缺失** |
| 内链 | **0 死链**；孤岛页仅 `/404`（正常） |
| 页面体量 | 最小正文 2,571 词（404 除外）—— **无薄页** |
| 结构化数据 | JSON-LD 解析 **0 错误**；覆盖 Product / AggregateOffer / FAQPage / BreadcrumbList / Article / BlogPosting / Dataset / DataDownload / Organization / WebSite / CollectionPage 等 |
| **Product 价格字段** | 34 个 Product 全部为合法 `AggregateOffer`（`priceCurrency` + `lowPrice` + `highPrice` + `offerCount` + `availability` + `url`）—— **无"无效价格格式"风险** |
| 合规表述 | **RUO 表述 100% 覆盖**；`treatment` 等词全部出现在 RUO 免责语境（"not for human or veterinary use, diagnosis, treatment…"）；折扣口径已统一为 **10–30%**（无 "up to 70%" 残留） |
| 页脚政策链接 | privacy / terms / disclaimer / compliance / research-use-only / shipping 齐备 |

---

## 五、内容缺口与补充建议（按优先级）

### 1. 产品详情页缺口（最高优先）
站点宣称 **58+ products**，价格表（PDF）有约 50 行货号，但**产品详情页只有 26 个**。
→ 建议：为价格表中尚无详情页的 SKU 补齐页面（每页至少含：产品身份/规格、研究背景、质量规格、价格阶梯、FAQ）。这也是承接长尾搜索最直接的资产。

### 2. 产品页模板化重复（技术性风险）
26 个产品详情页两两相似度 >0.82 的配对达 **325 对**，最高 **0.973**（`cjc-1295-dac` ↔ `cjc-1295-no-dac`；`ghrp-2` ↔ `ghrp-6` ↔ `ipamorelin`；`argireline` ↔ `snap-8`；`selank` ↔ `semax`）。
→ 建议三类差异化（无需重写整页）：
  1. 每页加 3–5 行**该分子独有**的 Research Background（机制差异、受体选择性、研究模型）
  2. 每页 FAQ 换成分子级问题（避免全站同一组问题）
  3. 对高相似簇补**对比页**（见下）

### 3. 建议新增的内容资产
| 页面 | 理由 |
|---|---|
| `/products/compare/ghrp-family/` 等对比页 | 直接消化上面 5 组高相似簇（GHRP-2/6、Ipamorelin、CJC-1295 ±DAC、Selank/Semax、Argireline/SNAP-8） |
| `/quality-and-testing/` 下加 **COA 样例 + 验真指南** | 已有页面但缺"样例 + 如何核验第三方报告"，是 B2B 买家最关心的信任点 |
| **目的国进口合规页**（EU / US / JP / 中东） | 现有 shipping 页只讲物流；进口管制与研究用途合法性是采购决策卡点 |
| **OEM/定制流程页** | 站点已提 OEM 与 custom stacks，但无独立流程页（起订量、时间线、所需资料） |
| 知识库/术语表（glossary） | 已有 `peptidesourcehub-kb` 仓库可对接，形成内外链闭环 |

### 4. 博客仅 3 篇
当前只有 GLP-1 采购指南、Cagrilintide 批发指南、肽质量指南。建议围绕三类采购决策主题扩至 8–12 篇（COA 解读、供应商尽调问卷、运费与关税、储运条件、批次一致性、复溶与稳定性）。

### 5. 次要项
- `hreflang`：仅 `en` + `x-default` 且指向同一 URL（冗余）→ 可移除，或未来做多语言时再启用
- 语言切换器（🌐 EN）：站点目前无实际翻译版本，建议确认该入口不会导向空页面

---

## 六、本次改动清单

```
src/layouts/BaseLayout.astro                     标题后缀条件追加（≤60 才加品牌）
src/pages/index.astro                            schema ← 可见 faqs（4 条）
src/pages/about.astro                            新增可见 FAQ 区块（5 条）
src/pages/contact.astro                          新增可见 FAQ 区块（5 条）
src/pages/products/{cosmetic-skin,healing-recovery,metabolic,
                    muscle-growth,nootropic-anti-aging,
                    specialty-stacks}/index.astro  schema ← 可见 details（3–4 条）
src/pages/blog/{glp1-buyers-guide,
                cagrilintide-wholesale-guide}.astro  schema ← 可见 details
src/pages/blog/peptide-quality-guide.astro       schema ← 可见 checklist（10 条）
src/content/products/{hgh,cagrilintide,ghk-cu}.json  metaDescription 精简 ≤160
src/pages/products/index.astro                    description 精简
src/pages/products/metabolic/index.astro          description 精简
src/pages/blog/cagrilintide-wholesale-guide.astro description 精简
src/pages/blog/glp1-buyers-guide.astro            标题精简（62 → 59）
src/pages/privacy.astro / terms.astro / shipping.astro  description 精简
```

**构建**：49 页通过，0 错误。**验证**：FAQ 一致性 100%（202 条）、title/description 长度 100% 达标、内链 0 死链。
