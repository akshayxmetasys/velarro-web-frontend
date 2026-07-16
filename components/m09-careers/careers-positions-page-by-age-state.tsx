import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { CareersPositionsPage } from "@/components/m09-careers/careers-positions-page";
import type { AgeState } from "@/lib/age/age-state";

export interface CareersPositionsPageByAgeStateProps {
  ageState: AgeState;
  initialQuery?: string;
}

export function CareersPositionsPageByAgeState({
  ageState,
  initialQuery,
}: CareersPositionsPageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/careers/positions" ageState={ageState}>
      <CareersPositionsPage ageState={ageState} initialQuery={initialQuery} />
    </AgeAccessBoundary>
  );
}
