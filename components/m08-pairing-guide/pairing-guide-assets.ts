import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const PAIRING_GUIDE_APPROVED_IMAGES = {
  hero: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/perfect-pairing-hero-20260709-034623-desktop-hero.webp",
  ),
} as const;

export const PAIRING_GUIDE_CARD_BACKGROUND_STATUS = "deferred" as const;
