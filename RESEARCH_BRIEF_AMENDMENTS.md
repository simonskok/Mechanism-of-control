# Research brief amendments

Attach to the existing brief. Adds one track, amends three, and records one gap.

The reason for these amendments is in Part Nine of the research document. In short: all six
existing tracks acquire mechanism, every one of them increases the threat side of the ledger,
and none acquires capability. Executed well, the brief as written produces a better reference
and a worse instrument, because completeness along the mechanism dimension is exactly what
Jost's work predicts will increase system defense in the reader. The correction is a track, not
a tone.

---

## Gap: Track A is missing from the copy I was given

The brief I read begins mid-sentence inside Track B. Track A is referenced twice, as the source
of the `Case` shape and as the producer of the mechanism slugs that Track B links to, but its
specification is not present.

I have written these amendments assuming Track A covers documented manifestations of control
mechanisms, returning a `Case`, and that its slugs are the join key for everything else. If that
is wrong, Track G's `mechanism` field and the pairing rule below need adjusting. Send Track A
and I will correct it rather than guess further.

---

## Track G. Counter-practice

**New track. Run it in parallel with Track A, not after.**

**The question.** For each mechanism the site documents, has anyone refused it, limited it,
evaded it, litigated it, regulated it, or reversed it? Who, when, what did it cost them, and
what actually changed?

This is not an inspiration track. It is the same evidentiary standard applied to the other side
of the ledger. An entry with no cost attached and no outcome stated is propaganda, and it will
be detected by readers who have absorbed the rest of the site.

**Why it is first-class rather than a field on something else.** Three reasons. It has to render
in the same view as the mechanism it pairs with, which requires it to be a joinable object. It
has its own evidentiary problems, since success is over-reported and reversal is under-reported.
And its absence for a given mechanism is itself a publishable finding.

**Scope.** Include the failures. A capability that was won and then reversed is more useful than
one that is still holding, because it shows the mechanism of reversal. Include the small and
mundane, since Scott's infrapolitics is the argument that disguised everyday resistance is the
normal case and open confrontation is the exception. Do not restrict this to litigation and
legislation, which are the most visible and least representative forms.

**What a good answer looks like.** A named regulator, a docket number, the year, the specific
practice that stopped, the number of people it covered, what the challengers spent and lost, and
whether it held. Or: a named workforce, the tool they refused, what the employer did in response,
and what the arrangement looks like now.

**What a bad answer looks like.** "Activists have raised concerns." "Awareness is growing."
"Several countries have considered legislation." No named actor, no cost, no outcome.

**Return this shape.**

```ts
interface Capability {
  slug: string;
  mechanism: string;             // REQUIRED. The Track A slug this pairs with.
  kind: 'refusal' | 'legal challenge' | 'regulatory limit' | 'collective action'
      | 'technical evasion' | 'institutional redesign' | 'exit' | 'disclosure';
  who: string;                   // the specific people or body, never "activists"
  years: string;
  whatTheyDid: string;           // three sentences
  outcome: string;               // what actually changed, with the source
  cost: string;                  // REQUIRED. Money, jobs, years, prosecutions.
                                 // An entry without this is not publishable.
  durability: 'holding' | 'partially reversed' | 'reversed since' | 'expanded' | 'unknown';
  replicability: string;         // what conditions it needed, and who else could do it
  scale: string;                 // how many people it covered, with the source
  sources: Source[];
}
```

**Coverage rule, and it is the point of the track.** Every Track A mechanism needs at least one
Capability entry or an explicit null. Where you find nothing, return:

```ts
{ mechanism: '<slug>', status: 'no documented counter-practice found',
  whereYouLooked: '<one line>' }
```

Those nulls get published as open questions on the site rather than hidden. An honest gap is
usable. An invented remedy is not.

**Volume.** Aim for one to three per Track A mechanism. Weight toward `durability: 'reversed
since'` and `'partially reversed'` rather than away from them, since those are the entries
that carry information about how reversal works and they are the ones a normal research pass
will systematically miss.

---

