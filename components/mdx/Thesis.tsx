/** One sentence, before any elaboration. Every entry opens with one. */
export function Thesis({
  source,
  children,
}: {
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mt-8 border-y border-rule py-5">
      <blockquote className="border-0 pl-0 font-display text-quote leading-tight text-ink">{children}</blockquote>
      {source ? <figcaption className="label mt-3">{source}</figcaption> : null}
    </figure>
  );
}
