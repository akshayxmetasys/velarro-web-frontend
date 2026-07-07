import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyStateShell } from "@/components/ui/empty-state-shell";
import { Button } from "@/components/ui/button";

describe("EmptyStateShell", () => {
  it("renders title, description, and illustration placeholder", () => {
    render(
      <EmptyStateShell
        title="Your cart is empty"
        description="Explore the collection to add items."
        slotName="m06/cart/empty"
      />,
    );

    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
    expect(screen.getByText("Explore the collection to add items.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "m06/cart/empty" })).toBeInTheDocument();
  });

  it("renders an optional action slot", () => {
    render(
      <EmptyStateShell
        title="No saved items"
        action={<Button variant="explore">Explore</Button>}
      />,
    );

    expect(screen.getByRole("button", { name: "Explore" })).toBeInTheDocument();
  });
});
