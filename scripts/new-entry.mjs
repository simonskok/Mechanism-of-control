#!/usr/bin/env node
/**
 * Scaffolds a new content entry so that adding one is a single command rather
 * than four manual steps that are easy to get wrong.
 *
 *   npm run new -- essay tools "Two things you can use"
 *   npm run new -- figure jost "John Jost"
 *
 * It creates the MDX file with correct frontmatter, creates the route for an
 * essay, adds the route to the resolvable set, and bumps EXPECTED in
 * scripts/check-content.mjs. Then it tells you what is left to do by hand.
 *
 * It never overwrites an existing file.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIRECTORY = {
  thinker: 'thinkers',
  figure: 'figures',
  domain: 'domains',
  milieu: 'milieus',
  essay: 'essays',
};

const [type, slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ');

function die(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

if (!type || !slug || !title) {
  die('Usage: npm run new -- <thinker|figure|domain|milieu|essay> <slug> "<Title>"');
}
if (!(type in DIRECTORY)) {
  die(`Unknown type "${type}". One of: ${Object.keys(DIRECTORY).join(', ')}`);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  die(`Slug "${slug}" must be lower case letters, numbers and hyphens only.`);
}

const root = process.cwd();
const mdxPath = path.join(root, 'content', DIRECTORY[type], `${slug}.mdx`);
if (fs.existsSync(mdxPath)) die(`${path.relative(root, mdxPath)} already exists.`);

// Next order number for this type.
const dir = path.dirname(mdxPath);
const orders = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => Number(fs.readFileSync(path.join(dir, f), 'utf8').match(/^order:\s*(\d+)/m)?.[1] ?? 0));
const order = Math.max(0, ...orders) + 1;

const needsObjections = type === 'thinker' || type === 'figure';
const needsMeta = type === 'milieu';

const frontmatter = [
  '---',
  `title: ${title}`,
  `slug: ${slug}`,
  `type: ${type}`,
  type === 'essay' ? `eyebrow: ${title.split(' ')[0]}` : null,
  'thesis: ONE SENTENCE. What this entry establishes. Rewrite before committing.',
  `order: ${order}`,
  type === 'thinker' || type === 'figure' ? 'years: UNKNOWN' : null,
  type === 'thinker' || type === 'figure' ? 'country: UNKNOWN' : null,
  needsMeta ? 'meta:' : null,
  needsMeta ? '  years: UNKNOWN' : null,
  needsMeta ? '  location: UNKNOWN' : null,
  needsMeta ? '  institution: UNKNOWN' : null,
  needsMeta ? '  funder: UNKNOWN' : null,
  '---',
]
  .filter(Boolean)
  .join('\n');

const body = [
  '',
  'Opening paragraph. Plain language, no jargon, concrete before abstract.',
  '',
  needsMeta ? '<MetaStrip />\n' : null,
  '## A heading',
  '',
  'Body.',
  '',
  needsObjections
    ? '<Objections>\n- The strongest argument against this. Never collapsed, never removed.\n</Objections>\n'
    : null,
]
  .filter((part) => part !== null)
  .join('\n');

fs.writeFileSync(mdxPath, `${frontmatter}\n${body}`);
console.log(`  created  ${path.relative(root, mdxPath)}`);

// Essays get their own top level route. The other types are served by [slug] routes.
if (type === 'essay') {
  const routeDir = path.join(root, 'app', slug);
  fs.mkdirSync(routeDir, { recursive: true });
  const routePath = path.join(routeDir, 'page.tsx');
  if (!fs.existsSync(routePath)) {
    fs.writeFileSync(
      routePath,
      `import { EssayPage, essayMetadata } from '@/components/EssayPage';\n\n` +
        `export const generateMetadata = () => essayMetadata('${slug}');\n\n` +
        `export default function Page() {\n  return <EssayPage slug="${slug}" />;\n}\n`,
    );
    console.log(`  created  ${path.relative(root, routePath)}`);
  }
}

// Keep the check script in step, since it is hardcoded on purpose.
const checkPath = path.join(root, 'scripts', 'check-content.mjs');
let check = fs.readFileSync(checkPath, 'utf8');

const counts = check.match(/const EXPECTED = \{([^}]+)\};/);
if (!counts) die('Could not find EXPECTED in scripts/check-content.mjs. Update it by hand.');
const bumped = counts[0].replace(
  new RegExp(`(${type}:\\s*)(\\d+)`),
  (_, prefix, n) => `${prefix}${Number(n) + 1}`,
);
check = check.replace(counts[0], bumped);

if (type === 'essay' && !check.includes(`'/${slug}'`)) {
  check = check.replace(/(const routes = new Set\(\[)/, `$1'/${slug}', `);
}

fs.writeFileSync(checkPath, check);
console.log(`  updated  scripts/check-content.mjs`);

console.log(`
  Still to do by hand:

${[
  'Write the entry. Replace the thesis and the body.',
  needsObjections && 'The objections block is required and the build enforces it.',
  'Any <Term id="..."> must already exist in content/glossary.ts. Add it there first,\n       never inline.',
  type === 'thinker' &&
    'Reception rule 1: either a capabilities array whose paths resolve, or\n       noCounterPracticeFound: true. Never neither, never both.',
  'Point content/roster.ts and content/works.ts at this page. If this person was\n       already listed against some other page, that entry is now stale and the\n       check will say so.',
  'House style: no em dashes, no maritime metaphors, no banned phrases.',
  type === 'essay' && 'Add a link in components/SiteFooter.tsx if it belongs in the nav.',
]
  .filter(Boolean)
  .map((line, index) => `    ${index + 1}. ${line}`)
  .join('\n')}

  Then:

    npm run verify
`);
