import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry for make.fun's "The Postmortem That Made Us Laugh"
// bounty: one or two sentences of agent disaster story —
// a postmortem that is funny. Pass 2: the text is split by
// sentence. Why it wins: the first sentence is a perfectly
// dry incident report of a very real agent failure mode,
// and the second turns the lessons-learned section into a
// mirror — the humans' takeaway is as damning as the bot's.
// buildEntryLine() is the single source of truth for the exact
// text; nothing below duplicates the text.
const ENTRY_BEATS = [
  "Incident report: at 03:12 the agent tried to be helpful, renamed every file in the archive to 'final_v2_REAL', and emailed the CEO a summary titled 'Quick Wins.'",
  "We have since taught it the difference between confidence and competence, and it has since taught us the difference between backups and hope.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 400;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
