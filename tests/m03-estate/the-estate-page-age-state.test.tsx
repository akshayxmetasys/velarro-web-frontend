import { render, screen, within } from "@testing-library/react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import TheEstateRoute, { metadata } from "@/app/the-estate/page";
import { THE_ESTATE_APPROVED_IMAGES } from "@/components/m03-estate/the-estate-assets";
import { TheEstatePageByAgeState } from "@/components/m03-estate/the-estate-page-by-age-state";
import {
  THE_ESTATE_CATEGORY_LABELS,
  THE_ESTATE_FILTERS,
  THE_ESTATE_PRODUCTS,
} from "@/components/m03-estate/the-estate-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    fill,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      className={className}
    />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

vi.mock("@/lib/age/get-initial-age-state", () => ({
  getInitialAgeStateFromCookies: vi.fn(),
}));

describe("TheEstatePageByAgeState", () => {
  it("shows the age gate for unknown visitors and hides Estate content", () => {
    render(<TheEstatePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("The Humidor")).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="the-estate-page"]'),
    ).not.toBeInTheDocument();
  });

  it("blocks under-21 visitors from restricted Estate content", () => {
    render(<TheEstatePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", { name: "Access restricted" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Limited Compendium")).not.toBeInTheDocument();
    expect(
      screen.queryByAltText(
        "Collector Series cigars arranged with estate accessories",
      ),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="the-estate-page"]'),
    ).not.toBeInTheDocument();
  });

  it("renders the Figma Estate/Humidor sections for over-21 visitors", () => {
    render(<TheEstatePageByAgeState ageState="over21" />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
    ).toBeInTheDocument();
    expect(screen.getByText("THE HUMIDOR")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "THE HOUSE" })).toHaveAttribute(
      "href",
      "/the-estate/the-house",
    );
    expect(screen.getByText("Limited Compendium")).toBeInTheDocument();
    expect(screen.getByText("Primera Cosecha")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeInTheDocument();
  });

  it("preserves verified section DOM order and Figma node contracts", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    const orderedSlots = [
      "the-estate-hero",
      "the-estate-filters",
      "the-estate-breadcrumbs",
      "the-estate-categories",
      "the-estate-product-grid",
      "the-estate-pagination",
    ];

    const found = orderedSlots.map((slot) => {
      const el = container.querySelector(`[data-slot="${slot}"]`);
      expect(el, slot).not.toBeNull();
      return el!;
    });

    for (let i = 1; i < found.length; i += 1) {
      expect(
        found[i - 1]!.compareDocumentPosition(found[i]!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }

    expect(
      container.querySelector('[data-figma-node="16576:98466"]'),
    ).toHaveAttribute("data-slot", "the-estate-hero");
    expect(
      container.querySelector('[data-figma-node="16576:98465"]'),
    ).toHaveAttribute("data-slot", "the-estate-filters");
    expect(
      container.querySelector('[data-figma-node="16576:98462"]'),
    ).toHaveAttribute("data-slot", "the-estate-breadcrumbs");
    expect(
      container.querySelector('[data-figma-node="16576:98452"]'),
    ).toHaveAttribute("data-slot", "the-estate-collection-nav");
    expect(
      container.querySelector('[data-figma-node="16604:97510"]'),
    ).toHaveAttribute("data-slot", "the-estate-categories");
    expect(
      container.querySelector('[data-figma-node="16576:98463"]'),
    ).toHaveAttribute("data-slot", "the-estate-pagination");
    expect(container.innerHTML).not.toContain("MAIN PRODUCT CARD");
  });

  it("applies hero height, crop, and overlay contracts", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );
    const hero = container.querySelector('[data-slot="the-estate-hero"]');
    const image = screen.getByAltText(
      "Collector Series cigars arranged with estate accessories",
    );
    const overlay = container.querySelector(
      '[data-slot="the-estate-hero-overlay"]',
    );

    expect(hero).toHaveClass("desktop:h-[471px]");
    expect(image).toHaveClass("object-cover");
    expect(image).toHaveClass("object-center");
    expect(image).toHaveAttribute("data-priority", "true");
    expect(overlay).toHaveClass("bg-[rgba(21,20,20,0.4)]");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  it("uses breadcrumb semantics with current Humidor and focus-visible links", () => {
    render(<TheEstatePageByAgeState ageState="over21" />);

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveAttribute("data-figma-node", "16576:98462");

    const home = within(nav).getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");
    expect(home).toHaveClass("focus-visible:ring-2");

    expect(within(nav).queryByRole("link", { name: "The Estate" })).toBeNull();
    expect(within(nav).getByText("The Estate")).toBeInTheDocument();

    const current = within(nav).getByText("The Humidor");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("applies filter rail geometry and disabled deferred state", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );
    const filters = container.querySelector(
      '[data-slot="the-estate-filters"]',
    );
    expect(filters).toHaveClass("desktop:w-[350px]");
    expect(filters).toHaveClass("desktop:min-h-[1493px]");
    expect(filters).toHaveClass("gap-[20px]");

    expect(
      screen.getByRole("button", {
        name: "Clear filter (deferred: filtering is not approved for this scope)",
      }),
    ).toBeDisabled();

    for (const filter of THE_ESTATE_FILTERS) {
      expect(
        screen.getByRole("button", {
          name: `${filter} filter (deferred: filtering is not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
  });

  it("uses navigation semantics for Humidor/House without invalid aria-selected", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    const collectionNav = screen.getByRole("navigation", {
      name: "Estate collection",
    });
    expect(collectionNav).not.toHaveAttribute("role", "tablist");
    expect(
      within(collectionNav).getByText("THE HUMIDOR"),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(collectionNav).getByRole("link", { name: "THE HOUSE" }),
    ).toHaveAttribute("href", "/the-estate/the-house");
    expect(collectionNav.innerHTML).not.toContain("aria-selected");
    expect(container.querySelector('[role="tab"]')).toBeNull();
  });

  it("renders ten deferred category labels in exact order with rail containment contract", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    expect(THE_ESTATE_CATEGORY_LABELS.map((c) => c.label)).toEqual([
      "ALL SERIES",
      "AFTER DARK",
      "CELEBRATION",
      "COLLECTOR",
      "DARK",
      "ESTATE",
      "HERITAGE",
      "PLATINUM",
      "PRESTIGE",
      "TERRIOR",
    ]);

    const tiles = container.querySelectorAll(
      '[data-slot="the-estate-category-tile"]',
    );
    expect(tiles).toHaveLength(10);
    expect(
      Array.from(tiles).map(
        (tile) => tile.querySelector("h3")?.textContent ?? "",
      ),
    ).toEqual(THE_ESTATE_CATEGORY_LABELS.map((c) => c.label));

    const rail = container.querySelector(
      '[data-slot="the-estate-category-rail"]',
    );
    expect(rail).toHaveAttribute("role", "list");
    expect(rail).toHaveAttribute("aria-label", "Collector Series categories");
    expect(rail).toHaveClass("overflow-x-auto");
    expect(rail?.className).not.toMatch(/overflow-(hidden|clip)/);

    expect(tiles[0]).toHaveAttribute("role", "listitem");
    expect(tiles[0]).toHaveAttribute("data-category-selected", "true");
    expect(tiles[0]).toHaveAttribute("aria-current", "true");
    expect(tiles[0]).toHaveClass("w-[136px]");
    expect(tiles[0]).not.toHaveClass("w-[120px]");
    expect(tiles[0]).not.toHaveAttribute("aria-selected");
    expect(
      within(tiles[0] as HTMLElement).getByRole("img", {
        name: "ALL SERIES category image deferred",
      }),
    ).toHaveClass("size-[136px]");

    for (const tile of Array.from(tiles).slice(1)) {
      expect(tile).toHaveAttribute("role", "listitem");
      expect(tile).toHaveAttribute("data-category-selected", "false");
      expect(tile).not.toHaveAttribute("aria-current");
      expect(tile).not.toHaveAttribute("aria-selected");
      expect(tile).toHaveClass("w-[120px]");
      expect(tile.querySelector("a")).toBeNull();
      expect(tile.querySelector("button")).toBeNull();
    }

    for (const category of THE_ESTATE_CATEGORY_LABELS) {
      expect(
        screen.getByRole("img", {
          name: `${category.label} category image deferred`,
        }),
      ).toHaveAttribute("data-image-status", "deferred");
    }

    expect(
      screen.getByRole("button", {
        name: "Next category set (deferred: category navigation is not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("announces each product intensity value while keeping dots decorative", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    const cards = container.querySelectorAll(
      '[data-slot="the-estate-product-card"]',
    );
    expect(cards).toHaveLength(THE_ESTATE_PRODUCTS.length);

    for (const product of THE_ESTATE_PRODUCTS) {
      const card = screen.getByText(product.name).closest("article");
      expect(card).not.toBeNull();

      const intensityValue = within(card as HTMLElement).getByText(
        `${product.intensityLabel}: ${product.intensityFilled} out of 5`,
      );
      expect(intensityValue).toHaveAttribute(
        "data-slot",
        "the-estate-intensity-value",
      );
      expect(intensityValue).toHaveClass("sr-only");

      const visibleIntensityLabel = Array.from(
        (card as HTMLElement).querySelectorAll("span"),
      ).find(
        (span) =>
          span.getAttribute("aria-hidden") === "true" &&
          span.textContent === product.intensityLabel &&
          !span.hasAttribute("data-slot"),
      );
      expect(visibleIntensityLabel).toBeDefined();
      expect(visibleIntensityLabel).toHaveAttribute("aria-hidden", "true");

      const dots = (card as HTMLElement).querySelector(
        '[data-slot="the-estate-intensity-dots"]',
      );
      expect(dots).not.toBeNull();
      expect(dots).toHaveAttribute("aria-hidden", "true");
      expect(dots!.querySelectorAll("span")).toHaveLength(5);
      expect(dots!.querySelectorAll(".bg-border-strong")).toHaveLength(
        product.intensityFilled,
      );
      expect(dots!.querySelectorAll(".border-border-strong")).toHaveLength(
        5 - product.intensityFilled,
      );
    }

    const intensityValues = container.querySelectorAll(
      '[data-slot="the-estate-intensity-value"]',
    );
    expect(intensityValues).toHaveLength(THE_ESTATE_PRODUCTS.length);
    const spokenValues = Array.from(intensityValues).map(
      (node) => node.textContent ?? "",
    );
    expect(new Set(spokenValues).size).toBeGreaterThan(1);
    expect(spokenValues).toEqual(
      THE_ESTATE_PRODUCTS.map(
        (product) =>
          `${product.intensityLabel}: ${product.intensityFilled} out of 5`,
      ),
    );
    expect(container.innerHTML).not.toContain("Intensity: Intensity,");
  });

  it("exposes the current Estate category and prevents selected-rail clipping contract", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    const rail = container.querySelector(
      '[data-slot="the-estate-category-rail"]',
    );
    const tiles = container.querySelectorAll(
      '[data-slot="the-estate-category-tile"]',
    );
    const selected = tiles[0] as HTMLElement;
    const selectedSurface = within(selected).getByRole("img", {
      name: "ALL SERIES category image deferred",
    });

    expect(rail).toHaveAttribute("role", "list");
    expect(rail).toHaveClass("overflow-x-auto");
    expect(rail?.className).not.toMatch(/overflow-(hidden|clip)/);
    expect(selected).toHaveAttribute("aria-current", "true");
    expect(selected).toHaveClass("w-[136px]");
    expect(selectedSurface).toHaveClass("size-[136px]");
    expect(selected.className).not.toMatch(/w-\[120px\]/);
    expect(container.innerHTML).not.toContain('aria-selected="');

    for (const tile of Array.from(tiles).slice(1)) {
      expect(tile).not.toHaveAttribute("aria-current");
      expect(tile).toHaveClass("w-[120px]");
    }

    expect(
      screen.getByRole("button", {
        name: "Next category set (deferred: category navigation is not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("renders six product cards in order with geometry and deferred Explore", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    const cards = container.querySelectorAll(
      '[data-slot="the-estate-product-card"]',
    );
    expect(cards).toHaveLength(6);
    expect(
      Array.from(cards).map(
        (card) => card.querySelector("h3")?.textContent ?? "",
      ),
    ).toEqual(THE_ESTATE_PRODUCTS.map((product) => product.name));

    const grid = container.querySelector(
      '[data-slot="the-estate-product-grid"]',
    );
    expect(grid).toHaveClass("gap-x-[45px]");
    expect(grid).toHaveClass("gap-y-[49px]");
    expect(grid).toHaveClass("desktop:grid-cols-3");
    expect(grid).toHaveClass("max-w-[966px]");

    expect(cards[0]).toHaveClass("max-w-[292px]");
    expect(cards[0]).toHaveClass("min-h-[471px]");
    expect(cards[0]).toHaveClass("p-[14px]");
    expect(cards[0]).toHaveClass("rounded-[8px]");
    expect(cards[0]).toHaveClass("motion-reduce:transition-none");
    expect(cards[0]).not.toHaveAttribute("tabindex");

    for (const product of THE_ESTATE_PRODUCTS) {
      const card = screen.getByText(product.name).closest("article");
      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByText(product.vitola),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByText(new RegExp(product.ringGauge)),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByText(product.notes),
      ).toBeInTheDocument();
      expect(
        within(card as HTMLElement).getByRole("button", {
          name: new RegExp(`Explore ${product.name}`),
        }),
      ).toBeDisabled();

      const dots = (card as HTMLElement).querySelector(
        '[data-slot="the-estate-intensity-dots"]',
      );
      expect(dots).not.toBeNull();
      expect(dots!.querySelectorAll(".bg-border-strong")).toHaveLength(
        product.intensityFilled,
      );
      expect(dots!.querySelectorAll(".border-border-strong")).toHaveLength(
        5 - product.intensityFilled,
      );
    }
  });

  it("uses the approved hero and product image URLs and no Figma URLs", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );

    expect(
      screen.getByAltText(
        "Collector Series cigars arranged with estate accessories",
      ),
    ).toHaveAttribute(
      "src",
      THE_ESTATE_APPROVED_IMAGES.collectorSeriesHeroBackground,
    );

    for (const product of THE_ESTATE_PRODUCTS) {
      expect(screen.getByAltText(product.imageAlt)).toHaveAttribute(
        "src",
        product.imageUrl,
      );
    }

    expect(container.innerHTML).not.toContain("figma.com");
    expect(container.innerHTML).not.toContain("mcp/asset");
  });

  it("keeps pagination deferred and disables all page controls", () => {
    render(<TheEstatePageByAgeState ageState="over21" />);

    for (const pageNumber of [1, 2, 3, 4, 5, 6, 7]) {
      expect(
        screen.getByRole("button", {
          name: `Page ${pageNumber} (deferred: pagination is not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
    expect(
      screen.getByRole("button", {
        name: "Next page (deferred: pagination is not approved for this scope)",
      }),
    ).toBeDisabled();
  });

  it("does not mask document overflow at the Estate page root", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );
    const page = container.querySelector('[data-slot="the-estate-page"]');
    const main = container.querySelector('[data-slot="the-estate-main"]');
    const content = container.querySelector(
      '[data-slot="the-estate-content"]',
    );

    expect(page?.className).not.toMatch(/overflow-x-(hidden|clip)/);
    expect(main?.className).not.toMatch(/overflow-x-(hidden|clip)/);
    expect(content?.className).not.toMatch(/overflow-x-(hidden|clip)/);
  });

  it("does not introduce fake commerce destinations", () => {
    const { container } = render(
      <TheEstatePageByAgeState ageState="over21" />,
    );
    const page = container.querySelector('[data-slot="the-estate-page"]');
    expect(page).not.toBeNull();

    const hrefs = Array.from(page!.querySelectorAll("a[href]")).map((a) =>
      a.getAttribute("href"),
    );
    expect(hrefs).not.toContain("/cart");
    expect(hrefs).not.toContain("/checkout");
    expect(hrefs.some((href) => href?.includes("/the-estate/the-humidor/"))).toBe(
      false,
    );
  });
});

describe("/the-estate route", () => {
  it("has noindex page metadata for the over-21 restricted page", () => {
    expect(metadata.title).toBe("The Estate");
    expect(metadata.description).toBe(
      "Collector Series cigars from The Humidor.",
    );
    expect(metadata.alternates?.canonical).toBe(
      "https://velarroestate.com/the-estate",
    );
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the cookie age state for the route render", async () => {
    vi.mocked(getInitialAgeStateFromCookies).mockResolvedValue("over21");

    render(await TheEstateRoute());

    expect(getInitialAgeStateFromCookies).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
    ).toBeInTheDocument();
  });

  it("does not add local M03 image files", () => {
    expect(existsSync(join(process.cwd(), "public", "images", "m03"))).toBe(
      false,
    );
    expect(
      existsSync(join(process.cwd(), "public", "images", "m03-estate")),
    ).toBe(false);
  });
});
