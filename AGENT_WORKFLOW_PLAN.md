# Agent Workflow Plan - Mechanism-of-control
MODE: CC-LOCAL (cloud sandbox, egress open through the agent proxy) | Date: 2026-09-14 | Commit: 8dc811f
SECTIONS DONE: 0.5, 1, 2, 3, 4, 5   SECTIONS OPEN: 6 (needs approval), 7 (two weeks out)
NEXT: approve Tier 1, then run section 6 in this same environment.

## Current state

129 tracked files, 63 of them MDX content entries. Next.js 16 App Router, TypeScript,
Tailwind 4, static export. Nineteen commits, every one authored by Claude, one human owner.
`scripts/check-content.mjs` is a genuinely good 205-line editorial checker and is the
highest-churn file in the repo. No `.claude/` directory, no hooks, no skills, no subagents,
no CI. CLAUDE.md is 216 lines and is the only agent configuration that exists.

## Biggest constraint

The rules that protect this project are enforced only when a human remembers to type a
command, and the one rule CLAUDE.md promises the build enforces is not implemented at all.

Evidence, both halves:

- `ls .github/workflows/` and `ls .claude/` both return "No such file or directory". Nothing
  runs `check-content.mjs` on push, on edit, or at end of turn. `npm run build` runs it via
  `prebuild`, but an agent can write six MDX files and end the turn without ever building.
- CLAUDE.md, reception rule 1: "Enforce this in the content model. A mechanism MDX file with
  an empty `capabilities` array and no `noCounterPracticeFound: true` flag should fail the
  build." `grep -rn "noCounterPracticeFound\|capabilities"` across the repo returns zero
  hits. There is no `capabilities` field in `lib/types.ts`, no such frontmatter key in any of
  the 63 MDX files, and no check for it. The strongest reception rule in the document is a
  request wearing the costume of a guarantee.

Verification runtime, measured this session on a cold container:

| Command | Needs node_modules | Time | Result |
|---|---|---|---|
| `npm run check` | no | 0.23s | pass, 6 thinkers / 29 figures / 5 domains / 12 milieus / 11 essays / 72 terms / 42 names |
| `npm run typecheck` | yes | 3.7s | pass |
| `npm run build` | yes | 15.1s | pass |

Everything is green and fast. There is simply no single entry point and nothing forces it.

---

## Tier 1 - do now

### T1.1 One verification command with a real exit code

**Artifact** `package.json` scripts, plus `scripts/verify.mjs`

**Why here** Section 2 says verification exists but is split across three commands, and
section 1 found `node_modules` absent on a fresh container. The cloud sandbox starts empty
every session, so any hook calling `tsc` or `next build` fails spuriously on turn one unless
the install is handled. Audit rule 1: the check comes before everything else.

**Content** - add to `package.json` scripts:

```json
"verify": "node scripts/verify.mjs"
```

`scripts/verify.mjs`:

```js
#!/usr/bin/env node
/**
 * One command, one exit code. Runs the content check, the type check and the build.
 *
 * The content check runs first because it needs no dependencies and catches the
 * mistakes that are actually made: an em dash, a maritime word, a term with no
 * glossary entry, a thinker who lost their objections block. It costs a fifth of
 * a second, so there is no reason to run anything else before it.
 *
 * Installs dependencies if they are missing, because a fresh container has none
 * and a hook that fails on turn one gets switched off.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';

function run(label, command) {
  process.stdout.write(`\n[verify] ${label}\n`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch {
    process.stderr.write(`\n[verify] FAILED at: ${label}\n\n`);
    process.exit(1);
  }
}

if (!fs.existsSync('node_modules')) {
  run('installing dependencies (none present)', 'npm ci --no-audit --no-fund');
}

run('content check', 'node scripts/check-content.mjs');
run('typecheck', 'npx tsc --noEmit');
run('build', 'npx next build');

process.stdout.write('\n[verify] all checks passed\n\n');
```

**Proof it worked** `npm run verify` on a container with no `node_modules` exits 0 and prints
all three stages. Introduce an em dash into any file under `content/` and it exits 1 at stage
one in under a second.

### T1.2 Make the house-style rules deterministic

