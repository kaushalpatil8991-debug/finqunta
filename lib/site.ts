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
  /**
   * Which contact facts are confirmed by the owner (home_page_content.md:
   * "If a fact isn't confirmed yet, hide that whole line"). The phone has one
   * digit too many and the email is a personal Gmail, so both stay hidden
   * everywhere until these flags are flipped with corrected values above.
   */
  confirmed: {
    phone: false,
    email: false,
    founded: false,
    /** WhatsApp uses its own number above; flip once it is correct. */
    whatsapp: false,
    /** Street address + pincode above, and the map link below. */
    address: false,
  },
  /** Google Maps "Share → Copy link" for the office. Shown with the address. */
  mapUrl: null as string | null,
  /**
   * Checkable facts for the home page's first screen (home_page_content.md §2,
   * "Checkable facts strip"). Each one renders only when it is filled in;
   * leave null until the owner confirms it. URLs point to the official page
   * where anyone can verify the value.
   */
  facts: {
    /** Exactly as on Tally's partner locator, e.g. "Certified Partner". */
    partnerCategory: null as string | null,
    partnerUrl: null as string | null,
    cin: null as string | null,
    gstin: null as string | null,
    /** "Month YYYY". */
    incorporated: null as string | null,
    /** e.g. "Mon–Sat, 10:00–19:00". */
    supportHours: null as string | null,
    /** Show "Free · No obligation" under the call button. */
    callIsFree: false,
    /**
     * Typical duration of each "How we work" step, in order:
     * Call, Scope & quote, Licence & setup, Data migration, Training,
     * Handover & support. e.g. ["20 minutes", "2 working days", …].
     * null hides that step's duration.
     */
    stepTimes: [null, null, null, null, null, null] as Array<string | null>,
  },
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
