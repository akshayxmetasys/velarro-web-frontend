import { CareersPositionsPageByAgeState } from "@/components/m09-careers/careers-positions-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Careers Positions",
  description:
    "Search Velarro career positions across manufacturing, sales, commercial leadership, and product heritage teams.",
  path: "/careers/positions",
  indexable: false,
});

interface CareersPositionsRouteProps {
  searchParams: Promise<{
    q?: string | string[];
  }>;
}

function getInitialSearchQuery(
  searchParam: string | string[] | undefined,
): string {
  if (typeof searchParam === "string") {
    return searchParam.trim();
  }

  if (Array.isArray(searchParam) && typeof searchParam[0] === "string") {
    return searchParam[0].trim();
  }

  return "";
}

export default async function CareersPositions({
  searchParams,
}: CareersPositionsRouteProps) {
  const resolvedSearchParams = await searchParams;
  const ageState = await getInitialAgeStateFromCookies();
  const initialQuery = getInitialSearchQuery(resolvedSearchParams.q);

  return (
    <CareersPositionsPageByAgeState
      ageState={ageState}
      initialQuery={initialQuery}
    />
  );
}
