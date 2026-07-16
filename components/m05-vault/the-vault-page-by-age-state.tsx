import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { TheVaultPage } from "@/components/m05-vault/the-vault-page";
import type { AgeState } from "@/lib/age/age-state";

export interface TheVaultPageByAgeStateProps {
  ageState: AgeState;
}

export function TheVaultPageByAgeState({
  ageState,
}: TheVaultPageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/the-vault" ageState={ageState}>
      <TheVaultPage />
    </AgeAccessBoundary>
  );
}
