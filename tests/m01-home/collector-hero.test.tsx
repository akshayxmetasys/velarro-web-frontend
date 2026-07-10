import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CollectorHeroSection } from "@/components/m01-home/collector-hero-section";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
    />
  ),
}));

describe("CollectorHeroSection", () => {
  it("renders the approved hero image, heading, and deferred CTA", () => {
    render(<CollectorHeroSection />);

    expect(screen.getByRole("heading", { name: "COLLECTOR SERIES" })).toBeInTheDocument();
    expect(screen.getByAltText("Collector Series lifestyle imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.collectorHero,
    );
    expect(
      screen.getByRole("button", {
        name: "Shop now (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();
    expect(
      screen.getByText(
        "Slide indicators are decorative only. Carousel behavior is not yet approved.",
      ),
    ).toBeInTheDocument();
  });
});
