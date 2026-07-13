import { AgeGate } from "@/components/age/age-gate";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import { OurStoryPage } from "@/components/m02-our-story/our-story-page";
import type { AgeState } from "@/lib/age/age-state";

export interface OurStoryPageByAgeStateProps {
  ageState: AgeState;
}

export function OurStoryPageByAgeState({
  ageState,
}: OurStoryPageByAgeStateProps) {
  if (ageState === "unknown") {
    return <AgeGate />;
  }

  if (ageState === "under21") {
    return <Under21HomeShell />;
  }

  return <OurStoryPage />;
}
