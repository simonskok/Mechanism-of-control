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
const seen = { thinker: 0, figure: 0, domain: 0, milieu: 0, essay: 0 };

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

  // Every thinker and every figure carries objections, never collapsed.
  if ((type === 'thinker' || type === 'figure') && !body.includes('<Objections>')) {
    fail(relative, `a ${type} entry with no <Objections> block`);
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

const EXPECTED = { thinker: 6, figure: 30, domain: 5, milieu: 12, essay: 11 };
for (const [type, count] of Object.entries(EXPECTED)) {
  if (seen[type] !== count) {
    fail('content', `expected ${count} ${type} entries, found ${seen[type]}`);
  }
}

// Every href in the roster and the works index resolves to a page that exists.
const routes = new Set(['/revelation', '/what-control-reveals', '/ritual', '/east-west', '/method', '/reading', '/open-questions', '/glossary',
  '/counter-tradition', '/provenance', '/works', '/figures', '/thinkers', '/domains', '/milieus',
  '/tools', '/reflexive']);
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const slug = raw.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
  const type = raw.match(/^type:\s*(\w+)/m)?.[1];
  const section = { thinker: 'thinkers', figure: 'figures', domain: 'domains', milieu: 'milieus' }[type];
  if (slug && section) routes.add(`/${section}/${slug}`);
}

// Every internal link in an entry body resolves. The roster and the works index
// were checked from the start and page prose was not, so a dead link inside a
// paragraph shipped silently. Caught the first time the method page linked to a
// figure page that does not exist.
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const relative = path.relative(process.cwd(), file);
  for (const match of raw.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const href = match[1].split('#')[0].replace(/\/$/, '') || '/';
    if (href !== '/' && !routes.has(href)) {
      fail(relative, `link ${match[1]} does not resolve to a page`);
    }
  }
}

const roster = fs.readFileSync(path.join(CONTENT, 'roster.ts'), 'utf8');
const worksSource = fs.readFileSync(path.join(CONTENT, 'works.ts'), 'utf8');
for (const [source, label] of [[roster, 'content/roster.ts'], [worksSource, 'content/works.ts']]) {
  for (const match of source.matchAll(/href: '([^']+)'/g)) {
    if (!routes.has(match[1])) fail(label, `href ${match[1]} does not resolve to a page`);
  }
}

// Reception rule 1, pairing. A thinker entry carries either a non-empty
// capabilities array whose every path resolves, or noCounterPracticeFound.
// One or the other, never neither and never both.
//
// UNPAIRED is debt, not an exemption. These six entries predate the rule and
// none of them puts a counter-practice in its own view. Separate pages do not
// count, which is what the rule means by same view. The list must only ever
// shrink, and a name comes off it by pairing that page, never by editing this
// line. A new thinker entry is not on the list and so fails the build.
// Empty, and it stays empty. Every thinker entry now carries a pairing or a
// published absence. Cleared 2026-09-14: two paired, four absences published,
// which is the honest split the research document supports.
const UNPAIRED = new Set([]);

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const relative = path.relative(process.cwd(), file);
  const [, frontmatter = ''] = raw.split(/^---$/m);
  if (!/^type:\s*thinker/m.test(frontmatter)) continue;

  const slug = frontmatter.match(/^slug:\s*(.+)$/m)?.[1]?.trim() ?? '';
  const flagged = /^noCounterPracticeFound:\s*true\s*$/m.test(frontmatter);
  const capabilityBlock = frontmatter.match(/^capabilities:\n((?:\s+[-\w].*\n?)+)/m)?.[1] ?? '';
  const capabilities = [...capabilityBlock.matchAll(/href:\s*(\S+)/g)].map((match) => match[1]);
  const labels = [...capabilityBlock.matchAll(/label:\s*(.+)/g)].length;
  if (capabilities.length !== labels) {
    fail(relative, 'reception rule 1: every capability needs both an href and a label');
  }

  if (capabilities.length > 0 && flagged) {
    fail(relative, 'reception rule 1: both capabilities and noCounterPracticeFound. Pick one');
  }
  for (const route of capabilities) {
    if (!routes.has(route)) {
      fail(relative, `reception rule 1: capability ${route} does not resolve to a page`);
    }
  }
  if (capabilities.length === 0 && !flagged && !UNPAIRED.has(slug)) {
    fail(
      relative,
      'reception rule 1: a mechanism with no capabilities and no noCounterPracticeFound. ' +
        'Pair it in the same view, or state that no counter-practice was found',
    );
  }
  // Resolved either way, by a pairing or by a published absence, and still listed
  // as debt. The first version of this only caught the capabilities case, so an
  // entry could carry noCounterPracticeFound and sit on the list forever.
  if ((capabilities.length > 0 || flagged) && UNPAIRED.has(slug)) {
    fail(
      'scripts/check-content.mjs',
      `${slug} is resolved now, ${capabilities.length > 0 ? 'paired' : 'absence published'}. ` +
        'Take it out of UNPAIRED, the debt list only shrinks',
    );
  }
}

