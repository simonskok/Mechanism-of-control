import type { Metadata } from 'next';
import { crossRefs, getEntries, getEntry } from '@/lib/content';
import { renderEntry } from '@/lib/mdx';
import { EntryLayout } from '@/components/EntryLayout';

export function generateStaticParams() {
  return getEntries('domain').map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getEntry('domain', slug);
  return { title: frontmatter.title, description: frontmatter.thesis };
}

export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry('domain', slug);
  const { frontmatter } = entry;
  const all = getEntries('domain');
  const position = all.findIndex((item) => item.frontmatter.slug === slug) + 1;
  const content = await renderEntry(entry);

  return (
    <EntryLayout
      eyebrow={`Domain ${String(position).padStart(2, '0')} of ${String(all.length).padStart(2, '0')}`}
      title={frontmatter.title}
      lede={frontmatter.thesis}
      fields={[
        { label: 'Thinkers', links: crossRefs('thinker', frontmatter.thinkers) },
        { label: 'Milieus', links: crossRefs('milieu', frontmatter.milieus) },
      ]}
    >
      <div className="prose">{content}</div>
    </EntryLayout>
  );
}