**Artifact** `.claude/settings.json`

**Why here** Audit rule 4: anything that must happen every time goes in a hook, not in
CLAUDE.md. CLAUDE.md currently states nine house-style rules as instructions. Five of them
are already machine-checkable by a script that nothing invokes. A `PostToolUse` hook closes
that gap at a cost of 0.23 seconds per edit and zero context when it passes.

The Stop hook runs the full verify so an unattended session cannot end red.

**Content**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node scripts/check-content.mjs"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npm run verify"
          }
        ]
      }
    ]
  }
}
```

**Proof it worked** Edit any MDX file to contain an em dash. The hook fires on the write and
reports `em dash. Use a plain hyphen` before the next tool call, instead of the mistake
surviving to the next build. End a turn with a broken glossary reference and the Stop hook
blocks it.

**Caveat to check on first run** `check-content.mjs` exits 1 on any pre-existing failure
anywhere in `content/`, not only in the file just edited. The tree is green today, so this
starts clean. If it turns noisy, scope the matcher rather than deleting the hook.

### T1.3 Reconcile CLAUDE.md with what the build actually does

**Artifact** CLAUDE.md, reception rule 1, and possibly `scripts/check-content.mjs`

**Why here** This is the audit's flagged anti-pattern in its purest form: a rule written in
CLAUDE.md as a build guarantee, which the build does not implement. It is worse than an
un-enforced instruction, because a future session reads "should fail the build", believes
the guarantee holds, and stops checking by hand.

**This one needs a decision, not a patch.** Two honest options:

- **A, build it.** Add `capabilities: string[]` and `noCounterPracticeFound?: boolean` to
  `lib/types.ts`, add the frontmatter to the six thinker entries, add the check. This is
  content design, not a config change, and it changes what ships on six pages.
- **B, strike the claim.** Replace "Enforce this in the content model ... should fail the
  build" with a plain statement of the rule and how it is currently satisfied. The site may
  already satisfy pairing structurally through `/tools` and `/counter-tradition` rather than
  per-file, in which case the sentence describes a design that was considered and not built.

**Recommendation: B first, then A if the structural answer does not hold.** A document that
describes the repository accurately is worth more today than a schema change made without
looking at whether the six thinker pages need it. Do not leave it as it is.

**Proof it worked** `grep -n "should fail the build" CLAUDE.md` returns either nothing, or a
line pointing at a check that exists.

### T1.4 The one skill

**Artifact** `.claude/skills/content-entry/SKILL.md`

**Why here** Audit rule 5, automate what has been done 3 or more times. Commit subjects are
all unique across 19 commits, so the commit-message trigger does not fire. The file-level one
does: 63 MDX entries exist, `scripts/new-entry.mjs` was already written to codify the
scaffold, and `check-content.mjs` has been amended 6 times, more than any other file in the
repo. That churn is the correction loop showing up in git. The scaffold is automated; the
things that break afterwards are not written down anywhere.

Audit rule 6: this goes in a skill, not CLAUDE.md, because it is needed only when adding an
entry and CLAUDE.md is already at 216 lines.

**Content**

```markdown
---
name: content-entry
description: Add or edit a content entry in /content. Use when creating a thinker, figure, domain, milieu or essay entry, or when the content check fails.
---

# Adding a content entry

Scaffold first, never by hand:

    npm run new -- <thinker|figure|domain|milieu|essay> <slug> "<Title>"

That writes the MDX with correct frontmatter, creates the route for an essay, adds the route
to the resolvable set in `scripts/check-content.mjs`, and bumps `EXPECTED`. It never
overwrites.

Then write the entry from INVISIBLE_CONTROL.md in plain language. The document is source
material, not copy.

Verify with `npm run check` before anything else. It takes a fifth of a second and needs no
dependencies.

## Gotchas

These are the failures `scripts/check-content.mjs` exists to catch, in the order they
actually happen.

- **`EXPECTED` counts.** The check hard-codes `{ thinker: 6, figure: 29, domain: 5,
  milieu: 12, essay: 11 }`. Adding an entry by hand rather than through `npm run new` fails
  the build with "expected N found N+1". Deleting one fails the same way.
