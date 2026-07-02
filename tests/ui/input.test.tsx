import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("generates unique IDs when none are supplied", () => {
    render(
      <>
        <Input label="First name" />
        <Input label="Last name" />
      </>,
    );

    const first = screen.getByLabelText("First name");
    const last = screen.getByLabelText("Last name");

    expect(first.id).toBeTruthy();
    expect(last.id).toBeTruthy();
    expect(first.id).not.toBe(last.id);
  });

  it("uses an explicit ID when provided", () => {
    render(<Input id="guest-email" label="Email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "guest-email");
  });

  it("associates labels with controls", () => {
    render(<Input label="Email" name="email" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("name", "email");
  });

  it("exposes aria-invalid when an error is present", () => {
    render(<Input label="Email" error="Enter a valid email address" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email address");
  });
});
