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

export default async function CareersPositions() {
  const ageState = await getInitialAgeStateFromCookies();

  return <CareersPositionsPageByAgeState ageState={ageState} />;
}
