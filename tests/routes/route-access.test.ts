import { describe, expect, it } from "vitest";
import {
  getRouteAccess,
  isUnder21BlockedRoute,
  shouldGateUnknownRoute,
} from "@/lib/age/route-access";

describe("route access", () => {
  it("blocks under-21 visitors from cigar and checkout routes", () => {
    expect(isUnder21BlockedRoute("/the-estate/the-humidor")).toBe(true);
    expect(isUnder21BlockedRoute("/cart")).toBe(true);
    expect(isUnder21BlockedRoute("/checkout/payment")).toBe(true);
    expect(isUnder21BlockedRoute("/pairing-guide")).toBe(true);
    expect(getRouteAccess("/the-vault", "under21").decision).toBe("block");
  });

  it("gates unknown visitors before protected content", () => {
    expect(shouldGateUnknownRoute("/")).toBe(true);
    expect(shouldGateUnknownRoute("/the-estate")).toBe(true);
    expect(getRouteAccess("/the-chronicle", "unknown").decision).toBe("gate");
  });

  it("allows over-21 visitors through the planned route map", () => {
    expect(getRouteAccess("/the-estate/the-humidor", "over21")).toMatchObject({
      decision: "allow",
    });
  });
});
