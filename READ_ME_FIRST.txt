INVISIBLE CONTROL, PHASE 1
Copy every file here over the same path in the repository. All files are complete, not
patches. Nothing else in the repository needs to change.


-------------------------------------------------------------------------------
THE SHORTEST PATH, if you use Claude Code
-------------------------------------------------------------------------------

Open a Claude Code session on the repository, attach this zip, and paste:

  Unzip the attached archive and copy every file over the same path in this repo.
  They are complete files, not patches. Do not merge by hand.

  Then run, in order:
    npm run check
    npx tsc --noEmit
    npm run build
    node scripts/shot.mjs /tools
    node scripts/shot.mjs /reflexive

  npm run check must report 8 essays. If anything fails, stop and show me the output.
  Do not edit any rule in scripts/check-content.mjs to make a check pass.

  Then update PROJECT_STATE.txt:
    section 2: 60 pages, 8 essays, add /tools and /reflexive to the route list,
               add RECEPTION.md to what exists
    section 3: add "npm run new" to the commands list
    section 5: note the Bourdieu page now opens with a framing block, and why
    section 6: unchanged, the evidence layer gap is not filled by this

  Commit everything in one commit:
    Add tools and reflexive pages, reframe Bourdieu, add RECEPTION.md

  Then push.


-------------------------------------------------------------------------------
WHAT HAPPENS ON PUSH
-------------------------------------------------------------------------------

Vercel is already connected to this repository and builds on every push to the default
branch, main.

It updates the SAME site at the SAME address. It does not create a new site. There is
nothing to set up in Vercel.

npm run check runs as prebuild, on Vercel as well as locally. A rule failure fails the
deployment, so a bad page cannot reach the site even if it was committed.

The site is still behind Vercel Authentication, so only you can see it. Turning that off
is in the Vercel dashboard: Project, Settings, Deployment Protection.


-------------------------------------------------------------------------------
WHAT IS IN HERE
-------------------------------------------------------------------------------

  NEW
    RECEPTION.md                    How this material lands on a reader and what
                                    follows for the build. Companion to
                                    INVISIBLE_CONTROL.md, separate on purpose.
    RESEARCH_BRIEF_AMENDMENTS.md    Adds Track G, counter-practice. Fixes Tracks B, E, F.
    content/essays/tools.mdx        The four questions and Lifton's eight criteria, as
                                    things a reader runs rather than reads.
    content/essays/reflexive.mdx    The site's own frameworks applied to the site.
    app/tools/page.tsx              Route.
    app/reflexive/page.tsx          Route.
    scripts/new-entry.mjs           Scaffolds a new entry in one command. See below.

  EDITED, complete files
    content/thinkers/bourdieu.mdx   Adds a <Framing> block before the thesis. Nothing
                                    else on that page changed.
    scripts/check-content.mjs       EXPECTED.essay 6 to 8, two routes added.
    package.json                    Adds the "new" script.
    components/SiteFooter.tsx       Two nav links.
    CLAUDE.md                       Reception rules merged in before Commits.


-------------------------------------------------------------------------------
ALREADY VERIFIED AGAINST A CHECKOUT OF THIS REPOSITORY
-------------------------------------------------------------------------------

  npm run check      passes. 6 thinkers, 20 figures, 5 domains, 12 milieus, 8 essays,
                     56 glossary terms, 42 named figures all present.
  npx tsc --noEmit   exit code 0.
  npm run build      fails in that sandbox only, on three errors, all of them next/font
                     fetching Newsreader and Source Serif 4 from fonts.googleapis.com,
                     which was not reachable there. No other errors. It will build on
                     Vercel. Confirm that before pushing anything else.

  scripts/new-entry.mjs was tested by scaffolding a throwaway essay and a throwaway
  figure, confirming the check passed at the new count, and confirming the check still
  fails a figure whose objections block is removed. Both test files were deleted and the
  counts restored.


-------------------------------------------------------------------------------
ADDING ANYTHING IN FUTURE, IN ONE COMMAND
-------------------------------------------------------------------------------

  npm run new -- essay evidence "Where this actually happened"
  npm run new -- figure jost "John Jost"
  npm run new -- milieu tavistock "The Tavistock Institute"

That one command creates the MDX file with correct frontmatter and the next order
number, creates the route if it is an essay, adds the route to the resolvable set, and
bumps EXPECTED in the check script. It refuses to overwrite anything.

It exists because those four steps were previously manual, and forgetting the EXPECTED
bump fails the build with a message that looks like a bug and is not.

Then write the entry and run:

  npm run check && npx tsc --noEmit && npm run build


-------------------------------------------------------------------------------
THE WORKING LOOP FROM HERE
-------------------------------------------------------------------------------

  1. Research happens in a chat, never in the repository. A repository session that
     starts searching the web spends its context on things it cannot verify.
  2. That chat returns complete content files, not prose to paste.
  3. Claude Code copies them in, runs check, typecheck, build, screenshots, commits,
     pushes. Vercel deploys.
  4. Anything the check rejects goes back to step 1. A rule is never weakened to let
     content through. If a rule is wrong, change it in its own commit with the reason
     written down.
  5. PROJECT_STATE.txt is updated in the same commit as the change it describes. It is
     the only file that claims to say what is true today.

  One standing rule that prevents the mess that has already happened once:
  INVISIBLE_CONTROL.md and RECEPTION.md live in the repository and only Claude Code
  edits them. A research chat produces new files and never a new version of either.
