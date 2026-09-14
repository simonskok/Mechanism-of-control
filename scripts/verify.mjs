#!/usr/bin/env node
/**
 * One command, one exit code. Runs the content check, the type check and the build.
 *
 * The content check runs first because it needs no dependencies and catches the
 * mistakes that are actually made: an em dash, a maritime word, a term with no
 * glossary entry, a thinker who lost their objections block. It costs a fifth of
 * a second, so there is no reason to run anything else before it.
 *
 * It installs dependencies if they are missing, because a fresh container has
 * none and a hook that fails on turn one gets switched off.
 *
 * next build runs the content check again through prebuild. That is deliberate.
 * The point of running it first here is to fail in a fifth of a second rather
 * than after a fifteen second build.
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
