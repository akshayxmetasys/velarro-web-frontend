import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CigarKnowledgeSection } from "@/components/m01-home/cigar-knowledge-section";
import { M01_CONTAINED_SECTION_WIDTH_CLASS } from "@/components/m01-home/m01-section-layout";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";
import { CIGAR_KNOWLEDGE_CARDS } from "@/lib/m01-home/cigar-knowledge-data";

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

describe("CigarKnowledgeSection", () => {
  it("renders the Figma heading stack and all three cards in order", () => {
    render(<CigarKnowledgeSection />);

    expect(screen.getByText("Cigar Knowledge")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Expand your horizons",
      }),
    ).toBeInTheDocument();

    expect(CIGAR_KNOWLEDGE_CARDS.map((card) => card.title)).toEqual([
      "Limited Compendium",
      "Reserve",
      "Night Series",
    ]);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Limited Compendium",
      "Reserve",
      "Night Series",
    ]);
  });

  it("renders the exact Figma body copy", () => {
    render(<CigarKnowledgeSection />);

    expect(
      screen.getByText("The Perfect Whiskey & Cigar Pairing"),
    ).toBeInTheDocument();
    expect(screen.getByText("Core Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Nocturne")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        "Discover how to match profiles for an unforgettable experience",
      ),
    ).toHaveLength(2);
    expect(
      screen.getByText(
        "Rich and sophisticated selections designed for evenings of quiet luxury.",
      ),
    ).toBeInTheDocument();
  });

  it("uses only approved production image URLs and no temporary Figma URLs", () => {
    const serialized = JSON.stringify(CIGAR_KNOWLEDGE_CARDS);

    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");

    expect(CIGAR_KNOWLEDGE_CARDS[0].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeLimitedCompendium,
    );
    expect(CIGAR_KNOWLEDGE_CARDS[1].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeReserve,
    );
    expect(CIGAR_KNOWLEDGE_CARDS[2].imageUrl).toBe(
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeNightSeries,
    );
  });

  it("renders card images directly from the approved host", () => {
    render(<CigarKnowledgeSection />);

    expect(
      screen.getByAltText("Limited Compendium cigar knowledge imagery"),
    ).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeLimitedCompendium,
    );
    expect(
      screen.getByAltText("Reserve cigar knowledge imagery"),
    ).toHaveAttribute("src", M01_HOME_APPROVED_IMAGES.cigarKnowledgeReserve);
    expect(
      screen.getByAltText("Night Series cigar knowledge imagery"),
    ).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.cigarKnowledgeNightSeries,
    );

    for (const card of CIGAR_KNOWLEDGE_CARDS) {
      expect(screen.getByAltText(card.imageAlt)).toHaveAttribute(
        "data-unoptimized",
        "true",
      );
    }
  });

  it("provides card-specific accessible deferred CTA controls", () => {
    render(<CigarKnowledgeSection />);

    for (const card of CIGAR_KNOWLEDGE_CARDS) {
      expect(
        screen.getByRole("button", {
          name: `Explore ${card.title} (deferred: destination not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
  });

  it("preserves the Figma outer rhythm and inner card-row width", () => {
    const { container } = render(<CigarKnowledgeSection />);

    const section = container.querySelector('[data-figma-node="13148:15081"]');
    const outerWrapper = section?.firstElementChild;
    const cardsRow = container.querySelector(
      '[data-slot="cigar-knowledge-cards"]',
    );

    expect(outerWrapper).toHaveClass("max-w-[1340px]");
    expect(cardsRow).toHaveClass(
      M01_CONTAINED_SECTION_WIDTH_CLASS,
      "gap-[30px]",
    );
  });
});
