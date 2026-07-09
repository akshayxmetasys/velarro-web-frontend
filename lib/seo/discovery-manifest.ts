import type { MetadataRoute } from "next";
import {
  assertSitemapRoutesAreImplemented,
  buildCanonicalUrl,
  getIndexableRoutes,
  getNonIndexableRoutes,
} from "@/lib/seo/indexability";

export const DISCOVERY_LAST_MODIFIED = new Date("2026-07-09T00:00:00.000Z");

export function getRobotsDisallowRoutes(): string[] {
  return getNonIndexableRoutes().map((route) => route.route);
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const routes = getIndexableRoutes();
  assertSitemapRoutesAreImplemented(routes);

  return routes.map((route) => ({
    url: buildCanonicalUrl(route.route),
    lastModified: DISCOVERY_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: route.route === "/" ? 1 : 0.7,
  }));
}
