/**
 * PROOF & TRUST — the one file to fill in with REAL, confirmed facts.
 *
 * Every section that reads this file renders ONLY what is here. An empty list
 * means the section is not shown on the live site at all (no empty headings,
 * no invented stand-ins). While you run `next dev`, an outlined box marks each
 * empty slot so you can see where the content will appear; that box never
 * ships to production.
 *
 * Contact facts (phone, email, address, hours, CIN, GSTIN, partner category)
 * live in lib/site.ts — fill the value there and flip its `confirmed` flag.
 *
 * Rules (from home_page_content.md): only people and businesses who agreed to
 * be named; no counts you cannot prove; no awards you cannot link to.
 */

export type ProofClient = {
  name: string;
  sector?: string;
  /** Optional logo in /public, e.g. "/clients/acme.svg". Name is shown if absent. */
  logo?: string;
};

export type ProofTestimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  /** Where the quote came from, e.g. "Google review" or "Email, March 2026". */
  source?: string;
};

export type ProofPerson = {
  name: string;
  role: string;
  /** One or two sentences. Leave empty rather than guess. */
  bio?: string;
  /** Optional photo in /public, e.g. "/team/sandip.jpg" (square, 400px+). */
  photo?: string;
};

export type ProofMilestone = { year: string; title: string; body?: string };

export const proof = {
  /** Clients who agreed to be named. */
  clients: [] as ProofClient[],

  /** Real customer quotes, with permission. */
  testimonials: [] as ProofTestimonial[],

  /** Google Business Profile. Fill all three or leave as null. */
  reviews: {
    rating: null as number | null, // e.g. 4.8
    count: null as number | null, // e.g. 37
    url: null as string | null, // link to your Google reviews
  },

  /** People shown on the About page. The director is already named in lib/site.ts. */
  team: [
    { name: "Sandip Utekar", role: "Director" },
  ] as ProofPerson[],

  /**
   * Company history for the About page. The old draft timeline (2018 founding,
   * "200 clients", "90+ TDLs") was never confirmed, so it is NOT shown. Add
   * entries here once you have checked them.
   */
  milestones: [] as ProofMilestone[],

  /**
   * Case studies are written in content/case-studies/*.mdx, but they name
   * businesses ("Sahyadri Pharma" also appears in the invented client list).
   * A case study is published only when its slug is listed here, meaning the
   * story is real and the client agreed to be named. Slugs available:
   * "pune-pharma", "nagpur-manufacturer", "nashik-distribution", "mumbai-ngo".
   */
  confirmedCaseStudies: [] as string[],
};

export const hasTrustContent = () =>
  proof.clients.length > 0 ||
  proof.testimonials.length > 0 ||
  (proof.reviews.rating !== null && proof.reviews.url !== null);
