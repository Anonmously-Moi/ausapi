import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { LayoutPreview } from "@/components/layout-previews";
import { layouts } from "@/lib/layouts";

export const Route = createFileRoute("/demos")({
  component: Demos,
});

function Demos() {
  return (
    <Shell>
      <h1 className="font-display text-4xl leading-tight">Demos</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed">
        Sample website layouts. Open one, then ask for a quote. Your words and photos replace the placeholders.
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {layouts.map((layout) => (
          <li key={layout.id} className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="h-44 overflow-hidden border-b border-line">
              <div className="origin-top-left scale-[0.42]">
                <div className="w-[238%]">
                  <LayoutPreview id={layout.id} />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-display text-2xl">{layout.name}</h2>
              <p className="mt-1 text-sm text-muted">{layout.blurb}</p>
              <Link
                to="/demos/$id"
                params={{ id: layout.id }}
                className="mt-4 inline-flex h-11 items-center rounded-full bg-poppy px-5 text-sm font-medium text-surface"
              >
                Open
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
