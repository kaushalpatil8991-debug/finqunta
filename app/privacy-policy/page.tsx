import type { Metadata } from "next";
import { PolicyLayout } from "@/components/page/policy-layout";
import { privacyPolicy } from "@/content/policies/privacy-policy";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.summary,
  alternates: { canonical: `/${privacyPolicy.slug}` },
};

export default function PrivacyPolicyPage() {
  return <PolicyLayout doc={privacyPolicy} />;
}
