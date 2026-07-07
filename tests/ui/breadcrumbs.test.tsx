import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders navigable trail with current page marker", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "The House", href: "/the-house" },
          { label: "Royal Leaf" },
        ]}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "The House" })).toHaveAttribute("href", "/the-house");
    expect(screen.getByText("Royal Leaf")).toHaveAttribute("aria-current", "page");
  });

  it("returns null for an empty item list", () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
