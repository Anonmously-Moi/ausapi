import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/browse", label: "Browse" },
  { to: "/experiment", label: "Experiment" },
  { to: "/about", label: "About" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <header className="sticky top-0 z-20 bg-poppy text-on-poppy">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-display text-2xl leading-none tracking-tight text-on-poppy">
            ausapi
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3 py-2 text-on-poppy hover:underline"
                activeProps={{ className: "rounded-full px-3 py-2 text-on-poppy underline" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="h-2 bg-slate" />
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">{children}</main>
      <footer className="bg-slate-deep text-on-poppy">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>Partner APIs may need an agreement.</p>
          <p>
            <Link to="/terms" className="underline">
              Terms
            </Link>
            . Quotes by email — no public prices.
          </p>
        </div>
      </footer>
    </div>
  );
}
