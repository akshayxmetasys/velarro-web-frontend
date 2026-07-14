import { AgeGate } from "@/components/age/age-gate";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import { TheVaultPage } from "@/components/m05-vault/the-vault-page";
import type { AgeState } from "@/lib/age/age-state";

export interface TheVaultPageByAgeStateProps {
  ageState: AgeState;
}

export function TheVaultPageByAgeState({
  ageState,
}: TheVaultPageByAgeStateProps) {
  if (ageState === "unknown") {
    return <AgeGate />;
  }

  if (ageState === "under21") {
    return <Under21HomeShell />;
  }

  return <TheVaultPage />;
}
