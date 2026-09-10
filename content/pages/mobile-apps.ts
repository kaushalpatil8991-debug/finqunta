import { z } from "zod";
import {
  FeatureSchema,
  PageHeroSchema,
  type Feature,
  type PageHero,
} from "@/lib/schema";

export const mobileAppsHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Mobile apps",
  title: "Your Tally, in your pocket.",
  sub: "Four companion apps that pull live data from your TallyPrime — for founders watching receivables, field reps booking orders, and managers approving transactions on the move.",
  gradient: "mist",
});

export const mobileAppsFeatures: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "ma-1",
      title: "Business Dashboard",
      body: "Sales, receivables, stock positions, and bank balances — refreshed every 10 minutes from your Tally. For owners and senior managers.",
      icon: "LayoutDashboard",
    },
    {
      id: "ma-2",
      title: "Customer Profiling",
      body: "Field reps see customer history, outstanding balances, and credit limits before every sales call. Cuts 'I'll check and get back' loops.",
      icon: "UserSearch",
    },
    {
      id: "ma-3",
      title: "Transaction Approvals",
      body: "Approve discounts, credit notes, and large orders from your phone — with a full audit trail of who approved what.",
      icon: "CheckSquare",
    },
    {
      id: "ma-4",
      title: "Sales Order Booking",
      body: "Field sales order entry that lands in Tally as draft sales orders, with item lookup, pricing, and stock availability.",
      icon: "ShoppingCart",
    },
  ]);

export const mobileAppsCapabilities = [
  {
    title: "Real-time sync",
    body: "Connects to your TallyPrime via a secure Finquanta sync service. Updates every 10 minutes; on-demand refresh always available.",
  },
  {
    title: "Offline-tolerant",
    body: "Field reps can create orders offline; they land in Tally the next time the device reconnects to the internet.",
  },
  {
    title: "Role-based access",
    body: "Each user sees only what their Tally role permits. Owners see all; reps see their territory; managers see their cluster.",
  },
  {
    title: "Android & iOS",
    body: "Both platforms supported. Same data, same screens, same permissions model.",
  },
] as const;
