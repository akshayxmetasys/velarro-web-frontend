export const CAREERS_POSITIONS_FIGMA_NODE = "13148:15855" as const;

export const CAREERS_POSITIONS_FIGMA_NODES = {
  page: "13148:15855",
  mainContent: "13148:15859",
  searchSection: "13148:15860",
  searchRow: "13148:15861",
  searchField: "13148:15862",
  searchButton: "13148:15865",
  contentColumns: "13148:15866",
  filterPanel: "14585:37387",
  filterHeading: "13148:15868",
  filterControls: "13148:15870",
  jobList: "13148:15893",
  breadcrumb: "15057:23236",
} as const;

export const CAREERS_POSITIONS_COPY = {
  searchLabel: "Search by keywords",
  searchPlaceholder: "Search by keywords",
  searchButton: "Search Jobs",
  filterHeading: "Filter",
} as const;

export interface CareerPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  company: string;
  country: string;
  stateOrProvince: string;
  figmaNodeId: string;
}

export const CAREER_POSITION_FILTERS = [
  { key: "company", label: "Company" },
  { key: "employment", label: "Employment" },
  { key: "position", label: "Position" },
  { key: "country", label: "Country" },
  { key: "state-or-province", label: "State/Province" },
] as const;

export type CareerPositionFilterKey =
  (typeof CAREER_POSITION_FILTERS)[number]["key"];

export const CAREER_POSITIONS: readonly CareerPosition[] = [
  {
    id: "production-manager",
    slug: "production-manager",
    title: "Production Manager",
    department: "Manufacturing & Operations",
    location: "Estelí, Nicaragua",
    employmentType: "Full-time",
    company: "Velarro Estate",
    country: "Nicaragua",
    stateOrProvince: "Estelí",
    figmaNodeId: "13148:15894",
  },
  {
    id: "area-sales-manager",
    slug: "area-sales-manager",
    title: "Area Sales Manager",
    department: "Sales & Distribution",
    location: "Regional",
    employmentType: "Full-time",
    company: "Velarro Estate",
    country: "Regional",
    stateOrProvince: "Regional",
    figmaNodeId: "13148:15901",
  },
  {
    id: "sales-head-global",
    slug: "sales-head-global",
    title: "Sales Head",
    department: "Commercial Leadership",
    location: "Global",
    employmentType: "Full-time",
    company: "Velarro Estate",
    country: "Global",
    stateOrProvince: "Global",
    figmaNodeId: "13148:15908",
  },
  {
    id: "torcedor",
    slug: "torcedor",
    title: "Torcedor",
    department: "Product & Heritage",
    location: "Regional",
    employmentType: "Full-time",
    company: "Velarro Estate",
    country: "Regional",
    stateOrProvince: "Regional",
    figmaNodeId: "13148:15915",
  },
  {
    id: "tobacco-blender",
    slug: "tobacco-blender",
    title: "Tobacco Blender",
    department: "Product & Heritage",
    location: "Estelí, Nicaragua",
    employmentType: "Full-time",
    company: "Velarro Estate",
    country: "Nicaragua",
    stateOrProvince: "Estelí",
    figmaNodeId: "13148:15922",
  },
  {
    id: "sales-head-global-secondary",
    slug: "sales-head-global-secondary",
    title: "Sales Head",
    department: "Commercial Leadership",
    location: "Global",
    employmentType: "Full-time",
    company: "Velarro Estate",
    country: "Global",
    stateOrProvince: "Global",
    figmaNodeId: "13148:15929",
  },
] as const;

export function formatCareerPositionLocation(position: CareerPosition): string {
  return `${position.department} — ${position.location}`;
}

export function filterCareerPositions(
  positions: readonly CareerPosition[],
  query: string,
): CareerPosition[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [...positions];
  }

  return positions.filter((position) => {
    const searchableText = [
      position.title,
      position.department,
      position.location,
      position.employmentType,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getCareerPositionResultsStatus(
  visibleCount: number,
  hasActiveQuery: boolean,
): string {
  if (!hasActiveQuery) {
    return `${visibleCount} positions found`;
  }

  if (visibleCount === 0) {
    return "No positions match your search.";
  }

  if (visibleCount === 1) {
    return "1 position found";
  }

  return `${visibleCount} positions found`;
}
