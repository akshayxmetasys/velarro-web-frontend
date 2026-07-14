import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export type GetInTouchAssetStatus = "approved" | "deferred";

export interface GetInTouchApprovedAssetSlot {
  slot: "get_in_touch_hero";
  url: string;
  status: "approved";
  figmaNodeId: string;
}

export interface GetInTouchDeferredAssetSlot {
  slot: "get_in_touch_map";
  url: null;
  status: "deferred";
  figmaNodeId: string;
  reason: string;
}

export type GetInTouchAssetSlot =
  | GetInTouchApprovedAssetSlot
  | GetInTouchDeferredAssetSlot;

export const GET_IN_TOUCH_ASSETS = {
  hero: {
    slot: "get_in_touch_hero",
    url: assertApprovedImageUrl(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/get-in-touch-hero-20260709-024211-desktop-hero.webp",
    ),
    status: "approved",
    figmaNodeId: "14644:34674",
  },
  map: {
    slot: "get_in_touch_map",
    url: null,
    status: "deferred",
    figmaNodeId: "14644:34761",
    reason: "Map integration not approved",
  },
} as const satisfies Record<string, GetInTouchAssetSlot>;

export const GET_IN_TOUCH_HERO_NATURAL_DIMENSIONS = {
  naturalWidth: 3840,
  naturalHeight: 2160,
  aspectRatio: 3840 / 2160,
  figmaFrameAspectRatio: 1440 / 655,
} as const;
