/**
 * Single source of truth for Finquanta site constants.
 * Read by header, footer, metadata, tel/mailto/WhatsApp links.
 * Spec §4.1; placeholders flagged in §11 (address, founded year, social).
 */
export const site = {
  name: "Finquanta Solutions India Private Limited",
  shortName: "Finquanta",
  tagline:
    "Empowering Businesses with Accurate Data, Seamless Solutions & Trusted Tally Expertise.",
  founded: 2018, // PLACEHOLDER — confirm with user
  director: { name: "Sandip Utekar", title: "Director" },
  phone: { display: "+91 99120 37912 3", tel: "+919912037912" },
  whatsapp: {
    display: "+91 99120 37912 3",
    url: "https://wa.me/919912037912",
  },
  email: "sandiputekar.tally@gmail.com",
  address: {
    line1: "—",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "—",
    country: "India",
  }, // PLACEHOLDER
  partner: {
    type: "Tally Partner",
    scope: ["Sales", "Support", "Solutions Development"] as const,
  },
  social: {
    linkedin: null as string | null,
    twitter: null as string | null,
    facebook: null as string | null,
  }, // PLACEHOLDER
} as const;

export type Site = typeof site;
