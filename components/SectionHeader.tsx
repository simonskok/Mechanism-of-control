export function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="measure">
      <p className="label text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-h1 leading-[1.1] tracking-tight">{title}</h1>
      <p className="mt-5 text-lede leading-snug">{children}</p>
    </div>
  );
}
