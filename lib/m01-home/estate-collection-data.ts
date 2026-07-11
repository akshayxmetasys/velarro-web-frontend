import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

export interface EstateCollectionCard {
  id: string;
  label: string;
  imageUrl: string;
  imageAlt: string;
}

export const ESTATE_COLLECTION_CARDS = [
  {
    id: "estate-espresso",
    label: "Estate Espresso",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.estateCollectionEstateEspresso,
    ),
    imageAlt: "Estate Espresso product imagery",
  },
  {
    id: "founders-boxy-hoodie",
    label: "Founder’s Boxy hoodie",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.estateCollectionFoundersBoxyHoodie,
    ),
    imageAlt: "Founder’s Boxy hoodie product imagery",
  },
  {
    id: "roastery",
    label: "Roastery",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.estateCollectionRoasteryCard,
    ),
    imageAlt: "Roastery collection imagery",
  },
  {
    id: "the-cabinet",
    label: "The cabinet",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.estateCollectionTheCabinet,
    ),
    imageAlt: "The cabinet collection imagery",
  },
  {
    id: "estate-oversized-tshirt",
    label: "Estate oversized T-shirt",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.estateCollectionEstateOversizedTshirt,
    ),
    imageAlt: "Estate oversized T-shirt product imagery",
  },
  {
    id: "humidors",
    label: "Humidors",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.estateCollectionHumidors,
    ),
    imageAlt: "Humidors product imagery",
  },
] as const satisfies readonly EstateCollectionCard[];

export const ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX = 1;

export const ESTATE_COLLECTION_ARROW_LEFT_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.estateCollectionArrowLeft,
);
