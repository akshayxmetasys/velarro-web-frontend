import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

describe("ImagePlaceholder", () => {
  it("renders fixed placeholder dimensions and data slot", () => {
    render(
      <ImagePlaceholder
        width={320}
        height={180}
        slotName="home-hero"
        alt="Future home hero artwork"
      />,
    );

    const placeholder = screen.getByRole("img", {
      name: "Future home hero artwork",
    });

    expect(placeholder).toHaveAttribute("data-slot", "home-hero");
    expect(placeholder).toHaveStyle({ width: "320px", height: "180px" });
  });
});
