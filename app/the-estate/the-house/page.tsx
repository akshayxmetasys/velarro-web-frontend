import { TheHousePageByAgeState } from "@/components/m04-house/the-house-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "The House",
  description: "Velarro House lifestyle goods from The Estate.",
  path: "/the-estate/the-house",
  indexable: false,
});

export default async function TheHouse() {
  const ageState = await getInitialAgeStateFromCookies();

  return <TheHousePageByAgeState ageState={ageState} />;
}
