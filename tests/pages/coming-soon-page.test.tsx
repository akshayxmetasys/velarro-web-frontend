import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ComingSoonRoute, { metadata } from "@/app/coming-soon/page";

describe("ComingSoon page", () => {
  it("renders the Figma-verified coming soon copy and route-safe links", () => {
    render(<ComingSoonRoute />);

    expect(screen.getByRole("heading", { level: 1, name: /Unveiling soon/ })).toBeInTheDocument();
    expect(screen.getByText(/experience worthy of the Velarro name/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "HOMEPAGE" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "PRODUCTS" })).toHaveAttribute(
      "href",
      "/the-house",
    );
    expect(screen.getByRole("img", { name: "m05/coming-soon/backdrop" })).toBeInTheDocument();
  });

  it("exports noindex metadata", () => {
    expect(metadata.alternates?.canonical).toBe("/coming-soon");
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });
});
