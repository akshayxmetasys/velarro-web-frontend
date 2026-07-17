import { CHRONICLE_CARD_IMAGES } from "@/components/m08-chronicle/chronicle-assets";

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
  readonly date: string;
  readonly title: string;
  readonly body: readonly string[];
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly intrinsicWidth: number;
  readonly intrinsicHeight: number;
  readonly cropWidth: string;
  readonly cropHeight: string;
  readonly cropLeft: string;
  readonly cropTop: string;
  readonly imageRegionWidth: number;
  readonly imageRegionHeight: number;
  readonly outerHeightPx: number;
  readonly bodyRegionMinHeightPx: number;
}

const CARD_IMAGE_OVERLAY = "rgba(21,20,20,0.4)" as const;

export const CHRONICLE_CARDS = [
  {
    id: "international-cigar-day",
    figmaNodeId: "14284:63209",
    imageNodeId: "14284:63217",
    date: "February 27",
    title: "International Cigar Day",
    body: [
      "International Cigar Day honors one of the world’s most enduring traditions of craftsmanship and ritual.",
      "At Velarro Estate, cigars represent patience, expertise, and appreciation for the finer moments in life. Every cigar reflects a journey that begins in the field and concludes in the hands of those who value refinement and tradition",
    ],
    imageSrc: CHRONICLE_CARD_IMAGES.internationalCigarDay,
    imageAlt:
      "Lit Velarro Estate cigar resting in a dark ashtray with a thin trail of smoke",
    intrinsicWidth: 2172,
    intrinsicHeight: 724,
    cropWidth: "263.48%",
    cropHeight: "100%",
    cropLeft: "-21.67%",
    cropTop: "0.09%",
    imageRegionWidth: 534,
    imageRegionHeight: 469,
    outerHeightPx: 549,
    bodyRegionMinHeightPx: 236,
  },
  {
    id: "international-tea-day",
    figmaNodeId: "14284:63218",
    imageNodeId: "14284:63225",
    date: "May 21",
    title: "International Tea Day",
    body: [
      "Tea has long served as a symbol of hospitality, reflection, and cultural tradition across the world.",
      "At Velarro Estate, tea represents the art of slowing down and appreciating moments of balance and refinement. International Tea Day honors the origins, growers, and traditions that make tea one of the world’s most cherished beverages.",
    ],
    imageSrc: CHRONICLE_CARD_IMAGES.internationalTeaDay,
    imageAlt:
      "Glass teapot and dark teacup of amber tea on a wooden tray with Velarro Estate packaging",
    intrinsicWidth: 2171,
    intrinsicHeight: 724,
    cropWidth: "268.98%",
    cropHeight: "100%",
    cropLeft: "-10.66%",
    cropTop: "0.18%",
    imageRegionWidth: 534,
    imageRegionHeight: 479,
    outerHeightPx: 559,
    bodyRegionMinHeightPx: 242,
  },
  {
    id: "founders-reserve-month",
    figmaNodeId: "14284:63226",
    imageNodeId: "14284:63233",
    date: "August 1 – August 31",
    title: "Founder’s Reserve Month",
    body: [
      "Founder’s Reserve Month is dedicated to honoring the vision, values, and stewardship that shaped Velarro Estate.",
      "Throughout the month, we reflect on the principles that guided the estate’s beginnings and continue to influence its future. This observance celebrates legacy, craftsmanship, and the enduring pursuit of excellence",
    ],
    imageSrc: CHRONICLE_CARD_IMAGES.foundersReserveMonth,
    imageAlt:
      "Open wooden humidor of cigars beside a dark marble plaque with gold Velarro Estate branding",
    intrinsicWidth: 2172,
    intrinsicHeight: 724,
    cropWidth: "269.1%",
    cropHeight: "100%",
    cropLeft: "-164.98%",
    cropTop: "-0.04%",
    imageRegionWidth: 534,
    imageRegionHeight: 479,
    outerHeightPx: 559,
    bodyRegionMinHeightPx: 264,
  },
  {
    id: "velarro-estate-day",
    figmaNodeId: "14284:63234",
    imageNodeId: "14284:63241",
    date: "August 28",
    title: "Velarro Estate Day",
    body: [
      "Velarro Estate Day commemorates the founding of the estate on August 28, 1919.",
      "This is the most important observance within the Velarro calendar and serves as the annual celebration of the estate’s history, community, achievements, and future aspirations.",
      "It is a day to honor those who built the estate, those who sustain it today, and those who will carry its legacy forward.",
    ],
    imageSrc: CHRONICLE_CARD_IMAGES.velarroEstateDay,
    imageAlt:
      "Velarro Estate vineyard at sunset with a branded banner reading Established August 28, 1919",
    intrinsicWidth: 2172,
    intrinsicHeight: 724,
    cropWidth: "269.1%",
    cropHeight: "100%",
    cropLeft: "-21.59%",
    cropTop: "0",
    imageRegionWidth: 534,
    imageRegionHeight: 479,
    outerHeightPx: 559,
    bodyRegionMinHeightPx: 317,
  },
] as const satisfies readonly ChronicleCard[];

export const CHRONICLE_CARD_IMAGE_OVERLAY = CARD_IMAGE_OVERLAY;
