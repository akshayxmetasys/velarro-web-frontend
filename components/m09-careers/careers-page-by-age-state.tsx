import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { CareersPage } from "@/components/m09-careers/careers-page";
import type { AgeState } from "@/lib/age/age-state";

export interface CareersPageByAgeStateProps {
  ageState: AgeState;
}

export function CareersPageByAgeState({
  ageState,
}: CareersPageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/careers" ageState={ageState}>
      <CareersPage ageState={ageState} />
    </AgeAccessBoundary>
  );
}
