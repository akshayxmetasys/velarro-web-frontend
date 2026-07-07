import { describe, expect, it } from "vitest";
import prototypeRouteMap from "@/docs/implementation/prototype-route-map.json";
import {
  footerNavigationSections,
  isPrototypeRoute,
  mainNavigationLinks,
  utilityNavigationLinks,
} from "@/components/layout/navigation-data";

type PrototypeRouteEntry = {
  route: string;
};

describe("shell navigation data", () => {
  it("keeps all shell links backed by prototype-route-map routes", () => {
    const prototypeRoutes = new Set(
      (prototypeRouteMap.routes as PrototypeRouteEntry[]).map((entry) => entry.route),
    );
    const links = [
      ...mainNavigationLinks,
      ...utilityNavigationLinks,
      ...footerNavigationSections.flatMap((section) => section.links),
    ];

    expect(links.length).toBeGreaterThan(0);
    expect(links.every((link) => prototypeRoutes.has(link.href))).toBe(true);
  });

  it("identifies prototype routes for breadcrumb linking", () => {
    expect(isPrototypeRoute("/the-house")).toBe(true);
    expect(isPrototypeRoute("/not-a-route")).toBe(false);
  });
});

