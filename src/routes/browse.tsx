import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { searchApis, sheets, type ApiEntry } from "@/lib/catalog";

type Search = { q: string; sheet: string; band: string };

export const Route = createFileRoute("/browse")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : "",
    sheet: typeof s.sheet === "string" ? s.sheet : "All",
    band: typeof s.band === "string" ? s.band : "All",
  }),
  component: Browse,
});

function Browse() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [shown, setShown] = useState(24);
  const { total, items } = searchApis({ ...search, limit: shown });

  function set(partial: Partial<Search>) {
    setShown(24);
    navigate({ search: { ...search, ...partial } });
  }

  return (
    <Shell>
      <h1 className="font-display text-4xl">Browse</h1>
      <p className="mt-2 text-muted">Filter the directory. Open a listing for docs and access notes.</p>

      <div className="mt-6 flex flex-col gap-3">
        <input
          value={search.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="Search APIs, companies, or keywords…"
          className="h-12 w-full rounded-full border-2 border-accent bg-surface px-5 outline-none"
        />
        <div className="flex flex-wrap gap-2">
          {(["All", "Free", "Paid", "Partner"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => set({ band: b })}
              className={
                search.band === b
                  ? "h-10 rounded-full bg-poppy px-4 text-sm text-surface"
                  : "h-10 rounded-full border border-line bg-surface px-4 text-sm text-ink"
              }
            >
              {b}
            </button>
          ))}
          <label className="sr-only" htmlFor="sheet">
            Category
          </label>
          <select
            id="sheet"
            value={search.sheet}
            onChange={(e) => set({ sheet: e.target.value })}
            className="h-10 rounded-full border border-line bg-surface px-4 text-sm"
          >
            <option value="All">All categories</option>
            {sheets.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {total} {total === 1 ? "listing" : "listings"}
      </p>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((a) => (
          <Card key={a.id} api={a} />
        ))}
      </ul>
      {shown < total && (
        <button
          type="button"
          onClick={() => setShown((n) => n + 24)}
          className="mt-6 h-11 rounded-full border border-line bg-surface px-5 text-sm"
        >
          Show more
        </button>
      )}
      {total === 0 && <p className="mt-8 text-muted">Nothing matches. Try a broader search.</p>}
    </Shell>
  );
}

function Card({ api }: { api: ApiEntry }) {
  return (
    <li>
      <Link
        to="/api/$id"
        params={{ id: api.id }}
        className="block rounded-card border border-line bg-surface p-5 hover:border-accent"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs tracking-wide text-muted">{api.company}</p>
            <h2 className="mt-1 font-display text-2xl leading-snug">{api.name}</h2>
          </div>
          <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink">
            {api.priceBand}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{api.description}</p>
        <p className="mt-3 text-xs text-muted">
          {api.sheet}
          {api.auth ? ` · ${api.auth}` : ""}
        </p>
      </Link>
    </li>
  );
}
