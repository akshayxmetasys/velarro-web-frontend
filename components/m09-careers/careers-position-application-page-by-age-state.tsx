import { CareersPositionApplicationPage } from "@/components/m09-careers/careers-position-application-page";
import type { CareerPositionApplicationConfig } from "@/components/m09-careers/careers-position-application-data";
import type { CareerPosition } from "@/components/m09-careers/careers-positions-data";
import type { AgeState } from "@/lib/age/age-state";

export interface CareersPositionApplicationPageByAgeStateProps {
  ageState: AgeState;
  position: CareerPosition;
  application: CareerPositionApplicationConfig;
}

export function CareersPositionApplicationPageByAgeState({
  ageState,
  position,
  application,
}: CareersPositionApplicationPageByAgeStateProps) {
  return (
    <CareersPositionApplicationPage
      ageState={ageState}
      position={position}
      application={application}
    />
  );
}
