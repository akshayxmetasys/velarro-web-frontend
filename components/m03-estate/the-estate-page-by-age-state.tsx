import { AgeGate } from "@/components/age/age-gate";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import { TheEstatePage } from "@/components/m03-estate/the-estate-page";
import type { AgeState } from "@/lib/age/age-state";

export interface TheEstatePageByAgeStateProps {
  ageState: AgeState;
}

export function TheEstatePageByAgeState({
  ageState,
}: TheEstatePageByAgeStateProps) {
  if (ageState === "unknown") {
    return <AgeGate />;
  }

  if (ageState === "under21") {
    return <Under21HomeShell />;
  }

  return <TheEstatePage />;
}
