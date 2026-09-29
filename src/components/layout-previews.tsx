import type { ReactNode } from "react";
import type { LayoutId } from "@/lib/layouts";

/** Layout copy rule: one punchy sentence per line. Never join two sentences. */

function Shot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#d4d4d4] ${className}`}>
      <svg viewBox="0 0 240 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="186" cy="32" r="12" fill="#f7f7f7" />
        <path d="M0 120 L58 62 L96 92 L142 40 L240 120 Z" fill="#b9b9b9" />
        <path d="M18 120 L78 74 L124 120 Z" fill="#cfcfcf" />
      </svg>
    </div>
  );
}

function NightFolio() {
  return (
    <div className="grid min-h-[34rem] bg-white text-black md:grid-cols-2">
      <section className="flex flex-col bg-black px-8 py-10 text-white">
        <div className="h-10 w-px bg-white" />
        <div>
          <h2 className="text-3xl tracking-wide">SELECTED WORK</h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
            A minimal page for inspiration.
          </p>
        </div>
        <div className="mt-10 text-sm">
          <p className="tracking-wide">Get in touch</p>
          <p className="mt-3 text-white/75">Phone · your number</p>
          <p className="text-white/75">Email · your address</p>
          <p className="text-white/75">Visit · your city</p>
        </div>
      </section>
      <section className="px-8 py-10">
        <div className="mb-8 h-16 border border-black/80" />
        <p className="text-4xl tracking-wide">PORTFOLIO</p>
        <p className="mt-1 text-xs tracking-[0.2em] text-neutral-500">STUDIO SAMPLE</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Shot className="col-span-2 h-28" />
          <Shot className="h-24" />
          <Shot className="h-24" />
        </div>
      </section>
    </div>
  );
}

function DayFolio() {
  return (
    <div className="grid min-h-[34rem] bg-[#f3f3f3] text-black md:grid-cols-2">
      <section className="flex flex-col justify-end px-8 py-10">
        <div className="bg-black p-6 text-white">
          <p className="text-sm tracking-wide">Get in touch</p>
          <p className="mt-4 text-sm text-white/80">Phone · your number</p>
          <p className="text-sm text-white/80">Email · your address</p>
        </div>
      </section>
      <section className="bg-white px-8 py-10">
        <p className="text-4xl tracking-[0.18em]">PORTFOLIO</p>
        <div className="mt-8 grid grid-cols-[1.4fr_0.8fr] gap-3">
          <Shot className="row-span-2 h-52" />
          <div className="bg-black p-4 text-xs text-white">Project note</div>
          <Shot className="h-24" />
        </div>
      </section>
    </div>
  );
}

function Contents() {
  return (
    <div className="grid min-h-[34rem] bg-black text-white md:grid-cols-2">
      <section className="px-8 py-10">
        <h2 className="text-3xl">THE CONTENT</h2>
        <ul className="mt-8 space-y-4">
          {["01  Studio", "02  Houses", "03  Interiors", "04  Contact"].map((item) => (
            <li key={item} className="flex items-center gap-4 border-b border-white/20 pb-3 text-sm">
              <Shot className="h-12 w-16 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white px-8 py-10 text-black">
        <div className="mb-6 h-10 border border-black" />
        <h2 className="text-3xl">WELCOME</h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
          A short welcome.
          <br />
          Your own line goes here.
        </p>
        <Shot className="mt-8 h-40" />
      </section>
    </div>
  );
}

function ProjectCards() {
  return (
    <div className="grid min-h-[34rem] md:grid-cols-2">
      <section className="bg-[#ececec] p-6">
        <article className="bg-white p-4">
          <h3 className="text-lg">Project name</h3>
          <p className="mt-2 text-xs text-neutral-500">A one-line note about the work.</p>
        </article>
        <Shot className="mt-4 h-40" />
        <article className="mt-4 bg-black p-4 text-white">
          <h3 className="text-lg">Project name</h3>
          <p className="mt-2 text-xs text-white/70">Another sample card.</p>
        </article>
      </section>
      <section className="bg-black p-6 text-white">
        <p className="max-w-xs text-sm text-white/80">
          A dark page of project cards.
          <br />
          Photos sit beside the names.
        </p>
        <div className="mt-6 grid gap-3">
          <div className="grid grid-cols-[1fr_1.2fr] bg-white text-black">
            <Shot className="h-24" />
            <div className="p-3 text-sm">Project name</div>
          </div>
          <Shot className="h-28" />
          <div className="bg-white p-3 text-sm text-black">Project name</div>
        </div>
      </section>
    </div>
  );
}

function BigTitle() {
  return (
    <div className="grid min-h-[34rem] bg-black text-white md:grid-cols-2">
      <section className="px-8 py-10">
        <h2 className="max-w-xs text-4xl leading-tight">YOUR BIG TITLE</h2>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
          have we got your attention?
        </p>
        <div className="mt-8 grid grid-cols-[1fr_1fr] gap-3">
          <div>
            <p className="text-sm">Project name</p>
            <p className="mt-1 text-xs text-white/60">Short note</p>
          </div>
          <Shot className="h-24" />
        </div>
        <Shot className="mt-3 h-28" />
      </section>
      <section className="relative bg-[#1a1a1a] p-8">
        <div className="absolute right-8 top-8 h-16 w-24 border-r border-t border-white" />
        <Shot className="mt-16 h-64" />
        <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/70">A caption under the main picture.</p>
      </section>
    </div>
  );
}

function StudioGrid() {
  return (
    <div className="grid min-h-[34rem] bg-[#111] text-white md:grid-cols-2">
      <section className="flex flex-col justify-between p-8">
        <Shot className="h-40" />
        <div>
          <h2 className="max-w-xs text-4xl leading-tight">YOUR BIG TITLE</h2>
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Sample text under the title.
            <br />
            The pictures tell the real story.
          </p>
        </div>
      </section>
      <section className="grid gap-3 bg-black p-6">
        <div className="grid grid-cols-2 gap-3">
          <Shot className="h-28" />
          <div className="bg-white p-3 text-sm text-black">Project name</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 text-sm text-black">Project name</div>
          <Shot className="h-28" />
        </div>
        <Shot className="h-32" />
      </section>
    </div>
  );
}

function SplitWorks() {
  return (
    <div className="grid min-h-[34rem] md:grid-cols-2">
      <section className="bg-[#1b1b1b] px-8 py-10 text-white">
        <h2 className="text-3xl tracking-wide">STUDIO</h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
          A dark introduction.
          <br />
          The work sits opposite.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Shot className="h-28" />
          <Shot className="h-28" />
        </div>
      </section>
      <section className="bg-[#f2f2f2] px-8 py-10 text-black">
        <h2 className="text-3xl">OUR WORK</h2>
        <p className="mt-4 max-w-sm text-sm text-neutral-600">
          Two pictures.
          <br />
          A short line under each.
        </p>
        <div className="mt-6 grid gap-4">
          <Shot className="h-28" />
          <Shot className="h-28" />
        </div>
      </section>
    </div>
  );
}

const views: Record<LayoutId, () => ReactNode> = {
  "night-folio": NightFolio,
  "day-folio": DayFolio,
  contents: Contents,
  "project-cards": ProjectCards,
  "big-title": BigTitle,
  "studio-grid": StudioGrid,
  "split-works": SplitWorks,
};

export function LayoutPreview({ id }: { id: LayoutId }) {
  const View = views[id];
  return (
    <div className="overflow-hidden bg-[#dedede] shadow-sm">
      <View />
    </div>
  );
}
