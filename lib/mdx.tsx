import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Term } from '@/components/mdx/Term';
import { Framing } from '@/components/mdx/Framing';
import { Thesis } from '@/components/mdx/Thesis';
import { Objections } from '@/components/mdx/Objections';
import { Contested } from '@/components/mdx/Contested';
import { Mechanism } from '@/components/mdx/Mechanism';
import { MetaStrip } from '@/components/mdx/MetaStrip';
import type { Entry } from './types';

/** Internal links go through next/link, external ones open in a new tab and
    say so to a screen reader. */
function Anchor({ href = '', children }: { href?: string; children?: React.ReactNode }) {
  if (href.startsWith('/')) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Compiles one entry's MDX at build time. Mechanism and MetaStrip are bound to
 * this entry's frontmatter, so an author writes <Mechanism /> and gets the
 * steps declared at the top of the same file.
 */
export async function renderEntry(entry: Entry) {
  const { mechanism, meta } = entry.frontmatter;

  const { content } = await compileMDX({
    source: entry.body,
    options: { parseFrontmatter: false },
    components: {
      a: Anchor,
      Term,
      Framing,
      Thesis,
      Objections,
      Contested,
      Mechanism: () => <Mechanism steps={mechanism ?? []} />,
      MetaStrip: () => {
        if (!meta) {
          throw new Error(
            `<MetaStrip /> used in ${entry.filePath} but the entry has no meta frontmatter.`,
          );
        }
        return <MetaStrip meta={meta} />;
      },
    },
  });

  return content;
}
