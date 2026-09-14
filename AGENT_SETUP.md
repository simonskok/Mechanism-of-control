# Agent setup

How the agent tooling in this repository works, how to use it, and how to add to it without
making things worse. There is no separate Claude project. Everything is this repository plus
GitHub, which means every setting here travels with a clone and nothing depends on one
machine or one session.

Written after running `AGENT-WORKFLOW-AUDIT.md`. The reasoning and the evidence are in
`AGENT_WORKFLOW_PLAN.md`. This file is the operating manual.

---

## 1. What exists, and what each piece is for

| File | Loaded | Job |
|---|---|---|
| `CLAUDE.md` | every session, always | The editorial and technical rules. Non-derivable judgment only. |
| `.claude/settings.json` | every session | Hooks. Runs the checks whether or not anyone remembers to. |
| `.claude/skills/content-entry/SKILL.md` | on demand | How to add a content entry and what breaks. |
| `scripts/check-content.mjs` | on demand, and via `prebuild` | The editorial rules, enforced. |
| `scripts/verify.mjs` | on demand, and via the Stop hook | Content check, then typecheck, then build. One exit code. |
| `scripts/hook.mjs` | by the hooks | Translates a failed check into something a hook can report. |
| `scripts/new-entry.mjs` | on demand | Scaffolds an entry so the four fiddly steps are not manual. |

The ordering principle, and it decides where anything new goes:

- Must be known **always** goes in `CLAUDE.md`. It costs context on every single session, so
  the bar is high.
- Must be known **sometimes** goes in a skill. Free until it is needed.
- Must happen **without exception** goes in a hook. An instruction is a request. A hook is a
  guarantee.
- Noisy or parallel reading goes in a subagent, so its output never lands in the main window.

---

## 2. Day to day

    npm run check      the editorial rules, 0.2s, needs no dependencies
    npm run verify     check, typecheck and build, about 10s warm
    npm run new -- <type> <slug> "<Title>"      scaffold an entry

`npm run verify` installs dependencies first if they are missing, so it works on a container
that has just started. Three states, all measured, because the first one looks broken if you
are not expecting it:

| State | Time |
|---|---|
| No `node_modules`, first run on a new container | about 40s, most of it the install |
| `node_modules` present, no `.next` build cache | about 34s |
| Fully warm | 9 to 10s |

Only the third is representative. The first turn of a session pays one of the other two.

The hooks run on their own:

- After every `Write` or `Edit`, the content check runs. If it fails, the whole failure list
  comes back and the session is told to fix it before continuing.
- At the end of every turn, the full verify runs. A session cannot end with a red tree.

If the same failure blocks three times running, the guard in `scripts/hook.mjs` stops
blocking so the turn can end. The failure is still there and still reported. That guard
exists because there is no `stop_hook_active` field to rely on and a Stop hook that blocks
on something the session cannot fix would block forever.

---

## 3. Adding a new skill

Do this when you have done the same multi-step thing three times or more and keep getting the
same part wrong. Not before.

1. Create `.claude/skills/<name>/SKILL.md`.
2. Frontmatter, two fields only:

       ---
       name: <name>
       description: <when to use this, written so the model can match on it>
       ---

   The description is the trigger. Write it as the situation, not as a topic. "Use when
   creating a thinker, figure, domain, milieu or essay entry" beats "about content".
3. Body: the happy path first, in as few steps as possible.
4. A `## Gotchas` section. This is the part that earns the file. List how the thing usually
   breaks, not how it works.
5. **Run it on a real task and write down what it got wrong.** Then patch `## Gotchas` with
   those failures. A skill that has never been used is a guess.
6. Commit it. It is now in the repository and every clone has it.

The `content-entry` skill has a `## What running this skill actually turned up` section
recording the four things its first real use exposed. Copy that habit.

---

## 4. Adding a new hook

