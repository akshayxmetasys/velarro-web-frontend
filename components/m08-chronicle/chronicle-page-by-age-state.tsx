import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { ChroniclePage } from "@/components/m08-chronicle/chronicle-page";
import type { AgeState } from "@/lib/age/age-state";

export interface ChroniclePageByAgeStateProps {
  ageState: AgeState;
}

export function ChroniclePageByAgeState({
  ageState,
}: ChroniclePageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/the-chronicle" ageState={ageState}>
      <ChroniclePage />
    </AgeAccessBoundary>
  );
}
