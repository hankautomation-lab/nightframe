// Chad model client, using DeepInfra's OpenAI-compatible API to call Kimi (Moonshot)

const DEEPINFRA_BASE_URL = process.env.DEEPINFRA_BASE_URL || "https://api.deepinfra.com/v1/openai";

if (!process.env.DEEPINFRA_API_KEY) {
  console.warn("[ChadModel] DEEPINFRA_API_KEY is not set. /api/generate-plan will fail until it's configured.");
}

// Default to Kimi on DeepInfra; override via CHAD_MODEL if you want something else
// NOTE: Model id must match DeepInfra docs exactly.
const DEFAULT_MODEL = process.env.CHAD_MODEL || "moonshotai/Kimi-K2.5";

export async function callChadModel(prompt: string): Promise<string> {
  const apiKey = process.env.DEEPINFRA_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPINFRA_API_KEY is not configured on the server.");
  }

  const res = await fetch(`${DEEPINFRA_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`DeepInfra API error: ${res.status} ${res.statusText} ${text}`);
  }

  const data: any = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Chad model (DeepInfra/Kimi) returned empty content.");
  }

  return content;
}
