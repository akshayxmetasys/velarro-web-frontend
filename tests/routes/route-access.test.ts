import { describe, expect, it } from "vitest";
import {
  getRouteAccess,
  isUnder21BlockedRoute,
  shouldGateUnknownRoute,
} from "@/lib/age/route-access";

describe("route access", () => {
  it("blocks under-21 visitors from cigar and checkout routes", () => {
    expect(isUnder21BlockedRoute("/the-estate")).toBe(true);
    expect(isUnder21BlockedRoute("/the-estate/the-humidor")).toBe(true);
    expect(isUnder21BlockedRoute("/the-estate/the-house")).toBe(true);
    expect(isUnder21BlockedRoute("/our-story")).toBe(true);
    expect(isUnder21BlockedRoute("/the-vault")).toBe(true);
    expect(isUnder21BlockedRoute("/the-chronicle")).toBe(true);
    expect(isUnder21BlockedRoute("/cart")).toBe(true);
    expect(isUnder21BlockedRoute("/checkout/payment")).toBe(true);
    expect(isUnder21BlockedRoute("/pairing-guide")).toBe(true);
    expect(isUnder21BlockedRoute("/pairing-guide/find-your-pairing")).toBe(true);
    expect(isUnder21BlockedRoute("/partner")).toBe(false);
    expect(isUnder21BlockedRoute("/careers")).toBe(false);
    expect(getRouteAccess("/the-vault", "under21").decision).toBe("block");
    expect(getRouteAccess("/the-chronicle", "under21").decision).toBe("block");
    expect(getRouteAccess("/pairing-guide", "under21").decision).toBe("block");
    expect(getRouteAccess("/the-estate", "under21").decision).toBe("block");
    expect(getRouteAccess("/the-estate/the-house", "under21").decision).toBe(
      "block",
    );
    expect(getRouteAccess("/our-story", "under21").decision).toBe("block");
    expect(getRouteAccess("/partner", "under21").decision).toBe("review");
    expect(getRouteAccess("/careers", "under21").decision).toBe("review");
    expect(getRouteAccess("/careers/positions", "under21").decision).toBe("review");
    expect(getRouteAccess("/get-in-touch", "under21").decision).toBe("review");
    expect(getRouteAccess("/membership", "under21").decision).toBe("review");
  });

  it("gates unknown visitors before protected content", () => {
    expect(shouldGateUnknownRoute("/")).toBe(true);
    expect(shouldGateUnknownRoute("/the-estate")).toBe(true);
    expect(shouldGateUnknownRoute("/the-estate/the-house")).toBe(true);
    expect(shouldGateUnknownRoute("/our-story")).toBe(true);
    expect(shouldGateUnknownRoute("/the-vault")).toBe(true);
    expect(shouldGateUnknownRoute("/the-chronicle")).toBe(true);
    expect(shouldGateUnknownRoute("/pairing-guide")).toBe(true);
    expect(shouldGateUnknownRoute("/pairing-guide/rum-and-cigars")).toBe(true);
    expect(shouldGateUnknownRoute("/partner")).toBe(false);
    expect(shouldGateUnknownRoute("/careers")).toBe(false);
    expect(shouldGateUnknownRoute("/careers/positions")).toBe(false);
    expect(shouldGateUnknownRoute("/get-in-touch")).toBe(false);
    expect(shouldGateUnknownRoute("/membership")).toBe(false);
    expect(getRouteAccess("/the-chronicle", "unknown").decision).toBe("gate");
    expect(getRouteAccess("/pairing-guide", "unknown").decision).toBe("gate");
    expect(getRouteAccess("/the-vault", "unknown").decision).toBe("gate");
    expect(getRouteAccess("/the-estate", "unknown").decision).toBe("gate");
    expect(getRouteAccess("/the-estate/the-house", "unknown").decision).toBe(
      "gate",
    );
    expect(getRouteAccess("/our-story", "unknown").decision).toBe("gate");
    expect(getRouteAccess("/partner", "unknown").decision).toBe("review");
    expect(getRouteAccess("/careers", "unknown").decision).toBe("review");
    expect(getRouteAccess("/careers/positions", "unknown").decision).toBe("review");
    expect(getRouteAccess("/get-in-touch", "unknown").decision).toBe("review");
    expect(getRouteAccess("/membership", "unknown").decision).toBe("review");
  });

  it("allows over-21 visitors through the planned route map", () => {
    expect(getRouteAccess("/the-estate", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/the-estate/the-humidor", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/the-estate/the-house", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/our-story", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/the-vault", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/the-chronicle", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/pairing-guide", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/partner", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/careers", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/careers/positions", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/get-in-touch", "over21")).toMatchObject({
      decision: "allow",
    });
    expect(getRouteAccess("/membership", "over21")).toMatchObject({
      decision: "allow",
    });
  });
});
