import { CareersPositionsPage } from "@/components/m09-careers/careers-positions-page";
import type { AgeState } from "@/lib/age/age-state";

export interface CareersPositionsPageByAgeStateProps {
  ageState: AgeState;
}

export function CareersPositionsPageByAgeState({
  ageState,
}: CareersPositionsPageByAgeStateProps) {
  return <CareersPositionsPage ageState={ageState} />;
}
