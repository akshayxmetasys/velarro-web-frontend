import { describe, expect, it } from "vitest";
import {
  ROUTE_INVENTORY,
  getRobotsDisallowPatterns,
  getSitemapInventory,
} from "@/lib/seo/route-manifest";

describe("SEO route manifest", () => {
  it("keeps planning route inventory aligned to expected count", () => {
    expect(ROUTE_INVENTORY).toHaveLength(57);
  });

  it("exposes only sitemap-safe static indexable routes", () => {
    const sitemapRoutes = getSitemapInventory();

    expect(sitemapRoutes.every((route) => route.indexable)).toBe(true);
    expect(sitemapRoutes.every((route) => !route.path.includes("["))).toBe(true);
    expect(sitemapRoutes.some((route) => route.path === "/")).toBe(true);
  });

  it("builds robots disallow patterns for non-index pages", () => {
    const disallow = getRobotsDisallowPatterns();

    expect(disallow).toContain("/login");
    expect(disallow).toContain("/checkout/payment");
    expect(disallow).toContain("/careers/positions/*/apply");
  });
});