- **Em dashes.** Banned everywhere, content and code comments alike. The check scans
  `content/` only, so a dash in `components/` or `app/` currently ships. Do not add one.
- **Maritime words.** `navigat`, `steer`, `anchor`, `harbour`, `voyage`, `on board`,
  `set sail`, `charting`, `the waters`. `anchor` in the HTML sense trips it too; write "one
  link target per term", not "one anchor per term".
- **`<Term id="...">` with no glossary entry.** Every term must exist in
  `content/glossary.ts`. That file is the single source of truth. Never write a definition
  inline.
- **Thinker and figure entries need `<Objections>`.** No exceptions, never collapsed.
- **Milieu entries need `<MetaStrip />` and a `funder:` value.** Write `UNKNOWN` rather than
  leaving it blank. Blank fails the build.
- **`href` in `content/roster.ts` and `content/works.ts` must resolve.** A new essay needs
  its route added to the `routes` set in the check.
- **Names.** Anyone bolded in INVISIBLE_CONTROL.md must appear somewhere on the site. The
  check greps the whole corpus for the surname. This rule exists because the site failed it
  once: 140 people were inside the prose with no way to reach any of them.
- **Banned phrases.** "it is important to note", "it is worth noting", "they don't want you
  to know", "dark psychology". A page may name one in order to retire it, and the check
  allows that only if the page also contains the string "is not used".

## Never soften these two

`content/thinkers/schmitt.mdx` - the `<Framing>` block must state Nazi party membership and
his role as the regime's legal apologist, in the opening, before any of his ideas. Checked
by name.

`content/thinkers/agamben.mdx` - the COVID `<WorkedExample>` must stay featured. Checked by
name.
```

**Proof it worked** Add one figure entry using the skill. Record every check failure that
still occurs, then patch them into `## Gotchas`. That is section 6 step 4 and it is the step
most likely to be skipped.

---

## Tier 2 - after Tier 1 has been used a week

### T2.1 A subagent that reads the research document so the main session does not

**Artifact** `.claude/agents/source.md`, tools `Read, Grep, Glob`

**Trigger** Audit table, "exploration eats context". File count is 129, well under the 1k
threshold, so the first clause does not fire. The second does: `INVISIBLE_CONTROL.md` is
101KB, roughly 27k tokens, and every content task needs some of it. Reading it whole spends a
sixth of a 200k window before any writing starts.

**Condition to check first** Whether sessions are in fact reading it whole. If content work
has been running off targeted greps, this is not needed and the file should not be created.

### T2.2 CI running `npm run verify` on push

**Artifact** `.github/workflows/verify.yml`

**Why not Tier 1** The Stop hook from T1.2 already blocks a red turn locally, and this is a
solo repository with no pull request flow yet. CI earns its place the moment a second
contributor or a PR-based workflow appears. 19 seconds of runtime makes it cheap when it does.

### T2.3 Widen the house-style check past `content/`

**Artifact** `scripts/check-content.mjs`

**Condition, stated because the audit requires it: there is no observed failure.** A sweep of
every tracked file outside `content/` found zero live violations. The only em dash outside
`content/` is the search pattern in the checker itself. Audit rule 5 says codify observed
repetition, not imagined workflows, so this stays in Tier 2 until something actually slips
into `app/` or `components/`. The cost when it comes is about six lines.

---

## Tier 3 - conditional, with the condition stated

### T3.1 Fan-out over independent entry edits

**Condition** A batch of 10 or more genuinely independent MDX edits arrives at once. The one
foreseeable trigger is `RESEARCH_BRIEF.md` results landing, which by design come back "in a
fixed shape that pastes into the repository".

**Do not run it before then, and not even then without care.** Adding entries is not
independent work in this repo: every new entry mutates `scripts/check-content.mjs`
(`EXPECTED`, `routes`), and often `content/roster.ts`, `content/works.ts` and
`content/glossary.ts`. Four shared mutable files, three of which every worker would touch.
Fan-out applies only to *editing prose inside existing entries*, where the file set is
disjoint. Splitting entry *creation* across agents is the audit's "multi-agent setup where
the subtasks edit the same files" and will produce merge damage.

