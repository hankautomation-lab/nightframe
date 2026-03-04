import { NextRequest, NextResponse } from "next/server";
import { tavilySearch } from "@/server/tavilyClient";

export async function GET(_req: NextRequest) {
  try {
    const resp = await tavilySearch("what is NightFrame in this context?", {
      searchDepth: "basic",
      includeAnswer: true,
      maxResults: 3,
    });

    return NextResponse.json({ ok: true, tavily: resp });
  } catch (err: any) {
    console.error("/api/tavily-test error", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Tavily test failed" },
      { status: 500 },
    );
  }
}
