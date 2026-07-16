import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { PairingGuidePage } from "@/components/m08-pairing-guide/pairing-guide-page";
import type { AgeState } from "@/lib/age/age-state";

export interface PairingGuidePageByAgeStateProps {
  ageState: AgeState;
}

export function PairingGuidePageByAgeState({
  ageState,
}: PairingGuidePageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/pairing-guide" ageState={ageState}>
      <PairingGuidePage />
    </AgeAccessBoundary>
  );
}
