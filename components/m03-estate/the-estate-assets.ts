import { assertApprovedImageUrl } from "@/lib/assets/approved-image-hosts";

export const THE_ESTATE_APPROVED_IMAGES = {
  collectorSeriesHeroBackground: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/collection-series-the-estate-hero-20260709-032805-desktop-hero.webp",
  ),
  limitedCompendiumSalomones: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/limited-compendium-cigar-product-main-20260709-014923-product-main.webp",
  ),
  grandCruToro: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/grand-cru-cigar-product-main-20260709-003453-product-main.webp",
  ),
  blackLabelReserveChurchill: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/black-label-reserve-cigar-product-main-20260709-013311-product-main.webp",
  ),
  platinumCelebrationGranChurchill: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/platinum-celebration-cigar-product-main-20260709-013103-product-main.webp",
  ),
  centennialReserveToroGordo: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/centennial-reserve-cigar-product-main-20260709-032610-product-main.webp",
  ),
  primeraCosechaPetitCorona: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/primera-cosecha-box-of-1020-cigar-product-20260709-014818-product-main.webp",
  ),
} as const;
