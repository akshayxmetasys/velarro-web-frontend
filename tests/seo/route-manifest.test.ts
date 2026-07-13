import { describe, expect, it } from "vitest";
import {
  ROUTE_MANIFEST,
  findRouteManifestEntry,
} from "@/lib/seo/route-manifest";
import { getIndexableRoutes } from "@/lib/seo/indexability";

describe("route manifest", () => {
  it("marks only implemented public routes as indexable", () => {
    expect(getIndexableRoutes().map((route) => route.route)).toEqual(["/"]);
    expect(findRouteManifestEntry("/the-estate")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/the-estate")?.indexable).toBe(false);
    expect(findRouteManifestEntry("/the-estate/the-house")?.implemented).toBe(
      true,
    );
    expect(findRouteManifestEntry("/the-estate/the-house")?.indexable).toBe(
      false,
    );
    expect(findRouteManifestEntry("/our-story")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/our-story")?.indexable).toBe(false);
  });

  it("keeps route entries typed and unique", () => {
    const routePaths = ROUTE_MANIFEST.map((route) => route.route);

    expect(new Set(routePaths).size).toBe(routePaths.length);
    expect(routePaths).toContain("/");
    expect(routePaths).toContain("/privacy-policy");
  });

  it("marks Our Story as an implemented over-21 restricted route", () => {
    expect(findRouteManifestEntry("/our-story")).toMatchObject({
      route: "/our-story",
      module: "M10-legal-info",
      figmaNodeId: "15934:43007",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
  });

  it("marks The Estate as an implemented over-21 restricted route", () => {
    expect(findRouteManifestEntry("/the-estate")).toMatchObject({
      route: "/the-estate",
      module: "M03-estate",
      figmaNodeId: "16576:98447",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
  });

  it("marks The Estate House tab as an implemented over-21 restricted route", () => {
    expect(findRouteManifestEntry("/the-estate/the-house")).toMatchObject({
      route: "/the-estate/the-house",
      module: "M03-estate",
      figmaNodeId: "16576:96095",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
  });
});
