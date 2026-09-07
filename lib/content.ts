import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Entry, EntryType, Frontmatter } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const DIRECTORY: Record<EntryType, string> = {
  thinker: 'thinkers',
  domain: 'domains',
  milieu: 'milieus',
  essay: 'essays',
};

function required(value: unknown, field: string, file: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing frontmatter field "${field}" in ${file}`);
  }
  return value;
}

function readEntry(filePath: string): Entry {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const file = path.relative(CONTENT_DIR, filePath);

  const frontmatter: Frontmatter = {
    ...(data as Partial<Frontmatter>),
    title: required(data.title, 'title', file),
    slug: required(data.slug, 'slug', file),
    type: required(data.type, 'type', file) as EntryType,
    thesis: required(data.thesis, 'thesis', file),
    order: typeof data.order === 'number' ? data.order : 999,
  };

  if (!(frontmatter.type in DIRECTORY)) {
    throw new Error(`Unknown type "${frontmatter.type}" in ${file}`);
  }

  return { frontmatter, body: content, filePath };
}

/** All entries of one type, in frontmatter order. Read at build time only. */
export function getEntries(type: EntryType): Entry[] {
  const dir = path.join(CONTENT_DIR, DIRECTORY[type]);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => readEntry(path.join(dir, name)))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getEntry(type: EntryType, slug: string): Entry {
  const entry = getEntries(type).find((item) => item.frontmatter.slug === slug);
  if (!entry) throw new Error(`No ${type} with slug "${slug}"`);
  return entry;
}

export function getAllEntries(): Entry[] {
  return (Object.keys(DIRECTORY) as EntryType[]).flatMap((type) => getEntries(type));
}
