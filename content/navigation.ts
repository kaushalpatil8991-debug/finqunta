import {
  MegaMenuItemSchema,
  NavLinkSchema,
  type NavLink,
} from "@/lib/schema";
import { z } from "zod";

/**
 * Mega-menu structure (spec §4.3). SP1–SP4 shipped all listed routes —
 * no more comingSoon flags in the active navigation.
 */
const navRaw: z.input<typeof MegaMenuItemSchema>[] = [
  {
    label: "About Us",
    children: [
      { label: "About Finquanta", href: "/about-us", external: false, comingSoon: false },
      { label: "Testimonials", href: "#testimonials", external: false, comingSoon: false },
      { label: "Case Studies", href: "/case-study", external: false, comingSoon: false },
      { label: "Events", href: "/events", external: false, comingSoon: false },
    ],
  },
  {
    label: "Product & Services",
    groups: [
      {
        label: "Tally Software",
        children: [
          { label: "TallyPrime", href: "/tally-erp-9-products/tallyprime", external: false, comingSoon: false },
          { label: "Tally Virtual User (TVU)", href: "/tally-erp-9-products/tally-virtual-user", external: false, comingSoon: false },
          { label: "Tally ERP 9", href: "/tally-erp-9-products/tally-erp-9", external: false, comingSoon: false },
          { label: "TallyPrime Server", href: "/tally-erp-9-products/tallyprime-server", external: false, comingSoon: false },
          { label: "Auditors Edition", href: "/tally-erp-9-products/auditors-edition", external: false, comingSoon: false },
          { label: "Tally Software Services", href: "/tally-erp-9-products/tally-software-services", external: false, comingSoon: false },
        ],
      },
      {
        label: "Tally Services",
        children: [
          { label: "Tally on Cloud", href: "#cloud", external: false, comingSoon: false },
          { label: "Onsite & Remote Support", href: "/tally-services/onsite-remote-support", external: false, comingSoon: false },
          { label: "AMC / Annual Support", href: "/tally-services/amc-annual-support", external: false, comingSoon: false },
          { label: "Data Synchronisation", href: "/tally-services/data-synchronisation", external: false, comingSoon: false },
          { label: "Training", href: "/tally-services/training", external: false, comingSoon: false },
          { label: "Invoice Customisation", href: "/tally-customization", external: false, comingSoon: false },
        ],
      },
      {
        label: "Tally Mobile Apps",
        children: [
          { label: "Business Dashboard", href: "/tally-mobile-apps/business-dashboard", external: false, comingSoon: false },
          { label: "Customer Profiling", href: "/tally-mobile-apps/customer-profiling", external: false, comingSoon: false },
          { label: "Trans Approval", href: "/tally-mobile-apps/transaction-approvals", external: false, comingSoon: false },
          { label: "Sales Order Booking", href: "/tally-mobile-apps/sales-order-booking", external: false, comingSoon: false },
        ],
      },
      {
        label: "Tally Solutions",
        children: [
          { label: "Integrations & APIs", href: "/tally-integration", external: false, comingSoon: false },
          { label: "Tally Customisation", href: "/tally-customization", external: false, comingSoon: false },
          { label: "Vertical Solutions", href: "/tally-erp-9-vertical-solutions", external: false, comingSoon: false },
          { label: "Tally GST", href: "/tally-gst", external: false, comingSoon: false },
        ],
      },
      {
        label: "Boosters & Add-Ons",
        children: [
          { label: "Solution Boosters", href: "/tally-erp-9-solution-boosters", external: false, comingSoon: false },
          { label: "Add-on Modules", href: "/tally-erp-9-add-ons-modules", external: false, comingSoon: false },
          { label: "Smart Backup++", href: "/tally-erp-9-add-ons-modules/smart-backup", external: false, comingSoon: false },
          { label: "Sheet Magic", href: "/tally-erp-9-add-ons-modules/sheet-magic", external: false, comingSoon: false },
          { label: "Audit Trail", href: "/tally-erp-9-add-ons-modules/audit-trail", external: false, comingSoon: false },
        ],
      },
    ],
  },
  { label: "Clients", href: "#clients", comingSoon: false },
  { label: "Blogs", href: "/blog", comingSoon: false },
  { label: "Contact", href: "#enquiry", comingSoon: false, opensModal: "enquiry" },
  { label: "Career", href: "/career", comingSoon: false },
];

export const megaNav = z.array(MegaMenuItemSchema).parse(navRaw);

/**
 * Right-hand header CTAs.
 */
export const headerCtas: NavLink[] = z.array(NavLinkSchema).parse([
  { label: "Buy", href: "/tallyprime-pricing", comingSoon: false },
  { label: "Download", href: "/download-tally-latest-release", comingSoon: false },
  { label: "Talk to Expert", href: "#talk", comingSoon: false, opensModal: "talk" },
]);

/**
 * Footer link columns. Coming-soon flags inherited from spec §7.12.
 */
const footerCompany: NavLink[] = z.array(NavLinkSchema).parse([
  { label: "About Us", href: "/about-us", comingSoon: false },
  { label: "Testimonials", href: "#testimonials", comingSoon: false },
  { label: "Case Studies", href: "/case-study", comingSoon: false },
  { label: "Clients", href: "#clients", comingSoon: false },
  { label: "Blog", href: "/blog", comingSoon: false },
  { label: "Career", href: "/career", comingSoon: false },
  { label: "Contact Us", href: "#enquiry", comingSoon: false, opensModal: "enquiry" },
]);

const footerQuickLinks: NavLink[] = z.array(NavLinkSchema).parse([
  { label: "TallyPrime Pricing", href: "/tallyprime-pricing", comingSoon: false },
  { label: "Tally Software", href: "/tally-erp-9-products", comingSoon: false },
  { label: "Tally on Cloud", href: "#cloud", comingSoon: false },
  { label: "Tally Customisation", href: "/tally-customization", comingSoon: false },
  { label: "Tally Integration", href: "/tally-integration", comingSoon: false },
  { label: "Mobile Apps", href: "/tally-mobile-apps", comingSoon: false },
  { label: "Add-ons", href: "/tally-erp-9-add-ons-modules", comingSoon: false },
  { label: "Boosters", href: "/tally-erp-9-solution-boosters", comingSoon: false },
  { label: "E-Way Bill", href: "/tally-gst", comingSoon: false },
]);

const footerPolicy: NavLink[] = z.array(NavLinkSchema).parse([
  { label: "All Policies", href: "/policies", comingSoon: false },
  { label: "Privacy Policy", href: "/privacy-policy", comingSoon: false },
  { label: "Terms & Conditions", href: "/terms-and-conditions", comingSoon: false },
  { label: "Refund Policy", href: "/refund-policy", comingSoon: false },
  { label: "Delivery Policy", href: "/delivery-policy", comingSoon: false },
  { label: "Cancellation Policy", href: "/cancellation-policy", comingSoon: false },
  { label: "EULA", href: "/end-user-license-agreement", comingSoon: false },
]);

export const footerColumns = {
  company: footerCompany,
  quickLinks: footerQuickLinks,
  policy: footerPolicy,
};
