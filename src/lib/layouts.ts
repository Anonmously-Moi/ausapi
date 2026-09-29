export type LayoutId =
  | "night-folio"
  | "day-folio"
  | "contents"
  | "project-cards"
  | "big-title"
  | "studio-grid"
  | "split-works";

export type LayoutInfo = {
  id: LayoutId;
  name: string;
  blurb: string;
};

export const layouts: LayoutInfo[] = [
  { id: "night-folio", name: "Night folio", blurb: "Black contact page beside a white project grid." },
  { id: "day-folio", name: "Day folio", blurb: "Pale page with a black contact block and project tiles." },
  { id: "contents", name: "Contents", blurb: "A contents list on the left and a welcome panel on the right." },
  { id: "project-cards", name: "Project cards", blurb: "Named project cards over light and dark panels." },
  { id: "big-title", name: "Big title", blurb: "One large title, then a wide picture and two projects." },
  { id: "studio-grid", name: "Studio grid", blurb: "A big title under a row of project pictures." },
  { id: "split-works", name: "Split works", blurb: "Dark introduction on the left, selected work on the right." },
];

export function getLayout(id: string) {
  return layouts.find((layout) => layout.id === id);
}
