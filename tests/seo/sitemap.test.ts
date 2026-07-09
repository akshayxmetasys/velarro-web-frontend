import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { assertSitemapRoutesAreImplemented } from "@/lib/seo/indexability";
import { findRouteManifestEntry } from "@/lib/seo/route-manifest";

describe("sitemap", () => {
  it("includes only implemented public indexable routes", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(1);
    expect(entries[0].url).toBe("https://velarroestate.com");
    expect(entries.map((entry) => entry.url)).not.toContain(
      "https://velarroestate.com/the-estate",
    );
  });

  it("fails if non-indexable routes are inserted", () => {
    const plannedRoute = findRouteManifestEntry("/the-estate");

    expect(plannedRoute).toBeDefined();
    expect(() => assertSitemapRoutesAreImplemented([plannedRoute!])).toThrow(
      /non-indexable/,
    );
  });
});
