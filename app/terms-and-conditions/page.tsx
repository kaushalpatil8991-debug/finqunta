import type { Metadata } from "next";
import { PolicyLayout } from "@/components/page/policy-layout";
import { termsAndConditions } from "@/content/policies/terms-and-conditions";

export const metadata: Metadata = {
  title: termsAndConditions.title,
  description: termsAndConditions.summary,
  alternates: { canonical: `/${termsAndConditions.slug}` },
};

export default function TermsAndConditionsPage() {
  return <PolicyLayout doc={termsAndConditions} />;
}
