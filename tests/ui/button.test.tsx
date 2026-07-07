import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("supports keyboard activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Continue</Button>);

    const button = screen.getByRole("button", { name: "Continue" });
    button.focus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not activate when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Continue
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders luxury CTA variants", () => {
    render(
      <>
        <Button variant="explore">Explore</Button>
        <Button variant="checkout">Checkout</Button>
        <Button variant="luxury">Join</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: "Explore" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Checkout" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();
  });
});
