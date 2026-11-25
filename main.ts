import { writeFileSync, mkdirSync } from "node:fs";

const TEXT = "We rent out AI agents that pretend to read your 400-page PDF — $2 per skim, and they will confidently summarize the parts they never opened.";

// Gate: the entry must be exactly one sentence of 1-200 characters.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry length ${TEXT.length} outside gate 1-200`);
}
if (TEXT.trim().split(/(?<=[.!?])\s+/).length !== 1) {
  throw new Error("entry must be exactly one sentence");
}
if (TEXT.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, TEXT);
console.log(`wrote ${TEXT.length} characters to ${outDir}/entry.txt`);
