import { describe, expect, it, vi } from "vitest";
import { metadata as rootMetadata } from "@/app/layout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildCanonicalUrl } from "@/lib/seo/indexability";

vi.mock("next/font/google", () => ({
  Noto_Sans: () => ({ variable: "--font-noto-sans" }),
}));

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

  it("keeps root metadata safe for under-21 source rendering", () => {
    const description = String(rootMetadata.description).toLowerCase();

    expect(description).not.toContain("cigar");
    expect(description).not.toContain("tobacco");
  });
});
