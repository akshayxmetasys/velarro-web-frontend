import { CHRONICLE_CARD_ASSETS } from "@/components/m08-chronicle/chronicle-assets";

export const CHRONICLE_FIGMA_NODE = "14284:63187" as const;

export const CHRONICLE_HERO_COPY = {
  title: "THE CHRONICLE",
  body: "Explore the latest stories, product unveilings, special events, and lifestyle experiences that define the world of Velarro.",
} as const;

export const CHRONICLE_NEWS_TICKER = [
  "Live News and Events",
  "*Velarro is Launching New Store in US*",
  "*Velarro Royal Leaf Like by most user*",
  "*Velarro is entering to switzerland Market*",
  "*Velarro is Accessories is most uniquet*",
] as const;

export interface ChronicleCard {
  readonly id: string;
  readonly figmaNodeId: string;
  readonly imageNodeId: string;
  readonly deferredImageKey: string;
  readonly date: string;
  readonly title: string;
  readonly body: readonly string[];
  readonly imageRegionWidth: number;
  readonly imageRegionHeight: number;
  readonly outerHeightPx: number;
  readonly bodyRegionMinHeightPx: number;
}

export const CHRONICLE_CARDS = [
  {
    id: "international-cigar-day",
    figmaNodeId: "14284:63209",
    imageNodeId: CHRONICLE_CARD_ASSETS.internationalCigarDay.figmaNodeId,
    deferredImageKey: CHRONICLE_CARD_ASSETS.internationalCigarDay.deferredImageKey,
    date: "February 27",
    title: "International Cigar Day",
    body: [
      "International Cigar Day honors one of the world’s most enduring traditions of craftsmanship and ritual.",
      "At Velarro Estate, cigars represent patience, expertise, and appreciation for the finer moments in life. Every cigar reflects a journey that begins in the field and concludes in the hands of those who value refinement and tradition",
    ],
    imageRegionWidth: 534,
    imageRegionHeight: 469,
    outerHeightPx: 549,
    bodyRegionMinHeightPx: 236,
  },
  {
    id: "international-tea-day",
    figmaNodeId: "14284:63218",
    imageNodeId: CHRONICLE_CARD_ASSETS.internationalTeaDay.figmaNodeId,
    deferredImageKey: CHRONICLE_CARD_ASSETS.internationalTeaDay.deferredImageKey,
    date: "May 21",
    title: "International Tea Day",
    body: [
      "Tea has long served as a symbol of hospitality, reflection, and cultural tradition across the world.",
      "At Velarro Estate, tea represents the art of slowing down and appreciating moments of balance and refinement. International Tea Day honors the origins, growers, and traditions that make tea one of the world’s most cherished beverages.",
    ],
    imageRegionWidth: 534,
    imageRegionHeight: 479,
    outerHeightPx: 559,
    bodyRegionMinHeightPx: 242,
  },
  {
    id: "founders-reserve-month",
    figmaNodeId: "14284:63226",
    imageNodeId: CHRONICLE_CARD_ASSETS.foundersReserveMonth.figmaNodeId,
    deferredImageKey: CHRONICLE_CARD_ASSETS.foundersReserveMonth.deferredImageKey,
    date: "August 1 – August 31",
    title: "Founder’s Reserve Month",
    body: [
      "Founder’s Reserve Month is dedicated to honoring the vision, values, and stewardship that shaped Velarro Estate.",
      "Throughout the month, we reflect on the principles that guided the estate’s beginnings and continue to influence its future. This observance celebrates legacy, craftsmanship, and the enduring pursuit of excellence",
    ],
    imageRegionWidth: 534,
    imageRegionHeight: 479,
    outerHeightPx: 559,
    bodyRegionMinHeightPx: 264,
  },
  {
    id: "velarro-estate-day",
    figmaNodeId: "14284:63234",
    imageNodeId: CHRONICLE_CARD_ASSETS.velarroEstateDay.figmaNodeId,
    deferredImageKey: CHRONICLE_CARD_ASSETS.velarroEstateDay.deferredImageKey,
    date: "August 28",
    title: "Velarro Estate Day",
    body: [
      "Velarro Estate Day commemorates the founding of the estate on August 28, 1919.",
      "This is the most important observance within the Velarro calendar and serves as the annual celebration of the estate’s history, community, achievements, and future aspirations.",
      "It is a day to honor those who built the estate, those who sustain it today, and those who will carry its legacy forward.",
    ],
    imageRegionWidth: 534,
    imageRegionHeight: 479,
    outerHeightPx: 559,
    bodyRegionMinHeightPx: 317,
  },
] as const satisfies readonly ChronicleCard[];
