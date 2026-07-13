import { OurStoryPageByAgeState } from "@/components/m02-our-story/our-story-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Our Story",
  description: "Crafted with purpose, aged with time.",
  path: "/our-story",
  indexable: false,
});

export default async function OurStory() {
  const ageState = await getInitialAgeStateFromCookies();

  return <OurStoryPageByAgeState ageState={ageState} />;
}
