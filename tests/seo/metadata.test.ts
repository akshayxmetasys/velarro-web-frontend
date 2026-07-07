import { describe, expect, it } from "vitest";
import {
  SITE_NAME,
  createPageMetadata,
  createRootMetadata,
  getStructuredDataScriptId,
} from "@/lib/seo/metadata";

describe("SEO metadata helpers", () => {
  it("creates root metadata with title template and canonical base", () => {
    const metadata = createRootMetadata();

    expect(metadata.title).toEqual({
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    });
    expect(metadata.metadataBase?.toString()).toBe("https://velarroestate.com/");
    expect(metadata.openGraph?.siteName).toBe(SITE_NAME);
    expect(metadata.twitter?.card).toBe("summary_large_image");
  });

  it("builds page metadata with canonical, robots and structured-data keys", () => {
    const result = createPageMetadata({
      title: "The House",
      description: "Explore Velarro house goods.",
      pathname: "/the-house",
      structuredDataKeys: ["organization", "breadcrumb-list"],
    });

    expect(result.metadata.alternates?.canonical).toBe("/the-house");
    expect(result.metadata.robots).toMatchObject({
      index: true,
      follow: true,
    });
    expect(result.structuredData).toEqual([
      { key: "organization", scriptId: "ld-organization" },
      { key: "breadcrumb-list", scriptId: "ld-breadcrumb-list" },
    ]);
  });

  it("supports noindex pages for account and checkout surfaces", () => {
    const { metadata } = createPageMetadata({
      title: "Checkout",
      pathname: "/checkout/payment",
      noIndex: true,
    });

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });

  it("creates deterministic structured-data script ids", () => {
    expect(getStructuredDataScriptId("faq-page")).toBe("ld-faq-page");
    expect(getStructuredDataScriptId("item-list", "home-rail")).toBe(
      "ld-item-list-home-rail",
    );
  });
});
