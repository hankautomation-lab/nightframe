# NightFrame

Planning for life on the night shift.

This repo contains a small Next.js app plus a helper agent (Chad) that turns shift-worker intake forms into weekly training + nutrition frames.

## Dev

```bash
cd ~/projects/nightframe
npm install        # first time only
npm run dev        # run Next.js on http://localhost:3000
```

## Chad plan generation (manual for now)

1. Make sure you have at least one submission:
   - Visit `http://localhost:3000`, fill out the beta form, submit.
   - This appends a JSON line to `data/submissions.ndjson`.

2. Generate a Chad prompt for the latest submission:

```bash
npm run chad:plan
```

This prints a combined prompt:
- Chad's instructions (from `templates/CHAD_PROMPT.md`), plus
- The latest submission data.

3. Paste that into your model UI and get a full plan in Chad's output format.

Later we can wire direct API calls + email delivery; for now it's intentionally simple and manual.
