import { MembershipPageByAgeState } from "@/components/m09-membership/membership-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Membership",
  description:
    "Explore Velarro membership tiers, benefits, and lifetime spend thresholds across House, Reserve, Estate, Atelier, and Private Circle.",
  path: "/membership",
  indexable: false,
});

export default async function Membership() {
  const ageState = await getInitialAgeStateFromCookies();

  return <MembershipPageByAgeState ageState={ageState} />;
}
