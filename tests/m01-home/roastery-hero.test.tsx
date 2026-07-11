import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RoasteryHeroSection } from "@/components/m01-home/roastery-hero-section";
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

describe("RoasteryHeroSection", () => {
  it("renders the Figma-approved heading, image, and deferred CTA", () => {
    render(<RoasteryHeroSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Roastery hero imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.roasteryHero,
    );
    expect(screen.getByAltText("Roastery hero imagery")).toHaveAttribute(
      "data-unoptimized",
      "true",
    );
    expect(
      screen.getByRole("button", {
        name: "Shop now (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("uses only the approved production image URL", () => {
    const serialized = JSON.stringify(M01_HOME_APPROVED_IMAGES.roasteryHero);

    expect(M01_HOME_APPROVED_IMAGES.roasteryHero).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/homeu21-hero-20260709-024151-desktop-hero.webp",
    );
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });
});
