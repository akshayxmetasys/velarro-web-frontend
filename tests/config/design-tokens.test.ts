import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const globalsCss = readFileSync(
  join(process.cwd(), "app/globals.css"),
  "utf8",
);

describe("design token contracts (M00.5)", () => {
  it("defines radius-sm used by form controls", () => {
    expect(globalsCss).toMatch(/--radius-sm:\s*4px/);
    expect(globalsCss).toMatch(/--radius-sm:\s*var\(--radius-sm\)/);
  });

  it("defines navbar overlay from Figma navbar glass treatment", () => {
    expect(globalsCss).toMatch(
      /--color-background-navbar-overlay:\s*rgba\(29,\s*28,\s*26,\s*0\.6\)/,
    );
  });

  it("defines shared form error and success roles", () => {
    expect(globalsCss).toMatch(/--color-text-error:\s*#8a2c20/);
    expect(globalsCss).toMatch(/--color-border-error:\s*#8a2c20/);
    expect(globalsCss).toMatch(/--color-text-success:\s*#465739/);
    expect(globalsCss).toMatch(/--color-background-success:\s*#e6ebdd/);
  });
});
