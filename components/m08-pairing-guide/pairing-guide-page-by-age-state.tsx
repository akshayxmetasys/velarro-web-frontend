import { AgeGate } from "@/components/age/age-gate";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import { PairingGuidePage } from "@/components/m08-pairing-guide/pairing-guide-page";
import type { AgeState } from "@/lib/age/age-state";

export interface PairingGuidePageByAgeStateProps {
  ageState: AgeState;
}

export function PairingGuidePageByAgeState({
  ageState,
}: PairingGuidePageByAgeStateProps) {
  if (ageState === "unknown") {
    return <AgeGate />;
  }

  if (ageState === "under21") {
    return <Under21HomeShell />;
  }

  return <PairingGuidePage />;
}
