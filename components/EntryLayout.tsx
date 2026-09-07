import type { RailField } from './EntryRail';
import { EntryRail } from './EntryRail';

/** The page shell shared by thinkers, domains and milieus. One column of
    argument at a 65 character measure, one rail of apparatus. */
export function EntryLayout({
  eyebrow,
  title,
  fields,
  children,
}: {
  eyebrow: string;
  title: string;
  fields: RailField[];
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[10.5rem_minmax(0,65ch)] lg:gap-11">
        <div className="lg:order-2">
          <p className="label text-accent">{eyebrow}</p>
          <h1 className="mt-3 text-h1 leading-[1.1] tracking-tight">{title}</h1>
        </div>
        <div className="lg:order-1">
          <EntryRail fields={fields} />
        </div>
        <div className="lg:order-3 lg:col-start-2">{children}</div>
      </div>
    </main>
  );
}
