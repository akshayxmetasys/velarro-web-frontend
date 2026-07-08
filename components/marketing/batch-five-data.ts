import type { SiteRoute } from "@/components/layout/navigation-data";

export interface HeroPanel {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href: SiteRoute;
  };
  slotName: string;
}

export interface FeaturedCard {
  title: string;
  eyebrow?: string;
  href: SiteRoute;
  slotName: string;
}

export const homeHero: HeroPanel = {
  title: "COLLECTOR SERIES",
  subtitle: "Noir Series",
  cta: {
    label: "SHOP NOW",
    href: "/the-estate",
  },
  slotName: "m05/home/hero-collector-series",
};

export const homeFeatureBands: HeroPanel[] = [
  {
    title: "THE ROASTERY",
    subtitle: "Coffee",
    cta: {
      label: "SHOP NOW",
      href: "/the-house/the-roastery",
    },
    slotName: "m05/home/hero-roastery",
  },
  {
    eyebrow: "Gifting",
    title: "FIND THE PERFECT GIFTS",
    cta: {
      label: "EXPLORE GIFTS",
      href: "/the-house",
    },
    slotName: "m05/home/gifting",
  },
  {
    title: "FIND A STORE & LOUNGE",
    cta: {
      label: "EXPLORE",
      href: "/coming-soon",
    },
    slotName: "m05/home/store-lounge",
  },
];

export const homeCollections = [
  {
    eyebrow: "DISCOVER TIMELESS LUXURY",
    title: "Velarro cigars",
    cards: [
      { title: "Ashtrays", href: "/the-estate", slotName: "m05/home/cigars-ashtrays" },
      { title: "Verde Classico", href: "/the-estate", slotName: "m05/home/cigars-verde-classico" },
      { title: "Lighters", href: "/the-estate", slotName: "m05/home/cigars-lighters" },
    ],
  },
  {
    eyebrow: "EXPAND YOUR HORIZONS",
    title: "Expand your horizons",
    cards: [
      { title: "Limited Compendium", href: "/the-chronicle", slotName: "m05/home/horizons-limited-compendium" },
      { title: "Reserve", href: "/the-chronicle", slotName: "m05/home/horizons-reserve" },
      { title: "Night Series", href: "/the-chronicle", slotName: "m05/home/horizons-night-series" },
    ],
  },
  {
    eyebrow: "CURATED FOR THE EXCEPTIONAL",
    title: "The Clothier",
    cards: [
      { title: "Estate Oversized T-shirt", href: "/the-house/the-clothier", slotName: "m05/home/clothier-oversized-tshirt" },
      { title: "Heritage Dad Cap", href: "/the-house/the-clothier", slotName: "m05/home/clothier-heritage-dad-cap" },
      { title: "Estate Weekender Jacket", href: "/the-house/the-clothier", slotName: "m05/home/clothier-weekender-jacket" },
    ],
  },
  {
    eyebrow: "DISCOVER TIMELESS LUXURY",
    title: "Velarro Estate collection",
    cards: [
      { title: "Estate Espresso", href: "/the-house/the-roastery", slotName: "m05/home/estate-espresso" },
      { title: "Founder's Boxy Hoodie", href: "/the-house/the-clothier", slotName: "m05/home/founders-boxy-hoodie" },
      { title: "Roastery", href: "/the-house/the-roastery", slotName: "m05/home/roastery" },
    ],
  },
] as const satisfies readonly {
  eyebrow: string;
  title: string;
  cards: readonly FeaturedCard[];
}[];

export const under21HomePreview = {
  heroTitle: "THE ROASTERY",
  heading: "Velarro Estate collection",
} as const;

export const comingSoonContent = {
  eyebrow: "Oops",
  heading: "Unveiling soon",
  body: "We're creating an experience worthy of the Velarro name. Thank you for your patience while we prepare its arrival.",
  links: [
    { label: "HOMEPAGE", href: "/" },
    { label: "PRODUCTS", href: "/the-house" },
  ],
  slotName: "m05/coming-soon/backdrop",
} as const satisfies {
  eyebrow: string;
  heading: string;
  body: string;
  links: readonly { label: string; href: SiteRoute }[];
  slotName: string;
};

export const storyContent = {
  hero: {
    title: "OUR STORY",
    subtitle: "Crafted with purpose, aged with time",
    slotName: "m05/our-story/hero",
  },
  brandStory: {
    heading: "Brand Story",
    quote: "A legacy rooted in the earth. A future defined by craftsmanship.",
    paragraphs: [
      "Velarro's story begins not in a factory or boardroom, but in the fertile fields where generations of our family dedicated their lives to cultivating tobacco with patience, expertise, and deep respect for the land.",
      "For more than a century, we focused exclusively on cultivation and harvesting, building an understanding of soil conditions, seasonal cycles, leaf quality, and curing processes that only time and experience can create.",
      "Through decades of changing markets and shifting preferences, one principle remained unchanged: quality begins at the source.",
      "Today, Velarro represents the evolution of that philosophy. What began as a tobacco-growing heritage is now expanding into a modern premium lifestyle company that celebrates craftsmanship, authenticity, traceability, and direct-origin sourcing.",
      "Rather than operating as a brand disconnected from production, Velarro maintains a close relationship with the people, regions, and traditions behind every product we offer. The world's finest products begin at their source. That belief guides everything.",
    ],
    slotName: "m05/our-story/brand-story",
  },
  mission: {
    heading: "Our Mission",
    lead: "A great cigar is not simply made.",
    paragraphs: [
      "At Velarro, our mission is to transform generations of agricultural expertise into premium products that celebrate quality, sustainability, craftsmanship, and the stories behind every origin.",
      "We want the centuries-old tradition of cigar-making by combining the finest raw materials, the most skilled artisans, and an unwavering commitment to excellence.",
      "We exist to build meaningful connections between consumers and the people, places, and traditions that make exceptional products possible.",
    ],
    stats: [
      { value: "5%", label: "TOP LEAF SELECTED" },
      { value: "12+", label: "YEARS TORCEDOR EXPERIENCE" },
      { value: "200+", label: "YEARS OF HERITAGE" },
    ],
  },
  connoisseurs: {
    heading: "Why Connoisseurs",
    subtitle: "Crafted with purpose, aged with time",
    cards: [
      {
        title: "Generational Expertise",
        body: "Our relationship with tobacco cultivation spans more than 100 years.",
      },
      {
        title: "Quality begins at the source.",
        body: "No machinery touches a Velarro leaf. Every cigar is shaped entirely by hand.",
      },
      {
        title: "Rested & Aged",
        body: "A freshly rolled cigar is not a finished cigar. Every Velarro blend spends time refining in cedar-lined aging rooms.",
      },
      {
        title: "Origin-Led Blending",
        body: "Every blend decision is guided by character, region, and leaf source.",
      },
    ],
  },
  values: {
    heading: "Brand Values",
    body: "We honour the knowledge, traditions, and agricultural expertise developed across more than a century. That history is not background; it is the product.",
    cards: [
      "Heritage",
      "Craftsmanship",
      "Authenticity",
      "Quality",
      "Sustainability",
      "Innovation",
    ],
  },
} as const;
