import type { AgeState } from "@/lib/age/age-state";

export interface NavigationItem {
  label: string;
  href: string;
  requiresOver21: boolean;
}

export const OVER_21_NAVIGATION_ITEMS = [
  { label: "The Estate", href: "/the-estate", requiresOver21: true },
  { label: "The House", href: "/the-house", requiresOver21: false },
  { label: "The Vault", href: "/the-vault", requiresOver21: true },
  { label: "The Chronicle", href: "/the-chronicle", requiresOver21: true },
] as const satisfies readonly NavigationItem[];

export const UNDER_21_NAVIGATION_ITEMS = [
  { label: "Accessibility", href: "/accessibility", requiresOver21: false },
  { label: "Privacy Policy", href: "/privacy-policy", requiresOver21: false },
  { label: "Terms of Service", href: "/terms-of-service", requiresOver21: false },
] as const satisfies readonly NavigationItem[];

export function getNavigationItemsForAgeState(
  ageState: AgeState,
): readonly NavigationItem[] {
  if (ageState === "under21") {
    return UNDER_21_NAVIGATION_ITEMS;
  }

  if (ageState === "over21") {
    return OVER_21_NAVIGATION_ITEMS;
  }

  return UNDER_21_NAVIGATION_ITEMS;
}
