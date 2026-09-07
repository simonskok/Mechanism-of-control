/** The strongest objections to the entry. Never collapsed, never hidden, and
    deliberately without a prop that could make it either. */
export function Objections({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-11 border-t-2 border-ink pt-4">
      <h2 className="label">Serious objections</h2>
      <div className="prose mt-4">{children}</div>
    </section>
  );
}
