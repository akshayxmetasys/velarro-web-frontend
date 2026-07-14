import { GetInTouchPageByAgeState } from "@/components/m09-get-in-touch/get-in-touch-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Get in Touch",
  description:
    "Contact Velarro for orders, product questions, vendor inquiries, and general support.",
  path: "/get-in-touch",
  indexable: false,
});

export default async function GetInTouch() {
  const ageState = await getInitialAgeStateFromCookies();

  return <GetInTouchPageByAgeState ageState={ageState} />;
}
