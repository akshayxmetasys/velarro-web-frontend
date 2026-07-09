import type { AgeState } from "@/lib/age/age-state";

export type RouteAccessDecision = "allow" | "gate" | "block" | "review";

export interface RouteAccessResult {
  route: string;
  ageState: AgeState;
  decision: RouteAccessDecision;
  reason: string;
}

const UNDER_21_BLOCKED_PREFIXES = [
  "/the-estate",
  "/the-vault",
  "/cart",
  "/checkout",
  "/the-chronicle",
  "/pairing-guide",
];

const UNKNOWN_GATED_PREFIXES = [
  "/the-estate",
  "/the-house",
  "/the-vault",
  "/cart",
  "/checkout",
  "/the-chronicle",
  "/pairing-guide",
];

const REVIEW_PREFIXES = [
  "/the-house",
  "/membership",
  "/partner",
  "/careers",
  "/get-in-touch",
  "/our-story",
  "/press",
  "/craftsmanship",
  "/sustainability",
];

const LEGAL_SAFE_ROUTES = new Set([
  "/accessibility",
  "/cookie-policy",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
]);

export function normalizeRoutePath(route: string): string {
  if (!route.startsWith("/")) {
    return `/${route}`;
  }

  return route === "" ? "/" : route;
}

function matchesPrefix(route: string, prefix: string): boolean {
  return route === prefix || route.startsWith(`${prefix}/`);
}

export function isUnder21BlockedRoute(route: string): boolean {
  const normalizedRoute = normalizeRoutePath(route);
  return UNDER_21_BLOCKED_PREFIXES.some((prefix) =>
    matchesPrefix(normalizedRoute, prefix),
  );
}

export function shouldGateUnknownRoute(route: string): boolean {
  const normalizedRoute = normalizeRoutePath(route);

  if (normalizedRoute === "/") {
    return true;
  }

  return UNKNOWN_GATED_PREFIXES.some((prefix) =>
    matchesPrefix(normalizedRoute, prefix),
  );
}

export function getRouteAccess(route: string, ageState: AgeState): RouteAccessResult {
  const normalizedRoute = normalizeRoutePath(route);

  if (ageState === "over21") {
    return {
      route: normalizedRoute,
      ageState,
      decision: "allow",
      reason: "Over-21 visitors may use the over-21 route map.",
    };
  }

  if (ageState === "unknown") {
    return {
      route: normalizedRoute,
      ageState,
      decision: shouldGateUnknownRoute(normalizedRoute) ? "gate" : "review",
      reason:
        "Unknown visitors must confirm age before cigar or tobacco content is available.",
    };
  }

  if (isUnder21BlockedRoute(normalizedRoute)) {
    return {
      route: normalizedRoute,
      ageState,
      decision: "block",
      reason:
        "Under-21 visitors must not access cigar, tobacco, cart, checkout, or tobacco editorial content.",
    };
  }

  if (
    LEGAL_SAFE_ROUTES.has(normalizedRoute) ||
    normalizedRoute === "/"
  ) {
    return {
      route: normalizedRoute,
      ageState,
      decision: "allow",
      reason: "Route is safe or represents the under-21 root state.",
    };
  }

  if (REVIEW_PREFIXES.some((prefix) => matchesPrefix(normalizedRoute, prefix))) {
    return {
      route: normalizedRoute,
      ageState,
      decision: "review",
      reason: "Route needs product/legal review for under-21 visibility.",
    };
  }

  return {
    route: normalizedRoute,
    ageState,
    decision: "review",
    reason: "Route has no approved under-21 visibility decision yet.",
  };
}
