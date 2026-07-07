import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/seo/metadata";
import { getSitemapInventory } from "@/lib/seo/route-manifest";

const LAST_MODIFIED = new Date("2026-07-07T00:00:00.000Z");

function getPriority(path: string, pageType: string): number {
  if (path === "/") {
    return 1;
  }

  if (pageType.includes("product")) {
    return 0.9;
  }

  if (pageType.includes("category") || pageType.includes("marketing")) {
    return 0.8;
  }

  if (pageType.includes("editorial")) {
    return 0.7;
  }

  return 0.6;
}

function getChangeFrequency(
  pageType: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (pageType.includes("product") || pageType.includes("listing")) {
    return "weekly";
  }

  if (pageType.includes("marketing") || pageType.includes("editorial")) {
    return "monthly";
  }

  return "yearly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapInventory().map((route) => ({
    url: new URL(route.path, SITE_ORIGIN).toString(),
    lastModified: LAST_MODIFIED,
    changeFrequency: getChangeFrequency(route.pageType),
    priority: getPriority(route.path, route.pageType),
  }));
}
