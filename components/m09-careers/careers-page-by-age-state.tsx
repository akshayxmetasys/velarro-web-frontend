import { CareersPage } from "@/components/m09-careers/careers-page";
import type { AgeState } from "@/lib/age/age-state";

export interface CareersPageByAgeStateProps {
  ageState: AgeState;
}

export function CareersPageByAgeState({
  ageState,
}: CareersPageByAgeStateProps) {
  return <CareersPage ageState={ageState} />;
}
