import { GetInTouchPage } from "@/components/m09-get-in-touch/get-in-touch-page";
import type { AgeState } from "@/lib/age/age-state";

export interface GetInTouchPageByAgeStateProps {
  ageState: AgeState;
}

export function GetInTouchPageByAgeState({
  ageState,
}: GetInTouchPageByAgeStateProps) {
  return <GetInTouchPage ageState={ageState} />;
}
