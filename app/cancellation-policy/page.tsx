import type { Metadata } from "next";
import { PolicyLayout } from "@/components/page/policy-layout";
import { cancellationPolicy } from "@/content/policies/cancellation-policy";

export const metadata: Metadata = {
  title: cancellationPolicy.title,
  description: cancellationPolicy.summary,
  alternates: { canonical: `/${cancellationPolicy.slug}` },
};

export default function CancellationPolicyPage() {
  return <PolicyLayout doc={cancellationPolicy} />;
}
