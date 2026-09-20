/**
 * 批发价格区间 —— 站点唯一价格来源（single source of truth）
 *
 * schema 的 AggregateOffer 与页面可见价格文案取自同一常量，
 * 保证「结构化数据与页面可见内容一致」，不会各自漂移。
 *
 * 单位：USD，按 kit（盒 = 10 vials）计。
 * 各品种/规格标价不同；5 kit 起阶梯折扣 10–70%。
 */
export const PRICE_RANGE = { low: 60, high: 220, currency: 'USD' } as const;

export const PRICE_TEXT =
  `US$${PRICE_RANGE.low}–${PRICE_RANGE.high} per kit (list price varies by peptide and kit size; tiered volume discounts of 10–70% apply from 5 kits)`;

/** 与页面可见价格区间同源的 AggregateOffer（Google 要求 Product 家族必须带 offers） */
export function productOffers(url: string, offerCount?: number) {
  return {
    '@type': 'AggregateOffer',
    priceCurrency: PRICE_RANGE.currency,
    lowPrice: PRICE_RANGE.low,
    highPrice: PRICE_RANGE.high,
    ...(offerCount ? { offerCount } : {}),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    businessFunction: 'https://schema.org/Sell',
    url,
    seller: { '@type': 'Organization', name: 'Peptides Source Hub', url: 'https://peptidesourcehub.net' },
  };
}

/* ---------- 数据集（Dataset）元数据 ---------- */

/** 从产品内容集合生成的数据集版本号（与产品数据同步） */
export const DATASET_PATH = { csv: '/data/peptides.csv', json: '/data/peptides.json' };

export const DATASET_NAME = 'Research Peptide Reference Data — Specifications & Kit Configurations';

export const DATASET_DESCRIPTION =
  'Machine-readable specification dataset for the research peptides in the Peptides Source Hub catalogue: CAS number, molecular formula, molecular weight, amino-acid sequence, HPLC purity criterion, appearance, solubility, recommended storage and available kit configurations. Compiled from the batch documentation published on each product page.';

export const DATASET_KEYWORDS = [
  'research peptides', 'peptide specification', 'CAS number', 'molecular weight',
  'HPLC purity', 'peptide sequence', 'peptide kit configuration', 'wholesale peptides',
];

export const DATASET_VARIABLES = [
  'CAS number', 'Molecular formula', 'Molecular weight', 'Amino-acid sequence',
  'HPLC purity criterion', 'Appearance', 'Solubility', 'Recommended storage',
  'Kit configurations', 'Category',
];
