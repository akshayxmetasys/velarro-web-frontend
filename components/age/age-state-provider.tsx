"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_AGE_STATE,
  isPersistedAgeState,
  type AgeState,
} from "@/lib/age/age-state";
import {
  serializeAgeStateCookie,
  serializeAgeStateCookieClear,
} from "@/lib/age/age-cookie";

export interface AgeStateContextValue {
  ageState: AgeState;
  setAgeState: (ageState: AgeState) => void;
}

const AgeStateContext = createContext<AgeStateContextValue | null>(null);

export interface AgeStateProviderProps {
  children: ReactNode;
  initialAgeState?: AgeState;
}

export function AgeStateProvider({
  children,
  initialAgeState = DEFAULT_AGE_STATE,
}: AgeStateProviderProps) {
  const [ageState, setAgeStateValue] = useState<AgeState>(initialAgeState);

  const value = useMemo<AgeStateContextValue>(
    () => ({
      ageState,
      setAgeState(nextAgeState) {
        setAgeStateValue(nextAgeState);

        if (typeof document === "undefined") {
          return;
        }

        document.cookie = isPersistedAgeState(nextAgeState)
          ? serializeAgeStateCookie(nextAgeState)
          : serializeAgeStateCookieClear();
      },
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
