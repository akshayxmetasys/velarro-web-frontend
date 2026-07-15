import {
  CAREER_POSITIONS,
  type CareerPosition,
} from "@/components/m09-careers/careers-positions-data";

export const CAREERS_POSITION_DETAIL_FIGMA_NODE = "13148:15939" as const;

export const CAREERS_POSITION_DETAIL_FIGMA_NODES = {
  page: "13148:15939",
  mainLayout: "13148:15940",
  innerContent: "13148:15941",
  searchRow: "14585:37523",
  searchField: "14585:37524",
  searchButton: "14585:37527",
  detailWrapper: "13148:15942",
  headingWrapper: "13148:15948",
  title: "13148:15949",
  metadata: "13148:15950",
  mainColumns: "13148:15955",
  descriptionColumn: "13148:15956",
  overview: "13148:15957",
  responsibilities: "13148:15961",
  qualifications: "13148:15966",
  whatWeOffer: "13148:15971",
  applyButton: "13148:15976",
  hrContact: "13148:15977",
  breadcrumb: "15057:24216",
} as const;

export const IMPLEMENTED_CAREER_POSITION_DETAIL_SLUGS = [
  "area-sales-manager",
] as const;

export type ImplementedCareerPositionDetailSlug =
  (typeof IMPLEMENTED_CAREER_POSITION_DETAIL_SLUGS)[number];

export interface CareerPositionDetailSection {
  id: string;
  title: string;
  items: readonly string[];
  figmaNodeId: string;
}

export interface CareerPositionHrContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  verificationStatus: "figma-review-unverified";
}

export interface CareerPositionDetail {
  slug: ImplementedCareerPositionDetailSlug;
  figmaNodeId: string;
  publicationDate: string;
  address: string;
  employment: string;
  employmentDegree: string;
  overview: readonly string[];
  sections: readonly CareerPositionDetailSection[];
  hrContact: CareerPositionHrContact;
  applyStatus: "deferred";
  deferredApplyRoute: string;
}

export const CAREER_POSITION_DETAILS: readonly CareerPositionDetail[] = [
  {
    slug: "area-sales-manager",
    figmaNodeId: "13148:15939",
    publicationDate: "01-06-2026",
    address: "Hyderabad, India",
    employment: "Permanent Position",
    employmentDegree: "100%",
    overview: [
      "Velarro Estate is a premium luxury cigar company focused on delivering world-class handcrafted cigars with a modern luxury identity. Built on the philosophy of combining timeless craftsmanship with contemporary sophistication, Velarro represents a new generation of premium cigar culture in India. The company is dedicated to the production, branding, marketing, distribution, and retailing of premium cigars and luxury smoking accessories, anchored in a strong “Leaf to Luxury” approach ensuring excellence across every stage of the customer journey. Velarro Estate India aims to establish itself as one of India’s leading luxury cigar brands through innovation, exclusivity, elevated storytelling, and premium customer experiences.",
      "We are currently looking for passionate, ambitious, and performance-driven professionals to join our growing India operations.",
    ],
    sections: [
      {
        id: "responsibilities",
        title: "Responsibilities",
        figmaNodeId: "13148:15961",
        items: [
          "Manage regional distributor and retail relationships.",
          "Expand Velarro’s presence across premium retail outlets, lounges, hotels, and hospitality venues.",
          "Achieve regional sales and growth targets.",
          "Execute trade marketing activities and promotional initiatives.",
          "Monitor competitor activity, pricing, and market trends.",
          "Conduct regular market visits and retailer engagement.",
          "Ensure premium product visibility and retail presentation standards.",
          "Maintain strong customer and distributor relationships.",
        ],
      },
      {
        id: "qualification-and-experience",
        title: "Qualification and Experience",
        figmaNodeId: "13148:15966",
        items: [
          "Bachelor’s degree in Business, Sales, Marketing, or a related field.",
          "4–5 years of FMCG, luxury retail, premium lifestyle, liquor, or tobacco sales experience.",
          "Strong understanding of retail operations and distributor management.",
          "Excellent communication and negotiation capabilities.",
          "Strong relationship-building and execution skills.",
          "Willingness to travel within assigned territories.",
        ],
      },
      {
        id: "what-we-offer",
        title: "What We Offer",
        figmaNodeId: "13148:15971",
        items: [
          "Opportunity to work with a growing luxury lifestyle brand.",
          "Exposure to premium retail and hospitality channels.",
          "High-growth environment with performance-based development opportunities.",
          "Dynamic and collaborative sales culture.",
        ],
      },
    ],
    hrContact: {
      name: "John Doe",
      role: "Senior HR Business Partner",
      email: "hr@velarroestate.gmail.com",
      phone: "+01 345 (7617) 839",
      verificationStatus: "figma-review-unverified",
    },
    applyStatus: "deferred",
    deferredApplyRoute: "/careers/positions/area-sales-manager/apply",
  },
] as const;

const CAREER_POSITION_DETAIL_BY_SLUG = new Map(
  CAREER_POSITION_DETAILS.map((detail) => [detail.slug, detail]),
);

export function getCareerPositionBySlug(
  slug: string,
): CareerPosition | undefined {
  return CAREER_POSITIONS.find((position) => position.slug === slug);
}

export function getCareerPositionDetailBySlug(
  slug: string,
): CareerPositionDetail | undefined {
  return CAREER_POSITION_DETAIL_BY_SLUG.get(
    slug as ImplementedCareerPositionDetailSlug,
  );
}

export function hasImplementedCareerPositionDetail(slug: string): boolean {
  return IMPLEMENTED_CAREER_POSITION_DETAIL_SLUGS.includes(
    slug as ImplementedCareerPositionDetailSlug,
  );
}

export function getCareerPositionDetailHref(
  position: CareerPosition,
): string | null {
  if (!hasImplementedCareerPositionDetail(position.slug)) {
    return null;
  }

  return `/careers/positions/${position.slug}`;
}

export function getImplementedCareerPositionDetailStaticParams(): Array<{
  jobId: string;
}> {
  return IMPLEMENTED_CAREER_POSITION_DETAIL_SLUGS.map((slug) => ({
    jobId: slug,
  }));
}
