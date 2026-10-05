// Post-build step (Plan A): pre-generate clean Markdown per page + llms.txt index.
// Zero-cost alternative to Cloudflare's paid "Markdown for Agents" feature.
// AI crawlers (GPTBot/ClaudeBot/PerplexityBot) parse Markdown natively and
// discover it through llms.txt — no Accept-negotiation required.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const DIST = process.env.LLMS_DIST || 'dist';
const BASE = process.env.LLMS_BASE || 'https://worldbatteryhub.com';
const MODE = process.env.LLMS_MODE || 'main'; // main: <main> anchor | h1: from first <h1> to end

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

// ---- inline converter (handles a, strong, b, em, code) ----
function inline(html) {
  let s = html;
  s = s.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, text) => {
    let url = href;
    if (href.startsWith('/')) url = BASE + href;
    else if (href.startsWith('#')) return text; // anchor links: keep text only
    const inner = inline(text).trim() || url;
    return `[${inner}](${url})`;
  });
  s = s.replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, '**$2**');
  s = s.replace(/<em>([\s\S]*?)<\/em>/g, '_$1_');
  s = s.replace(/<code>([\s\S]*?)<\/code>/g, '`$1`');
  s = s.replace(/<br\s*\/?>/g, ' ');
  s = s.replace(/<[^>]+>/g, ''); // drop remaining tags, keep text
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&rsaquo;/g, '>')
          .replace(/\s+/g, ' ').trim();
}

// ---- block converter ----
function htmlToMd(html) {
  let s = html;
  // tables first (before generic block splitting)
  s = s.replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (_, t) => {
    const rows = [];
    const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
    let tr;
    while ((tr = trRe.exec(t))) {
      const cells = [];
      const cellRe = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g;
      let c;
      while ((c = cellRe.exec(tr[1]))) cells.push(inline(c[1]));
      rows.push(cells);
    }
    if (rows.length === 0) return '';
    const toLine = (arr) => '| ' + arr.join(' | ') + ' |';
    const lines = [toLine(rows[0]), toLine(rows[0].map(() => '---'))];
    for (let i = 1; i < rows.length; i++) lines.push(toLine(rows[i]));
    return '\n' + lines.join('\n') + '\n';
  });

  // headings
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, (_, t) => `\n# ${inline(t)}\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, (_, t) => `\n## ${inline(t)}\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, (_, t) => `\n### ${inline(t)}\n`);
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, (_, t) => `\n#### ${inline(t)}\n`);

  // lists
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (_, t) => `\n- ${inline(t)}`);
  s = s.replace(/<[ou]l[^>]*>([\s\S]*?)<\/[ou]l>/g, '$1\n');

  // paragraphs + divs
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, (_, t) => `\n${inline(t)}\n`);
  s = s.replace(/<div[^>]*>/g, '\n').replace(/<\/div>/g, '');

  // drop anything else (nav, script remnants, svg), keep text for unknown inline
  s = s.replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, '');
  s = s.replace(/<[^>]+>/g, ' ');

  // decode + normalize
  s = s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  s = s.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

// ---- extraction per mode ----
function extractMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!m) return '';
  let body = m[1];
  // strip breadcrumb nav (site chrome, not content)
  body = body.replace(/<nav[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/g, '');
  body = body.replace(/<nav[^>]*class="[^"]*breadcrumb[^"]*"[\s\S]*?<\/nav>/g, '');
  return body;
}

function extractH1(html) {
  const i = html.indexOf('<h1');
  if (i < 0) return '';
  let body = html.slice(i);
  // cut at the first closing-div chain that ends the page container:
  // keep everything to the last real content tag (</p>,</table>,</ul>) instead of trimming
  return body;
}

// ---- main ----
const files = walk(DIST).filter((f) => !f.includes('/_astro/') && !f.endsWith('404.html'));
const pages = [];
let full = '';

for (const f of files) {
  const html = readFileSync(f, 'utf-8');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').trim() : f;
  const body = MODE === 'h1' ? extractH1(html) : extractMain(html);
  if (!body) continue;
  const md = `# ${title}\n\n${htmlToMd(body)}\n`;

  const rel = f.slice(DIST.length).replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/^\//, '');
  const outPath = join(DIST, 'llms', rel, 'index.md');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, md);

  const url = BASE + (rel === '' ? '/' : `/${rel}/`);
  pages.push({ url, md: rel === '' ? 'index.md' : `${rel}.md`, title });
  full += `\n\n<!-- ${url} -->\n\n${md}`;
  console.log(`  ✓ ${rel || '/'}`);
}

// llms.txt index
const SITE_TITLE = process.env.LLMS_TITLE || 'World Battery Hub — Knowledge & Data Platform';
const SITE_DESC = process.env.LLMS_DESC || 'Structured battery knowledge: battery basics, lead-acid and lithium chemistries, CCA, capacity, group-size reference data, buyer guidance and market information. Free educational content under CC BY 4.0 where noted.';
const pagesSection = `## Per-page Markdown

${pages.map((p) => `- [${p.title}](${BASE}/llms/${p.md})`).join('\n')}

## Full content

- [All pages in one file](${BASE}/llms-full.txt)
`;

// Append per-page section to an existing llms.txt (dynamic endpoint),
// otherwise create a full index from scratch.
const llmsPath = join(DIST, 'llms.txt');
if (existsSync(llmsPath)) {
  let existing = readFileSync(llmsPath, 'utf-8');
  if (!existing.includes('## Per-page Markdown')) {
    existing = existing.replace(/\s*$/, '\n\n') + pagesSection;
    writeFileSync(llmsPath, existing);
  }
} else {
  const index = `# ${SITE_TITLE}

> ${SITE_DESC}

This index lists pre-generated Markdown versions of every page, produced at build
time (Plan A). AI crawlers can fetch any page as clean Markdown without HTML chrome.

${pagesSection}
`;
  writeFileSync(llmsPath, index);
}
writeFileSync(join(DIST, 'llms-full.txt'), `# ${SITE_TITLE} — full content\n${full}\n`);
console.log(`\nDone: ${pages.length} pages → dist/llms/**, llms.txt, llms-full.txt`);
