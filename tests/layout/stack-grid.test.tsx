import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";

describe("Stack", () => {
  it("renders children in a vertical stack", () => {
    render(
      <Stack data-testid="stack">
        <span>One</span>
        <span>Two</span>
      </Stack>,
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("flex-col");
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});

describe("Grid", () => {
  it("renders children in a responsive grid", () => {
    render(
      <Grid columns={3} data-testid="grid">
        <span>Alpha</span>
        <span>Beta</span>
      </Grid>,
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toHaveClass("grid");
    expect(grid.className).toContain("min-[1440px]:grid-cols-3");
  });
});
