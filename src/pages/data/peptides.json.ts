import { getCollection } from 'astro:content';
import {
  DATASET_DESCRIPTION,
  DATASET_NAME,
  PRICE_LIST_UPDATED,
  PRICE_LIST_URL,
  priceText,
  priceBand,
} from '../../data/pricing';

/**
 * /data/peptides.json —— 由产品内容集合构建的机器可读数据集。
 * 与产品页共享同一数据源，不额外维护一份。
 */
export async function GET() {
  const products = await getCollection('products');
  const sorted = [...products].sort((a, b) => a.data.nameShort.localeCompare(b.data.nameShort));

  const records = sorted.map((p) => {
    const band = priceBand(p.data.slug);
    return {
      slug: p.data.slug,
      name: p.data.nameShort,
      catalogName: p.data.name,
      category: p.data.categoryLabel,
      cas: p.data.cas,
      molecularFormula: p.data.molecularFormula,
      molecularWeight: p.data.molecularWeight,
      sequence: p.data.sequence,
      aminoAcids: p.data.aminoAcids,
      purityCriterion: p.data.purity,
      appearance: p.data.appearance,
      solubility: p.data.solubility,
      storage: p.data.storage,
      kitConfigurations: p.data.configurations.map((c) => `${c.name}: ${c.content}`).join('; '),
      productUrl: `https://peptidesourcehub.net/products/${p.data.slug}/`,
      // 价格口径与产品页展示、schema 的 AggregateOffer 完全同源
      priceBasis: band.specific ? 'published price list (per kit size)' : 'catalogue range (no per-size price published)',
      listPriceLowUSD: band.low,
      listPriceHighUSD: band.high,
      listPricePerKit: band.rows.map((r) => `${r.spec}: US$${r.usd}`).join('; '),
      priceNote: priceText(band),
      priceListUrl: `https://peptidesourcehub.net${PRICE_LIST_URL}`,
      };
  });

  return new Response(
    JSON.stringify(
      {
        name: DATASET_NAME,
        description: DATASET_DESCRIPTION,
        recordCount: records.length,
        license: 'https://peptidesourcehub.net/terms/',
        priceList: {
          url: `https://peptidesourcehub.net${PRICE_LIST_URL}`,
          updated: PRICE_LIST_UPDATED,
          currency: 'USD',
          unit: 'per kit (10 vials)',
        },
        publisher: 'Peptides Source Hub',
        source: 'https://peptidesourcehub.net/products/',
        records,
      },
      null,
      2
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
}
