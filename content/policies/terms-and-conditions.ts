import { PolicyDocSchema, type PolicyDoc } from "@/lib/schema";

export const termsAndConditions: PolicyDoc = PolicyDocSchema.parse({
  slug: "terms-and-conditions",
  title: "Terms & Conditions",
  summary:
    "The terms that govern your use of Finquanta's website and services. Engagement-specific terms live in the signed contract for each project.",
  lastUpdated: "2026-04-01",
  intro:
    "By visiting finquanta.example or engaging Finquanta Solutions India Private Limited for any service, you agree to these Terms & Conditions. They are structured to be plain-English; the signed contract for a specific engagement prevails where it differs.",
  sections: [
    {
      heading: "Use of this website",
      body: [
        "The content on finquanta.example is for informational purposes. Nothing on the site is a binding offer unless explicitly issued by Finquanta as a written quote.",
        "You agree not to attempt to probe, scan, or interfere with the normal operation of the website.",
        "Finquanta owns the copyright in all website content, code, images, and branding. You may share excerpts with attribution; you may not republish the site or substantial portions without written permission.",
      ],
    },
    {
      heading: "Quotes and engagement",
      body: [
        "A written Finquanta quote is valid for 30 days unless stated otherwise. After 30 days, we may re-quote based on current pricing.",
        "Engagement begins when you return a signed copy of the quote (or our standard Service Agreement, for longer engagements) and pay the advance amount mentioned therein.",
        "All engagements are covered by a written Service Agreement or Statement of Work that lists scope, timeline, deliverables, change-control, and payment milestones.",
      ],
    },
    {
      heading: "Third-party software",
      body: [
        "TallyPrime and related Tally products are owned by Tally Solutions Pvt. Ltd. Your use of Tally products is governed by Tally's own EULA, not by these terms.",
        "We resell Tally licences as an authorised Tally Partner; we do not grant you any additional rights in the Tally product itself.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "Finquanta's total liability for any engagement is capped at the fees paid to Finquanta under that engagement during the preceding 12 months.",
        "We are not liable for indirect, consequential, or incidental damages, including lost profits or lost data, except in cases of gross negligence or wilful misconduct.",
        "We are not responsible for outages, bugs, or limitations in Tally or any third-party software we deploy on your behalf.",
      ],
    },
    {
      heading: "Confidentiality",
      body: [
        "Both Finquanta and the customer treat each other's confidential information with care. Our engineers sign confidentiality agreements on joining; we extend the same obligations to any sub-processors we use.",
        "Confidentiality obligations survive the end of an engagement.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra.",
      ],
    },
    {
      heading: "Changes to these terms",
      body: [
        "We may update these terms from time to time; the date at the top will change. For material changes we will notify active customers by email at least 30 days ahead.",
      ],
    },
  ],
});
