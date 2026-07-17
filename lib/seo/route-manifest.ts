export type RouteModule =
  | "M01-home"
  | "M02-auth"
  | "M03-estate"
  | "M04-house"
  | "M05-vault"
  | "M06-cart-checkout"
  | "M07-profile"
  | "M08-editorial"
  | "M09-engagement"
  | "M10-legal-info";

export type RouteAudience = "public" | "age-gated" | "auth" | "review";

export interface RouteManifestEntry {
  route: string;
  module: RouteModule;
  figmaNodeId?: string;
  implemented: boolean;
  public: boolean;
  indexable: boolean;
  audience: RouteAudience;
}

export const SITE_URL = "https://velarroestate.com";

export const ROUTE_MANIFEST = [
  {
    route: "/",
    module: "M01-home",
    figmaNodeId: "13148:15012",
    implemented: true,
    public: true,
    indexable: true,
    audience: "public",
  },
  {
    route: "/coming-soon",
    module: "M01-home",
    figmaNodeId: "12339:55472",
    implemented: false,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/login",
    module: "M02-auth",
    figmaNodeId: "14991:70094",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/signup",
    module: "M02-auth",
    figmaNodeId: "14991:70051",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/forgot-password",
    module: "M02-auth",
    figmaNodeId: "14991:70134",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/reset-password",
    module: "M02-auth",
    figmaNodeId: "14991:70162",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/the-estate",
    module: "M03-estate",
    figmaNodeId: "16576:98447",
    implemented: true,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/the-estate/the-house",
    module: "M03-estate",
    figmaNodeId: "16576:96095",
    implemented: true,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/the-estate/the-house/the-roastery",
    module: "M03-estate",
    figmaNodeId: "15451:39198",
    implemented: false,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/the-estate/the-humidor",
    module: "M03-estate",
    figmaNodeId: "13148:16189",
    implemented: false,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/the-estate/the-humidor/heritage",
    module: "M03-estate",
    figmaNodeId: "14670:35568",
    implemented: false,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/the-estate/the-humidor/royal-leaf",
    module: "M03-estate",
    figmaNodeId: "14670:37727",
    implemented: false,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/the-house",
    module: "M04-house",
    figmaNodeId: "14670:40233",
    implemented: false,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/the-house/the-clothier",
    module: "M04-house",
    figmaNodeId: "14670:39985",
    implemented: false,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/the-vault",
    module: "M05-vault",
    figmaNodeId: "12339:55472",
    implemented: true,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/cart",
    module: "M06-cart-checkout",
    figmaNodeId: "14712:33219",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/checkout/shipping",
    module: "M06-cart-checkout",
    figmaNodeId: "15127:24015",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/checkout/payment",
    module: "M06-cart-checkout",
    figmaNodeId: "15127:23850",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/checkout/review",
    module: "M06-cart-checkout",
    figmaNodeId: "15127:24193",
    implemented: false,
    public: false,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/my-profile",
    module: "M07-profile",
    figmaNodeId: "13148:18311",
    implemented: false,
    public: false,
    indexable: false,
    audience: "auth",
  },
  {
    route: "/the-chronicle",
    module: "M08-editorial",
    figmaNodeId: "14284:63187",
    implemented: true,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/pairing-guide",
    module: "M08-editorial",
    figmaNodeId: "14406:85066",
    implemented: true,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/membership",
    module: "M09-engagement",
    figmaNodeId: "15008:38309",
    implemented: true,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/partner",
    module: "M09-engagement",
    figmaNodeId: "14670:42180",
    implemented: true,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/careers",
    module: "M09-engagement",
    figmaNodeId: "13148:15771",
    implemented: true,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/careers/positions",
    module: "M09-engagement",
    figmaNodeId: "13148:15855",
    implemented: true,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/careers/positions/[jobId]",
    module: "M09-engagement",
    figmaNodeId: "13148:15939",
    implemented: true,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/careers/positions/[jobId]/apply",
    module: "M09-engagement",
    figmaNodeId: "13563:29858",
    implemented: true,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/get-in-touch",
    module: "M09-engagement",
    figmaNodeId: "14644:34661",
    implemented: true,
    public: true,
    indexable: false,
    audience: "review",
  },
  {
    route: "/accessibility",
    module: "M10-legal-info",
    figmaNodeId: "14703:32598",
    implemented: false,
    public: true,
    indexable: false,
    audience: "public",
  },
  {
    route: "/cookie-policy",
    module: "M10-legal-info",
    figmaNodeId: "14703:32859",
    implemented: false,
    public: true,
    indexable: false,
    audience: "public",
  },
  {
    route: "/faq",
    module: "M10-legal-info",
    figmaNodeId: "14670:48590",
    implemented: false,
    public: true,
    indexable: false,
    audience: "public",
  },
  {
    route: "/privacy-policy",
    module: "M10-legal-info",
    figmaNodeId: "14670:48780",
    implemented: false,
    public: true,
    indexable: false,
    audience: "public",
  },
  {
    route: "/terms-of-service",
    module: "M10-legal-info",
    figmaNodeId: "14703:33048",
    implemented: false,
    public: true,
    indexable: false,
    audience: "public",
  },
  {
    route: "/our-story",
    module: "M10-legal-info",
    figmaNodeId: "15934:43007",
    implemented: true,
    public: true,
    indexable: false,
    audience: "age-gated",
  },
  {
    route: "/press",
    module: "M10-legal-info",
    figmaNodeId: "14670:48497",
    implemented: false,
    public: true,
    indexable: false,
    audience: "review",
  },
] as const satisfies readonly RouteManifestEntry[];

export function getRouteManifest(): readonly RouteManifestEntry[] {
  return ROUTE_MANIFEST;
}

export function findRouteManifestEntry(
  route: string,
): RouteManifestEntry | undefined {
  return ROUTE_MANIFEST.find((entry) => entry.route === route);
}
