/**
 * 价格数据 —— 站点唯一价格来源（single source of truth）
 *
 * 数据来源：官方批发价目表 PDF（public/download/product-list-price.pdf，更新于 2026-08-08）
 *   · 单位：USD / 盒（1 盒 = 10 vials）
 *   · code 为价目表里的货号，便于人工复核
 *
 * schema 的 AggregateOffer 与页面渲染的价格表取自同一常量，
 * 保证「结构化数据与页面可见内容一致」，不会各自漂移。
 */

export interface PriceRow {
  /** 价目表货号 */
  code: string;
  /** 规格（与价目表一致） */
  spec: string;
  /** USD / 盒 */
  usd: number;
}

export const PRICE_LIST_URL = '/download/product-list-price.pdf';
export const PRICE_LIST_UPDATED = '2026-08-08';

/** 阶梯折扣口径（与页面 Tiered Wholesale Pricing 表一致） */
export const VOLUME_DISCOUNT_TEXT = 'volume discounts of 10–70% from 5 kits';

/**
 * 站点产品 slug → 价目表行。
 * 未在本表中的产品（价目表未列）不写死价格，走 FALLBACK_BAND（全站肽类区间）并在页面注明口径。
 */
export const PEPTIDE_PRICES: Record<string, PriceRow[]> = {
  'aod-9604': [
    { code: '5AD', spec: '5 mg × 10 vials', usd: 106 },
    { code: '10AD', spec: '10 mg × 10 vials', usd: 185 },
  ],
  'ara-290': [{ code: 'RA10', spec: '10 mg × 10 vials', usd: 66 }],
  'bpc-157': [
    { code: 'BC5', spec: '5 mg × 10 vials', usd: 40 },
    { code: 'BC10', spec: '10 mg × 10 vials', usd: 58 },
    { code: 'BC20', spec: '20 mg × 10 vials', usd: 85 },
  ],
  cagrilintide: [
    { code: 'CGL5', spec: '5 mg × 10 vials', usd: 109 },
    { code: 'CGL10', spec: '10 mg × 10 vials', usd: 172 },
  ],
  'cjc-1295-dac': [{ code: 'CD5', spec: '5 mg × 10 vials', usd: 159 }],
  'cjc-1295-no-dac': [
    { code: 'CND5', spec: '5 mg × 10 vials', usd: 85 },
    { code: 'CND10', spec: '10 mg × 10 vials', usd: 159 },
  ],
  dsip: [
    { code: 'DS5', spec: '5 mg × 10 vials', usd: 40 },
    { code: 'DS15', spec: '15 mg × 10 vials', usd: 93 },
  ],
  epithalon: [
    { code: 'ET10', spec: '10 mg × 10 vials', usd: 64 },
    { code: 'ET50', spec: '50 mg × 10 vials', usd: 185 },
  ],
  'ghk-cu': [
    { code: 'CU50', spec: '50 mg × 10 vials', usd: 24 },
    { code: 'CU100', spec: '100 mg × 10 vials', usd: 29 },
  ],
  'ghrp-2': [{ code: 'G25', spec: '5 mg × 10 vials', usd: 42 }],
  'ghrp-6': [
    { code: 'G65', spec: '5 mg × 10 vials', usd: 42 },
    { code: 'G610', spec: '10 mg × 10 vials', usd: 69 },
  ],
  ipamorelin: [
    { code: 'IP5', spec: '5 mg × 10 vials', usd: 45 },
    { code: 'IP10', spec: '10 mg × 10 vials', usd: 79 },
    { code: 'IP20', spec: '20 mg × 10 vials', usd: 143 },
  ],
  retatrutide: [
    { code: 'RT10', spec: '10 mg × 10 vials', usd: 58 },
    { code: 'RT15', spec: '15 mg × 10 vials', usd: 79 },
    { code: 'RT20', spec: '20 mg × 10 vials', usd: 101 },
    { code: 'RT30', spec: '30 mg × 10 vials', usd: 138 },
    { code: 'RT40', spec: '40 mg × 10 vials', usd: 185 },
    { code: 'RT50', spec: '50 mg × 10 vials', usd: 233 },
    { code: 'RT60', spec: '60 mg × 10 vials', usd: 259 },
  ],
  selank: [
    { code: 'SK5', spec: '5 mg × 10 vials', usd: 45 },
    { code: 'SK10', spec: '10 mg × 10 vials', usd: 64 },
  ],
  semaglutide: [
    { code: 'SM10', spec: '10 mg × 10 vials', usd: 42 },
    { code: 'SM20', spec: '20 mg × 10 vials', usd: 66 },
    { code: 'SM30', spec: '30 mg × 10 vials', usd: 85 },
  ],
  semax: [
    { code: 'XA5', spec: '5 mg × 10 vials', usd: 45 },
    { code: 'XA10', spec: '10 mg × 10 vials', usd: 58 },
  ],
  'snap-8': [{ code: 'NP8 10', spec: '10 mg × 10 vials', usd: 45 }],
  'tb-500': [
    { code: 'TB5', spec: '5 mg × 10 vials', usd: 79 },
    { code: 'TB10', spec: '10 mg × 10 vials', usd: 146 },
  ],
  'thymosin-beta-4': [
    { code: 'TB5', spec: '5 mg × 10 vials', usd: 79 },
    { code: 'TB10', spec: '10 mg × 10 vials', usd: 146 },
  ],
  tirzepatide: [
    { code: 'TR10', spec: '10 mg × 10 vials', usd: 48 },
    { code: 'TR15', spec: '15 mg × 10 vials', usd: 53 },
    { code: 'TR20', spec: '20 mg × 10 vials', usd: 69 },
    { code: 'TR30', spec: '30 mg × 10 vials', usd: 90 },
    { code: 'TR40', spec: '40 mg × 10 vials', usd: 116 },
    { code: 'TR50', spec: '50 mg × 10 vials', usd: 143 },
    { code: 'TR60', spec: '60 mg × 10 vials', usd: 169 },
  ],
};

