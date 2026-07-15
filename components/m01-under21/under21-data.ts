import { getRouteAccess } from "@/lib/age/route-access";

export const UNDER21_NAVBAR_FIGMA_NODE = "15694:43347" as const;
export const UNDER21_ROASTERY_HERO_FIGMA_NODE = "15694:45979" as const;
export const UNDER21_HOME_PAGE_FIGMA_NODE = "14735:62828" as const;

export type Under21NavbarItemKind = "blocked" | "review-link" | "deferred";

export interface Under21NavbarItem {
  label: string;
  kind: Under21NavbarItemKind;
  href?: string;
  reason: string;
}

export const UNDER21_PRIMARY_NAV_ITEMS: Under21NavbarItem[] = [
  {
    label: "The Estate",
    kind: "blocked",
    reason: "route blocked for under-21 visitors",
  },
  {
    label: "Partner",
    kind: "review-link",
    href: "/partner",
    reason: "review route approved for under-21 visitors",
  },
  {
    label: "Our Story",
    kind: "blocked",
    reason: "route blocked for under-21 visitors",
  },
];

export const UNDER21_DEFERRED_UTILITY_CONTROLS = [
  {
    label: "Cart",
    reason: "cart route not approved for this scope",
  },
  {
    label: "Login",
    reason: "login route not approved until M02 Auth",
  },
] as const;

export function isUnder21PartnerLinkSafe(): boolean {
  return getRouteAccess("/partner", "under21").decision === "review";
}

export const UNDER21_RESTRICTED_CONTENT_TERMS = [
  "cigar",
  "humidor",
  "vault",
  "chronicle",
  "pairing guide",
  "collector series",
  "velarro cigars",
] as const;
