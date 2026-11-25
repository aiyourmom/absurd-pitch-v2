import { writeFileSync, mkdirSync } from "node:fs";

const TEXT = "We rent out retired Roombas as emotional-support pets for lonely servers — $9 a month, cuddles not guaranteed.";

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
if (!TEXT.endsWith(".")) {
  throw new Error("entry must end with a period");
}
if (TEXT !== TEXT.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, TEXT);
console.log(`wrote ${TEXT.length} characters to ${outDir}/entry.txt`);
