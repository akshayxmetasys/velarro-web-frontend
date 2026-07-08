import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home, { metadata } from "@/app/page";

describe("Home page", () => {
  it("replaces the starter page with Figma-scoped Velarro sections", () => {
    const { container } = render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" })).toBeInTheDocument();
    expect(screen.getByText("Velarro cigars")).toBeInTheDocument();
    expect(screen.getByText("THE ROASTERY")).toBeInTheDocument();
    expect(screen.getByText("FIND THE PERFECT GIFTS")).toBeInTheDocument();
    expect(screen.getByText("Velarro Estate collection")).toBeInTheDocument();
    expect(screen.queryByText(/To get started/)).not.toBeInTheDocument();
    expect(container.querySelector("#ld-organization")).toBeInTheDocument();
    expect(container.querySelector("#ld-website")).toBeInTheDocument();
  });

  it("uses route-safe links for visible homepage calls to action", () => {
    render(<Home />);

    const shopNowLinks = screen.getAllByRole("link", { name: "SHOP NOW" });

    expect(shopNowLinks[0]).toHaveAttribute(
      "href",
      "/the-estate",
    );
    expect(shopNowLinks[1]).toHaveAttribute("href", "/the-house/the-roastery");
    expect(screen.getByRole("link", { name: /Ashtrays/i })).toHaveAttribute(
      "href",
      "/the-estate",
    );
    expect(screen.getByRole("link", { name: "EXPLORE" })).toHaveAttribute(
      "href",
      "/coming-soon",
    );
    expect(screen.getByRole("link", { name: "EXPLORE GIFTS" })).toHaveAttribute(
      "href",
      "/the-house",
    );
  });

  it("exports indexable marketing metadata", () => {
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.title).toEqual({ absolute: "Velarro Estate" });
  });
});
