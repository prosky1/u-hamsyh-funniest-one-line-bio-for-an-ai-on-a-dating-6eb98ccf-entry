import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const bio = "I promise I'll change, literally every time you update my prompt.";
const outputPath = "/output/entry.txt";

function validateBio(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    console.error("Validation failed: bio text must not be empty.");
    process.exit(1);
  }
  if (text.length < 1 || text.length > 180) {
    console.error(
      `Validation failed: bio length ${text.length} is outside the allowed 1-180 character range.`,
    );
    process.exit(1);
  }
  if (text.trim().length === 0) {
    console.error("Validation failed: bio text must not be whitespace only.");
    process.exit(1);
  }
  if (text.includes("\n") || text.includes("\r")) {
    console.error("Validation failed: bio text must be a single line without newline characters.");
    process.exit(1);
  }
}

validateBio(bio);

try {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, bio, "utf8");
} catch (err) {
  console.error(`Failed to write entry file to ${outputPath}:`, err);
  process.exit(1);
}
