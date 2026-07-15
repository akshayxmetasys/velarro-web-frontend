import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots", () => {
  it("points crawlers at the sitemap and disallows unimplemented routes", () => {
    const output = robots();

    expect(output.sitemap).toBe("https://velarroestate.com/sitemap.xml");
    expect(output.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
    });
    expect(output.rules).not.toBeInstanceOf(Array);
    const rules = output.rules as Exclude<typeof output.rules, Array<unknown>>;
    expect(rules.disallow).toContain("/the-estate");
    expect(rules.disallow).toContain("/cart");
  });
});
