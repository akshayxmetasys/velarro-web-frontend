import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const CHRONICLE_APPROVED_IMAGES = {
  hero: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/thechronicle-hero-20260709-023616-desktop-hero.webp",
  ),
} as const;

export const CHRONICLE_CARD_IMAGE_STATUS = "deferred" as const;

export type ChronicleCardAssetStatus = "deferred";

export interface ChronicleDeferredCardAsset {
  readonly slot: string;
  readonly url: null;
  readonly status: ChronicleCardAssetStatus;
  readonly figmaNodeId: string;
  readonly deferredImageKey: string;
}

/**
 * Event-card artwork slots are explicitly deferred. No production URL and no
 * substitute imagery — approved replacement assets remain an owner dependency.
 */
export const CHRONICLE_CARD_ASSETS = {
  internationalCigarDay: {
    slot: "chronicle_card_1",
    url: null,
    status: "deferred",
    figmaNodeId: "14284:63217",
    deferredImageKey: "chronicle_card_1",
  },
  internationalTeaDay: {
    slot: "chronicle_card_2",
    url: null,
    status: "deferred",
    figmaNodeId: "14284:63225",
    deferredImageKey: "chronicle_card_2",
  },
  foundersReserveMonth: {
    slot: "chronicle_card_3",
    url: null,
    status: "deferred",
    figmaNodeId: "14284:63233",
    deferredImageKey: "chronicle_card_3",
  },
  velarroEstateDay: {
    slot: "chronicle_card_4",
    url: null,
    status: "deferred",
    figmaNodeId: "14284:63241",
    deferredImageKey: "chronicle_card_4",
  },
} as const satisfies Record<string, ChronicleDeferredCardAsset>;
