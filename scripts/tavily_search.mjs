#!/usr/bin/env node

import { fileURLToPath } from "url";
import path from "path";
import { createRequire } from "module";

// Simple loader so we can use the TS-compiled tavilyClient from Node.
// Assumes "ts-node" or a build step later; for now we just document usage.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

async function main() {
  const [,, ...args] = process.argv;
  const query = args.join(" ");
  if (!query) {
    console.error("Usage: npm run tavily -- <query>");
    process.exit(1);
  }

  // Import compiled JS if/when we add a build, or use ts-node in dev.
  // For now, this is a placeholder: we just show where the client lives.
  const { tavilySearch } = require("../dist/server/tavilyClient.js");

  const resp = await tavilySearch(query, { searchDepth: "basic", includeAnswer: true, maxResults: 5 });

  console.log("Answer:\n", resp.answer || "(no direct answer)");
  console.log("\nTop results:");
  for (const r of resp.results) {
    console.log("-", r.title, "->", r.url);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
