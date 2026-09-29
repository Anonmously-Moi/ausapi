import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutPreview } from "@/components/layout-previews";
import { getLayout } from "@/lib/layouts";
import { QUOTE_TO, layoutQuoteMailto } from "@/lib/quote";

export const Route = createFileRoute("/demos/$id")({
  component: DemoView,
});

function DemoView() {
  const { id } = Route.useParams();
  const layout = getLayout(id);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  if (!layout) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p>That layout is not in the set.</p>
        <Link to="/demos" className="mt-4 inline-block text-accent">
          Back to demos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 bg-poppy px-4 py-3 text-on-poppy">
        <Link to="/demos" className="text-sm underline">
          Back to demos
        </Link>
        <p className="font-display text-lg">{layout.name}</p>
        <button
          type="button"
          className="h-10 rounded-full bg-ink px-4 text-sm text-surface"
          onClick={() => setOpen(true)}
        >
          Quote This
        </button>
      </div>
      <div className="h-2 bg-slate" />
      <div className="mx-auto max-w-5xl px-4 py-6">
        <LayoutPreview id={layout.id} />
        <p className="mt-4 text-sm text-muted">
          Sample only. The finished site uses your name, photos, and words. Security headers on this website stay in place.
        </p>
        {sent && <p className="mt-3 text-sm">Your email app should be open. Send that message and I’ll reply with a cost.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <form
            className="w-full max-w-lg rounded-card bg-surface p-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = layoutQuoteMailto({ layout: layout.name, ...form });
              setSent(true);
              setOpen(false);
            }}
          >
            <h2 className="font-display text-2xl">Quote this layout</h2>
            <p className="mt-1 text-sm text-muted">{layout.name}</p>
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
              />
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="submit" className="h-12 rounded-full bg-poppy px-6 font-medium text-surface">
                Send quote request
              </button>
              <button type="button" className="h-12 px-3 text-sm text-muted" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
            <p className="mt-3 text-xs text-muted">Opens your email app addressed to {QUOTE_TO}.</p>
          </form>
        </div>
      )}
    </div>
  );
}
