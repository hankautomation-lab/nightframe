import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const payload = {
      email: formData.get("email")?.toString() ?? "",
      shifts: formData.get("shifts")?.toString() ?? "",
      jobType: formData.get("jobType")?.toString() ?? "",
      goal: formData.get("goal")?.toString() ?? "",
      trainingDays: formData.get("trainingDays")?.toString() ?? "",
      currentWeight: formData.get("currentWeight")?.toString() ?? "",
      targetWeight: formData.get("targetWeight")?.toString() ?? "",
      constraints: formData.get("constraints")?.toString() ?? "",
      wantsToRun: formData.get("wantsToRun")?.toString() ?? "",
      runExperience: formData.get("runExperience")?.toString() ?? "",
      createdAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? req.ip ?? null,
      userAgent: req.headers.get("user-agent") ?? null,
    };

    const logDir = path.join(process.cwd(), "data");
    const logFile = path.join(logDir, "submissions.ndjson");

    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(logFile, JSON.stringify(payload) + "\n", "utf8");

    return NextResponse.redirect("/", { status: 303 });
  } catch (err) {
    console.error("NightFrame submit error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
