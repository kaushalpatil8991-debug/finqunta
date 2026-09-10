import { PolicyDocSchema, type PolicyDoc } from "@/lib/schema";

export const refundPolicy: PolicyDoc = PolicyDocSchema.parse({
  slug: "refund-policy",
  title: "Refund Policy",
  summary:
    "When Finquanta's services are refundable, when they are not, and how to request a refund.",
  lastUpdated: "2026-04-01",
  intro:
    "We want every engagement with Finquanta to end well. If we have failed to deliver what we promised in writing, here is how you get a fair refund.",
  sections: [
    {
      heading: "Tally licences (non-refundable)",
      body: [
        "Once a Tally licence is activated on your machine, it is non-refundable — this is Tally's own policy and we cannot override it.",
        "If a Tally licence is ordered but not yet activated, you may cancel within 7 days for a full refund, net of any payment-gateway charges.",
      ],
    },
    {
      heading: "Implementation & consulting",
      body: [
        "If we have not started work, you may cancel any engagement within 7 days of signing for a full refund of the advance, less payment-gateway charges.",
        "Once work has started, refunds are pro-rata — you pay only for the work completed up to the cancellation date, as measured against the written milestone list.",
        "If Finquanta has failed to meet a material milestone after a reasonable correction window (usually 14 days), you may cancel and receive a pro-rata refund of fees paid for that milestone forward.",
      ],
    },
    {
      heading: "AMC & support contracts",
      body: [
        "AMC contracts are refundable on a pro-rata basis for the unused portion, less a 15% administrative charge, with 30 days' written notice.",
        "If we have breached the SLA in writing and failed to cure within 30 days, the administrative charge is waived.",
      ],
    },
    {
      heading: "Add-ons, boosters, TDL modules",
      body: [
        "TDL and add-on purchases carry a 15-day money-back guarantee from date of install, provided the add-on is fully uninstalled and proof of uninstallation is supplied.",
        "Custom-built TDL on Statement of Work is not refundable once acceptance criteria are met.",
      ],
    },
    {
      heading: "How to request a refund",
      body: [
        "Email sandiputekar.tally@gmail.com with the subject \"Refund request — [your company name]\", your invoice number, and the reason.",
        "We acknowledge within 2 business days and complete the refund within 14 business days once approved. Refunds are made to the original payment method.",
      ],
    },
    {
      heading: "Taxes and statutory charges",
      body: [
        "GST already remitted to the government on refunded services is adjusted via a credit note on your next invoice, or refunded to the account used to pay it, whichever is faster under prevailing law.",
      ],
    },
  ],
});
