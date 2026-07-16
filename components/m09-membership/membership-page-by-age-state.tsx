import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { MembershipPage } from "@/components/m09-membership/membership-page";
import type { AgeState } from "@/lib/age/age-state";

export interface MembershipPageByAgeStateProps {
  ageState: AgeState;
}

export function MembershipPageByAgeState({
  ageState,
}: MembershipPageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/membership" ageState={ageState}>
      <MembershipPage ageState={ageState} />
    </AgeAccessBoundary>
  );
}
