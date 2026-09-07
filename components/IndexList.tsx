import Link from 'next/link';
import type { Entry } from '@/lib/types';

/** The listing used by the three section indexes. Milieus show years and funder
    in the list itself, because the funding is part of what identifies them. */
export function IndexList({ entries, basePath }: { entries: Entry[]; basePath: string }) {
  return (
    <ol className="mt-10 border-t border-rule">
      {entries.map((entry, index) => {
        const { frontmatter } = entry;
        return (
          <li key={frontmatter.slug} className="border-b border-rule">
            <Link
              href={`${basePath}/${frontmatter.slug}`}
              className="group grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 py-5"
            >
              <span className="font-mono text-label text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="font-display text-h2 leading-snug group-hover:text-accent">
                  {frontmatter.title}
                </span>
                {frontmatter.years || frontmatter.meta ? (
                  <span className="label mt-1.5 block">
                    {frontmatter.years ?? frontmatter.meta?.years}
                    {frontmatter.country ? ` / ${frontmatter.country}` : ''}
                    {frontmatter.meta?.location ? ` / ${frontmatter.meta.location}` : ''}
                  </span>
                ) : null}
                <span className="measure mt-2 block text-muted">{frontmatter.thesis}</span>
                {frontmatter.meta ? (
                  <span className="label mt-2 block text-flag">
                    Funder: {frontmatter.meta.funder}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
