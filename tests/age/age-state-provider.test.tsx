import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  AgeStateProvider,
  useAgeState,
} from "@/components/age/age-state-provider";

function AgeStateProbe() {
  const { ageState, setAgeState } = useAgeState();

  return (
    <div>
      <p data-testid="age-state">{ageState}</p>
      <button type="button" onClick={() => setAgeState("over21")}>
        Confirm over 21
      </button>
    </div>
  );
}

describe("AgeStateProvider", () => {
  it("updates React state without writing document.cookie", async () => {
    const user = userEvent.setup();
    const initialCookie = document.cookie;

    render(
      <AgeStateProvider initialAgeState="unknown">
        <AgeStateProbe />
      </AgeStateProvider>,
    );

    expect(screen.getByTestId("age-state")).toHaveTextContent("unknown");

    await user.click(screen.getByRole("button", { name: "Confirm over 21" }));

    expect(screen.getByTestId("age-state")).toHaveTextContent("over21");
    expect(document.cookie).toBe(initialCookie);
    expect(document.cookie).not.toContain("velarro_age_state");
  });
});
