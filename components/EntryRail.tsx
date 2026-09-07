import Link from 'next/link';
import type { CrossRef } from '@/lib/content';

export interface RailField {
  label: string;
  value?: string;
  links?: CrossRef[];
}

/** The apparatus rail. Sticky beside the text on a wide screen, a two column
    key above it on a phone. */
export function EntryRail({ fields }: { fields: RailField[] }) {
  const present = fields.filter((field) => field.value || (field.links && field.links.length));
  if (present.length === 0) return null;

  return (
    <aside className="border-t-2 border-ink pt-3 lg:sticky lg:top-6">
      <dl className="grid grid-cols-2 gap-x-5 gap-y-3.5 lg:grid-cols-1">
        {present.map((field) => (
          <div key={field.label}>
            <dt className="label">{field.label}</dt>
            <dd className="mt-1 text-small leading-snug">
              {field.links && field.links.length ? (
                <span className="flex flex-col gap-0.5">
                  {field.links.map((link) => (
                    <Link
                      key={link.slug}
                      href={link.href}
                      className="underline decoration-rule-strong underline-offset-[3px] hover:decoration-accent"
                    >
                      {link.title}
                    </Link>
                  ))}
                </span>
              ) : (
                field.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
