import type { MetadataRoute } from "next";
import { getRobotsDisallowRoutes } from "@/lib/seo/discovery-manifest";
import { buildCanonicalUrl } from "@/lib/seo/indexability";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: getRobotsDisallowRoutes(),
    },
    sitemap: buildCanonicalUrl("/sitemap.xml"),
  };
}
