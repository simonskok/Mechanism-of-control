import type { Metadata } from 'next';
import { crossRefs, getEntries, getEntry } from '@/lib/content';
import { renderEntry } from '@/lib/mdx';
import { EntryLayout } from '@/components/EntryLayout';
import { Pairing } from '@/components/Pairing';

export function generateStaticParams() {
  return getEntries('thinker').map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getEntry('thinker', slug);
  return { title: frontmatter.title, description: frontmatter.thesis };
}

export default async function ThinkerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry('thinker', slug);
  const { frontmatter } = entry;
  const all = getEntries('thinker');
  const position = all.findIndex((item) => item.frontmatter.slug === slug) + 1;
  const content = await renderEntry(entry);

  return (
    <EntryLayout
      eyebrow={`Thinker ${String(position).padStart(2, '0')} of ${String(all.length).padStart(2, '0')}`}
      title={frontmatter.title}
      fields={[
        { label: 'Years', value: frontmatter.years },
        { label: 'Country', value: frontmatter.country },
        { label: 'Domains', links: crossRefs('domain', frontmatter.domains) },
        { label: 'Milieus', links: crossRefs('milieu', frontmatter.milieus) },
        { label: 'Reads with', links: crossRefs('thinker', frontmatter.thinkers) },
        { label: 'Figures', links: crossRefs('figure', frontmatter.figures) },
      ]}
    >
      <div className="prose">{content}</div>
      {/* Reception rule 1. Rendered here rather than left to the MDX so that no
          thinker page can ship without it, and so the check and the page agree. */}
      <Pairing
        capabilities={frontmatter.capabilities}
        noCounterPracticeFound={frontmatter.noCounterPracticeFound}
        note={frontmatter.noCounterPracticeNote}
      />
    </EntryLayout>
  );
}
