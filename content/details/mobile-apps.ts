import { z } from "zod";
import { MobileAppDetailSchema, type MobileAppDetail } from "@/lib/schema";

const raw: MobileAppDetail[] = [
  {
    slug: "business-dashboard",
    title: "Business Dashboard",
    tagline: "Sales, receivables, stock — on your phone, live from Tally.",
    summary:
      "Founder/manager app showing sales, receivables, bank positions, and stock — refreshed every 10 minutes from your Tally.",
    icon: "LayoutDashboard",
    hero: {
      eyebrow: "Business Dashboard",
      title: "Your business on a phone screen — always current.",
      sub: "Sales, receivables, cash position, fastest-moving SKUs, and bank balances at a glance. Pulls live from your TallyPrime every 10 minutes; on-demand refresh anytime.",
      gradient: "plum",
    },
    platforms: ["android", "ios"],
    features: [
      {
        id: "bd-f1",
        title: "Today's sales + yesterday",
        body: "Snapshot of today's billing with comparison to yesterday, last week, and the same day last month.",
        icon: "TrendingUp",
      },
      {
        id: "bd-f2",
        title: "Receivables age",
        body: "Current outstanding receivables by ageing bucket. Tap into any bucket for customer-level detail.",
        icon: "Coins",
      },
      {
        id: "bd-f3",
        title: "Bank + cash positions",
        body: "All bank and cash balances across ledgers. One screen — no more log-in to multiple bank portals.",
        icon: "Wallet",
      },
      {
        id: "bd-f4",
        title: "Stock movers",
        body: "Top-selling SKUs this week, slow-movers flagged, stock-outs highlighted.",
        icon: "Package",
      },
      {
        id: "bd-f5",
        title: "Branch + company filter",
        body: "Multi-company and multi-branch owners: filter the whole dashboard by company, by branch, or by time range.",
        icon: "Filter",
      },
    ],
    capabilities: [
      "10-minute automatic refresh; on-demand refresh one-tap",
      "Works on iOS 15+ and Android 10+",
      "Biometric unlock (Face ID, Touch ID, fingerprint)",
      "Offline-last-refresh view — data visible without connectivity",
      "Push notifications for outlier movements (big sale, overdue receivable)",
    ],
    specs: [
      { label: "Target user", value: "Owner, CEO, CFO, senior manager" },
      { label: "Platform", value: "iOS 15+ · Android 10+" },
      { label: "Backend", value: "Finquanta sync service on your TallyPrime server" },
      { label: "Security", value: "TLS 1.3; biometric auth; device-pair only" },
      { label: "Offline", value: "Last snapshot cached; read-only" },
    ],
    faqs: [
      {
        q: "Does my team see only my data?",
        a: "Yes. Device-paired + role-based — the dashboard honours your Tally user permissions. CFOs see all; branch managers see their branch.",
      },
      {
        q: "Do I need a server upgrade for this?",
        a: "No — the Finquanta sync service runs on your existing TallyPrime server with negligible overhead.",
      },
    ],
    relatedSlugs: ["customer-profiling", "transaction-approvals"],
  },

  {
    slug: "customer-profiling",
    title: "Customer Profiling",
    tagline: "Know the customer before the sales call.",
    summary:
      "Field reps see customer history, outstanding, and credit limits before every call. Tally-live, offline-tolerant.",
    icon: "UserSearch",
    hero: {
      eyebrow: "Customer Profiling",
      title: "Walk into the customer meeting already knowing the answers.",
      sub: "Field reps pull up any customer's 12-month purchase history, current outstanding, credit-limit usage, and past-issue log — instantly. Cuts 'I will check and get back' loops.",
      gradient: "violet",
    },
    platforms: ["android", "ios"],
    features: [
      {
        id: "cp-f1",
        title: "12-month purchase history",
        body: "Every invoice, every item, every quantity — in chronological order. Tap any item to see the voucher.",
        icon: "History",
      },
      {
        id: "cp-f2",
        title: "Outstanding + ageing",
        body: "Current due and age-bucket breakdown. Visual flag for customers over credit limit or beyond payment terms.",
        icon: "AlertCircle",
      },
      {
        id: "cp-f3",
        title: "Credit-limit meter",
        body: "Credit limit, used, available — as a meter. Green/amber/red coded so it is readable during a fast conversation.",
        icon: "Gauge",
      },
      {
        id: "cp-f4",
        title: "Past-issue log",
        body: "All prior disputes, complaints, and resolution notes, with timestamps. No 'your team had no record of this' moments.",
        icon: "ClipboardList",
      },
      {
        id: "cp-f5",
        title: "Territory-scoped",
        body: "Reps see only customers in their assigned territory. Territory assignments synced from Tally or Finquanta's admin.",
        icon: "MapPin",
      },
    ],
    capabilities: [
      "Offline-tolerant — last-synced data available without network",
      "Territory-based data scoping",
      "One-tap to start a call or send a WhatsApp",
      "Sync refreshes on app open + every 30 minutes",
    ],
    specs: [
      { label: "Target user", value: "Field sales, territory manager" },
      { label: "Platform", value: "iOS 15+ · Android 10+" },
      { label: "Data scope", value: "Territory-based; admin-configured" },
      { label: "Offline capability", value: "Full read-only; next-sync writes queued" },
    ],
    relatedSlugs: ["business-dashboard", "sales-order-booking"],
  },

  {
    slug: "transaction-approvals",
    title: "Transaction Approvals",
    tagline: "Approve discounts and credit notes from your phone.",
    summary:
      "Managers approve discounts, credit notes, and large orders from phone — with a full audit trail of who approved what.",
    icon: "CheckSquare",
    hero: {
      eyebrow: "Transaction Approvals",
      title: "Managers unblock the team — without running back to the desk.",
      sub: "Approve discount ceilings, credit notes, large orders, and voucher amendments from a notification tap. Every approval logged in Tally with a full audit trail.",
      gradient: "mist",
    },
    platforms: ["android", "ios"],
    features: [
      {
        id: "ta-f1",
        title: "Push-notification approvals",
        body: "Pending approvals arrive as push notifications. Tap the notification, see the context, approve or reject with a reason.",
        icon: "Bell",
      },
      {
        id: "ta-f2",
        title: "Approval chains",
        body: "Configurable chains — up-to-₹X approver, above-that chief-finance-approver, above-that-again director. Respected per voucher type.",
        icon: "GitBranch",
      },
      {
        id: "ta-f3",
        title: "Audit trail",
        body: "Every approval captured in Tally with approver name, timestamp, device, and reason notes. Immutable log.",
        icon: "ShieldCheck",
      },
      {
        id: "ta-f4",
        title: "SLA alerts",
        body: "Approvals pending beyond your configured SLA escalate up the chain automatically. No silent bottlenecks.",
        icon: "Timer",
      },
    ],
    capabilities: [
      "Same app serves approvers across voucher types (sales, credit notes, purchases)",
      "Approve-while-offline; sync on reconnect",
      "Reason codes configurable per voucher type",
      "Delegation mode — approver-on-leave routing",
    ],
    specs: [
      { label: "Target user", value: "Managers, finance heads, directors" },
      { label: "Platform", value: "iOS 15+ · Android 10+" },
      { label: "Approval logic", value: "Configurable chains with SLA escalation" },
      { label: "Audit", value: "Immutable log inside Tally" },
    ],
    relatedSlugs: ["business-dashboard", "sales-order-booking"],
  },

  {
    slug: "sales-order-booking",
    title: "Sales Order Booking",
    tagline: "Field order entry that lands in Tally as draft SO.",
    summary:
      "Field reps book orders on their phone; draft SOs land in Tally with item lookup, pricing, and stock availability.",
    icon: "ShoppingCart",
    hero: {
      eyebrow: "Sales Order Booking",
      title: "Orders from the field — into Tally, not onto paper.",
      sub: "Reps take orders on their phone; they appear as draft sales orders in Tally within minutes. Item lookup, pricing, stock availability, and customer credit checks all enforced at entry.",
      gradient: "cream-gold",
    },
    platforms: ["android", "ios"],
    features: [
      {
        id: "so-f1",
        title: "Item catalogue search",
        body: "Fuzzy search across item code, name, HSN, and description. Recent-items shortcut; favourites per rep.",
        icon: "Search",
      },
      {
        id: "so-f2",
        title: "Pricing + scheme rules",
        body: "Customer-specific pricing, quantity discounts, and scheme rules pulled from Tally. Reps cannot enter below-floor prices.",
        icon: "BadgeIndianRupee",
      },
      {
        id: "so-f3",
        title: "Stock availability",
        body: "Live stock across godowns; reservation at order-placement. Backorder flag with expected-arrival date.",
        icon: "Package",
      },
      {
        id: "so-f4",
        title: "Credit-check + hold",
        body: "Orders from over-limit customers route to manager approval automatically; do not block the rep from placing the order.",
        icon: "ShieldAlert",
      },
      {
        id: "so-f5",
        title: "Signature capture",
        body: "Capture customer signature on the phone at order placement. Attached to the Tally voucher automatically.",
        icon: "PenLine",
      },
    ],
    capabilities: [
      "Offline order entry; syncs on reconnect",
      "Territory-based customer access",
      "Photo + note attachments on the order (customer site photos, verbal instructions)",
      "Per-rep quota dashboard — month-to-date against target",
    ],
    specs: [
      { label: "Target user", value: "Field sales reps" },
      { label: "Platform", value: "iOS 15+ · Android 10+" },
      { label: "Order flow", value: "Mobile capture → draft SO in Tally → manager confirm → firm SO" },
      { label: "Offline capability", value: "Full offline capture; queued sync" },
    ],
    relatedSlugs: ["customer-profiling", "transaction-approvals"],
  },
];

export const mobileAppDetails = z
  .array(MobileAppDetailSchema)
  .parse(raw);

export const mobileAppDetailBySlug: Record<string, MobileAppDetail> =
  Object.fromEntries(mobileAppDetails.map((m) => [m.slug, m]));

export const mobileAppSlugs: readonly string[] = mobileAppDetails.map((m) => m.slug);
