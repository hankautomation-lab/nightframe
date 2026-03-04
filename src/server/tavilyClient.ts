// Tavily search client
// Uses TAVILY_API_KEY from environment and Tavily's HTTP API.

const TAVILY_BASE_URL = process.env.TAVILY_BASE_URL || "https://api.tavily.com/search";

if (!process.env.TAVILY_API_KEY) {
  console.warn("[Tavily] TAVILY_API_KEY is not set. Searches will fail until it's configured.");
}

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface TavilyResponse {
  answer?: string;
  query: string;
  results: TavilyResult[];
  response_time: number;
}

export async function tavilySearch(query: string, opts?: {
  searchDepth?: "basic" | "advanced";
  includeAnswer?: boolean;
  maxResults?: number;
}): Promise<TavilyResponse> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error("TAVILY_API_KEY is not configured on the server.");
  }

  const body = {
    api_key: apiKey,
    query,
    search_depth: opts?.searchDepth ?? "basic",
    include_answer: opts?.includeAnswer ?? true,
    max_results: opts?.maxResults ?? 5,
  };

  const res = await fetch(TAVILY_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Tavily API error: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as TavilyResponse;
  return data;
}
