import { THE_VAULT_APPROVED_IMAGES } from "@/components/m05-vault/the-vault-assets";

export interface VaultOffer {
  id: string;
  eyebrow: string;
  status: string;
  title: string;
  date: string;
  description: string;
  benefits: readonly string[];
  imageUrl: string;
  imageAlt: string;
  imageSide: "left" | "right";
}

export const VAULT_HERO_COPY = {
  title: "THE VAULT",
  body: "Discover curated collections, limited releases, and exclusive opportunities crafted for those who appreciate exceptional cigars and timeless craftsmanship.",
} as const;

export const VAULT_SECTION_COPY = {
  eyebrow: "RARE OPPORTUNITIES",
  title: "Distinguished Selections",
} as const;

const BUILD_YOUR_COLLECTION_COPY = {
  eyebrow: "Offer 01",
  status: "ENROLLMENT OPEN",
  title: "Build Your Collection",
  date: "February 27",
  description:
    "Experience preferred pricing when selecting multiple boxes from the Velarro Collection. Designed for collectors and enthusiasts seeking to explore a broader range of Velarro's finest selections.",
  benefits: [
    "Preferred collection pricing",
    "Premium presentation",
    "Priority fulfillment",
  ],
  imageUrl: THE_VAULT_APPROVED_IMAGES.offerVerdeClassico,
  imageAlt: "Verde Classico cigar product image",
} as const;

export const VAULT_OFFERS = [
  {
    ...BUILD_YOUR_COLLECTION_COPY,
    id: "build-your-collection-01",
    imageSide: "right",
  },
  {
    ...BUILD_YOUR_COLLECTION_COPY,
    id: "build-your-collection-02",
    imageSide: "left",
  },
  {
    ...BUILD_YOUR_COLLECTION_COPY,
    id: "build-your-collection-03",
    imageSide: "right",
  },
  {
    ...BUILD_YOUR_COLLECTION_COPY,
    id: "build-your-collection-04",
    imageSide: "left",
  },
  {
    ...BUILD_YOUR_COLLECTION_COPY,
    id: "build-your-collection-05",
    imageSide: "right",
  },
] as const satisfies readonly VaultOffer[];
