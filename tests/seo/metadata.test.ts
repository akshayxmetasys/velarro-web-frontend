import { describe, expect, it } from "vitest";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildCanonicalUrl } from "@/lib/seo/indexability";

describe("metadata helpers", () => {
  it("builds canonical URLs", () => {
    expect(buildCanonicalUrl("/")).toBe("https://velarroestate.com");
    expect(buildCanonicalUrl("/privacy-policy")).toBe(
      "https://velarroestate.com/privacy-policy",
    );
  });

  it("keeps unimplemented pages noindex by default", () => {
    const metadata = buildPageMetadata({
      title: "Velarro Estate",
      description: "Velarro Estate foundation route.",
      path: "/",
    });

    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.alternates?.canonical).toBe("https://velarroestate.com");
  });
});
