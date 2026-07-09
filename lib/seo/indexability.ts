import {
  ROUTE_MANIFEST,
  SITE_URL,
  type RouteManifestEntry,
} from "@/lib/seo/route-manifest";

export function isRouteIndexable(route: RouteManifestEntry): boolean {
  return route.implemented && route.public && route.indexable;
}

export function getIndexableRoutes(): RouteManifestEntry[] {
  return ROUTE_MANIFEST.filter(isRouteIndexable);
}

export function getNonIndexableRoutes(): RouteManifestEntry[] {
  return ROUTE_MANIFEST.filter((route) => !isRouteIndexable(route));
}

export function buildCanonicalUrl(path: string, baseUrl = SITE_URL): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedBase = baseUrl.replace(/\/$/, "");
  return `${normalizedBase}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function assertSitemapRoutesAreImplemented(
  routes: RouteManifestEntry[],
): void {
  const invalidRoutes = routes.filter((route) => !isRouteIndexable(route));

  if (invalidRoutes.length > 0) {
    throw new Error(
      `Sitemap contains non-indexable routes: ${invalidRoutes
        .map((route) => route.route)
        .join(", ")}`,
    );
  }
}
