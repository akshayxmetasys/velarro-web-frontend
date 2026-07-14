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
  id: string;
  figmaNodeId: string;
  imageNodeId: string;
  deferredImageKey: string;
  date: string;
  title: string;
  body: readonly string[];
}

export const CHRONICLE_CARDS = [
  {
    id: "international-cigar-day",
    figmaNodeId: "14284:63209",
    imageNodeId: "14284:63217",
    deferredImageKey: "chronicle_card_1",
    date: "February 27",
    title: "International Cigar Day",
    body: [
      "International Cigar Day honors one of the world's most enduring traditions of craftsmanship and ritual.",
      "At Velarro Estate, cigars represent patience, expertise, and appreciation for the finer moments in life. Every cigar reflects a journey that begins in the field and concludes in the hands of those who value refinement and tradition",
    ],
  },
  {
    id: "international-tea-day",
    figmaNodeId: "14284:63218",
    imageNodeId: "14284:63225",
    deferredImageKey: "chronicle_card_2",
    date: "May 21",
    title: "International Tea Day",
    body: [
      "Tea has long served as a symbol of hospitality, reflection, and cultural tradition across the world.",
      "At Velarro Estate, tea represents the art of slowing down and appreciating moments of balance and refinement. International Tea Day honors the origins, growers, and traditions that make tea one of the world's most cherished beverages.",
    ],
  },
  {
    id: "founders-reserve-month",
    figmaNodeId: "14284:63226",
    imageNodeId: "14284:63233",
    deferredImageKey: "chronicle_card_3",
    date: "August 1 - August 31",
    title: "Founder's Reserve Month",
    body: [
      "Founder's Reserve Month is dedicated to honoring the vision, values, and stewardship that shaped Velarro Estate.",
      "Throughout the month, we reflect on the principles that guided the estate's beginnings and continue to influence its future. This observance celebrates legacy, craftsmanship, and the enduring pursuit of excellence",
    ],
  },
  {
    id: "velarro-estate-day",
    figmaNodeId: "14284:63234",
    imageNodeId: "14284:63241",
    deferredImageKey: "chronicle_card_4",
    date: "August 28",
    title: "Velarro Estate Day",
    body: [
      "Velarro Estate Day commemorates the founding of the estate on August 28, 1919.",
      "This is the most important observance within the Velarro calendar and serves as the annual celebration of the estate's history, community, achievements, and future aspirations.",
      "It is a day to honor those who built the estate, those who sustain it today, and those who will carry its legacy forward.",
    ],
  },
] as const satisfies readonly ChronicleCard[];
