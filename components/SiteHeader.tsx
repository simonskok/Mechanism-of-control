import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const SECTIONS = [
  { href: '/thinkers', label: 'Thinkers' },
  { href: '/domains', label: 'Domains' },
  { href: '/milieus', label: 'Milieus' },
  { href: '/east-west', label: 'East and West' },
  { href: '/method', label: 'Method' },
  { href: '/reading', label: 'Reading' },
  { href: '/glossary', label: 'Glossary' },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-[1rem] tracking-tight hover:text-accent">
          Invisible Control
        </Link>
        <nav className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {SECTIONS.map((section) => (
            <Link key={section.href} href={section.href} className="label hover:text-ink">
              {section.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
