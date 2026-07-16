import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { OurStoryPage } from "@/components/m02-our-story/our-story-page";
import type { AgeState } from "@/lib/age/age-state";

export interface OurStoryPageByAgeStateProps {
  ageState: AgeState;
}

export function OurStoryPageByAgeState({
  ageState,
}: OurStoryPageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/our-story" ageState={ageState}>
      <OurStoryPage />
    </AgeAccessBoundary>
  );
}
