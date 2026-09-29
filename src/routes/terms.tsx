import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Shell } from "@/components/shell";
import { QUOTE_TO } from "@/lib/quote";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <Shell>
      <h1 className="font-display text-4xl">Terms</h1>
      <p className="mt-3 text-sm text-muted">29 September 2026. Plain-language terms for using ausapi.</p>
      <div className="mt-8 max-w-2xl space-y-8 leading-relaxed">
        <Section title="What ausapi is">
          ausapi is a directory and a way to ask for something to be built. The person behind this site makes that
          product. They are not the bank, the government agency, the software vendor, or the security company listed
          on a page.
        </Section>
        <Section title="Accounts and partnerships are yours">
          Any account, API key, sandbox, contract, or partnership with a third party is your responsibility. You
          apply, you pay their fees, you accept their terms, and you keep the credentials safe. If they refuse you,
          suspend you, or change their price, that is between you and them. ausapi does not open those accounts for
          you and does not guarantee you will be approved.
        </Section>
        <Section title="What a build includes">
          If you ask for a quote and later agree a price, the work is to make the product you described: the site or
          app, and the wiring to APIs you already have access to. It is not a reseller agreement, a managed security
          service, or a partnership with those API providers. You remain the customer of each provider.
        </Section>
        <Section title="Listings and the Experiment">
          Listings are checked where a public source exists. They can be wrong, incomplete, or out of date. The
          Experiment suggests an idea and a rough score. It is not a specification, a promise that the idea will sell,
          or advice that an API is safe to use in your situation.
        </Section>
        <Section title="Your use of the site">
          Don’t misuse the site, don’t try to break it, and don’t use a listing to do something the API provider
          forbids. You are responsible for complying with each provider’s terms and with laws that apply to you,
          including privacy and security duties if you collect other people’s data.
        </Section>
        <Section title="Security">
          Builds are made to careful security practices, including ideas from OWASP, the Essential Eight, the ISM, and
          the themes behind ISO 27001 and SOC 2. That is not a certification. ausapi is not your security monitor and
          does not watch your site after it is handed over unless a separate written agreement says so.
        </Section>
        <Section title="Quotes">
          A quote is an estimate until you and ausapi agree the scope and price in writing (email is enough). Directory
          use is free. Paying a provider for API access is separate and is your cost.
        </Section>
        <Section title="Liability">
          The directory is provided as available. To the extent the law allows, ausapi is not liable for losses caused
          by a third-party API, a wrong listing, or an idea from the Experiment. Nothing here excludes rights you
          cannot sign away under the Australian Consumer Law.
        </Section>
        <Section title="Law">
          These terms are governed by the laws of Australia. Questions:{" "}
          <a className="text-accent underline" href={`mailto:${QUOTE_TO}`}>
            {QUOTE_TO}
          </a>
          .
        </Section>
      </div>
    </Shell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-ink">{children}</p>
    </section>
  );
}
