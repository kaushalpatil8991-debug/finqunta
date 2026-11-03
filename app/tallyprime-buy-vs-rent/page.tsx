import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaBand } from "@/components/page/cta-band";

export const metadata: Metadata = {
  title: "Buy or rent TallyPrime? Cost over 1 to 6 years",
  description:
    "TallyPrime Silver and Gold: lifetime licence vs rental, year by year. Buying and renting cost the same by year 5; from year 6 buying is cheaper. Prices from Tally Solutions.",
  alternates: { canonical: "/tallyprime-buy-vs-rent" },
};

/**
 * Every price below is Tally Solutions' published figure, before 18% GST.
 * Source: tallysolutions.com/tally/tallyprime-pricing-for-seasonal-businesses/
 * (checked 31 Oct 2026). Update here if Tally changes its prices; the
 * year-by-year totals are calculated, not typed.
 */
const SOURCE_URL = "https://tallysolutions.com/tally/tallyprime-pricing-for-seasonal-businesses/";
const CHECKED = "31 October 2026";

const EDITIONS = [
  { id: "silver", name: "Silver", who: "One user on one computer", buy: 22500, tss: 4500, rentYear: 8100, rentMonth: 750, rent3: 2138 },
  { id: "gold", name: "Gold", who: "Several users at once on your office network", buy: 67500, tss: 13500, rentYear: 24300, rentMonth: null, rent3: null },
] as const;

const YEARS = [1, 2, 3, 4, 5, 6];
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
// Lifetime licence includes the first year of TSS; renewing TSS each year after that.
const buyTotal = (e: (typeof EDITIONS)[number], y: number) => e.buy + e.tss * (y - 1);
const rentTotal = (e: (typeof EDITIONS)[number], y: number) => e.rentYear * y;

const SAME_OR_DIFFERENT: { point: string; buy: string; rent: string; buyOk: boolean; rentOk: boolean }[] = [
  { point: "Features", buy: "Full TallyPrime", rent: "Same features as buying", buyOk: true, rentOk: true },
  { point: "If you stop paying", buy: "Licence never expires; keeps working", rent: "Stops working until you renew; your data stays on your computer", buyOk: true, rentOk: false },
  { point: "GST, e-invoice, e-way bill updates", buy: "Need TSS renewed each year after the first", rent: "Included while the rental is active", buyOk: false, rentOk: true },
  { point: "Upfront cost", buy: "Full licence price on day one", rent: "Pay monthly, quarterly or yearly", buyOk: false, rentOk: true },
  { point: "Switching later", buy: "Nothing to switch: you own it", rent: "Can switch to buying any time; rent already paid is not credited", buyOk: true, rentOk: false },
];

