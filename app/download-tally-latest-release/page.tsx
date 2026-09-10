import type { Metadata } from "next";
import { Download as DownloadIcon, Smartphone, HardDrive } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { PageHero } from "@/components/page/page-hero";
import { SectionBand } from "@/components/page/section-band";
import { CtaBand } from "@/components/page/cta-band";
import { formatIndianNumber } from "@/lib/utils";
import {
  downloadHero,
  downloads,
  systemRequirements,
} from "@/content/pages/download";
import type { Download } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Download TallyPrime — latest release",
  description:
    "Download the latest TallyPrime, TallyPrime Server, and Finquanta companion apps. System requirements and release notes included.",
  alternates: { canonical: "/download-tally-latest-release" },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

const osTone: Record<Download["os"], Parameters<typeof Chip>[0]["tone"]> = {
  windows: "info",
  mac: "plum",
  linux: "cream",
  android: "success",
  ios: "sand",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow={downloadHero.eyebrow}
        title={downloadHero.title}
        sub={downloadHero.sub}
        gradient={downloadHero.gradient}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Download" },
        ]}
      />

      <SectionBand tone="cream">
        <div className="flex items-center justify-between gap-4">
          <SectionHeader
            eyebrow="Latest releases"
            title="Current stable builds."
          />
          <Chip tone="plum">
            <DownloadIcon className="h-3 w-3" aria-hidden />
            {downloads.length} downloads
          </Chip>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {downloads.map((d) => (
            <DownloadCard key={d.id} item={d} />
          ))}
        </ul>
      </SectionBand>

      <SectionBand tone="white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <SectionHeader
            eyebrow="System requirements"
            title="What TallyPrime expects from your machine."
            lead="Minimums below; if you are unsure whether your hardware qualifies, send us a screenshot of your system properties — we will tell you."
          />
          <dl className="grid grid-cols-1 divide-y divide-cream-200 overflow-hidden rounded-lg border border-cream-200 bg-cream">
            {systemRequirements.map((row) => (
              <div
                key={row.kind}
                className="grid grid-cols-[1fr_1.4fr] gap-4 p-5 sm:grid-cols-[0.8fr_1.4fr]"
              >
                <dt className="text-body-sm font-semibold text-ink">
                  {row.kind}
                </dt>
                <dd className="text-body-sm text-ink-500">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </SectionBand>

      <CtaBand
        title="Need installation help?"
        sub="Every Finquanta customer gets live install support on the first setup. Active-cover clients always. No strings."
        source="enquiry"
        primaryLabel="Get install help"
      />
    </>
  );
}

function DownloadCard({ item }: { item: Download }) {
  const isMobile = item.os === "android" || item.os === "ios";
  const Icon = isMobile ? Smartphone : HardDrive;

  return (
    <li className="flex flex-col gap-4 rounded-lg border border-cream-200 bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-100 text-primary"
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-h4 font-semibold text-ink">{item.name}</h3>
            <p className="mt-0.5 text-caption text-ink-500">
              v{item.version} · {formatDate(item.releaseDate)}
            </p>
          </div>
        </div>
        <Chip tone={osTone[item.os]}>{item.os}</Chip>
      </div>
      <p className="text-body-sm text-ink-500">{item.notes}</p>
      <div className="mt-auto flex items-center justify-between border-t border-cream-200 pt-4">
        <span className="text-caption text-ink-500">
          {formatIndianNumber(item.sizeMb)} MB
        </span>
        <Button
          asChild
          size="sm"
          variant="outline"
          aria-label={`Download ${item.name} version ${item.version}`}
        >
          <a
            href={`https://tallysolutions.com/download/${item.id}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download
            <DownloadIcon className="h-4 w-4" aria-hidden />
          </a>
        </Button>
      </div>
    </li>
  );
}
