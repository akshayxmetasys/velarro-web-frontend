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

export interface PairingGuideCard {
  id: string;
  title: string;
  body: string;
  figmaNodeId: string;
  deferredImageKey: string;
}

export const PAIRING_GUIDE_CARDS = [
  {
    id: "rum-and-cigars",
    title: "Rum & Cigars",
    body: "The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.",
    figmaNodeId: "14628:40921",
    deferredImageKey: "pairing_rum_and_cigars",
  },
  {
    id: "whisky-and-cigars",
    title: "Whisky & Cigars",
    body: "The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.",
    figmaNodeId: "14628:40996",
    deferredImageKey: "pairing_whisky_and_cigars",
  },
  {
    id: "cocktails-and-cigars",
    title: "Cocktails & Cigars",
    body: "The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.",
    figmaNodeId: "14628:41027",
    deferredImageKey: "pairing_cocktails_and_cigars",
  },
  {
    id: "wine-and-cigars",
    title: "Wine & Cigars",
    body: "The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.",
    figmaNodeId: "14628:41028",
    deferredImageKey: "pairing_wine_and_cigars",
  },
  {
    id: "sparkling-and-cigars",
    title: "Sparkling & Cigars",
    body: "The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.",
    figmaNodeId: "14628:41043",
    deferredImageKey: "pairing_sparkling_and_cigars",
  },
  {
    id: "coffee-and-cigars",
    title: "Coffee & Cigars",
    body: "The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.",
    figmaNodeId: "14628:41044",
    deferredImageKey: "pairing_coffee_and_cigars",
  },
] as const satisfies readonly PairingGuideCard[];
