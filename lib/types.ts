export type EntryType = 'thinker' | 'figure' | 'domain' | 'milieu' | 'essay';

/** One numbered move in a thinker's mechanism, rendered by the stepper. */
export interface MechanismStep {
  heading: string;
  body: string;
}

/** The milieu metadata strip. Funding is a first-class fact, so it is required.
    Use "UNKNOWN" rather than leaving a field out or guessing. */
export interface MilieuMeta {
  years: string;
  location: string;
  funder: string;
  institution: string;
}

/** Reception rule 1. One documented counter-practice, shown beside the mechanism. */
export interface Capability {
  /** A route on this site. Checked at build time. */
  href: string;
  /** What the reader is being sent to, in plain words. */
  label: string;
  /** Optional line on what it actually establishes, and its limits. */
  note?: string;
}

export interface Frontmatter {
  title: string;
  slug: string;
  type: EntryType;
  thesis: string;
  order: number;
  /** Thinkers only. */
  years?: string;
  country?: string;
  mechanism?: MechanismStep[];
  /** Milieus only. */
  meta?: MilieuMeta;
  /** Cross-references, by slug, rendered in the rail. */
  domains?: string[];
  milieus?: string[];
  thinkers?: string[];
  figures?: string[];
  /** Essays only. The small label above the title. */
  eyebrow?: string;
  /** Glossary terms this entry introduces, for the rail and for checking coverage. */
  terms?: string[];
  /** Reception rule 1. The counter-practice this mechanism is paired with,
      rendered in the same view, never on a page of its own. Every href must
      resolve. An entry with no pairing sets noCounterPracticeFound instead and
      says so on the page. One or the other, never neither, never both. */
  capabilities?: Capability[];
  /** Reception rule 1 and rule 7. No documented counter-practice was found, and
      the page says so and links to the open questions. Absence is published. */
  noCounterPracticeFound?: boolean;
  /** What was looked for and not found, in this entry's own terms. Optional.
      The block states a generic absence without it. */
  noCounterPracticeNote?: string;
}

export interface Entry {
  frontmatter: Frontmatter;
  body: string;
  filePath: string;
}
