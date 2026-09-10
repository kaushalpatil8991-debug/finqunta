import { z } from "zod";
import {
  VerticalPackDetailSchema,
  type VerticalPackDetail,
} from "@/lib/schema";

const raw: VerticalPackDetail[] = [
  {
    slug: "trading",
    title: "Trading & Distribution",
    tagline: "Multi-godown, credit-days, scheme-discounts — preconfigured.",
    summary:
      "A TallyPrime pack for trading and distribution houses. Multi-godown stock, batch-wise tracking, credit-days workflow, and scheme-based discount rules, ready on day one.",
    icon: "Warehouse",
    hero: {
      eyebrow: "Trading & Distribution",
      title: "For distribution houses who run on thin margins and thick catalogues.",
      sub: "Masters, vouchers, and reports preconfigured for trading workflows — multi-godown, batch/expiry, credit-days, commission, and scheme discounts. Typical go-live: 2 weeks from signed SoW.",
      gradient: "plum",
    },
    painPoints: [
      "Stock spread across multiple godowns; no single view",
      "Credit days drift silently until DSO explodes",
      "Commission calculations every month eat a day of someone's life",
      "Manual scheme-discount rules invite errors and disputes",
    ],
    features: [
      {
        id: "tr-f1",
        title: "Multi-godown stock",
        body: "Each godown is a first-class citizen in the stock model. Inter-godown transfers, stock-in-transit, and reservations.",
        icon: "Warehouse",
      },
      {
        id: "tr-f2",
        title: "Batch + expiry",
        body: "Batch-wise inventory with expiry tracking. FIFO / FEFO issue rules; near-expiry alerts.",
        icon: "CalendarRange",
      },
      {
        id: "tr-f3",
        title: "Credit-days workflow",
        body: "Customer-specific credit days, over-limit approvals, ageing buckets, and automated reminders.",
        icon: "Clock",
      },
      {
        id: "tr-f4",
        title: "Sales commission",
        body: "Per-rep commission rules (flat, slab, product-group). Auto-calculated monthly; payout vouchers one-click.",
        icon: "BadgeIndianRupee",
      },
      {
        id: "tr-f5",
        title: "Scheme-discount engine",
        body: "Time-bound schemes per customer/product. Buy-X-get-Y, quantity discount, price-off — all rule-based.",
        icon: "Tag",
      },
    ],
    outcomes: [
      "Month-end commission workings reduced from 1 day to 30 minutes",
      "Single consolidated stock view across all godowns",
      "Zero scheme-discount disputes — rules in Tally, not in spreadsheets",
      "DSO reduction from automated credit-days reminders",
    ],
    faqs: [
      {
        q: "How long does the trading pack take to go live?",
        a: "Typical timeline: 2 weeks from signed SoW. Includes masters setup, scheme import, parallel-run UAT, and team training.",
      },
      {
        q: "Can the pack handle multi-state distribution?",
        a: "Yes. Multi-state GST, branch-wise reporting, and inter-state stock transfers are part of the pack.",
      },
    ],
    relatedSlugs: ["retail", "manufacturing"],
  },

  {
    slug: "manufacturing",
    title: "Manufacturing",
    tagline: "BOM, job-work, production orders, yield — all in Tally.",
    summary:
      "Manufacturing-specific TallyPrime configuration — bill of materials, job-work vouchers, production orders, yield tracking, and scrap handling.",
    icon: "Factory",
    hero: {
      eyebrow: "Manufacturing",
      title: "Shop-floor accounting that reflects what actually happens.",
      sub: "BOM-driven production, job-work tracking, yield and scrap, and production-cost sheets. Typical buyer: small-mid manufacturers in chemicals, food, engineering, and textiles.",
      gradient: "violet",
    },
    painPoints: [
      "Production cost per batch is a spreadsheet guess",
      "Job-work reconciliation takes days at month-end",
      "Scrap and rework invisible until stock-taking",
      "Multi-BOM products miss cost roll-ups",
    ],
    features: [
      {
        id: "mf-f1",
        title: "BOM + multi-level",
        body: "Bill of Materials for every finished good; sub-assemblies as their own BOMs. Cost roll-up automatic.",
        icon: "Network",
      },
      {
        id: "mf-f2",
        title: "Production orders",
        body: "Open, in-progress, and closed production orders with real-time stock-consumption tracking.",
        icon: "ClipboardCheck",
      },
      {
        id: "mf-f3",
        title: "Job-work vouchers",
        body: "Material-out, material-in, value-addition, and job-worker settlement — on a single reconciliation screen.",
        icon: "Handshake",
      },
      {
        id: "mf-f4",
        title: "Yield + scrap tracking",
        body: "Expected vs actual yield per batch, with scrap captured as a byproduct or write-off. Trend analysis.",
        icon: "Activity",
      },
      {
        id: "mf-f5",
        title: "Production cost sheet",
        body: "Per-batch cost sheet: material + labour + overhead, with variance against standard cost.",
        icon: "FileBarChart",
      },
    ],
    outcomes: [
      "True per-batch production cost — not a quarterly estimate",
      "Job-work reconciliation in hours, not days",
      "Yield-loss trends visible monthly for shop-floor interventions",
      "Clean statutory compliance for job-work (GST ITC-04, etc.)",
    ],
    relatedSlugs: ["pharma", "trading"],
  },

  {
    slug: "pharma",
    title: "Pharma & Medical",
    tagline: "Batch + expiry + statutory — done right.",
    summary:
      "Pharma-grade Tally pack — batch/expiry with FEFO, drug-licence numbers on invoices, schedule-H / narcotics register, and statutory compliance.",
    icon: "Pill",
    hero: {
      eyebrow: "Pharma & Medical",
      title: "Pharma-grade Tally — because 'mostly compliant' is not a thing in this sector.",
      sub: "Built for pharma distributors, medical-device dealers, and hospital procurement. Batch + expiry with FEFO rules, statutory licence numbers on every invoice, and the narcotics / schedule-H registers.",
      gradient: "sand",
    },
    painPoints: [
      "Expiry-date leakage — expensive stock binned every month",
      "Statutory licence numbers miss on random invoices",
      "Schedule-H and narcotics register prep takes an accountant's full day monthly",
      "Batch-recall tracing slow and manual",
    ],
    features: [
      {
        id: "ph-f1",
        title: "Batch + expiry (FEFO)",
        body: "Every stock lot carries batch + expiry. First-expiry-first-out issue rules enforced. Near-expiry alerts at 90/60/30 days.",
        icon: "CalendarClock",
      },
      {
        id: "ph-f2",
        title: "Statutory licence numbers",
        body: "Drug licence, narcotics licence, GSTIN — validated and auto-printed on every sale invoice. No blank fields.",
        icon: "FileCheck2",
      },
      {
        id: "ph-f3",
        title: "Schedule-H / narcotics",
        body: "Schedule-H and narcotics registers auto-prepared per state format. Export-ready for FDA inspection.",
        icon: "ClipboardList",
      },
      {
        id: "ph-f4",
        title: "Batch-recall tracing",
        body: "Trace any batch from supplier-in to customer-out in 30 seconds. Recall workflow with customer notifications.",
        icon: "Radar",
      },
      {
        id: "ph-f5",
        title: "Temperature-chain logs",
        body: "For cold-chain products — optional integration with temperature-log devices. Audit-ready chain-of-custody.",
        icon: "Thermometer",
      },
    ],
    outcomes: [
      "Expiry-loss reduction — FEFO + 90-day alerts catch the stock before it expires",
      "FDA inspections resolved in hours, not days",
      "Statutory register prep: 30 minutes a month, not a full day",
      "Batch recalls in minutes — regulator and customer confident",
    ],
    relatedSlugs: ["trading", "manufacturing"],
  },

  {
    slug: "retail",
    title: "Retail",
    tagline: "Counter + multi-branch retail, inside Tally.",
    summary:
      "Retail-specific Tally pack — counter billing with barcode entry, schemes & loyalty, multi-branch consolidation, and MRP / landed-cost tracking.",
    icon: "Store",
    hero: {
      eyebrow: "Retail",
      title: "Retail — from single shop to multi-brand chain — all in Tally.",
      sub: "Counter billing with barcode scanning, loyalty + scheme rules, multi-branch consolidation, and MRP / landed-cost tracking. Works with thermal printers, weighing scales, and cash drawers.",
      gradient: "cream-gold",
    },
    painPoints: [
      "POS software and Tally running as separate systems; month-end reconciliation grief",
      "Loyalty schemes live on paper or in shop-keepers' heads",
      "Multi-branch stock and sales visibility always a week stale",
      "MRP vs landed-cost margin erosion invisible until quarter-end",
    ],
    features: [
      {
        id: "rt-f1",
        title: "Counter billing",
        body: "Barcode-scan voucher entry, thermal printer invoice, cash-drawer kick, card/UPI payment flow — all from TallyPrime.",
        icon: "ScanLine",
      },
      {
        id: "rt-f2",
        title: "Schemes + loyalty",
        body: "Time-bound schemes (buy-X-get-Y, percentage off, bundle pricing) + customer loyalty points. All rule-based.",
        icon: "Gift",
      },
      {
        id: "rt-f3",
        title: "Multi-branch consolidation",
        body: "Each shop as a Tally company, consolidated nightly. HQ sees stock, sales, cash positions across branches in one view.",
        icon: "Building2",
      },
      {
        id: "rt-f4",
        title: "MRP + landed-cost",
        body: "Landed cost auto-computed (purchase + freight + duty + handling). Margin alerts when MRP drifts below threshold.",
        icon: "Receipt",
      },
    ],
    outcomes: [
      "Counter throughput 2× faster than manual entry",
      "Loyalty + scheme rules enforced consistently across shops",
      "Daily (not weekly) HQ visibility of branch stock and cash",
      "Margin protection — MRP drift flagged before it hurts",
    ],
    relatedSlugs: ["trading", "services"],
  },

  {
    slug: "services",
    title: "Services & Consulting",
    tagline: "Time-sheets, project profitability, retainers — native to Tally.",
    summary:
      "Services-firm Tally pack — time-sheet based invoicing, project profitability, retainer tracking, reverse-charge GST workflow.",
    icon: "Briefcase",
    hero: {
      eyebrow: "Services & Consulting",
      title: "Time-sheets, retainers, and project P&L — in the same system your accounts team already lives in.",
      sub: "Built for consulting firms, design studios, CA offices, and agencies. Time-sheet-based invoicing, project profitability, retainer tracking, and the reverse-charge GST flow done properly.",
      gradient: "mist",
    },
    painPoints: [
      "Project P&L is a spreadsheet guess until quarter-end",
      "Time-sheets captured in one system, invoiced from another",
      "Retainer balances drift — under-billed or over-billed",
      "Reverse-charge GST workflow almost always edge-case at least once a month",
    ],
    features: [
      {
        id: "sv-f1",
        title: "Time-sheet capture",
        body: "Per-resource, per-project, per-day. Weekly submission + manager approval flow. Non-billable vs billable split.",
        icon: "Clock",
      },
      {
        id: "sv-f2",
        title: "Time-to-invoice",
        body: "Approved time-sheets roll up to draft invoices automatically. Override rates, discounts, and notes before sending.",
        icon: "FileText",
      },
      {
        id: "sv-f3",
        title: "Project profitability",
        body: "Live project P&L — revenue, resource cost, third-party cost, margin. Roll-up to portfolio.",
        icon: "PieChart",
      },
      {
        id: "sv-f4",
        title: "Retainer tracking",
        body: "Retainer balances, drawdowns, top-ups. Auto-alert when a retainer drops below threshold.",
        icon: "Coins",
      },
      {
        id: "sv-f5",
        title: "Reverse-charge GST",
        body: "RCM workflow for imports, legal fees, and other applicable categories. Auto-posted, auto-returned in GSTR-3B.",
        icon: "RefreshCcw",
      },
    ],
    outcomes: [
      "Project P&L visible every Monday morning, not every quarter-end",
      "Retainer balances accurate; no more 'surprise' top-up calls",
      "Time-to-cash reduced — time-sheet to invoice in hours",
      "Reverse-charge GST clean — no month-end corrections",
    ],
    relatedSlugs: ["retail", "ngo"],
  },

  {
    slug: "ngo",
    title: "NGO & Trust",
    tagline: "Fund accounting, project grants, 12A / 80G — done right.",
    summary:
      "NGO and trust Tally pack — grants-in / grants-out, project-wise fund accounting, utilisation reports, 12A and 80G receipts.",
    icon: "HeartHandshake",
    hero: {
      eyebrow: "NGO & Trust",
      title: "Accounting for NGOs — because 'just use Tally' is not enough when funders audit.",
      sub: "Project-wise fund accounting, grants-in/out tracking, utilisation reports in funder-friendly formats, and 12A / 80G receipts generated at one click. Built with a decade of NGO-audit experience.",
      gradient: "plum",
    },
    painPoints: [
      "Project-wise utilisation reports take weeks of Excel at funder-reporting time",
      "Grant restrictions mixed with unrestricted funds on the same accounts",
      "80G receipts generated by hand; audit friction every year",
      "Multiple funders, each wanting a different report format",
    ],
    features: [
      {
        id: "ng-f1",
        title: "Project-wise funds",
        body: "Every voucher tagged with a project. Project-wise trial balance, budget-vs-actual, and utilisation reports one-click.",
        icon: "FolderKanban",
      },
      {
        id: "ng-f2",
        title: "Grants-in / grants-out",
        body: "Track funder commitments, received tranches, obligations, and onward grants. Funder dashboard per project.",
        icon: "ArrowLeftRight",
      },
      {
        id: "ng-f3",
        title: "Utilisation reports",
        body: "Pre-built in the 5 most-requested funder formats (FCRA, state government, corporate CSR, multilateral, bilateral). Customisable.",
        icon: "FileBarChart",
      },
      {
        id: "ng-f4",
        title: "12A + 80G receipts",
        body: "Auto-generate compliant donor receipts at donation-time. Batch export for year-end Form-10BE.",
        icon: "Receipt",
      },
      {
        id: "ng-f5",
        title: "FCRA-ready",
        body: "Separate FCRA bank-account ring-fencing, FCRA-only project tagging, and FCRA quarterly return preparation.",
        icon: "Globe",
      },
    ],
    outcomes: [
      "Funder reports prepared in hours, not weeks",
      "80G receipts issued at donation time — donor satisfaction up, audit friction down",
      "FCRA quarterly returns one-click, not a full day of work",
      "Clean audit trail — Big 4 auditors sign off without a line of emails",
    ],
    relatedSlugs: ["services", "trading"],
  },
];

export const verticalDetails = z
  .array(VerticalPackDetailSchema)
  .parse(raw);

export const verticalDetailBySlug: Record<string, VerticalPackDetail> =
  Object.fromEntries(verticalDetails.map((v) => [v.slug, v]));

export const verticalSlugs: readonly string[] = verticalDetails.map((v) => v.slug);
