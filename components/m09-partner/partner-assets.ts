export type PartnerAssetStatus = "deferred";

export interface PartnerAssetSlot {
  slot: "partner_main_image";
  url: null;
  status: PartnerAssetStatus;
  figmaNodeId: string;
  reason: string;
}

export const PARTNER_ASSETS = {
  partnerMainImage: {
    slot: "partner_main_image",
    url: null,
    status: "deferred",
    figmaNodeId: "14670:42191",
    reason: "Awaiting final UI/UX production asset; deferred by Vishnu",
  },
} as const satisfies Record<string, PartnerAssetSlot>;
