import type { Metadata } from 'next';
import Link from 'next/link';
import { works } from '@/content/works';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Works',
  description:
    'Every book, essay and film named in the research document, with the page on this site that discusses it.',
};

export default function WorksPage() {
  const sorted = [...works].sort(
    (a, b) => a.author.localeCompare(b.author, 'en') || a.title.localeCompare(b.title, 'en'),
  );
  const contested = works.filter((work) => work.contested).length;

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <SectionHeader eyebrow="Reading surface" title={`${works.length} works`}>
        Every book, essay, lecture course and film the research document names, with the page
        that discusses it. {contested} are marked contested or discredited, which is the whole
        point of listing them here rather than burying them in a paragraph.
      </SectionHeader>

      <ol className="mt-10 list-none border-t border-rule p-0">
        {sorted.map((work) => (
          <li key={`${work.author}-${work.title}`} className="border-b border-rule">
            <Link
              href={work.href}
              className="group grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[16rem_minmax(0,1fr)]"
            >
              <span className="label pt-1">{work.author}</span>
              <span>
                <span className="font-display text-h3 leading-snug group-hover:text-accent">
                  {work.title}
                </span>
                {work.year ? <span className="ml-2 font-mono text-small text-muted">{work.year}</span> : null}
                {work.note ? (
                  <span className="mt-1 block text-small leading-normal text-muted">
                    {work.note}
                  </span>
                ) : null}
                {work.contested ? (
                  <span className="label mt-1.5 inline-block border border-flag px-2 py-0.5 text-flag">
                    {work.contested}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
