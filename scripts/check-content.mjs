/**
 * Turns the editorial rules in CLAUDE.md into something the build enforces.
 *
 * Runs automatically before every build. If it fails, the site does not build,
 * which is the point: a future session cannot quietly drop the Schmitt framing
 * or hide an objections block, and a term cannot be used without a definition.
 */
import fs from 'node:fs';
import path from 'node:path';

const CONTENT = path.join(process.cwd(), 'content');
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) return walk(full);
    return item.name.endsWith('.mdx') ? [full] : [];
  });
}

// Glossary slugs, read straight out of the source of truth.
const glossarySource = fs.readFileSync(path.join(CONTENT, 'glossary.ts'), 'utf8');
const glossarySlugs = new Set(
  [...glossarySource.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((match) => match[1]),
);

if (glossarySlugs.size === 0) {
  fail('content/glossary.ts', 'no terms found, the slug pattern may have changed');
}

// House style. CLAUDE.md forbids these outright.
const BANNED_PHRASES = [
  'it is important to note',
  'it is worth noting',
  "they don't want you to know",
  'they do not want you to know',
  'dark psychology',
];

// No maritime metaphors. Word boundaries keep "anchor" in an HTML sense out of it,
// and content files have no markup of that kind anyway.
const MARITIME = [
  /\bnavigat\w*/i,
  /\bsteer\w*/i,
  /\banchor\w*/i,
  /\bharbou?rs?\b/i,
  /\bvoyages?\b/i,
  /\bon board\b/i,
  /\bset sail\b/i,
  /\bcharting\b/i,
  /\bthe waters\b/i,
];

const files = walk(CONTENT);
const seen = { thinker: 0, domain: 0, milieu: 0, essay: 0 };

for (const file of files) {
  const relative = path.relative(process.cwd(), file);
  const raw = fs.readFileSync(file, 'utf8');
  const [, frontmatter = '', body = ''] = raw.split(/^---$/m);

  const type = frontmatter.match(/^type:\s*(\w+)/m)?.[1];
  if (!type || !(type in seen)) {
    fail(relative, `missing or unknown type in frontmatter`);
    continue;
  }
  seen[type] += 1;

  // Every term used must exist in the glossary.
  for (const match of body.matchAll(/<Term id="([^"]+)"/g)) {
    if (!glossarySlugs.has(match[1])) {
      fail(relative, `<Term id="${match[1]}"> is not in content/glossary.ts`);
    }
  }

  // Every thinker carries objections, and they are never collapsed.
  if (type === 'thinker' && !body.includes('<Objections>')) {
    fail(relative, 'a thinker entry with no <Objections> block');
  }

  // Funding is a first-class fact. UNKNOWN is allowed. Blank is not.
  if (type === 'milieu') {
    if (!body.includes('<MetaStrip />')) {
      fail(relative, 'a milieu entry with no <MetaStrip /> on the page');
    }
    const funder = frontmatter.match(/^\s+funder:\s*(.+)$/m)?.[1]?.trim();
    if (!funder) {
      fail(relative, 'no funder in the metadata strip. Say UNKNOWN rather than leaving it out');
    }
  }

  const lower = raw.toLowerCase();
  // A page is allowed to name a retired phrase in order to retire it, and both
  // the method page and the psychology domain do exactly that.
  const retiring = lower.includes('is not used');
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase) && !retiring) {
      fail(relative, `house style: "${phrase}"`);
    }
  }

  for (const pattern of MARITIME) {
    const hit = raw.match(pattern);
    if (hit) fail(relative, `maritime metaphor: "${hit[0]}"`);
  }

  if (raw.includes('—')) {
    fail(relative, 'em dash. Use a plain hyphen');
  }
}

// The two pages that carry the most risk, checked by name.
const schmitt = fs.readFileSync(path.join(CONTENT, 'thinkers/schmitt.mdx'), 'utf8');
const framing = schmitt.match(/<Framing>([\s\S]*?)<\/Framing>/)?.[1] ?? '';
if (!/nazi party/i.test(framing)) {
  fail('content/thinkers/schmitt.mdx', 'the <Framing> block no longer states the Nazi party membership');
}
if (!/apologist/i.test(framing)) {
  fail('content/thinkers/schmitt.mdx', 'the <Framing> block no longer states his role as the regime\'s legal apologist');
}

const agamben = fs.readFileSync(path.join(CONTENT, 'thinkers/agamben.mdx'), 'utf8');
if (!/<WorkedExample[\s\S]*COVID/i.test(agamben)) {
  fail('content/thinkers/agamben.mdx', 'the COVID worked example is gone or is no longer featured');
}

const EXPECTED = { thinker: 6, domain: 5, milieu: 12, essay: 4 };
for (const [type, count] of Object.entries(EXPECTED)) {
  if (seen[type] !== count) {
    fail('content', `expected ${count} ${type} entries, found ${seen[type]}`);
  }
}

if (failures.length > 0) {
  console.error(`\ncontent check failed, ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  console.error('');
  process.exit(1);
}

console.log(
  `content check passed: ${seen.thinker} thinkers, ${seen.domain} domains, ${seen.milieu} milieus, ${seen.essay} essays, ${glossarySlugs.size} glossary terms`,
);
