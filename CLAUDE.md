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

## Commits

Real messages, one per meaningful step. Do not batch a whole build into a single commit.
