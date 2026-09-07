/** The block that has to be read before anything else on a page. Heavy ink
    rule rather than a colour, because this is gravity and not a warning. */
export function Framing({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-7 border-l-2 border-ink pl-5">
      <p className="label">Read this first</p>
      <div className="prose mt-2">{children}</div>
    </aside>
  );
}
