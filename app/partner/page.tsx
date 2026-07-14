import { PartnerPageByAgeState } from "@/components/m09-partner/partner-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Partner",
  description: "Submit your business details to explore partnering with Velarro.",
  path: "/partner",
  indexable: false,
});

export default async function Partner() {
  const ageState = await getInitialAgeStateFromCookies();

  return <PartnerPageByAgeState ageState={ageState} />;
}
