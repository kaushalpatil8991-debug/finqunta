import { StatSchema, type Stat } from "@/lib/schema";
import { z } from "zod";

/**
 * Conservative Finquanta-plausible numbers. PLACEHOLDER values — replace with
 * real metrics before launch. Numbers render with Indian digit grouping
 * (formatIndianNumber) so 18500 -> "18,500".
 */
const raw: Stat[] = [
  { id: "s-experience", value: 7, suffix: "+", label: "Years of Tally experience", icon: "Calendar" },
  { id: "s-customers", value: 250, suffix: "+", label: "Businesses served", icon: "Users" },
  { id: "s-tickets", value: 18500, suffix: "+", label: "Support tickets resolved", icon: "Headphones" },
  { id: "s-tdls", value: 90, suffix: "+", label: "Custom TDLs deployed", icon: "Code2" },
  { id: "s-trained", value: 600, suffix: "+", label: "Users trained", icon: "GraduationCap" },
];

export const stats = z.array(StatSchema).parse(raw);
