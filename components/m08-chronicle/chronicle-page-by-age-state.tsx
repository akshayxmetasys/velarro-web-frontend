import { AgeGate } from "@/components/age/age-gate";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import { ChroniclePage } from "@/components/m08-chronicle/chronicle-page";
import type { AgeState } from "@/lib/age/age-state";

export interface ChroniclePageByAgeStateProps {
  ageState: AgeState;
}

export function ChroniclePageByAgeState({
  ageState,
}: ChroniclePageByAgeStateProps) {
  if (ageState === "unknown") {
    return <AgeGate />;
  }

  if (ageState === "under21") {
    return <Under21HomeShell />;
  }

  return <ChroniclePage />;
}
