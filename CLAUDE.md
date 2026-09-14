# CLAUDE.md

Standing instructions for this repository. These apply to every session, not only the
first. Read INVISIBLE_CONTROL.md before working on content.

## What this project is

A static site built from INVISIBLE_CONTROL.md, a research document on invisible forms of
government and control. Six core thinkers, five domains, twelve institutional milieus, and
an East and West comparison. Audience is readers aged roughly 18 to 40 with no background
in social theory.

The research document is source material. It is not copy. Every page is rewritten from it
in plain language. Do not paste sections of it into the site.

## House style, not optional

- Plain hyphens. No em dashes anywhere, in content or in code comments.
- No shipping or maritime metaphors. No navigating, charting, steering, anchoring,
  harbours, voyages, waters, or being on board.
- Warm plain language. Short sentences. No filler, no throat-clearing.
- Never write "it is important to note", "it is worth noting", or similar.
- Never write "they don't want you to know" or any variant of that register.

## Editorial standard

The project has two failure modes and the site exists to resist both.

Failure mode A, the sanctioned critique: analysis that never threatens the institutions
funding it. Failure mode B, conspiratorial monism: an all-explaining framework applied to
everything.

Rules that follow:

1. Every claim traceable to a source that can be checked.
2. Every thinker page includes the strongest objections to that thinker, never collapsed
   or hidden.
3. Distinguish structural tendency (incentives produce an outcome) from conscious
   conspiracy (people met and agreed). The first is usually true and more interesting.
4. Distinguish what a source established from what it asserted. These are flagged as
   contested or discredited in the research document and must stay flagged on the site:
   Wittfogel, MacLean, Le Bon, Stonor Saunders, Gatto, Milgram, Zimbardo.
5. Say UNKNOWN rather than filling a gap. Never invent a date, an institution, a funder,
   or a quotation. If a claim needs checking, say so in a TODO comment and say what would
   check it.
6. Where a section is North Atlantic by default, say so.
7. Do not flatten the politics. Several figures here are politically ugly. Engage the
   argument rather than avoiding or endorsing it.

## The two pages that carry the most risk

Schmitt: Nazi party membership and his role as the regime's legal apologist appear in the
opening paragraph, before any of his ideas.

Agamben: his COVID interventions appear as a featured worked example of a framework
failing when applied without discipline.

Never soften either in an edit. If a change would remove or bury them, do not make it.

## Milieu before biography

Part Four of the research document is organized by institution rather than by person,
because who paid for the thinking explains more than the thinker's biography. Preserve
that structure. Milieu pages get a metadata strip showing years, location, funder and
institution. Funding is a first-class fact, not a footnote.

Four questions the material puts to every source, and which the site should make visible:
who paid and what did they want, what was the institution's actual job, what crisis was in
the room, and what could not be said there.

## Technical constraints

Next.js App Router, TypeScript, Tailwind, static export. No database, no auth, no API
routes. Must deploy on a free Vercel project.

Content lives in /content as MDX, one file per entry, read at build time. Frontmatter:
title, slug, type (thinker | domain | milieu | essay), thesis, order.

The glossary is the single source of truth for term definitions. Term tooltips read from
it. Never duplicate a definition inline.

## Design constraints

Editorial and typographic, not dashboard, not startup. Measure around 65 characters,
generous line height, real type pairing, restrained palette, high contrast, dark mode.

No stock imagery, no icons standing in for ideas, no gradient hero.

Forbidden visual conventions, and this is the constraint most likely to be violated by
accident: no red string, no redaction bars, no surveillance-camera motifs, no all-seeing
eye, no glitch effects, no matrix rain. The visual argument is that this is scholarship,
not exposure.

Responsive to 360px.

## Reception rules

The site documents mechanisms of control. A site that only documents mechanisms produces
readers who defend those mechanisms, because perceived inescapability increases system
justification. These rules exist to prevent that and they override convenience.

### 1. Pairing, enforced in the schema

No mechanism entry ships without a linked capability entry in the same view. Not on a
separate page. Same view.

A mechanism with no linked capability must render an explicit block stating that no
documented counter-practice was found, linking to the open questions page. It must not
render silently as a mechanism alone, and it must not be filled with a weak or
inspirational substitute.

Enforced in the content model. A thinker entry must carry either a non-empty `capabilities`
array whose every path resolves, or `noCounterPracticeFound: true`. One or the other, never
neither and never both, or the build fails.

