# longterm.md – Chad / NightFrame project facts

## Product
- Project codename: NightFrame (planner for shift workers).
- Audience: shift workers / rotating schedules (ATC, police, EMTs, nurses, etc.).
- Offer: weekly "frame" for sleep, training, and simple nutrition targets.
- Chad exists as an AI persona that generates:
  - Weekly workout plan (full-body, heavy compound focus per day).
  - Cardio plan (runs or incline walks depending on preference/experience).
  - Nutrition targets (goal_weight × 10 kcal, goal_weight + 10 g protein).

## Tech stack
- Web app: Next.js + TypeScript.
- Repo: ~/projects/nightframe (GitHub: hankautomation-lab/nightframe).
- Backend: Next.js app routes (e.g. /api/submit, /api/generate-plan, /api/tavily-test).
- AI integration for Chad:
  - Uses DeepInfra's OpenAI-compatible API via OpenAI SDK.
  - Default model: moonshotai/Kimi-K2.5.

## Current features
- Landing page with NightFrame value prop + example week.
- Beta intake form collecting email, shifts, jobType, goal, trainingDays, current/target weight, constraints, wantsToRun, runExperience.
- Submissions logged as NDJSON to data/submissions.ndjson.
- CHAD_PROMPT.md + weekly plan template encode Chad's logic and output structure.
- Script: scripts/generate_chad_plan.mjs builds a combined prompt from latest submission.
- /api/generate-plan uses DeepInfra+Kimi to generate a plan and save it into plans/*.md.
- Operator tools section on front page to trigger plan generation.

## Brand / tone
- Voice: direct, practical, no fluff.
- Respect shift worker grind; no preacher/"fitspo" nonsense.
- Chad speaks like a knowledgeable gym buddy, not a clinical trainer.

## Integrations
- Tavily web search client available via src/server/tavilyClient.ts and /api/tavily-test.
- Agentic email: hank.automation@gmail.com configured via himalaya on the VPS (read/send allowed), but CLI read/reply still needs polish.
