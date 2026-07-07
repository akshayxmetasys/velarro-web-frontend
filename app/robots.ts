import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/seo/metadata";
import { getRobotsDisallowPatterns } from "@/lib/seo/route-manifest";

export default function robots(): MetadataRoute.Robots {
  const disallow = getRobotsDisallowPatterns();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
