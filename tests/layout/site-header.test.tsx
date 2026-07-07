import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/layout/site-header";

describe("SiteHeader", () => {
  it("renders Figma-verified navbar text with route-safe links", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Estate" })).toHaveAttribute(
      "href",
      "/the-estate",
    );
    expect(screen.getByRole("link", { name: "Partner" })).toHaveAttribute("href", "/partner");
    expect(screen.getByRole("link", { name: "Our Story" })).toHaveAttribute(
      "href",
      "/our-story",
    );
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: "Velarro Estate home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("opens mobile navigation drawer", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("dialog", { name: "Estate Index" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
  });
});
