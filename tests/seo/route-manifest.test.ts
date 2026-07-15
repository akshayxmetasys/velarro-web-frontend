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
    expect(findRouteManifestEntry("/the-vault")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/the-vault")?.indexable).toBe(false);
    expect(findRouteManifestEntry("/the-chronicle")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/the-chronicle")?.indexable).toBe(false);
    expect(findRouteManifestEntry("/pairing-guide")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/pairing-guide")?.indexable).toBe(false);
    expect(findRouteManifestEntry("/partner")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/partner")?.indexable).toBe(false);
    expect(findRouteManifestEntry("/careers")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/careers")?.indexable).toBe(false);
    expect(findRouteManifestEntry("/get-in-touch")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/get-in-touch")?.indexable).toBe(false);
    expect(findRouteManifestEntry("/membership")?.implemented).toBe(true);
    expect(findRouteManifestEntry("/membership")?.indexable).toBe(false);
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

  it("marks The Vault as an implemented over-21 restricted route", () => {
    expect(findRouteManifestEntry("/the-vault")).toMatchObject({
      route: "/the-vault",
      module: "M05-vault",
      figmaNodeId: "14240:78024",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
  });

  it("marks The Chronicle as an implemented over-21 restricted editorial route", () => {
    expect(findRouteManifestEntry("/the-chronicle")).toMatchObject({
      route: "/the-chronicle",
      module: "M08-editorial",
      figmaNodeId: "14284:63187",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
  });

  it("marks Pairing Guide as an implemented over-21 restricted editorial route", () => {
    expect(findRouteManifestEntry("/pairing-guide")).toMatchObject({
      route: "/pairing-guide",
      module: "M08-editorial",
      figmaNodeId: "14406:85066",
      implemented: true,
      public: true,
      indexable: false,
      audience: "age-gated",
    });
  });

  it("marks Careers as an implemented public review route", () => {
    expect(findRouteManifestEntry("/careers")).toMatchObject({
      route: "/careers",
      module: "M09-engagement",
      figmaNodeId: "13148:15771",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it("marks Partner as an implemented public review route", () => {
    expect(findRouteManifestEntry("/partner")).toMatchObject({
      route: "/partner",
      module: "M09-engagement",
      figmaNodeId: "14670:42180",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it("marks Get in Touch as an implemented public review route", () => {
    expect(findRouteManifestEntry("/get-in-touch")).toMatchObject({
      route: "/get-in-touch",
      module: "M09-engagement",
      figmaNodeId: "14644:34661",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });

  it("marks Membership as an implemented public review route", () => {
    expect(findRouteManifestEntry("/membership")).toMatchObject({
      route: "/membership",
      module: "M09-engagement",
      figmaNodeId: "15008:38309",
      implemented: true,
      public: true,
      indexable: false,
      audience: "review",
    });
  });
});
