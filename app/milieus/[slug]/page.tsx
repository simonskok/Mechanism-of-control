import type { Metadata } from 'next';
import { crossRefs, getEntries, getEntry } from '@/lib/content';
import { renderEntry } from '@/lib/mdx';
import { EntryLayout } from '@/components/EntryLayout';

export function generateStaticParams() {
  return getEntries('milieu').map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getEntry('milieu', slug);
  return { title: frontmatter.title, description: frontmatter.thesis };
}

export default async function MilieuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry('milieu', slug);
  const { frontmatter } = entry;
  const all = getEntries('milieu');
  const position = all.findIndex((item) => item.frontmatter.slug === slug) + 1;
  const content = await renderEntry(entry);

  return (
    <EntryLayout
      eyebrow={`Milieu ${String(position).padStart(2, '0')} of ${String(all.length).padStart(2, '0')}`}
      title={frontmatter.title}
      lede={frontmatter.thesis}
      fields={[
        { label: 'Thinkers', links: crossRefs('thinker', frontmatter.thinkers) },
        { label: 'Domains', links: crossRefs('domain', frontmatter.domains) },
        { label: 'Reads with', links: crossRefs('milieu', frontmatter.milieus) },
      ]}
    >
      <div className="prose">{content}</div>
    </EntryLayout>
  );
}
