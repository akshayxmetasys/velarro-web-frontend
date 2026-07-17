import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CollectorHeroSection } from "@/components/m01-home/collector-hero-section";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    className,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      className={className}
    />
  ),
}));

describe("CollectorHeroSection", () => {
  it("renders the approved hero image, heading, and deferred CTA", () => {
    render(<CollectorHeroSection />);

    expect(
      screen.getByRole("heading", { name: "COLLECTOR SERIES" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Collector Series lifestyle imagery"),
    ).toHaveAttribute("src", M01_HOME_APPROVED_IMAGES.collectorHero);
    expect(
      screen.getByAltText("Collector Series lifestyle imagery"),
    ).toHaveAttribute("data-priority", "true");
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

  it("marks the exact Figma node and preserves desktop geometry contracts", () => {
    const { container } = render(<CollectorHeroSection />);
    const section = container.querySelector('[data-figma-node="15081:25289"]');
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute("data-slot", "collector-hero");

    const frame = container.querySelector('[data-slot="collector-hero-frame"]');
    expect(frame?.className).toContain("h-[851px]");

    const image = screen.getByAltText("Collector Series lifestyle imagery");
    expect(image.className).toContain("object-cover");
    expect(image.className).toContain("object-bottom");

    const content = container.querySelector('[data-slot="hero-content"]');
    expect(content?.className).toContain("top-[319px]");
    expect(content?.className).toContain("max-w-[998px]");
    expect(content?.className).toContain("gap-[37px]");

    const heading = screen.getByRole("heading", { name: "COLLECTOR SERIES" });
    expect(heading.tagName).toBe("H1");
    expect(heading.className).toContain(
      "leading-[var(--velarro-display-light-line-height)]",
    );

    const dots = container.querySelector(
      '[data-slot="hero-slider-dots-static"]',
    );
    expect(dots).toHaveAttribute("aria-hidden", "true");
    expect(dots?.className).toContain("top-[546px]");
    expect(dots?.children).toHaveLength(5);
    expect(dots?.children[0]?.className).toContain("w-[89px]");
    expect(dots?.children[0]?.className).toContain("h-[14px]");
  });

  it("keeps the CTA arrow decorative and does not fabricate hero carousel controls", () => {
    const { container } = render(<CollectorHeroSection />);

    const arrow = container.querySelector('[data-slot="hero-cta-arrow"]');
    expect(arrow).toHaveAttribute("aria-hidden", "true");

    expect(
      container.querySelectorAll('button:not([disabled])'),
    ).toHaveLength(0);

    const dots = container.querySelector(
      '[data-slot="hero-slider-dots-static"]',
    );
    expect(within(dots as HTMLElement).queryAllByRole("button")).toHaveLength(
      0,
    );
  });

  it("does not invent a hero overlay layer", () => {
    const { container } = render(<CollectorHeroSection />);
    expect(
      container.querySelector('[data-slot="collector-hero-overlay"]'),
    ).toBeNull();
  });
});
