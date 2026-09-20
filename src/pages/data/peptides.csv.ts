import { getCollection } from 'astro:content';

/** /data/peptides.csv —— 同一数据集的 CSV 版本（Excel / 数据分析可直接打开） */
const COLUMNS = [
  'slug', 'name', 'catalog_name', 'category', 'cas', 'molecular_formula', 'molecular_weight',
  'sequence', 'amino_acids', 'purity_criterion', 'appearance', 'solubility', 'storage',
  'kit_configurations', 'product_url',
];

const esc = (v: string) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export async function GET() {
  const products = await getCollection('products');
  const sorted = [...products].sort((a, b) => a.data.nameShort.localeCompare(b.data.nameShort));

  const lines = [COLUMNS.join(',')];
  for (const p of sorted) {
    const d = p.data;
    lines.push(
      [
        d.slug, d.nameShort, d.name, d.categoryLabel, d.cas, d.molecularFormula, d.molecularWeight,
        d.sequence, d.aminoAcids, d.purity, d.appearance, d.solubility, d.storage,
        d.configurations.map((c) => `${c.name}: ${c.content}`).join('; '),
        `https://peptidesourcehub.net/products/${d.slug}/`,
      ].map(esc).join(',')
    );
  }

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}
