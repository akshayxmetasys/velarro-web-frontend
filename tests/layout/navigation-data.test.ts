import { describe, expect, it } from "vitest";
import {
  getNavigationItemsForAgeState,
  OVER_21_NAVIGATION_ITEMS,
  UNDER_21_NAVIGATION_ITEMS,
} from "@/components/layout/navigation-data";

describe("navigation data", () => {
  it("keeps under-21 navigation free of over-21-only items", () => {
    expect(UNDER_21_NAVIGATION_ITEMS.every((item) => !item.requiresOver21)).toBe(
      true,
    );
    expect(getNavigationItemsForAgeState("under21")).toBe(
      UNDER_21_NAVIGATION_ITEMS,
    );
  });

  it("returns over-21 navigation for over21 state", () => {
    expect(getNavigationItemsForAgeState("over21")).toBe(
      OVER_21_NAVIGATION_ITEMS,
    );
  });

  it("keeps The Vault navigation pointed at the approved route", () => {
    expect(OVER_21_NAVIGATION_ITEMS).toContainEqual({
      label: "The Vault",
      href: "/the-vault",
      requiresOver21: true,
    });
  });
});
