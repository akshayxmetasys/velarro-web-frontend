import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const CHRONICLE_APPROVED_IMAGES = {
  hero: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/thechronicle-hero-20260709-023616-desktop-hero.webp",
  ),
} as const;

/**
 * Permanent local Chronicle card rasters (Figma nodes 14284:63217/63225/63233/63241).
 * Not approved-host URLs — do not pass through assertApprovedImageUrl.
 */
export const CHRONICLE_CARD_IMAGES = {
  internationalCigarDay: "/images/m08-chronicle/international-cigar-day.png",
  internationalTeaDay: "/images/m08-chronicle/international-tea-day.png",
  foundersReserveMonth: "/images/m08-chronicle/founders-reserve-month.png",
  velarroEstateDay: "/images/m08-chronicle/velarro-estate-day.png",
} as const;
