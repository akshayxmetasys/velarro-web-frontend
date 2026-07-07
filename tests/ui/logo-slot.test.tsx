import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogoSlot } from "@/components/ui/logo-slot";

describe("LogoSlot", () => {
  it("renders a brand placeholder when no imageUrl is provided", () => {
    render(<LogoSlot />);

    expect(screen.getByRole("img", { name: "Velarro logo placeholder" })).toBeInTheDocument();
    expect(screen.getByText("Velarro")).toBeInTheDocument();
  });

  it("renders an img when imageUrl is supplied", () => {
    render(
      <LogoSlot
        imageUrl="https://example.com/velarro-logo.svg"
        alt="Velarro"
        width={140}
        height={36}
      />,
    );

    const logo = screen.getByRole("img", { name: "Velarro" });
    expect(logo).toHaveAttribute("src", "https://example.com/velarro-logo.svg");
  });
});
