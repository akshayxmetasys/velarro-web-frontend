import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

export const THE_HOUSE_APPROVED_IMAGES = {
  houseHeroAllHouse: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-house-hero-20260709-023807-desktop-hero.webp",
  ),
  categoryRoastery: assertApprovedImageUrl(M01_HOME_APPROVED_IMAGES.roasteryHero),
  categoryTHub: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-thub-hero-home-20260709-025436-desktop-hero.webp",
  ),
  categoryClothier: assertApprovedImageUrl(
    M01_HOME_APPROVED_IMAGES.estateCollectionFoundersBoxyHoodie,
  ),
  categorySaddlery: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-saddlery-hero-home-20260709-025547-desktop-hero.webp",
  ),
  categoryCabinet: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-the-cabinet-20260711-015026-product-main.webp",
  ),
  productFoundersBoxyHoodie: assertApprovedImageUrl(
    M01_HOME_APPROVED_IMAGES.estateCollectionFoundersBoxyHoodie,
  ),
  productEstateEspresso: assertApprovedImageUrl(
    M01_HOME_APPROVED_IMAGES.estateCollectionEstateEspresso,
  ),
  productEstateOversizedTshirt: assertApprovedImageUrl(
    M01_HOME_APPROVED_IMAGES.estateCollectionEstateOversizedTshirt,
  ),
  productEstateTorchLighter: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-torch-lighter-20260710-005343-product-main.webp",
  ),
  productFoundersDuffel: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/founders-duffel-20260709-190202-product-main.webp",
  ),
  productCacaoChaiReserve: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/cacao-chai-reserve-20260709-044022-product-main.webp",
  ),
} as const;
