import { THE_HOUSE_APPROVED_IMAGES } from "@/components/m04-house/the-house-assets";

export interface HouseCategory {
  id: string;
  label: string;
  imageUrl: string;
  imageAlt: string;
  current?: boolean;
}

/**
 * Verified Figma swatches only. Omit or empty when the canonical frame shows none.
 * Do not invent missing colors.
 */
export interface HouseProduct {
  id: string;
  badge: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  /**
   * Verified color swatches from Figma 16576:96095 product cards.
   * Empty when the canonical frame shows none — do not invent colors.
   */
  swatches: readonly string[];
}

export const THE_HOUSE_CATEGORIES = [
  {
    id: "all-house",
    label: "ALL HOUSE",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.houseHeroAllHouse,
    imageAlt: "Velarro House category imagery",
    current: true,
  },
  {
    id: "the-roastery",
    label: "THE ROASTERY",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.categoryRoastery,
    imageAlt: "Velarro Roastery category imagery",
  },
  {
    id: "the-t-hub",
    label: "THE T-HUB",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.categoryTHub,
    imageAlt: "Velarro T-Hub category imagery",
  },
  {
    id: "the-clothier",
    label: "THE CLOTHIER",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.categoryClothier,
    imageAlt: "Velarro Clothier category imagery",
  },
  {
    id: "the-saddlery",
    label: "THE SADDLERY",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.categorySaddlery,
    imageAlt: "Velarro Saddlery category imagery",
  },
  {
    id: "the-cabinet",
    label: "THE CABINET",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.categoryCabinet,
    imageAlt: "Velarro Cabinet category imagery",
  },
] as const satisfies readonly HouseCategory[];

export const THE_HOUSE_PRODUCTS = [
  {
    id: "founders-boxy-hoodie",
    badge: "Top Gift",
    name: "Founder\u2019s Boxy hoodie",
    description: "Heavyweight French terry cotton",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productFoundersBoxyHoodie,
    imageAlt: "Founder\u2019s Boxy hoodie product image",
    // Figma 16576:97787
    swatches: ["#f1ece5", "#b0a197", "#0b0b0b"],
  },
  {
    id: "estate-espresso",
    badge: "Top Gift",
    name: "Estate Espresso",
    description: "Dark chocolate, roasted almond, cacao, cedar, espresso crema.",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productEstateEspresso,
    imageAlt: "Estate Espresso product image",
    // Figma 16576:97829 — no swatches
    swatches: [],
  },
  {
    id: "estate-oversized-tshirt",
    badge: "Top Gift",
    name: "Estate Oversized T-shirt",
    description: "Heavyweight organic cotton",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productEstateOversizedTshirt,
    imageAlt: "Estate Oversized T-shirt product image",
    // Figma 16576:97813
    swatches: ["#0b0b0b", "#7e8b53", "#8c7865"],
  },
  {
    id: "estate-torch-lighter",
    badge: "Top Gift",
    name: "Estate Torch Lighter",
    description: "A premium torch lighter for reliable cigar lighting.",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productEstateTorchLighter,
    imageAlt: "Estate Torch Lighter product image",
    // Figma 16576:97841 — no swatches
    swatches: [],
  },
  {
    id: "founders-duffel",
    badge: "Top Gift",
    name: "Founder\u2019s Duffel",
    description: "A luxury leather duffel for travel and estate lifestyle.",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productFoundersDuffel,
    imageAlt: "Founder\u2019s Duffel product image",
    // Figma 16576:97853 — no swatches
    swatches: [],
  },
  {
    id: "cacao-chai-reserve",
    badge: "Top Gift",
    name: "Cacao Chai Reserve",
    description: "Cacao, cinnamon, black pepper, clove, warm spice",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productCacaoChaiReserve,
    imageAlt: "Cacao Chai Reserve product image",
    // Figma 16576:97865 — no swatches
    swatches: [],
  },
] as const satisfies readonly HouseProduct[];
