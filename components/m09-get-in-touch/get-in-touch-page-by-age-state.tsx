import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { GetInTouchPage } from "@/components/m09-get-in-touch/get-in-touch-page";
import type { AgeState } from "@/lib/age/age-state";

export interface GetInTouchPageByAgeStateProps {
  ageState: AgeState;
}

export function GetInTouchPageByAgeState({
  ageState,
}: GetInTouchPageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/get-in-touch" ageState={ageState}>
      <GetInTouchPage ageState={ageState} />
    </AgeAccessBoundary>
  );
}
