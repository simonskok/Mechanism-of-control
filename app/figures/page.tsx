import type { Metadata } from 'next';
import { getEntries } from '@/lib/content';
import { roster } from '@/content/roster';
import { IndexList } from '@/components/IndexList';
import { RosterList } from '@/components/RosterList';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Figures',
  description:
    'Everyone named in the research document, with a line each and a link to the page that deals with them. Twenty have entries of their own.',
};

export default function FiguresIndex() {
  const figures = getEntries('figure');

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <SectionHeader eyebrow="Everyone in here" title={`${roster.length} people`}>
        The six core thinkers carry the argument, and they are not the material. This is
        everyone the research document names, with a line each and a link to the page that
        deals with them. Twenty have entries of their own, listed first, in the order their
        key work appeared.
      </SectionHeader>

      <h2 className="label mt-12 border-t border-rule pt-4">
        Twenty entries, from 1548 to 2019
      </h2>
      <IndexList entries={figures} basePath="/figures" />

      <h2 className="label mt-14 border-t border-rule pt-4">Everyone named, alphabetical</h2>
      <RosterList />
    </main>
  );
}
