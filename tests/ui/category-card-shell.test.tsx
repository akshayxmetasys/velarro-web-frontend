import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CategoryCardShell } from "@/components/ui/category-card-shell";

describe("CategoryCardShell", () => {
  it("renders category title and image placeholder", () => {
    render(
      <CategoryCardShell
        slotName="m04/house/category-cabinet"
        imageWidth={360}
        imageHeight={240}
        title="The Cabinet"
        description="Curated accessories"
      />,
    );

    expect(screen.getByRole("heading", { name: "The Cabinet" })).toBeInTheDocument();
    expect(screen.getByText("Curated accessories")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "m04/house/category-cabinet/image" })).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(
      <CategoryCardShell
        slotName="m04/house/category-cabinet"
        imageWidth={360}
        imageHeight={240}
        title="The Cabinet"
        href="/the-house/the-cabinet"
      />,
    );

    expect(screen.getByRole("link", { name: /The Cabinet/i })).toHaveAttribute(
      "href",
      "/the-house/the-cabinet",
    );
  });
});
