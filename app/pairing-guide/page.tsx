import { PairingGuidePageByAgeState } from "@/components/m08-pairing-guide/pairing-guide-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Pairing Guide",
  description:
    "Explore cigar pairing stories and guides from Velarro Estate.",
  path: "/pairing-guide",
  indexable: false,
});

export default async function PairingGuide() {
  const ageState = await getInitialAgeStateFromCookies();

  return <PairingGuidePageByAgeState ageState={ageState} />;
}
