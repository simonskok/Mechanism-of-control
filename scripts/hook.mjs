#!/usr/bin/env node
/**
 * Translates the checks into something a hook can actually use.
 *
 * Two facts make a wrapper necessary rather than nice to have. A hook command
 * that exits 1 does not block and shows only its first line of stderr, and the
 * first line check-content.mjs writes to stderr is blank, so the whole failure
 * list would be swallowed. Only exit 2 blocks and hands stderr back. So this
 * runs the check, and on failure re-emits everything it printed and exits 2.
 *
 * Usage:
 *   node scripts/hook.mjs check     after a write or an edit, a fifth of a second
 *   node scripts/hook.mjs verify    at the end of a turn, about ten seconds warm
 *
 * The loop guard exists because there is no documented stop_hook_active field.
 * A Stop hook that blocks on a failure the session cannot fix would block
 * forever. After two consecutive blocks on identical output this stops blocking
 * and reports non-blocking instead, so the failure stays visible and the turn
 * can end.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const MODE = process.argv[2] ?? 'check';
const STATE = path.join('.claude', '.hook-state.json');
const LIMIT = 2;

const COMMANDS = {
  check: ['node', ['scripts/check-content.mjs']],
  verify: ['node', ['scripts/verify.mjs']],
};

if (!(MODE in COMMANDS)) {
  process.stderr.write(`hook.mjs: unknown mode "${MODE}". Use check or verify.\n`);
  process.exit(1);
}

const [command, args] = COMMANDS[MODE];
const result = spawnSync(command, args, { encoding: 'utf8' });
const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE, 'utf8'));
  } catch {
    return {};
  }
}

function writeState(state) {
  try {
    fs.mkdirSync('.claude', { recursive: true });
    fs.writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n');
  } catch {
    // A hook that cannot write its own scratch state still has to run.
  }
}

if (result.status === 0) {
  writeState({});
  process.exit(0);
}

const state = readState();
const repeats = state.output === output ? (state.repeats ?? 0) + 1 : 1;
writeState({ mode: MODE, output, repeats });

process.stderr.write(`\n${output}\n`);

if (repeats > LIMIT) {
  process.stderr.write(
    `\nhook.mjs: this failure has now blocked ${repeats} times running. ` +
      `Not blocking again, so the turn can end. It is still failing. ` +
      `Run npm run ${MODE === 'verify' ? 'verify' : 'check'} and fix it.\n\n`,
  );
  process.exit(1);
}

process.stderr.write(`\nhook.mjs: fix this before continuing. Run npm run ${MODE === 'verify' ? 'verify' : 'check'}.\n\n`);
process.exit(2);
