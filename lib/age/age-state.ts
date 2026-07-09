export const AGE_STATES = ["unknown", "over21", "under21"] as const;

export type AgeState = (typeof AGE_STATES)[number];
export type PersistedAgeState = Exclude<AgeState, "unknown">;

export const DEFAULT_AGE_STATE: AgeState = "unknown";

export function isAgeState(value: unknown): value is AgeState {
  return typeof value === "string" && AGE_STATES.includes(value as AgeState);
}

export function isPersistedAgeState(value: unknown): value is PersistedAgeState {
  return value === "over21" || value === "under21";
}

export function parseAgeState(value: unknown): AgeState {
  return isAgeState(value) ? value : DEFAULT_AGE_STATE;
}
