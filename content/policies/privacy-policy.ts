import { PolicyDocSchema, type PolicyDoc } from "@/lib/schema";

export const privacyPolicy: PolicyDoc = PolicyDocSchema.parse({
  slug: "privacy-policy",
  title: "Privacy Policy",
  summary:
    "How Finquanta collects, uses, stores, and shares personal information from customers, partners, and website visitors.",
  lastUpdated: "2026-04-01",
  intro:
    "Finquanta Solutions India Private Limited (\"Finquanta\", \"we\", \"us\") respects your privacy. This policy describes what information we collect when you use our website, hire our services, or attend our events — and what we do with that information.",
  sections: [
    {
      heading: "Who this policy applies to",
      body: [
        "This policy applies to visitors to finquanta.example and any Finquanta-hosted sub-domain, customers who have engaged Finquanta for Tally implementation or ongoing services, and attendees of Finquanta events.",
        "It does not apply to information collected by third parties (such as Tally Solutions Pvt. Ltd.) to whom we may refer you; their own privacy policies govern that relationship.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "Contact information you give us voluntarily — name, phone, email, business name, and the details of your enquiry.",
        "Engagement information — the systems we configure for you, the tickets you raise, and the documents you share during delivery.",
        "Website analytics — page views, referrer, device type. Anonymised where possible.",
        "We do not collect sensitive personal data (Aadhaar, PAN, financial credentials) unless a specific engagement requires it, in which case we tell you in writing and obtain separate consent.",
      ],
    },
    {
      heading: "How we use the information",
      body: [
        "To respond to enquiries, deliver quotes, and run engagements you have contracted us for.",
        "To send you occasional updates on Tally releases, events, and Finquanta services — you can opt out any time.",
        "To improve our website and measure which content is actually useful, using anonymised analytics.",
        "We do not sell or rent your data. Period.",
      ],
    },
    {
      heading: "How we share",
      body: [
        "With Tally Solutions, for the strict purpose of activating or renewing your licence.",
        "With our infrastructure sub-processors (cloud hosting, email delivery, analytics) under written confidentiality agreements.",
        "When required by law — court orders, regulatory demands — after verifying the legitimacy of the request.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Enquiry records: up to 24 months after last contact.",
        "Active-engagement records: for the duration of the engagement + 7 years thereafter (for statutory audit reasons).",
        "Analytics: aggregated anonymous data, kept indefinitely; raw identifiable data purged every 14 months.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask to see, correct, export, or delete any personal information we hold about you.",
        "Write to us at sandiputekar.tally@gmail.com with your request; we respond within 30 days.",
      ],
    },
    {
      heading: "Contact",
      body: [
        "Questions about this policy go to Sandip Utekar, Director — sandiputekar.tally@gmail.com or +91 99120 37912 3.",
      ],
    },
  ],
});
