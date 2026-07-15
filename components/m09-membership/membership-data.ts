export const MEMBERSHIP_FIGMA_NODE = "15008:38309" as const;

export const MEMBERSHIP_FIGMA_NODES = {
  page: "15008:38309",
  tierSection: "15008:38310",
  tierContainer: "15008:38311",
  houseGroup: "15008:38392",
  houseEmblem: "15008:38411",
  reserveGroup: "15008:38312",
  reserveEmblem: "15008:38331",
  estateGroup: "15008:38332",
  estateEmblem: "15008:38351",
  atelierGroup: "15008:38352",
  atelierEmblem: "15008:38371",
  privateCircleGroup: "15008:38372",
  privateCircleEmblem: "15008:38391",
  breadcrumb: "15087:39647",
  benefitsSection: "15008:38412",
  benefitsTitle: "15008:38413",
  comparisonTable: "15008:38417",
  ctaSection: "15008:38590",
  ctaBackground: "15008:38591",
} as const;

export type MembershipTierId =
  | "house"
  | "reserve"
  | "estate"
  | "atelier"
  | "private-circle";

export interface MembershipTier {
  id: MembershipTierId;
  brand: "VELARRO";
  tier: string;
  accessibleTierName: string;
  subtitle: string;
  description: string;
  threshold: string;
  thresholdLabel: string;
  assetKey:
    | "tierHouse"
    | "tierReserve"
    | "tierEstate"
    | "tierAtelier"
    | "tierPrivateCircle";
  testId: string;
  figmaGroupNode: string;
  figmaEmblemNode: string;
}

export const MEMBERSHIP_TIERS: readonly MembershipTier[] = [
  {
    id: "house",
    brand: "VELARRO",
    tier: "HOUSE",
    accessibleTierName: "Velarro House",
    subtitle: "Your entry into the estate",
    description: "Account created. Your journey begins.",
    threshold: "$0",
    thresholdLabel: "Entry",
    assetKey: "tierHouse",
    testId: "membership-tier-house-deferred",
    figmaGroupNode: "15008:38392",
    figmaEmblemNode: "15008:38411",
  },
  {
    id: "reserve",
    brand: "VELARRO",
    tier: "RESERVE",
    accessibleTierName: "Velarro Reserve",
    subtitle: "Your relationship begins",
    description: "First purchase completed. Welcome to Velarro Reserve.",
    threshold: "$1 – $499",
    thresholdLabel: "Lifetime spend",
    assetKey: "tierReserve",
    testId: "membership-tier-reserve-deferred",
    figmaGroupNode: "15008:38312",
    figmaEmblemNode: "15008:38331",
  },
  {
    id: "estate",
    brand: "VELARRO",
    tier: "ESTATE",
    accessibleTierName: "Velarro Estate",
    subtitle: "Estate membership granted",
    description:
      "Unlock early access to limited releases and priority privileges.",
    threshold: "$500 – $2,499",
    thresholdLabel: "Lifetime spend",
    assetKey: "tierEstate",
    testId: "membership-tier-estate-deferred",
    figmaGroupNode: "15008:38332",
    figmaEmblemNode: "15008:38351",
  },
  {
    id: "atelier",
    brand: "VELARRO",
    tier: "ATELIER",
    accessibleTierName: "Velarro Atelier",
    subtitle: "A curated circle of collectors",
    description: "Extended access. Reserved for a select few.",
    threshold: "$2,500 – $9,999",
    thresholdLabel: "Lifetime spend",
    assetKey: "tierAtelier",
    testId: "membership-tier-atelier-deferred",
    figmaGroupNode: "15008:38352",
    figmaEmblemNode: "15008:38371",
  },
  {
    id: "private-circle",
    brand: "VELARRO",
    tier: "PRIVATE",
    accessibleTierName: "Velarro Private Circle",
    subtitle: "By invitation only",
    description: "Private allocations and ultra-limited access.",
    threshold: "$10,000+",
    thresholdLabel: "Lifetime spend",
    assetKey: "tierPrivateCircle",
    testId: "membership-tier-private-circle-deferred",
    figmaGroupNode: "15008:38372",
    figmaEmblemNode: "15008:38391",
  },
] as const;

export const MEMBERSHIP_BENEFITS_COPY = {
  heading: "TIER BENEFITS COMPARISON",
  columnLabel: "BENEFITS",
} as const;

export const MEMBERSHIP_BENEFIT_TIER_COLUMNS = [
  { id: "house" as const, label: "HOUSE", accessibleName: "Velarro House" },
  {
    id: "reserve" as const,
    label: "RESERVE",
    accessibleName: "Velarro Reserve",
  },
  { id: "estate" as const, label: "ESTATE", accessibleName: "Velarro Estate" },
  {
    id: "atelier" as const,
    label: "ATELIER",
    accessibleName: "Velarro Atelier",
  },
  {
    id: "private-circle" as const,
    label: "PRIVATE CIRCLE",
    accessibleName: "Velarro Private Circle",
  },
] as const;

export type MembershipBenefitTierId =
  (typeof MEMBERSHIP_BENEFIT_TIER_COLUMNS)[number]["id"];

export interface MembershipBenefitRow {
  id: string;
  title: string;
  description: string;
  availability: Record<MembershipBenefitTierId, boolean>;
}

export const MEMBERSHIP_BENEFIT_ROWS: readonly MembershipBenefitRow[] = [
  {
    id: "browse-shop",
    title: "Browse & Shop",
    description: "Explore the full Velarro collection",
    availability: {
      house: true,
      reserve: true,
      estate: true,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "secure-checkout",
    title: "Secure Checkout",
    description: "Fast and secure purchasing",
    availability: {
      house: true,
      reserve: true,
      estate: true,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "order-history",
    title: "Order History",
    description: "Track and review your orders",
    availability: {
      house: true,
      reserve: true,
      estate: true,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "early-access",
    title: "Early Access",
    description: "Be first to new releases",
    availability: {
      house: false,
      reserve: true,
      estate: true,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "limited-edition-access",
    title: "Limited Edition Access",
    description: "Exclusive small-batch cigars",
    availability: {
      house: false,
      reserve: false,
      estate: true,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "priority-fulfillment",
    title: "Priority Fulfillment",
    description: "Faster processing and shipping",
    availability: {
      house: false,
      reserve: false,
      estate: true,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "private-allocations",
    title: "Private Allocations",
    description: "Ultra-rare and aged cigars",
    availability: {
      house: false,
      reserve: false,
      estate: false,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "concierge-services",
    title: "Concierge Services",
    description: "Personalized assistance",
    availability: {
      house: false,
      reserve: false,
      estate: false,
      atelier: true,
      "private-circle": true,
    },
  },
  {
    id: "invitation-only-events",
    title: "Invitation-Only Events",
    description: "Exclusive experiences",
    availability: {
      house: false,
      reserve: false,
      estate: false,
      atelier: true,
      "private-circle": true,
    },
  },
] as const;

export const MEMBERSHIP_CTA_COPY = {
  heading: "THIS IS MORE THAN MEMBERSHIP. THIS IS VELARRO ESTATE.",
  body: "Every tier is a recognition of your journey with us. The more you engage, the more of the Estate is revealed.",
  button: "DISCOVER THE COLLECTION",
  estateHref: "/the-estate",
} as const;
