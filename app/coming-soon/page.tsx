import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/marketing/coming-soon-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Coming Soon",
  description: "A Velarro Estate experience is being prepared.",
  pathname: "/coming-soon",
  noIndex: true,
}).metadata;

export default function ComingSoonRoute() {
  return <ComingSoonPage />;
}
