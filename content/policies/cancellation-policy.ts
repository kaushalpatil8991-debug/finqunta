import { PolicyDocSchema, type PolicyDoc } from "@/lib/schema";

export const cancellationPolicy: PolicyDoc = PolicyDocSchema.parse({
  slug: "cancellation-policy",
  title: "Cancellation Policy",
  summary:
    "How you can cancel ongoing engagements, AMC contracts, and scheduled services.",
  lastUpdated: "2026-04-01",
  intro:
    "You can cancel any engagement at any time. This policy sets out the notice periods and money-side of cancellation for each engagement type. It works alongside our Refund Policy.",
  sections: [
    {
      heading: "Project engagements",
      body: [
        "Implementation and consulting projects may be cancelled at any time with written notice.",
        "You pay for work completed to the cancellation date, plus any third-party costs Finquanta has already incurred on your behalf (licences, cloud capacity, etc.).",
        "If we hold pre-paid advances in excess of work-to-date, the excess is refunded per the Refund Policy.",
      ],
    },
    {
      heading: "AMC & support contracts",
      body: [
        "AMC contracts run for a fixed term (typically 12 months). Either party may terminate the next renewal by giving 30 days' written notice before the renewal date.",
        "Mid-term cancellation by the customer is allowed with 30 days' notice; the unused portion is refunded pro-rata less a 15% administrative charge.",
        "Mid-term cancellation by Finquanta, other than for material breach, is refunded in full (unused portion, no administrative charge).",
      ],
    },
    {
      heading: "Scheduled training & workshops",
      body: [
        "Public webinars and workshops: free to cancel any time before the session.",
        "Private onsite training: no cancellation fee if cancelled 7+ days in advance. A 50% fee applies if cancelled 1–6 days in advance. Full fee applies on no-show with zero notice.",
      ],
    },
    {
      heading: "Tally licence orders",
      body: [
        "Tally licence orders may be cancelled within 7 days, provided the licence has not yet been activated. Refund is full amount less payment-gateway charges.",
        "Once activated, Tally licences are non-refundable — this is Tally's policy.",
      ],
    },
    {
      heading: "How to cancel",
      body: [
        "Send a written email to sandiputekar.tally@gmail.com with your company name, invoice / contract number, and desired cancellation date.",
        "We acknowledge within 2 business days and confirm the final reconciliation within 10 business days.",
      ],
    },
  ],
});
