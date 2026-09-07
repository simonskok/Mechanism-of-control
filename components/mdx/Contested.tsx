/** Marks a source as disputed and says who disputes it. Ochre appears here and
    on funder values, nowhere else. */
export function Contested({
  status = 'Contested source',
  children,
}: {
  status?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <p className="label inline-block border border-flag px-2 py-1 text-flag">{status}</p>
      <div className="prose mt-3">{children}</div>
    </div>
  );
}
