import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto grid max-w-5xl gap-6 px-5 py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-8">
        <div className="measure">
          <p className="label">How this site is written</p>
          <p className="mt-2 text-small text-muted">
            Every page is rewritten from a research document in plain language. Every thinker
            carries the strongest objections to their work. Contested sources are marked as
            contested. The rules are on the{' '}
            <Link
              href="/method"
              className="text-ink underline decoration-accent decoration-[1.5px] underline-offset-[3px] hover:text-accent"
            >
              method page
            </Link>
            , and they apply to everything here.
          </p>
        </div>
        <nav className="flex flex-col gap-2 sm:text-right">
          <Link href="/method" className="label hover:text-ink">
            Method
          </Link>
          <Link href="/counter-tradition" className="label hover:text-ink">
            Counter-tradition
          </Link>
          <Link href="/reading" className="label hover:text-ink">
            Reading paths
          </Link>
          <Link href="/works" className="label hover:text-ink">
            Works
          </Link>
          <Link href="/open-questions" className="label hover:text-ink">
            Open questions
          </Link>
          <Link href="/provenance" className="label hover:text-ink">
            Provenance
          </Link>
          <Link href="/glossary" className="label hover:text-ink">
            Glossary
          </Link>
        </nav>
      </div>
    </footer>
  );
}
