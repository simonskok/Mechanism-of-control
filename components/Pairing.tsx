import Link from 'next/link';
import type { Capability } from '@/lib/types';

/**
 * Reception rule 1, rendered. A mechanism does not ship without its counter-practice
 * in the same view, and where none is documented the page says so rather than going
 * quiet or reaching for an inspirational substitute.
 *
 * Rule 3 constrains the wording as much as rule 1 constrains the presence. This block
 * points at what is documented and stops. It does not tell the reader what to conclude,
 * what to do, or that they now know something other people do not.
 *
 * Visually it is a hairline rule and mono apparatus, the same register as the metadata
 * strip. Ochre is reserved for contested sources and funder values, so it is not used
 * here: an absence is a fact on the record, not a warning.
 */
export function Pairing({
  capabilities,
  noCounterPracticeFound,
  note,
}: {
  capabilities?: Capability[];
  noCounterPracticeFound?: boolean;
  note?: string;
}) {
  const paired = capabilities ?? [];

  if (paired.length === 0 && !noCounterPracticeFound) return null;

  return (
    <section className="mt-12 border-t border-rule-strong pt-5" aria-label="Counter-practice">
      <h2 className="label">
        {paired.length > 0 ? 'Counter-practice' : 'No counter-practice documented'}
      </h2>

      {paired.length > 0 ? (
        <ul className="measure mt-4 space-y-4">
          {paired.map((capability) => (
            <li key={capability.href}>
              <Link href={capability.href} className="underline decoration-rule underline-offset-4 hover:decoration-accent hover:text-accent">
                {capability.label}
              </Link>
              {capability.note ? (
                <p className="mt-1 text-muted">{capability.note}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="measure mt-4 space-y-3">
          <p>
            {note ??
              'The research document records no counter-practice for this mechanism that can be checked: no policy, no dated instance of it being limited or reversed, and no technique attributed to it with a source.'}
          </p>
          <p className="text-muted">
            The gap is on the record rather than filled. An invented remedy would be the
            easiest thing on this page to write and the first thing a reader would catch.
          </p>
          <p>
            <Link href="/open-questions" className="underline decoration-rule underline-offset-4 hover:decoration-accent hover:text-accent">
              Open questions
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}
