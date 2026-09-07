import type { Metadata } from 'next';
import { getEntries } from '@/lib/content';
import { IndexList } from '@/components/IndexList';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Thinkers',
  description:
    'Six thinkers from opposed political traditions who converge on the same structural observation about power.',
};

export default function ThinkersIndex() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <SectionHeader eyebrow="Part two" title="Six thinkers">
        Three came from the left, one joined the Nazi party, and the others refuse the axis
        entirely. They converge anyway, which is the strongest reason to treat the finding as
        structural rather than partisan.
      </SectionHeader>
      <IndexList entries={getEntries('thinker')} basePath="/thinkers" />
    </main>
  );
}
