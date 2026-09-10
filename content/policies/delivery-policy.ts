import { PolicyDocSchema, type PolicyDoc } from "@/lib/schema";

export const deliveryPolicy: PolicyDoc = PolicyDocSchema.parse({
  slug: "delivery-policy",
  title: "Delivery Policy",
  summary:
    "How and when Finquanta delivers licences, TDL modules, and implementation services.",
  lastUpdated: "2026-04-01",
  intro:
    "Finquanta is primarily a services business — most of what we deliver is digital or onsite-effort, not a physical shipment. This policy sets expectations for each delivery type.",
  sections: [
    {
      heading: "Tally licence delivery",
      body: [
        "Once payment and activation details are received, Tally serial numbers and activation keys are emailed within 1 business day.",
        "On-call activation support is included — a Finquanta engineer joins a remote session with you to complete licence activation.",
      ],
    },
    {
      heading: "TDL modules & add-ons",
      body: [
        "TDL files are delivered electronically via encrypted download link, valid for 7 days from purchase.",
        "Installation guidance is provided in the form of a PDF install guide + one optional 30-minute remote install session.",
      ],
    },
    {
      heading: "Implementation timelines",
      body: [
        "Starter-tier implementations: 1–2 weeks from kick-off.",
        "Growth-tier implementations: 3–5 weeks including user training.",
        "Enterprise / multi-branch / custom TDL: 6–12 weeks, as scoped in the Statement of Work.",
        "Timelines run from kick-off — the date we receive a signed SoW, the advance payment, and any required access credentials.",
      ],
    },
    {
      heading: "Onsite visits",
      body: [
        "Onsite visits in Mumbai, Thane, and Navi Mumbai are typically scheduled within 48 hours of a raised ticket under active AMC cover.",
        "Outside Mumbai metropolitan region, visits may involve additional travel costs, quoted in advance and confirmed before the visit.",
      ],
    },
    {
      heading: "Delivery failures",
      body: [
        "If we miss a delivery date in writing, we notify you as soon as we know and commit a revised date in the same message. Repeated missed dates without adequate explanation trigger the refund path under our Refund Policy.",
      ],
    },
    {
      heading: "International customers",
      body: [
        "Finquanta primarily serves customers in India. For overseas engagements we deliver remotely only; onsite visits outside India are not currently offered.",
      ],
    },
  ],
});
