import type { Metadata } from 'next';
import { getEntries } from '@/lib/content';
import { IndexList } from '@/components/IndexList';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Milieus',
  description:
    'Twelve institutional settings, organized by who paid for the thinking rather than by who did it.',
};

export default function MilieusIndex() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <SectionHeader eyebrow="Part four" title="Twelve milieus">
        Organized by institution rather than by person, because who paid for the thinking
        explains more than the thinker's biography does. The funder is on the page before the
        argument is.
      </SectionHeader>
      <IndexList entries={getEntries('milieu')} basePath="/milieus" />
    </main>
  );
}
