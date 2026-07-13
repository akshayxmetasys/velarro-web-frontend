import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { CigarCarouselSection } from "@/components/m01-home/cigar-carousel-section";
import {
  CIGAR_CAROUSEL_CARDS,
  CIGAR_CAROUSEL_INITIAL_ACTIVE_INDEX,
} from "@/lib/m01-home/cigar-carousel-data";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    width,
    height,
    className,
    unoptimized: _unoptimized,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    unoptimized?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-unoptimized={_unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

describe("CigarCarouselSection", () => {
  it("renders the section heading stack and initial visible cards", () => {
    render(<CigarCarouselSection />);

    expect(screen.getByText("DISCOVER TIMELESS LUXURY")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Velarro cigars" }),
    ).toBeInTheDocument();

    const expectedInitialLabels = [
      CIGAR_CAROUSEL_CARDS[CIGAR_CAROUSEL_INITIAL_ACTIVE_INDEX - 1].label,
      CIGAR_CAROUSEL_CARDS[CIGAR_CAROUSEL_INITIAL_ACTIVE_INDEX].label,
      CIGAR_CAROUSEL_CARDS[CIGAR_CAROUSEL_INITIAL_ACTIVE_INDEX + 1].label,
    ];

    for (const label of expectedInitialLabels) {
      expect(screen.getByRole("heading", { level: 3, name: label })).toBeInTheDocument();
    }

    expect(
      screen.getByRole("article", { name: "Verde Classico", current: true }),
    ).toBeInTheDocument();
  });

  it("includes all six card labels in the approved sequence in carousel data", () => {
    expect(CIGAR_CAROUSEL_CARDS.map((card) => card.label)).toEqual([
      "Ashtrays",
      "Verde Classico",
      "Lighters",
      "Vintage no. 88",
      "Pipes",
      "Nocturne",
    ]);
  });

  it("uses only approved Supabase image URLs and no temporary Figma URLs", () => {
    const serialized = JSON.stringify(CIGAR_CAROUSEL_CARDS);

    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");

    for (const card of CIGAR_CAROUSEL_CARDS) {
      expect(card.imageUrl).toContain(M01_HOME_APPROVED_IMAGES.cigarCarouselAshtrays.split("/product-images/")[0]);
    }

    expect(CIGAR_CAROUSEL_CARDS[0].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarCarouselAshtrays,
    );
    expect(CIGAR_CAROUSEL_CARDS[1].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarCarouselVerdeClassico,
    );
    expect(CIGAR_CAROUSEL_CARDS[2].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarCarouselLighters,
    );
    expect(CIGAR_CAROUSEL_CARDS[3].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarCarouselVintageNo88,
    );
    expect(CIGAR_CAROUSEL_CARDS[4].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarCarouselPipes,
    );
    expect(CIGAR_CAROUSEL_CARDS[5].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarCarouselNocturne,
    );
  });

  it("renders product card images directly from the approved host", () => {
    render(<CigarCarouselSection />);

    expect(screen.getByAltText("Ashtrays category imagery")).toHaveAttribute(
      "data-unoptimized",
      "true",
    );
    expect(
      screen.getByAltText("Verde Classico cigar category imagery"),
    ).toHaveAttribute("data-unoptimized", "true");
    expect(screen.getByAltText("Lighters category imagery")).toHaveAttribute(
      "data-unoptimized",
      "true",
    );
  });

  it("renders Pipes and Nocturne images directly from the approved host", async () => {
    const user = userEvent.setup();

    render(<CigarCarouselSection />);

    const nextButton = screen.getByRole("button", { name: "Next cigar category" });

    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(nextButton);

    expect(screen.getByAltText("Pipes category imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.cigarCarouselPipes,
    );
    expect(screen.getByAltText("Pipes category imagery")).toHaveAttribute(
      "data-unoptimized",
      "true",
    );
    expect(
      screen.getByAltText("Nocturne cigar category imagery"),
    ).toHaveAttribute("src", M01_HOME_APPROVED_IMAGES.cigarCarouselNocturne);
    expect(
      screen.getByAltText("Nocturne cigar category imagery"),
    ).toHaveAttribute("data-unoptimized", "true");
  });

  it("exposes accessible previous and next controls", () => {
    render(<CigarCarouselSection />);

    expect(
      screen.getByRole("button", { name: "Previous cigar category" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next cigar category" }),
    ).toBeInTheDocument();
  });

  it("provides card-specific accessible names for deferred explore controls", () => {
    render(<CigarCarouselSection />);

    for (const card of CIGAR_CAROUSEL_CARDS.slice(0, 3)) {
      expect(
        screen.getByRole("button", {
          name: `Explore ${card.label} (deferred: destination not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
  });

  it("uses the approved left arrow asset and rotates it for the next control", () => {
    render(<CigarCarouselSection />);

    const previousArrow = screen.getByRole("button", {
      name: "Previous cigar category",
    });
    const nextArrow = screen.getByRole("button", { name: "Next cigar category" });

    expect(within(previousArrow).getByRole("presentation")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.cigarCarouselArrowLeft,
    );
    expect(within(nextArrow).getByRole("presentation")).toHaveClass("rotate-180");
  });

  it("scopes hydration suppression only to carousel arrow buttons", () => {
    const carouselSource = readFileSync(
      join(process.cwd(), "components/m01-home/cigar-carousel-section.tsx"),
      "utf8",
    );
    const footerSource = readFileSync(
      join(process.cwd(), "components/m01-home/footer-section.tsx"),
      "utf8",
    );
    const over21Source = readFileSync(
      join(process.cwd(), "components/m01-home/over21-home-page.tsx"),
      "utf8",
    );
    const appLayoutSource = readFileSync(
      join(process.cwd(), "app/layout.tsx"),
      "utf8",
    );

    expect(carouselSource.match(/suppressHydrationWarning/g)).toHaveLength(1);
    expect(carouselSource).toMatch(
      /function CarouselArrowButton[\s\S]*<button[\s\S]*suppressHydrationWarning/,
    );
    expect(footerSource).not.toContain("suppressHydrationWarning");
    expect(over21Source).not.toContain("suppressHydrationWarning");
    expect(appLayoutSource).not.toContain("suppressHydrationWarning");
  });

  it("advances the active card when next is activated", async () => {
    const user = userEvent.setup();

    render(<CigarCarouselSection />);

    expect(
      screen.getByRole("article", { name: "Verde Classico", current: true }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next cigar category" }));

    expect(
      screen.getByRole("article", { name: "Lighters", current: true }),
    ).toBeInTheDocument();
  });

  it("moves back to the previous active card when previous is activated", async () => {
    const user = userEvent.setup();

    render(<CigarCarouselSection />);

    await user.click(screen.getByRole("button", { name: "Next cigar category" }));
    await user.click(screen.getByRole("button", { name: "Previous cigar category" }));

    expect(
      screen.getByRole("article", { name: "Verde Classico", current: true }),
    ).toBeInTheDocument();
  });
});
