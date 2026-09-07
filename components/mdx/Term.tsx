import { glossaryBySlug } from '@/content/glossary';
import { TermTooltip } from './TermTooltip';

/** Reads the definition from content/glossary.ts, the single source of truth.
    An unknown id fails the build rather than rendering an empty tooltip. */
export function Term({ id, children }: { id: string; children: React.ReactNode }) {
  const entry = glossaryBySlug.get(id);
  if (!entry) {
    throw new Error(
      `Unknown glossary term "${id}". Add it to content/glossary.ts or fix the id.`,
    );
  }

  return (
    <TermTooltip
      term={typeof children === 'string' ? children : entry.term}
      definition={entry.definition}
      attribution={entry.attribution}
      slug={entry.slug}
    />
  );
}
