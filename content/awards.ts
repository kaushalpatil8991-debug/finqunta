import { AwardSchema, type Award } from "@/lib/schema";
import { z } from "zod";

/**
 * 6 plausible generic awards. PLACEHOLDER badges — replace with real
 * award titles, years, and issuers before launch. Spec §4.3.
 */
const raw: Award[] = [
  {
    id: "a-tally-excellence-2024",
    isPlaceholder: true,
    title: "Tally Excellence Partner",
    year: 2024,
    issuer: "Tally Solutions",
    description: "Recognised for sustained excellence in Tally implementation and customer service across the western region.",
  },
  {
    id: "a-customer-success-2023",
    isPlaceholder: true,
    title: "Outstanding Customer Success",
    year: 2023,
    issuer: "Western Region Partners Forum",
    description: "Highest customer-retention and satisfaction scores in the partner network for the financial year.",
  },
  {
    id: "a-rapid-growth-2024",
    isPlaceholder: true,
    title: "Rapid Growth Partner",
    year: 2024,
    issuer: "Tally Solutions",
    description: "Among the fastest-growing partners by net new business onboarded year-on-year.",
  },
  {
    id: "a-integration-2023",
    isPlaceholder: true,
    title: "Integration Specialist of the Year",
    year: 2023,
    issuer: "Tally Solutions Partner Awards",
    description: "Awarded for delivering complex Tally integrations across e-commerce, banking, and ERP platforms.",
  },
  {
    id: "a-client-delight-2024",
    isPlaceholder: true,
    title: "Client Delight Award",
    year: 2024,
    issuer: "SME Excellence Forum",
    description: "Top-rated by SMEs for support responsiveness, training quality, and project delivery.",
  },
  {
    id: "a-tdl-developer-2023",
    isPlaceholder: true,
    title: "Top TDL Developer — Western Region",
    year: 2023,
    issuer: "Tally Solutions",
    description: "Recognised for the volume and complexity of custom TDL solutions deployed for SME customers.",
  },
];

export const awards = z.array(AwardSchema).parse(raw);
