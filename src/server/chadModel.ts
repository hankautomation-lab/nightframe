// Chad model client, using Moonshot (Kimi) API

const MOONSHOT_BASE_URL = process.env.MOONSHOT_BASE_URL || "https://api.moonshot.cn/v1";

if (!process.env.MOONSHOT_API_KEY) {
  console.warn("[ChadModel] MOONSHOT_API_KEY is not set. /api/generate-plan will fail until it's configured.");
}

const DEFAULT_MODEL = process.env.CHAD_MODEL || "moonshot/kimi-k2.5";

export async function callChadModel(prompt: string): Promise<string> {
  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    throw new Error("MOONSHOT_API_KEY is not configured on the server.");
  }

  const res = await fetch(`${MOONSHOT_BASE_URL}/chat/completions`, {
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
    throw new Error(`Moonshot API error: ${res.status} ${res.statusText} ${text}`);
  }

  const data: any = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Chad model (Moonshot) returned empty content.");
  }

  return content;
}
