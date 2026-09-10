import { ClientSchema, type Client } from "@/lib/schema";
import { z } from "zod";

/**
 * 12 invented Indian SME client names, rendered as text-wordmark SVGs in muted plum.
 * All flagged isPlaceholder; replace with real client list before launch.
 */
const raw: Client[] = [
  { id: "c-mahalaxmi", isPlaceholder: true, name: "Mahalaxmi Distributors", sector: "Distribution" },
  { id: "c-sai-ind", isPlaceholder: true, name: "Sai Industries", sector: "Manufacturing" },
  { id: "c-konkan", isPlaceholder: true, name: "Konkan Traders", sector: "Distribution" },
  { id: "c-deccan-poly", isPlaceholder: true, name: "Deccan Polymers", sector: "Chemicals" },
  { id: "c-neelkanth", isPlaceholder: true, name: "Neelkanth Foods", sector: "FMCG" },
  { id: "c-sahyadri-pharma", isPlaceholder: true, name: "Sahyadri Pharma", sector: "Pharma" },
  { id: "c-rangoli", isPlaceholder: true, name: "Rangoli Textiles", sector: "Textiles" },
  { id: "c-pranay-exports", isPlaceholder: true, name: "Pranay Exports", sector: "Exports" },
  { id: "c-vikram-ent", isPlaceholder: true, name: "Vikram Enterprises", sector: "Trading" },
  { id: "c-aarambh", isPlaceholder: true, name: "Aarambh Retail", sector: "Retail" },
  { id: "c-shreeji", isPlaceholder: true, name: "Shreeji Packaging", sector: "Packaging" },
  { id: "c-maitri-chem", isPlaceholder: true, name: "Maitri Chemicals", sector: "Chemicals" },
];

export const clients = z.array(ClientSchema).parse(raw);
