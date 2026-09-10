import { HeroSlideSchema, type HeroSlide } from "@/lib/schema";
import { z } from "zod";

const raw: HeroSlide[] = [
  {
    id: "tally-prime-impl",
    isPlaceholder: true,
    eyebrow: "Tally Prime, done right",
    heading: "Tally Prime — implemented the Finquanta way.",
    sub: "Industry-aware setup, masters and ledgers structured for your business, and zero data-loss migration from your previous version.",
    primaryCta: { label: "Talk to expert", href: "#talk", opensModal: "talk" },
    secondaryCta: { label: "Know more", href: "#offerings" },
    gradient: "plum",
    art: "arcs",
  },
  {
    id: "tally-on-cloud",
    isPlaceholder: true,
    eyebrow: "Tally on Cloud",
    heading: "Run Tally anywhere — any device, 24×7.",
    sub: "Hosted in Indian data centres with daily auto-backup, multi-user concurrency, and bank-grade encryption. No servers to babysit.",
    primaryCta: { label: "Free demo", href: "#talk", opensModal: "talk" },
    secondaryCta: { label: "Learn more", href: "#cloud" },
    gradient: "mist",
    art: "orbit",
  },
  {
    id: "gst-tds-compliance",
    isPlaceholder: true,
    eyebrow: "Compliance, simplified",
    heading: "GST, TDS, and compliance — on autopilot.",
    sub: "Auto-prepared returns, e-invoice generation, and TDS reconciliation built into your Tally workflow.",
    primaryCta: { label: "Get a quote", href: "#enquiry", opensModal: "enquiry" },
    gradient: "sand",
    art: "bars",
  },
  {
    id: "mis-profitability",
    isPlaceholder: true,
    eyebrow: "Real-time visibility",
    heading: "MIS dashboards for real-time profitability.",
    sub: "Branch-wise, item-wise, customer-wise — see which lines of business are actually paying off, in real time.",
    primaryCta: { label: "Book a demo", href: "#talk", opensModal: "talk" },
    secondaryCta: { label: "See offerings", href: "#offerings" },
    gradient: "violet",
    art: "grid",
  },
  {
    id: "integrations",
    isPlaceholder: true,
    eyebrow: "Connect everything",
    heading: "Integrate Tally with everything you already run.",
    sub: "E-commerce, payment gateways, CRMs, banking APIs, custom ERPs — we wire them into Tally cleanly.",
    primaryCta: { label: "Discuss your stack", href: "#callback", opensModal: "callback" },
    gradient: "cream-gold",
    art: "dots",
  },
];

export const heroSlides = z.array(HeroSlideSchema).parse(raw);
