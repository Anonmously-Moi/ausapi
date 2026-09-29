import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { getApi } from "@/lib/catalog";
import { externalHttpsUrl } from "@/lib/safe-url";
import { addSlot } from "@/lib/slots";

export const Route = createFileRoute("/api/$id")({
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const api = getApi(id);
  const navigate = useNavigate();

  if (!api) {
    return (
      <Shell>
        <p>That listing isn’t in the directory.</p>
        <Link to="/browse" search={{ q: "", sheet: "All", band: "All" }} className="mt-4 inline-block text-accent">
          Back to browse
        </Link>
      </Shell>
    );
  }

  const docs = externalHttpsUrl(api.docs || api.portal || api.website);

  return (
    <Shell>
      <Link to="/browse" search={{ q: "", sheet: api.sheet, band: "All" }} className="text-sm text-muted">
        ← {api.sheet}
      </Link>
      <p className="mt-6 text-sm text-muted">{api.company}</p>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl leading-tight">{api.name}</h1>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink">
          {api.priceBand}
        </span>
        <span className="text-xs text-muted">{api.status}</span>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{api.description}</p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Category" value={api.category || api.industry} />
        <Field label="Protocol" value={api.protocol} />
        <Field label="Auth" value={api.auth} />
        <Field label="Access" value={api.access} />
        <Field label="Pricing note" value={api.pricing} />
        <Field label="Last verified" value={api.verified} />
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {docs && (
          <a
            href={docs.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-full bg-poppy px-6 font-medium text-surface"
          >
            Open documentation
          </a>
        )}
        <button
          type="button"
          className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-6"
          onClick={() => {
            addSlot(api.id);
            navigate({ to: "/experiment" });
          }}
        >
          Add to Experiment
        </button>
      </div>
      {docs && (
        <p className="mt-3 text-xs text-muted">Leaves this site and opens {docs.host}</p>
      )}
    </Shell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <dt className="text-xs tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}
