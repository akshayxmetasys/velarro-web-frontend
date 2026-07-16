import { AgeAccessBoundary } from "@/components/age/age-access-boundary";
import { Over21HomePage } from "@/components/m01-home/over21-home-page";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import type { AgeState } from "@/lib/age/age-state";

export interface HomePageByAgeStateProps {
  ageState: AgeState;
}

export function HomePageByAgeState({ ageState }: HomePageByAgeStateProps) {
  return (
    <AgeAccessBoundary route="/" ageState={ageState}>
      {ageState === "under21" ? <Under21HomeShell /> : <Over21HomePage />}
    </AgeAccessBoundary>
  );
}
