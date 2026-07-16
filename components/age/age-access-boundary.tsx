import type { ReactNode } from "react";
import { AgeGate } from "@/components/age/age-gate";
import { Under21HomeShell } from "@/components/m01-home/under21-home-shell";
import type { AgeState } from "@/lib/age/age-state";
import { getRouteAccess } from "@/lib/age/route-access";

export interface AgeAccessBoundaryProps {
  route: string;
  ageState: AgeState;
  children: ReactNode;
  /**
   * Rendered when policy decides `block` for under-21 visitors.
   * Defaults to the shared under-21 homepage shell.
   */
  blockedFallback?: ReactNode;
}

/**
 * Server-first presentation boundary that applies `getRouteAccess` decisions.
 * This is not backend authorization; it centralizes UI age presentation so
 * page modules cannot diverge from the shared policy table.
 */
export function AgeAccessBoundary({
  route,
  ageState,
  children,
  blockedFallback = <Under21HomeShell />,
}: AgeAccessBoundaryProps) {
  const access = getRouteAccess(route, ageState);

  if (access.decision === "gate") {
    return <AgeGate />;
  }

  if (access.decision === "block") {
    return blockedFallback;
  }

  return children;
}
