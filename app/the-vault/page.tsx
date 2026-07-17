import { TheVaultPageByAgeState } from "@/components/m05-vault/the-vault-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "The Vault",
  description:
    "We're creating an experience worthy of the Velarro name while The Vault is prepared for its arrival.",
  path: "/the-vault",
  indexable: false,
});

export default async function TheVault() {
  const ageState = await getInitialAgeStateFromCookies();

  return <TheVaultPageByAgeState ageState={ageState} />;
}