### T3.2 Adversarial review subagent

**Condition** The site becomes publicly readable. Vercel Authentication is currently on, so
failure is reversible today and an extra review pass is not worth its tokens. When the
material is public, the two high-risk pages and the contested-source flags are worth a
dedicated reviewer reading the diff against CLAUDE.md.

---

## Rejected

| Mechanism | Why rejected |
|---|---|
| Multi-agent team or swarm for content | Entry creation writes to four shared files: `scripts/check-content.mjs`, `content/roster.ts`, `content/works.ts`, `content/glossary.ts`. Subagents cannot see each other's decisions, so the `EXPECTED` counts and the route set would collide. Audit rule 3 and the named anti-pattern. |
| Graph or pipeline orchestration | The work is one writer against one editorial standard. There is no branching decision worth a router, and roughly 15x the tokens buys nothing. |
| Plugin packaging | One human, one repository, 19 commits by one agent identity. Packaging exists to distribute a setup across contributors. Revisit if a second person joins. |
| An MCP server duplicating a CLI | Correctly rejected in general, and not applicable here: `gh` is not installed in this environment, so the GitHub MCP tools are the only route rather than a duplicate. No other external system exists. No `.env.example`, no database, no API keys. |
| Code-intelligence plugin | The typed-language trigger fires, but the whole TypeScript surface is 2,865 lines across 47 files. `grep` is cheaper than an index at this size. |
| Analytics on the site | Forbidden by CLAUDE.md reception rule 6, and correctly so. A site optimizing for time on page is running the mechanism it documents. |
| More rules added to CLAUDE.md | It is 216 lines, over the audit's ~200 threshold. Almost all of it is non-derivable editorial judgment that earns its place, so no rewrite is proposed, but nothing new goes in it. New knowledge goes to `.claude/skills/`. The one extraction worth making later is the 12-line design-constraints block, which matters only when editing `components/` and `app/`. |

---

## Reading

Five items, all verified as returning 200 this session.

- **Claude Code best practices** - https://code.claude.com/docs/en/best-practices
  Sets the baseline for T1.2 and T1.4: what belongs in CLAUDE.md versus a skill, which is the
  live question for a 216-line file.
- **Extend Claude Code, features overview** - https://code.claude.com/docs/en/features-overview
  The mechanism-per-goal map. Read before creating anything under `.claude/`, so T2.1 is not
  built as a skill or T1.2 as an instruction.
- **Hooks guide** - https://code.claude.com/docs/en/hooks-guide
  Exact syntax and the `PostToolUse` matcher semantics for T1.2. The matcher scoping question
  in the T1.2 caveat is answered here.
- **Effective context engineering for AI agents** - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  The justification test for T2.1. A 101KB source document read whole is the largest single
  context cost in this repository.
- **When to use multi-agent systems and when not to** - https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them
  Read to confirm the rejection above rather than to reverse it. The shared-mutable-file
  argument against fan-out is the case this covers directly.

---

## Appendix: raw inventory

Commit `8dc811f`, branch `claude/eloquent-mayer-boe27w`, 2026-09-14.

