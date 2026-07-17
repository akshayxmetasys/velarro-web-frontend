import { PAIRING_GUIDE_CARD_IMAGES } from "@/components/m08-pairing-guide/pairing-guide-assets";

export const PAIRING_GUIDE_FIGMA_NODE = "14406:85066" as const;

export const PAIRING_GUIDE_HERO_COPY = {
  title: "PERFECT PAIRINGS",
  body: "Explore the latest stories, product unveilings, special events, and lifestyle experiences that define the world of Velarro.",
} as const;

export const PAIRING_GUIDE_SECTION_COPY = {
  eyebrow: "PAIRING GUIDE",
  title: "Six Ways to Savour",
} as const;

export const PAIRING_GUIDE_CTA_COPY = {
  title: "Discover Your Perfect Pairing",
  body: "Explore pairings thoughtfully selected to complement the character, complexity, and craftsmanship of Velarro cigars.",
  button: "FIND MY PAIRING",
} as const;

export const PAIRING_GUIDE_CARD_OVERLAY = "rgba(21,20,20,0.4)" as const;
export const PAIRING_GUIDE_CARD_BLUR_PX = 3 as const;
export const PAIRING_GUIDE_CARD_OBJECT_POSITION = "50% 50%" as const;

export interface PairingGuideCard {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly figmaNodeId: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly intrinsicWidth: number;
  readonly intrinsicHeight: number;
  readonly objectPosition: string;
  readonly blurPx: number;
  readonly overlay: string;
  readonly cardWidthPx: number;
  readonly cardHeightPx: number;
}

const SHARED_CARD_BODY =
  "The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.";

export const PAIRING_GUIDE_CARDS = [
  {
    id: "rum-and-cigars",
    title: "Rum & Cigars",
    body: SHARED_CARD_BODY,
    figmaNodeId: "14628:40921",
    imageSrc: PAIRING_GUIDE_CARD_IMAGES.rumAndCigars,
    imageAlt:
      "Glass of dark amber liquor beside a light coaster on a dark wooden surface",
    intrinsicWidth: 1376,
    intrinsicHeight: 768,
    objectPosition: PAIRING_GUIDE_CARD_OBJECT_POSITION,
    blurPx: PAIRING_GUIDE_CARD_BLUR_PX,
    overlay: PAIRING_GUIDE_CARD_OVERLAY,
    cardWidthPx: 626,
    cardHeightPx: 398,
  },
  {
    id: "whisky-and-cigars",
    title: "Whisky & Cigars",
    body: SHARED_CARD_BODY,
    figmaNodeId: "14628:40996",
    imageSrc: PAIRING_GUIDE_CARD_IMAGES.whiskyAndCigars,
    imageAlt:
      "Tumbler of amber whisky with ice resting on a dark polished wooden surface",
    intrinsicWidth: 638,
    intrinsicHeight: 410,
    objectPosition: PAIRING_GUIDE_CARD_OBJECT_POSITION,
    blurPx: PAIRING_GUIDE_CARD_BLUR_PX,
    overlay: PAIRING_GUIDE_CARD_OVERLAY,
    cardWidthPx: 626,
    cardHeightPx: 398,
  },
  {
    id: "cocktails-and-cigars",
    title: "Cocktails & Cigars",
    body: SHARED_CARD_BODY,
    figmaNodeId: "14628:41027",
    imageSrc: PAIRING_GUIDE_CARD_IMAGES.cocktailsAndCigars,
    imageAlt:
      "Cocktail glass with a citrus garnish in a dimly lit bar setting",
    intrinsicWidth: 638,
    intrinsicHeight: 410,
    objectPosition: PAIRING_GUIDE_CARD_OBJECT_POSITION,
    blurPx: PAIRING_GUIDE_CARD_BLUR_PX,
    overlay: PAIRING_GUIDE_CARD_OVERLAY,
    cardWidthPx: 626,
    cardHeightPx: 398,
  },
  {
    id: "wine-and-cigars",
    title: "Wine & Cigars",
    body: SHARED_CARD_BODY,
    figmaNodeId: "14628:41028",
    imageSrc: PAIRING_GUIDE_CARD_IMAGES.wineAndCigars,
    imageAlt: "Wine glass filled with dark red wine against a low-light background",
    intrinsicWidth: 638,
    intrinsicHeight: 410,
    objectPosition: PAIRING_GUIDE_CARD_OBJECT_POSITION,
    blurPx: PAIRING_GUIDE_CARD_BLUR_PX,
    overlay: PAIRING_GUIDE_CARD_OVERLAY,
    cardWidthPx: 626,
    cardHeightPx: 398,
  },
  {
    id: "sparkling-and-cigars",
    title: "Sparkling & Cigars",
    body: SHARED_CARD_BODY,
    figmaNodeId: "14628:41043",
    imageSrc: PAIRING_GUIDE_CARD_IMAGES.sparklingAndCigars,
    imageAlt: "Tall flute of sparkling wine with a warm golden liquid tone",
    intrinsicWidth: 638,
    intrinsicHeight: 410,
    objectPosition: PAIRING_GUIDE_CARD_OBJECT_POSITION,
    blurPx: PAIRING_GUIDE_CARD_BLUR_PX,
    overlay: PAIRING_GUIDE_CARD_OVERLAY,
    cardWidthPx: 626,
    cardHeightPx: 398,
  },
  {
    id: "coffee-and-cigars",
    title: "Coffee & Cigars",
    body: SHARED_CARD_BODY,
    figmaNodeId: "14628:41044",
    imageSrc: PAIRING_GUIDE_CARD_IMAGES.coffeeAndCigars,
    imageAlt:
      "Cup of coffee with a warm amber liquid tone and soft background glow",
    intrinsicWidth: 638,
    intrinsicHeight: 410,
    objectPosition: PAIRING_GUIDE_CARD_OBJECT_POSITION,
    blurPx: PAIRING_GUIDE_CARD_BLUR_PX,
    overlay: PAIRING_GUIDE_CARD_OVERLAY,
    cardWidthPx: 626,
    cardHeightPx: 398,
  },
] as const satisfies readonly PairingGuideCard[];
