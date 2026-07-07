import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockedUsePathname = vi.mocked(usePathname);

describe("layout Breadcrumbs", () => {
  beforeEach(() => {
    mockedUsePathname.mockReset();
  });

  it("returns null on the home route", () => {
    mockedUsePathname.mockReturnValue("/");

    const { container } = render(<Breadcrumbs />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders route-backed breadcrumb links and current page", () => {
    mockedUsePathname.mockReturnValue("/the-house/the-cabinet");

    render(<Breadcrumbs />);

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "The House" })).toHaveAttribute(
      "href",
      "/the-house",
    );
    expect(screen.getByText("The Cabinet")).toHaveAttribute("aria-current", "page");
  });
});

