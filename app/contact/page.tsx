import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { ContactActions } from "@/components/page/contact-actions";
import { LeadForm } from "@/components/forms/lead-form";
import { PartnerBadge, ProofSlot, ReviewsBadge, TrustSection } from "@/components/proof/trust";
import { hasTrustContent } from "@/content/proof";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Finquanta",
  description:
    "Talk to a Tally expert in Mumbai. Book a 20-minute call, request a callback, or send your question about TallyPrime licences, setup, GST or support.",
  alternates: { canonical: "/contact" },
};

/**
 * /contact. Every direct-contact line (phone, WhatsApp, email, address, map,
 * hours, CIN, GSTIN) is gated by lib/site.ts and appears only once confirmed.
 * Booking a call, a callback and the form always work.
 */
export default function ContactPage() {
  const addr = site.address;
  const addressLine = [addr.line1, addr.city, addr.state, addr.pincode].filter((p) => p && p !== "—").join(", ");
  const showAddress = site.confirmed.address && addr.line1 !== "—";
  const mapSrc = showAddress ? `https://www.google.com/maps?q=${encodeURIComponent(`${site.name}, ${addressLine}`)}&output=embed` : null;

  const direct = [
    site.confirmed.phone && {
      icon: Phone,
      label: "Phone",
      value: site.phone.display,
      href: `tel:${site.phone.tel}`,
    },
    site.confirmed.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: site.whatsapp.display,
      href: site.whatsapp.url,
    },
    site.confirmed.email && {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    site.facts.supportHours && {
      icon: Clock,
      label: "Hours",
      value: site.facts.supportHours,
      href: null,
    },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string | null }[];

  return (
    <>
      <PageHero
        title="Talk to a Tally expert in Mumbai."
        sub="Book a 20-minute call, ask for a callback, or send your question below. Licences, setup, GST, data migration or support: tell us what you need and we'll suggest the next step."
        gradient="plum"
        panel={false}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <SectionBand tone="cream">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="grid content-start gap-8">
            <div className="grid gap-3">
              <h2 className="text-h3 font-extrabold tracking-tight text-ink">Fastest: book a call</h2>
              <ContactActions />
            </div>

            <div className="grid gap-3">
              <h2 className="text-h3 font-extrabold tracking-tight text-ink">Reach us directly</h2>
              {direct.length > 0 ? (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {direct.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-3 rounded-lg bg-[var(--fq-card)] p-5">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-caption text-ink-500">{label}</span>
                        {href ? (
                          <a href={href} className="break-words text-body font-bold text-ink hover:text-primary">
                            {value}
                          </a>
                        ) : (
                          <span className="text-body font-bold text-ink">{value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body text-ink-500">Use the call booking or the form for now. Direct numbers will be listed here.</p>
              )}
              {direct.length < 4 ? <ProofSlot
                what="Phone, WhatsApp, email and support hours. Correct the values and set confirmed.phone / whatsapp / email to true, and fill facts.supportHours."
                where="lib/site.ts"
              /> : null}
            </div>

            <div className="grid gap-3">
              <h2 className="text-h3 font-extrabold tracking-tight text-ink">Office</h2>
              {showAddress ? (
                <div className="grid gap-4">
                  <p className="flex items-start gap-3 text-body text-ink-700">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>
                      <strong className="block text-ink">{site.name}</strong>
                      {addressLine}
                      {site.mapUrl ? (
                        <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block font-bold text-primary underline-offset-4 hover:underline">
                          Open in Google Maps
                        </a>
                      ) : null}
                    </span>
                  </p>
                  {mapSrc ? (
                    <iframe
                      title={`Map showing ${site.shortName}'s office`}
                      src={mapSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="aspect-[4/3] w-full rounded-lg"
                    />
                  ) : null}
                </div>
              ) : (
                <p className="flex items-start gap-3 text-body text-ink-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span>Mumbai, Maharashtra. On-site visits are arranged after the first call.</span>
                </p>
              )}
              {!showAddress ? <ProofSlot what="Office street address, pincode and map link. Fill site.address and site.mapUrl, then set confirmed.address to true." where="lib/site.ts" /> : null}
            </div>
          </div>

          <div className="h-fit rounded-xl bg-[var(--fq-card)] p-6 shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="text-h3 font-extrabold tracking-tight text-ink">Send us your question</h2>
            <p className="mt-2 text-body-sm text-ink-500">
              Tell us your team size and what you need. We confirm your number by OTP, then get back to you.
            </p>
            <div className="mt-6">
              <LeadForm source="enquiry" submitLabel="Send" requirementPlaceholder="e.g. 3 users, moving from Tally.ERP 9, need GST e-invoicing set up" />
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="white">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div className="grid gap-2">
            <h2 className="text-h3 font-extrabold tracking-tight text-ink">Company details</h2>
            <dl className="grid gap-2 text-body text-ink-700">
              <div>
                <dt className="sr-only">Legal name</dt>
                <dd className="font-bold text-ink">{site.name}</dd>
              </div>
              {site.facts.cin ? (
                <div className="flex gap-2">
                  <dt className="text-ink-500">CIN</dt>
                  <dd className="tabular-nums">{site.facts.cin}</dd>
                </div>
              ) : null}
              {site.facts.gstin ? (
                <div className="flex gap-2">
                  <dt className="text-ink-500">GSTIN</dt>
                  <dd className="tabular-nums">{site.facts.gstin}</dd>
                </div>
              ) : null}
            </dl>
            {!site.facts.cin || !site.facts.gstin ? <ProofSlot what="CIN and GSTIN." where="lib/site.ts → facts" /> : null}
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <PartnerBadge />
            <ReviewsBadge />
          </div>
        </div>
      </SectionBand>

      {hasTrustContent() || site.facts.partnerCategory || process.env.NODE_ENV === "development" ? (
        <SectionBand tone="cream">
          <TrustSection />
        </SectionBand>
      ) : null}
    </>
  );
}
