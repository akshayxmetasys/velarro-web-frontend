import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

describe("ImagePlaceholder", () => {
  it("renders a token-backed placeholder with slot annotation", () => {
    render(
      <ImagePlaceholder slotName="m01/home/hero-primary" width={320} height={180} />,
    );

    const slot = screen.getByRole("img", { name: "m01/home/hero-primary" });
    expect(slot).toHaveAttribute("data-slot", "m01/home/hero-primary");
    expect(slot).toHaveStyle({ width: "320px", height: "180px" });
  });

  it("renders an img when imageUrl is supplied", () => {
    render(
      <ImagePlaceholder
        slotName="m04/house/gallery"
        width={200}
        height={200}
        imageUrl="https://example.com/product.webp"
        alt="Product gallery"
      />,
    );

    const image = screen.getByRole("img", { name: "Product gallery" });
    expect(image).toHaveAttribute("src", "https://example.com/product.webp");
    expect(image).toHaveAttribute("width", "200");
    expect(image).toHaveAttribute("height", "200");
  });
});
