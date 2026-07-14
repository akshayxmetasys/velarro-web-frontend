import { PartnerPage } from "@/components/m09-partner/partner-page";
import type { AgeState } from "@/lib/age/age-state";

export interface PartnerPageByAgeStateProps {
  ageState: AgeState;
}

export function PartnerPageByAgeState({
  ageState,
}: PartnerPageByAgeStateProps) {
  return <PartnerPage ageState={ageState} />;
}
