import { ChroniclePageByAgeState } from "@/components/m08-chronicle/chronicle-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "The Chronicle",
  description:
    "Latest Velarro stories, product unveilings, special events, and lifestyle experiences.",
  path: "/the-chronicle",
  indexable: false,
});

export default async function TheChronicle() {
  const ageState = await getInitialAgeStateFromCookies();

  return <ChroniclePageByAgeState ageState={ageState} />;
}
