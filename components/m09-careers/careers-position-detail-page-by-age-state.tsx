import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { CareersPositionDetailPage } from "@/components/m09-careers/careers-position-detail-page";
import type { CareerPositionDetail } from "@/components/m09-careers/careers-position-details-data";
import type { CareerPosition } from "@/components/m09-careers/careers-positions-data";
import type { AgeState } from "@/lib/age/age-state";

export interface CareersPositionDetailPageByAgeStateProps {
  ageState: AgeState;
  position: CareerPosition;
  detail: CareerPositionDetail;
}

export function CareersPositionDetailPageByAgeState({
  ageState,
  position,
  detail,
}: CareersPositionDetailPageByAgeStateProps) {
  return (
    <AgeAccessBoundary
      route={`/careers/positions/${position.slug}`}
      ageState={ageState}
    >
      <CareersPositionDetailPage
        ageState={ageState}
        position={position}
        detail={detail}
      />
    </AgeAccessBoundary>
  );
}
