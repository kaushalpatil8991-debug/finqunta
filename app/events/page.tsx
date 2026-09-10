import type { Metadata } from "next";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { CtaBand } from "@/components/page/cta-band";
import { eventsHero, events } from "@/content/pages/events";
import type { Event } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Events & workshops",
  description:
    "Upcoming and past Finquanta webinars, workshops, and meetups — covering TallyPrime, GST, cloud migration, and MIS.",
  alternates: { canonical: "/events" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

const kindTone: Record<Event["kind"], Parameters<typeof Chip>[0]["tone"]> = {
  webinar: "plum",
  workshop: "sand",
  meetup: "info",
  announcement: "cream",
};

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <>
      <PageHero
        eyebrow={eventsHero.eyebrow}
        title={eventsHero.title}
        sub={eventsHero.sub}
        gradient={eventsHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-us" },
          { label: "Events" },
        ]}
      />

      <SectionBand tone="cream">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Upcoming"
            title="What is on the calendar."
          />
          <Chip tone="sand">
            <Sparkles className="h-3 w-3" aria-hidden /> All sessions are free
          </Chip>
        </div>

        {upcoming.length === 0 ? (
          <p className="mt-10 rounded-lg border border-cream-200 bg-white p-8 text-center text-body text-ink-500">
            No upcoming sessions right now — check back soon, or join the
            newsletter at the foot of the page to get dates first.
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </ul>
        )}
      </SectionBand>

      {past.length > 0 && (
        <SectionBand tone="white">
          <SectionHeader
            eyebrow="Past"
            title="Recordings from earlier sessions."
            lead="Ask your Finquanta contact for the recording link — or drop a line via the enquiry form."
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {past.map((ev) => (
              <li
                key={ev.id}
                className="flex flex-col gap-2 rounded-lg border border-cream-200 bg-cream p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone={kindTone[ev.kind]}>{ev.kind}</Chip>
                  <span className="text-caption text-ink-500">
                    {formatDate(ev.date)}
                  </span>
                </div>
                <h3 className="text-h4 font-semibold text-ink">{ev.title}</h3>
                <p className="text-body-sm text-ink-500">{ev.summary}</p>
              </li>
            ))}
          </ul>
        </SectionBand>
      )}

      <CtaBand
        title="Want a workshop run inside your team?"
        sub="Private onsite and virtual sessions on TallyPrime, GST, e-invoicing, and MIS — tailored to your team's actual workflow."
        source="enquiry"
        primaryLabel="Request a private session"
      />
    </>
  );
}

function EventCard({ ev }: { ev: Event }) {
  return (
    <li className="flex h-full flex-col gap-3 rounded-lg border border-cream-200 bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone={kindTone[ev.kind]}>{ev.kind}</Chip>
      </div>
      <h3 className="text-h4 font-semibold text-ink">{ev.title}</h3>
      <p className="text-body-sm text-ink-500">{ev.summary}</p>
      <div className="mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 pt-3 text-body-sm text-ink-500">
        <Calendar className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
        <span>{formatDate(ev.date)}</span>
        <MapPin className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
        <span>{ev.location}</span>
      </div>
    </li>
  );
}
