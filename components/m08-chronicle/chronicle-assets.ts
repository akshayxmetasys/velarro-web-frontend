import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const CHRONICLE_APPROVED_IMAGES = {
  hero: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/thechronicle-hero-20260709-023616-desktop-hero.webp",
  ),
} as const;

export const CHRONICLE_CARD_IMAGE_STATUS = "deferred" as const;