// A person with an entry of their own is linked to it. Adding a figure page
// leaves roster.ts and works.ts pointing at whatever page used to mention them,
// every href still resolves, and the build stays green while the index sends
// the reader somewhere else. Found exactly that way when the Lifton page was
// added, so it is checked now.
//
// Matched on the whole name, not the surname. The first version of this check
// keyed on surname and reported Gina Perry as a broken link to William Perry's
// page, who is a different person. Two people can share a surname and only one
// of them has the page.
function normalise(name) {
  return name.toLowerCase().replace(/[^a-zà-ÿ ]/g, '').replace(/\s+/g, ' ').trim();
}

const ownPages = new Map();
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const type = raw.match(/^type:\s*(\w+)/m)?.[1];
  const slug = raw.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
  const title = raw.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  if (!slug || !title || (type !== 'thinker' && type !== 'figure')) continue;
  ownPages.set(normalise(title), `/${type === 'thinker' ? 'thinkers' : 'figures'}/${slug}`);
}

for (const [source, label, pattern] of [
  [roster, 'content/roster.ts', /name: '([^']+)'[\s\S]{0,400}?href: '([^']+)'/g],
  [worksSource, 'content/works.ts', /author: '([^']+)'[\s\S]{0,400}?href: '([^']+)'/g],
]) {
  for (const [, listed, href] of source.matchAll(pattern)) {
    const [surname, forenames = ''] = listed.split(',');
    const own = ownPages.get(normalise(`${forenames} ${surname}`));
    if (own && href !== own) {
      fail(label, `${listed} has an entry at ${own}, but this points at ${href}`);
    }
  }
}

// Nobody the research document names disappears from the site. This rule exists
// because the site once failed it: a hundred and forty people were inside the
// prose with no way to reach any of them.
const DOCUMENT = fs.readFileSync(path.join(process.cwd(), 'INVISIBLE_CONTROL.md'), 'utf8');
const NOT_PEOPLE = new Set([
  'Studies', 'Realism', 'Team', 'Institute', 'Society', 'Conferences', 'School', 'Project',
  'Bureau', 'Corporation', 'Foundation', 'Notebooks', 'Freedom', 'Insights', 'Kitchen',
  'Network', 'Forum', 'Tank', 'Think', 'Archive', 'Library', 'Preserve', 'Nemesis',
  'Sacer', 'Sovieticus', 'Capital', 'Monat', 'Presente', 'Choice', 'Encounter', 'Preuves',
  'War', 'Europe', 'America', 'Atlantic', 'Gymnasium', 'Volksschule', 'Prussian', 'Meiji',
  'Four', 'Two', 'Frankfurt', 'Law', 'Legal', 'Panopticon', 'Sociological', 'Stanford',
  'Student', 'Youth', 'Existing', 'Funding', 'Design',
]);
const corpus = [
  ...files.map((file) => fs.readFileSync(file, 'utf8')),
  roster,
  worksSource,
  fs.readFileSync(path.join(CONTENT, 'glossary.ts'), 'utf8'),
].join('\n');

// A name that opens a bold run in the document, whether or not the run carries
// on into a title. Good enough as a regression guard, which is what it is for.
const named = new Set();
const NAME = /\*\*([A-Z][a-zà-ÿ'\u2019-]+(?:\s+(?:de|von|van|der|Le|Taylor|Jay|Wright|Leigh)\s+|\s+(?:[A-Z]\.\s+)*)[A-Z][a-zà-ÿ'\u2019-]+)/g;
for (const match of DOCUMENT.matchAll(NAME)) {
  const surname = match[1].split(/\s+/).pop();
  if (surname.length < 4 || NOT_PEOPLE.has(surname)) continue;
  named.add(surname);
}

const absent = [...named].filter((surname) => !corpus.includes(surname));
if (absent.length > 0) {
  fail('content', `named in the research document but nowhere on the site: ${absent.join(', ')}`);
}

if (failures.length > 0) {
  console.error(`\ncontent check failed, ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  console.error('');
  process.exit(1);
}

console.log(
  `content check passed: ${seen.thinker} thinkers, ${seen.figure} figures, ${seen.domain} domains, ` +
    `${seen.milieu} milieus, ${seen.essay} essays, ${glossarySlugs.size} glossary terms, ` +
    `${named.size} named figures all present`,
);
