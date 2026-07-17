import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  STORE_LOUNGE_BACKGROUND_SRC,
  StoreLoungeSection,
} from "@/components/m01-home/store-lounge-section";
import {
  M01_CONTAINED_SECTION_IMAGE_SIZES,
  M01_CONTAINED_SECTION_WIDTH_CLASS,
} from "@/components/m01-home/m01-section-layout";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    sizes,
    className,
    priority,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    className?: string;
    priority?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-fill={fill ? "true" : undefined}
      data-sizes={sizes}
      data-priority={priority ? "true" : undefined}
      className={className}
    />
  ),
}));

describe("StoreLoungeSection", () => {
  it("renders the exact Figma copy", () => {
    render(<StoreLoungeSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "FIND A STORE & LOUNGE",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Explore Store\/Lounge/ }),
    ).toHaveTextContent("EXPLORE");
  });

  it("uses the approved local public image asset path", () => {
    const { container } = render(<StoreLoungeSection />);
    const image = container.querySelector("img");

    expect(STORE_LOUNGE_BACKGROUND_SRC).toBe(
      "/images/m01-home/store-lounge-background.png",
    );
    expect(
      existsSync(
        join(process.cwd(), "public/images/m01-home/store-lounge-background.png"),
      ),
    ).toBe(true);
    expect(image).toHaveAttribute("src", STORE_LOUNGE_BACKGROUND_SRC);
    expect(image).toHaveAttribute("data-fill", "true");
    expect(image).toHaveAttribute("data-sizes", M01_CONTAINED_SECTION_IMAGE_SIZES);
  });

  it("does not use a temporary Figma asset URL or an unapproved remote URL", () => {
    expect(STORE_LOUNGE_BACKGROUND_SRC).not.toContain("figma.com");
    expect(STORE_LOUNGE_BACKGROUND_SRC).not.toContain("mcp/asset");
    expect(STORE_LOUNGE_BACKGROUND_SRC).not.toMatch(/^https?:\/\//);
  });

  it("provides an accessible deferred CTA control", () => {
    render(<StoreLoungeSection />);

    expect(
      screen.getByRole("button", {
        name: "Explore Store/Lounge (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("uses the shared M01 contained-section width", () => {
    const { container } = render(<StoreLoungeSection />);

    const section = container.querySelector('[data-figma-node="13148:15176"]');
    const contained = container.querySelector(
      '[data-slot="store-lounge-contained-section"]',
    );

    expect(section).toHaveClass("px-4", "py-0");
    expect(section).not.toHaveClass("py-8");
    expect(contained).toHaveClass("mx-auto", M01_CONTAINED_SECTION_WIDTH_CLASS);
  });

  it("matches the Figma overlay, glass panel, and crop treatment", () => {
    const { container } = render(<StoreLoungeSection />);

    const image = container.querySelector("img");
    const section = container.querySelector('[data-figma-node="13148:15176"]');
    const contained = container.querySelector(
      '[data-slot="store-lounge-contained-section"]',
    );
    const button = screen.getByRole("button", {
      name: /Explore Store\/Lounge/,
    });

    expect(contained).toHaveClass("rounded-[12px]", "desktop:h-[1065px]");
    expect(image).toHaveClass("object-cover", "object-[center_8%]");
    expect(section?.innerHTML).toContain("bg-[rgba(21,20,20,0.4)]");
    expect(button.parentElement).toHaveClass(
      "rounded-[24px]",
      "bg-[rgba(29,28,26,0.6)]",
      "py-[24px]",
      "gap-[20px]",
    );
    expect(button).toHaveClass("w-[355px]", "bg-button-fill");
  });
});
