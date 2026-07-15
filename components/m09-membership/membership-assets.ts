export type MembershipAssetStatus = "deferred";

export interface MembershipAssetSlot {
  slot:
    | "membership_tier_house"
    | "membership_tier_reserve"
    | "membership_tier_estate"
    | "membership_tier_atelier"
    | "membership_tier_private_circle"
    | "membership_cta_banner";
  url: null;
  status: MembershipAssetStatus;
  figmaNodeId: string;
  purpose: string;
  reason: string;
}

export const MEMBERSHIP_ASSETS = {
  tierHouse: {
    slot: "membership_tier_house",
    url: null,
    status: "deferred",
    figmaNodeId: "15008:38411",
    purpose: "Velarro House tier emblem",
    reason: "Final production Membership artwork has not been approved by UI/UX.",
  },
  tierReserve: {
    slot: "membership_tier_reserve",
    url: null,
    status: "deferred",
    figmaNodeId: "15008:38331",
    purpose: "Velarro Reserve tier emblem",
    reason: "Final production Membership artwork has not been approved by UI/UX.",
  },
  tierEstate: {
    slot: "membership_tier_estate",
    url: null,
    status: "deferred",
    figmaNodeId: "15008:38351",
    purpose: "Velarro Estate tier emblem",
    reason: "Final production Membership artwork has not been approved by UI/UX.",
  },
  tierAtelier: {
    slot: "membership_tier_atelier",
    url: null,
    status: "deferred",
    figmaNodeId: "15008:38371",
    purpose: "Velarro Atelier tier emblem",
    reason: "Final production Membership artwork has not been approved by UI/UX.",
  },
  tierPrivateCircle: {
    slot: "membership_tier_private_circle",
    url: null,
    status: "deferred",
    figmaNodeId: "15008:38391",
    purpose: "Velarro Private Circle tier emblem",
    reason: "Final production Membership artwork has not been approved by UI/UX.",
  },
  ctaBanner: {
    slot: "membership_cta_banner",
    url: null,
    status: "deferred",
    figmaNodeId: "15008:38591",
    purpose: "Membership CTA banner background",
    reason: "Final production Membership artwork has not been approved by UI/UX.",
  },
} as const satisfies Record<string, MembershipAssetSlot>;
