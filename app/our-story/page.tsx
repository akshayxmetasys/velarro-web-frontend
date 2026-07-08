import type { Metadata } from "next";
import { OurStoryPage } from "@/components/marketing/our-story-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Our Story",
  description: "The Velarro Estate story of source, craft, heritage, and refinement.",
  pathname: "/our-story",
  keywords: ["Velarro Estate", "our story", "craftsmanship"],
  structuredDataKeys: ["organization", "breadcrumb-list"],
}).metadata;

export default function OurStoryRoute() {
  return <OurStoryPage />;
}