## Amendment to Track B: exposure

Two changes.

**B1. Ranking by scale alone is a design error.** Scale is the dimension along which a mechanism
looks unstoppable, and ranking by it maximizes the inescapability signal. Keep `rank` and
`rankCriterion`, and add a second required ordering.

```ts
  contestedness: 'never challenged' | 'challenged and lost' | 'challenged and limited'
               | 'actively litigated' | 'partially reversed';
  whereItWasStopped: string;     // a jurisdiction, an employer, a sector, or NONE FOUND
```

`whereItWasStopped: 'NONE FOUND'` is a legitimate and useful answer. It is also the most
important single field in the track, because it is what converts an exposure from a fact about
the reader's powerlessness into a fact about a contingent arrangement.

**B2. The `recourse` field is doing too much.** As specified it asks what a person can do and
what it costs them, which collapses individual remedy and collective capability into one string.
Split it.

```ts
  individualRecourse: string;    // what one person can do, and the realistic outcome
  collectiveRecourse: string;    // what has worked when done by many, with a Track G slug
```

Individual recourse in this domain is usually weak, and saying so plainly is more credible than
inflating it. The collective field is where the real answer lives and it should link to Track G
rather than restate it.

---

## Amendment to Track E: current systems

**Elevate `trajectory`.** In the brief it is a fourth field appended to a `Case`. It is the most
load-bearing field in the track, because `'contested'` and `'being rolled back'` are the only
places in the entire brief where the reader learns that any of this is reversible.

Two changes:

1. Make `trajectory` required, and require the evidence for it in a sibling field:
   ```ts
     trajectory: 'expanding' | 'contested' | 'being rolled back' | 'unclear';
     trajectoryEvidence: string;   // what specifically indicates this, with the source
   ```
2. **Quota.** A first pass that returns fifteen systems all marked `'expanding'` is more likely
   to reflect search bias than the state of the world, since expansion generates press and
   rollback generates only a filing. Deliberately search for rollback: rescinded contracts,
   sunset clauses that actually fired, procurement cancellations, moratoria that held,
   regulators that blocked a deployment. If after genuine effort the answer really is that
   almost everything is expanding, say so explicitly, because that is then a finding rather
   than an artifact.

---

## Amendment to Track F: verification queue

Add one item, because it now applies to the site's own new material.

**F4. The reception psychology in Part Nine.** That part cites self-affirmation, system
justification, the Extended Parallel Process Model, inoculation, pluralistic ignorance, and the
2016 Maier and Seligman reformulation of learned helplessness. Several of these sit in or near
the replication crisis and the part says so, but it says so from memory rather than from
checking.

For each: current replication status, effect size where one is meaningful, the main critics, and
whether the transfer from its original domain to structural political information has ever been
tested. The Extended Parallel Process Model is the one most likely to be weaker than stated,
since it comes from health communication.

Return the existing `Verdict` shape. If a finding comes back as `'weaker than stated'` or
`'refuted'`, the corresponding design rule in section 9.8 changes, so route these results to the
build rather than only to the content.

---

## Amended suggested order

1. **Track A**, manifestations. Unchanged. It changes the site most.
2. **Track G**, counter-practice. Moved up and run in parallel with A. Every A entry that ships
   without a G entry or an explicit null is a page that produces the defensive reading.
3. **Track B**, exposure, with the contestedness fields. It is what makes the material matter to
   a reader under forty, and the amendments are what stop it landing as futility.
4. **Track D**, channels. The project's method turned on its subject.
5. **Track C**, positions. Slower, improves 146 entries at once.
6. **Track E**, current systems, with the rollback quota.
7. **Track F**, verification, including F4.

---

## One addition to "How to return results"

The existing instruction that absence is a finding is good and should be extended explicitly to
Track G. Add:

> For Track G, a null is a first-class result and is published on the site as an open question.
> Do not fill a gap with a weak entry to satisfy the coverage rule. A mechanism with no
> documented counter-practice is a more useful thing to publish than a mechanism paired with
> somebody's press release.