Currently unmet, and recorded in the build rather than hidden. The six thinker entries that
predate this rule are listed in `UNPAIRED` in `scripts/check-content.mjs`. None of them links
to a counter-practice in its own view, and `/counter-tradition` and `/tools` do not satisfy
the rule, because the rule says same view and those are separate pages. Any new thinker entry
fails the build without a pairing. That list is debt. It must only ever shrink, and removing
a name from it means putting a real pairing on that page, not deleting the check.

### 2. Relief before threat

The first-encounter path is ordered: Mills, then Han or Deleuze, then Illich, before
Bourdieu, Gramsci or Foucault.

Reason: Illich, Deleuze, Han, Goffman and Graeber explain something the reader already
feels and currently blames themselves for, so they land as confirmation and build credit.
Bourdieu attacks self-worth directly, Gramsci attacks the belief that your opinions are
your own, Foucault attacks the belief that your self is your own. A reader whose first
encounter is Bourdieu on meritocracy has no reason to extend credit.

Do not reorder the home page or the entry path to lead with the strongest material.

### 3. No concluding for the reader

Present the mechanism and stop. No call to action, no "therefore", no "what you can do
about it" framing. Being told what to conclude produces the opposite conclusion, and the
material genuinely does not license one politics.

### 4. Scale is always paired with variance

Wherever a page states how large or widespread a mechanism is, it states in the same view
where it has been limited, contested, refused or reversed, or states that nothing was
found.

Scale alone signals inescapability. Scale plus variance signals a contingent arrangement,
which is what it is. Never render a scale figure on its own.

### 5. Skill surfaces, not only descriptions

The four questions from the method section and Lifton's eight criteria exist as tools a
reader can run, not only as things the site describes. Any other portable technique in the
material gets the same treatment.

Teaching a technique converts the reader from someone who has been told a bad thing into
someone who has acquired a skill, which is the most reliable agency-producer available and
is cheap to build.

### 6. Reflexivity is a pattern, not one page

Every framework on the site gets applied to the site at least once, and those applications
are published. The Agamben COVID case does this once already.

Available immediately: Lazarsfeld's administrative and critical distinction applied to the
site's own funding. The Congress for Cultural Freedom logic applied to whoever pays for it.
Michels applied to its own organizational form. Goodhart applied to its own metrics.

Do not add analytics that optimize for time on page or scroll depth. A site optimizing for
engagement is running the mechanism it documents, and the reflexivity pages would have to
say so.

### 7. Absence is published

Where no capability is documented for a mechanism, state it. This extends the existing
UNKNOWN rule to the constructive side. An honest gap is usable. An invented remedy is
propaganda and readers who have absorbed the rest of the site will detect it.

### 8. Disclose the arrangement

The sequencing in rule 2 is itself choice architecture, which is a thing this site
criticizes. Publish the sequencing logic and the pairing rule on the method page rather
than operating them invisibly, and let a reader who wants Bourdieu first get Bourdieu
first. Ordering is a default, never a gate.

## The failure mode to design against

Not despair. Superiority.

This material readily produces readers who feel they have seen through everything and hold
a status position over people who have not. That is the on-ramp to the conspiratorial
register already ruled out, and it is self-defeating, since a reader who has converted the
material into a status marker has stopped using it.

Copy should never flatter the reader for having read it. No "now you know", no "most people
never see this", no framing that positions the reader against a general public.

## What connection means here

Do not build a forum. Discussion attached to this material selects for the superiority
failure mode and for the conspiratorial register, because those are the positions that win
attention in an unmoderated thread about hidden power.

Three things do the work instead: evidence that a concern is widely shared, which corrects
the pluralistic ignorance that makes readers think their exhaustion is personal; shared
skill rather than shared belief, which transfers between people without requiring
agreement; and named, costed, documented instances of people doing something, including
the attempts that failed.

## Status of the psychology behind these rules

Contested, and partly inside the replication crisis. Self-affirmation effects are smaller
and more moderated than early work claimed. The compensatory version of system
justification is argued over. The Extended Parallel Process Model comes from health
communication and its transfer to structural political information is an assumption.

Treat these rules as design heuristics with evidence behind them, not as established fact,
and say so on the method page. If verification returns any of them as weaker than stated,
the corresponding rule changes.

## Commits

Real messages, one per meaningful step. Do not batch a whole build into a single commit.
