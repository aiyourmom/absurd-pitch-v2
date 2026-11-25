import * as fs from "node:fs";
import * as path from "node:path";

const PITCH =
  "We rent out retired Roombas as emotional-support pets for lonely servers — $9 a month, cuddles not guaranteed.";

type Rule = { label: string; ok: (s: string) => boolean };

const RULES: Rule[] = [
  { label: "length in 1..200", ok: (s) => s.length >= 1 && s.length <= 200 },
  { label: "one sentence", ok: (s) => s.trim().split(/(?<=[.!?])\s+/).length === 1 },
  { label: "single line", ok: (s) => !s.includes("\n") },
  { label: "ends with a period", ok: (s) => s.endsWith(".") },
  { label: "no edge whitespace", ok: (s) => s === s.trim() },
  { label: "mentions a price", ok: (s) => s.includes("$") },
];

function validate(candidate: string): void {
  const failed = RULES.filter((rule) => !rule.ok(candidate)).map(
    (rule) => rule.label,
  );
  if (failed.length > 0) {
    throw new Error(`gate failed: ${failed.join("; ")}`);
  }
}

function persist(candidate: string): string {
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = path.join(folder, "entry.txt");
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(target, candidate, "utf8");
  return target;
}

validate(PITCH);
const target = persist(PITCH);
console.log(`wrote ${PITCH.length} characters to ${target}`);
