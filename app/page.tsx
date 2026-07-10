import { HomePageByAgeState } from "@/components/m01-home/home-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";

export default async function Home() {
  const ageState = await getInitialAgeStateFromCookies();

  return <HomePageByAgeState ageState={ageState} />;
}