Do this when a rule keeps being violated despite being written in `CLAUDE.md`. Moving it from
`CLAUDE.md` to a hook is a promotion, and the `CLAUDE.md` line can usually go.

1. Add it to `.claude/settings.json` under the event you want.
2. `PostToolUse` takes a `matcher` on the tool name, for example `"Write|Edit"`. `Stop` takes
   no matcher and fires every time.
3. **Exit codes are the whole thing.** Exit 0 passes. Exit 1 does not block and shows only the
   first line of stderr. Only **exit 2** blocks and hands your stderr back to the model.
4. Almost no existing script exits 2. `check-content.mjs` exits 1, and its first stderr line
   is blank, so wiring it to a hook directly would report nothing at all. That is why
   `scripts/hook.mjs` exists. Route new checks through it or write the same translation.
5. If a hook can block, give it a release valve. `hook.mjs` stops blocking after three
   identical failures.
6. Test all the paths before committing: passes, fails, fails repeatedly, then passes again.

---

## 5. Adding a subagent

A subagent is for reading, not writing. It gets its own context window, so the noise of a
wide search never reaches the main session. It cannot see what other subagents decided, which
is why it is wrong for interdependent edits.

1. Create `.claude/agents/<name>.md`.
2. Give it read-only tools: `Read, Grep, Glob`. If it needs `Write` or `Edit`, it is probably
   the wrong mechanism.
3. Say what it returns, not how to search. The value is the conclusion, not the transcript.

**The one this repository has a case for and has not built yet:** `INVISIBLE_CONTROL.md` is
101KB, roughly 27k tokens. Any session that reads it whole spends a sixth of its window before
writing a word. A subagent that answers questions against it, and returns the passage rather
than the file, would pay for itself. Build it when you notice a session reading the document
whole. Do not build it if content work has been running off targeted greps, because then it
is a file that costs context and does nothing.

---

## 6. What not to build, and why

Named here so it does not get proposed again.

- **Multiple agents writing content in parallel.** Every new entry writes to
  `scripts/check-content.mjs`, `content/roster.ts`, `content/works.ts` and
  `content/glossary.ts`. Four shared files, and subagents cannot see each other's decisions.
  They will collide on the `EXPECTED` counts and the route set. Fan-out is only safe for
  editing prose inside entries that already exist, where the file set is genuinely disjoint.
- **Graph or pipeline orchestration.** One writer against one editorial standard. There is no
  branching decision worth a router and it costs roughly fifteen times the tokens.
- **Packaging any of this as a plugin.** That exists to distribute a setup across
  contributors. Revisit if a second person starts committing.
- **An MCP server for anything with a CLI.** More context per call for the same result. The
  GitHub MCP tools here are the exception, because `gh` is not installed in this environment.
- **More rules in `CLAUDE.md`.** It is long already. New knowledge goes to a skill.
- **Analytics on the site.** Ruled out by reception rule 6, and correctly. A site optimizing
  for time on page is running the mechanism it documents.

---

## 7. Check in two weeks, or this was decoration

Tier 1 landed on 2026-09-14 with all three numbers below at zero, because nothing had run
against it yet. That is the baseline. Take the same three readings on **2026-09-28**:

- Corrections per task. How often does a session have to be told "no, do X instead".
- Sessions needing a clear because the context filled with noise.
- Tasks finished unattended with verify green.

If corrections per task did not drop, the added files are noise. Delete them and run the audit
again. That is not a figure of speech.

---

## 8. Outstanding

**Six thinker pages fail reception rule 1.** They are listed in `UNPAIRED` in
`scripts/check-content.mjs`. Each needs a real counter-practice in its own view, and
`/counter-tradition` and `/tools` do not satisfy it, because the rule says same view and those
are separate pages. This is editorial work, not configuration: choosing which capability pairs
with which mechanism is a content decision. The list only shrinks, and a name comes off it by
pairing the page rather than by editing the check.

**One TODO in `content/figures/lifton.mdx`**, on the APA citation. It says what would check it.
