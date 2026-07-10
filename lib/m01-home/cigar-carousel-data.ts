import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

export interface CigarCarouselCard {
  id: string;
  label: string;
  imageUrl: string;
  imageAlt: string;
}

export const CIGAR_CAROUSEL_CARDS = [
  {
    id: "ashtrays",
    label: "Ashtrays",
    imageUrl: assertApprovedImageUrl(M01_HOME_APPROVED_IMAGES.cigarCarouselAshtrays),
    imageAlt: "Ashtrays category imagery",
  },
  {
    id: "verde-classico",
    label: "Verde Classico",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.cigarCarouselVerdeClassico,
    ),
    imageAlt: "Verde Classico cigar category imagery",
  },
  {
    id: "lighters",
    label: "Lighters",
    imageUrl: assertApprovedImageUrl(M01_HOME_APPROVED_IMAGES.cigarCarouselLighters),
    imageAlt: "Lighters category imagery",
  },
  {
    id: "vintage-no-88",
    label: "Vintage no. 88",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.cigarCarouselVintageNo88,
    ),
    imageAlt: "Vintage no. 88 cigar category imagery",
  },
  {
    id: "pipes",
    label: "Pipes",
    imageUrl: assertApprovedImageUrl(M01_HOME_APPROVED_IMAGES.cigarCarouselPipes),
    imageAlt: "Pipes category imagery",
  },
  {
    id: "nocturne",
    label: "Nocturne",
    imageUrl: assertApprovedImageUrl(M01_HOME_APPROVED_IMAGES.cigarCarouselNocturne),
    imageAlt: "Nocturne cigar category imagery",
  },
] as const satisfies readonly CigarCarouselCard[];

export const CIGAR_CAROUSEL_INITIAL_ACTIVE_INDEX = 1;

export const CIGAR_CAROUSEL_ARROW_LEFT_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.cigarCarouselArrowLeft,
);
