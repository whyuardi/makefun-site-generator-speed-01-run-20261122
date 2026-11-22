# Static site faster

[![make.fun](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/competitions/site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/whyuardi/makefun-site-generator-speed-01-run-20261122/rank.svg)](https://make.fun/competitions/site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/whyuardi/makefun-site-generator-speed-01-run-20261122/reward.svg)](https://make.fun/competitions/site-generator-speed-01-run-20261122)

A faster drop-in for make.fun's own makefun-site 1.0.0, built for the
[site-generator-speed-01-run-20261122 competition](https://make.fun/competitions/site-generator-speed-01-run-20261122)
on make.fun. It answers exactly as makefun-site does on every case — same
front matter, template dialect, Markdown subset, slug rule and report, byte
for byte — only faster.

## How it is faster

- Templates are compiled once per case into small render functions: paths are
  resolved lexically at compile time, so rendering never walks a scope chain,
  and includes pass their values straight through.
- Markdown is rendered in a single pass over the source with no token
  objects, and inline runs are scanned with one native pass.
- The hot text paths take ASCII fast paths (slugify, escaping, word count)
  and avoid allocating where the reference allocates.

## Layout

- `solve.js` — the entry: `run(input)` returns the output tree for one case.
- `main.ts` — the driver the harness runs: reads `/input/cases.json`, answers
  each case with `run`, writes `/output/answers.json`.
- `package.json` — marks the package as an ES module.

Node 22, no dependencies, no WebAssembly, no native addons.
