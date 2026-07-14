import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const CAREERS_APPROVED_IMAGES = {
  hero: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/carrer-horo-20260709-034631-desktop-hero.webp",
  ),
} as const;

export const CAREERS_DEFERRED_IMAGE_STATUS = "deferred" as const;
