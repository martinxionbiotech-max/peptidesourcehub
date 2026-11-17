import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const SITE = 'https://peptidesourcehub.net';
const sm = fs.readFileSync(path.join(DIST, 'sitemap-0.xml'), 'utf8');
const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const titleOf = (url) => {
  const p = new URL(url).pathname.replace(/\/$/, '') || '/';
  const f = path.join(DIST, p, 'index.html');
  if (!fs.existsSync(f)) return p;
  const h = fs.readFileSync(f, 'utf8');
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1] || p;
  return t.replace(/&amp;/g, '&').replace(/&#39;/g, "'");
};

const groups = [
  ['Comparisons', (p) => p.startsWith('/products/compare/')],
  ['Products', (p) => p.startsWith('/products/')],
  ['Knowledge', (p) => p.startsWith('/blog/')],
  ['Quality & testing', (p) => p.startsWith('/quality-and-testing/')],
  ['Compliance & trust', (p) => ['/about/', '/contact/', '/compliance/', '/privacy/', '/terms/', '/disclaimer/', '/faq/', '/shipping/', '/import-compliance/', '/research-use-only/', '/glossary/', '/oem-custom/'].includes(p)],
];

const used = new Set();
const lines = [];
lines.push('# Peptides Source Hub — research peptide supplier');
lines.push('');
lines.push('> Factory-direct research peptides and HGH kits from Shenzhen, China. Batch-specific COA, HPLC/MS documentation, wholesale and OEM supply.');
lines.push('');
lines.push(`Site: ${SITE} · Pages: ${urls.length}`);
lines.push('');

for (const [name, test] of groups) {
  const rows = urls.filter((u) => !used.has(u) && test(new URL(u).pathname));
  if (!rows.length) continue;
  lines.push(`## ${name}`);
  for (const u of rows) {
    used.add(u);
    lines.push(`- ${u} — ${titleOf(u)}`);
  }
  lines.push('');
}
const rest = urls.filter((u) => !used.has(u));
if (rest.length) {
  lines.push('## Other pages');
  for (const u of rest) lines.push(`- ${u} — ${titleOf(u)}`);
  lines.push('');
}

lines.push('## Notes');
lines.push('- All products are for laboratory research use only; not for human or veterinary use.');
lines.push('- Purity is batch-specific and stated on each lot COA.');
lines.push('- Machine-readable copies: append /index.md to any page path; the server also honours Accept: text/markdown.');
lines.push('');

fs.writeFileSync(path.join(DIST, 'llms.txt'), lines.join('\n'));
console.log(`[llms] ${urls.length} URLs -> dist/llms.txt`);
