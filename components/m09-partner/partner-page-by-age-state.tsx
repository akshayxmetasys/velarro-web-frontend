import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { PartnerPage } from "@/components/m09-partner/partner-page";
import type { AgeState } from "@/lib/age/age-state";

export interface PartnerPageByAgeStateProps {
  ageState: AgeState;
}

export function PartnerPageByAgeState({
  ageState,
}: PartnerPageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/partner" ageState={ageState}>
      <PartnerPage ageState={ageState} />
    </AgeAccessBoundary>
  );
}
