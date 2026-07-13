import { THE_HOUSE_APPROVED_IMAGES } from "@/components/m04-house/the-house-assets";

export interface HouseCategory {
  id: string;
  label: string;
  imageUrl: string;
  imageAlt: string;
  current?: boolean;
}

export interface HouseProduct {
  id: string;
  badge: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
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
    swatches: ["#f1ece5", "#b0a197", "#2f2924"],
  },
  {
    id: "estate-espresso",
    badge: "Top Gift",
    name: "Estate Espresso",
    description: "Dark chocolate, roasted almond, cacao, cedar, espresso crema.",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productEstateEspresso,
    imageAlt: "Estate Espresso product image",
    swatches: ["#3b2a21", "#8a6c55", "#efe7dc"],
  },
  {
    id: "estate-oversized-tshirt",
    badge: "Top Gift",
    name: "Estate Oversized T-shirt",
    description: "Heavyweight organic cotton",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productEstateOversizedTshirt,
    imageAlt: "Estate Oversized T-shirt product image",
    swatches: ["#e8e2d6", "#a99b8d", "#2f2924"],
  },
  {
    id: "estate-torch-lighter",
    badge: "Top Gift",
    name: "Estate Torch Lighter",
    description: "A premium torch lighter for reliable cigar lighting.",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productEstateTorchLighter,
    imageAlt: "Estate Torch Lighter product image",
    swatches: ["#171412", "#c6b49d", "#4a3f36"],
  },
  {
    id: "founders-duffel",
    badge: "Top Gift",
    name: "Founder\u2019s Duffel",
    description: "A luxury leather duffel for travel and estate lifestyle.",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productFoundersDuffel,
    imageAlt: "Founder\u2019s Duffel product image",
    swatches: ["#2f241f", "#6f5b4d", "#d8c9b4"],
  },
  {
    id: "cacao-chai-reserve",
    badge: "Top Gift",
    name: "Cacao Chai Reserve",
    description: "Cacao, cinnamon, black pepper, clove, warm spice",
    imageUrl: THE_HOUSE_APPROVED_IMAGES.productCacaoChaiReserve,
    imageAlt: "Cacao Chai Reserve product image",
    swatches: ["#251812", "#7b512c", "#d8c9b4"],
  },
] as const satisfies readonly HouseProduct[];
