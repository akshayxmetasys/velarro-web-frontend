import { AgeGate } from "@/components/age/age-gate";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import { TheHousePage } from "@/components/m04-house/the-house-page";
import type { AgeState } from "@/lib/age/age-state";

export interface TheHousePageByAgeStateProps {
  ageState: AgeState;
}

export function TheHousePageByAgeState({
  ageState,
}: TheHousePageByAgeStateProps) {
  if (ageState === "unknown") {
    return <AgeGate />;
  }

  if (ageState === "under21") {
    return <Under21HomeShell />;
  }

  return <TheHousePage />;
}
