'use client';

import Link from 'next/link';
import { useId, useState } from 'react';

/** The client half of a term definition. It receives the resolved text, so the
    glossary itself never ships to the browser twice. */
export function TermTooltip({
  term,
  definition,
  attribution,
  slug,
}: {
  term: string;
  definition: string;
  attribution?: string;
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="cursor-help border-b border-dotted border-accent"
      >
        {term}
      </button>
      <span
        id={id}
        role="tooltip"
        hidden={!open}
        className="absolute top-[calc(100%+0.5rem)] left-0 z-10 block w-[min(20rem,74vw)] border border-rule-strong bg-raised p-3 text-small leading-normal"
      >
        <span className="label block">
          Glossary{attribution ? ` / ${attribution}` : ''}
        </span>
        <span className="mt-1.5 block">{definition}</span>
        <Link
          href={`/glossary#${slug}`}
          className="label mt-2 block text-accent hover:text-ink"
        >
          Full glossary
        </Link>
      </span>
    </span>
  );
}
