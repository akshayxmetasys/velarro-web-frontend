import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EstateCollectionSection } from "@/components/m01-home/estate-collection-section";
import {
  ESTATE_COLLECTION_CARDS,
  ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX,
} from "@/lib/m01-home/estate-collection-data";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    width,
    height,
    className,
    unoptimized: _unoptimized,
  }: {
    src: string;
    alt: string;
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
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-unoptimized={_unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

describe("EstateCollectionSection", () => {
  it("renders the exact Figma heading stack", () => {
    render(<EstateCollectionSection />);

    expect(screen.getByText("Discover Timeless Luxury")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Velarro Estate collection",
      }),
    ).toBeInTheDocument();
  });

  it("renders cards in the exact Figma order with Figma copy", () => {
    expect(ESTATE_COLLECTION_CARDS.map((card) => card.label)).toEqual([
      "Estate Espresso",
      "Founder’s Boxy hoodie",
      "Roastery",
      "The cabinet",
      "Estate oversized T-shirt",
      "Humidors",
    ]);
  });

  it("renders the initial visible cards with the center card active", () => {
    render(<EstateCollectionSection />);

    const expectedInitialLabels = [
      ESTATE_COLLECTION_CARDS[ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX - 1].label,
      ESTATE_COLLECTION_CARDS[ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX].label,
      ESTATE_COLLECTION_CARDS[ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX + 1].label,
    ];

    for (const label of expectedInitialLabels) {
      expect(screen.getByRole("heading", { level: 3, name: label })).toBeInTheDocument();
    }

    expect(
      screen.getByRole("article", {
        name: "Founder’s Boxy hoodie",
        current: true,
      }),
    ).toBeInTheDocument();
  });

  it("uses only the approved Estate Collection production image URLs", () => {
    const serialized = JSON.stringify(ESTATE_COLLECTION_CARDS);

    expect(M01_HOME_APPROVED_IMAGES.estateCollectionEstateEspresso).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-espresso-20260711-013345-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionFoundersBoxyHoodie).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-hoodies-20260711-013309-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionRoasteryCard).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-roastery-hero-20260709-023755-desktop-hero.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionTheCabinet).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-cabinet-hero-home-20260709-025631-desktop-hero.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionEstateOversizedTshirt).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-oversized-t-shirt-20260709-045207-product-main.webp",
    );
    expect(M01_HOME_APPROVED_IMAGES.estateCollectionHumidors).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-humidor-20260709-212816-product-main.webp",
    );
    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });

  it("renders direct unoptimized product images from approved URLs", () => {
    render(<EstateCollectionSection />);

    expect(screen.getByAltText("Estate Espresso product imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.estateCollectionEstateEspresso,
    );
    expect(
      screen.getByAltText("Founder’s Boxy hoodie product imagery"),
    ).toHaveAttribute("src", M01_HOME_APPROVED_IMAGES.estateCollectionFoundersBoxyHoodie);
    expect(screen.getByAltText("Roastery collection imagery")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.estateCollectionRoasteryCard,
    );
    expect(screen.getByAltText("Estate Espresso product imagery")).toHaveAttribute(
      "data-unoptimized",
      "true",
    );
  });

  it("exposes accessible previous and next controls", () => {
    render(<EstateCollectionSection />);

    expect(
      screen.getByRole("button", { name: "Previous estate collection item" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next estate collection item" }),
    ).toBeInTheDocument();
  });

  it("uses the approved left arrow asset and rotates it for the next control", () => {
    render(<EstateCollectionSection />);

    const previousArrow = screen.getByRole("button", {
      name: "Previous estate collection item",
    });
    const nextArrow = screen.getByRole("button", {
      name: "Next estate collection item",
    });

    expect(within(previousArrow).getByRole("presentation")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.estateCollectionArrowLeft,
    );
    expect(within(nextArrow).getByRole("presentation")).toHaveClass("rotate-180");
  });

  it("provides accessible deferred CTA controls for visible cards", () => {
    render(<EstateCollectionSection />);

    for (const card of ESTATE_COLLECTION_CARDS.slice(0, 3)) {
      expect(
        screen.getByRole("button", {
          name: `Explore ${card.label} (deferred: destination not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
  });

  it("advances the active card when next is activated", async () => {
    const user = userEvent.setup();

    render(<EstateCollectionSection />);

    await user.click(
      screen.getByRole("button", { name: "Next estate collection item" }),
    );

    expect(
      screen.getByRole("article", { name: "Roastery", current: true }),
    ).toBeInTheDocument();
  });

  it("uses the carousel width pattern instead of the 1236px contained card-row width", () => {
    const { container } = render(<EstateCollectionSection />);

    const carousel = container.querySelector(
      '[data-slot="estate-collection-carousel"]',
    );

    expect(carousel).toHaveClass("w-[1303px]", "gap-10");
    expect(carousel).not.toHaveClass("max-w-[1236px]");
  });
});
