import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const PAIRING_GUIDE_APPROVED_IMAGES = {
  hero: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/perfect-pairing-hero-20260709-034623-desktop-hero.webp",
  ),
} as const;

/**
 * Permanent local Pairing Guide card rasters (Figma card nodes 14628:40921–41044).
 * Not approved-host URLs — do not pass through assertApprovedImageUrl.
 */
export const PAIRING_GUIDE_CARD_IMAGES = {
  rumAndCigars: "/images/m08-pairing-guide/rum-and-cigars.png",
  whiskyAndCigars: "/images/m08-pairing-guide/whisky-and-cigars.png",
  cocktailsAndCigars: "/images/m08-pairing-guide/cocktails-and-cigars.png",
  wineAndCigars: "/images/m08-pairing-guide/wine-and-cigars.png",
  sparklingAndCigars: "/images/m08-pairing-guide/sparkling-and-cigars.png",
  coffeeAndCigars: "/images/m08-pairing-guide/coffee-and-cigars.png",
} as const;
