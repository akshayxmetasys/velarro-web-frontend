import { describe, expect, it } from "vitest";
import {
  ROUTE_MANIFEST,
  findRouteManifestEntry,
} from "@/lib/seo/route-manifest";
import { getIndexableRoutes } from "@/lib/seo/indexability";

describe("route manifest", () => {
  it("marks only implemented public routes as indexable", () => {
    expect(getIndexableRoutes().map((route) => route.route)).toEqual(["/"]);
    expect(findRouteManifestEntry("/the-estate")?.implemented).toBe(false);
    expect(findRouteManifestEntry("/the-estate")?.indexable).toBe(false);
  });

  it("keeps route entries typed and unique", () => {
    const routePaths = ROUTE_MANIFEST.map((route) => route.route);

    expect(new Set(routePaths).size).toBe(routePaths.length);
    expect(routePaths).toContain("/");
    expect(routePaths).toContain("/privacy-policy");
  });
});
