import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { apis, sheets } from "@/lib/catalog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const featured = ["Government", "Finance", "Tradie", "AI", "App Development", "Cybersecurity"];

  return (
    <Shell>
      <section className="max-w-2xl pt-6 pb-10">
        <p className="text-sm font-medium tracking-wide text-accent">Directory</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-ink sm:text-6xl">
          Australian APIs, <span className="inline-block bg-white px-3 py-1">organised.</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">Browse free and paid APIs.</p>
        <p className="mt-2 max-w-xl text-lg leading-relaxed text-ink">
          {apis.length} listings across {sheets.length} categories.
        </p>
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/browse", search: { q, sheet: "All", band: "All" } });
          }}
        >
          <label className="sr-only" htmlFor="q">
            Search APIs
          </label>
          <div className="flex h-12 items-center rounded-full border-2 border-accent bg-surface pr-1 pl-5">
            <input
              id="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search APIs, companies, or keywords…"
              className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
            />
            <button type="submit" className="h-9 shrink-0 rounded-full bg-ink px-4 text-sm font-medium text-bg">
              Search
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="font-display text-2xl">Trending</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {featured.map((s) => (
            <Link
              key={s}
              to="/browse"
              search={{ q: "", sheet: s, band: "All" }}
              className="rounded-full border-2 border-accent bg-surface px-4 py-2 text-sm text-ink"
            >
              {s}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-card border-2 border-accent bg-surface p-6 sm:p-8">
        <h2 className="font-display text-3xl">Mix APIs. See what you could build.</h2>
        <p className="mt-2 max-w-xl text-muted">
          Add up to three listings. We’ll suggest a simple product idea — then you can ask for a quote.
        </p>
        <Link
          to="/experiment"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-bg"
        >
          Try the Experiment
        </Link>
      </section>
    </Shell>
  );
}
