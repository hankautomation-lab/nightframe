// Chad model client, using DeepInfra's OpenAI-compatible API via OpenAI SDK

import OpenAI from "openai";

const DEEPINFRA_BASE_URL = process.env.DEEPINFRA_BASE_URL || "https://api.deepinfra.com/v1/openai";

if (!process.env.DEEPINFRA_API_KEY) {
  console.warn("[ChadModel] DEEPINFRA_API_KEY is not set. /api/generate-plan will fail until it's configured.");
}

// Default to Kimi on DeepInfra; override via CHAD_MODEL if you want something else
const DEFAULT_MODEL = process.env.CHAD_MODEL || "moonshotai/Kimi-K2.5";

const client = process.env.DEEPINFRA_API_KEY
  ? new OpenAI({
      apiKey: process.env.DEEPINFRA_API_KEY,
      baseURL: DEEPINFRA_BASE_URL,
    })
  : null;

export async function callChadModel(prompt: string): Promise<string> {
  if (!client) {
    throw new Error("DEEPINFRA_API_KEY is not configured on the server.");
  }

  const completion = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [
      { role: "user", content: prompt },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Chad model (DeepInfra/Kimi) returned empty content.");
  }

  return content;
}
