import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

export const UNDER21_NAVBAR_LOGO_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.navbarLogoScript,
);

export const UNDER21_ROASTERY_HERO_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.roasteryHero,
);
