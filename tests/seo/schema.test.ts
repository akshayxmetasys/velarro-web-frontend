import { describe, expect, it } from "vitest";
import {
  createBreadcrumbListSchema,
  createFAQPageSchema,
  createItemListSchema,
  createOrganizationSchema,
  createProductCollectionSchema,
  createWebsiteSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";

describe("SEO schema helpers", () => {
  it("creates organization and website schemas with schema.org context", () => {
    const organization = createOrganizationSchema({
      name: "Velarro Estate",
      url: "https://velarroestate.com",
    });
    const website = createWebsiteSchema({
      name: "Velarro Estate",
      url: "https://velarroestate.com",
      searchTargetUrlTemplate: "https://velarroestate.com/search?q={search_term_string}",
    });

    expect(organization["@type"]).toBe("Organization");
    expect(organization["@context"]).toBe("https://schema.org");
    expect(website.potentialAction?.["@type"]).toBe("SearchAction");
  });

  it("creates breadcrumb and faq schemas with ordered entities", () => {
    const breadcrumbs = createBreadcrumbListSchema([
      { name: "Home", item: "https://velarroestate.com/" },
      { name: "The House", item: "https://velarroestate.com/the-house" },
    ]);
    const faq = createFAQPageSchema([
      {
        question: "Do you ship globally?",
        answer: "Shipping regions vary by product and legal restrictions.",
      },
    ]);

    expect(breadcrumbs.itemListElement[0].position).toBe(1);
    expect(breadcrumbs.itemListElement[1].position).toBe(2);
    expect(faq.mainEntity[0].acceptedAnswer.text).toContain("Shipping");
  });

  it("creates item list and product collection schemas", () => {
    const list = createItemListSchema([
      {
        name: "Estate Humidor",
        url: "https://velarroestate.com/the-house/the-cabinet/estate-humidor",
      },
    ]);
    const collection = createProductCollectionSchema({
      name: "The Cabinet",
      url: "https://velarroestate.com/the-house/the-cabinet",
      products: [
        {
          name: "Estate Humidor",
          url: "https://velarroestate.com/the-house/the-cabinet/estate-humidor",
        },
      ],
    });

    expect(list.numberOfItems).toBe(1);
    expect(collection.mainEntity["@type"]).toBe("ItemList");
  });

  it("serializes schema to JSON safely", () => {
    const serialized = serializeJsonLd(
      createOrganizationSchema({
        name: "Velarro Estate",
        url: "https://velarroestate.com",
      }),
    );

    expect(serialized).toContain("\"@type\":\"Organization\"");
  });
});
