/**
 * Permanent local Membership rasters (Figma emblem + CTA nodes).
 * Local paths only — do not pass through assertApprovedImageUrl.
 */

export type MembershipAssetSlotId =
  | "membership_tier_house"
  | "membership_tier_reserve"
  | "membership_tier_estate"
  | "membership_tier_atelier"
  | "membership_tier_private_circle"
  | "membership_cta_banner";

export type MembershipEmblemCrop =
  | {
      readonly mode: "absolute";
      readonly width: string;
      readonly height: string;
      readonly left: string;
      readonly top: string;
    }
  | {
      readonly mode: "cover";
      readonly objectPosition: string;
    };

export interface MembershipAssetRecord {
  readonly slot: MembershipAssetSlotId;
  readonly path: string;
  readonly status: "permanent";
  readonly figmaNodeId: string;
  readonly purpose: string;
  readonly contentType: "image/png";
  readonly naturalWidth: number;
  readonly naturalHeight: number;
  readonly cardCrop: MembershipEmblemCrop;
  readonly tableCrop: MembershipEmblemCrop;
  readonly cardEmblemTopPx: number;
  readonly cardEmblemHeightPx: number;
}

export const MEMBERSHIP_ASSETS = {
  tierHouse: {
    slot: "membership_tier_house",
    path: "/images/m09-membership/house-emblem.png",
    status: "permanent",
    figmaNodeId: "15008:38411",
    purpose: "Velarro House tier emblem",
    contentType: "image/png",
    naturalWidth: 1024,
    naturalHeight: 1536,
    cardEmblemTopPx: 82,
    cardEmblemHeightPx: 205,
    cardCrop: {
      mode: "absolute",
      width: "151.59%",
      height: "130.05%",
      left: "-23.97%",
      top: "-12.3%",
    },
    tableCrop: {
      mode: "absolute",
      width: "160.42%",
      height: "129%",
      left: "-30.21%",
      top: "-12%",
    },
  },
  tierReserve: {
    slot: "membership_tier_reserve",
    path: "/images/m09-membership/reserve-emblem.png",
    status: "permanent",
    figmaNodeId: "15008:38331",
    purpose: "Velarro Reserve tier emblem",
    contentType: "image/png",
    naturalWidth: 683,
    naturalHeight: 1024,
    cardEmblemTopPx: 81,
    cardEmblemHeightPx: 206,
    cardCrop: {
      mode: "cover",
      objectPosition: "50% 100%",
    },
    tableCrop: {
      mode: "cover",
      objectPosition: "50% 100%",
    },
  },
  tierEstate: {
    slot: "membership_tier_estate",
    path: "/images/m09-membership/estate-emblem.png",
    status: "permanent",
    figmaNodeId: "15008:38351",
    purpose: "Velarro Estate tier emblem",
    contentType: "image/png",
    naturalWidth: 1024,
    naturalHeight: 1536,
    cardEmblemTopPx: 78,
    cardEmblemHeightPx: 206,
    cardCrop: {
      mode: "absolute",
      width: "146.89%",
      height: "128.84%",
      left: "-23.85%",
      top: "-10.44%",
    },
    tableCrop: {
      mode: "absolute",
      width: "150.88%",
      height: "127.72%",
      left: "-23.97%",
      top: "-9.41%",
    },
  },
  tierAtelier: {
    slot: "membership_tier_atelier",
    path: "/images/m09-membership/atelier-emblem.png",
    status: "permanent",
    figmaNodeId: "15008:38371",
    purpose: "Velarro Atelier tier emblem",
    contentType: "image/png",
    naturalWidth: 1024,
    naturalHeight: 1536,
    cardEmblemTopPx: 81,
    cardEmblemHeightPx: 206,
    cardCrop: {
      mode: "absolute",
      width: "138.77%",
      height: "125.91%",
      left: "-19.15%",
      top: "-9.3%",
    },
    tableCrop: {
      mode: "absolute",
      width: "138.84%",
      height: "125.24%",
      left: "-19.41%",
      top: "-9.71%",
    },
  },
  tierPrivateCircle: {
    slot: "membership_tier_private_circle",
    path: "/images/m09-membership/private-circle-emblem.png",
    status: "permanent",
    figmaNodeId: "15008:38391",
    purpose: "Velarro Private Circle tier emblem",
    contentType: "image/png",
    naturalWidth: 1024,
    naturalHeight: 1536,
    cardEmblemTopPx: 81,
    cardEmblemHeightPx: 206,
    cardCrop: {
      mode: "absolute",
      width: "134.23%",
      height: "125.28%",
      left: "-16.78%",
      top: "-8.92%",
    },
    tableCrop: {
      mode: "absolute",
      width: "143.55%",
      height: "124.77%",
      left: "-22.31%",
      top: "-9.11%",
    },
  },
  ctaBanner: {
    slot: "membership_cta_banner",
    path: "/images/m09-membership/membership-cta-banner.png",
    status: "permanent",
    figmaNodeId: "15008:38591",
    purpose: "Membership CTA banner background",
    contentType: "image/png",
    naturalWidth: 2172,
    naturalHeight: 724,
    cardEmblemTopPx: 0,
    cardEmblemHeightPx: 0,
    cardCrop: {
      mode: "cover",
      objectPosition: "50% 50%",
    },
    tableCrop: {
      mode: "cover",
      objectPosition: "50% 50%",
    },
  },
} as const satisfies Record<string, MembershipAssetRecord>;

export const MEMBERSHIP_EMBLEM_ASSET_KEYS = [
  "tierHouse",
  "tierReserve",
  "tierEstate",
  "tierAtelier",
  "tierPrivateCircle",
] as const;

export type MembershipEmblemAssetKey =
  (typeof MEMBERSHIP_EMBLEM_ASSET_KEYS)[number];
