import { z } from "zod";
import { ProductDetailSchema, type ProductDetail } from "@/lib/schema";

/**
 * Per-product detail entries for /tally-erp-9-products/[slug].
 * Every entry is Zod-validated at module load.
 */
const raw: ProductDetail[] = [
  {
    slug: "tallyprime",
    title: "TallyPrime",
    tagline: "The flagship accounting product — reimagined for the modern SME.",
    summary:
      "TallyPrime is the current-generation desktop accounting product from Tally Solutions — with dashboard, connected banking, and statutory workflow baked in.",
    hero: {
      eyebrow: "TallyPrime",
      title: "TallyPrime — the accounting system most Indian SMEs already trust.",
      sub: "Single-user (Silver) and multi-user (Gold) editions, on-premise or cloud-hosted. Finquanta sells at Tally's MRP, activates same day, and wraps it in training and support.",
      gradient: "plum",
    },
    features: [
      {
        id: "tp-f1",
        title: "Business dashboard",
        body: "Sales, receivables, cash position, and stock snapshots on one screen — filterable by branch and cost centre.",
        icon: "LayoutDashboard",
      },
      {
        id: "tp-f2",
        title: "Connected banking",
        body: "Direct bank statement import and reconciliation for 20+ Indian banks, with UPI, NEFT, and RTGS initiation from inside Tally.",
        icon: "Landmark",
      },
      {
        id: "tp-f3",
        title: "GST + e-invoice ready",
        body: "End-to-end GST workflow, e-invoice generation, e-way bill, and return drafts — set up day one for every new customer.",
        icon: "FileCheck2",
      },
      {
        id: "tp-f4",
        title: "Go-to navigation",
        body: "Search any voucher, ledger, report, or setting from one keyboard shortcut. Shaves minutes off every day for power users.",
        icon: "SearchCode",
      },
      {
        id: "tp-f5",
        title: "Multi-company + multi-branch",
        body: "Unlimited companies on a single licence; multi-branch consolidation with cost-centre reporting.",
        icon: "Building",
      },
      {
        id: "tp-f6",
        title: "Voucher customisation",
        body: "Custom invoice formats, vouchers, and reports via TDL — we build them alongside licence purchase.",
        icon: "FileCog",
      },
    ],
    specs: [
      { label: "Category", value: "On-premise / cloud-hosted accounting" },
      { label: "Platforms", value: "Windows 10 / 11 (64-bit), Windows Server 2019+" },
      { label: "Editions", value: "Silver (single-user) · Gold (multi-user)" },
      { label: "TSS subscription", value: "Included with first-year purchase" },
      { label: "GST modules", value: "CGST · SGST · IGST · e-invoice · e-way bill" },
      { label: "Data format", value: ".tally — auto-compacted, open-portable" },
    ],
    editions: [
      {
        id: "silver",
        name: "TallyPrime Silver",
        priceNote: "From ₹22,500",
        blurb: "Single-user licence. Right for the first-time buyer and small shops up to 2 machines.",
        includes: [
          "Single-user licence",
          "1 year Tally Software Services",
          "Company creation + chart of accounts setup",
          "Two user training sessions",
        ],
      },
      {
        id: "gold",
        name: "TallyPrime Gold",
        priceNote: "From ₹67,500",
        blurb: "Multi-user licence. Concurrent access from up to 10 machines on a single LAN.",
        includes: [
          "Multi-user licence (unlimited users on LAN)",
          "1 year Tally Software Services",
          "GST + e-invoice configuration",
          "Four user training sessions (onsite + remote)",
          "Quarterly health check",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I upgrade from Silver to Gold later?",
        a: "Yes. Tally allows in-place upgrade — pay the differential to Tally; Finquanta handles reconfiguration free for active-cover clients.",
      },
      {
        q: "Do I need TSS every year?",
        a: "Strongly recommended. TSS covers statutory updates (critical for GST), new features, and priority Tally support. We auto-renew for AMC clients.",
      },
      {
        q: "Can I run TallyPrime on a Mac or Linux?",
        a: "Not natively. For Mac/Linux workflows we host TallyPrime on Finquanta's cloud — access via browser from any OS.",
      },
    ],
    relatedSlugs: ["tallyprime-server", "tally-software-services", "auditors-edition"],
  },

  {
    slug: "tallyprime-server",
    title: "TallyPrime Server",
    tagline: "High-concurrency Tally for teams of 10 to 200.",
    summary:
      "TallyPrime Server edition for heavy concurrent use — 10+ simultaneous users, administrative controls, and role-based access.",
    hero: {
      eyebrow: "TallyPrime Server",
      title: "For teams that outgrow the desktop edition.",
      sub: "Runs as a Windows service with high-concurrency architecture, role-based permissions, and zero-downtime maintenance. Right for distribution houses, mid-sized manufacturers, and shared-services accounts teams.",
      gradient: "violet",
    },
    features: [
      {
        id: "tps-f1",
        title: "High concurrency",
        body: "Tested for 150+ simultaneous users with sub-second voucher save times. No 'check-in / check-out' locking of masters.",
        icon: "Users",
      },
      {
        id: "tps-f2",
        title: "Role-based access",
        body: "Granular permissions per user — per-voucher, per-report, per-company. Audit logs of every permission change.",
        icon: "ShieldCheck",
      },
      {
        id: "tps-f3",
        title: "Admin console",
        body: "Web admin UI to manage users, licences, data paths, and backup schedules without touching the client app.",
        icon: "MonitorCog",
      },
      {
        id: "tps-f4",
        title: "Zero-downtime maintenance",
        body: "Schedule maintenance windows with advance warning banners in the client app; users stay logged in through the window.",
        icon: "Activity",
      },
      {
        id: "tps-f5",
        title: "Hot backups",
        body: "Snapshot-consistent backups without disconnecting users. Backup files ship to your choice of local, NAS, or cloud target.",
        icon: "Database",
      },
    ],
    specs: [
      { label: "Category", value: "Multi-user Tally server" },
      { label: "Platform", value: "Windows Server 2019 / 2022" },
      { label: "Concurrent users", value: "Up to 150 tested; unlimited licensed" },
      { label: "Client OS", value: "Any Windows 10 / 11 on LAN" },
      { label: "TSS", value: "Required; included first year" },
      { label: "Typical sizing", value: "8-core CPU · 32 GB RAM · SSD data path" },
    ],
    faqs: [
      {
        q: "How is Server different from Gold?",
        a: "Gold is peer-to-peer multi-user over a file share. Server runs as a Windows service with a database-style engine — handles 10× the concurrency at the cost of a dedicated machine.",
      },
      {
        q: "Can I migrate from Gold to Server without data loss?",
        a: "Yes. Data format is identical; Finquanta handles the cutover in a 4-hour planned window, with rollback to Gold available for 30 days.",
      },
    ],
    relatedSlugs: ["tallyprime", "tally-software-services"],
  },

  {
    slug: "tally-virtual-user",
    title: "Tally Virtual User (TVU)",
    tagline: "Pay-per-user cloud Tally — no licence investment.",
    summary:
      "Tally Virtual User is Tally's own cloud-hosted, per-seat-priced offering. Right for distributed teams with variable headcount.",
    hero: {
      eyebrow: "Tally Virtual User",
      title: "Tally, rented by the seat — hosted by Tally itself.",
      sub: "Subscribe per user; scale up or down each month. Hosted on Tally Solutions' own infrastructure with OS and TSS bundled.",
      gradient: "mist",
    },
    features: [
      {
        id: "tvu-f1",
        title: "Per-user subscription",
        body: "Add a seat, remove a seat — monthly invoice adjusts automatically. No long-term commitment after the first year.",
        icon: "UserPlus",
      },
      {
        id: "tvu-f2",
        title: "No server to maintain",
        body: "Tally Solutions runs the infrastructure end-to-end. You open a browser or remote-desktop client; everything else is taken care of.",
        icon: "CloudCog",
      },
      {
        id: "tvu-f3",
        title: "Included TSS",
        body: "Tally Software Services bundled — statutory updates, new features, and Tally's own support desk at no extra cost.",
        icon: "RefreshCcw",
      },
      {
        id: "tvu-f4",
        title: "Same TallyPrime experience",
        body: "UI, shortcuts, TDLs, and data format are identical to on-premise TallyPrime. No retraining needed.",
        icon: "Monitor",
      },
    ],
    specs: [
      { label: "Category", value: "Cloud-hosted per-user Tally" },
      { label: "Billing", value: "Monthly subscription" },
      { label: "Access", value: "Browser + remote-desktop client" },
      { label: "TSS", value: "Bundled" },
      { label: "Data location", value: "Tally Solutions' Indian data centres" },
      { label: "Backup", value: "Automated daily; 30-day restore window" },
    ],
    faqs: [
      {
        q: "How is TVU different from Finquanta's Tally on Cloud?",
        a: "TVU is Tally's own hosted offering, priced per user by Tally. Finquanta's Tally on Cloud uses a TallyPrime licence you own, hosted on our infrastructure with more customisation flexibility.",
      },
      {
        q: "Can I add my own TDL to TVU?",
        a: "Yes, with some constraints. Custom TDLs need to be certified; Finquanta handles the certification process as part of TVU onboarding.",
      },
    ],
    relatedSlugs: ["tallyprime", "tallyprime-server"],
  },

  {
    slug: "tally-erp-9",
    title: "Tally ERP 9 (legacy support)",
    tagline: "Still running ERP 9? We maintain and migrate.",
    summary:
      "Finquanta continues to support Tally ERP 9 installations — maintenance, TDL upkeep, and planned migration to TallyPrime.",
    hero: {
      eyebrow: "Tally ERP 9",
      title: "For customers still on Tally ERP 9 — we keep it running, and migrate when you are ready.",
      sub: "Tally ERP 9 reached general end-of-support; but many SMEs still run it reliably. Finquanta offers extended maintenance, GST patching, and a tested migration path to TallyPrime when you choose.",
      gradient: "cream-gold",
    },
    features: [
      {
        id: "terp-f1",
        title: "Extended maintenance",
        body: "We continue to maintain Tally ERP 9 installations — voucher-layout tweaks, TDL repairs, and user training.",
        icon: "Wrench",
      },
      {
        id: "terp-f2",
        title: "GST compatibility audit",
        body: "Annual audit of your ERP 9 installation to confirm GST and e-invoice compliance, with a written remediation plan.",
        icon: "ClipboardCheck",
      },
      {
        id: "terp-f3",
        title: "TallyPrime migration",
        body: "Tested upgrade path from ERP 9 to TallyPrime — data validation, TDL port, user UI training, and a parallel-run cutover.",
        icon: "ArrowRightLeft",
      },
      {
        id: "terp-f4",
        title: "Planned sunset",
        body: "A written 12–18 month migration roadmap so your team has time to absorb the change; no forced cutovers.",
        icon: "CalendarClock",
      },
    ],
    specs: [
      { label: "Category", value: "Legacy Tally accounting" },
      { label: "Platform", value: "Windows 7+ (extended support)" },
      { label: "Status", value: "Maintenance mode — end of new development" },
      { label: "Upgrade path", value: "In-place to TallyPrime" },
      { label: "Typical migration", value: "2–6 weeks including training" },
    ],
    faqs: [
      {
        q: "Is ERP 9 still legal to use?",
        a: "Yes — you can continue to use licensed copies of Tally ERP 9. You will not receive new statutory updates from Tally; Finquanta can back-port critical fixes for active-cover clients.",
      },
      {
        q: "How long should I plan to keep ERP 9?",
        a: "We typically advise a 12–18 month migration window. Sooner if you rely on new GST features; later is fine if your statutory workflow is stable and patched.",
      },
    ],
    relatedSlugs: ["tallyprime", "tally-software-services"],
  },

  {
    slug: "auditors-edition",
    title: "TallyPrime Auditor's Edition",
    tagline: "Read-only Tally for chartered accountants.",
    summary:
      "Edition built for CAs — read-only analysis of client data with full audit trail, no risk of accidental edits.",
    hero: {
      eyebrow: "Auditor's Edition",
      title: "Tally for CAs — analyse without touching.",
      sub: "Read-only access to any client's Tally data, with ratio analysis, variance reports, and audit-trail walkthroughs. Finquanta supplies and supports the edition for audit practices.",
      gradient: "sand",
    },
    features: [
      {
        id: "ae-f1",
        title: "Read-only by design",
        body: "No voucher, master, or report can be edited through this edition. Safe to hand to articles and junior auditors.",
        icon: "Lock",
      },
      {
        id: "ae-f2",
        title: "Ratio analysis",
        body: "Common financial ratios — liquidity, solvency, profitability — calculated automatically with year-over-year variance.",
        icon: "PieChart",
      },
      {
        id: "ae-f3",
        title: "Audit-trail walkthrough",
        body: "Step through every voucher edit on the client's Tally, with who/what/when — for statutory audit trail compliance.",
        icon: "History",
      },
      {
        id: "ae-f4",
        title: "Working papers export",
        body: "One-click export of trial balance, ledgers, and age-analysis to Excel working papers, with CA-style formatting.",
        icon: "FileSpreadsheet",
      },
    ],
    specs: [
      { label: "Category", value: "CA-specific Tally edition" },
      { label: "Mode", value: "Read-only" },
      { label: "Platform", value: "Windows 10 / 11 (64-bit)" },
      { label: "TSS", value: "Required" },
      { label: "Typical buyer", value: "CA firms of 3–40 partners" },
    ],
    relatedSlugs: ["tallyprime", "tally-software-services"],
  },

  {
    slug: "tally-software-services",
    title: "Tally Software Services (TSS)",
    tagline: "The annual subscription that keeps your Tally current.",
    summary:
      "TSS is Tally Solutions' mandatory subscription for statutory updates, new feature releases, and Tally's own priority support.",
    hero: {
      eyebrow: "Tally Software Services",
      title: "Statutory updates, new features, Tally's own support — one annual fee.",
      sub: "TSS is Tally's yearly subscription. Non-renewal means no new statutory updates — a compliance risk for GST-registered businesses. Finquanta renews TSS for you and flags expiry well in advance.",
      gradient: "cream-gold",
    },
    features: [
      {
        id: "tss-f1",
        title: "Statutory updates",
        body: "Automatic delivery of GST, TDS, e-invoice, and e-way bill updates the moment Tally publishes them.",
        icon: "FileCheck2",
      },
      {
        id: "tss-f2",
        title: "New feature releases",
        body: "Major TallyPrime feature releases (dashboard, connected banking, etc.) ship only to TSS-active customers.",
        icon: "Sparkles",
      },
      {
        id: "tss-f3",
        title: "Tally's support desk",
        body: "Access to Tally Solutions' own support team for product bugs and 'is-it-me-or-is-it-Tally' escalations.",
        icon: "Headphones",
      },
      {
        id: "tss-f4",
        title: "Finquanta-managed renewal",
        body: "We track every TSS expiry 60/30/7 days in advance, send renewal-due notices, and handle the renewal paperwork.",
        icon: "BellRing",
      },
    ],
    specs: [
      { label: "Category", value: "Annual subscription" },
      { label: "Billing cycle", value: "12-month term, auto-reminded at expiry" },
      { label: "Coverage", value: "Statutory + feature updates + Tally support" },
      { label: "Pricing", value: "Varies by licence edition and user count" },
    ],
    faqs: [
      {
        q: "What happens if I let TSS lapse?",
        a: "You can continue running your current Tally, but you lose access to new statutory updates (including new GST rules) and new features. For GST-registered businesses this becomes a compliance risk quickly.",
      },
      {
        q: "Can I renew TSS after it lapses?",
        a: "Yes, up to a year post-expiry, with a back-payment of the lapsed period. After a year Tally may re-quote at current rates.",
      },
    ],
    relatedSlugs: ["tallyprime", "tallyprime-server"],
  },
];

export const productDetails = z
  .array(ProductDetailSchema)
  .parse(raw);

export const productDetailBySlug: Record<string, ProductDetail> =
  Object.fromEntries(productDetails.map((p) => [p.slug, p]));

export const productSlugs: readonly string[] = productDetails.map((p) => p.slug);
