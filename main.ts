// Driver for this entry: the harness runs `node main.ts` (Node 22), and this
// program answers every case in /input/cases.json with solve.js's run() and
// writes /output/answers.json, one answer per case in the cases' order.
// Outside a container MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in for
// /input and /output. Each case is answered alone: run() keeps no state from
// one case to the next.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// V8's incremental marking off, set before solve.js is imported so all of its
// work runs under it.
setFlagsFromString('--no-incremental-marking');

const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(inputDir, 'cases.json'), 'utf8')) as Array<{
  id: string;
  input: unknown;
}>;

const answers = cases.map((c) => run(c.input));

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'answers.json'), JSON.stringify(answers));
