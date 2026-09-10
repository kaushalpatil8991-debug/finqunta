import { Hero } from "@/components/sections/hero";
import { ClientsStrip } from "@/components/sections/clients-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStats } from "@/components/sections/trust-stats";
import { Awards } from "@/components/sections/awards";
import { Values } from "@/components/sections/values";
import { Offerings } from "@/components/sections/offerings";
import { TallyOnCloud } from "@/components/sections/tally-on-cloud";
import { Newsletter } from "@/components/sections/newsletter";
import { DemoContentBanner } from "@/components/fx/demo-content-banner";

import { heroSlides } from "@/content/hero-slides";
import { clients } from "@/content/clients";
import { testimonials } from "@/content/testimonials";
import { awards } from "@/content/awards";

export default function HomePage() {
  // Count placeholder content at render time — surfaced in the dev banner.
  const placeholderCount =
    heroSlides.filter((x) => x.isPlaceholder).length +
    clients.filter((x) => x.isPlaceholder).length +
    testimonials.filter((x) => x.isPlaceholder).length +
    awards.filter((x) => x.isPlaceholder).length;

  const isDev = process.env.NODE_ENV === "development";

  return (
    <>
      {isDev && placeholderCount > 0 && (
        <DemoContentBanner count={placeholderCount} />
      )}
      <Hero />
      <ClientsStrip />
      <Testimonials />
      <TrustStats />
      <Awards />
      <Values />
      <Offerings />
      <TallyOnCloud />
      <Newsletter />
    </>
  );
}
