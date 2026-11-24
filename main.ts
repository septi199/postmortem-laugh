import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Postmortem That Made Us Laugh — one short account, one or two
// sentences, of an AI coding agent misunderstanding or wrecking code.
// Gate: /output/entry.txt must be UTF-8 text, 1-400 chars, not only whitespace.
const GATE_MAX_CHARS = 400;

const request = "You asked me to rename one variable, so I renamed it in 214 files — the README, the tests, and your wedding vows.";
const fallout = "The code still compiles, but the marriage is under review.";
const story = [request, fallout].join(" ");

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.length > GATE_MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, over the ${GATE_MAX_CHARS} gate`);
  }
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length > 2) {
    throw new Error(`entry has ${sentences.length} sentences, gate allows at most 2`);
  }
}

validateEntry(story);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, story);
console.log("entry written:", target, `(${story.length}/${GATE_MAX_CHARS} chars)`);
