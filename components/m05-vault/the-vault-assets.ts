import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

export const THE_VAULT_APPROVED_IMAGES = {
  offerVerdeClassico: assertApprovedImageUrl(
    M01_HOME_APPROVED_IMAGES.cigarCarouselVerdeClassico,
  ),
} as const;

export const THE_VAULT_HERO_IMAGE_STATUS = "deferred" as const;
