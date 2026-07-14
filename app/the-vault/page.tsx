import { TheVaultPageByAgeState } from "@/components/m05-vault/the-vault-page-by-age-state";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "The Vault",
  description:
    "Curated Velarro collections, limited releases, and exclusive opportunities.",
  path: "/the-vault",
  indexable: false,
});

export default async function TheVault() {
  const ageState = await getInitialAgeStateFromCookies();

  return <TheVaultPageByAgeState ageState={ageState} />;
}
