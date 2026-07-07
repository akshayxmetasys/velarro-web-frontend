import prototypeRouteMap from "@/docs/implementation/prototype-route-map.json";

type PrototypeRouteEntry = {
  route: string;
};

export type SiteRoute = `/${string}` | "/";

const prototypeRoutes = new Set(
  (prototypeRouteMap.routes as PrototypeRouteEntry[]).map((entry) => entry.route),
);

function route(path: SiteRoute): SiteRoute {
  if (!prototypeRoutes.has(path)) {
    throw new Error(`Shell navigation route is not in prototype-route-map.json: ${path}`);
  }

  return path;
}

export interface NavigationLink {
  label: string;
  href: SiteRoute;
}

export interface NavigationSection {
  label: string;
  links: NavigationLink[];
}

export const mainNavigationLinks = [
  { label: "The Estate", href: route("/the-estate") },
  { label: "Partner", href: route("/partner") },
  { label: "Our Story", href: route("/our-story") },
] as const satisfies readonly NavigationLink[];

export const utilityNavigationLinks = [
  { label: "Cart", href: route("/cart") },
  { label: "Login", href: route("/login") },
] as const satisfies readonly NavigationLink[];

export const footerNavigationSections = [
  {
    label: "Discover",
    links: [
      { label: "Our Story", href: route("/our-story") },
      { label: "The House", href: route("/the-house") },
      { label: "Craftsmanship", href: route("/craftsmanship") },
      { label: "Limited Editions", href: route("/the-vault") },
    ],
  },
  {
    label: "Support",
    links: [
      { label: "Sustainability", href: route("/sustainability") },
      { label: "Press", href: route("/press") },
      { label: "Contact Us", href: route("/get-in-touch") },
      { label: "FAQ", href: route("/faq") },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy", href: route("/privacy-policy") },
      { label: "Terms of Service", href: route("/terms-of-service") },
      { label: "Cookie Policy", href: route("/cookie-policy") },
      { label: "Accessibility", href: route("/accessibility") },
    ],
  },
] as const satisfies readonly NavigationSection[];

export const breadcrumbLabels = {
  "/": "Home",
  "/the-estate": "The Estate",
  "/the-estate/the-house": "The House",
  "/the-estate/the-house/the-roastery": "The Roastery",
  "/the-estate/the-humidor": "The Humidor",
  "/the-estate/the-humidor/heritage": "Heritage",
  "/the-estate/the-humidor/royal-leaf": "Royal Leaf",
  "/the-house": "The House",
  "/the-house/the-roastery": "The Roastery",
  "/the-house/the-t-hub": "The T-Hub",
  "/the-house/the-apothecary": "The Apothecary",
  "/the-house/the-clothier": "The Clothier",
  "/the-house/the-clothier/the-sartorial-collection": "The Sartorial Collection",
  "/the-house/the-clothier/the-sporting-collection": "The Sporting Collection",
  "/the-house/the-saddlery": "The Saddlery",
  "/the-house/the-cabinet": "The Cabinet",
  "/the-vault": "The Vault",
  "/the-chronicle": "The Chronicle",
  "/the-chronicle/international-cigar-day": "International Cigar Day",
  "/pairing-guide": "Pairing Guide",
  "/pairing-guide/find-your-pairing": "Find Your Pairing",
  "/pairing-guide/rum-and-cigars": "Rum and Cigars",
  "/membership": "Membership",
  "/partner": "Partner",
  "/get-in-touch": "Contact Us",
  "/careers": "Careers",
  "/careers/positions": "Positions",
  "/our-story": "Our Story",
  "/craftsmanship": "Craftsmanship",
  "/sustainability": "Sustainability",
  "/accessibility": "Accessibility",
  "/press": "Press",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-service": "Terms of Service",
  "/cookie-policy": "Cookie Policy",
  "/faq": "FAQ",
  "/cart": "Cart",
  "/cart/buy-again": "Buy Again",
  "/checkout/shipping": "Shipping",
  "/checkout/payment": "Payment",
  "/checkout/review": "Review",
  "/my-profile": "My Profile",
  "/my-profile/complete": "Complete Profile",
  "/my-profile/addresses": "Addresses",
  "/my-profile/orders": "Orders",
  "/my-profile/wishlist": "Wishlist",
  "/my-profile/settings": "Settings",
} as const satisfies Partial<Record<SiteRoute, string>>;

export function isPrototypeRoute(path: string): path is SiteRoute {
  return prototypeRoutes.has(path);
}

