import type { ApiEntry } from "./catalog";

export type Verdict = "excellent" | "ok" | "whacky";

export type Outcome = {
  title: string;
  summary: string;
  verdict: Verdict;
  verdictLine: string;
  score: number;
  pieces: { name: string; job: string }[];
};

const VERDICT_LINE: Record<Verdict, string> = {
  excellent: "This is an excellent idea. People already pay for this kind of thing.",
  ok: "This is an okay idea. Useful, not flashy — fine as a first version.",
  whacky: "Though I don’t think anyone would want this.",
};

type Tag =
  | "payments"
  | "maps"
  | "email"
  | "identity"
  | "weather"
  | "accounting"
  | "build"
  | "gov"
  | "ai"
  | "security"
  | "shipping"
  | "speech"
  | "crm"
  | "property";

function tagsOf(a: ApiEntry): Set<Tag> {
  const t = `${a.sheet} ${a.category} ${a.name} ${a.company}`.toLowerCase();
  const tags = new Set<Tag>();
  const add = (tag: Tag, hit: boolean) => {
    if (hit) tags.add(tag);
  };
  add("payments", /stripe|paypal|afterpay|\bpayment|billing|bnpl/.test(t));
  add("maps", /\bmap|geocod|nominatim|\broute|postcode/.test(t));
  add("email", /sendgrid|mailgun|postmark|\bemail|klaviyo|mailchimp/.test(t));
  add("identity", /\bauth|kyc|okta|cognito|identity|hibp|onfido/.test(t));
  add("weather", /weather|meteo|\bbom\b|climate|silo/.test(t));
  add("accounting", /xero|myob|invoice|accounting/.test(t));
  add("build", /tradie|construct|buildxact|procore|estimat|permit|nabers/.test(t));
  add("gov", a.sheet === "Government" || /data\.gov|open data|planning portal/.test(t));
  add("ai", a.sheet === "AI" || /\bllm|openai|claude|gemini|copilot|leonardo/.test(t));
  add("security", a.sheet === "Cybersecurity" || /cyber|virustotal|sentinel|mssp|mdr/.test(t));
  add("shipping", /auspost|sendle|startrack|parcel|shipping/.test(t));
  add("speech", /speech|transcri|\btts\b|\bstt\b|deepgram/.test(t));
  add("crm", /hubspot|salesforce|\bcrm\b/.test(t));
  add("property", a.sheet === "Property" || /proptrack|corelogic|cotality|domain listings/.test(t));
  return tags;
}

function jobOf(a: ApiEntry): string {
  const text = (a.description || a.category || a.sheet).replace(/\s+/g, " ").trim();
  const sentence = text.split(/(?<=\.)\s/)[0] ?? text;
  return sentence.length > 140 ? `${sentence.slice(0, 137)}…` : sentence || "Does one specific job.";
}

function jobsLine(pieces: Outcome["pieces"]) {
  const jobs = pieces.map((p) => p.job.replace(/\.$/, ""));
  if (jobs.length === 1) return lowerFirst(jobs[0]);
  if (jobs.length === 2) {
    return `${lowerFirst(jobs[0])}. On the same page, it would ${lowerFirst(jobs[1])}`;
  }
  return `${lowerFirst(jobs[0])}. Then it would ${lowerFirst(jobs[1])}. And also ${lowerFirst(jobs[2])}`;
}

function shortName(a: ApiEntry) {
  const name = a.name.replace(/\s+API$/i, "").trim();
  return name.length > 42 ? `${name.slice(0, 40)}…` : name;
}

function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function mixOutcome(picked: ApiEntry[]): Outcome | null {
  if (picked.length === 0) return null;
  const pieces = picked.map((a) => ({ name: a.name, job: jobOf(a) }));
  const tags = new Set<Tag>();
  for (const a of picked) for (const t of tagsOf(a)) tags.add(t);
  const has = (t: Tag) => tags.has(t);

  const make = (title: string, summary: string, verdict: Verdict, score: number): Outcome => ({
    title,
    summary,
    verdict,
    verdictLine: VERDICT_LINE[verdict],
    score,
    pieces,
  });

  if (has("build") && has("maps") && has("payments")) {
    return make(
      "Tradie quote, then a deposit",
      "A builder prices the job, pins the site on a map, and takes a deposit. One small app, three steps.",
      "excellent",
      9,
    );
  }
  if (has("accounting") && has("payments")) {
    return make(
      "Invoice, then get paid",
      "Send the invoice from the books and take the payment in the same flow, so nobody retypes the amount.",
      "excellent",
      9,
    );
  }
  if (has("shipping") && has("payments")) {
    return make(
      "A small shop that ships",
      "The customer pays, then a parcel is booked. Checkout and postage, nothing else.",
      "excellent",
      9,
    );
  }
  if (has("build") && has("maps")) {
    return make(
      "Quotes tied to a real address",
      "Estimates or jobs attached to a mapped site, so the quote is about a place, not just a name.",
      "ok",
      7,
    );
  }
  if (has("identity") && has("security")) {
    return make(
      "Sign-in with a safety check",
      "People log in, and known-bad passwords or a security feed can block the risky ones.",
      "ok",
      7,
    );
  }
  if (has("speech") && has("ai")) {
    return make(
      "Talk to one task",
      "Someone speaks, a model answers that one job, and you can read the reply back.",
      "ok",
      7,
    );
  }
  if (has("weather") && (has("build") || has("property"))) {
    return make(
      "Will the site be workable tomorrow?",
      "A job or a property, with the forecast beside it, so a crew can decide whether to turn up.",
      "ok",
      7,
    );
  }
  if (has("ai") && has("crm")) {
    return make(
      "Draft the reply, a person sends it",
      "Pull the customer record and draft a note or email. A human still checks it before it goes out.",
      "ok",
      7,
    );
  }

  if (picked.length === 1) {
    return make(shortName(picked[0]), `A single screen that does this: ${lowerFirst(pieces[0].job.replace(/\.$/, ""))}.`, "ok", 6);
  }
  const sheets = new Set(picked.map((a) => a.sheet));
  const line = jobsLine(pieces);
  if (sheets.size === 1) {
    const area = picked[0].sheet.toLowerCase();
    return make(
      `A ${area} screen`,
      `One ${area} page. It would ${line}. Same kind of question, so they belong together.`,
      "ok",
      7,
    );
  }
  const title =
    picked.length === 2
      ? `${shortName(picked[0])} meets ${shortName(picked[1])}`
      : `${shortName(picked[0])}, with ${shortName(picked[1])} and ${shortName(picked[2])}`;
  return make(title, `One odd little product. It would ${line}.`, "whacky", sheets.size >= 3 ? 3 : 4);
}