export default function BuyVsRentPage() {
  return (
    <>
      <PageHero
        title="Buy TallyPrime or rent it?"
        sub="Same software either way. Renting costs less in the first years; buying costs less if you keep Tally for more than five. Here are the numbers, year by year."
        gradient="plum"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pricing", href: "/tallyprime-pricing" },
          { label: "Buy or rent" },
        ]}
      />

      <SectionBand tone="cream">
        <SectionHeader
          title="The short answer"
          lead="Renting and buying cost the same by year 5 for both Silver and Gold. If you will use Tally for six years or more, buy. If you are trying Tally out, run a seasonal business, or are not sure you'll be on it in five years, rent."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {EDITIONS.map((e) => (
            <div key={e.id} className="rounded-xl bg-[var(--fq-card)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h3 className="text-h3 font-extrabold text-ink">{e.name}</h3>
              <p className="text-body-sm text-ink-500">{e.who}</p>
              <dl className="mt-6 grid gap-3 text-body">
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
                  <dt className="text-ink-700">Buy (lifetime licence, 1st year of updates included)</dt>
                  <dd className="shrink-0 font-bold tabular-nums text-ink">{inr(e.buy)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
                  <dt className="text-ink-700">Updates (TSS) from year 2</dt>
                  <dd className="shrink-0 font-bold tabular-nums text-ink">{inr(e.tss)} / year</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
                  <dt className="text-ink-700">Rent, 12 months</dt>
                  <dd className="shrink-0 font-bold tabular-nums text-ink">{inr(e.rentYear)}</dd>
                </div>
                {e.rent3 ? (
                  <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
                    <dt className="text-ink-700">Rent, 3 months</dt>
                    <dd className="shrink-0 font-bold tabular-nums text-ink">{inr(e.rent3)}</dd>
                  </div>
                ) : null}
                {e.rentMonth ? (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink-700">Rent, 1 month</dt>
                    <dd className="shrink-0 font-bold tabular-nums text-ink">{inr(e.rentMonth)}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[75ch] text-body-sm text-ink-500">
          All prices before 18% GST, as published by Tally Solutions (
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline-offset-4 hover:underline">
            source
          </a>
          , checked {CHECKED}). Finquanta sells at these prices; setup and training are quoted separately.
        </p>
      </SectionBand>

      <SectionBand tone="white">
        <SectionHeader
          title="What you pay in total, year by year"
          lead="Buying = licence + TSS renewed every year from year 2. Renting = 12-month rental renewed every year. The cheaper option each year is in bold."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {EDITIONS.map((e) => (
            <div key={e.id} className="min-w-0 overflow-x-auto rounded-xl bg-[var(--fq-card)] shadow-[var(--shadow-card)]">
              <table className="w-full text-left text-body-sm tabular-nums sm:text-body">
                <caption className="px-4 sm:px-6 pt-5 text-left text-h4 font-extrabold text-ink">{e.name}</caption>
                <thead>
                  <tr className="border-b border-hairline text-body-sm text-ink-500">
                    <th scope="col" className="px-4 sm:px-6 py-3 font-bold">After</th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-right font-bold">Buy</th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-right font-bold">Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {YEARS.map((y) => {
                    const b = buyTotal(e, y);
                    const r = rentTotal(e, y);
                    return (
                      <tr key={y} className="border-b border-hairline last:border-0">
                        <th scope="row" className="whitespace-nowrap px-4 py-3 font-bold text-ink sm:px-6">
                          {y} {y === 1 ? "year" : "years"}
                        </th>
                        <td className={`px-4 sm:px-6 py-3 text-right ${b < r ? "font-extrabold text-ink" : "text-ink-500"}`}>{inr(b)}</td>
                        <td className={`px-4 sm:px-6 py-3 text-right ${r < b ? "font-extrabold text-ink" : "text-ink-500"}`}>
                          {inr(r)}
                          {r === b ? <span className="ml-1.5 text-caption font-bold text-primary sm:ml-2">same</span> : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </SectionBand>

      <SectionBand tone="cream">
        <SectionHeader title="What is the same, and what is different" />
        {/* Phones: one card per point, Buy and Rent stacked. */}
        <ul className="mt-8 grid gap-3 md:hidden">
          {SAME_OR_DIFFERENT.map((row) => (
            <li key={row.point} className="rounded-lg bg-[var(--fq-card)] p-5">
              <p className="text-body font-bold text-ink">{row.point}</p>
              <dl className="mt-3 grid gap-2 text-body-sm text-ink-700">
                {(
                  [
                    ["Buy", row.buy, row.buyOk],
                    ["Rent", row.rent, row.rentOk],
                  ] as const
                ).map(([label, text, ok]) => (
                  <div key={label} className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-2">
                    <dt className="font-bold text-ink-500">{label}</dt>
                    <dd className="flex gap-2">
                      {ok ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-label="Advantage" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" aria-label="Drawback" />
                      )}
                      <span>{text}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <div className="mt-10 hidden min-w-0 overflow-x-auto rounded-xl bg-[var(--fq-card)] shadow-[var(--shadow-card)] md:block">
          <table className="w-full text-left text-body">
            <thead>
              <tr className="border-b border-hairline text-body-sm text-ink-500">
                <th scope="col" className="px-6 py-3 font-bold"><span className="sr-only">Point</span></th>
                <th scope="col" className="px-6 py-3 font-bold">Buy</th>
                <th scope="col" className="px-6 py-3 font-bold">Rent</th>
              </tr>
            </thead>
            <tbody>
              {SAME_OR_DIFFERENT.map((row) => (
                <tr key={row.point} className="border-b border-hairline align-top last:border-0">
                  <th scope="row" className="px-6 py-4 font-bold text-ink">{row.point}</th>
                  {[
                    [row.buy, row.buyOk],
                    [row.rent, row.rentOk],
                  ].map(([text, ok], i) => (
                    <td key={i} className="px-6 py-4 text-ink-700">
                      <span className="flex gap-2">
                        {ok ? (
                          <Check className="mt-1 h-4 w-4 shrink-0 text-success" aria-label="Advantage" />
                        ) : (
                          <X className="mt-1 h-4 w-4 shrink-0 text-ink-300" aria-label="Drawback" />
                        )}
                        <span>{text as string}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-[70ch] text-body-sm text-ink-500">
          Without TSS, a bought licence keeps working, but GST and e-invoicing updates, e-way bills, connected
          banking and new versions stop. For a GST-registered business that usually means renewing TSS every year,
          which is why the totals above include it.
        </p>
      </SectionBand>

      <CtaBand
        title="Not sure which one fits your business?"
        sub="Book a 20-minute call. Tell us your team size and how long you expect to use Tally, and we'll tell you which works out cheaper for you."
        source="enquiry"
      />
    </>
  );
}
