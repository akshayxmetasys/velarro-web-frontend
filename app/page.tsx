import type { Metadata } from "next";
import { HomePage } from "@/components/marketing/home-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  absoluteTitle: "Velarro Estate",
  description: "Discover timeless luxury through Velarro Estate collections.",
  pathname: "/",
  keywords: ["Velarro Estate", "luxury estate", "cigars", "house goods"],
  structuredDataKeys: ["organization", "website", "item-list"],
}).metadata;

export default function Home() {
  return <HomePage />;
}
