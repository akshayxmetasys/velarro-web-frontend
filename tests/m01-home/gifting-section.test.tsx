import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GiftingSection } from "@/components/m01-home/gifting-section";
import {
  M01_CONTAINED_SECTION_IMAGE_SIZES,
  M01_CONTAINED_SECTION_WIDTH_CLASS,
} from "@/components/m01-home/m01-section-layout";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    sizes,
    className,
    unoptimized,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    className?: string;
    unoptimized?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-fill={fill ? "true" : undefined}
      data-sizes={sizes}
      data-unoptimized={unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

describe("GiftingSection", () => {
  it("renders the exact Figma heading stack and visible CTA copy", () => {
    render(<GiftingSection />);

    expect(screen.getByText("Gifting")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Find the perfect gifts",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Explore gifting/ })).toHaveTextContent(
      "EXPLORE",
    );
  });

  it("uses only the approved Gifting production image URL", () => {
    const serialized = JSON.stringify(M01_HOME_APPROVED_IMAGES.giftingBackground);

    expect(M01_HOME_APPROVED_IMAGES.giftingBackground).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/gift-hero-home-20260709-041311-desktop-hero.webp",
    );
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });

  it("renders the Gifting image directly from the approved host", () => {
    render(<GiftingSection />);

    expect(
      screen.getByAltText("Velarro gifting collection imagery"),
    ).toHaveAttribute("src", M01_HOME_APPROVED_IMAGES.giftingBackground);
    expect(
      screen.getByAltText("Velarro gifting collection imagery"),
    ).toHaveAttribute("data-unoptimized", "true");
  });

  it("provides an accessible deferred CTA control", () => {
    render(<GiftingSection />);

    expect(
      screen.getByRole("button", {
        name: "Explore gifting (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("matches the approved Cigar Knowledge card-row width", () => {
    const { container } = render(<GiftingSection />);

    const section = container.querySelector('[data-figma-node="13148:15113"]');
    const block = section?.firstElementChild;

    expect(section).toHaveClass("px-4");
    expect(block).toHaveClass("mx-auto", M01_CONTAINED_SECTION_WIDTH_CLASS);
    expect(
      screen.getByAltText("Velarro gifting collection imagery"),
    ).toHaveAttribute("data-sizes", M01_CONTAINED_SECTION_IMAGE_SIZES);
  });
});
