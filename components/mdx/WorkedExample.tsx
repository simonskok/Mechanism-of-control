/** A framework tested against a case it does not fit. Featured rather than
    tucked into the objections, because the discipline of asking whether the
    lens fits is the thing being taught. */
export function WorkedExample({
  label = 'Worked example',
  title,
  children,
}: {
  label?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-11 border border-rule-strong">
      <div className="border-b border-rule bg-raised px-4 py-2.5">
        <p className="label">{label}</p>
        <h2 className="mt-1 font-display text-h2 leading-snug">{title}</h2>
      </div>
      <div className="prose px-4 py-5">{children}</div>
    </section>
  );
}
