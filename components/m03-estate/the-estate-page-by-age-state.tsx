import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { TheEstatePage } from "@/components/m03-estate/the-estate-page";
import type { AgeState } from "@/lib/age/age-state";

export interface TheEstatePageByAgeStateProps {
  ageState: AgeState;
}

export function TheEstatePageByAgeState({
  ageState,
}: TheEstatePageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/the-estate" ageState={ageState}>
      <TheEstatePage />
    </AgeAccessBoundary>
  );
}
