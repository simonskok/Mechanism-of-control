---
name: content-entry
description: Add or edit a content entry in /content. Use when creating a thinker, figure, domain, milieu or essay entry, when editing an existing one, or when the content check fails and you need to know what the failure means.
---

# Adding a content entry

Scaffold first, never by hand:

    npm run new -- <thinker|figure|domain|milieu|essay> <slug> "<Title>"

That writes the MDX with correct frontmatter, creates the route for an essay, adds the route
to the resolvable set in `scripts/check-content.mjs`, and bumps `EXPECTED`. It never
overwrites an existing file.

Then write the entry from INVISIBLE_CONTROL.md in plain language. The document is source
material, not copy. Do not paste from it.

Verify with `npm run check`. It takes a fifth of a second and needs no dependencies. Run
`npm run verify` before you commit, which adds the typecheck and the build.

## Gotchas

The failures `scripts/check-content.mjs` catches, in roughly the order they happen.

- **`EXPECTED` counts.** The check hard-codes `{ thinker: 6, figure: 29, domain: 5,
  milieu: 12, essay: 11 }`. Adding an entry by hand rather than through `npm run new` fails
  with "expected N found N+1". Deleting one fails the same way.
- **Reception rule 1, pairing.** A thinker entry needs either a non-empty `capabilities`
  array whose every path resolves, or `noCounterPracticeFound: true`. Never neither, never
  both. Six entries predate the rule and sit in `UNPAIRED` in the check. That list only
  shrinks. Pairing a page while leaving it listed also fails.
- **Em dashes.** Banned everywhere, content and code comments alike. The check scans
  `content/` only, so a dash in `components/` or `app/` currently ships. Do not add one.
- **Maritime words.** `navigat`, `steer`, `anchor`, `harbour`, `voyage`, `on board`,
  `set sail`, `charting`, `the waters`. `anchor` in the HTML sense trips it too, so write
  "one link target per term", not "one anchor per term".
- **`<Term id="...">` with no glossary entry.** Add the term to `content/glossary.ts`
  before you use it. Append an object with `slug`, `term`, `definition` and `attribution`
  to the `glossary` array. The slug is what `<Term id="...">` matches, the definition is
  written for a reader with no background in social theory, and `attribution` names the
  thinker the term belongs to. Never write a definition inline in a page.
  *Hit on the first real run of this skill, on the Lifton entry.*
- **The roster and the works index go stale silently.** Adding a figure page leaves
  `content/roster.ts` and `content/works.ts` pointing at whatever page used to mention that
  person, and set `page: true` on the roster entry once they have their own page. Both hrefs
  still resolve, so the old check stayed green while the index sent readers elsewhere.
  *Found on the Lifton entry. There is a check for it now, matched on the whole name,
  because two people can share a surname and only one of them has the page.*
- **Thinker and figure entries need `<Objections>`.** No exceptions, never collapsed.
- **Milieu entries need `<MetaStrip />` and a `funder:` value.** Write `UNKNOWN` rather than
  leaving it blank. Blank fails.
- **`href` in `content/roster.ts` and `content/works.ts` must resolve.** A new essay needs
  its route added to the `routes` set in the check.
- **Names.** Anyone bolded in INVISIBLE_CONTROL.md must appear somewhere on the site. The
  check greps the whole corpus for the surname. This rule exists because the site failed it
  once: 140 people were inside the prose with no way to reach any of them.
- **Banned phrases.** "it is important to note", "it is worth noting", "they don't want you
  to know", "dark psychology". A page may name one in order to retire it, and the check
  allows that only if the page also contains the string "is not used".

## What running this skill actually turned up

Recorded from the first real use of it, adding `content/figures/lifton.mdx`.

1. The check caught the missing glossary term, as documented. The skill said the term must
   exist and did not say how to add one. Fixed above.
2. Nothing caught the stale roster and works links. Verify went fully green while the index
   pointed at the wrong page. Fixed by adding the check.
3. That new check, keyed on surname, immediately misreported Gina Perry as a broken link to
   William Perry's page. Two different people. Rewritten to match on the whole name. A check
   written in a hurry produces false positives, and a false positive trains you to ignore
   the checker.
4. `npm run new` printed a broken list item, `5. -`, and told you to run three commands
   rather than `npm run verify`. Both fixed in `scripts/new-entry.mjs`, and the list now
   names reception rule 1 and the roster step.

## Never soften these two

`content/thinkers/schmitt.mdx` - the `<Framing>` block must state Nazi party membership and
his role as the regime's legal apologist, in the opening, before any of his ideas. Checked
by name.

`content/thinkers/agamben.mdx` - the COVID `<WorkedExample>` must stay featured. Checked by
name.
