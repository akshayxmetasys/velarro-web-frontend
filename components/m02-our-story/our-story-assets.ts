import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const OUR_STORY_APPROVED_IMAGES = {
  heroBackground: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/ourstory-hero-20260709-024102-desktop-hero.webp",
  ),
  brandStorySide: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/ourstory-product-20260713-232448-product-main.webp",
  ),
} as const;
