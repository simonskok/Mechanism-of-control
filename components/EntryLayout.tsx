import type { RailField } from './EntryRail';
import { EntryRail } from './EntryRail';

/** The page shell shared by thinkers, domains and milieus. One column of
    argument at a 65 character measure, one rail of apparatus. */
export function EntryLayout({
  eyebrow,
  title,
  lede,
  fields,
  children,
}: {
  eyebrow: string;
  title: string;
  /** The single-sentence thesis, shown before any elaboration. Thinker entries
      state their own thesis in the body, after the framing block where there is
      one, so they do not pass this. */
  lede?: string;
  fields: RailField[];
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[10.5rem_minmax(0,65ch)] lg:gap-x-11 lg:gap-y-7">
        <div className="lg:col-start-2 lg:row-start-1">
          <p className="label text-accent">{eyebrow}</p>
          <h1 className="mt-3 text-h1 leading-[1.1] tracking-tight">{title}</h1>
          {lede ? <p className="measure mt-5 text-lede leading-snug">{lede}</p> : null}
        </div>
        {/* The rail spans both rows on a wide screen, so a long rail never
            pushes the body text down the page. */}
        <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <EntryRail fields={fields} />
        </div>
        <div className="lg:col-start-2 lg:row-start-2">{children}</div>
      </div>
    </main>
  );
}
