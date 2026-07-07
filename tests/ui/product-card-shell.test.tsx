import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCardShell } from "@/components/ui/product-card-shell";

describe("ProductCardShell", () => {
  it("renders title, price, and placeholder image slot", () => {
    render(
      <ProductCardShell
        slotName="m04/house/product-card"
        imageWidth={280}
        imageHeight={280}
        title="Royal Leaf"
        price="$24.00"
      />,
    );

    expect(screen.getByRole("heading", { name: "Royal Leaf" })).toBeInTheDocument();
    expect(screen.getByText("$24.00")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "m04/house/product-card/image" })).toBeInTheDocument();
  });

  it("supports imageUrl override", () => {
    render(
      <ProductCardShell
        slotName="m04/house/product-card"
        imageWidth={280}
        imageHeight={280}
        imageUrl="https://example.com/royal-leaf.webp"
        imageAlt="Royal Leaf"
        title="Royal Leaf"
      />,
    );

    expect(screen.getByRole("img", { name: "Royal Leaf" })).toHaveAttribute(
      "src",
      "https://example.com/royal-leaf.webp",
    );
  });

  it("renders as a link when href is provided", () => {
    render(
      <ProductCardShell
        slotName="m04/house/product-card"
        imageWidth={280}
        imageHeight={280}
        title="Royal Leaf"
        href="/the-house/royal-leaf"
      />,
    );

    expect(screen.getByRole("link", { name: /Royal Leaf/i })).toHaveAttribute(
      "href",
      "/the-house/royal-leaf",
    );
  });
});
