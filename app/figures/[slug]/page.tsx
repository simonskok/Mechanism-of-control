import type { Metadata } from 'next';
import { crossRefs, getEntries, getEntry } from '@/lib/content';
import { renderEntry } from '@/lib/mdx';
import { EntryLayout } from '@/components/EntryLayout';

export function generateStaticParams() {
  return getEntries('figure').map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getEntry('figure', slug);
  return { title: frontmatter.title, description: frontmatter.thesis };
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry('figure', slug);
  const { frontmatter } = entry;
  const all = getEntries('figure');
  const position = all.findIndex((item) => item.frontmatter.slug === slug) + 1;
  const content = await renderEntry(entry);

  return (
    <EntryLayout
      eyebrow={`Figure ${String(position).padStart(2, '0')} of ${String(all.length).padStart(2, '0')}`}
      title={frontmatter.title}
      fields={[
        { label: 'Years', value: frontmatter.years },
        { label: 'Country', value: frontmatter.country },
        { label: 'Domains', links: crossRefs('domain', frontmatter.domains) },
        { label: 'Milieus', links: crossRefs('milieu', frontmatter.milieus) },
        { label: 'Reads with', links: crossRefs('thinker', frontmatter.thinkers) },
        { label: 'And with', links: crossRefs('figure', frontmatter.figures) },
      ]}
    >
      <div className="prose">{content}</div>
    </EntryLayout>
  );
}
