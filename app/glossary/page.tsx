import type { Metadata } from 'next';
import { glossary } from '@/content/glossary';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Glossary',
  description:
    'Every technical term on this site, defined in plain words. One anchor per term, and the single source of truth for the definitions used elsewhere.',
};

export default function GlossaryPage() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <SectionHeader eyebrow="Appendix" title="Glossary">
        Every technical term used on this site, in plain words. These definitions are the
        single source of truth: the tooltips elsewhere read from this file, so a term is
        never defined twice and never defined differently in two places.
      </SectionHeader>

      <dl className="mt-10 border-t border-rule">
        {terms.map((term) => (
          <div
            key={term.slug}
            id={term.slug}
            className="grid scroll-mt-6 gap-x-8 gap-y-2 border-b border-rule py-5 sm:grid-cols-[14rem_minmax(0,1fr)]"
          >
            <dt>
              <span className="font-display text-h2 leading-snug">{term.term}</span>
              {term.attribution ? (
                <span className="label mt-1 block">{term.attribution}</span>
              ) : null}
            </dt>
            <dd className="measure">{term.definition}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
