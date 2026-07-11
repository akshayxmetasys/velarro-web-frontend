import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

export interface ClothierCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  badge: "Top Gift";
  swatches: readonly {
    label: string;
    color: string;
    bordered?: boolean;
  }[];
}

export const CLOTHIER_CARDS: readonly ClothierCard[] = [
  {
    id: "estate-oversized-tshirt",
    title: "Estate Oversized T-shirt",
    description: "Heavyweight organic cotton",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.clothierEstateOversizedTshirt,
    ),
    imageAlt: "Estate Oversized T-shirt product imagery",
    badge: "Top Gift",
    swatches: [
      { label: "Black", color: "#0b0b0b", bordered: true },
      { label: "Olive", color: "#7e8b53" },
      { label: "Taupe", color: "#8c7865" },
    ],
  },
  {
    id: "heritage-dad-cap",
    title: "Heritage Dad Cap",
    description: "Washed cotton",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.clothierHeritageDadCap,
    ),
    imageAlt: "Heritage Dad Cap product imagery",
    badge: "Top Gift",
    swatches: [
      { label: "White", color: "#f5f5f5", bordered: true },
      { label: "Mushroom", color: "#b0a197" },
      { label: "Black", color: "#0b0b0b" },
    ],
  },
  {
    id: "estate-weekender-jacket",
    title: "Estate Weekender Jacket",
    description: "Cotton canvas, technical cotton, or lightweight",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.clothierEstateWeekenderJacket,
    ),
    imageAlt: "Estate Weekender Jacket product imagery",
    badge: "Top Gift",
    swatches: [
      { label: "Olive", color: "#7e8b53", bordered: true },
      { label: "Black", color: "#0b0b0b" },
      { label: "Mushroom", color: "#b0a197" },
    ],
  },
];