/**
 * 价目表未列出的产品（Argireline / FOXO4-DRI / HGH / Leuphasyl / Matrixyl / PEG-MGF）
 * 使用的全站肽类标价区间：价目表内肽类最低 GHK-Cu 50 mg（US$24）至最高 Tesamorelin 20 mg（US$339）。
 * 不虚构单品价格 —— 页面文案会明确写出这是「目录区间」而非该单品单价。
 */
export const FALLBACK_BAND = { low: 24, high: 339 } as const;

export interface PriceBand {
  low: number;
  high: number;
  /** 该产品的价目表行；空数组表示价目表未列出，走 FALLBACK_BAND */
  rows: PriceRow[];
  /** true = 价格来自该产品的价目表行；false = 目录区间兜底 */
  specific: boolean;
}

export function priceBand(slug: string): PriceBand {
  const rows = PEPTIDE_PRICES[slug] ?? [];
  if (rows.length === 0) {
    return { low: FALLBACK_BAND.low, high: FALLBACK_BAND.high, rows: [], specific: false };
  }
  const prices = rows.map((r) => r.usd);
  return { low: Math.min(...prices), high: Math.max(...prices), rows, specific: true };
}

/** 页面可见的价格文案（与 schema 的 lowPrice/highPrice 同源） */
export function priceText(band: PriceBand): string {
  return band.specific
    ? `US$${band.low}–${band.high} per kit (10 vials), from our published wholesale price list; ${VOLUME_DISCOUNT_TEXT}`
    : `Kit prices are quoted per specification — current list prices for peptide kits run from US$${band.low} to US$${band.high} per kit (10 vials); ${VOLUME_DISCOUNT_TEXT}`;
}

/** 列表页/首页口径：全站标价区间 */
export const CATALOG_BAND = FALLBACK_BAND;
export const CATALOG_PRICE_TEXT = `US$${CATALOG_BAND.low}–${CATALOG_BAND.high} per kit (10 vials), from our published wholesale price list; ${VOLUME_DISCOUNT_TEXT}`;

/** 与页面可见价格区间同源的 AggregateOffer（Google 要求 Product 家族必须带 offers） */
export function productOffers(url: string, band: { low: number; high: number }, offerCount?: number) {
  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: band.low,
    highPrice: band.high,
    ...(offerCount ? { offerCount } : {}),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    businessFunction: 'https://schema.org/Sell',
    url,
    seller: { '@type': 'Organization', name: 'Peptides Source Hub', url: 'https://peptidesourcehub.net' },
  };
}

/* ---------- 数据集（Dataset）元数据 ---------- */

export const DATASET_PATH = { csv: '/data/peptides.csv', json: '/data/peptides.json' };

export const DATASET_NAME = 'Research Peptide Reference Data — Specifications, Kit Configurations & List Prices';

export const DATASET_DESCRIPTION =
  'Machine-readable dataset for the research peptides in the Peptides Source Hub catalogue: CAS number, molecular formula, molecular weight, amino-acid sequence, HPLC purity criterion, appearance, solubility, recommended storage, available kit configurations and current wholesale list prices (USD per kit of 10 vials, as published in the price list). Compiled from the batch documentation published on each product page.';

export const DATASET_KEYWORDS = [
  'research peptides', 'peptide specification', 'CAS number', 'molecular weight',
  'HPLC purity', 'peptide sequence', 'peptide kit configuration', 'peptide list price',
  'wholesale peptides',
];

export const DATASET_VARIABLES = [
  'CAS number', 'Molecular formula', 'Molecular weight', 'Amino-acid sequence',
  'HPLC purity criterion', 'Appearance', 'Solubility', 'Recommended storage',
  'Kit configurations', 'List price (USD per kit)', 'Category',
];
