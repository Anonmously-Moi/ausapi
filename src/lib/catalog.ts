import p0 from "../data/parts/00.json";
import p1 from "../data/parts/01.json";
import p2 from "../data/parts/02.json";
import p3 from "../data/parts/03.json";
import p4 from "../data/parts/04.json";
import p5 from "../data/parts/05.json";
import p6 from "../data/parts/06.json";
import p7 from "../data/parts/07.json";
import p8 from "../data/parts/08.json";
import p9 from "../data/parts/09.json";
import p10 from "../data/parts/10.json";
import p11 from "../data/parts/11.json";
import p12 from "../data/parts/12.json";
import p13 from "../data/parts/13.json";
import p14 from "../data/parts/14.json";
import p15 from "../data/parts/15.json";
import p16 from "../data/parts/16.json";
import p17 from "../data/parts/17.json";
import p18 from "../data/parts/18.json";
import p19 from "../data/parts/19.json";
import p20 from "../data/parts/20.json";
import p21 from "../data/parts/21.json";
import p22 from "../data/parts/22.json";
import p23 from "../data/parts/23.json";
import p24 from "../data/parts/24.json";
import p25 from "../data/parts/25.json";
import p26 from "../data/parts/26.json";
import p27 from "../data/parts/27.json";
import p28 from "../data/parts/28.json";
import p29 from "../data/parts/29.json";

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

const raw = [
  ...p0, ...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7, ...p8, ...p9,
  ...p10, ...p11, ...p12, ...p13, ...p14, ...p15, ...p16, ...p17, ...p18, ...p19,
  ...p20, ...p21, ...p22, ...p23, ...p24, ...p25, ...p26, ...p27, ...p28, ...p29,
];

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
