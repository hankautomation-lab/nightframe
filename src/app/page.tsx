export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-12 space-y-12">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-slate-400">NightFrame</p>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Planning for life on the night shift.
          </h1>
          <p className="text-slate-300">
            NightFrame turns your actual work schedule into a realistic weekly frame for sleep,
            training, and basic nutrition targets. Built for people on night and rotating shifts
            in high-stress jobs.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Who it&apos;s for</h2>
          <ul className="list-disc space-y-1 pl-5 text-slate-300">
            <li>Night-shift or rotating-shift workers (ATC, nurses, cops, EMTs, factory, logistics, etc.).</li>
            <li>People tired of generic 9–5 fitness advice that ignores their schedule.</li>
            <li>Anyone who wants a simple, repeatable weekly plan they can actually follow.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What NightFrame does</h2>
          <ol className="list-decimal space-y-1 pl-5 text-slate-300">
            <li>You enter your work shifts and basic goals.</li>
            <li>NightFrame builds a weekly frame: when to sleep, when to train, and rough calorie/protein targets.</li>
            <li>You get a simple plan you can follow around your shifts.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Example week (fictional)</h2>
          <p className="text-slate-300">
            Example: 4 nights on (19:00–07:00), 3 off. NightFrame might suggest something like:
          </p>
          <div className="overflow-x-auto rounded-md border border-slate-800 bg-slate-900/60">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="px-3 py-2 text-left">Day</th>
                  <th className="px-3 py-2 text-left">Sleep</th>
                  <th className="px-3 py-2 text-left">Training</th>
                  <th className="px-3 py-2 text-left">Food target</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-800">
                  <td className="px-3 py-2">Mon (on)</td>
                  <td className="px-3 py-2">08:00–14:00</td>
                  <td className="px-3 py-2">Light run before shift</td>
                  <td className="px-3 py-2">~1,800 kcal, 180–200g protein</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-3 py-2">Tue (on)</td>
                  <td className="px-3 py-2">08:30–14:30</td>
                  <td className="px-3 py-2">Rest</td>
                  <td className="px-3 py-2">~1,800 kcal, high protein, low junk</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-3 py-2">Wed (on)</td>
                  <td className="px-3 py-2">08:00–14:00</td>
                  <td className="px-3 py-2">Easy strength session after shift</td>
                  <td className="px-3 py-2">~1,900 kcal, focus on recovery</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-3 py-2">Thu (on)</td>
                  <td className="px-3 py-2">08:00–14:00</td>
                  <td className="px-3 py-2">Rest / mobility</td>
                  <td className="px-3 py-2">~1,700–1,800 kcal</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-3 py-2">Fri (off)</td>
                  <td className="px-3 py-2">Core sleep 03:00–09:00</td>
                  <td className="px-3 py-2">Longer run or lift</td>
                  <td className="px-3 py-2">~2,000 kcal, higher carbs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            This is an example only. NightFrame will generate a plan around your actual shifts and goals.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Beta intake form</h2>
          <p className="text-slate-300">
            NightFrame is in early beta. For now, plans are generated using a mix of templates and
            human logic. Fill out the form below and you&apos;ll get a custom weekly frame by email.
          </p>

          <form
            method="POST"
            action="/api/submit"
            className="space-y-4 rounded-md border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="shifts">Shift pattern</label>
              <textarea
                id="shifts"
                name="shifts"
                required
                rows={2}
                placeholder="e.g. 4 nights on (19:00–07:00), 3 off"
                className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="jobType">Job type</label>
              <input
                id="jobType"
                name="jobType"
                type="text"
                placeholder="ATC, nurse, police, EMT, factory, etc."
                className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="goal">Goal</label>
                <select
                  id="goal"
                  name="goal"
                  className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="lose">Lose weight</option>
                  <option value="maintain">Maintain</option>
                  <option value="gain">Gain</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="trainingDays">Training days per week</label>
                <select
                  id="trainingDays"
                  name="trainingDays"
                  className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="currentWeight">Current weight (lbs)</label>
                <input
                  id="currentWeight"
                  name="currentWeight"
                  type="number"
                  step="0.1"
                  className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="targetWeight">Target weight (lbs)</label>
                <input
                  id="targetWeight"
                  name="targetWeight"
                  type="number"
                  step="0.1"
                  className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="constraints">Constraints / notes</label>
              <textarea
                id="constraints"
                name="constraints"
                rows={2}
                placeholder="Injuries, preferred training times, anything else important."
                className="w-full rounded bg-slate-950 px-3 py-2 text-sm text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Submit beta request
            </button>

            <p className="text-xs text-slate-500">
              In beta: plans are generated manually using your answers plus templates. You&apos;ll receive
              an email with your first weekly frame once it&apos;s ready.
            </p>
          </form>
        </section>

        <footer className="pt-4 text-xs text-slate-600">
          NightFrame is a small experiment for shift workers. No spam, no bullshit.
        </footer>
      </div>
    </main>
  );
}
