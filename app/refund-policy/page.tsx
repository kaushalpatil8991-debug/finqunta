import type { Metadata } from "next";
import { PolicyLayout } from "@/components/page/policy-layout";
import { refundPolicy } from "@/content/policies/refund-policy";

export const metadata: Metadata = {
  title: refundPolicy.title,
  description: refundPolicy.summary,
  alternates: { canonical: `/${refundPolicy.slug}` },
};

export default function RefundPolicyPage() {
  return <PolicyLayout doc={refundPolicy} />;
}