```
$ git ls-files | wc -l
129

$ git ls-files | sed 's|/[^/]*$||' | sort | uniq -c | sort -rn | head -12
     29 content/figures
     12 content/milieus
     11 content/essays
      9 components/mdx
      9 components
      6 content/thinkers
      5 content/domains
      3 scripts
      3 lib
      3 content
      3 app
      1 tsconfig.json

$ git ls-files | awk -F. '{print $NF}' | sort | uniq -c | sort -rn | head
     63 mdx
     42 tsx
      6 md
      5 ts
      5 mjs
      3 txt
      3 json
      1 gitignore
      1 css

$ ls -la .claude/ CLAUDE.md AGENTS.md .github/workflows/
ls: cannot access '.claude/': No such file or directory
ls: cannot access 'AGENTS.md': No such file or directory
ls: cannot access '.github/workflows/': No such file or directory
-rw-r--r-- 1 root root 10135 Sep 14 11:25 CLAUDE.md

$ find . -name "SKILL.md" -not -path ./node_modules/*
(no output)

$ cat .claude/settings.json
cat: .claude/settings.json: No such file or directory

$ grep -A9 '"scripts"' package.json
  "scripts": {
    "dev": "next dev",
    "prebuild": "node scripts/check-content.mjs",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "check": "node scripts/check-content.mjs",
    "new": "node scripts/new-entry.mjs"
  },

$ ls Makefile justfile Taskfile.yml pyproject.toml tox.ini
(none exist)

$ git ls-files | grep -Ei '(test|spec)' | wc -l
1
  -> components/mdx/Contested.tsx, a false positive on the substring "test".
     There are zero test files.

$ git log --format='%s' -300 | cut -c1-30 | sort | uniq -c | sort -rn | head
      1 Write the remaining five think
      1 Write the five domains and the
      1 Write the Schmitt entry
      1 Scaffold Next.js App Router wi
      1 Render the Schmitt page end to
      1 Rename the working branch to m
      1 Make the depth of the material
      1 Give comparison tables their o
      1 Fix bulleted lists shattering
      1 Expand the domains and wire th
  -> 19 commits, every subject unique. No commit-level repetition.

$ git log --format='%an' -300 | sort | uniq -c
     19 Claude

$ git log --format=format: --name-only -200 | grep . | sort | uniq -c | sort -rn | head -14
      6 scripts/check-content.mjs
      6 components/SiteFooter.tsx
      5 package.json
      5 app/page.tsx
      4 app/globals.css
      4 PROJECT_STATE.txt
      3 package-lock.json
      3 lib/types.ts
      3 lib/mdx.tsx
      3 lib/content.ts
      3 content/thinkers/schmitt.mdx
      3 content/thinkers/bourdieu.mdx
      3 content/essays/method.mdx
      3 content/domains/psychology.mdx

$ cat .env.example
cat: .env.example: No such file or directory
  -> no external systems requiring credentials

$ grep -rn "noCounterPracticeFound\|capabilities" --include=*.ts --include=*.tsx --include=*.mjs --include=*.mdx .
(no output)
  -> CLAUDE.md reception rule 1 is not implemented anywhere

$ node -v && npm -v
v22.22.2
10.9.7

$ ls node_modules
node_modules ABSENT   (at session start, on a fresh container)

$ time npm run check
content check passed: 6 thinkers, 29 figures, 5 domains, 12 milieus, 11 essays,
72 glossary terms, 42 named figures all present
real  0m0.226s

$ npm ci --no-audit --no-fund
added 202 packages in 17s

$ time npm run typecheck
real  0m3.739s        (pass, no output)

$ time npm run build
real  0m15.134s       (pass, static export, all routes prerendered)
```

### Section 2 classification

| Signal | Value | Evidence |
|---|---|---|
| Project kind | content | 63 of 129 tracked files are MDX under `content/`; README line 1, "A static site on how power sustains itself without appearing as power" |
| Verification available | custom content check plus typecheck, **no tests, no CI** | `package.json` scripts; zero test files; `ls .github/workflows/` fails |
| Verification runtime | <2min, all three stages 19.1s total | measured above on a cold container |
| File count | 100-1k (129) | `git ls-files \| wc -l` |
| Type system | typed | `tsconfig.json`, 42 `.tsx` + 5 `.ts`, `tsc --noEmit` passes clean |
| Task shape | many small independent edits, over a few shared files | 63 one-file entries, but every addition mutates `check-content.mjs`, `roster.ts`, `works.ts`, `glossary.ts` |
| Repetition | none at commit level; heavy at file level | 19 unique subjects; 63 entries through one scaffold; `check-content.mjs` amended 6 times, top of churn |
| External systems | Vercel deploy only | no `.env.example`, no database, no API routes (`next.config.mjs` static export) |
| Team size | solo | 19 of 19 commits authored "Claude", one human owner |
| Failure cost | reversible | static export, Vercel Authentication still on, "the site is not publicly readable yet" (PROJECT_STATE.txt) |
| Existing agent config | CLAUDE.md only, 216 lines | no `.claude/`, no `SKILL.md`, no hooks, no subagents, no plugins |
