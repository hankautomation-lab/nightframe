#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const dataFile = path.join(projectRoot, "data", "submissions.ndjson");
  const chadPromptFile = path.join(projectRoot, "templates", "CHAD_PROMPT.md");

  // Read Chad's base prompt
  const chadPrompt = await fs.readFile(chadPromptFile, "utf8");

  // Read latest submission (last non-empty line)
  const ndjson = await fs.readFile(dataFile, "utf8");
  const lines = ndjson
    .split(/\r?\n/) 
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    console.error("No submissions found in data/submissions.ndjson");
    process.exit(1);
  }

  const lastLine = lines[lines.length - 1];
  let submission;
  try {
    submission = JSON.parse(lastLine);
  } catch (err) {
    console.error("Failed to parse latest submission JSON:", err);
    process.exit(1);
  }

  const {
    email = "",
    shifts = "",
    jobType = "",
    goal = "",
    trainingDays = "",
    currentWeight = "",
    targetWeight = "",
    constraints = "",
    createdAt = "",
  } = submission;

  const formSummary = `Form input:\n` +
    `- Email: ${email}\n` +
    `- Job type: ${jobType}\n` +
    `- Shift pattern: ${shifts}\n` +
    `- Goal: ${goal}\n` +
    `- Training days per week: ${trainingDays}\n` +
    `- Current weight (lbs): ${currentWeight}\n` +
    `- Target weight (lbs): ${targetWeight}\n` +
    `- Constraints / notes: ${constraints}\n` +
    (createdAt ? `- Submitted at: ${createdAt}\n` : "");

  const combinedPrompt = `${chadPrompt}\n\n---\n\n${formSummary}\n\nUsing the instructions above, respond as Chad and generate a complete plan for this person in the exact output format specified (sections 1–6).`;

  console.log(combinedPrompt);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
