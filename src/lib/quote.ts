import type { Outcome } from "./mix";

export const QUOTE_TO = "hello@ausapi.com.au";

export function quoteMailto(input: {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  outcome: Outcome;
}) {
  const subject = `Quote request – ${input.outcome.title}`;
  const body = [
    "New quote request from ausapi",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "",
    "",
    "Idea:",
    input.outcome.title,
    `${input.outcome.score}/10`,
    input.outcome.summary,
    input.outcome.verdictLine,
    "",
    ...input.outcome.pieces.map((p) => `${p.name}: ${p.job}`),
    "",
    input.notes ? `Their notes:\n${input.notes}` : "",
    "",
    "Reply with a rough cost and what’s included.",
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${QUOTE_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function layoutQuoteMailto(input: {
  layout: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}) {
  const subject = `Quote request – ${input.layout} layout`;
  const body = [
    "New layout quote from ausapi",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "",
    "",
    `Layout: ${input.layout}`,
    "",
    input.notes ? `Their notes:\n${input.notes}` : "",
    "",
    "Reply with a rough cost and what’s included.",
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${QUOTE_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
