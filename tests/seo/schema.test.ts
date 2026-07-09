import { describe, expect, it } from "vitest";
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildItemListSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildProductSchema,
  buildWebSiteSchema,
} from "@/lib/seo/schema";

describe("schema helpers", () => {
  it("builds supported JSON-LD types with real content", () => {
    expect(buildOrganizationSchema({ name: "Velarro Estate" })["@type"]).toBe(
      "Organization",
    );
    expect(buildWebSiteSchema({ name: "Velarro Estate" })["@type"]).toBe(
      "WebSite",
    );
    expect(
      buildBreadcrumbListSchema([
        { name: "Home", item: "https://velarroestate.com" },
      ])["@type"],
    ).toBe("BreadcrumbList");
    expect(
      buildItemListSchema({
        name: "Legal routes",
        items: [{ name: "Privacy Policy", item: "/privacy-policy" }],
      })["@type"],
    ).toBe("ItemList");
    expect(
      buildProductSchema({
        name: "Visible Product Name",
        description: "Visible product description from the page.",
        url: "https://velarroestate.com/product",
      })["@type"],
    ).toBe("Product");
    expect(
      buildFaqPageSchema([
        { question: "What is Velarro?", answer: "A visible answer." },
      ])["@type"],
    ).toBe("FAQPage");
    expect(
      buildArticleSchema({
        headline: "Visible article headline",
        url: "https://velarroestate.com/article",
      })["@type"],
    ).toBe("Article");
    expect(
      buildLocalBusinessSchema({
        name: "Visible business name",
        url: "https://velarroestate.com",
      })["@type"],
    ).toBe("LocalBusiness");
  });

  it("rejects placeholder or fake schema values", () => {
    expect(() =>
      buildOrganizationSchema({ name: "placeholder" }),
    ).toThrow(/real visible content/);
    expect(() =>
      buildProductSchema({
        name: "Fake",
        description: "Visible description",
        url: "https://velarroestate.com/product",
      }),
    ).toThrow(/real visible content/);
  });
});
