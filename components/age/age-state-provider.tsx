"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_AGE_STATE, type AgeState } from "@/lib/age/age-state";

export interface AgeStateContextValue {
  ageState: AgeState;
  setAgeState: (ageState: AgeState) => void;
}

const AgeStateContext = createContext<AgeStateContextValue | null>(null);

export interface AgeStateProviderProps {
  children: ReactNode;
  initialAgeState?: AgeState;
}

/**
 * Client mirror of age state for interactive UI only.
 * Persistence must go through `confirmAgeStateAction` (httpOnly cookie).
 * Do not write `document.cookie` here — that would create a non-httpOnly
 * cookie that conflicts with the server-set httpOnly `velarro_age_state`.
 */
export function AgeStateProvider({
  children,
  initialAgeState = DEFAULT_AGE_STATE,
}: AgeStateProviderProps) {
  const [ageState, setAgeStateValue] = useState<AgeState>(initialAgeState);

  const value = useMemo<AgeStateContextValue>(
    () => ({
      ageState,
      setAgeState: setAgeStateValue,
    }),
    [ageState],
  );

  return (
    <AgeStateContext.Provider value={value}>
      {children}
    </AgeStateContext.Provider>
  );
}

export function useAgeState(): AgeStateContextValue {
  const context = useContext(AgeStateContext);

  if (!context) {
    throw new Error("useAgeState must be used within AgeStateProvider.");
  }

  return context;
}
