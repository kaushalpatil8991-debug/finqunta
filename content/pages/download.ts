import { z } from "zod";
import {
  DownloadSchema,
  PageHeroSchema,
  type Download,
  type PageHero,
} from "@/lib/schema";

export const downloadHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Download TallyPrime",
  title: "Get the latest TallyPrime release.",
  sub: "Download TallyPrime installers, companion apps, and utilities. All downloads are hosted at Tally's official mirrors; we link you through.",
  gradient: "mist",
});

export const downloads: readonly Download[] = z
  .array(DownloadSchema)
  .parse([
    {
      id: "d-tp",
      name: "TallyPrime",
      version: "5.0.2",
      sizeMb: 176,
      releaseDate: "2026-04-08",
      notes:
        "Latest stable TallyPrime for Windows. Includes dashboard rework, connected banking, and TallyPrime 5.0 statutory updates.",
      os: "windows",
    },
    {
      id: "d-tps",
      name: "TallyPrime Server",
      version: "5.0.2",
      sizeMb: 204,
      releaseDate: "2026-04-08",
      notes:
        "Multi-user server edition for concurrent access across teams of 10+.",
      os: "windows",
    },
    {
      id: "d-tve",
      name: "TallyPrime Developer",
      version: "5.0.2",
      sizeMb: 182,
      releaseDate: "2026-04-08",
      notes:
        "For partners and TDL developers. Not required for end-user installations.",
      os: "windows",
    },
    {
      id: "d-ts-installer",
      name: "Tally Shoper (POS add-on)",
      version: "9.5",
      sizeMb: 68,
      releaseDate: "2025-11-14",
      notes:
        "Point-of-sale add-on for retailers; syncs to TallyPrime every night.",
      os: "windows",
    },
    {
      id: "d-mobile-android",
      name: "Finquanta Business Dashboard",
      version: "2.4.0",
      sizeMb: 22,
      releaseDate: "2026-03-30",
      notes:
        "Android companion app for our hosted customers. View sales, receivables, stock, and bank positions from your phone.",
      os: "android",
    },
  ]);

export const systemRequirements = [
  {
    kind: "Operating system",
    value: "Windows 10 / 11 (64-bit) · Windows Server 2019 / 2022",
  },
  { kind: "Processor", value: "1.8 GHz 64-bit, 2 cores or faster" },
  { kind: "RAM", value: "4 GB minimum · 8 GB recommended" },
  { kind: "Disk space", value: "2 GB free for TallyPrime; 5 GB for data" },
  { kind: "Display", value: "1366×768 minimum; 1920×1080 recommended" },
  { kind: "Internet", value: "Required for activation, TSS, and e-invoice" },
] as const;
