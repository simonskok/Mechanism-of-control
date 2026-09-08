import Link from 'next/link';
import { roster } from '@/content/roster';

/** Everyone named in the research document, alphabetical by surname. Names with
    an entry of their own link to it. The rest link to the page that deals with
    them, which is the point: nobody in the material is unreachable. */
export function RosterList() {
  const sorted = [...roster].sort((a, b) => a.name.localeCompare(b.name, 'en'));

  return (
    <ul className="mt-8 grid list-none gap-px border border-rule bg-rule p-0 lg:grid-cols-2">
      {sorted.map((entry) => (
        <li key={entry.name} className="bg-paper">
          <Link href={entry.href} className="group flex h-full flex-col gap-1 px-4 py-3.5">
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display text-h3 leading-snug group-hover:text-accent">
                {entry.name}
              </span>
              {entry.page ? <span className="label text-accent">Entry</span> : null}
            </span>
            <span className="text-small leading-normal text-muted">{entry.note}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
