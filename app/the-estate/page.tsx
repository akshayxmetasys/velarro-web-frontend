import { TheEstatePageByAgeState } from "@/components/m03-estate/the-estate-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "The Estate",
  description: "Collector Series cigars from The Humidor.",
  path: "/the-estate",
  indexable: false,
});

export default async function TheEstate() {
  const ageState = await getInitialAgeStateFromCookies();

  return <TheEstatePageByAgeState ageState={ageState} />;
}
