import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { TheHousePage } from "@/components/m04-house/the-house-page";
import type { AgeState } from "@/lib/age/age-state";

export interface TheHousePageByAgeStateProps {
  ageState: AgeState;
}

export function TheHousePageByAgeState({
  ageState,
}: TheHousePageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/the-estate/the-house" ageState={ageState}>
      <TheHousePage />
    </AgeAccessBoundary>
  );
}
