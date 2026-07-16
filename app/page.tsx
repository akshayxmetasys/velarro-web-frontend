import { HomePageByAgeState } from "@/components/m01-home/home-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Velarro Estate",
  description:
    "Velarro Estate — roastery, house goods, and membership experiences.",
  path: "/",
  indexable: true,
});

export default async function Home() {
  const ageState = await getInitialAgeStateFromCookies();

  return <HomePageByAgeState ageState={ageState} />;
}
