import prototypeRouteMap from "@/docs/implementation/prototype-route-map.json";

type PrototypeRouteEntry = {
  route: string;
  pageType?: string;
  index?: boolean;
};

export interface RouteInventoryEntry {
  path: `/${string}` | "/";
  pageType: string;
  indexable: boolean;
  includeInSitemap: boolean;
  status: "active" | "retired";
}

const EXPECTED_ROUTE_COUNT = 57;

const sourceRoutes = (prototypeRouteMap.routes as PrototypeRouteEntry[]).map((entry) => ({
  path: entry.route as `/${string}` | "/",
  pageType: entry.pageType ?? "unknown",
  indexable: Boolean(entry.index),
  includeInSitemap: Boolean(entry.index) && !entry.route.includes("["),
  status: "active" as const,
}));

const retiredRoute: RouteInventoryEntry = {
  path: "/the-house/the-clothier/founders-boxy-hoodie",
  pageType: "retired",
  indexable: false,
  includeInSitemap: false,
  status: "retired",
};

export const ROUTE_INVENTORY: RouteInventoryEntry[] = [...sourceRoutes, retiredRoute];

if (ROUTE_INVENTORY.length !== EXPECTED_ROUTE_COUNT) {
  throw new Error(
    `Route inventory drifted from planning docs: expected ${EXPECTED_ROUTE_COUNT}, received ${ROUTE_INVENTORY.length}.`,
  );
}

function dedupe(values: string[]): string[] {
  return Array.from(new Set(values));
}

function toRobotsPattern(path: string): string {
  return path.replace(/\[[^\]]+\]/g, "*");
}

export function getSitemapInventory(): RouteInventoryEntry[] {
  return ROUTE_INVENTORY.filter((route) => route.includeInSitemap);
}

export function getRobotsDisallowPatterns(): string[] {
  return dedupe(
    ROUTE_INVENTORY.filter((route) => !route.indexable).map((route) => toRobotsPattern(route.path)),
  );
}
