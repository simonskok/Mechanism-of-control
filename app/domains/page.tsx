import type { Metadata } from 'next';
import { getEntries } from '@/lib/content';
import { IndexList } from '@/components/IndexList';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Domains',
  description:
    'Five domains where control operates: education, media, law, psychology and bureaucracy.',
};

export default function DomainsIndex() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <SectionHeader eyebrow="Part three" title="Five domains">
        Where the mechanisms actually run. Each domain names what the research established,
        what it merely asserted, and who disputes it.
      </SectionHeader>
      <IndexList entries={getEntries('domain')} basePath="/domains" />
    </main>
  );
}
