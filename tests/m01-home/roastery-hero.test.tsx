import { render, screen, within } from "@testing-library/react";
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

  it("marks the Figma node and preserves desktop geometry contracts", () => {
    const { container } = render(<RoasteryHeroSection />);
    const section = container.querySelector('[data-figma-node="15451:37609"]');
    expect(section).not.toBeNull();

    const frame = container.querySelector('[data-slot="roastery-hero-frame"]');
    expect(frame?.className).toContain("h-[851px]");

    const image = screen.getByAltText("Roastery hero imagery");
    expect(image.className).toContain("object-cover");
    expect(image.className).toContain("object-center");

    const overlay = container.querySelector(
      '[data-slot="roastery-hero-overlay"]',
    );
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay?.className).toContain("bg-[rgba(21,20,20,0.4)]");

    const content = container.querySelector(
      '[data-slot="roastery-hero-content"]',
    );
    expect(content?.className).toContain("top-[319px]");
    expect(content?.className).toContain("max-w-[998px]");
    expect(content?.className).toContain("gap-[37px]");
    expect(content?.className).not.toContain("[&>*]:w-full");

    const heading = screen.getByRole("heading", { name: "THE ROASTERY" });
    expect(heading.className).toContain(
      "leading-[var(--velarro-display-light-line-height)]",
    );

    const ctaGroup = container.querySelector('[data-slot="roastery-cta-group"]');
    expect(ctaGroup?.className).toContain("shrink-0");
    expect(ctaGroup?.className).toContain("gap-[24px]");
  });

  it("keeps arrow and indicators decorative without fabricated carousel controls", () => {
    const { container } = render(<RoasteryHeroSection />);

    const arrow = container.querySelector('[data-slot="roastery-cta-arrow"]');
    expect(arrow).toHaveAttribute("aria-hidden", "true");

    const dots = container.querySelector(
      '[data-slot="roastery-slider-dots-static"]',
    );
    expect(dots).toHaveAttribute("aria-hidden", "true");
    expect(dots?.className).toContain("top-[546px]");
    expect(dots?.children).toHaveLength(5);
    expect(dots?.children[0]?.className).toContain("w-[89px]");
    expect(within(dots as HTMLElement).queryAllByRole("button")).toHaveLength(
      0,
    );

    expect(
      screen.getByText(
        "Slide indicators are decorative only. Carousel behavior is not yet approved.",
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll("button:not([disabled])"),
    ).toHaveLength(0);
  });
});
