import raw from "../data/apis.json";

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
