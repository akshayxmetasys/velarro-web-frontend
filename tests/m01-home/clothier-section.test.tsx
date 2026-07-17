import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ClothierSection } from "@/components/m01-home/clothier-section";
import { M01_CONTAINED_SECTION_WIDTH_CLASS, M01_WIDE_CONTAINED_SECTION_WIDTH_CLASS } from "@/components/m01-home/m01-section-layout";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";
import { CLOTHIER_CARDS } from "@/lib/m01-home/clothier-data";

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

describe("ClothierSection", () => {
  it("renders the exact Figma heading stack", () => {
    render(<ClothierSection />);

    expect(screen.getByText("Curated for the Exceptional")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "The Clothier" }),
    ).toBeInTheDocument();
  });

  it("renders cards in the exact Figma order with Figma copy", () => {
    render(<ClothierSection />);

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent),
    ).toEqual([
      "Estate Oversized T-shirt",
      "Heritage Dad Cap",
      "Estate Weekender Jacket",
    ]);
    expect(screen.getByText("Heavyweight organic cotton")).toBeInTheDocument();
    expect(screen.getByText("Washed cotton")).toBeInTheDocument();
    expect(
      screen.getByText("Cotton canvas, technical cotton, or lightweight"),
    ).toBeInTheDocument();
  });

  it("uses only the approved Clothier production image URLs", () => {
    const serialized = JSON.stringify(CLOTHIER_CARDS);

    expect(M01_HOME_APPROVED_IMAGES.clothierEstateOversizedTshirt).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-oversized-t-shirt-20260709-045207-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.clothierHeritageDadCap).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/heritage-dad-cap-20260709-160620-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.clothierEstateWeekenderJacket).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-weekender-jacket-closeup-20260709-154553-product-main.webp",
    );
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });

  it("renders direct unoptimized product images from approved URLs", () => {
    render(<ClothierSection />);

    for (const card of CLOTHIER_CARDS) {
      expect(screen.getByAltText(card.imageAlt)).toHaveAttribute(
        "src",
        card.imageUrl,
      );
      expect(screen.getByAltText(card.imageAlt)).toHaveAttribute(
        "data-unoptimized",
        "true",
      );
      expect(screen.getByAltText(card.imageAlt)).toHaveAttribute(
        "data-sizes",
        "321px",
      );
    }
  });

  it("renders the approved Top Gift badge on each Figma card", () => {
    render(<ClothierSection />);

    expect(screen.getAllByText("Top Gift")).toHaveLength(3);
  });

  it("provides accessible deferred CTA controls and color options", () => {
    render(<ClothierSection />);

    for (const card of CLOTHIER_CARDS) {
      const article = screen.getByRole("article", { name: card.title });

      expect(
        within(article).getByRole("button", {
          name: `Explore ${card.title} (deferred: destination not approved for this scope)`,
        }),
      ).toBeDisabled();
      expect(
        within(article).getByRole("list", {
          name: `${card.title} color options`,
        }),
      ).toBeInTheDocument();
    }
  });

  it("uses the shared M01 contained card-row width", () => {
    const { container } = render(<ClothierSection />);

    const section = container.querySelector('[data-figma-node="13148:15120"]');
    const row = container.querySelector('[data-slot="clothier-cards"]');
    const cards = screen.getAllByRole("article");

    expect(section).toHaveClass(M01_WIDE_CONTAINED_SECTION_WIDTH_CLASS, "py-[32px]");
    expect(row).toHaveClass(
      M01_CONTAINED_SECTION_WIDTH_CLASS,
      "justify-between",
      "gap-[30px]",
    );
    for (const card of cards) {
      expect(card).toHaveClass("w-[355px]", "p-[17px]", "rounded-radius-md");
    }
  });
});
