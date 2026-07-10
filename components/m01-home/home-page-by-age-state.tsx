import { AgeGate } from "@/components/age/age-gate";
import { Over21HomePage } from "@/components/m01-home/over21-home-page";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import type { AgeState } from "@/lib/age/age-state";

export interface HomePageByAgeStateProps {
  ageState: AgeState;
}

export function HomePageByAgeState({ ageState }: HomePageByAgeStateProps) {
  if (ageState === "unknown") {
    return <AgeGate />;
  }

  if (ageState === "under21") {
    return <Under21HomeShell />;
  }

  return <Over21HomePage />;
}
