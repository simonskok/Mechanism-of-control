# Invisible Forms of Government and Control

A static site on how power sustains itself without appearing as power.

Six core thinkers (Bourdieu, Gramsci, Schmitt, Foucault, Illich, Agamben), five domains of
control (education, media, law, psychology, bureaucracy), twelve institutional milieus from
the Macy Conferences to the Mont Pelerin Society, and a comparison of Eastern and Western
regimes of control.

Written for readers with no background in social theory. Every thinker is presented with
the strongest objections to their work, and contested sources are marked as contested.

## Repository

- `INVISIBLE_CONTROL.md` is the research document and the source of all content. It is
  source material, not copy. Every page is rewritten from it in plain language.
- `CLAUDE.md` holds the standing editorial and technical rules.
- `content/` holds one MDX file per entry, plus `glossary.ts`, which is the single source of
  truth for every term definition on the site.
- `scripts/check-content.mjs` enforces the editorial rules at build time.

## Running it

```
npm install
npm run dev      # http://localhost:3000
npm run build    # runs the content check, then a static export to out/
npm run check    # the content check on its own
```

`npm run build` fails if a term is used without a glossary entry, if a thinker page loses its
objections, if a milieu has no funder recorded, if house style is broken, or if the Schmitt
framing or the Agamben COVID example goes missing.

`node scripts/shot.mjs /thinkers/schmitt/ dark` screenshots a built page at 360px and 1280px
and reports any element wider than the viewport. Serve `out/` first.

Next.js App Router, TypeScript, Tailwind, static export, deployed on Vercel.
