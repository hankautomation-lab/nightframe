"use client";

export function OperatorTools() {
  async function handleGenerate() {
    try {
      const res = await fetch("/api/generate-plan", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(`Failed to generate plan: ${data?.error || res.statusText}`);
        return;
      }
      const data = await res.json();
      alert(`Plan generated and saved as ${data.planFile}`);
    } catch (err) {
      console.error(err);
      alert("Error calling /api/generate-plan. Check server logs.");
    }
  }

  return (
    <section className="space-y-3 border-t border-slate-800 pt-6 mt-4">
      <h2 className="text-sm font-semibold text-slate-300">Operator tools</h2>
      <p className="text-xs text-slate-500">
        For now, this section is just for you. After collecting a submission, you can trigger Chad
        to generate a plan for the latest entry and save it into <code>plans/</code> on the server.
      </p>
      <button
        type="button"
        onClick={handleGenerate}
        className="inline-flex items-center justify-center rounded bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700"
      >
        Generate plan for latest submission
      </button>
    </section>
  );
}
