import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/seo/discovery-manifest";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
