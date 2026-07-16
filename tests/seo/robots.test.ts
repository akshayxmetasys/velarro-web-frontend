import { describe, expect, it } from "vitest";

import robots from "@/app/robots";

describe("robots", () => {
  it("points crawlers at the sitemap and disallows unimplemented routes", () => {
    const output = robots();

    expect(output.sitemap).toBe(
      "https://velarroestate.com/sitemap.xml",
    );

    expect(Array.isArray(output.rules)).toBe(false);

    if (Array.isArray(output.rules)) {
      throw new Error(
        "Expected robots.rules to contain one rule object, not an array.",
      );
    }

    expect(output.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
    });

    expect(output.rules.disallow).toContain("/the-estate");
    expect(output.rules.disallow).toContain("/cart");
  });
});