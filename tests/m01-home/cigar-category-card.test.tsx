import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CigarCategoryCard } from "@/components/m01-home/cigar-category-card";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    sizes,
    className,
    unoptimized: _unoptimized,
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
      data-unoptimized={_unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

const APPROVED_IMAGE = M01_HOME_APPROVED_IMAGES.cigarCarouselVerdeClassico;

describe("CigarCategoryCard", () => {
  it("renders the active card geometry, current semantics, and deferred Explore control", () => {
    render(
      <CigarCategoryCard
        cardId="verde-classico"
        label="Verde Classico"
        imageUrl={APPROVED_IMAGE}
        imageAlt="Verde Classico cigar category imagery"
        isActive
      />,
    );

    const card = screen.getByRole("article", { name: "Verde Classico" });
    expect(card).toHaveAttribute("aria-current", "true");
    expect(card.className).toContain("w-[395.07px]");
    expect(card.className).not.toContain("opacity-75");

    expect(
      screen.getByAltText("Verde Classico cigar category imagery"),
    ).toHaveAttribute("src", APPROVED_IMAGE);
    expect(
      screen.getByAltText("Verde Classico cigar category imagery"),
    ).toHaveAttribute("data-sizes", "364px");

    expect(
      screen.getByRole("button", {
        name: "Explore Verde Classico (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("renders the inactive card as dimmed without active semantics", () => {
    render(
      <CigarCategoryCard
        cardId="ashtrays"
        label="Ashtrays"
        imageUrl={M01_HOME_APPROVED_IMAGES.cigarCarouselAshtrays}
        imageAlt="Ashtrays category imagery"
        isActive={false}
      />,
    );

    const card = screen.getByRole("article", { name: "Ashtrays" });
    expect(card).not.toHaveAttribute("aria-current");
    expect(card.className).toContain("w-[351.42px]");
    expect(card.className).toContain("opacity-75");

    expect(screen.getByAltText("Ashtrays category imagery")).toHaveAttribute(
      "data-sizes",
      "324px",
    );
  });

  it("keeps the verified dark image overlay decorative", () => {
    const { container } = render(
      <CigarCategoryCard
        cardId="lighters"
        label="Lighters"
        imageUrl={M01_HOME_APPROVED_IMAGES.cigarCarouselLighters}
        imageAlt="Lighters category imagery"
        isActive={false}
      />,
    );

    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).not.toBeNull();
    expect(overlay?.className).toContain("bg-[rgba(21,20,20,0.4)]");
  });
});
