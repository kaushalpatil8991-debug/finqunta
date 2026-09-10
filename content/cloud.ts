import { CloudBulletSchema, type CloudBullet } from "@/lib/schema";
import { z } from "zod";

export const cloudIntro =
  "Run TallyPrime securely on Finquanta's hosted cloud. Access your data from anywhere, enjoy 99.9% uptime, daily automated backups, and seamless compatibility with all your existing TDLs and add-ons.";

const bullets: CloudBullet[] = [
  {
    title: "Access Tally from anywhere",
    body: "Work remotely across branches, cities, or countries — the same Tally, the same data, on any device.",
  },
  {
    title: "High security",
    body: "Encrypted data at rest and in transit, multi-factor login, and role-based user permissions.",
  },
  {
    title: "Auto backup & recovery",
    body: "Daily automated backups stored off-site. One-click restore to any point in the last 30 days.",
  },
  {
    title: "99.9% uptime",
    body: "Always-on infrastructure hosted in Indian data centres with redundant power and network paths.",
  },
  {
    title: "Multi-user connectivity",
    body: "Concurrent access for your whole team without the LAN bottlenecks of a self-hosted server.",
  },
  {
    title: "Zero IT hassle",
    body: "No servers to maintain, no patches to apply, no antivirus to license — we handle everything.",
  },
];

export const cloudBullets = z.array(CloudBulletSchema).parse(bullets);
