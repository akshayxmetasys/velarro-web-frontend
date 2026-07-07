import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "@/components/ui/form-field";

describe("FormField", () => {
  it("associates the label with a custom control", () => {
    render(
      <FormField label="Phone" htmlFor="phone-input">
        <input id="phone-input" type="tel" />
      </FormField>,
    );

    expect(screen.getByLabelText("Phone")).toHaveAttribute("id", "phone-input");
  });

  it("exposes description and error messaging", () => {
    render(
      <FormField
        label="Email"
        htmlFor="email-input"
        description="We never share your email."
        error="Enter a valid email address."
        required
      >
        <input id="email-input" type="email" aria-invalid="true" />
      </FormField>,
    );

    expect(screen.getByText("We never share your email.")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.");
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
