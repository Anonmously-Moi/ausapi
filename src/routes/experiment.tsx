import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { apis, getApi, searchApis, type ApiEntry } from "@/lib/catalog";
import { mixOutcome } from "@/lib/mix";
import { QUOTE_TO, quoteMailto } from "@/lib/quote";
import { readSlots, writeSlots } from "@/lib/slots";

export const Route = createFileRoute("/experiment")({ component: Experiment });

function Experiment() {
  const [ids, setIds] = useState<string[]>([]);
  const [picking, setPicking] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  useEffect(() => {
    setIds(readSlots());
  }, []);

  function update(next: string[]) {
    setIds(next);
    writeSlots(next);
    setSent(false);
  }

  const picked = ids.map((id) => getApi(id)).filter((a): a is ApiEntry => Boolean(a));
  const outcome = mixOutcome(picked);
  const results = useMemo(() => searchApis({ q: query, limit: 8 }).items, [query]);

  return (
    <Shell>
      <h1 className="font-display text-4xl">Experiment</h1>
      <p className="mt-2 max-w-xl text-muted">
        Add up to three APIs. We’ll suggest a simple product idea you could build.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => {
          const api = picked[i];
          return (
            <div key={i} className="flex min-h-40 flex-col rounded-card border border-dashed border-line bg-surface p-4">
              <p className="text-xs text-muted">Slot {i + 1}</p>
              {api ? (
                <>
                  <p className="mt-2 font-display text-xl leading-snug">{api.name}</p>
                  <p className="mt-1 text-xs text-muted">{api.company}</p>
                  <button
                    type="button"
                    className="mt-auto pt-4 text-left text-sm text-accent"
                    onClick={() => update(ids.filter((id) => id !== api.id))}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="mt-6 text-left text-sm font-medium text-accent"
                  onClick={() => {
                    setQuery("");
                    setPicking(i);
                  }}
                >
                  + Add API
                </button>
              )}
            </div>
          );
        })}
      </div>

      <section className="relative mt-8 rounded-card border border-line bg-surface p-6">
        <p className="text-xs tracking-wide text-muted">What you could build</p>
        {!outcome && <p className="mt-3 text-muted">Pick at least one API to see an idea.</p>}
        {outcome && (
          <>
            <div className="stamp absolute top-5 right-5" aria-label={`Rated ${outcome.score} out of 10`}>
              {outcome.score}/10
            </div>
            <p
              className={
                outcome.verdict === "excellent"
                  ? "mt-3 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink"
                  : outcome.verdict === "ok"
                    ? "mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium text-ink ring-1 ring-line"
                    : "mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium text-muted ring-1 ring-line"
              }
            >
              {outcome.verdict === "excellent" ? "Excellent idea" : outcome.verdict === "ok" ? "Okay idea" : "Whacky idea"}
            </p>
            <h2 className="mt-3 max-w-xl pr-24 font-display text-3xl">{outcome.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed">{outcome.summary}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed">{outcome.verdictLine}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {outcome.pieces.map((p) => (
                <li key={p.name} className="border-t border-line pt-3">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.job}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="h-12 rounded-full bg-poppy px-6 font-medium text-surface"
                onClick={() => {
                  setSent(false);
                  setQuoteOpen(true);
                }}
              >
                Quote This
              </button>
              <button
                type="button"
                className="h-12 rounded-full border border-line px-5 text-sm"
                onClick={() =>
                  navigator.clipboard.writeText(
                    [outcome.title, `${outcome.score}/10`, outcome.summary, outcome.verdictLine, ...outcome.pieces.map((p) => `${p.name}: ${p.job}`)].join("\n"),
                  )
                }
              >
                Copy idea
              </button>
            </div>
            <p className="mt-3 text-xs text-muted">We’ll email you back with a rough cost. No lock-in.</p>
          </>
        )}
      </section>

      {picking !== null && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <div className="w-full max-w-lg rounded-card bg-surface p-5 shadow-none">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Add an API</h2>
              <button type="button" className="text-sm text-muted" onClick={() => setPicking(null)}>
                Close
              </button>
            </div>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the directory…"
              className="mt-4 h-11 w-full rounded-full border border-line px-4 outline-none focus:border-accent"
            />
            <ul className="mt-3 max-h-80 overflow-auto">
              {(query ? results : apis.slice(0, 8)).map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    className="w-full border-b border-line py-3 text-left"
                    onClick={() => {
                      if (!ids.includes(a.id) && ids.length < 3) update([...ids, a.id]);
                      setPicking(null);
                    }}
                  >
                    <span className="block text-sm">{a.name}</span>
                    <span className="text-xs text-muted">{a.company}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {quoteOpen && outcome && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <form
            className="w-full max-w-lg rounded-card bg-surface p-5"
            onSubmit={(e) => {
              e.preventDefault();
              const href = quoteMailto({ ...form, outcome });
              window.location.href = href;
              setSent(true);
              setQuoteOpen(false);
            }}
          >
            <h2 className="font-display text-2xl">Request a build quote</h2>
            <p className="mt-1 text-sm text-muted">{outcome.title}</p>
            <label className="mt-4 block text-sm">
              Your name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 h-11 w-full rounded-lg border border-line px-3"
              />
            </label>
            <label className="mt-3 block text-sm">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 h-11 w-full rounded-lg border border-line px-3"
              />
            </label>
            <label className="mt-3 block text-sm">
              Phone <span className="text-muted">(optional)</span>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 h-11 w-full rounded-lg border border-line px-3"
              />
            </label>
            <label className="mt-3 block text-sm">
              Anything else? <span className="text-muted">(optional)</span>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2"
                placeholder="Timeline, must-haves…"
              />
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="submit" className="h-12 rounded-full bg-poppy px-6 font-medium text-surface">
                Send quote request
              </button>
              <button type="button" className="h-12 px-3 text-sm text-muted" onClick={() => setQuoteOpen(false)}>
                Cancel
              </button>
            </div>
            <p className="mt-3 text-xs text-muted">Opens your email app addressed to {QUOTE_TO}.</p>
          </form>
        </div>
      )}

      {sent && (
        <p className="mt-4 text-sm text-accent-ink">
          Request ready — check your email app, then we’ll reply with a rough cost.{{" "}}
          <Link to="/browse" search={{ q: "", sheet: "All", band: "All" }} className="underline">
            Browse similar APIs
          </Link>
        </p>
      )}
    </Shell>
  );
}
