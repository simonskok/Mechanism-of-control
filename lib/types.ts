export type EntryType = 'thinker' | 'domain' | 'milieu' | 'essay';

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
  /** Essays only. The small label above the title. */
  eyebrow?: string;
  /** Glossary terms this entry introduces, for the rail and for checking coverage. */
  terms?: string[];
}

export interface Entry {
  frontmatter: Frontmatter;
  body: string;
  filePath: string;
}
