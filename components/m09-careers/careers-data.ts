export const CAREERS_FIGMA_NODE = "13148:15771" as const;

export const CAREERS_HERO_COPY = {
  title: "CAREERS",
  body: "Explore roles across our production houses, sales teams, and global offices. Velarro is more than a brand it is a life's work, and we invite you to make it yours.",
} as const;

export const CAREERS_INTRO_COPY = {
  title: "Careers at Velarro",
  body: "At Velarro, we believe in crafting experiences as rich as our products. With a heritage rooted in quality, craftsmanship, and passion, we aim to create extraordinary moments for our customers and employees alike",
} as const;

export const CAREERS_WORKING_COPY = {
  title: "Working at Velarro",
  body: "We are one global team working with innovation, passion and integrity towards the same goal: to delight our customers with unique brands and unrivalled retail experiences.",
  button: "LEARN MORE",
} as const;

export const CAREERS_JOBS_COPY = {
  title: "Find Your Place",
  body: "From our estates to our flagship boutiques, every role at Velarro is an invitation to be part of something enduring.",
  button: "VIEW ALL POSITIONS",
} as const;

export const CAREERS_TESTIMONIAL_COPY = {
  title: "Spoken by those who know",
  quote:
    '"Working at Velarro means being surrounded by people who genuinely care about the tobacco, about the customer, and about each other. There is a pride here that you cannot manufacture."',
  attribution: "— Master Blender, Nicaragua Estate",
} as const;

export const CAREERS_CTA_COPY = {
  title: "Ready to become part of the story?",
  body: "Explore roles across our production houses, sales teams, and global offices. Velarro is more than a brand, it is a life's work, and we invite you to make it yours.",
  button: "JOIN OUR TEAM",
} as const;

export interface CareersValueCard {
  id: string;
  figmaNodeId: string;
  imageNodeId: string;
  deferredImageKey: string;
  title: string;
  body: string;
}

export const CAREERS_VALUE_CARDS = [
  {
    id: "passion-for-craft-1",
    figmaNodeId: "13148:15792",
    imageNodeId: "13148:15793",
    deferredImageKey: "careers_value_card_1",
    title: "Passion for craft",
    body: "We celebrate artisanship in every role, from leaf to lounge.",
  },
  {
    id: "passion-for-craft-2",
    figmaNodeId: "13148:15797",
    imageNodeId: "13148:15798",
    deferredImageKey: "careers_value_card_2",
    title: "Passion for craft",
    body: "We celebrate artisanship in every role, from leaf to lounge.",
  },
  {
    id: "passion-for-craft-3",
    figmaNodeId: "13148:15802",
    imageNodeId: "13148:15803",
    deferredImageKey: "careers_value_card_3",
    title: "Passion for craft",
    body: "We celebrate artisanship in every role, from leaf to lounge.",
  },
] as const satisfies readonly CareersValueCard[];

export interface CareersJob {
  id: string;
  title: string;
  location: string;
  type: string;
}

export const CAREERS_JOBS = [
  {
    id: "production-manager",
    title: "Production Manager",
    location: "Manufacturing & Operations — Estelí, Nicaragua",
    type: "Full - time",
  },
  {
    id: "area-sales-manager",
    title: "Area Sales Manager",
    location: "Sales & Distribution — Regional",
    type: "Full - time",
  },
  {
    id: "sales-head",
    title: "Sales Head",
    location: "Commercial Leadership — Global",
    type: "Full - time",
  },
] as const satisfies readonly CareersJob[];

export const CAREERS_DEFERRED_IMAGE_KEYS = [
  "careers_value_card_1",
  "careers_value_card_2",
  "careers_value_card_3",
  "careers_working_at_velarro",
] as const;
