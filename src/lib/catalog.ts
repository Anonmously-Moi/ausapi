import p0 from "../data/parts/00.json";
import p1 from "../data/parts/01.json";
import p2 from "../data/parts/02.json";
import p3 from "../data/parts/03.json";
import p4 from "../data/parts/04.json";
import p5 from "../data/parts/05.json";
import p6 from "../data/parts/06.json";
import p7 from "../data/parts/07.json";
import p8 from "../data/parts/08.json";

export type ApiEntry = {
  id: string;
  sheet: string;
  company: string;
  name: string;
  description: string;
  status: string;
  access: string;
  protocol: string;
  website: string;
  portal: string;
  docs: string;
  auth: string;
  pricing: string;
  industry: string;
  category: string;
  verified: string;
  priceBand: "Free" | "Paid" | "Partner";
};

const raw = [...p0, ...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7, ...p8];

export const apis = raw as ApiEntry[];

export const sheets = [...new Set(apis.map((a) => a.sheet))].sort();

export function getApi(id: string) {
  return apis.find((a) => a.id === id);
}

export function searchApis(opts: {
  q?: string;
  sheet?: string;
  band?: string;
  limit?: number;
}) {
  const q = (opts.q ?? "").trim().toLowerCase();
  const list = apis.filter((a) => {
    if (opts.sheet && opts.sheet !== "All" && a.sheet !== opts.sheet) return false;
    if (opts.band && opts.band !== "All" && a.priceBand !== opts.band) return false;
    if (!q) return true;
    const blob = `${a.company} ${a.name} ${a.description} ${a.category} ${a.auth} ${a.sheet}`.toLowerCase();
    return blob.includes(q);
  });
  const limit = opts.limit ?? list.length;
  return { total: list.length, items: list.slice(0, limit) };
}
