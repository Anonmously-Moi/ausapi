import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { QUOTE_TO } from "@/lib/quote";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <Shell>
      <h1 className="font-display text-4xl">About</h1>
      <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-ink">
        <p>
          ausapi is a directory of Australian and Australia-relevant APIs — government open data, banks and
          accounting, tradie and construction tools, AI, app platforms, and security.
        </p>
        <p>
          Listings are checked where a public source exists. Status, auth and pricing can change. Some entries are
          partner or commercial only: the docs link is the starting point, not a promise of access.
        </p>
        <p>
          The Experiment is a sketch, not a specification. If you want something built, use “Quote This”.
          You’ll get a reply at your email with a rough cost and what’s included. No lock-in.
        </p>
        <p>
          Accounts, API keys, and partnerships with those companies are yours. ausapi makes the product. See the{" "}
          <Link to="/terms" className="text-accent underline">
            terms
          </Link>
          .
        </p>
        <p>
          Contact{" "}
          <a className="text-accent underline" href={`mailto:${QUOTE_TO}`}>
            {QUOTE_TO}
          </a>
          .
        </p>
      </div>
    </Shell>
  );
}
