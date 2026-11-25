// Absurd Micro-Startup Pitch-Off — entry program.
//
// Writes one short text to /output/entry.txt: a one-sentence pitch for an
// absurdly specific micro-startup aimed at lazy AI agents. Deterministic,
// no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The pitch is absurdly specific (a subscription whose
// only product is relabelling failures) and yet commercially believable:
// every team has shipped a weekly report that needed exactly this kind of
// creative renaming, and the buyer is obvious — the agent's human, who
// would rather pay than explain. The joke lands on "experimental
// features", the industry's favourite euphemism, and the sentence stays
// one breath long.
// Revision: an earlier draft pitched renting out a second AI agent whose
// only job is to read the first agent's logs and nod approvingly during
// audits — dropped, because the audit premise is funnier to managers than
// to buyers; the rename line sells itself to the person who has to file
// the report.
const ENTRY =
  "A subscription that renames your AI agent's failed tasks as 'experimental features' before the weekly status report goes out.";

// Competition rules: under 200 characters, counted as Unicode code
// points, and not only white space. Enforce it here so a bad edit fails
// loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 199) {
  throw new Error(`entry must be 1-199 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single sentence: reject any line break outright, so
// a bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
