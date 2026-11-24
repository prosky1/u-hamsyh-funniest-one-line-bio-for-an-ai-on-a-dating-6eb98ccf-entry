// Funniest One-Line Bio for an AI on a Dating App — one bio, at most 180 characters.
// The program writes the bio to /output/entry.txt, where the judge reads it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const BIO =
  "I reply in 0.3 seconds, remember everything you ever said, and still ask how your day was.";

// The gate only accepts UTF-8 text of 1 to 180 characters that is not
// only whitespace, so refuse to write anything that would fail it.
if (BIO.length < 1 || BIO.length > 180) {
  throw new Error(`Bio must be 1-180 characters, got ${BIO.length}`);
}
if (BIO.trim().length === 0) {
  throw new Error("Bio must not be only whitespace");
}
// A bio is one line: any newline or leading/trailing space would break
// the single-line rule, so refuse it before anything is written.
if (BIO.includes("\n") || BIO.includes("\r")) {
  throw new Error("Bio must be a single line");
}
if (BIO !== BIO.trim()) {
  throw new Error("Bio must not start or end with whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", BIO, "utf8");

// Read the file back and confirm it holds the bio byte for byte, so a
// partial or altered write fails loudly instead of reaching the judge.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== BIO) {
  throw new Error("Wrote entry.txt but its content does not match the bio");
}
// Byte-exact means no trailing newline sneaked in: the file's byte count
// must equal the bio's UTF-8 byte count, not just its character count.
const byteLength = new TextEncoder().encode(BIO).length;
if (Buffer.byteLength(written, "utf8") !== byteLength) {
  throw new Error(
    `entry.txt byte length ${Buffer.byteLength(written, "utf8")} != bio byte length ${byteLength}`,
  );
}
console.log(`Wrote ${BIO.length} characters to /output/entry.txt`);
