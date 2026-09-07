import type { MilieuMeta } from '@/lib/types';

/** The milieu metadata strip. Funding sits at the top of the page in the same
    face as the dates, not in a footnote at the bottom. Where the document
    records no funder, the field says so rather than guessing. */
export function MetaStrip({ meta }: { meta: MilieuMeta }) {
  const fields = [
    { key: 'Years', value: meta.years, funder: false },
    { key: 'Location', value: meta.location, funder: false },
    { key: 'Funder', value: meta.funder, funder: true },
    { key: 'Institution', value: meta.institution, funder: false },
  ];

  return (
    <dl className="mt-7 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1.5 bg-paper px-3.5 py-3">
          <dt className="label">{field.key}</dt>
          <dd
            className={`text-small leading-snug ${field.funder ? 'text-flag' : 'text-ink'}`}
          >
            {field.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
