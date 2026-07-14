import { CareersPageByAgeState } from "@/components/m09-careers/careers-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Explore roles across Velarro production houses, sales teams, and global offices.",
  path: "/careers",
  indexable: false,
});

export default async function Careers() {
  const ageState = await getInitialAgeStateFromCookies();

  return <CareersPageByAgeState ageState={ageState} />;
}
