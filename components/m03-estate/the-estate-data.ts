import { THE_ESTATE_APPROVED_IMAGES } from "@/components/m03-estate/the-estate-assets";

export interface EstateCategory {
  id: string;
  label: string;
  figmaName: string;
}

export interface EstateProduct {
  id: string;
  badge: string;
  name: string;
  vitola: string;
  ringGauge: string;
  length: string;
  enjoymentTime: string;
  intensityLabel: string;
  /** Filled dots out of 5, verified per Figma MAIN PRODUCT CARD instances. */
  intensityFilled: 1 | 2 | 3 | 4 | 5;
  notes: string;
  imageUrl: string;
  imageAlt: string;
}

export const THE_ESTATE_CATEGORY_LABELS = [
  { id: "all-series", label: "ALL SERIES", figmaName: "all series" },
  { id: "after-dark", label: "AFTER DARK", figmaName: "after dark" },
  { id: "celebration", label: "CELEBRATION", figmaName: "celebration" },
  { id: "collector", label: "COLLECTOR", figmaName: "collector" },
  { id: "dark", label: "DARK", figmaName: "dark" },
  { id: "estate", label: "ESTATE", figmaName: "estate" },
  { id: "heritage", label: "HERITAGE", figmaName: "heritage" },
  { id: "platinum", label: "PLATINUM", figmaName: "platinum" },
  { id: "prestige", label: "PRESTIGE", figmaName: "prestige" },
  { id: "terrior", label: "TERRIOR", figmaName: "terrior" },
] as const satisfies readonly EstateCategory[];

export const THE_ESTATE_FILTERS = [
  "AVAILABILITY",
  "ORIGIN",
  "SIZE",
  "INTENSITY",
  "TASTE NOTES",
  "PAIRINGS",
  "ENJOYMENT TIME",
] as const;

export const THE_ESTATE_PRODUCTS = [
  {
    id: "limited-compendium-salomones",
    badge: "Top Gift",
    name: "Limited Compendium",
    vitola: "Salomones",
    ringGauge: "57 RG",
    length: "7.2 in",
    enjoymentTime: "120-130 min",
    intensityLabel: "Intensity",
    // Figma 16576:98455 — five filled intensity dots
    intensityFilled: 5,
    notes: "Dark chocolate, prune, vintage leather, cedar wood, roasted nuts",
    imageUrl: THE_ESTATE_APPROVED_IMAGES.limitedCompendiumSalomones,
    imageAlt: "Limited Compendium Salomones cigar product image",
  },
  {
    id: "grand-cru-toro",
    badge: "Top Gift",
    name: "Grand Cru",
    vitola: "Toro",
    ringGauge: "54 RG",
    length: "6.0 in",
    enjoymentTime: "70-80 min",
    intensityLabel: "Intensity",
    // Figma 16576:98456 — four filled, one outline
    intensityFilled: 4,
    notes: "Hazelnut, dark chocolate, oak wood, brioche, caramel",
    imageUrl: THE_ESTATE_APPROVED_IMAGES.grandCruToro,
    imageAlt: "Grand Cru Toro cigar product image",
  },
  {
    id: "black-label-reserve-churchill",
    badge: "Top Gift",
    name: "Black Label Reserve",
    vitola: "Churchill",
    ringGauge: "50 RG",
    length: "7.0 in",
    enjoymentTime: "90-100 min",
    intensityLabel: "Intensity",
    // Figma 16576:98457 — four filled, one outline
    intensityFilled: 4,
    notes: "Roasted nuts, cacao, cedar, pepper, molasses",
    imageUrl: THE_ESTATE_APPROVED_IMAGES.blackLabelReserveChurchill,
    imageAlt: "Black Label Reserve Churchill cigar product image",
  },
  {
    id: "platinum-celebration-gran-churchill",
    badge: "Top Gift",
    name: "Platinum Celebration",
    vitola: "Gran Churchill",
    ringGauge: "52 RG",
    length: "7.5 in",
    enjoymentTime: "100-120 min",
    intensityLabel: "Intensity",
    // Figma 16576:98459 — four filled, one outline
    intensityFilled: 4,
    notes: "Vanilla, brioche, roasted coffee, cream, honey",
    imageUrl: THE_ESTATE_APPROVED_IMAGES.platinumCelebrationGranChurchill,
    imageAlt: "Platinum Celebration Gran Churchill cigar product image",
  },
  {
    id: "centennial-reserve-toro-gordo",
    badge: "Top Gift",
    name: "Centennial Reserve",
    vitola: "Toro Gordo",
    ringGauge: "56 RG",
    length: "6.5 in",
    enjoymentTime: "90-100 min",
    intensityLabel: "Intensity",
    // Figma 16576:98460 — five filled intensity dots
    intensityFilled: 5,
    notes: "Black pepper, roasted almonds, cacao, oak wood, vintage leather",
    imageUrl: THE_ESTATE_APPROVED_IMAGES.centennialReserveToroGordo,
    imageAlt: "Centennial Reserve Toro Gordo cigar product image",
  },
  {
    id: "primera-cosecha-petit-corona",
    badge: "Top Gift",
    name: "Primera Cosecha",
    vitola: "Petit Corona",
    ringGauge: "42 RG",
    length: "4.5 in",
    enjoymentTime: "35-45 min",
    intensityLabel: "Intensity",
    // Figma 16576:98461 — two filled, three outline
    intensityFilled: 2,
    notes: "Floral spice, cedar wood, almonds, brioche, honey",
    imageUrl: THE_ESTATE_APPROVED_IMAGES.primeraCosechaPetitCorona,
    imageAlt: "Primera Cosecha Petit Corona cigar product image",
  },
] as const satisfies readonly EstateProduct[];
