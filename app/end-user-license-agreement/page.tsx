import type { Metadata } from "next";
import { PolicyLayout } from "@/components/page/policy-layout";
import { endUserLicenseAgreement } from "@/content/policies/end-user-license-agreement";

export const metadata: Metadata = {
  title: endUserLicenseAgreement.title,
  description: endUserLicenseAgreement.summary,
  alternates: { canonical: `/${endUserLicenseAgreement.slug}` },
};

export default function EulaPage() {
  return <PolicyLayout doc={endUserLicenseAgreement} />;
}
