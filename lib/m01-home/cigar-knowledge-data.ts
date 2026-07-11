import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

export interface CigarKnowledgeCard {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export const CIGAR_KNOWLEDGE_CARDS = [
  {
    id: "limited-compendium",
    title: "Limited Compendium",
    eyebrow: "The Perfect Whiskey & Cigar Pairing",
    description:
      "Discover how to match profiles for an unforgettable experience",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeLimitedCompendium,
    ),
    imageAlt: "Limited Compendium cigar knowledge imagery",
  },
  {
    id: "reserve",
    title: "Reserve",
    eyebrow: "Core Portfolio",
    description:
      "Discover how to match profiles for an unforgettable experience",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeReserve,
    ),
    imageAlt: "Reserve cigar knowledge imagery",
  },
  {
    id: "night-series",
    title: "Night Series",
    eyebrow: "Nocturne",
    description:
      "Rich and sophisticated selections designed for evenings of quiet luxury.",
    imageUrl: assertApprovedImageUrl(
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeNightSeries,
    ),
    imageAlt: "Night Series cigar knowledge imagery",
  },
] as const satisfies readonly CigarKnowledgeCard[];
